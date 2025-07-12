"use client"

import Swal from 'sweetalert2'
import { CheckCircle, Upload, AlertTriangle, X, Heart, Sparkles } from 'lucide-react'

// Custom SweetAlert2 theme configuration
const customSwalConfig = {
  customClass: {
    popup: 'rounded-2xl shadow-2xl border-0',
    title: 'text-2xl font-bold',
    content: 'text-lg',
    confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105',
    cancelButton: 'bg-slate-500 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mr-3',
    denyButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mr-3'
  },
  buttonsStyling: false,
  showClass: {
    popup: 'animate__animated animate__zoomIn animate__faster'
  },
  hideClass: {
    popup: 'animate__animated animate__zoomOut animate__faster'
  }
}

export class SwapNotifications {
  // Swap Successful Notification
  static async swapSuccessful(options: {
    itemTitle?: string
    swapPartner?: string
    meetupLocation?: string
    onViewDetails?: () => void
    onContactPartner?: () => void
  } = {}) {
    const {
      itemTitle = "Vintage Denim Jacket",
      swapPartner = "Sarah M.",
      meetupLocation = "Central Park",
      onViewDetails,
      onContactPartner
    } = options

    const result = await Swal.fire({
      ...customSwalConfig,
      title: '🎉 Swap Successful!',
      html: `
        <div class="text-center space-y-4">
          <div class="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0"></path>
            </svg>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 text-left">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-slate-600">Item:</span>
              <span class="font-semibold text-slate-900">${itemTitle}</span>
            </div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-slate-600">Partner:</span>
              <span class="font-semibold text-slate-900">${swapPartner}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-600">Meetup:</span>
              <span class="font-semibold text-slate-900">${meetupLocation}</span>
            </div>
          </div>
          <div class="text-slate-600">
            Your swap request has been accepted! You'll receive an email with meetup details.
          </div>
        </div>
      `,
      icon: 'success',
      iconColor: '#16a34a',
      confirmButtonText: '📱 Contact Partner',
      showCancelButton: true,
      cancelButtonText: '📋 View Details',
      showDenyButton: false,
      allowOutsideClick: false,
      timer: undefined,
      timerProgressBar: false,
      background: '#ffffff',
      color: '#1e293b'
    })

    if (result.isConfirmed) {
      onContactPartner?.()
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onViewDetails?.()
    }

    return result
  }

  // Upload Complete Notification
  static async uploadComplete(options: {
    itemTitle?: string
    itemCategory?: string
    imageCount?: number
    estimatedViews?: number
    onShareItem?: () => void
    onAddAnother?: () => void
  } = {}) {
    const {
      itemTitle = "Vintage Denim Jacket",
      itemCategory = "Outerwear",
      imageCount = 4,
      estimatedViews = 150,
      onShareItem,
      onAddAnother
    } = options

    const result = await Swal.fire({
      ...customSwalConfig,
      title: '✨ Upload Complete!',
      html: `
        <div class="text-center space-y-4">
          <div class="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <div class="text-lg font-semibold text-slate-900 mb-2">${itemTitle}</div>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="bg-white rounded-lg p-2">
                <div class="text-slate-600">Category</div>
                <div class="font-semibold text-blue-600">${itemCategory}</div>
              </div>
              <div class="bg-white rounded-lg p-2">
                <div class="text-slate-600">Photos</div>
                <div class="font-semibold text-blue-600">${imageCount} images</div>
              </div>
            </div>
          </div>
          <div class="bg-green-50 border border-green-200 rounded-xl p-3">
            <div class="text-sm text-green-800">
              🎯 Your item is now live! Estimated <strong>${estimatedViews}+ views</strong> in the first 24 hours.
            </div>
          </div>
        </div>
      `,
      icon: 'success',
      iconColor: '#2563eb',
      confirmButtonText: '📤 Share Item',
      showCancelButton: true,
      cancelButtonText: '➕ Add Another',
      showDenyButton: false,
      timer: undefined,
      background: '#ffffff',
      color: '#1e293b'
    })

    if (result.isConfirmed) {
      onShareItem?.()
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onAddAnother?.()
    }

    return result
  }

  // Swap Request Sent
  static async swapRequestSent(options: {
    itemTitle?: string
    ownerName?: string
    responseTime?: string
  } = {}) {
    const {
      itemTitle = "Designer Handbag",
      ownerName = "Emma K.",
      responseTime = "24-48 hours"
    } = options

    return await Swal.fire({
      ...customSwalConfig,
      title: '🚀 Request Sent!',
      html: `
        <div class="text-center space-y-4">
          <div class="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center animate-pulse">
            <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0"></path>
            </svg>
          </div>
          <div class="text-slate-700">
            Your swap request for <strong class="text-slate-900">${itemTitle}</strong> has been sent to <strong class="text-slate-900">${ownerName}</strong>.
          </div>
          <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            <div class="text-sm text-yellow-800">
              ⏰ Typical response time: <strong>${responseTime}</strong>
            </div>
          </div>
        </div>
      `,
      icon: 'info',
      iconColor: '#eab308',
      confirmButtonText: '👍 Got it!',
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: true
    })
  }

  // Error Notification
  static async swapError(options: {
    errorMessage?: string
    onRetry?: () => void
    onSupport?: () => void
  } = {}) {
    const {
      errorMessage = "Unable to process your swap request at this time.",
      onRetry,
      onSupport
    } = options

    const result = await Swal.fire({
      ...customSwalConfig,
      title: '❌ Oops! Something went wrong',
      html: `
        <div class="text-center space-y-4">
          <div class="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0"></path>
            </svg>
          </div>
          <div class="text-slate-700">${errorMessage}</div>
          <div class="bg-red-50 border border-red-200 rounded-xl p-3">
            <div class="text-sm text-red-800">
              💡 Try refreshing the page or check your internet connection.
            </div>
          </div>
        </div>
      `,
      icon: 'error',
      iconColor: '#dc2626',
      confirmButtonText: '🔄 Try Again',
      showCancelButton: true,
      cancelButtonText: '📞 Contact Support',
      showDenyButton: false
    })

    if (result.isConfirmed) {
      onRetry?.()
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onSupport?.()
    }

    return result
  }

  // Confirmation Dialog
  static async confirmSwap(options: {
    itemTitle?: string
    yourItem?: string
    partnerName?: string
  } = {}) {
    const {
      itemTitle = "Vintage Jacket",
      yourItem = "Designer Dress",
      partnerName = "Sarah"
    } = options

    return await Swal.fire({
      ...customSwalConfig,
      title: '🤝 Confirm Swap',
      html: `
        <div class="text-center space-y-4">
          <div class="grid grid-cols-3 gap-4 items-center my-6">
            <div class="text-center">
              <div class="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <span class="text-xl">👕</span>
              </div>
              <div class="text-sm font-semibold text-slate-900">${yourItem}</div>
              <div class="text-xs text-slate-600">Your Item</div>
            </div>
            <div class="text-center">
              <div class="w-8 h-8 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
                </svg>
              </div>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <span class="text-xl">👚</span>
              </div>
              <div class="text-sm font-semibold text-slate-900">${itemTitle}</div>
              <div class="text-xs text-slate-600">${partnerName}'s Item</div>
            </div>
          </div>
          <div class="bg-slate-50 rounded-xl p-3">
            <div class="text-sm text-slate-700">
              Are you sure you want to swap these items? This action cannot be undone.
            </div>
          </div>
        </div>
      `,
      icon: 'question',
      iconColor: '#8b5cf6',
      showCancelButton: true,
      confirmButtonText: '✅ Confirm Swap',
      cancelButtonText: '❌ Cancel',
      reverseButtons: true,
      focusCancel: false
    })
  }

  // Toast Notifications (smaller, non-blocking)
  static showToast(type: 'success' | 'error' | 'warning' | 'info', message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
      customClass: {
        popup: 'rounded-xl shadow-lg border-0 text-sm',
      }
    })

    const icons = {
      success: '✅',
      error: '❌', 
      warning: '⚠️',
      info: 'ℹ️'
    }

    return Toast.fire({
      icon: type,
      title: `${icons[type]} ${message}`
    })
  }
}

// Hook for easy usage in React components
export const useSwapNotifications = () => {
  return {
    showSwapSuccess: SwapNotifications.swapSuccessful,
    showUploadComplete: SwapNotifications.uploadComplete,
    showSwapRequestSent: SwapNotifications.swapRequestSent,
    showSwapError: SwapNotifications.swapError,
    confirmSwap: SwapNotifications.confirmSwap,
    toast: SwapNotifications.showToast
  }
}

// Example usage component
export const NotificationExamples = () => {
  const notifications = useSwapNotifications()

  const handleSwapSuccess = () => {
    notifications.showSwapSuccess({
      itemTitle: "Vintage Denim Jacket",
      swapPartner: "Sarah M.",
      meetupLocation: "Central Park Cafe",
      onViewDetails: () => console.log("View details clicked"),
      onContactPartner: () => console.log("Contact partner clicked")
    })
  }

  const handleUploadComplete = () => {
    notifications.showUploadComplete({
      itemTitle: "Designer Silk Dress",
      itemCategory: "Dresses",
      imageCount: 5,
      estimatedViews: 200,
      onShareItem: () => console.log("Share item clicked"),
      onAddAnother: () => console.log("Add another clicked")
    })
  }

  const handleConfirmSwap = async () => {
    const result = await notifications.confirmSwap({
      itemTitle: "Vintage Leather Jacket",
      yourItem: "Designer Handbag", 
      partnerName: "Emma"
    })

    if (result.isConfirmed) {
      notifications.toast('success', 'Swap confirmed successfully!')
    }
  }

  return (
    <div className="space-y-4 p-6">
      <h3 className="text-lg font-semibold">Notification Examples</h3>
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={handleSwapSuccess}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Show Swap Success
        </button>
        <button 
          onClick={handleUploadComplete}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Show Upload Complete
        </button>
        <button 
          onClick={handleConfirmSwap}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Confirm Swap Dialog
        </button>
        <button 
          onClick={() => notifications.toast('success', 'This is a toast message!')}
          className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
        >
          Show Toast
        </button>
      </div>
    </div>
  )
}

export default SwapNotifications