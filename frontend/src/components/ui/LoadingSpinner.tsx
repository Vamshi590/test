import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" role="status" aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
