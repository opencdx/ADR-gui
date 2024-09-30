import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="w-full h-screen flex">
      {/* Left sidebar */}
      <div className="w-1/4 p-4 border-r">
        {/* Header section */}
        <div className="mb-4">
          <div className="h-8 bg-gray-300 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-300 rounded animate-pulse" />
        </div>
        {/* Criteria list */}
        <div className="space-y-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-12 bg-gray-300 rounded animate-pulse" />
          ))}
        </div>
        {/* Query Library */}
        <div className="mt-10">
          <div className="h-8 bg-gray-300 rounded animate-pulse mb-2" />
          {[...Array(2)].map((_, index) => (
            <div key={index} className="h-12 bg-gray-300 rounded animate-pulse mb-2" />
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="w-3/4 p-4">
        <div className="mb-4">
          <div className="h-8 bg-gray-300 rounded animate-pulse mb-2" />
        </div>
        {/* Buttons row */}
        <div className="mb-4 flex space-x-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-8 w-24 bg-gray-300 rounded animate-pulse" />
          ))}
          <div className="h-8 w-32 bg-gray-300 rounded animate-pulse ml-auto" />
          <div className="h-8 w-32 bg-gray-300 rounded animate-pulse mb-4" />
         
        </div>

        {/* Query fields */}
        <div className="space-y-2 mb-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-14 bg-gray-300 rounded animate-pulse" />
          ))}
        </div>
        {/* Drag and drop area */}
        {/* Bottom row */}
        <div className="flex justify-between items-center">
          <div className="h-10 w-48 bg-gray-300 rounded animate-pulse" />
          <div className="flex space-x-2">
            <div className="h-10 w-32 bg-gray-300 rounded animate-pulse" />
            <div className="h-10 w-24 bg-gray-300 rounded animate-pulse" />
            <div className="h-10 w-24 bg-gray-300 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
