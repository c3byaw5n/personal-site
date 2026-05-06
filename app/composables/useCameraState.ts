export const useCameraState = () => {
  const isAnimating = useState<boolean>('is-camera-animating', () => true)

  const startAnimating = () => {
    isAnimating.value = true
  }

  const stopAnimating = () => {
    isAnimating.value = false
  }

  return {
    isAnimating: readonly(isAnimating),
    startAnimating,
    stopAnimating,
  }
}
