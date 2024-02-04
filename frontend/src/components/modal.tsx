import { Dialog } from '@headlessui/react'
import { Icons } from "./icons";
import { cn } from "../lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode,
  className?: string
}

const Modal = ({ open, onClose, children, className }: Props) => {
  const CloseIcon = Icons['close']
  return (
    <Dialog as='div' open={open} onClose={onClose} className="bg-black/40 backdrop-blur-sm p-5 w-screen min-h-screen fixed top-0 left-0 flex items-center justify-center ">
      <Dialog.Panel className={cn("bg-white rounded-lg p-5 relative max-w-[90ch] ", className)}>
        <button onClick={onClose} className="absolute top-3 right-3 text-rose-400">
          <CloseIcon size={30} strokeWidth={3} />
        </button>
        {children}
      </Dialog.Panel>
    </Dialog>
  )
}

export default Modal