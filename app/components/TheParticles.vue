<script setup lang="ts">
import { Color, NormalBlending } from 'three'
import type { Points, ShaderMaterial } from 'three'
import gsap from 'gsap'

const PARTICLE_COUNT = 10000
const CLUSTER_RADIUS = 1.0
const SPREAD_RADIUS = 50.0
const PARTICLE_BASE_SIZE = 50.0

const ROTATION_SPEED_Y = 0.03
const ROTATION_SPEED_X = 0.01

const COLOR_START = new Color('#ff80ab')
const COLOR_END = new Color('#c51162')

const NOISE_FREQUENCY = 5.0
const NOISE_AMPLITUDE = 0.15

interface ParticleUniforms {
  uTime: { value: number }
  uProgress: { value: number }
  uSize: { value: number }
  uNoiseFreq: { value: number }
  uNoiseAmp: { value: number }
  [key: string]: { value: number }
}

const generateParticleData = () => {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const initialPositions = new Float32Array(PARTICLE_COUNT * 3)
  const colors = new Float32Array(PARTICLE_COUNT * 3)
  const tempColor = new Color()

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3

    positions[i3] = (Math.random() - 0.5) * SPREAD_RADIUS
    positions[i3 + 1] = (Math.random() - 0.5) * SPREAD_RADIUS
    positions[i3 + 2] = (Math.random() - 0.5) * SPREAD_RADIUS

    const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT)
    const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi
    const r = CLUSTER_RADIUS * Math.cbrt(Math.random())

    initialPositions[i3] = r * Math.sin(phi) * Math.cos(theta)
    initialPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    initialPositions[i3 + 2] = r * Math.cos(phi)

    tempColor.copy(COLOR_START).lerp(COLOR_END, Math.random())
    colors[i3] = tempColor.r
    colors[i3 + 1] = tempColor.g
    colors[i3 + 2] = tempColor.b
  }

  return { positions, initialPositions, colors }
}

const pointsRef = shallowRef<Points | null>(null)
const materialRef = shallowRef<ShaderMaterial | null>(null)

const { onBeforeRender } = useLoop()
const { isOpeningComplete, isOpeningAnimating } = useAppState()
const { positions, initialPositions, colors } = generateParticleData()

const shaderUniforms: ParticleUniforms = {
  uTime: { value: 0 },
  uProgress: { value: isOpeningComplete.value ? 1.0 : 0.0 },
  uSize: { value: PARTICLE_BASE_SIZE },
  uNoiseFreq: { value: NOISE_FREQUENCY },
  uNoiseAmp: { value: NOISE_AMPLITUDE },
}

const vertexShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uSize;
  uniform float uNoiseFreq;
  uniform float uNoiseAmp;

  attribute vec3 aInitialPosition;
  attribute vec3 color;

  varying vec3 vColor;

  void main() {
    vColor = color;

    vec3 posInit = aInitialPosition;
    float noise = sin(posInit.x * uNoiseFreq + uTime * 2.0) * cos(posInit.y * uNoiseFreq + uTime * 2.0) * uNoiseAmp;
    posInit += normalize(posInit) * noise;

    vec3 finalPos = mix(posInit, position, uProgress);

    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = uSize * (1.0 / -mvPosition.z);
  }
`

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.1, dist);

    gl_FragColor = vec4(vColor, alpha);
  }
`

watch(isOpeningAnimating, (isAnimating) => {
  if (isAnimating && materialRef.value) {
    gsap.to(shaderUniforms.uProgress, {
      value: 1.0,
      duration: 2.5,
      ease: 'expo.out',
    })
  }
})

onBeforeRender(({ elapsed, delta }) => {
  if (materialRef.value) {
    shaderUniforms.uTime.value = elapsed
  }

  if (pointsRef.value) {
    pointsRef.value.rotation.y += delta * ROTATION_SPEED_Y
    pointsRef.value.rotation.x += delta * ROTATION_SPEED_X
  }
})
</script>

<template>
  <TresPoints ref="pointsRef">
    <TresBufferGeometry :position="[positions, 3]" :color="[colors, 3]">
      <TresBufferAttribute attach="attributes-aInitialPosition" :args="[initialPositions, 3]" />
    </TresBufferGeometry>

    <TresShaderMaterial
      ref="materialRef"
      :vertex-shader="vertexShader"
      :fragment-shader="fragmentShader"
      :uniforms="shaderUniforms"
      transparent
      :depth-write="false"
      :blending="NormalBlending"
    />
  </TresPoints>
</template>
