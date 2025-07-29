import React from 'react';
import { Droplets } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center">
        <div className="relative">
          <Droplets className="h-16 w-16 text-primary-blue mx-auto animate-bounce" />
          <div className="absolute inset-0 h-16 w-16 border-4 border-primary-light-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <h2 className="mt-6 text-xl font-arabic font-bold text-primary-blue">
          جاري التحميل...
        </h2>
        <p className="mt-2 text-primary-gray font-arabic">
          يرجى الانتظار قليلاً
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;