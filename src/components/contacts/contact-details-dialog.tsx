/**
 * ContactDetailsDialog Component
 * Displays full contact details in a dialog with copy and call actions
 */

import { Phone, Building2, Briefcase, HeartPulse, Copy, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { formatPhoneNumber } from "@/lib/phone-formatter"
import type { Contact } from "@/types/contact"
import { useState } from "react"

interface ContactDetailsDialogProps {
  contact: Contact | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactDetailsDialog({
  contact,
  open,
  onOpenChange,
}: ContactDetailsDialogProps) {
  const [isCopied, setIsCopied] = useState(false)

  if (!contact) return null

  const phoneNumber = contact.phone?.replace(/\s+/g, "") || ""
  const canCall = phoneNumber.length > 0

  const handleCopyPhone = async () => {
    if (!contact.phone) return
    
    try {
      await navigator.clipboard.writeText(contact.phone)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = contact.phone
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
    }
  }

  const handleCall = () => {
    if (canCall) {
      window.location.href = `tel:${phoneNumber}`
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md p-0 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh]">
        {/* Header Section - Compact */}
        <div className="px-4 pt-4 pb-3 pr-12 border-b bg-background shrink-0">
          <DialogHeader className="space-y-0">
            <DialogTitle className="text-xl font-bold leading-tight">{contact.name}</DialogTitle>
          </DialogHeader>
        </div>

        {/* Content Section - Compact, No Scroll */}
        <div className="px-4 py-3 space-y-2.5 flex-1 min-h-0 overflow-y-auto">
          {/* Phone Number - Large and Prominent */}
          {contact.phone && (
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-1">
                <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  Phone Number
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1 break-all">
                {formatPhoneNumber(contact.phone)}
              </p>
            </div>
          )}

          {/* Additional Information - Compact Grid */}
          {(contact.lobby || contact.designation || contact.bloodGroup) && (
            <div className="space-y-2">
              {contact.lobby && (
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/40 border border-border">
                  <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-muted-foreground mb-0.5">Lobby</div>
                    <div className="text-base font-semibold text-foreground leading-tight break-words">{contact.lobby}</div>
                  </div>
                </div>
              )}
              {contact.designation && (
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/40 border border-border">
                  <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-muted-foreground mb-0.5">Designation</div>
                    <div className="text-base font-semibold text-foreground leading-tight break-words">{contact.designation}</div>
                  </div>
                </div>
              )}
              {contact.bloodGroup && (
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/40 border border-border">
                  <HeartPulse className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-muted-foreground mb-0.5">Blood Group</div>
                    <div className="text-base font-semibold text-foreground leading-tight">{contact.bloodGroup}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons - Large Touch Targets */}
        {contact.phone && (
          <div className="px-4 py-3 border-t bg-muted/30 flex gap-2.5 shrink-0">
            <Button
              variant="outline"
              className="flex-1 gap-2 h-12 text-base font-semibold border-2"
              onClick={handleCopyPhone}
            >
              {isCopied ? (
                <>
                  <Check className="h-5 w-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  Copy
                </>
              )}
            </Button>
            <Button
              className="flex-1 gap-2 h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              onClick={handleCall}
              disabled={!canCall}
            >
              <Phone className="h-5 w-5" />
              Call
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
