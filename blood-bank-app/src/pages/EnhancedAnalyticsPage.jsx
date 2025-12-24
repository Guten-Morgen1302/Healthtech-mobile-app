import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Droplets, AlertCircle, Calendar, Award } from 'lucide-react';
import { analyticsAPI } from '../services/api';

const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

const EnhancedAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await analyticsAPI.getDashboard();
      setAnalytics(response.data.data);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  const inventoryData = analytics?.inventoryByBloodGroup || [];
  const donationTrends = analytics?.donationTrends || [];
  const topDonors = analytics?.topDonors || [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          Enhanced Analytics Dashboard
        </h1>
        <p className="text-zinc-600 mt-1">Comprehensive insights and data visualization</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Droplets className="h-8 w-8" />
            <span className="text-sm opacity-80">Total Units</span>
          </div>
          <div className="text-3xl font-bold">{analytics?.totalInventory || 0}</div>
          <div className="text-sm opacity-90 mt-1">Blood Inventory</div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8" />
            <span className="text-sm opacity-80">Active Donors</span>
          </div>
          <div className="text-3xl font-bold">{analytics?.donorStats?.totalDonors || 0}</div>
          <div className="text-sm opacity-90 mt-1">This Month: {analytics?.donorStats?.donorsThisMonth || 0}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-8 w-8" />
            <span className="text-sm opacity-80">Appointments</span>
          </div>
          <div className="text-3xl font-bold">{analytics?.appointmentStats?.totalAppointments || 0}</div>
          <div className="text-sm opacity-90 mt-1">
            Completion: {analytics?.appointmentStats?.completionRate?.toFixed(1) || 0}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="h-8 w-8" />
            <span className="text-sm opacity-80">Emergencies</span>
          </div>
          <div className="text-3xl font-bold">{analytics?.emergencyStats?.totalEmergencies || 0}</div>
          <div className="text-sm opacity-90 mt-1">
            Avg Response: {analytics?.emergencyStats?.averageResponseTime?.toFixed(1) || 0}h
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Blood Inventory Bar Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Blood Inventory by Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalUnits" fill="#3B82F6" name="Total Units" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Blood Group Distribution Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Blood Group Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={inventoryData}
                dataKey="totalUnits"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry._id}: ${entry.totalUnits}`}
              >
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Donation Trends Line Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Donation Trends (12 Months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={donationTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#10B981" strokeWidth={2} name="Donations" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Donors */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Award className="h-6 w-6 text-yellow-500" />
            Top 10 Donors
          </h2>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {topDonors.map((donor, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-zinc-50 rounded">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-zinc-400' : idx === 2 ? 'bg-orange-600' : 'bg-zinc-300'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-medium">{donor.donorName || 'Unknown'}</div>
                    <div className="text-xs text-zinc-600">{donor.bloodGroup}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">{donor.donationCount}</div>
                  <div className="text-xs text-zinc-600">donations</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-600">
            <AlertCircle className="h-6 w-6" />
            Low Stock Alerts
          </h2>
          {analytics?.lowStockAlerts && analytics.lowStockAlerts.length > 0 ? (
            <div className="space-y-2">
              {analytics.lowStockAlerts.map((alert, idx) => (
                <div key={idx} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{alert._id}</span>
                    <span className="text-red-600 font-bold">{alert.totalUnits} units</span>
                  </div>
                  <p className="text-sm text-red-700 mt-1">⚠️ Critical: Below 5 units</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-center py-8">No low stock alerts</p>
          )}
        </div>

        {/* Expiring Soon */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-600">
            <Calendar className="h-6 w-6" />
            Expiring Soon (7 Days)
          </h2>
          {analytics?.expiringUnits && analytics.expiringUnits.length > 0 ? (
            <div className="space-y-2">
              {analytics.expiringUnits.map((item, idx) => (
                <div key={idx} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{item.Bg_Group}</span>
                      <span className="text-xs text-zinc-600 ml-2">ID: {item.Bd_Id}</span>
                    </div>
                    <span className="text-orange-600 font-bold">
                      {new Date(item.Bd_Expiry_Date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-center py-8">No units expiring soon</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedAnalyticsPage;
