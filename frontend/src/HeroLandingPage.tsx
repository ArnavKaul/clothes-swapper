"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ArrowRight, Leaf, Users, Recycle, Star, ChevronLeft, ChevronRight } from "lucide-react"

const featuredItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=400&h=500&fit=crop",
    category: "Outerwear",
    size: "M",
    owner: "Sarah M."
  },
  {
    id: 2,
    title: "Designer Canvas Tote",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
    category: "Accessories",
    size: "One Size",
    owner: "Emma K."
  },
  {
    id: 3,
    title: "Striped Cotton Shirt",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop",
    category: "Tops",
    size: "S",
    owner: "Alex R."
  },
  {
    id: 4,
    title: "Leather Boots",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
    category: "Shoes",
    size: "8",
    owner: "Maya L."
  },
  {
    id: 5,
    title: "Wool Sweater",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
    category: "Knitwear",
    size: "L",
    owner: "David P."
  }
]

export default function HeroLandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [testimonials] = useState([
    { 
      name: "Maya Patel", 
      text: "I've swapped over 15 items and completely refreshed my wardrobe without spending a penny. The quality is amazing!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b2c5?w=60&h=60&fit=crop&crop=face"
    },
    { 
      name: "Ravi Kumar", 
      text: "Love the sustainable approach! It feels great knowing I'm reducing waste while finding unique pieces.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    },
    { 
      name: "Sophie Chen", 
      text: "The community is so friendly and the app makes swapping super easy. Highly recommend!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    }
  ])

  const stats = [
    { icon: Users, label: "Active Swappers", value: "10,000+" },
    { icon: Recycle, label: "Items Swapped", value: "50,000+" },
    { icon: Leaf, label: "CO2 Saved", value: "25 tons" }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, featuredItems.length - 2))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, featuredItems.length - 2)) % Math.max(1, featuredItems.length - 2))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">ReWear</h1>
          </div>
          <nav className="hidden md:flex space-x-6 items-center">
            <Button variant="ghost" className="text-slate-700 hover:text-slate-900">Home</Button>
            <Button variant="ghost" className="text-slate-700 hover:text-slate-900">Browse</Button>
            <Button variant="ghost" className="text-slate-700 hover:text-slate-900">How it Works</Button>
            <Button variant="ghost" className="text-slate-700 hover:text-slate-900">Login</Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">Sign Up</Button>
          </nav>
          
          {/* Mobile menu button */}
          <Button variant="ghost" className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900">
              Swap Clothes,
              <span className="text-green-600"> Save the Planet</span>
              <span className="text-4xl">🌍</span>
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our community of eco-conscious swappers and refresh your wardrobe the sustainable way. 
              Discover unique pieces while reducing fashion waste.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                Start Swapping <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="text-lg px-8 py-4 rounded-xl border-2 hover:bg-slate-50">
                Browse Items
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                    <stat.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Featured Items</h3>
            <p className="text-slate-600 text-lg">Discover amazing pieces from our community</p>
          </div>

          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
              >
                {featuredItems.map((item) => (
                  <div key={item.id} className="w-1/3 flex-shrink-0 px-3">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="aspect-[4/5] overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                          <span className="text-sm font-medium text-slate-700">Size {item.size}</span>
                        </div>
                        <h4 className="font-semibold text-slate-900 text-lg mb-2">{item.title}</h4>
                        <p className="text-slate-600 text-sm">by {item.owner}</p>
                        <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-10"
            >
              <ChevronRight className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h3>
            <p className="text-slate-600 text-lg">Simple steps to start swapping</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Sign Up", desc: "Create your free account and join our community" },
              { step: "2", title: "List Items", desc: "Upload photos of clothes you want to swap" },
              { step: "3", title: "Browse & Match", desc: "Find items you love and propose swaps" },
              { step: "4", title: "Swap & Enjoy", desc: "Meet up safely and exchange your items" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">What Our Swappers Say</h3>
            <p className="text-slate-600 text-lg">Real stories from our amazing community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 text-lg italic mb-6">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-slate-600 text-sm">Verified Swapper</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Wardrobe?
          </h3>
          <p className="text-green-100 text-xl mb-8">
            Join thousands of happy swappers and start your sustainable fashion journey today.
          </p>
          <Button className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
            Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold">ReWear</h4>
              </div>
              <p className="text-slate-400">Sustainable fashion for a better tomorrow.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Platform</h5>
              <ul className="space-y-2 text-slate-400">
                <li>How it Works</li>
                <li>Browse Items</li>
                <li>Safety Guidelines</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Support</h5>
              <ul className="space-y-2 text-slate-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Community Guidelines</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Company</h5>
              <ul className="space-y-2 text-slate-400">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 ReWear. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}