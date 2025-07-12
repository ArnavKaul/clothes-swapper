import { useState, useRef } from "react"
import { Search, Bell, Upload, X, Plus } from "lucide-react"

interface PreviousListing {
  id: string
  title: string
  image: string
  category: string
}

export default function ItemDetails() {
  const [images, setImages] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const previousListings: PreviousListing[] = [
    {
      id: "1",
      title: "Vintage Denim Jacket",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=300&fit=crop",
      category: "Outerwear"
    },
    {
      id: "2",
      title: "Designer Handbag",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      category: "Accessories"
    },
    {
      id: "3",
      title: "Running Sneakers",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      category: "Shoes"
    },
    {
      id: "4",
      title: "Wool Sweater",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop",
      category: "Clothing"
    }
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log('Submitting:', { images, description })
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(`Searching for "${searchQuery}"...`)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-neutral-900 rounded-2xl shadow-lg border border-neutral-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-cyan-400">Clothes Swapper</div>
              <div className="text-lg font-semibold text-white">/ Product Detail Page</div>
            </div>
            <button className="p-2 hover:bg-neutral-800 rounded-full transition-colors relative">
              <Bell className="w-5 h-5 text-cyan-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
          </div>
          
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-400 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-cyan-400 text-black hover:bg-cyan-500 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-neutral-900 rounded-2xl shadow-lg border border-neutral-800 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Add Images */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-cyan-400">Add Images</h2>
              
              {/* Image Upload Area */}
              <div 
                className="aspect-square border-2 border-dashed border-neutral-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 transition-colors bg-neutral-800/50"
                onClick={() => fileInputRef.current?.click()}
              >
                {images.length === 0 ? (
                  <>
                    <Upload className="w-12 h-12 text-neutral-400 mb-4" />
                    <p className="text-neutral-300 text-center">
                      Click to upload images<br />
                      <span className="text-sm text-neutral-400">or drag and drop</span>
                    </p>
                  </>
                ) : (
                  <div className="w-full h-full p-4">
                    <div className="grid grid-cols-2 gap-2 h-full">
                      {images.slice(0, 4).map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeImage(index)
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {images.length < 4 && (
                        <div className="border border-neutral-700 rounded-lg flex items-center justify-center bg-neutral-800/50">
                          <Plus className="w-8 h-8 text-neutral-400" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Right Column - Product Description */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-cyan-400 mb-4">Add Product Description</h2>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full p-3 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-400 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all"
                  />
                  
                  <input
                    type="text"
                    placeholder="Category"
                    className="w-full p-3 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-400 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Size"
                      className="w-full p-3 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-400 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Condition"
                      className="w-full p-3 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-400 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all"
                    />
                  </div>
                  
                  <textarea
                    placeholder="Detailed description of your item..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="w-full p-3 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-400 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none resize-none transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-4 rounded-xl transition-colors shadow-lg"
              >
                Available/Swap
              </button>
            </div>
          </div>
        </div>

        {/* Previous Listings */}
        <div className="bg-neutral-900 rounded-2xl shadow-lg border border-neutral-800 p-6">
          <h2 className="text-xl font-bold text-cyan-400 mb-6">Previous Listings</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {previousListings.map((listing) => (
              <div 
                key={listing.id} 
                className="bg-neutral-800 rounded-xl p-4 cursor-pointer hover:bg-neutral-700 transition-all duration-300 hover:scale-105 border border-neutral-700 hover:border-cyan-400/50 group" 
              >
                <div className="aspect-square bg-neutral-700 rounded-lg mb-3 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1 truncate group-hover:text-cyan-400 transition-colors">{listing.title}</h3>
                <p className="text-xs text-neutral-400">{listing.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-cyan-400 text-black p-4 rounded-full shadow-lg hover:bg-cyan-500 transition-all cursor-pointer hover:scale-110">
          <Plus className="w-6 h-6" />
        </div>
      </div>

      {/* Floating Navigation */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-neutral-800 border border-neutral-700 rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="text-cyan-400 text-sm font-medium">Add Item</span>
          </div>
        </div>
      </div>
    </div>
  )
}