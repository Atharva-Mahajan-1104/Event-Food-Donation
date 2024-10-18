import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface Donation {
  id: string;
  foodDescription: string;
  quantity: string;
  pickupLocation: string;
  expiryTime: string;
  status: 'available' | 'claimed' | 'expired';
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('/api/donations', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, []);

  const handleClaimDonation = async (donationId: string) => {
    try {
      await axios.post(`/api/donations/${donationId}/claim`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Update the local state to reflect the claimed donation
      setDonations(donations.map(donation => 
        donation.id === donationId ? { ...donation, status: 'claimed' } : donation
      ));
    } catch (error) {
      console.error('Error claiming donation:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      {user?.role === 'organizer' && (
        <div className="mb-6">
          <Link
            to="/create-donation"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Create New Donation
          </Link>
        </div>
      )}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {donations.map((donation) => (
            <li key={donation.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-green-600 truncate">
                    {donation.foodDescription}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      donation.status === 'available' ? 'bg-green-100 text-green-800' :
                      donation.status === 'claimed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {donation.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Quantity: {donation.quantity}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      Location: {donation.pickupLocation}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Expires: {new Date(donation.expiryTime).toLocaleString()}
                    </p>
                  </div>
                </div>
                {user?.role === 'shelter' && donation.status === 'available' && (
                  <div className="mt-4">
                    <button
                      onClick={() => handleClaimDonation(donation.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Claim Donation
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;