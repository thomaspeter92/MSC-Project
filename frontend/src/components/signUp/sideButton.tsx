import { cn } from "../../lib/utils"

type Props = {
  text: string,
  step: number,
  active: boolean,
  onClick: () => void
}

const SideButton = ({ text, step, active, onClick }: Props) => {
  return (
    <button onClick={onClick} className={cn("flex text-white px-5 py-3 items-center gap-3 w-full rounded-lg", active ? 'bg-rose-500/50' : '')}>
      <p className="p-2 border-2 font-bold border-white rounded-full aspect-square w-8 h-8 flex justify-center items-center">{step}</p>
      <span className="text-lg font-semibold">
        {text}
      </span>
    </button>
  )
}

export default SideButton