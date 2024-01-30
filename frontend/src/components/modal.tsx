import { Dialog } from '@headlessui/react'
import { Icons } from "./icons";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode
}

const Modal = ({ open, onClose, children }: Props) => {
  const CloseIcon = Icons['close']
  return (
    <Dialog as='div' open={open} onClose={onClose} className="bg-black/20 p-5 w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
      <Dialog.Panel className="bg-white rounded-lg p-5 relative w-[90ch] max-w-full">
        <button onClick={onClose} className="absolute top-3 right-3 text-rose-400">
          <CloseIcon size={30} strokeWidth={3} />
        </button>
        {children}
      </Dialog.Panel>
    </Dialog>
  )
}

export default Modal