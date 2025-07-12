"use client"

import { cn } from "@/lib/utils"

// ========== ConditionBadge Component ==========
interface ConditionBadgeProps {
  condition: "New" | "Like New" | "Very Good" | "Good" | "Fair" | "Poor"
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "solid"
  className?: string
}

export function ConditionBadge({ 
  condition, 
  size = "md", 
  variant = "default",
  className 
}: ConditionBadgeProps) {
  const conditionConfig = {
    "New": {
      color: "emerald",
      icon: "✨",
      description: "Brand new with tags"
    },
    "Like New": {
      color: "green", 
      icon: "🌟",
      description: "Excellent condition, barely worn"
    },
    "Very Good": {
      color: "blue",
      icon: "👍",
      description: "Minor signs of wear"
    },
    "Good": {
      color: "yellow",
      icon: "👌",
      description: "Some signs of wear but good condition"
    },
    "Fair": {
      color: "orange",
      icon: "⚠️",
      description: "Noticeable wear but still functional"
    },
    "Poor": {
      color: "red",
      icon: "🔧",
      description: "Significant wear, may need repair"
    }
  }

  const config = conditionConfig[condition]
  const color = config.color

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2"
  }

  const colorClasses = {
    default: {
      emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
      green: "bg-green-100 text-green-800 border-green-200",
      blue: "bg-blue-100 text-blue-800 border-blue-200", 
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200",
      red: "bg-red-100 text-red-800 border-red-200"
    },
    outline: {
      emerald: "bg-white text-emerald-700 border-emerald-300",
      green: "bg-white text-green-700 border-green-300",
      blue: "bg-white text-blue-700 border-blue-300",
      yellow: "bg-white text-yellow-700 border-yellow-300", 
      orange: "bg-white text-orange-700 border-orange-300",
      red: "bg-white text-red-700 border-red-300"
    },
    solid: {
      emerald: "bg-emerald-600 text-white border-emerald-600",
      green: "bg-green-600 text-white border-green-600",
      blue: "bg-blue-600 text-white border-blue-600",
      yellow: "bg-yellow-600 text-white border-yellow-600",
      orange: "bg-orange-600 text-white border-orange-600", 
      red: "bg-red-600 text-white border-red-600"
    }
  }

  return (
    <span 
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        sizeClasses[size],
        colorClasses[variant][color],
        "transition-all duration-200 hover:scale-105",
        className
      )}
      title={config.description}
    >
      {size !== "sm" && <span className="mr-1">{config.icon}</span>}
      {condition}
    </span>
  )
}

interface StatusBadgeProps {
    status: "Available" | "Pending" | "Swapped" | "Reserved" | "Inactive" | "Rejected"
    size?: "sm" | "md" | "lg" 
    variant?: "default" | "outline" | "solid"
    animated?: boolean
    className?: string
  }
  
  export function StatusBadge({ 
    status, 
    size = "md",
    variant = "default", 
    animated = false,
    className 
  }: StatusBadgeProps) {
    const statusConfig = {
      "Available": {
        color: "green",
        icon: "✅",
        description: "Ready to swap"
      },
      "Pending": {
        color: "yellow", 
        icon: "⏳",
        description: "Swap request pending"
      },
      "Swapped": {
        color: "blue",
        icon: "🔄", 
        description: "Successfully swapped"
      },
      "Reserved": {
        color: "purple",
        icon: "🔒",
        description: "Reserved for swap"
      },
      "Inactive": {
        color: "gray",
        icon: "⏸️",
        description: "Not available for swap"
      },
      "Rejected": {
        color: "red",
        icon: "❌", 
        description: "Swap request declined"
      }
    }
  
    const config = statusConfig[status]
    const color = config.color
  
    const sizeClasses = {
      sm: "text-xs px-2 py-1",
      md: "text-sm px-3 py-1", 
      lg: "text-base px-4 py-2"
    }
  
    const colorClasses = {
      default: {
        green: "bg-green-100 text-green-800 border-green-200",
        yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
        blue: "bg-blue-100 text-blue-800 border-blue-200",
        purple: "bg-purple-100 text-purple-800 border-purple-200",
        gray: "bg-gray-100 text-gray-800 border-gray-200", 
        red: "bg-red-100 text-red-800 border-red-200"
      },
      outline: {
        green: "bg-white text-green-700 border-green-300",
        yellow: "bg-white text-yellow-700 border-yellow-300",
        blue: "bg-white text-blue-700 border-blue-300", 
        purple: "bg-white text-purple-700 border-purple-300",
        gray: "bg-white text-gray-700 border-gray-300",
        red: "bg-white text-red-700 border-red-300"
      },
      solid: {
        green: "bg-green-600 text-white border-green-600",
        yellow: "bg-yellow-600 text-white border-yellow-600",
        blue: "bg-blue-600 text-white border-blue-600",
        purple: "bg-purple-600 text-white border-purple-600",
        gray: "bg-gray-600 text-white border-gray-600",
        red: "bg-red-600 text-white border-red-600"
      }
    }
  
    return (
      <span 
        className={cn(
          "inline-flex items-center font-medium rounded-full border",
          sizeClasses[size],
          colorClasses[variant][color],
          "transition-all duration-200",
          animated && status === "Pending" && "animate-pulse",
          animated && status === "Available" && "hover:scale-105",
          className
        )}
        title={config.description}
      >
        {size !== "sm" && (
          <span className={cn(
            "mr-1",
            animated && status === "Pending" && "animate-spin"
          )}>
            {config.icon}
          </span>
        )}
        {status}
      </span>
    )
  }
  
  // ========== Combined Badge Component ==========
  interface CombinedBadgeProps {
    condition?: ConditionBadgeProps["condition"]
    status?: StatusBadgeProps["status"] 
    size?: "sm" | "md" | "lg"
    variant?: "default" | "outline" | "solid"
    layout?: "horizontal" | "vertical"
    animated?: boolean
    className?: string
  }
  
  export function CombinedBadge({
    condition,
    status,
    size = "md",
    variant = "default", 
    layout = "horizontal",
    animated = false,
    className
  }: CombinedBadgeProps) {
    if (!condition && !status) return null
  
    const containerClasses = {
      horizontal: "flex items-center space-x-2",
      vertical: "flex flex-col space-y-1"
    }
  
    return (
      <div className={cn(containerClasses[layout], className)}>
        {condition && (
          <ConditionBadge 
            condition={condition}
            size={size}
            variant={variant}
          />
        )}
        {status && (
          <StatusBadge 
            status={status}
            size={size} 
            variant={variant}
            animated={animated}
          />
        )}
      </div>
    )
  }
  
  // ========== Priority Badge Component ==========
  interface PriorityBadgeProps {
    priority: "Hot" | "New" | "Featured" | "Limited" | "Popular"
    size?: "sm" | "md" | "lg"
    animated?: boolean
    className?: string
  }
  
  export function PriorityBadge({ 
    priority, 
    size = "md", 
    animated = true,
    className 
  }: PriorityBadgeProps) {
    const priorityConfig = {
      "Hot": {
        color: "bg-gradient-to-r from-red-500 to-orange-500",
        icon: "🔥",
        textColor: "text-white"
      },
      "New": {
        color: "bg-gradient-to-r from-green-500 to-emerald-500", 
        icon: "✨",
        textColor: "text-white"
      },
      "Featured": {
        color: "bg-gradient-to-r from-purple-500 to-pink-500",
        icon: "⭐",
        textColor: "text-white"
      },
      "Limited": {
        color: "bg-gradient-to-r from-yellow-500 to-orange-500",
        icon: "⚡",
        textColor: "text-white"
      },
      "Popular": {
        color: "bg-gradient-to-r from-blue-500 to-purple-500",
        icon: "👑", 
        textColor: "text-white"
      }
    }
  
    const config = priorityConfig[priority]
  
    const sizeClasses = {
      sm: "text-xs px-2 py-1",
      md: "text-sm px-3 py-1.5",
      lg: "text-base px-4 py-2"
    }
  
    return (
      <span 
        className={cn(
          "inline-flex items-center font-bold rounded-full border-0 shadow-lg",
          config.color,
          config.textColor,
          sizeClasses[size],
          animated && "animate-pulse hover:animate-none hover:scale-110",
          "transition-all duration-300",
          className
        )}
      >
        {size !== "sm" && <span className="mr-1">{config.icon}</span>}
        {priority}
      </span>
    )
  }
  
  // ========== Size Badge Component ==========
  interface SizeBadgeProps {
    size: string
    category?: "Clothing" | "Shoes" | "Accessories"
    variant?: "default" | "outline"
    className?: string
  }
  
  export function SizeBadge({ 
    size, 
    category = "Clothing", 
    variant = "default",
    className 
  }: SizeBadgeProps) {
    const categoryIcons = {
      "Clothing": "👕",
      "Shoes": "👟", 
      "Accessories": "👜"
    }
  
    const variantClasses = {
      default: "bg-slate-100 text-slate-700 border-slate-200",
      outline: "bg-white text-slate-700 border-slate-300"
    }
  
    return (
      <span 
        className={cn(
          "inline-flex items-center text-sm font-medium px-3 py-1 rounded-full border",
          variantClasses[variant],
          "transition-colors duration-200",
          className
        )}
      >
        <span className="mr-1">{categoryIcons[category]}</span>
        Size {size}
      </span>
    )
  }
  
  // Export all components
  export default {
    ConditionBadge,
    StatusBadge, 
    CombinedBadge,
    PriorityBadge,
    SizeBadge
}