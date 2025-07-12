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

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Product Detail Page</h1>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5 text-slate-700" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Add Images */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Add Images</h2>
              
              {/* Image Upload Area */}
              <div 
                className="aspect-square border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-slate-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {images.length === 0 ? (
                  <>
                    <Upload className="w-12 h-12 text-slate-400 mb-4" />
                    <p className="text-slate-600 text-center">
                      Click to upload images<br />
                      <span className="text-sm text-slate-400">or drag and drop</span>
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
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {images.length < 4 && (
                        <div className="border border-slate-300 rounded-lg flex items-center justify-center">
                          <Plus className="w-8 h-8 text-slate-400" />
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
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Add Product Description</h2>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                  />
                  
                  <input
                    type="text"
                    placeholder="Category"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Size"
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Condition"
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <textarea
                    placeholder="Detailed description of your item..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
              >
                Available/Swap
              </button>
            </div>
          </div>
        </div>

        {/* Previous Listings */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Previous Listings</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {previousListings.map((listing) => (
              <div 
                key={listing.id} 
                className="rounded-xl p-4 cursor-pointer hover:opacity-90 transition-opacity" 
                style={{backgroundColor: '#6D8196'}}
              >
                <div className="aspect-square bg-slate-200 rounded-lg mb-3 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1 truncate">{listing.title}</h3>
                <p className="text-xs text-slate-200">{listing.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}