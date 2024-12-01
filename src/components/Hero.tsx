import React from 'react';
import { Link } from 'react-router-dom';
import { SubscriptionForm } from './notifications/SubscriptionForm';

export function Hero() {
  return (
    <div>
      <div className="relative h-[600px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover"
        >
          <source
            src="https://player.vimeo.com/external/451898620.sd.mp4?s=a3f3c5e8f19394d4c9e8e7b4e6cd2b3a0b212fd8&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Explore Exclusive Embroidery Designs
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover our handcrafted collection of traditional and modern embroidery patterns
            </p>
            <Link
              to="/store"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
        <SubscriptionForm />
      </div>
    </div>
  );
}