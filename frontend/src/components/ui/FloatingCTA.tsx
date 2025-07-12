"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Sparkles, X, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FloatingCTAProps {
  onClick?: () => void
  text?: string
  icon?: React.ReactNode
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
  showAfterScroll?: number
  variant?: 'default' | 'heart' | 'sparkles' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  dismissible?: boolean
  className?: string
}

export default function FloatingCTA({
  onClick,
  text = "Start Swapping",
  icon,
  position = 'bottom-right',
  showAfterScroll = 300,
  variant = 'default',
  size = 'md',
  animated = true,
  dismissible = false,
  className = ""
}: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > showAfterScroll
      setIsVisible(scrolled && !isDismissed)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfterScroll, isDismissed])

  const handleClick = () => {
    onClick?.()
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDismissed(true)
  }

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6', 
    'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2'
  }

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  // Variant configurations
  const variants = {
    default: {
      className: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-2xl",
      icon: icon || <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
    },
    heart: {
      className: "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-2xl",
      icon: icon || <Heart className={`w-5 h-5 ml-2 transition-all ${isHovered ? 'fill-current scale-110' : ''}`} />
    },
    sparkles: {
      className: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl",
      icon: icon || <Sparkles className="w-5 h-5 ml-2 animate-pulse" />
    },
    minimal: {
      className: "bg-slate-900 hover:bg-slate-800 text-white shadow-xl border border-slate-700",
      icon: icon || <RefreshCw className="w-5 h-5 ml-2" />
    }
  }

  const currentVariant = variants[variant]

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed z-50 transition-all duration-300 ease-out",
        positionClasses[position],
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <Button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "group relative font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:scale-105 active:scale-95",
          currentVariant.className,
          sizeClasses[size],
          animated && "animate-bounce hover:animate-none",
          className
        )}
      >
        {/* Ripple effect background */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
        
        {/* Content */}
        <div className="relative flex items-center">
          <span className="whitespace-nowrap">{text}</span>
          {currentVariant.icon}
        </div>

        {/* Pulse ring animation */}
        {animated && (
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
        )}

        {/* Dismiss button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 bg-slate-600 hover:bg-slate-700 text-white rounded-full flex items-center justify-center text-xs transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </Button>

      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap opacity-90">
          Join our sustainable fashion community!
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  )
}

// Pre-configured variants for easy use
export const StartSwappingCTA = (props: Partial<FloatingCTAProps>) => (
  <FloatingCTA
    text="Start Swapping"
    variant="default"
    icon={<ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />}
    {...props}
  />
)

export const LoveSwappingCTA = (props: Partial<FloatingCTAProps>) => (
  <FloatingCTA
    text="❤️ Swap Now"
    variant="heart"
    animated={true}
    {...props}
  />
)

export const TrendingCTA = (props: Partial<FloatingCTAProps>) => (
  <FloatingCTA
    text="✨ Join Trend"
    variant="sparkles"
    size="lg"
    {...props}
  />
)

export const MinimalCTA = (props: Partial<FloatingCTAProps>) => (
  <FloatingCTA
    text="Swap"
    variant="minimal"
    size="sm"
    animated={false}
    {...props}
  />
)