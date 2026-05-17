<script setup lang="ts">
import type { Mesh, MeshBasicMaterial } from 'three'
import gsap from 'gsap'

const HOLOGRAM_OPACITY = 0.1
const HOLOGRAM_COLOR = '#ff80ab'
const ANIMATION_DURATION = 2.0

const BLOG_LANDMARK_ARGS: [number, number] = [8, 1]
const WORKS_LANDMARK_ARGS: [number, number, number, number] = [7, 1.5, 8, 32]

const LANDMARK_POSITION: [number, number, number] = [0, 0, -5]
const WORKS_LANDMARK_ROTATION: [number, number, number] = [Math.PI / 4, 0, 0]

const blogMaterialRef = shallowRef<MeshBasicMaterial | null>(null)
const worksMaterialRef = shallowRef<MeshBasicMaterial | null>(null)
const blogMeshRef = shallowRef<Mesh | null>(null)
const worksMeshRef = shallowRef<Mesh | null>(null)

const route = useRoute()
const { onBeforeRender } = useLoop()

const initialBasePath = getBasePath(route.path)

const animateOpacity = (material: MeshBasicMaterial | null, isActive: boolean) => {
  if (!material) return
  gsap.to(material, {
    opacity: isActive ? HOLOGRAM_OPACITY : 0,
    duration: ANIMATION_DURATION,
    ease: 'power2.inOut',
  })
}

watch(
  () => route.path,
  (newPath) => {
    const basePath = getBasePath(newPath)
    animateOpacity(blogMaterialRef.value, basePath === '/blog')
    animateOpacity(worksMaterialRef.value, basePath === '/works')
  }
)

onBeforeRender(({ delta }) => {
  if (blogMeshRef.value) {
    blogMeshRef.value.rotation.x += delta * 0.1
    blogMeshRef.value.rotation.y += delta * 0.15
  }
  if (worksMeshRef.value) {
    worksMeshRef.value.rotation.x -= delta * 0.05
    worksMeshRef.value.rotation.y += delta * 0.1
  }
})
</script>

<template>
  <TresGroup :position="LANDMARK_POSITION">
    <TresMesh ref="blogMeshRef">
      <TresIcosahedronGeometry :args="BLOG_LANDMARK_ARGS" />
      <TresMeshBasicMaterial
        ref="blogMaterialRef"
        :color="HOLOGRAM_COLOR"
        wireframe
        transparent
        :depth-write="false"
        :opacity="initialBasePath === '/blog' ? HOLOGRAM_OPACITY : 0"
      />
    </TresMesh>

    <TresMesh ref="worksMeshRef" :rotation="WORKS_LANDMARK_ROTATION">
      <TresTorusGeometry :args="WORKS_LANDMARK_ARGS" />
      <TresMeshBasicMaterial
        ref="worksMaterialRef"
        :color="HOLOGRAM_COLOR"
        wireframe
        transparent
        :depth-write="false"
        :opacity="initialBasePath === '/works' ? HOLOGRAM_OPACITY : 0"
      />
    </TresMesh>
  </TresGroup>
</template>
