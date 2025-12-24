import React, { useState, useEffect } from 'react';
import { Droplet, Users, Heart, TrendingUp, AlertCircle, Activity, Award, Zap, Target, Clock } from 'lucide-react';

// Massive Circular Progress Component
const MassiveProgress = ({ percentage, size = 280, strokeWidth = 24, color = '#facc15', label, value, subtitle }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 20px ${color})` }}
        />
      </svg>
      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-6xl font-black text-white mb-2 text-glow">{value}</div>
        <div className="text-sm font-bold text-white/80 uppercase tracking-wider">{label}</div>
        <div className="text-xs text-white/60 mt-1">{subtitle}</div>
      </div>
    </div>
  );
};

// Glassmorphic Stat Card
const GlassCard = ({ icon: Icon, title, value, change, gradient, iconColor }) => (
  <div className={`card-glass p-8 hover:scale-105 transition-transform duration-300 cursor-pointer group`}>
    <div className="flex items-start justify-between mb-6">
      <div className={`w-16 h-16 rounded-[1.2rem] bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div className={`px-4 py-2 rounded-full text-sm font-bold ${change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {change >= 0 ? '+' : ''}{change}%
      </div>
    </div>
    <div className="space-y-2">
      <div className="text-5xl font-black text-gray-900">{value}</div>
      <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</div>
    </div>
  </div>
);

// Animated Blood Group Card
const BloodGroupCardUltra = ({ type, units, total, color, animated = true }) => {
  const percentage = (units / total) * 100;
  
  return (
    <div className={`relative overflow-hidden rounded-[1.5rem] p-6 bg-gradient-to-br ${color} shadow-2xl hover:scale-110 hover:-rotate-2 transition-all duration-300 cursor-pointer group`}>
      {/* Animated Background */}
      {animated && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl font-black text-white">{type}</div>
          <Droplet className="h-8 w-8 text-white/80" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-3xl font-black text-white">{units}</span>
            <span className="text-sm font-bold text-white/70">/ {total} units</span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur">
            <div 
              className="h-full bg-white rounded-full transition-all duration-1000 ease-out shadow-lg"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Alert Card with Animation
const AlertCardPulse = ({ type, units, level }) => {
  const getLevelColor = () => {
    if (level === 'critical') return 'from-red-500 to-red-700';
    if (level === 'low') return 'from-orange-500 to-orange-700';
    return 'from-yellow-500 to-yellow-700';
  };

  return (
    <div className={`bg-gradient-to-r ${getLevelColor()} rounded-[1.5rem] p-6 text-white shadow-2xl hover:scale-105 transition-transform duration-300 animate-pulse`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-black">{type}</div>
            <div className="text-sm font-semibold text-white/80">{units} units remaining</div>
          </div>
        </div>
        <div className="text-right">
          <div className="px-4 py-2 bg-white/20 rounded-full text-xs font-bold uppercase backdrop-blur">
            {level}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPageUltra = () => {
  const [stats, setStats] = useState({
    totalDonors: 247,
    totalUnits: 189,
    activeRequests: 12,
    todaysDonations: 8
  });

  const bloodGroups = [
    { type: 'A+', units: 45, total: 60, color: 'from-red-500 to-red-700' },
    { type: 'O+', units: 52, total: 60, color: 'from-orange-500 to-orange-700' },
    { type: 'B+', units: 28, total: 60, color: 'from-blue-500 to-blue-700' },
    { type: 'AB+', units: 15, total: 60, color: 'from-purple-500 to-purple-700' },
    { type: 'A-', units: 12, total: 60, color: 'from-pink-500 to-pink-700' },
    { type: 'O-', units: 18, total: 60, color: 'from-indigo-500 to-indigo-700' },
    { type: 'B-', units: 10, total: 60, color: 'from-teal-500 to-teal-700' },
    { type: 'AB-', units: 9, total: 60, color: 'from-cyan-500 to-cyan-700' }
  ];

  const alerts = [
    { type: 'AB-', units: 9, level: 'critical' },
    { type: 'B-', units: 10, level: 'critical' },
    { type: 'A-', units: 12, level: 'low' }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="card-glass p-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-6xl font-black text-gray-900 mb-3">Blood Bank Command Center</h1>
              <p className="text-xl text-gray-600 font-semibold">Real-time monitoring and analytics dashboard</p>
            </div>
            <div className="flex gap-4">
              <button className="btn-modern btn-primary">
                <Zap className="inline h-5 w-5 mr-2" />
                Quick Actions
              </button>
              <button className="btn-modern btn-accent">
                <Target className="inline h-5 w-5 mr-2" />
                Set Goals
              </button>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <GlassCard 
            icon={Droplet}
            title="Total Blood Units"
            value={stats.totalUnits}
            change={8.2}
            gradient="from-primary-500 to-primary-700"
          />
          <GlassCard 
            icon={Users}
            title="Active Donors"
            value={stats.totalDonors}
            change={12.5}
            gradient="from-blue-500 to-blue-700"
          />
          <GlassCard 
            icon={Heart}
            title="Pending Requests"
            value={stats.activeRequests}
            change={-5.3}
            gradient="from-pink-500 to-pink-700"
          />
          <GlassCard 
            icon={TrendingUp}
            title="Today's Donations"
            value={stats.todaysDonations}
            change={15.8}
            gradient="from-green-500 to-green-700"
          />
        </div>

        {/* Massive Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Progress Ring */}
          <div className="lg:col-span-2 card-glass p-12 flex items-center justify-between">
            <div className="space-y-4">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full">
                <span className="text-sm font-black text-gray-900 uppercase">Monthly Target</span>
              </div>
              <h2 className="text-5xl font-black text-gray-900">December 2025</h2>
              <p className="text-2xl text-gray-600 font-bold">You've completed 72% of your target!</p>
              <div className="flex gap-4 pt-6">
                <button className="btn-modern btn-accent">
                  <Award className="inline h-5 w-5 mr-2" />
                  View Rewards
                </button>
              </div>
            </div>
            <MassiveProgress 
              percentage={72}
              size={320}
              strokeWidth={28}
              color="#facc15"
              label="180 / 250"
              value="72%"
              subtitle="Donations"
            />
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="card-glass p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-[1.2rem] flex items-center justify-center shadow-xl">
                  <Activity className="h-7 w-7 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Now</div>
                  <div className="text-3xl font-black text-gray-900">24</div>
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-600">Donors in facility</div>
            </div>

            <div className="card-glass p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-[1.2rem] flex items-center justify-center shadow-xl">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Wait Time</div>
                  <div className="text-3xl font-black text-gray-900">12m</div>
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-600">Average processing</div>
            </div>
          </div>
        </div>

        {/* Blood Inventory Grid */}
        <div className="card-glass p-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-black text-gray-900">Blood Inventory Status</h2>
            <div className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-[1.5rem] text-white font-bold shadow-xl">
              Live Updates
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bloodGroups.map((group, idx) => (
              <BloodGroupCardUltra key={idx} {...group} animated={true} />
            ))}
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="card-glass p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-[1.2rem] flex items-center justify-center shadow-2xl animate-pulse">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-black text-gray-900">Critical Alerts</h2>
              <p className="text-gray-600 font-semibold">Immediate attention required</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alerts.map((alert, idx) => (
              <AlertCardPulse key={idx} {...alert} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPageUltra;
