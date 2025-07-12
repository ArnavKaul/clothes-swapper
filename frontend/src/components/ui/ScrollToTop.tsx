"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp, ChevronUp, ChevronsUp, MousePointer } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScrollToTopProps {
  showAfter?: number
  scrollBehavior?: 'smooth' | 'auto'
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
  variant?: 'default' | 'minimal' | 'gradient' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  showProgress?: boolean
  animated?: boolean
  className?: string
}

export default function ScrollToTop({
  showAfter = 400,
  scrollBehavior = 'smooth',
  position = 'bottom-left',
  variant = 'default',
  size = 'md',
  icon,
  showProgress = false,
  animated = true,
  className = ""
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      
      // Show/hide button
      setIsVisible(scrolled > showAfter)
      
      // Calculate scroll progress
      if (showProgress) {
        const progress = (scrolled / maxScroll) * 100
        setScrollProgress(Math.min(progress, 100))
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfter, showProgress])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: scrollBehavior
    })
  }

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2'
  }

  // Size classes
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12', 
    lg: 'w-14 h-14'
  }

  // Icon sizes
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  // Variant configurations
  const variants = {
    default: "bg-slate-900 hover:bg-slate-800 text-white shadow-xl hover:shadow-2xl",
    minimal: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-lg hover:shadow-xl",
    gradient: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl",
    outline: "bg-transparent border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 backdrop-blur-sm"
  }

  // Default icons for variants
  const defaultIcons = {
    default: <ArrowUp className={iconSizes[size]} />,
    minimal: <ChevronUp className={iconSizes[size]} />,
    gradient: <ChevronsUp className={iconSizes[size]} />,
    outline: <MousePointer className={iconSizes[size]} />
  }

  const currentIcon = icon || defaultIcons[variant]

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed z-40 transition-all duration-300 ease-out",
        positionClasses[position],
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="relative">
        {/* Progress ring */}
        {showProgress && (
          <div className="absolute inset-0 rounded-full">
            <svg 
              className="w-full h-full transform -rotate-90" 
              viewBox="0 0 100 100"
            >
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-slate-200"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - scrollProgress / 100)}`}
                className="text-blue-500 transition-all duration-150"
              />
            </svg>
          </div>
        )}
        
        {/* Main button */}
        <Button
          onClick={scrollToTop}
          className={cn(
            "relative rounded-full transition-all duration-300 transform hover:scale-110 focus:scale-110 active:scale-95",
            variants[variant],
            sizeClasses[size],
            animated && "hover:animate-bounce",
            className
          )}
          aria-label="Scroll to top"
        >
          {currentIcon}
        </Button>

        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-90 transition-opacity pointer-events-none">
          Back to top
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900" />
        </div>
      </div>
    </div>
  )
}

// Pre-configured variants for easy use
export const MinimalScrollToTop = (props: Partial<ScrollToTopProps>) => (
  <ScrollToTop
    variant="minimal"
    size="sm"
    animated={false}
    {...props}
  />
)

export const GradientScrollToTop = (props: Partial<ScrollToTopProps>) => (
  <ScrollToTop
    variant="gradient"
    size="lg"
    showProgress={true}
    animated={true}
    {...props}
  />
)

export const ProgressScrollToTop = (props: Partial<ScrollToTopProps>) => (
  <ScrollToTop
    variant="default"
    size="md"
    showProgress={true}
    animated={false}
    {...props}
  />
)

export const OutlineScrollToTop = (props: Partial<ScrollToTopProps>) => (
  <ScrollToTop
    variant="outline"
    size="md"
    animated={true}
    {...props}
  />
)