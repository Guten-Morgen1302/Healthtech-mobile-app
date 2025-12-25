import React, { useState, useEffect } from 'react';
import { campsAPI } from '../services/api';
import { Tent, MapPin, Calendar, Users, Plus } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const CampsPage = () => {
  const { success, error } = useToast();
  const { user } = useAuth();
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    try {
      const response = await campsAPI.getUpcoming();
      setCamps(response.data.data || []);
    } catch (err) {
      console.error('Error fetching camps:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (campId) => {
    if (!user) {
      error('Login Required', 'Please login to register for camps');
      return;
    }

    try {
      await campsAPI.register(campId, {
        donorId: user._id,
        donorName: user.Bd_Name || 'Unknown Donor',
        donorPhone: user.Bd_Cell_Num || '',
        donorEmail: user.Bd_Email || '',
        bloodGroup: user.Bd_Blood_Group || ''
      });
      success('Registered!', 'You have been registered for the camp');
      fetchCamps();
    } catch (err) {
      error('Registration Failed', err.response?.data?.message || 'Please try again');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
            <Tent className="h-8 w-8 text-green-600" />
            Blood Donation Camps
          </h1>
          <p className="text-zinc-600 mt-1">Join upcoming blood donation drives in your area</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camps.map((camp) => (
          <div key={camp._id} className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-zinc-900">{camp.campName}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${camp.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                camp.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                  'bg-zinc-100 text-zinc-700'
                }`}>
                {camp.status.toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-zinc-600 mb-4">{camp.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-zinc-500" />
                <span>{new Date(camp.campDate).toLocaleDateString()} • {camp.startTime} - {camp.endTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-zinc-500" />
                <span>{camp.location.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-zinc-500" />
                <span>{camp.registrations?.length || 0} / {camp.expectedDonors} registered</span>
              </div>
            </div>

            <button
              onClick={() => handleRegister(camp._id)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Register for Camp
            </button>
          </div>
        ))}

        {camps.length === 0 && !loading && (
          <div className="col-span-3 text-center py-12">
            <Tent className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
            <p className="text-zinc-600">No upcoming camps at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampsPage;
