import React, { useState, useEffect } from 'react';
import { rewardsAPI } from '../services/api';
import { Trophy, Star, Award, TrendingUp, Users, Heart } from 'lucide-react';

const RewardsPage = () => {
  const [rewards, setRewards] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const donorId = 'YOUR_DONOR_ID'; // Replace with actual from auth

  useEffect(() => {
    fetchRewards();
    fetchLeaderboard();
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await rewardsAPI.getDonorRewards(donorId);
      setRewards(response.data.data);
    } catch (err) {
      console.error('Error fetching rewards:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await rewardsAPI.getLeaderboard({ limit: 10 });
      setLeaderboard(response.data.data || []);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    }
  };

  const getRankColor = (rank) => {
    const colors = {
      lifesaver: 'bg-gradient-to-r from-purple-600 to-pink-600',
      legend: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      hero: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      contributor: 'bg-gradient-to-r from-green-600 to-teal-600',
      beginner: 'bg-gradient-to-r from-zinc-500 to-zinc-600'
    };
    return colors[rank] || colors.beginner;
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">
    <div className="text-center"><div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
    <p>Loading rewards...</p></div></div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-zinc-900 mb-6 flex items-center gap-3">
        <Trophy className="h-8 w-8 text-yellow-500" />
        Donor Rewards & Leaderboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Points Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Star className="h-8 w-8" />
            <span className="text-sm opacity-80">Total Points</span>
          </div>
          <div className="text-4xl font-bold mb-2">{rewards?.totalPoints || 0}</div>
          <div className="text-sm opacity-90">Rank: {rewards?.rank?.toUpperCase() || 'BEGINNER'}</div>
        </div>

        {/* Donations Card */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Heart className="h-8 w-8" />
            <span className="text-sm opacity-80">Total Donations</span>
          </div>
          <div className="text-4xl font-bold mb-2">{rewards?.totalDonations || 0}</div>
          <div className="text-sm opacity-90">Lives Saved: {rewards?.livesSaved || 0}</div>
        </div>

        {/* Emergency Responses */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8" />
            <span className="text-sm opacity-80">Emergency Responses</span>
          </div>
          <div className="text-4xl font-bold mb-2">{rewards?.emergencyResponses || 0}</div>
          <div className="text-sm opacity-90">Streak: {rewards?.currentStreak || 0}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badges */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Award className="h-6 w-6 text-yellow-500" />
            My Badges
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {rewards?.badges && rewards.badges.length > 0 ? rewards.badges.map((badge, idx) => (
              <div key={idx} className="text-center p-4 bg-zinc-50 rounded-lg">
                <div className="text-4xl mb-2">{badge.icon || '🏅'}</div>
                <div className="text-sm font-medium">{badge.name}</div>
                <div className="text-xs text-zinc-600 capitalize">{badge.level}</div>
              </div>
            )) : (
              <div className="col-span-3 text-center text-zinc-500 py-4">No badges yet. Start donating!</div>
            )}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            Top Donors
          </h2>
          <div className="space-y-2">
            {leaderboard.map((donor, idx) => (
              <div key={donor._id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-zinc-400' : idx === 2 ? 'bg-orange-600' : 'bg-zinc-300'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-medium">{donor.donorId?.Bd_Name || 'Unknown'}</div>
                    <div className="text-xs text-zinc-600">{donor.totalDonations} donations</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">{donor.totalPoints}</div>
                  <div className="text-xs text-zinc-600">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
