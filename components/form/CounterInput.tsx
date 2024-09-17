'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardHeader } from "../ui/card"
import { LuMinus, LuPlus } from 'react-icons/lu'

export default function CounterInput({ title, defaultValue }: { title: string, defaultValue?: number }) {
  const [count, setCount] = useState(defaultValue || 0);
  const increasteCount = () => setCount((prevCount) => prevCount += 1);
  const decreasteCount = () => setCount((prevCount) => prevCount > 0 ? prevCount -= 1 : prevCount);
  return <Card className="mb-4">
    <input type="hidden" name={title} value={count} />
    <CardHeader className="flex flex-col gap-y-5">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex flex-col">
          <h2 className="font-medium capitalize">{title}</h2>
          <p className="text-muted-foreground text-sm">Specify the number of {title}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant='outline' size='icon' type="button" onClick={decreasteCount}>
            <LuMinus className="w-5 h-5 text-primary" />
          </Button>
          <span className="text-xl font-bold w-5 text-center">{count}</span>
          <Button variant='outline' size='icon' type="button" onClick={increasteCount}>
            <LuPlus className="w-5 h-5 text-primary" />
          </Button>
        </div>
      </div>
    </CardHeader>
  </Card>
}
