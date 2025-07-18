import { useState, useEffect } from 'react'
import { Search, Bell, Plus, Edit3, Eye, Heart, MessageCircle, MoreVertical, Settings, Star, Calendar, Package, ShoppingBag, TrendingUp } from 'lucide-react'
import DashboardCounter from '@/components/ui/DashboardCounter'
import ImageWithBlur from '@/components/ui/ImageWithBlur'
import { ConditionBadge, StatusBadge } from '@/components/ui/ConditionBadge'
import { useSwapNotifications } from '@/components/ui/SweetAlert2'

interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  location: string
  joinDate: string
  rating: number
  totalSwaps: number
  itemsListed: number
  itemsPurchased: number
}

interface Item {
  id: string
  title: string
  image: string
  category: string
  condition?: string
  status: 'active' | 'pending' | 'completed'
  likes: number
  views: number
  datePosted: string
}

export default function UserDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [myListings, setMyListings] = useState<Item[]>([])
  const [myPurchases, setMyPurchases] = useState<Item[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const notifications = useSwapNotifications()

  useEffect(() => {
    // Simulate API fetch for user data
    setTimeout(() => {
      setUser({
        id: '1',
        name: 'Sarah Mitchell',
        email: 'sarah.mitchell@email.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b2c5?w=150&h=150&fit=crop&crop=face',
        location: 'San Francisco, CA',
        joinDate: 'January 2023',
        rating: 4.8,
        totalSwaps: 47,
        itemsListed: 23,
        itemsPurchased: 34
      })

      setMyListings([
        {
          id: '1',
          title: 'Vintage Denim Jacket',
          image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=300&fit=crop',
          category: 'Outerwear',
          condition: 'Very Good',
          status: 'active',
          likes: 27,
          views: 156,
          datePosted: '2 days ago'
        },
        {
          id: '2',
          title: 'Designer Handbag',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
          category: 'Accessories',
          condition: 'Like New',
          status: 'pending',
          likes: 15,
          views: 89,
          datePosted: '5 days ago'
        },
        {
          id: '3',
          title: 'Running Sneakers',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
          category: 'Shoes',
          condition: 'Good',
          status: 'active',
          likes: 12,
          views: 73,
          datePosted: '1 week ago'
        },
        {
          id: '4',
          title: 'Wool Sweater',
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop',
          category: 'Clothing',
          condition: 'New',
          status: 'completed',
          likes: 8,
          views: 45,
          datePosted: '2 weeks ago'
        }
      ])

      setMyPurchases([
        {
          id: '5',
          title: 'Leather Boots',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
          category: 'Shoes',
          condition: 'Very Good',
          status: 'completed',
          likes: 0,
          views: 0,
          datePosted: '3 days ago'
        },
        {
          id: '6',
          title: 'Summer Dress',
          image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop',
          category: 'Clothing',
          condition: 'Good',
          status: 'pending',
          likes: 0,
          views: 0,
          datePosted: '1 week ago'
        },
        {
          id: '7',
          title: 'Watch',
          image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop',
          category: 'Accessories',
          condition: 'Like New',
          status: 'completed',
          likes: 0,
          views: 0,
          datePosted: '2 weeks ago'
        },
        {
          id: '8',
          title: 'Backpack',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
          category: 'Accessories',
          condition: 'Good',
          status: 'completed',
          likes: 0,
          views: 0,
          datePosted: '3 weeks ago'
        }
      ])

      setIsLoading(false)
    }, 500)
  }, [])

  const handleAddItem = async () => {
    // Show upload complete notification
    await notifications.showUploadComplete({
      itemTitle: "New Item",
      itemCategory: "Clothing",
      imageCount: 3,
      estimatedViews: 120,
      onShareItem: () => notifications.toast('success', 'Item shared successfully!'),
      onAddAnother: () => console.log('Add another item')
    })
  }

  const handleItemClick = (itemId: string) => {
    console.log('View item:', itemId)
  }

  const handleItemAction = (itemId: string, action: string) => {
    if (action === 'swap') {
      notifications.showSwapRequestSent({
        itemTitle: myListings.find(item => item.id === itemId)?.title || "Item",
        ownerName: "Partner Name",
        responseTime: "24-48 hours"
      })
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-slate-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with Search */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900">User Dashboard</h1>
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

        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Profile Picture */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <ImageWithBlur
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-slate-200"
                  aspectRatio="square"
                  placeholder="blur"
                />
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle: User Info Grid */}
            <div className="grid grid-cols-1 gap-3">
              <div className="rounded-lg p-3" style={{backgroundColor: '#6D8196'}}>
                <div className="text-sm text-white">Name</div>
                <div className="font-semibold text-white">{user.name}</div>
              </div>
              <div className="rounded-lg p-3" style={{backgroundColor: '#6D8196'}}>
                <div className="text-sm text-white">Email</div>
                <div className="font-semibold text-white">{user.email}</div>
              </div>
              <div className="rounded-lg p-3" style={{backgroundColor: '#6D8196'}}>
                <div className="text-sm text-white">Location</div>
                <div className="font-semibold text-white">{user.location}</div>
              </div>
              <div className="rounded-lg p-3" style={{backgroundColor: '#6D8196'}}>
                <div className="text-sm text-white">Member Since</div>
                <div className="font-semibold text-white">{user.joinDate}</div>
              </div>
            </div>

            {/* Right: Stats Grid with Animated Counters */}
            <div className="grid grid-cols-1 gap-3">
              <div className="rounded-lg p-3" style={{backgroundColor: '#6D8196'}}>
                <div className="text-sm text-white">Rating</div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <DashboardCounter
                    value={user.rating}
                    label=""
                    decimals={1}
                    duration={1500}
                    variant="minimal"
                    className="text-white"
                    valueClassName="text-base font-semibold text-white"
                  />
                </div>
              </div>
              <div className="rounded-lg p-3" style={{backgroundColor: '#6D8196'}}>
                <div className="text-sm text-white">Total Swaps</div>
                <DashboardCounter
                  value={user.totalSwaps}
                  label=""
                  duration={2000}
                  variant="minimal"
                  className="text-white"
                  valueClassName="text-base font-semibold text-white"
                />
              </div>
              <div className="rounded-lg p-3" style={{backgroundColor: '#6D8196'}}>
                <div className="text-sm text-white">Items Listed</div>
                <DashboardCounter
                  value={user.itemsListed}
                  label=""
                  duration={2500}
                  variant="minimal"
                  className="text-white"
                  valueClassName="text-base font-semibold text-white"
                />
              </div>
              <div className="rounded-lg p-3" style={{backgroundColor: '#6D8196'}}>
                <div className="text-sm text-white">Items Acquired</div>
                <DashboardCounter
                  value={user.itemsPurchased}
                  label=""
                  duration={3000}
                  variant="minimal"
                  className="text-white"
                  valueClassName="text-base font-semibold text-white"
                />
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <div className="rounded-xl p-4" style={{backgroundColor: '#6D8196'}}>
              <h3 className="text-sm font-semibold text-white mb-2">Bio</h3>
              <p className="text-white leading-relaxed">
                Passionate about sustainable fashion and finding unique pieces. Love discovering vintage treasures and giving pre-loved items new life. Always looking for quality pieces to add to my wardrobe through swapping!
              </p>
            </div>
          </div>
        </div>

        {/* My Listings Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">My Listings</h2>
            <button 
              onClick={handleAddItem}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {myListings.map((item) => (
              <div 
                key={item.id} 
                className="rounded-xl p-4 hover:opacity-90 transition-all cursor-pointer transform hover:scale-105 hover:shadow-lg group" 
                style={{backgroundColor: '#6D8196'}}
                onClick={() => handleItemClick(item.id)}
              >
                <div className="aspect-square bg-slate-200 rounded-lg mb-3 overflow-hidden relative">
                  <ImageWithBlur
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    aspectRatio="square"
                    placeholder="skeleton"
                  />
                  
                  {/* Status Badge Overlay */}
                  <div className="absolute top-2 right-2">
                    <StatusBadge 
                      status={
                        item.status === 'active' ? 'Available' :
                        item.status === 'pending' ? 'Pending' :
                        'Swapped'
                      }
                      size="sm"
                      animated={item.status === 'pending'}
                      variant="solid"
                    />
                  </div>

                  {/* Condition Badge */}
                  {item.condition && (
                    <div className="absolute top-2 left-2">
                      <ConditionBadge 
                        condition={item.condition}
                        size="sm"
                        variant="solid"
                      />
                    </div>
                  )}

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleItemAction(item.id, 'swap')
                      }}
                      className="bg-white text-slate-900 px-3 py-1 rounded-lg text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform"
                    >
                      Quick Swap
                    </button>
                  </div>
                </div>
                
                <h3 className="font-semibold text-white text-sm mb-1 truncate">{item.title}</h3>
                <p className="text-xs text-slate-200 mb-2">{item.category}</p>
                <div className="flex items-center justify-between text-xs text-slate-200">
                  <span className="flex items-center">
                    <Heart className="w-3 h-3 mr-1 text-red-400" />
                    <DashboardCounter
                      value={item.likes}
                      label=""
                      duration={1000}
                      variant="minimal"
                      className="text-slate-200"
                      valueClassName="text-xs text-slate-200"
                    />
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    <DashboardCounter
                      value={item.views}
                      label=""
                      duration={1200}
                      variant="minimal"
                      className="text-slate-200"
                      valueClassName="text-xs text-slate-200"
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Purchases Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">My Purchases</h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {myPurchases.map((item) => (
              <div 
                key={item.id} 
                className="rounded-xl p-4 hover:opacity-90 transition-all cursor-pointer transform hover:scale-105 hover:shadow-lg group" 
                style={{backgroundColor: '#6D8196'}}
                onClick={() => handleItemClick(item.id)}
              >
                <div className="aspect-square bg-slate-200 rounded-lg mb-3 overflow-hidden relative">
                  <ImageWithBlur
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    aspectRatio="square"
                    placeholder="skeleton"
                  />

                  {/* Condition Badge */}
                  {item.condition && (
                    <div className="absolute top-2 left-2">
                      <ConditionBadge 
                        condition={item.condition}
                        size="sm"
                        variant="solid"
                      />
                    </div>
                  )}

                  {/* Completed Badge */}
                  {item.status === 'completed' && (
                    <div className="absolute top-2 right-2">
                      <StatusBadge 
                        status="Swapped"
                        size="sm"
                        variant="solid"
                      />
                    </div>
                  )}

                  {/* Rate & Review Overlay for completed items */}
                  {item.status === 'completed' && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          notifications.toast('info', 'Rate & Review feature coming soon!')
                        }}
                        className="bg-white text-slate-900 px-3 py-1 rounded-lg text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform"
                      >
                        Rate & Review
                      </button>
                    </div>
                  )}
                </div>
                
                <h3 className="font-semibold text-white text-sm mb-1 truncate">{item.title}</h3>
                <p className="text-xs text-slate-200 mb-2">{item.category}</p>
                <p className="text-xs text-slate-200">Acquired {item.datePosted}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}