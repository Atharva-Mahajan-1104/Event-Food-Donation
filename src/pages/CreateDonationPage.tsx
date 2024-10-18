import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const schema = yup.object({
  foodDescription: yup.string().required('Food description is required'),
  quantity: yup.string().required('Quantity is required'),
  pickupLocation: yup.string().required('Pickup location is required'),
  expiryTime: yup.date().min(new Date(), 'Expiry time must be in the future').required('Expiry time is required'),
}).required();

type FormData = yup.InferType<typeof schema>;

const CreateDonationPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post('/api/donations', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating donation:', error);
      // Handle error (e.g., show error message)
    }
  };

  if (user?.role !== 'organizer') {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Donation</h1>
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="foodDescription" className="block text-sm font-medium text-gray-700">
              Food Description
            </label>
            <div className="mt-1">
              <input
                id="foodDescription"
                type="text"
                {...register('foodDescription')}
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              {errors.foodDescription && <p className="mt-2 text-sm text-red-600">{errors.foodDescription.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <div className="mt-1">
              <input
                id="quantity"
                type="text"
                {...register('quantity')}
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              {errors.quantity && <p className="mt-2 text-sm text-red-600">{errors.quantity.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">
              Pickup Location
            </label>
            <div className="mt-1">
              <input
                id="pickupLocation"
                type="text"
                {...register('pickupLocation')}
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              {errors.pickupLocation && <p className="mt-2 text-sm text-red-600">{errors.pickupLocation.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="expiryTime" className="block text-sm font-medium text-gray-700">
              Expiry Time
            </label>
            <div className="mt-1">
              <input
                id="expiryTime"
                type="datetime-local"
                {...register('expiryTime')}
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              {errors.expiryTime && <p className="mt-2 text-sm text-red-600">{errors.expiryTime.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationPage;