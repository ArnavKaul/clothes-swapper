"use client"

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DashboardCounterProps {
  value: number
  label: string
  icon?: React.ReactNode
  prefix?: string
  suffix?: string
  duration?: number
  delay?: number
  decimals?: number
  separator?: string
  preserveValue?: boolean
  className?: string
  valueClassName?: string
  labelClassName?: string
  iconClassName?: string
  variant?: 'default' | 'minimal' | 'card' | 'large'
  color?: 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'slate'
  animationType?: 'count' | 'fade' | 'slide' | 'scale'
}

// Simple counter hook without external dependencies
const useCountUp = (
  end: number,
  duration: number = 2000,
  delay: number = 0,
  decimals: number = 0,
  isInView: boolean = true
) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView || hasAnimated) return

    const startTime = Date.now() + delay
    const endTime = startTime + duration

    const updateCount = () => {
      const now = Date.now()
      
      if (now < startTime) {
        requestAnimationFrame(updateCount)
        return
      }

      if (now >= endTime) {
        setCount(end)
        setHasAnimated(true)
        return
      }

      const progress = (now - startTime) / duration
      const easeOut = 1 - Math.pow(1 - progress, 3) // Cubic ease-out
      const currentCount = easeOut * end
      
      setCount(Number(currentCount.toFixed(decimals)))
      requestAnimationFrame(updateCount)
    }

    requestAnimationFrame(updateCount)
  }, [end, duration, delay, decimals, isInView, hasAnimated])

  return count
}

export default function DashboardCounter({
  value,
  label,
  icon,
  prefix = '',
  suffix = '',
  duration = 2000,
  delay = 0,
  decimals = 0,
  separator = ',',
  preserveValue = false,
  className = '',
  valueClassName = '',
  labelClassName = '',
  iconClassName = '',
  variant = 'default',
  color = 'blue',
  animationType = 'count'
}: DashboardCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const animatedValue = useCountUp(value, duration, delay, decimals, isInView)

  // Format number with separator
  const formatNumber = (num: number) => {
    const parts = num.toFixed(decimals).split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return parts.join('.')
  }

  const displayValue = preserveValue ? value : animatedValue

  // Color configurations
  const colorConfig = {
    blue: {
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      valueBg: 'bg-blue-50',
      valueColor: 'text-blue-900',
      accent: 'border-blue-200'
    },
    green: {
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      valueBg: 'bg-green-50',
      valueColor: 'text-green-900',
      accent: 'border-green-200'
    },
    purple: {
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      valueBg: 'bg-purple-50',
      valueColor: 'text-purple-900',
      accent: 'border-purple-200'
    },
    red: {
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      valueBg: 'bg-red-50',
      valueColor: 'text-red-900',
      accent: 'border-red-200'
    },
    orange: {
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      valueBg: 'bg-orange-50',
      valueColor: 'text-orange-900',
      accent: 'border-orange-200'
    },
    slate: {
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600',
      valueBg: 'bg-slate-50',
      valueColor: 'text-slate-900',
      accent: 'border-slate-200'
    }
  }

  const colors = colorConfig[color]

  // Animation classes based on type
  const getAnimationClasses = () => {
    if (!isInView) {
      switch (animationType) {
        case 'fade':
          return 'opacity-0'
        case 'slide':
          return 'opacity-0 translate-y-4'
        case 'scale':
          return 'opacity-0 scale-95'
        default:
          return ''
      }
    }

    switch (animationType) {
      case 'fade':
        return 'opacity-100 transition-opacity duration-1000 ease-out'
      case 'slide':
        return 'opacity-100 translate-y-0 transition-all duration-1000 ease-out'
      case 'scale':
        return 'opacity-100 scale-100 transition-all duration-1000 ease-out'
      default:
        return ''
    }
  }

  // Variant configurations
  const variants = {
    default: (
      <div
        ref={ref}
        className={cn(
          'flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 hover:shadow-md',
          colors.valueBg,
          colors.accent,
          'border',
          getAnimationClasses(),
          className
        )}
      >
        {icon && (
          <div className={cn(
            'p-2 rounded-lg',
            colors.iconBg,
            iconClassName
          )}>
            <div className={colors.iconColor}>
              {icon}
            </div>
          </div>
        )}
        <div className="flex-1">
          <div className={cn(
            'text-2xl font-bold transition-all duration-300',
            colors.valueColor,
            valueClassName
          )}>
            {prefix}{formatNumber(displayValue)}{suffix}
          </div>
          <div className={cn(
            'text-sm text-slate-600',
            labelClassName
          )}>
            {label}
          </div>
        </div>
      </div>
    ),

    minimal: (
      <div
        ref={ref}
        className={cn(
          'text-center space-y-2',
          getAnimationClasses(),
          className
        )}
      >
        {icon && (
          <div className={cn(
            'w-8 h-8 mx-auto flex items-center justify-center',
            colors.iconColor,
            iconClassName
          )}>
            {icon}
          </div>
        )}
        <div className={cn(
          'text-2xl font-bold',
          colors.valueColor,
          valueClassName
        )}>
          {prefix}{formatNumber(displayValue)}{suffix}
        </div>
        <div className={cn(
          'text-sm text-slate-600',
          labelClassName
        )}>
          {label}
        </div>
      </div>
    ),

    card: (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1',
          getAnimationClasses(),
          className
        )}
      >
        {icon && (
          <div className={cn(
            'w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center',
            colors.iconBg,
            iconClassName
          )}>
            <div className={colors.iconColor}>
              {icon}
            </div>
          </div>
        )}
        <div className={cn(
          'text-3xl font-bold mb-2',
          colors.valueColor,
          valueClassName
        )}>
          {prefix}{formatNumber(displayValue)}{suffix}
        </div>
        <div className={cn(
          'text-slate-600 font-medium',
          labelClassName
        )}>
          {label}
        </div>
      </div>
    ),

    large: (
      <div
        ref={ref}
        className={cn(
          'text-center space-y-4 p-8',
          getAnimationClasses(),
          className
        )}
      >
        {icon && (
          <div className={cn(
            'w-16 h-16 mx-auto rounded-2xl flex items-center justify-center',
            colors.iconBg,
            iconClassName
          )}>
            <div className={colors.iconColor}>
              {icon}
            </div>
          </div>
        )}
        <div className="space-y-2">
          <div className={cn(
            'text-5xl font-bold',
            colors.valueColor,
            valueClassName
          )}>
            {prefix}{formatNumber(displayValue)}{suffix}
          </div>
          <div className={cn(
            'text-lg text-slate-600 font-medium',
            labelClassName
          )}>
            {label}
          </div>
        </div>
      </div>
    )
  }

  return variants[variant]
}

// Pre-configured counter variants
export const StatCounter = (props: Partial<DashboardCounterProps>) => (
  <DashboardCounter
    variant="card"
    color="blue"
    duration={2000}
    {...props}
  />
)

export const MetricCounter = (props: Partial<DashboardCounterProps>) => (
  <DashboardCounter
    variant="minimal"
    color="green"
    duration={1500}
    animationType="scale"
    {...props}
  />
)

export const HeroCounter = (props: Partial<DashboardCounterProps>) => (
  <DashboardCounter
    variant="large"
    color="purple"
    duration={3000}
    animationType="slide"
    {...props}
  />
)

// Counter with percentage
export const PercentageCounter = (props: Partial<DashboardCounterProps>) => (
  <DashboardCounter
    suffix="%"
    decimals={1}
    color="green"
    variant="card"
    {...props}
  />
)

// Counter with currency
export const CurrencyCounter = (props: Partial<DashboardCounterProps>) => (
  <DashboardCounter
    prefix="$"
    separator=","
    color="green"
    variant="card"
    {...props}
  />
)

// Counter grid component for displaying multiple counters
interface CounterGridProps {
  counters: Array<{
    value: number
    label: string
    icon?: React.ReactNode
    color?: DashboardCounterProps['color']
    prefix?: string
    suffix?: string
  }>
  variant?: DashboardCounterProps['variant']
  className?: string
}

export const CounterGrid = ({ 
  counters, 
  variant = 'card', 
  className = '' 
}: CounterGridProps) => {
  return (
    <div className={cn(
      'grid gap-6',
      counters.length === 2 && 'grid-cols-1 md:grid-cols-2',
      counters.length === 3 && 'grid-cols-1 md:grid-cols-3',
      counters.length === 4 && 'grid-cols-2 md:grid-cols-4',
      counters.length > 4 && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      className
    )}>
      {counters.map((counter, index) => (
        <DashboardCounter
          key={index}
          value={counter.value}
          label={counter.label}
          icon={counter.icon}
          color={counter.color}
          prefix={counter.prefix}
          suffix={counter.suffix}
          variant={variant}
          delay={index * 200} // Stagger animations
          duration={2000 + index * 300} // Varying durations
        />
      ))}
    </div>
  )
}