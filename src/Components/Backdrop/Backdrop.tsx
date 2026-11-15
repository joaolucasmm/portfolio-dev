import { useEffect, useRef } from "react";

// The page's background: liquid ink that flows slowly and is pushed aside by the
// pointer, drawn by one WebGL shader at a fraction of the screen's resolution
// (it is soft, so nobody sees the pixels), with film grain on top (base/_layout.scss).
// Without WebGL the plain theme colour shows instead.
//
// It stays out of the way of the first screen: it starts once the page has loaded
// and the browser is idle, compiles off the main thread where the GPU allows, reads
// only the scroll position per frame, and draws at most 30 times a second.

// How far the ink trails the pointer per 60 Hz frame (0–1).
const FOLLOW = 0.06;
// The ink moves slowly, so 30 frames a second are enough.
const FRAME_MS = 1000 / 30;
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

type Rgb = number[];
/** [base, blue, pink, violet], the four colours the shader mixes. */
type Palette = Rgb[];
type Theme = "dark" | "light";
type Tinted = "top" | "about" | "work" | "experience" | "education" | "contact";
type PaletteSet = Record<Tinted, Palette>;

// Each section tints the ink: [base, blue, pink, violet] per theme, in 0–1 RGB.
// The hero keeps the original palette; the contact leans pink, into the footer.
const DARK: PaletteSet = {
    top: [[0.08, 0.1, 0.19], [0.29, 0.31, 0.75], [0.95, 0.46, 0.62], [0.33, 0.18, 0.52]],
    about: [[0.05, 0.1, 0.15], [0.16, 0.42, 0.62], [0.3, 0.72, 0.68], [0.12, 0.26, 0.44]],
    work: [[0.12, 0.07, 0.12], [0.55, 0.22, 0.42], [0.98, 0.56, 0.4], [0.42, 0.16, 0.3]],
    experience: [[0.05, 0.08, 0.19], [0.2, 0.36, 0.86], [0.46, 0.64, 0.98], [0.18, 0.2, 0.56]],
    education: [[0.1, 0.08, 0.16], [0.45, 0.3, 0.76], [0.98, 0.72, 0.45], [0.38, 0.2, 0.5]],
    contact: [[0.12, 0.07, 0.15], [0.6, 0.28, 0.7], [1, 0.48, 0.64], [0.45, 0.16, 0.4]],
};
const tinted = Object.keys(DARK) as Tinted[];
const isTinted = (id: string): id is Tinted => (tinted as string[]).includes(id);

// The light theme: the hero's own values, the rest lifted from the dark ones.
const lift = ([base, ...rest]: Palette): Palette => [
    base.map((v) => Math.min(1, 0.72 + v * 1.2)),
    ...rest.map((c) => c.map((v) => Math.min(1, 0.35 + v * 0.65))),
];
const LIGHT = Object.fromEntries(tinted.map((id) => [id, lift(DARK[id])])) as PaletteSet;
LIGHT.top = [[0.8, 0.74, 0.97], [0.47, 0.52, 0.96], [0.94, 0.46, 0.76], [0.64, 0.5, 0.93]];
const PALETTES: Record<Theme, PaletteSet> = { dark: DARK, light: LIGHT };

// How far each section moves away from the hero's palette (0 = not at all, 1 = its
// full palette): kept low so the ink only leans toward another tone.
const SHIFT = 0.35;
for (const set of Object.values(PALETTES)) {
    for (const id of tinted) {
        if (id === "top") continue;
        set[id] = set[id].map((c, i) => c.map((v, j) => set.top[i][j] + (v - set.top[i][j]) * SHIFT));
    }
}

// Share of the gap to the target palette closed per 60 Hz frame: low, so a change
// takes a couple of seconds.
const EASE = 0.025;

// The same easing at any frame rate: `rate` is per 60 Hz frame, `dt` in ms.
const eased = (rate: number, dt: number) => 1 - Math.pow(1 - rate, dt / (1000 / 60));

const smooth = (a: number, b: number, x: number) => {
    const k = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return k * k * (3 - 2 * k);
};

/** Where a tinted section sits on the page, measured when the layout changes. */
interface Band {
    id: Tinted;
    top: number;
    height: number;
}

function measureBands(): Band[] {
    return [...document.querySelectorAll("main > section[id]")]
        .filter((el) => isTinted(el.id))
        .map((el) => {
            const r = el.getBoundingClientRect();
            return { id: el.id as Tinted, top: r.top + window.scrollY, height: r.height };
        });
}

// The palette for where the page is: the section under the middle of the screen,
// blending into the next one over the second half of its height. It reads only the
// scroll position, so a frame never makes the browser lay out the page.
function paletteNow(theme: Theme, bands: Band[]): Palette {
    const set = PALETTES[theme];
    const probe = window.scrollY + window.innerHeight / 2;
    let from = set.top;
    let to = set.top;
    let w = 0;
    for (let i = 0; i < bands.length; i++) {
        const band = bands[i];
        if (probe < band.top) break;
        from = set[band.id];
        to = bands[i + 1] ? set[bands[i + 1].id] : from;
        w = smooth(0.5, 1, (probe - band.top) / Math.max(1, band.height));
    }
    return from.map((c, i) => c.map((v, j) => v + (to[i][j] - v) * w));
}

// Compiles and links the shader. With KHR_parallel_shader_compile the driver does
// it off the main thread and `ready` is polled once a frame; without it, `finish`
// waits for the compile when it checks the link status.
function setUp(canvas: HTMLCanvasElement) {
    // jsdom has no getContext; the page then keeps its plain ground.
    const gl = canvas.getContext?.("webgl", { antialias: false, alpha: false });
    if (!gl) return null;
    const parallel = gl.getExtension("KHR_parallel_shader_compile");
    const compile = (type: GLenum, source: string) => {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);

    const ready = () => !parallel || (gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR) as boolean);

    // Once linked: the program, the full-screen quad and the uniforms.
    const finish = () => {
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, "p");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        const at = (name: string) => gl.getUniformLocation(program, name);
        return { gl, res: at("res"), t: at("t"), m: at("m"), colours: ["cBase", "cBlue", "cPink", "cVio"].map(at) };
    };

    return { ready, finish };
}

type View = NonNullable<ReturnType<NonNullable<ReturnType<typeof setUp>>["finish"]>>;

// Calls `start` once the page has loaded and the browser has a quiet moment, so the
// ink never competes with the first screen. Returns a function that cancels it.
function whenIdle(start: () => void) {
    let id = 0;
    let cancelled = false;
    const schedule = () => {
        if (cancelled) return;
        if (typeof window.requestIdleCallback === "function") id = window.requestIdleCallback(start, { timeout: 2000 });
        else id = window.setTimeout(start, 300);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
        cancelled = true;
        window.removeEventListener("load", schedule);
        if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(id);
        window.clearTimeout(id);
    };
}

// Draws the ink until the returned function is called.
function run(el: HTMLCanvasElement, view: View) {
    const { gl } = view;
    el.classList.add("is-drawing");

    const media = (query: string) => typeof window.matchMedia === "function" && window.matchMedia(query).matches;
    const still = media("(prefers-reduced-motion: reduce)");
    const pointer = media("(hover: hover) and (pointer: fine)");
    const scale = media("(max-width: 720px)") ? SCALE_PHONE : SCALE_DESKTOP;
    const theme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

    // Pointer in the shader's units: x from 0 to the aspect ratio, y from 0 at the bottom to 1.
    const target = { x: 0.5, y: 0.5 };
    const now = { x: 0.5, y: 0.5 };
    const onMove = (e: PointerEvent) => {
        target.x = e.clientX / window.innerHeight;
        target.y = 1 - e.clientY / window.innerHeight;
    };

    // Section positions, measured again whenever the page changes size (a resize,
    // the other language, a panel that opens).
    let bands = measureBands();
    const remeasure = () => {
        bands = measureBands();
    };
    const pageSize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(remeasure);
    pageSize?.observe(document.body);

    let dirty = true;
    const resize = () => {
        el.width = Math.max(1, Math.round(window.innerWidth * scale));
        el.height = Math.max(1, Math.round(window.innerHeight * scale));
        gl.viewport(0, 0, el.width, el.height);
        target.x = now.x = (0.5 * window.innerWidth) / window.innerHeight;
        remeasure();
        dirty = true;
    };

    // The ink eases toward the palette of the place on the page.
    let colours = paletteNow(theme(), bands);
    const start = performance.now();
    let last = 0;
    let frame = 0;
    const draw = (time: number) => {
        frame = requestAnimationFrame(draw);
        const dt = time - last;
        if (dt < FRAME_MS - 2) return;
        last = time;
        const step = Math.min(dt, 100);

        const goal = paletteNow(theme(), bands);
        const ease = eased(EASE, step);
        let moved = false;
        colours = colours.map((c, i) =>
            c.map((v, j) => {
                const next = v + (goal[i][j] - v) * ease;
                if (Math.abs(next - v) > 1e-4) moved = true;
                return next;
            })
        );
        // Without motion the picture only changes with the palette or the size.
        if (still && !moved && !dirty) return;
        dirty = false;

        const follow = eased(FOLLOW, step);
        now.x += (target.x - now.x) * follow;
        now.y += (target.y - now.y) * follow;
        gl.uniform2f(view.res, el.width, el.height);
        gl.uniform1f(view.t, still ? 50 : (time - start) / 1000 + 50);
        gl.uniform2f(view.m, now.x, now.y);
        colours.forEach((c, i) => gl.uniform3f(view.colours[i], c[0], c[1], c[2]));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    resize();
    window.addEventListener("resize", resize);
    if (pointer && !still) window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(draw);
    return () => {
        cancelAnimationFrame(frame);
        pageSize?.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove);
    };
}

function Backdrop() {
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const el = canvas.current;
        if (!el) return undefined;
        let stop = () => {};

        const cancelIdle = whenIdle(() => {
            const pending = setUp(el);
            if (!pending) return;
            // Wait for the compile a frame at a time, then draw.
            let frame = requestAnimationFrame(function wait() {
                if (!pending.ready()) {
                    frame = requestAnimationFrame(wait);
                    return;
                }
                const view = pending.finish();
                if (view) stop = run(el, view);
            });
            stop = () => cancelAnimationFrame(frame);
        });

        return () => {
            cancelIdle();
            stop();
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
