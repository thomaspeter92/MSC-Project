import { useState } from "react"

export const useModal = (initOpen=false) => {
  const [open, setOpen] = useState(initOpen)

  const toggleModal = () => {
    setOpen(!open)
  }

  return {
    open, toggleModal
  }
}