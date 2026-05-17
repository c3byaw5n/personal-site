<script setup lang="ts">
import { Color, NormalBlending } from 'three'
import type { Points, ShaderMaterial, IUniform } from 'three'
import gsap from 'gsap'

const PARTICLE_COUNT = 5000
const SPREAD_RADIUS = 50.0
const PARTICLE_BASE_SIZE = 50.0

const ROTATION_SPEED_Y = 0.02
const ROTATION_SPEED_X = 0.01

const COLOR_START = new Color('#ff80ab')
const COLOR_END = new Color('#f50057')

const VERTEX_SHADER = `
  uniform float uProgress;
  uniform float uSize;

  attribute vec3 aInitialPosition;
  attribute vec3 color;

  varying vec3 vColor;

  void main() {
    vColor = color;

    vec3 finalPos = mix(aInitialPosition, position, uProgress);

    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float visibility = smoothstep(0.0, 0.05, uProgress);
    gl_PointSize = uSize * (1.0 / -mvPosition.z) * visibility;
  }
`

const FRAGMENT_SHADER = `
  varying vec3 vColor;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.1, dist);

    gl_FragColor = vec4(vColor, alpha);
  }
`

interface ParticleUniforms {
  uProgress: IUniform<number>
  uSize: IUniform<number>
  [key: string]: IUniform<number>
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

    initialPositions[i3] = 0
    initialPositions[i3 + 1] = 0
    initialPositions[i3 + 2] = 0

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
  uProgress: { value: isOpeningComplete.value ? 1.0 : 0.0 },
  uSize: { value: PARTICLE_BASE_SIZE },
}

watch(isOpeningAnimating, (isAnimating) => {
  if (isAnimating && materialRef.value) {
    gsap.to(shaderUniforms.uProgress, {
      value: 1.0,
      duration: 2.5,
      ease: 'expo.out',
    })
  }
})

onBeforeRender(({ delta }) => {
  if (pointsRef.value) {
    pointsRef.value.rotation.y += delta * ROTATION_SPEED_Y
    pointsRef.value.rotation.x += delta * ROTATION_SPEED_X
  }
})

onUnmounted(() => {
  materialRef.value?.dispose()
  pointsRef.value?.geometry?.dispose()
})
</script>

<template>
  <TresPoints ref="pointsRef">
    <TresBufferGeometry :position="[positions, 3]" :color="[colors, 3]">
      <TresBufferAttribute attach="attributes-aInitialPosition" :args="[initialPositions, 3]" />
    </TresBufferGeometry>

    <TresShaderMaterial
      ref="materialRef"
      :vertex-shader="VERTEX_SHADER"
      :fragment-shader="FRAGMENT_SHADER"
      :uniforms="shaderUniforms"
      transparent
      :depth-write="false"
      :blending="NormalBlending"
    />
  </TresPoints>
</template>
