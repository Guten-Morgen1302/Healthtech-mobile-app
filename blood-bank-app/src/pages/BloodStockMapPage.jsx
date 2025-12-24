import React, { useState, useEffect } from 'react';
import { MapPin, Droplets, Navigation } from 'lucide-react';
import { hospitalsAPI } from '../services/api';

const BloodStockMapPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetchHospitals();
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error('Location error:', error)
      );
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await hospitalsAPI.getAll();
      setHospitals(response.data.data || []);
    } catch (err) {
      console.error('Error fetching hospitals:', err);
    }
  };

  const getStockLevel = (inventory) => {
    if (!inventory || inventory.length === 0) return 'unknown';
    const totalUnits = inventory.reduce((sum, item) => sum + (item.unitsAvailable || 0), 0);
    if (totalUnits === 0) return 'empty';
    if (totalUnits < 10) return 'low';
    if (totalUnits < 30) return 'medium';
    return 'high';
  };

  const getStockColor = (level) => {
    switch (level) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-orange-500';
      case 'empty': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
          <MapPin className="h-8 w-8 text-blue-600" />
          Live Blood Stock Map
        </h1>
        <p className="text-zinc-600 mt-1">Find nearby blood banks and check real-time stock availability</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area (Simplified) */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-zinc-200 p-6 h-[600px]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Blood Bank Locations</h2>
            <div className="flex gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Low</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Empty</span>
              </div>
            </div>
          </div>

          {/* Simplified Map View (Grid of locations) */}
          <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[500px]">
            {hospitals.map((hospital) => {
              const stockLevel = getStockLevel(hospital.inventory);
              const distance = userLocation ? calculateDistance(
                userLocation.lat, userLocation.lng,
                hospital.location?.coordinates?.[1] || 0,
                hospital.location?.coordinates?.[0] || 0
              ) : null;

              return (
                <div
                  key={hospital._id}
                  onClick={() => setSelectedHospital(hospital)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedHospital?._id === hospital._id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-zinc-200 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full ${getStockColor(stockLevel)} flex items-center justify-center flex-shrink-0`}>
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{hospital.H_Name}</h3>
                      <p className="text-xs text-zinc-600 truncate">{hospital.H_Address}</p>
                      {distance && (
                        <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                          <Navigation className="h-3 w-3" />
                          {distance} km away
                        </p>
                      )}
                      <p className="text-xs text-zinc-500 mt-1 capitalize">
                        Stock: {stockLevel}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hospital Details Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Hospital Details</h2>
          
          {selectedHospital ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-xl mb-2">{selectedHospital.H_Name}</h3>
                <p className="text-sm text-zinc-600 mb-3">{selectedHospital.H_Address}</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-red-500" />
                  Blood Stock
                </h4>
                <div className="space-y-2">
                  {selectedHospital.inventory && selectedHospital.inventory.length > 0 ? (
                    selectedHospital.inventory.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-zinc-50 rounded">
                        <span className="font-medium">{item.bloodGroup}</span>
                        <span className={`font-bold ${
                          item.unitsAvailable > 10 ? 'text-green-600' :
                          item.unitsAvailable > 5 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {item.unitsAvailable} units
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-500 text-center py-4">No inventory data</p>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-zinc-600">📞 {selectedHospital.H_Phone || 'N/A'}</p>
                  <p className="text-zinc-600">📧 {selectedHospital.H_Email || 'N/A'}</p>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Request Blood
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-16 w-16 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500">Select a hospital to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodStockMapPage;
