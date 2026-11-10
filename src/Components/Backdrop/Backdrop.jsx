import { useEffect, useRef } from "react";

// The page's background: liquid ink that flows slowly and is pushed aside by the
// pointer, drawn by one WebGL shader at a fraction of the screen's resolution
// (it is soft, so nobody sees the pixels), with film grain on top in style.scss.
// Without WebGL the plain theme colour shows instead.

// How far the ink trails the pointer each frame (0–1).
const FOLLOW = 0.06;
// Share of the screen's pixels the shader draws; lower on phones.
const SCALE_DESKTOP = 0.5;
const SCALE_PHONE = 0.35;

const VERTEX = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

// Domain-warped noise: fbm bent by fbm, coloured from the theme's palette.
// Phone GPUs keep mediump at 16 bits, where the sin() hash collapses and the ink
// shows as one flat colour, so the shader asks for highp and, on GPUs without it,
// falls back to a hash that stays small enough for mediump (Dave Hoskins's).
const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
#else
precision mediump float;
float hash(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
#endif
uniform vec2 res;
uniform float t;
uniform vec2 m;
uniform float light;
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.02;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/res;
  vec2 p=vec2(uv.x*res.x/res.y,uv.y);
  vec2 q=vec2(fbm(p*1.4+t*.015),fbm(p*1.4+vec2(5.2,1.3)-t*.012));
  vec2 dm=p-m;
  q+=dm*.25*exp(-dot(dm,dm)*6.);
  float r=fbm(p*1.4+3.*q+vec2(1.7,9.2)+t*.01);
  vec3 base=light>.5?vec3(.80,.74,.97):vec3(.08,.10,.19);
  vec3 blue=light>.5?vec3(.47,.52,.96):vec3(.29,.31,.75);
  vec3 pink=light>.5?vec3(.94,.46,.76):vec3(.95,.46,.62);
  vec3 vio=light>.5?vec3(.64,.50,.93):vec3(.33,.18,.52);
  vec3 c=mix(base,vio,smoothstep(.2,.7,r));
  c=mix(c,blue,smoothstep(.45,.9,length(q)*.9));
  c=mix(c,pink,smoothstep(.62,.85,r*q.y*1.6));
  gl_FragColor=vec4(c,1.);
}`;

function setUp(canvas) {
    const gl = canvas.getContext && canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return null;
    const compile = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    };
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const at = (name) => gl.getUniformLocation(program, name);
    return { gl, res: at("res"), t: at("t"), m: at("m"), light: at("light") };
}

function Backdrop() {
    const canvas = useRef(null);

    useEffect(() => {
        const view = setUp(canvas.current);
        if (!view) return undefined;
        const { gl } = view;
        canvas.current.classList.add("is-drawing");

        const media = (query) => typeof window.matchMedia === "function" && window.matchMedia(query).matches;
        const still = media("(prefers-reduced-motion: reduce)");
        const pointer = media("(hover: hover) and (pointer: fine)");
        const scale = media("(max-width: 720px)") ? SCALE_PHONE : SCALE_DESKTOP;

        // Pointer in the shader's units: x from 0 to the aspect ratio, y from 0 at the bottom to 1.
        const target = { x: 0.5, y: 0.5 };
        const now = { x: 0.5, y: 0.5 };
        const onMove = (e) => {
            target.x = (e.clientX / window.innerHeight);
            target.y = 1 - e.clientY / window.innerHeight;
        };

        const resize = () => {
            canvas.current.width = Math.max(1, Math.round(window.innerWidth * scale));
            canvas.current.height = Math.max(1, Math.round(window.innerHeight * scale));
            gl.viewport(0, 0, canvas.current.width, canvas.current.height);
            target.x = now.x = (0.5 * window.innerWidth) / window.innerHeight;
        };

        const start = performance.now();
        let frame = 0;
        const draw = (time) => {
            now.x += (target.x - now.x) * FOLLOW;
            now.y += (target.y - now.y) * FOLLOW;
            gl.uniform2f(view.res, canvas.current.width, canvas.current.height);
            gl.uniform1f(view.t, still ? 40 : (time - start) / 1000 + 40);
            gl.uniform2f(view.m, now.x, now.y);
            gl.uniform1f(view.light, document.documentElement.dataset.theme === "light" ? 1 : 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            frame = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener("resize", resize);
        if (pointer && !still) window.addEventListener("pointermove", onMove, { passive: true });
        frame = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", onMove);
        };
    }, []);

    return (
        <div className="backdrop" aria-hidden="true">
            <canvas ref={canvas} className="backdrop__ink" />
            <div className="backdrop__grain" />
        </div>
    );
}

export default Backdrop;
