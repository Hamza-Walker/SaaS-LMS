import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface RemoveButtonProps {
  groupUserid: string
  onRemove: () => void
  userid: string
  disabled?: boolean // Optional prop to disable the button externally
}

export default function AboutRemoveButton({
  userid,
  groupUserid,
  onRemove,
  disabled,
}: RemoveButtonProps) {
  const [isPending, setIsPending] = useState(false)

  const handleRemove = async () => {
    setIsPending(true)
    try {
      await onRemove()
    } finally {
      setIsPending(false)
    }
  }

  if (userid !== groupUserid) {
    return null
  }

  return (
    <Button
      variant="destructive"
      size="icon"
      className="absolute top-2 right-2 h-6 w-6"
      onClick={handleRemove}
      disabled={isPending || disabled} // Button is disabled if the action is pending or disabled prop is true
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
