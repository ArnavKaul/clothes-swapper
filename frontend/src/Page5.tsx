import { useEffect, useState } from "react"
import { Search, Heart, Share2, ArrowLeft, Star, MapPin, Calendar, User, MessageCircle, Eye, ChevronLeft, ChevronRight } from "lucide-react"

interface Item {
  id: string
  item_name: string
  item_image: string
  long_description: string
  liked_count: number
  category: string
  size: string
  size_gender: string
  additional_images: string[]
  owner_name?: string
  posted_date?: string
  location?: string
  condition?: string
  views?: number
  interested_users?: number
}

export default function Page5() {
  const [item, setItem] = useState<Item | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFullDescription, setShowFullDescription] = useState(false)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setItem({
        id: "1",
        item_name: "Vintage Denim Jacket",
        item_image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=500&h=600&fit=crop",
        long_description: "A beautifully aged vintage denim jacket with authentic distressing and character. This piece has been carefully maintained and features classic styling with modern comfort. Perfect for layering during transitional seasons or as a statement piece for casual outings. The jacket has a relaxed fit and shows minimal signs of wear, making it an excellent addition to any wardrobe.",
        liked_count: 27,
        category: "Outerwear",
        size: "M",
        size_gender: "Unisex",
        additional_images: [
          "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=500&h=600&fit=crop",
          "https://images.unsplash.com/photo-1521312720996-4b45c7c4d1a1?w=500&h=600&fit=crop",
          "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=600&fit=crop",
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
        ],
        owner_name: "Sarah M.",
        posted_date: "2 days ago",
        location: "San Francisco, CA",
        condition: "Very Good",
        views: 156,
        interested_users: 8
      })
    }, 400)
  }, [])

  const allImages = item ? [item.item_image, ...item.additional_images] : []

  const nextImage = () => {
    if (allImages.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % allImages.length)
    }
  }

  const prevImage = () => {
    if (allImages.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (item) {
      setItem({
        ...item,
        liked_count: isLiked ? item.liked_count - 1 : item.liked_count + 1
      })
    }
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading item details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold">Item Details</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image with Navigation */}
            <div className="relative group">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                <img
                  src={allImages[selectedImageIndex]}
                  alt={item.item_name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {allImages.length}
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index 
                      ? 'border-blue-500 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Item Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.item_name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {item.views} views
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.posted_date}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={handleLike}
                  className={`p-3 rounded-full transition-all ${
                    isLiked 
                      ? 'bg-red-50 text-red-500' 
                      : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {item.category}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {item.size}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {item.size_gender}
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                  {item.condition}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-1 text-red-500" />
                  {item.liked_count} likes
                </span>
                <span className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {item.interested_users} interested
                </span>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.owner_name}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {item.location}
                  </p>
                </div>
                <div className="flex items-center ml-auto">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">4.8</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Description</h3>
              <div className="text-gray-700 leading-relaxed">
                {showFullDescription ? item.long_description : `${item.long_description.substring(0, 150)}...`}
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 hover:text-blue-700 ml-1 font-medium"
                >
                  {showFullDescription ? 'Show less' : 'Show more'}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg">
                Swap This Item
              </button>
              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-4 rounded-xl transition-colors">
                Message Owner
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Swap Guidelines</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Meet in a public place for safety</li>
                <li>• Inspect items before swapping</li>
                <li>• Both parties should agree on item condition</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}