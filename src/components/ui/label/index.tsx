import cn from "@/utils/class-names"
import { ReactNode } from "react"

const Label = ({children, className}:{ children: ReactNode, className?: string}) => {
  return (
    <p className={cn(`text-gray-700 pb-1 text-sm`, className)}>{children}</p>
  )
}
export default Label