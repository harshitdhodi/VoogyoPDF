import React from 'react';
import { Calendar, Tag } from 'lucide-react';

export const ActivityInfo = ({ activity }) => {
  console.log("Activity:", activity);

  return (
    <>
    <div className='px-4 py-2'>
    <h2 className="font-bold text-blue-600 mb-3">Activity Info:-</h2>
    </div>
    <div className="flex items-start space-x-4 px-4 pb-3 border-gray-200">
      {/* Icon container */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Calendar className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* Activity details */}
      <div className="flex-grow">
        {/* Activity Type as main heading */}
        <h3 className="text-lg font-semibold text-gray-900">
          {activity.activityType}
        </h3>
        
        <div className="mt-2 space-y-2">
          {/* Occasion Type if present */}
          {activity.occasionType && (
            <div className="flex items-center text-gray-600">
              <Tag className="w-4 h-4 mr-2" />
              <span>{activity.occasionType}</span>
            </div>
          )}

          {/* Description if present */}
          {activity.description && (
            <p className="text-gray-700 mt-2">
              {activity.description}
            </p>
          )}

          {/* Special Requirements if present */}
          {activity.specialRequirements && (
            <div className="mt-2 p-2 bg-yellow-50 rounded-md">
              <p className="text-sm text-yellow-700">
                <strong>Special Requirements:</strong> {activity.specialRequirements}
              </p>
            </div>
          )}

          {/* Note if present */}
          {activity.note && (
            <div className="mt-2 text-sm text-gray-500 italic">
              Note: {activity.note}
            </div>
          )}
        </div>
      </div>

    
    </div>
    </>
  );
};
