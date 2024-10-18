import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Share Food, Share Love
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Connect event organizers and restaurants with local shelters and NGOs to donate leftover food.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="ml-3 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
            >
              Log In
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            How It Works
          </h2>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-center">
              <Heart className="h-12 w-12 text-green-500" />
              <h3 className="mt-6 text-xl font-medium text-gray-900">Donate Excess Food</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Event organizers and restaurants can easily post their excess food for donation.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-green-500" />
              <h3 className="mt-6 text-xl font-medium text-gray-900">Help Those in Need</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Shelters and NGOs can claim available donations to support their communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;