"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Users, Recycle, Leaf } from "lucide-react"
import { useState, useEffect } from "react"

interface HeroSectionProps {
  onGetStarted?: () => void
  onBrowseItems?: () => void
}

export default function HeroSection({ onGetStarted, onBrowseItems }: HeroSectionProps) {
  const [currentStat, setCurrentStat] = useState(0)
  
  const stats = [
    { icon: Users, label: "Active Swappers", value: "10,000+", color: "text-blue-600" },
    { icon: Recycle, label: "Items Swapped", value: "50,000+", color: "text-green-600" },
    { icon: Leaf, label: "CO2 Saved", value: "25 tons", color: "text-emerald-600" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-green-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Animated Badge */}
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4" />
            <span>Join the sustainable fashion revolution</span>
          </div>

          {/* Main Heading with Animation */}
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 animate-fade-in-up animation-delay-200">
            <span className="block text-slate-900">Swap Clothes,</span>
            <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
              Save the Planet
            </span>
            <span className="text-6xl md:text-7xl animate-bounce">🌍</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
            Join our community of eco-conscious swappers and refresh your wardrobe the sustainable way. 
            <span className="font-semibold text-green-700"> Discover unique pieces while reducing fashion waste.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16 animate-fade-in-up animation-delay-600">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group"
            >
              Start Swapping Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={onBrowseItems}
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 rounded-2xl border-2 border-slate-300 hover:border-green-500 hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
            >
              Browse Items
            </Button>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-800">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const isActive = currentStat === index
              
              return (
                <div 
                  key={index} 
                  className={`transform transition-all duration-500 ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <div className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${
                    isActive ? 'border-green-500 bg-gradient-to-br from-white to-green-50' : 'border-transparent'
                  }`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-300 ${
                      isActive ? 'bg-green-600 scale-110' : 'bg-slate-100'
                    }`}>
                      <Icon className={`w-8 h-8 transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-slate-600'
                      }`} />
                    </div>
                    <div className={`text-4xl font-bold mb-2 transition-colors duration-300 ${
                      isActive ? 'text-green-600' : 'text-slate-900'
                    }`}>
                      {stat.value}
                    </div>
                    <div className="text-slate-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex items-center justify-center space-x-8 opacity-60 animate-fade-in-up animation-delay-1000">
            <div className="text-slate-500 text-sm">Trusted by</div>
            <div className="flex items-center space-x-6">
              <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
              <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
              <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}