"use client";

import { useState } from "react";
import { Search, Bell, Heart, Eye, Share2, MessageCircle } from "lucide-react";

export default function ItemListingUpdated() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const productImages = [
    "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1521312720996-4b45c7c4d1a1?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop"
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(`Searching for "${searchQuery}"...`)
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="bg-neutral-900 rounded-2xl shadow-lg border border-neutral-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-cyan-400">Clothes Swapper</div>
              <div className="text-lg font-semibold text-white">/ Item Listing</div>
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
            {/* Left Column - Product Image */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-cyan-400">Product Image</h2>
              
              {/* Main Product Image */}
              <div className="aspect-[3/4] bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 group">
                <img
                  src={productImages[0]}
                  alt="Product"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isLiked 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm">47</span>
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">156</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-md space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-cyan-400 mb-4 text-center">Product Details</h2>
                  
                  {/* Product Info Form */}
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      className="w-full p-3 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-400 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all"
                      defaultValue="Vintage Denim Jacket"
                    />
                    
                    <input
                      type="text"
                      placeholder="Category"
                      className="w-full p-3 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-400 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all"
                      defaultValue="Outerwear"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Size"
                        className="w-full p-3 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-400 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all"
                        defaultValue="Medium"
                      />
                      <input
                        type="text"
                        placeholder="Condition"
                        className="w-full p-3 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-400 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all"
                        defaultValue="Very Good"
                      />
                    </div>
                    
                    <textarea
                      placeholder="Product description..."
                      rows={6}
                      className="w-full p-3 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-400 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none resize-none transition-all"
                      defaultValue="A beautifully aged vintage denim jacket with authentic distressing and character. This piece has been carefully maintained and features classic styling with modern comfort. Perfect for layering during transitional seasons or as a statement piece for casual outings."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-3">
                    <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-3 rounded-xl transition-colors">
                      Request Swap
                    </button>
                    <button className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-3 rounded-xl transition-colors border border-neutral-700">
                      Contact Owner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Images Section */}
        <div className="bg-neutral-900 rounded-2xl shadow-lg border border-neutral-800 p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-6">Product Images</h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {productImages.map((image, index) => (
              <div 
                key={index}
                className="aspect-[3/4] bg-neutral-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 border border-neutral-700 hover:border-cyan-400/50 group" 
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Owner Info Section */}
        <div className="bg-neutral-900 rounded-2xl shadow-lg border border-neutral-800 p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-6">Owner Information</h3>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xl">JD</span>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-lg">Jane Doe</h4>
              <p className="text-neutral-400">San Francisco, CA</p>
              <p className="text-neutral-400 text-sm">Member since 2023 • 5.0 ⭐ (24 reviews)</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700">
                View Profile
              </button>
              <button className="px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500 transition-colors">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-cyan-400 text-black p-4 rounded-full shadow-lg hover:bg-cyan-500 transition-all cursor-pointer hover:scale-110">
          <Heart className="w-6 h-6" />
        </div>
      </div>

      {/* Floating Navigation */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-neutral-800 border border-neutral-700 rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="text-cyan-400 text-sm font-medium">Item Details</span>
          </div>
        </div>
      </div>
    </div>
  );
}