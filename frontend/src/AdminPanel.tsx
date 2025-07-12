"use client";

import { useState } from "react";
import { Search, Bell, User, Package, ShoppingCart, List, Edit, Trash2, Eye, Ban, Shield, Settings } from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "active" | "suspended";
  joinDate: string;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"users" | "orders" | "listings">("users");
  const [searchQuery, setSearchQuery] = useState("");

  const users: UserData[] = [
    {
      id: "1",
      name: "Sarah Mitchell",
      email: "sarah.mitchell@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b2c5?w=100&h=100&fit=crop&crop=face",
      status: "active",
      joinDate: "Jan 2023"
    },
    {
      id: "2",
      name: "John Smith",
      email: "john.smith@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      status: "active",
      joinDate: "Feb 2023"
    },
    {
      id: "3",
      name: "Emma Johnson",
      email: "emma.johnson@email.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      status: "suspended",
      joinDate: "Mar 2023"
    },
    {
      id: "4",
      name: "Michael Brown",
      email: "michael.brown@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      status: "active",
      joinDate: "Apr 2023"
    }
  ];

  const handleAction = (userId: string, action: string) => {
    console.log(`Performing ${action} on user ${userId}`);
    // Add your action logic here
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(`Searching for "${searchQuery}"...`)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 w-full m-0" style={{margin: 0, padding: 0}}>
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="bg-neutral-900 rounded-2xl shadow-lg border border-neutral-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-black" />
                </div>
                <div className="text-2xl font-bold text-cyan-400">Clothes Swapper</div>
              </div>
              <div className="text-lg font-semibold text-white">/ Admin Panel</div>
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
                placeholder="Search users, orders, or listings..."
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

        {/* Navigation Tabs */}
        <div className="bg-neutral-900 rounded-2xl shadow-lg border border-neutral-800 p-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "users"
                  ? "bg-cyan-400 text-black shadow-lg"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700"
              }`}
            >
              <User className="w-5 h-5" />
              <span>Manage Users</span>
            </button>
            
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "orders"
                  ? "bg-cyan-400 text-black shadow-lg"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Manage Orders</span>
            </button>
            
            <button
              onClick={() => setActiveTab("listings")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === "listings"
                  ? "bg-cyan-400 text-black shadow-lg"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700"
              }`}
            >
              <List className="w-5 h-5" />
              <span>Manage Listings</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-neutral-900 rounded-2xl shadow-lg border border-neutral-800 p-6">
          {activeTab === "users" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-cyan-400">Manage Users</h2>
                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                  <span>{users.length} total users</span>
                  <span>•</span>
                  <span>{users.filter(u => u.status === 'active').length} active</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center space-x-4 p-4 bg-neutral-800 border border-neutral-700 rounded-xl hover:border-cyan-400/50 transition-all">
                    {/* User Avatar */}
                    <div className="flex-shrink-0">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-neutral-600"
                      />
                    </div>

                    {/* User Details */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-neutral-750 rounded-lg p-4 flex flex-col justify-center border border-neutral-600">
                        <h3 className="font-semibold text-white">{user.name}</h3>
                        <p className="text-sm text-neutral-300">{user.email}</p>
                        <div className="flex items-center space-x-4 mt-1 flex-wrap">
                          <span className="text-xs text-neutral-400">Joined {user.joinDate}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            user.status === "active"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}>
                            {user.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex-shrink-0 space-y-2">
                      <button
                        onClick={() => handleAction(user.id, "view")}
                        className="w-full px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-300 hover:text-white rounded-lg font-medium transition-all flex items-center justify-center space-x-2 border border-neutral-600"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Profile</span>
                      </button>
                      
                      <button
                        onClick={() => handleAction(user.id, user.status === "active" ? "suspend" : "activate")}
                        className={`w-full px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                          user.status === "active"
                            ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                            : "bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                        }`}
                      >
                        {user.status === "active" ? (
                          <>
                            <Ban className="w-4 h-4" />
                            <span>Suspend</span>
                          </>
                        ) : (
                          <>
                            <User className="w-4 h-4" />
                            <span>Activate</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "orders" && (
            <div className="text-center py-12">
              <div className="bg-neutral-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">Manage Orders</h3>
              <p className="text-neutral-400 mb-6">Order management functionality will be implemented here.</p>
              <button className="px-6 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500 transition-colors font-medium">
                Coming Soon
              </button>
            </div>
          )}

          {activeTab === "listings" && (
            <div className="text-center py-12">
              <div className="bg-neutral-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <List className="w-12 h-12 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">Manage Listings</h3>
              <p className="text-neutral-400 mb-6">Listing management functionality will be implemented here.</p>
              <button className="px-6 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500 transition-colors font-medium">
                Coming Soon
              </button>
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{users.length}</h3>
                <p className="text-neutral-400 text-sm">Total Users</p>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">0</h3>
                <p className="text-neutral-400 text-sm">Active Orders</p>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center">
                <List className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">0</h3>
                <p className="text-neutral-400 text-sm">Total Listings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-cyan-400 text-black p-4 rounded-full shadow-lg hover:bg-cyan-500 transition-all cursor-pointer hover:scale-110">
          <Settings className="w-6 h-6" />
        </div>
      </div>

      {/* Floating Navigation */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-neutral-800 border border-neutral-700 rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="text-cyan-400 text-sm font-medium">Admin Panel</span>
          </div>
        </div>
      </div>
    </div>
  );
}