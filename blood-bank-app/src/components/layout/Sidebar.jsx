import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Droplets, Users, Heart, Building2, MessageSquare, Package, X, AlertCircle, Calendar, Trophy, Tent, Map, BarChart3 } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Inventory', path: '/inventory', icon: Droplets },
    { name: 'Donors', path: '/donors', icon: Users },
    { name: 'Recipients', path: '/recipients', icon: Heart },
    { name: 'Hospitals', path: '/hospitals', icon: Building2 },
    { name: 'Hospital Chats', path: '/chat', icon: MessageSquare },
    { name: 'Blood Requests', path: '/requests', icon: Package },
    { name: 'Emergency SOS', path: '/emergency', icon: AlertCircle },
    { name: 'Appointments', path: '/appointments', icon: Calendar },
    { name: 'Rewards', path: '/rewards', icon: Trophy },
    { name: 'Donation Camps', path: '/camps', icon: Tent },
    { name: 'Blood Stock Map', path: '/map', icon: Map },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        h-screen w-64 bg-gradient-to-b from-primary-700 via-primary-800 to-primary-900 text-white fixed left-0 top-0 overflow-y-auto shadow-2xl z-30 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <div className="w-10 h-10 bg-accent-400 rounded-xl flex items-center justify-center">
              <Droplets className="h-6 w-6 text-primary-900" />
            </div>
            <span className="hidden sm:inline">Blood Bank</span>
          </h1>
          
          {/* Close button for mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-4 px-3 space-y-1 flex-1 overflow-y-auto pb-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 1024) {
                    toggleSidebar();
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-accent-400 text-primary-900 shadow-lg scale-105' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
        
        <div className="mt-auto p-6 border-t border-white/10">
          <p className="text-xs text-white/60">© 2025 Blood Bank System</p>
          <p className="text-xs text-white/40 mt-1">v2.0.0</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
