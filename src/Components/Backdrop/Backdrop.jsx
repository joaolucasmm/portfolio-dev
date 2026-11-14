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
uniform vec3 cBase;
uniform vec3 cBlue;
uniform vec3 cPink;
uniform vec3 cVio;
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
  vec3 c=mix(cBase,cVio,smoothstep(.2,.7,r));
  c=mix(c,cBlue,smoothstep(.45,.9,length(q)*.9));
  c=mix(c,cPink,smoothstep(.62,.85,r*q.y*1.6));
  gl_FragColor=vec4(c,1.);
}`;

// Each section tints the ink: [base, blue, pink, violet] per theme, in 0–1 RGB.
// The hero keeps the original palette; the contact leans pink, into the footer.
const PALETTES = {
    dark: {
        top: [[0.08, 0.1, 0.19], [0.29, 0.31, 0.75], [0.95, 0.46, 0.62], [0.33, 0.18, 0.52]],
        about: [[0.05, 0.1, 0.15], [0.16, 0.42, 0.62], [0.3, 0.72, 0.68], [0.12, 0.26, 0.44]],
        work: [[0.12, 0.07, 0.12], [0.55, 0.22, 0.42], [0.98, 0.56, 0.4], [0.42, 0.16, 0.3]],
        experience: [[0.05, 0.08, 0.19], [0.2, 0.36, 0.86], [0.46, 0.64, 0.98], [0.18, 0.2, 0.56]],
        education: [[0.1, 0.08, 0.16], [0.45, 0.3, 0.76], [0.98, 0.72, 0.45], [0.38, 0.2, 0.5]],
        contact: [[0.12, 0.07, 0.15], [0.6, 0.28, 0.7], [1, 0.48, 0.64], [0.45, 0.16, 0.4]],
    },
};
// The light theme: the hero's own values, the rest lifted from the dark ones.
const lift = ([base, ...rest]) => [
    base.map((v) => Math.min(1, 0.72 + v * 1.2)),
    ...rest.map((c) => c.map((v) => Math.min(1, 0.35 + v * 0.65))),
];
PALETTES.light = Object.fromEntries(Object.entries(PALETTES.dark).map(([id, p]) => [id, lift(p)]));
PALETTES.light.top = [[0.8, 0.74, 0.97], [0.47, 0.52, 0.96], [0.94, 0.46, 0.76], [0.64, 0.5, 0.93]];

// How far each section moves away from the hero's palette (0 = not at all, 1 = its
// full palette): kept low so the ink only leans toward another tone.
const SHIFT = 0.35;
for (const set of Object.values(PALETTES)) {
    for (const id of Object.keys(set)) {
        if (id === "top") continue;
        set[id] = set[id].map((c, i) => c.map((v, j) => set.top[i][j] + (v - set.top[i][j]) * SHIFT));
    }
}

// Share of the gap to the target palette closed each frame: low, so a change takes
// a couple of seconds.
const EASE = 0.025;

const smooth = (a, b, x) => {
    const k = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return k * k * (3 - 2 * k);
};

// The palette for where the page is: the section under the middle of the screen,
// blending into the next one over the second half of its height.
function paletteNow(theme) {
    const set = PALETTES[theme];
    const probe = window.innerHeight / 2;
    const parts = [...document.querySelectorAll("main > section[id]")].filter((el) => set[el.id]);
    let from = set.top;
    let to = set.top;
    let w = 0;
    for (let i = 0; i < parts.length; i++) {
        const r = parts[i].getBoundingClientRect();
        if (probe < r.top) break;
        from = set[parts[i].id];
        to = parts[i + 1] ? set[parts[i + 1].id] : from;
        w = smooth(0.5, 1, (probe - r.top) / Math.max(1, r.height));
    }
    return from.map((c, i) => c.map((v, j) => v + (to[i][j] - v) * w));
}

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
    return { gl, res: at("res"), t: at("t"), m: at("m"), colours: ["cBase", "cBlue", "cPink", "cVio"].map(at) };
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

        // The ink eases toward the palette of the place on the page.
        let colours = paletteNow(document.documentElement.dataset.theme === "light" ? "light" : "dark");
        const start = performance.now();
        let frame = 0;
        const draw = (time) => {
            now.x += (target.x - now.x) * FOLLOW;
            now.y += (target.y - now.y) * FOLLOW;
            gl.uniform2f(view.res, canvas.current.width, canvas.current.height);
            gl.uniform1f(view.t, still ? 50 : (time - start) / 1000 + 50);
            gl.uniform2f(view.m, now.x, now.y);
            const goal = paletteNow(document.documentElement.dataset.theme === "light" ? "light" : "dark");
            colours = colours.map((c, i) => c.map((v, j) => v + (goal[i][j] - v) * EASE));
            colours.forEach((c, i) => gl.uniform3f(view.colours[i], c[0], c[1], c[2]));
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
