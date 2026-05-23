<script setup lang="ts">
import gsap from 'gsap'

const ANIMATION_SCALE = 50
const ANIMATION_DURATION = 1.5
const AUTO_START_DELAY = 1.2

const containerRef = shallowRef<HTMLElement | null>(null)
const textRef = shallowRef<HTMLElement | null>(null)

const { isOpeningComplete, isOpeningAnimating, setOpeningAnimating, setOpeningComplete } =
  useAppState()

let gsapCtx: gsap.Context

const finalizeOpening = (): void => {
  setOpeningComplete(true)
  setOpeningAnimating(false)
}

const startOpeningAnimation = (): void => {
  if (isOpeningAnimating.value || !containerRef.value) return

  setOpeningAnimating(true)

  const mobile = isMobile()

  const tl = gsap.timeline({
    onComplete: finalizeOpening,
  })

  tl.to(
    containerRef.value,
    {
      scale: ANIMATION_SCALE,
      duration: ANIMATION_DURATION,
      ease: 'power2.in',
    },
    0
  ).to(
    containerRef.value,
    {
      opacity: 0,
      filter: mobile ? 'none' : 'blur(4px)',
      duration: ANIMATION_DURATION * 0.8,
      ease: 'power1.out',
    },
    0
  )
}

onMounted(() => {
  gsapCtx = gsap.context(() => {
    if (textRef.value) {
      gsap.fromTo(
        textRef.value,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: AUTO_START_DELAY, ease: 'power2.out' }
      )
    }

    gsap.delayedCall(AUTO_START_DELAY, () => {
      if (!isOpeningAnimating.value && !isOpeningComplete.value) {
        startOpeningAnimation()
      }
    })
  })
})

onUnmounted(() => {
  if (gsapCtx) {
    gsapCtx.revert()
  }
})
</script>

<template>
  <div
    ref="containerRef"
    aria-hidden="true"
    class="fixed inset-0 z-50 flex cursor-default touch-none flex-col items-center justify-center focus:outline-none"
  >
    <p ref="textRef" class="text-3xl tracking-widest text-fuchsia-950 opacity-0 md:text-4xl">
      Personal Site
    </p>
  </div>
</template>
