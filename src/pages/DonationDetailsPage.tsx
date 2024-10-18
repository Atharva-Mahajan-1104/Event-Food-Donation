import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface Donation {
  id: string;
  foodDescription: string;
  quantity: string;
  pickupLocation: string;
  expiryTime: string;
  status: 'available' | 'claimed' | 'expired';
  createdBy: {
    name: string;
    email: string;
  };
}

const DonationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [donation, setDonation]= useState<Donation | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await axios.get(`/api/donations/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setDonation(response.data);
      } catch (error) {
        console.error('Error fetching donation details:', error);
        navigate('/dashboard');
      }
    };

    fetchDonation();
  }, [id, navigate]);

  const handleClaimDonation = async () => {
    try {
      await axios.post(`/api/donations/${id}/claim`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDonation(prev => prev ? { ...prev, status: 'claimed' } : null);
    } catch (error) {
      console.error('Error claiming donation:', error);
    }
  };

  if (!donation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Donation Details</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{donation.foodDescription}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Donation ID: {donation.id}</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Quantity</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{donation.quantity}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Pickup Location</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{donation.pickupLocation}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Expiry Time</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(donation.expiryTime).toLocaleString()}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  donation.status === 'available' ? 'bg-green-100 text-green-800' :
                  donation.status === 'claimed' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {donation.status}
                </span>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Created By</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {donation.createdBy.name} ({donation.createdBy.email})
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {user?.role === 'shelter' && donation.status === 'available' && (
        <div className="mt-6">
          <button
            onClick={handleClaimDonation}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Claim Donation
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationDetailsPage;