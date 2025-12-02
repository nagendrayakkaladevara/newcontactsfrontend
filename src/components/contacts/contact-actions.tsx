/**
 * ContactActions Component
 * Reusable component for contact action buttons (Copy and Call)
 */

import { Phone, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react"

interface ContactActionsProps {
  phone: string
  contactName: string
  onCopy?: () => void
}

export function ContactActions({
  phone,
  contactName,
  onCopy,
}: ContactActionsProps) {
  const [isCopied, setIsCopied] = useState(false)

  const phoneNumber = phone?.replace(/\s+/g, "") || ""
  const canCall = phoneNumber.length > 0

  const handleCopyPhone = async (phoneNumber: string) => {
    try {
      await navigator.clipboard.writeText(phoneNumber)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
      onCopy?.()
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = phoneNumber
      textArea.style.position = "fixed"
      textArea.style.opacity = "0"
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
      onCopy?.()
    }
  }

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`
  }

  if (!canCall) {
    return <span className="text-muted-foreground text-sm">-</span>
  }

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant={isCopied ? "default" : "secondary"}
            className={`h-8 w-8 transition-all ${
              isCopied ? "bg-green-600 hover:bg-green-700" : ""
            }`}
            onClick={() => handleCopyPhone(phone)}
          >
            {isCopied ? (
              <Check className="h-4 w-4 animate-in fade-in-0 zoom-in-95" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isCopied ? "Copied!" : "Copy phone number"}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="destructive"
            className="h-8 cursor-pointer"
            onClick={handleCall}
          >
            <Phone className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Call {contactName}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

