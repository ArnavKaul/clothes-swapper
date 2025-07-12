"use client"

import { Heart, Eye, MapPin, Clock, User, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ItemCardProps {
  id: string
  title: string
  image: string
  category: string
  size?: string
  condition?: string
  owner?: string
  location?: string
  likes?: number
  views?: number
  postedDate?: string
  isLiked?: boolean
  variant?: "default" | "compact" | "featured"
  showActions?: boolean
  showStats?: boolean
  showOwner?: boolean
  enableTilt?: boolean
  onLike?: (id: string) => void
  onClick?: (id: string) => void
  onSwap?: (id: string) => void
  className?: string
}

export default function EnhancedItemCard({
  id,
  title,
  image,
  category,
  size,
  condition,
  owner,
  location,
  likes = 0,
  views = 0,
  postedDate,
  isLiked = false,
  variant = "default",
  showActions = true,
  showStats = true,
  showOwner = true,
  enableTilt = true,
  onLike,
  onClick,
  onSwap,
  className
}: ItemCardProps) {
  const [liked, setLiked] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(likes)
  const [isSwapping, setIsSwapping] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Vanilla Tilt Integration
  useEffect(() => {
    if (!enableTilt || !cardRef.current) return

    const loadVanillaTilt = async () => {
      try {
        const VanillaTilt = (await import('vanilla-tilt')).default
        
        if (cardRef.current) {
          VanillaTilt.init(cardRef.current, {
            max: 15,
            speed: 1000,
            glare: true,
            "max-glare": 0.2,
            scale: 1.02,
            perspective: 1000,
            transition: true,
            axis: null,
            reset: true,
            easing: "cubic-bezier(.03,.98,.52,.99)"
          })
        }
      } catch (error) {
        console.log('Vanilla Tilt not available:', error)
      }
    }

    loadVanillaTilt()

    return () => {
      if (cardRef.current?.vanillaTilt) {
        cardRef.current.vanillaTilt.destroy()
      }
    }
  }, [enableTilt])

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newLiked = !liked
    setLiked(newLiked)
    setLikeCount(prev => newLiked ? prev + 1 : prev - 1)
    onLike?.(id)
  }

  const handleSwap = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSwapping(true)
    
    // Simulate swap animation delay
    setTimeout(() => {
      setIsSwapping(false)
      onSwap?.(id)
    }, 600)
  }

  const handleCardClick = () => {
    onClick?.(id)
  }

  const cardVariants = {
    default: "w-full",
    compact: "w-full max-w-sm",
    featured: "w-full max-w-md"
  }

  const imageVariants = {
    default: "aspect-[4/5]",
    compact: "aspect-square",
    featured: "aspect-[4/5]"
  }

  return (
    <div 
      ref={cardRef}
      className={cn(
        // Base styles with enhanced hover animations
        "group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 transform cursor-pointer border border-slate-100",
        // Hover animations
        "hover:shadow-2xl hover:shadow-slate-500/25 hover:scale-105 hover:-translate-y-2",
        // Active state
        "active:scale-100 active:translate-y-0",
        // Focus styles
        "focus-within:ring-4 focus-within:ring-blue-500/20",
        cardVariants[variant],
        className
      )}
      onClick={handleCardClick}
      style={{
        willChange: 'transform',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Image Container with Enhanced Animations */}
      <div className={cn("relative overflow-hidden", imageVariants[variant])}>
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
        />
        
        {/* Animated overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        </div>
        
        {/* Top Right Actions with Staggered Animation */}
        <div className="absolute top-3 right-3 flex space-x-2">
          {showActions && (
            <>
              <button
                onClick={handleLike}
                className={cn(
                  "p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-125 active:scale-110",
                  "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
                  "transition-delay-100",
                  liked 
                    ? "bg-red-500/90 text-white shadow-lg shadow-red-500/25" 
                    : "bg-white/80 text-slate-600 hover:bg-white hover:text-red-500"
                )}
                style={{ transitionDelay: '100ms' }}
              >
                <Heart className={cn(
                  "w-4 h-4 transition-all duration-200",
                  liked && "fill-current scale-110"
                )} />
              </button>
              
              <button
                className={cn(
                  "p-2 rounded-full bg-white/80 text-slate-600 hover:bg-white backdrop-blur-sm transition-all duration-300 transform hover:scale-125",
                  "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
                  "transition-delay-200"
                )}
                style={{ transitionDelay: '200ms' }}
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Category Badge with Slide Animation */}
        <div className="absolute top-3 left-3 transform -translate-x-8 group-hover:translate-x-0 transition-transform duration-500 ease-out">
          <Badge 
            variant="secondary" 
            className="bg-white/90 text-slate-700 backdrop-blur-sm shadow-lg"
          >
            {category}
          </Badge>
        </div>

        {/* Animated Quick Action Button */}
        {showActions && (
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <Button 
              onClick={handleSwap}
              disabled={isSwapping}
              className={cn(
                "w-full bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all duration-300",
                "transform hover:scale-105 active:scale-95",
                isSwapping && "animate-pulse bg-green-700"
              )}
            >
              {isSwapping ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Swapping...</span>
                </div>
              ) : (
                "Quick Swap"
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Card Content with Enhanced Animations */}
      <div className="p-4 space-y-3 transform group-hover:translate-y-0 transition-transform duration-300">
        {/* Title and Size with Bounce Animation */}
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-slate-900 text-lg leading-tight group-hover:text-green-600 transition-all duration-300 transform group-hover:scale-105">
            {title}
          </h3>
          {size && (
            <Badge 
              variant="outline" 
              className="text-xs ml-2 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300"
            >
              {size}
            </Badge>
          )}
        </div>

        {/* Condition Badge with Color Animation */}
        {condition && (
          <div className="flex items-center space-x-2">
            <Badge 
              variant="outline"
              className={cn(
                "text-xs transition-all duration-300 transform group-hover:scale-105",
                condition === "New" && "border-green-500 text-green-700 group-hover:bg-green-50",
                condition === "Like New" && "border-blue-500 text-blue-700 group-hover:bg-blue-50", 
                condition === "Very Good" && "border-emerald-500 text-emerald-700 group-hover:bg-emerald-50",
                condition === "Good" && "border-yellow-500 text-yellow-700 group-hover:bg-yellow-50",
                condition === "Fair" && "border-orange-500 text-orange-700 group-hover:bg-orange-50"
              )}
            >
              {condition}
            </Badge>
          </div>
        )}

        {/* Owner Info with Slide Animation */}
        {showOwner && owner && (
          <div className="flex items-center space-x-2 text-sm text-slate-600 transform translate-x-2 group-hover:translate-x-0 transition-transform duration-400">
            <User className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-200" />
            <span>by {owner}</span>
            {location && (
              <>
                <MapPin className="w-3 h-3 ml-2 transform group-hover:scale-110 transition-transform duration-200" />
                <span className="text-xs">{location}</span>
              </>
            )}
          </div>
        )}

        {/* Stats Row with Number Animation */}
        {showStats && (
          <div className="flex items-center justify-between text-sm text-slate-500 pt-2 border-t border-slate-100 group-hover:border-slate-200 transition-colors duration-300">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1 transform group-hover:scale-110 transition-transform duration-200">
                <Heart className="w-4 h-4 group-hover:text-red-500 transition-colors duration-200" />
                <span className="font-medium">{likeCount}</span>
              </span>
              <span className="flex items-center space-x-1 transform group-hover:scale-110 transition-transform duration-200">
                <Eye className="w-4 h-4 group-hover:text-blue-500 transition-colors duration-200" />
                <span className="font-medium">{views}</span>
              </span>
            </div>
            {postedDate && (
              <span className="flex items-center space-x-1 text-xs opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <Clock className="w-3 h-3" />
                <span>{postedDate}</span>
              </span>
            )}
          </div>
        )}

        {/* Enhanced Action Buttons for Default Variant */}
        {variant === "default" && showActions && (
          <div className="flex space-x-2 pt-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              onClick={handleSwap}
              disabled={isSwapping}
              className={cn(
                "flex-1 bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105 active:scale-95",
                isSwapping && "animate-pulse bg-green-700"
              )}
            >
              {isSwapping ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Swapping...</span>
                </div>
              ) : (
                "Swap Now"
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={(e) => {
                e.stopPropagation()
                onClick?.(id)
              }}
              className="flex-1 transition-all duration-300 transform hover:scale-105 hover:border-green-500 hover:text-green-600"
            >
              View Details
            </Button>
          </div>
        )}
      </div>

      {/* Featured variant enhanced bottom section */}
      {variant === "featured" && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 border-t border-slate-100 group-hover:from-green-100 group-hover:to-blue-100 transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="text-sm transform group-hover:scale-105 transition-transform duration-300">
              <span className="text-slate-600">Featured Item</span>
              <div className="font-semibold text-green-600 group-hover:text-green-700 transition-colors duration-300">Popular Choice</div>
            </div>
            <Badge className="bg-green-600 text-white transform group-hover:scale-110 group-hover:bg-green-700 transition-all duration-300 animate-pulse group-hover:animate-none">
              Hot
            </Badge>
          </div>
        </div>
      )}

      {/* Floating glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/10 via-green-400/10 to-purple-400/10 blur-xl transform scale-110"></div>
      </div>
    </div>
  )
}