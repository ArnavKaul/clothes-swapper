"use client";

import { useState } from "react";
import { Search, Bell, User, Package, ShoppingCart, List, Edit, Trash2, Eye, Ban } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5 text-slate-700" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "users"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <User className="w-5 h-5" />
              <span>Manage User</span>
            </button>
            
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "orders"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Manage Orders</span>
            </button>
            
            <button
              onClick={() => setActiveTab("listings")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === "listings"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <List className="w-5 h-5" />
              <span>Manage Listings</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {activeTab === "users" && (
            <>
              <h2 className="text-xl font-bold text-slate-900 mb-6">Manage Users</h2>
              
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-xl">
                    {/* User Avatar */}
                    <div className="flex-shrink-0">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                      />
                    </div>

                    {/* User Details */}
                    <div className="flex-1 min-w-0">
                    <div className="bg-slate-50 rounded-lg p-4 flex flex-col justify-center">
                        <h3 className="font-semibold text-slate-900">{user.name}</h3>
                        <p className="text-sm text-slate-600">{user.email}</p>
                        <div className="flex items-center space-x-4 mt-1 flex-wrap">
                        <span className="text-xs text-slate-500">Joined {user.joinDate}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                            user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
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
                        className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Action 1</span>
                      </button>
                      
                      <button
                        onClick={() => handleAction(user.id, user.status === "active" ? "suspend" : "activate")}
                        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                          user.status === "active"
                            ? "bg-red-100 hover:bg-red-200 text-red-700"
                            : "bg-green-100 hover:bg-green-200 text-green-700"
                        }`}
                      >
                        {user.status === "active" ? (
                          <>
                            <Ban className="w-4 h-4" />
                            <span>Action 2</span>
                          </>
                        ) : (
                          <>
                            <User className="w-4 h-4" />
                            <span>Action 2</span>
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
              <ShoppingCart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Manage Orders</h3>
              <p className="text-slate-600">Order management functionality will be implemented here.</p>
            </div>
          )}

          {activeTab === "listings" && (
            <div className="text-center py-12">
              <List className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Manage Listings</h3>
              <p className="text-slate-600">Listing management functionality will be implemented here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}