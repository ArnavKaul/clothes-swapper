"use client"

import { useState } from "react"
import { X, ArrowLeftRight, CheckCircle, AlertTriangle, User, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SwapModalProps {
  isOpen: boolean
  onClose: () => void
  targetItem: {
    id: string
    title: string
    image: string
    owner: string
    location: string
    condition: string
    category: string
  }
  userItems?: Array<{
    id: string
    title: string
    image: string
    condition: string
    category: string
  }>
  onConfirmSwap?: (targetItemId: string, selectedItemId: string, message: string) => void
}

export default function SwapModal({ 
  isOpen, 
  onClose, 
  targetItem, 
  userItems = [], 
  onConfirmSwap 
}: SwapModalProps) {
  const [selectedItemId, setSelectedItemId] = useState<string>("")
  const [swapMessage, setSwapMessage] = useState("")
  const [step, setStep] = useState<"select" | "confirm" | "success">("select")
  const [isLoading, setIsLoading] = useState(false)

  const handleItemSelect = (itemId: string) => {
    setSelectedItemId(itemId)
  }

  const handleNextStep = () => {
    if (selectedItemId) {
      setStep("confirm")
    }
  }

  const handleConfirmSwap = async () => {
    if (!selectedItemId) return
    
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      onConfirmSwap?.(targetItem.id, selectedItemId, swapMessage)
      setStep("success")
    } catch (error) {
      console.error("Swap failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setStep("select")
    setSelectedItemId("")
    setSwapMessage("")
    onClose()
  }

  const selectedItem = userItems.find(item => item.id === selectedItemId)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">
            {step === "select" && "Select Item to Swap"}
            {step === "confirm" && "Confirm Swap Details"}
            {step === "success" && "Swap Request Sent!"}
          </h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {step === "select" && (
            <div className="space-y-6">
              {/* Target Item Info */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-semibold text-slate-900 mb-3">You want to swap for:</h3>
                <div className="flex items-center space-x-4">
                  <img 
                    src={targetItem.image} 
                    alt={targetItem.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{targetItem.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600">{targetItem.owner}</span>
                      <MapPin className="w-4 h-4 text-slate-500 ml-2" />
                      <span className="text-sm text-slate-600">{targetItem.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline">{targetItem.condition}</Badge>
                      <Badge variant="secondary">{targetItem.category}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* User's Items */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Choose from your items:</h3>
                {userItems.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <ArrowLeftRight className="w-8 h-8" />
                    </div>
                    <p>You don't have any items to swap yet.</p>
                    <Button className="mt-4" onClick={handleClose}>
                      Add Your First Item
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleItemSelect(item.id)}
                        className={cn(
                          "flex items-center space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                          selectedItemId === item.id
                            ? "border-green-500 bg-green-50"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        )}
                      >
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{item.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">{item.condition}</Badge>
                            <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                          </div>
                        </div>
                        {selectedItemId === item.id && (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === "confirm" && selectedItem && (
            <div className="space-y-6">
              {/* Swap Preview */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4 text-center">Swap Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  {/* Your Item */}
                  <div className="text-center">
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.title}
                      className="w-24 h-24 rounded-xl object-cover mx-auto mb-3"
                    />
                    <h4 className="font-semibold text-slate-900">{selectedItem.title}</h4>
                    <p className="text-sm text-slate-600">Your Item</p>
                  </div>

                  {/* Swap Arrow */}
                  <div className="flex justify-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <ArrowLeftRight className="w-6 h-6 text-green-600" />
                    </div>
                  </div>

                  {/* Target Item */}
                  <div className="text-center">
                    <img 
                      src={targetItem.image} 
                      alt={targetItem.title}
                      className="w-24 h-24 rounded-xl object-cover mx-auto mb-3"
                    />
                    <h4 className="font-semibold text-slate-900">{targetItem.title}</h4>
                    <p className="text-sm text-slate-600">Their Item</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Add a message (optional)
                </label>
                <Textarea
                  placeholder="Hi! I'd love to swap my item for yours. Let me know if you're interested!"
                  value={swapMessage}
                  onChange={(e) => setSwapMessage(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Safety Guidelines */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Safety Guidelines</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Meet in a public place for the exchange</li>
                      <li>• Inspect items carefully before swapping</li>
                      <li>• Both parties should agree on item condition</li>
                      <li>• Trust your instincts and stay safe</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Swap Request Sent!</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Your swap request has been sent to {targetItem.owner}. They'll receive a notification and can accept or decline your offer.
              </p>
              <div className="bg-slate-50 rounded-xl p-4 max-w-md mx-auto">
                <h4 className="font-semibold text-slate-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-slate-600 space-y-1 text-left">
                  <li>• {targetItem.owner} will be notified of your request</li>
                  <li>• You'll receive an update within 24-48 hours</li>
                  <li>• If accepted, you can arrange the meetup</li>
                  <li>• Check your notifications for updates</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6">
          <div className="flex justify-between">
            {step === "select" && (
              <>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleNextStep}
                  disabled={!selectedItemId}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Continue
                </Button>
              </>
            )}

            {step === "confirm" && (
              <>
                <Button variant="outline" onClick={() => setStep("select")}>
                  Back
                </Button>
                <Button 
                  onClick={handleConfirmSwap}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending Request...
                    </>
                  ) : (
                    "Send Swap Request"
                  )}
                </Button>
              </>
            )}

            {step === "success" && (
              <>
                <Button variant="outline" onClick={handleClose}>
                  Browse More Items
                </Button>
                <Button onClick={handleClose} className="bg-green-600 hover:bg-green-700">
                  Done
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}