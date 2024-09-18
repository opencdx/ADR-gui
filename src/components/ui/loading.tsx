import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-25">
      <div className="flex justify-center items-center h-screen">
      <img
        src={'/loading.png'}
        alt="Loading"
        className="animate-spin h-10 w-10"
      />
      </div>
    </div>
   
  );
}
