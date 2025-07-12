"use client"

import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import ItemCard from '@/components/ui/item-card'
import { Button } from '@/components/ui/button'
import { PriorityBadge } from '@/components/ui/condition-badge'
import { ChevronLeft, ChevronRight, Fire, TrendingUp, ArrowRight } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination' 
import 'swiper/css/effect-coverflow'

interface HotItem {
  id: string
  title: string
  image: string
  category: string
  size: string
  condition: string
  owner: string
  location: string
  likes: number
  views: number
  postedDate: string
  isHot?: boolean
  priority?: "Hot" | "New" | "Featured" | "Limited" | "Popular"
}

interface HotItemsCarouselProps {
  items?: HotItem[]
  title?: string
  subtitle?: string
  autoplay?: boolean
  showNavigation?: boolean
  showPagination?: boolean
  slidesPerView?: number
  spaceBetween?: number
  effect?: 'slide' | 'coverflow' | 'fade'
  onItemClick?: (itemId: string) => void
  onItemSwap?: (itemId: string) => void
  onViewAll?: () => void
  className?: string
}

// Default hot items data
const defaultHotItems: HotItem[] = [
  {
    id: "1",
    title: "Vintage Denim Jacket",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=400&h=500&fit=crop",
    category: "Outerwear",
    size: "M",
    condition: "Very Good",
    owner: "Sarah M.",
    location: "San Francisco, CA",
    likes: 127,
    views: 856,
    postedDate: "2 hours ago",
    isHot: true,
    priority: "Hot"
  },
  {
    id: "2",
    title: "Designer Silk Dress",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    category: "Dresses",
    size: "S",
    condition: "Like New",
    owner: "Emma K.",
    location: "New York, NY",
    likes: 89,
    views: 423,
    postedDate: "4 hours ago",
    priority: "Featured"
  },
  {
    id: "3",
    title: "Luxury Leather Boots",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
    category: "Shoes",
    size: "8",
    condition: "New",
    owner: "Alex R.",
    location: "Los Angeles, CA",
    likes: 156,
    views: 734,
    postedDate: "1 hour ago",
    priority: "New"
  },
  {
    id: "4",
    title: "Cashmere Wool Sweater",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
    category: "Knitwear",
    size: "L",
    condition: "Very Good",
    owner: "Maya L.",
    location: "Chicago, IL",
    likes: 73,
    views: 298,
    postedDate: "6 hours ago",
    priority: "Popular"
  },
  {
    id: "5",
    title: "Streetwear Hoodie",
    image: "https://images.unsplash.com/photo-1556821840-3a9cafe2a0b3?w=400&h=500&fit=crop",
    category: "Tops",
    size: "M",
    condition: "Good",
    owner: "David P.",
    location: "Seattle, WA",
    likes: 91,
    views: 445,
    postedDate: "3 hours ago",
    priority: "Limited"
  },
  {
    id: "6",
    title: "Vintage Band T-Shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    category: "Tops",
    size: "S",
    condition: "Good",
    owner: "Lisa K.",
    location: "Austin, TX",
    likes: 64,
    views: 312,
    postedDate: "5 hours ago",
    priority: "Hot"
  }
]

export default function HotItemsCarousel({
  items = defaultHotItems,
  title = "🔥 Hot Items",
  subtitle = "Most popular items trending right now",
  autoplay = true,
  showNavigation = true,
  showPagination = true,
  slidesPerView = 3,
  spaceBetween = 20,
  effect = 'slide',
  onItemClick,
  onItemSwap,
  onViewAll,
  className = ""
}: HotItemsCarouselProps) {
  const [swiper, setSwiper] = useState(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const handlePrevClick = () => {
    if (swiper) swiper.slidePrev()
  }

  const handleNextClick = () => {
    if (swiper) swiper.slideNext()
  }

  const swiperConfig = {
    modules: [Navigation, Pagination, Autoplay, EffectCoverflow],
    spaceBetween,
    slidesPerView: 1,
    effect,
    autoplay: autoplay ? {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    } : false,
    navigation: showNavigation ? {
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    } : false,
    pagination: showPagination ? {
      clickable: true,
      dynamicBullets: true,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active'
    } : false,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: slidesPerView,
        spaceBetween
      }
    },
    loop: true,
    centeredSlides: effect === 'coverflow',
    coverflowEffect: effect === 'coverflow' ? {
      rotate: 30,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    } : undefined,
    onSwiper: setSwiper,
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Fire className="w-6 h-6 text-orange-500 animate-pulse" />
              <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
            </div>
            {subtitle && (
              <p className="text-slate-600 text-lg hidden md:block">{subtitle}</p>
            )}
          </div>
          
          {onViewAll && (
            <Button 
              onClick={onViewAll}
              variant="outline" 
              className="hidden lg:flex items-center space-x-2 hover:bg-orange-50 border-orange-200"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Trending Badge */}
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <span className="text-sm font-medium text-slate-600">
            {items.length} trending items • Updated every hour
          </span>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <Swiper {...swiperConfig} className="hot-items-swiper">
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative group">
                  {/* Priority Badge Overlay */}
                  {item.priority && (
                    <div className="absolute top-3 left-3 z-10">
                      <PriorityBadge 
                        priority={item.priority} 
                        animated={true}
                      />
                    </div>
                  )}
                  
                  {/* Hot Item Indicator */}
                  {item.isHot && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                        🔥 TRENDING
                      </div>
                    </div>
                  )}

                  <ItemCard
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    category={item.category}
                    size={item.size}
                    condition={item.condition}
                    owner={item.owner}
                    location={item.location}
                    likes={item.likes}
                    views={item.views}
                    postedDate={item.postedDate}
                    variant="featured"
                    onSwap={onItemSwap}
                    onClick={onItemClick}
                    className="transform transition-all duration-300 group-hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          {showNavigation && (
            <>
              <button
                ref={prevRef}
                onClick={handlePrevClick}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all z-10 hover:scale-110 group"
                aria-label="Previous items"
              >
                <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-orange-500 transition-colors" />
              </button>
              <button
                ref={nextRef}
                onClick={handleNextClick}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all z-10 hover:scale-110 group"
                aria-label="Next items"
              >
                <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-orange-500 transition-colors" />
              </button>
            </>
          )}
        </div>

        {/* Mobile View All Button */}
        {onViewAll && (
          <div className="mt-8 text-center lg:hidden">
            <Button 
              onClick={onViewAll}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl shadow-lg"
            >
              View All Hot Items <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .hot-items-swiper {
          padding: 20px 0 60px 0;
        }
        
        .hot-items-swiper .swiper-pagination {
          bottom: 20px;
        }
        
        .hot-items-swiper .swiper-pagination-bullet {
          background: #f97316;
          opacity: 0.3;
          width: 12px;
          height: 12px;
        }
        
        .hot-items-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.2);
        }
        
        .hot-items-swiper .swiper-slide {
          height: auto;
          display: flex;
          align-items: stretch;
        }
        
        .hot-items-swiper .swiper-slide > div {
          width: 100%;
        }
      `}</style>
    </section>
  )
}