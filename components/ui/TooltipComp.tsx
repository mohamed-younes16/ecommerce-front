import React, { ReactNode } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
const TooltipComp = ({ children ,hoverText}:{children:ReactNode,hoverText:string}) => {
  return (
    <TooltipProvider>

    <Tooltip  delayDuration={200}>
      <TooltipTrigger className='w-full '>

           {children}

      </TooltipTrigger>
      <TooltipContent>
        <p>{hoverText}</p>
      </TooltipContent>
    </Tooltip>

</TooltipProvider>
  )
}

export default TooltipComp