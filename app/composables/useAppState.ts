export const useAppState = () => {
  const isOpeningComplete = useState<boolean>('isOpeningComplete', () => false)
  const isOpeningAnimating = useState<boolean>('isOpeningAnimating', () => false)

  const setOpeningComplete = (status: boolean): void => {
    isOpeningComplete.value = status
  }

  const setOpeningAnimating = (status: boolean): void => {
    isOpeningAnimating.value = status
  }

  return {
    isOpeningComplete,
    isOpeningAnimating,
    setOpeningComplete,
    setOpeningAnimating,
  }
}
