<script setup lang="ts">
const boxRef = shallowRef()
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta * 0.5
    boxRef.value.rotation.z += delta * 0.2
  }
})
</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 5]" :look-at="[0, 0, 0]" />

  <TresMesh ref="boxRef">
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshNormalMaterial />
  </TresMesh>

  <TresAmbientLight :intensity="0.5" />
  <TresDirectionalLight :position="[5, 5, 5]" :intensity="1" />
</template>
