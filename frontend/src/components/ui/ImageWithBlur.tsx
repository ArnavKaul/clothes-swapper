"use client"

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ImageWithBlurProps {
  src: string
  alt: string
  blurDataURL?: string
  className?: string
  containerClassName?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty' | 'skeleton'
  onLoad?: () => void
  onError?: () => void
  fallbackSrc?: string
  lazy?: boolean
  aspectRatio?: 'square' | '4/3' | '16/9' | '3/2' | '2/3' | 'auto'
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  sizes?: string
  srcSet?: string
}

// Generate a simple blur data URL if none provided
const generateBlurDataURL = (color: string = '#f1f5f9') => {
  return `data:image/svg+xml;base64,${btoa(
    `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <rect width="100%" height="100%" fill="url(#gradient)"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#e2e8f0;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#cbd5e1;stop-opacity:0.4" />
        </linearGradient>
      </defs>
    </svg>`
  )}`
}

export default function ImageWithBlur({
  src,
  alt,
  blurDataURL,
  className = '',
  containerClassName = '',
  priority = false,
  quality = 75,
  placeholder = 'blur',
  onLoad,
  onError,
  fallbackSrc,
  lazy = true,
  aspectRatio = 'auto',
  objectFit = 'cover',
  sizes,
  srcSet
}: ImageWithBlurProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isInView, setIsInView] = useState(!lazy || priority)
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [lazy, priority, isInView])

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false)
    setIsError(false)
    onLoad?.()
  }

  // Handle image error
  const handleError = () => {
    setIsError(true)
    setIsLoading(false)
    
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setIsLoading(true)
      setIsError(false)
      return
    }
    
    onError?.()
  }

  // Update src when prop changes
  useEffect(() => {
    setCurrentSrc(src)
    setIsLoading(true)
    setIsError(false)
  }, [src])

  // Aspect ratio classes
  const aspectRatioClasses = {
    'square': 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video',
    '3/2': 'aspect-[3/2]',
    '2/3': 'aspect-[2/3]',
    'auto': ''
  }

  // Object fit classes
  const objectFitClasses = {
    'cover': 'object-cover',
    'contain': 'object-contain',
    'fill': 'object-fill',
    'none': 'object-none',
    'scale-down': 'object-scale-down'
  }

  // Placeholder components
  const renderPlaceholder = () => {
    switch (placeholder) {
      case 'skeleton':
        return (
          <div className={cn(
            'w-full h-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse',
            'bg-[length:200%_100%] animate-shimmer'
          )}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 text-slate-400">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        )
      case 'blur':
        return (
          <div 
            className="w-full h-full bg-slate-200"
            style={{
              backgroundImage: `url(${blurDataURL || generateBlurDataURL()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(10px)',
              transform: 'scale(1.1)'
            }}
          />
        )
      case 'empty':
      default:
        return (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
            <div className="w-8 h-8 text-slate-300">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )
    }
  }

  // Error state
  const renderError = () => (
    <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400">
      <div className="w-8 h-8 mb-2">
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <span className="text-xs">Failed to load</span>
    </div>
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-slate-100',
        aspectRatioClasses[aspectRatio],
        containerClassName
      )}
    >
      {/* Placeholder/Loading State */}
      {(isLoading || !isInView) && (
        <div className="absolute inset-0 z-10">
          {renderPlaceholder()}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="absolute inset-0 z-20">
          {renderError()}
        </div>
      )}

      {/* Main Image */}
      {isInView && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          sizes={sizes}
          srcSet={srcSet}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full transition-all duration-700 ease-out',
            objectFitClasses[objectFit],
            isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100',
            className
          )}
          style={{
            filter: isLoading ? 'blur(5px)' : 'blur(0px)'
          }}
        />
      )}

      {/* Loading Spinner */}
      {isLoading && isInView && !isError && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin opacity-80" />
        </div>
      )}

      {/* Shimmer animation styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  )
}

// Pre-configured image variants
export const ProfileImage = (props: Partial<ImageWithBlurProps>) => (
  <ImageWithBlur
    aspectRatio="square"
    objectFit="cover"
    placeholder="blur"
    className="rounded-full"
    {...props}
  />
)

export const CardImage = (props: Partial<ImageWithBlurProps>) => (
  <ImageWithBlur
    aspectRatio="4/3"
    objectFit="cover"
    placeholder="skeleton"
    className="rounded-lg"
    {...props}
  />
)

export const HeroImage = (props: Partial<ImageWithBlurProps>) => (
  <ImageWithBlur
    aspectRatio="16/9"
    objectFit="cover"
    placeholder="blur"
    priority={true}
    lazy={false}
    {...props}
  />
)

export const ProductImage = (props: Partial<ImageWithBlurProps>) => (
  <ImageWithBlur
    aspectRatio="square"
    objectFit="cover"
    placeholder="skeleton"
    fallbackSrc="/images/placeholder-product.jpg"
    {...props}
  />
)

// Gallery component for multiple images
interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    blurDataURL?: string
  }>
  className?: string
  imageClassName?: string
  columns?: 2 | 3 | 4
  aspectRatio?: ImageWithBlurProps['aspectRatio']
}

export const ImageGallery = ({
  images,
  className = '',
  imageClassName = '',
  columns = 3,
  aspectRatio = '4/3'
}: ImageGalleryProps) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  }

  return (
    <div className={cn(
      'grid gap-4',
      gridCols[columns],
      className
    )}>
      {images.map((image, index) => (
        <ImageWithBlur
          key={index}
          src={image.src}
          alt={image.alt}
          blurDataURL={image.blurDataURL}
          aspectRatio={aspectRatio}
          className={imageClassName}
          lazy={index > 6} // Load first 6 images immediately
        />
      ))}
    </div>
  )
}