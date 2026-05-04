export const useCameraState = () => {
  const isAnimating = useState<boolean>('is-camera-animating', () => true)

  return {
    isAnimating,
  }
}
