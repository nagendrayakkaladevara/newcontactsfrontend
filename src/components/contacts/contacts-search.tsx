/**
 * ContactsSearch Component
 * Search bar with name/phone toggle for searching contacts
 */

import { useState, useEffect, useRef } from "react"
import { Search, X, Mic, MicOff, StopCircleIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "../ui/button"

// Web Speech API type definitions
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

// interface Window {
//   SpeechRecognition: {
//     new (): SpeechRecognition
//   } | undefined
//   webkitSpeechRecognition: {
//     new (): SpeechRecognition
//   } | undefined
// }

interface ContactsSearchProps {
  onSearch: (query: string, isPhoneSearch: boolean) => void
  loading: boolean
}

export function ContactsSearch({ onSearch, loading }: ContactsSearchProps) {
  const [query, setQuery] = useState("")
  const [isPhoneSearch, setIsPhoneSearch] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeechSupported, setIsSpeechSupported] = useState(false)
  
  // Use refs to store values and prevent unnecessary re-renders
  const onSearchRef = useRef(onSearch)
  const lastSearchedQueryRef = useRef<string>("")
  const isMountedRef = useRef(true)
  const isInitialMountRef = useRef(true)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  
  // Update ref when onSearch changes
  useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  // Track component mount state
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  // Check if Web Speech API is supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    setIsSpeechSupported(!!SpeechRecognition)

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'
      
      recognition.onstart = () => {
        setIsListening(true)
      }
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        // Safely access transcript with proper checks
        if (
          event.results &&
          event.results.length > 0 &&
          event.results[0] &&
          event.results[0].length > 0 &&
          event.results[0][0] &&
          event.results[0][0].transcript
        ) {
          const transcript = event.results[0][0].transcript.trim()
          if (transcript) {
            setQuery(transcript)
            // Set last searched query to prevent debounced effect from searching again
            lastSearchedQueryRef.current = transcript
            // Trigger search immediately for voice input
            onSearchRef.current(transcript, false)
          }
        } else {
          console.warn('Speech recognition result is empty or invalid')
        }
      }
      
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        if (event.error === 'no-speech') {
          // User didn't speak, just stop listening
          setIsListening(false)
        } else if (event.error === 'not-allowed') {
          alert('Microphone permission denied. Please allow microphone access to use voice search.')
        }
      }
      
      recognition.onend = () => {
        setIsListening(false)
      }
      
      recognitionRef.current = recognition
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    if (isPhoneSearch) {
      // Only allow numbers, +, -, spaces, and parentheses for phone numbers
      const phonePattern = /^[0-9+\-\s()]*$/
      if (phonePattern.test(value) || value === "") {
        setQuery(value)
      }
    } else {
      // Allow all characters for name search
      setQuery(value)
    }
  }

  // Debounced search effect with edge case handling
  useEffect(() => {
    // Don't search on initial mount (only when user types)
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false
      return
    }

    // Don't search if component is unmounted
    if (!isMountedRef.current) {
      return
    }

    const trimmedQuery = query.trim()
    const isEmpty = trimmedQuery === ""
    
    // Skip if this is the same query we just searched
    if (trimmedQuery === lastSearchedQueryRef.current) {
      return
    }

    const timer = setTimeout(() => {
      // Double-check component is still mounted
      if (!isMountedRef.current) {
        return
      }

      // Don't search if loading (prevent race conditions)
      if (loading) {
        return
      }

      if (isEmpty) {
        // Clear results when input is empty or whitespace-only
        lastSearchedQueryRef.current = ""
        onSearchRef.current("", isPhoneSearch)
      } else {
        // Only search if query has minimum length (at least 1 character after trim)
        if (trimmedQuery.length >= 1) {
          lastSearchedQueryRef.current = trimmedQuery
          onSearchRef.current(trimmedQuery, isPhoneSearch)
        }
      }
    }, 1500) // 1500ms = 1.5 seconds debounce delay

    return () => {
      clearTimeout(timer)
    }
  }, [query, isPhoneSearch, loading])

  const handleClear = () => {
    setQuery("")
    lastSearchedQueryRef.current = ""
    onSearchRef.current("", isPhoneSearch)
  }

  const handlePhoneCheckboxChange = (checked: boolean) => {
    setIsPhoneSearch(checked)
    // Stop listening if switching to phone search
    if (checked && isListening && recognitionRef.current) {
      recognitionRef.current.stop()
    }
    // Clear the query if switching modes and it contains invalid characters
    if (checked && query) {
      const phonePattern = /^[0-9+\-\s()]*$/
      if (!phonePattern.test(query)) {
        setQuery("")
      }
    }
  }

  const handleMicClick = () => {
    if (!isSpeechSupported || !recognitionRef.current) {
      alert('Voice search is not supported in your browser.')
      return
    }

    if (isListening) {
      // Stop listening
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      // Start listening
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Error starting speech recognition:', error)
        setIsListening(false)
      }
    }
  }

  return (
    <>
      {/* Listening Popup Overlay */}
      {isListening && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 border-2 border-primary/20">
            <div className="flex flex-col items-center gap-6">
              {/* Animated Mic Icon */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
                <div className="relative bg-red-500/10 rounded-full p-6">
                  <Mic className="h-16 w-16 text-red-500 animate-pulse" />
                </div>
              </div>
              
              {/* Text */}
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Listening...</h3>
                <p className="text-sm text-muted-foreground">
                  Speak now to Search Contacts by name
                </p>
              </div>
              
              {/* Stop Button */}
              <Button
                variant="destructive"
                onClick={handleMicClick}
              >
                <StopCircleIcon className="h-4 w-4" />
                Stop
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type={isPhoneSearch ? "tel" : "text"}
            placeholder={isPhoneSearch ? "Enter phone number..." : "Search by name..."}
            value={query}
            onChange={handleChange}
            className={`pl-9 ${isPhoneSearch || !isSpeechSupported ? (query ? 'pr-9' : 'pr-9') : query ? 'pr-20' : 'pr-12'} border-foreground/90 dark:border-foreground/90`}
            disabled={loading || isListening}
            inputMode={isPhoneSearch ? "tel" : "text"}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <>
                {/* Mic icon - only show for name search and when speech is supported */}
                {!isPhoneSearch && isSpeechSupported && (
                  <button
                    type="button"
                    onClick={handleMicClick}
                    className={`text-muted-foreground hover:text-foreground transition-colors ${
                      isListening ? 'text-red-500 animate-pulse' : ''
                    }`}
                    aria-label={isListening ? "Stop listening" : "Start voice search"}
                    disabled={loading}
                  >
                    {isListening ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </button>
                )}
                {/* Clear button - show when there's text */}
                {query && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      <div className="flex justify-end items-center gap-2">
        <Checkbox
          id="phone-search"
          checked={isPhoneSearch}
          onCheckedChange={(checked) => handlePhoneCheckboxChange(checked === true)}
          disabled={loading}
        />
        <Label
          htmlFor="phone-search"
          className="text-sm font-normal cursor-pointer flex items-center gap-2"
        >
          Search by phone number
        </Label>
      </div>
    </div>
    </>
  )
}

