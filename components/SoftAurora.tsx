import { Renderer, Program, Mesh, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

interface SoftAuroraProps {
  speed?: number;
  scale?: number;
  brightness?: number;
  color1?: string;
  color2?: string;
  noiseFrequency?: number;
  noiseAmplitude?: number;
  bandHeight?: number;
  bandSpread?: number;
  octaveDecay?: number;
  layerOffset?: number;
  colorSpeed?: number;
  enableMouseInteraction?: boolean;
  mouseInfluence?: number;
}

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uNoiseFreq;
uniform float uNoiseAmp;
uniform float uBandHeight;
uniform float uBandSpread;
uniform float uOctaveDecay;
uniform float uLayerOffset;
uniform float uColorSpeed;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define TAU 6.28318

// Fast 2D gradient hash — replaces 3D trig-based hash (no acos/sin/cos)
vec2 gradHash2D(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

// Quintic smooth interpolation (vec2 version)
vec2 quintic(vec2 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

// 2D Perlin noise — 4 gradient corners vs 8 in 3D, no trig hash
float perlin2D(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = quintic(f);
  float d00 = dot(gradHash2D(i),                f);
  float d10 = dot(gradHash2D(i + vec2(1.0,0.0)), f - vec2(1.0,0.0));
  float d01 = dot(gradHash2D(i + vec2(0.0,1.0)), f - vec2(0.0,1.0));
  float d11 = dot(gradHash2D(i + vec2(1.0,1.0)), f - vec2(1.0,1.0));
  return mix(mix(d00, d10, u.x), mix(d01, d11, u.x), u.y);
}

vec3 cosineGradient(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(TAU * (c * t + d));
}

float auroraGlow(float t, vec2 shift) {
  vec2 uv = gl_FragCoord.xy / uResolution.y;
  uv += shift;
  float noiseVal = 0.0;
  float freq = uNoiseFreq;
  float amp  = uNoiseAmp;
  vec2 sp = uv * uScale;
  for (float i = 0.0; i < 2.0; i += 1.0) {
    // Animate by translating the 2D sample position over time (replaces pz = time in 3D)
    noiseVal += amp * perlin2D(sp * freq + vec2(t * 0.8, t * 0.3));
    amp  *= uOctaveDecay;
    freq *= 2.0;
  }
  float yBand = uv.y * 10.0 - uBandHeight * 10.0;
  return 0.3 * max(exp(uBandSpread * (1.0 - 1.1 * abs(noiseVal + yBand))), 0.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float t  = uSpeed * 0.4 * uTime;
  vec2 shift = uEnableMouse ? (uMouse - 0.5) * uMouseInfluence : vec2(0.0);
  vec3 col = vec3(0.0);
  col += 0.99 * auroraGlow(t, shift)               * cosineGradient(uv.x + uTime * uSpeed * 0.2 * uColorSpeed, vec3(0.5), vec3(0.5), vec3(1.0),     vec3(0.3,0.20,0.20)) * uColor1;
  col += 0.99 * auroraGlow(t + uLayerOffset, shift) * cosineGradient(uv.x + uTime * uSpeed * 0.1 * uColorSpeed, vec3(0.5), vec3(0.5), vec3(2.0,1.0,0.0), vec3(0.5,0.20,0.25)) * uColor2;
  col *= uBrightness;
  gl_FragColor = vec4(col, clamp(length(col), 0.0, 1.0));
}
`;

export default function SoftAurora({
  speed = 0.6,
  scale = 1.5,
  brightness = 1.0,
  color1 = '#f7f7f7',
  color2 = '#e100ff',
  noiseFrequency = 2.5,
  noiseAmplitude = 1.0,
  bandHeight = 0.5,
  bandSpread = 1.0,
  octaveDecay = 0.1,
  layerOffset = 0,
  colorSpeed = 1.0,
  enableMouseInteraction = true,
  mouseInfluence = 0.25,
}: SoftAuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    let program: Program;
    const currentMouse = [0.5, 0.5];
    const targetMouse = [0.5, 0.5];

    function handleMouseMove(e: MouseEvent) {
      const rect = (gl.canvas as HTMLCanvasElement).getBoundingClientRect();
      targetMouse[0] = (e.clientX - rect.left) / rect.width;
      targetMouse[1] = 1.0 - (e.clientY - rect.top) / rect.height;
    }

    function handleMouseLeave() {
      targetMouse[0] = 0.5;
      targetMouse[1] = 0.5;
    }

    function resize() {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      // Render at 50% resolution — aurora is soft/blurry so upscaling is imperceptible
      renderer.setSize(Math.floor(w * 0.5), Math.floor(h * 0.5));
      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      if (program) {
        program.uniforms.uResolution.value = [
          Math.floor(w * 0.5),
          Math.floor(h * 0.5),
          w / h,
        ];
      }
    }
    window.addEventListener('resize', resize);
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime:          { value: 0 },
        uResolution:    { value: [(gl.canvas as HTMLCanvasElement).width, (gl.canvas as HTMLCanvasElement).height, (gl.canvas as HTMLCanvasElement).width / (gl.canvas as HTMLCanvasElement).height] },
        uSpeed:         { value: speed },
        uScale:         { value: scale },
        uBrightness:    { value: brightness },
        uColor1:        { value: hexToVec3(color1) },
        uColor2:        { value: hexToVec3(color2) },
        uNoiseFreq:     { value: noiseFrequency },
        uNoiseAmp:      { value: noiseAmplitude },
        uBandHeight:    { value: bandHeight },
        uBandSpread:    { value: bandSpread },
        uOctaveDecay:   { value: octaveDecay },
        uLayerOffset:   { value: layerOffset },
        uColorSpeed:    { value: colorSpeed },
        uMouse:         { value: new Float32Array([0.5, 0.5]) },
        uMouseInfluence: { value: mouseInfluence },
        uEnableMouse:   { value: enableMouseInteraction },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas as HTMLCanvasElement);

    if (enableMouseInteraction) {
      (gl.canvas as HTMLCanvasElement).addEventListener('mousemove', handleMouseMove);
      (gl.canvas as HTMLCanvasElement).addEventListener('mouseleave', handleMouseLeave);
    }

    let animationFrameId: number;

    function update(time: number) {
      animationFrameId = requestAnimationFrame(update);
      program.uniforms.uTime.value = time * 0.001;

      if (enableMouseInteraction) {
        currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
        program.uniforms.uMouse.value[0] = currentMouse[0];
        program.uniforms.uMouse.value[1] = currentMouse[1];
      } else {
        program.uniforms.uMouse.value[0] = 0.5;
        program.uniforms.uMouse.value[1] = 0.5;
      }

      renderer.render({ scene: mesh });
    }
    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (enableMouseInteraction) {
        (gl.canvas as HTMLCanvasElement).removeEventListener('mousemove', handleMouseMove);
        (gl.canvas as HTMLCanvasElement).removeEventListener('mouseleave', handleMouseLeave);
      }
      if (container.contains(gl.canvas as HTMLCanvasElement)) {
        container.removeChild(gl.canvas as HTMLCanvasElement);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [speed, scale, brightness, color1, color2, noiseFrequency, noiseAmplitude, bandHeight, bandSpread, octaveDecay, layerOffset, colorSpeed, enableMouseInteraction, mouseInfluence]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
