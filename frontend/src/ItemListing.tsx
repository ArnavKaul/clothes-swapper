"use client";

import { useState } from "react";
import { Search, Bell } from "lucide-react";

export default function ItemListing() {
  const [searchQuery, setSearchQuery] = useState("");

  const productImages = [
    "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1521312720996-4b45c7c4d1a1?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Item Listing</h1>
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
            {/* Left Column - Product Image */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Product Image</h2>
              
              {/* Main Product Image */}
              <div className="aspect-[3/4] bg-slate-100 rounded-2xl overflow-hidden">
                <img
                  src={productImages[0]}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-md space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 mb-4 text-center">Product name description</h2>
                  
                  {/* Product Info Form */}
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                      defaultValue="Vintage Denim Jacket"
                    />
                    
                    <input
                      type="text"
                      placeholder="Category"
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                      defaultValue="Outerwear"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Size"
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                        defaultValue="Medium"
                      />
                      <input
                        type="text"
                        placeholder="Condition"
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                        defaultValue="Very Good"
                      />
                    </div>
                    
                    <textarea
                      placeholder="Product description..."
                      rows={6}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none resize-none"
                      defaultValue="A beautifully aged vintage denim jacket with authentic distressing and character. This piece has been carefully maintained and features classic styling with modern comfort. Perfect for layering during transitional seasons or as a statement piece for casual outings."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Images Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Product Images</h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {productImages.map((image, index) => (
              <div 
                key={index}
                className="aspect-[3/4] rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity" 
                style={{backgroundColor: '#6D8196'}}
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}