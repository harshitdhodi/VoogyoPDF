import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { MdOutlineCardTravel } from "react-icons/md";
const TravelInclusions = ({ travel }) => {
    if (!travel?.includedItems) return null;

    const { included, excluded } = travel.includedItems;

    return (
        <div className="max-w-4xl day-section  mx-auto ">
            <div className="flex items-center mb-3 gap-4 px-4 border-b-2 pb-3 border-gray-300">
                {/* Icon Container */}
                <div className="w-12 h-12 mt-3 rounded-full bg-blue-100 flex items-center justify-center">
                    <MdOutlineCardTravel className="w-6 h-6 text-blue-500" />
                </div>

                {/* Heading */}
                <h2 className="text-xl font-semibold text-blue-600">
                    Travel Package Details
                </h2>
            </div>



            {/* Included Items */}
            <div className="mb-6 px-3">
                <h3 className="text-xl font-semibold text-green-600 mb-3">What's Included:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {included.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center p-3 bg-green-100 text-green-700 rounded-lg shadow-sm"
                        >
                            <CheckCircle className="w-5 h-5 mr-2" />
                           <span className="relative -top-2"> {item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Excluded Items */}
            <div className="px-3 mb-5">
                <h3 className="text-xl font-semibold text-red-600 mb-3">What's Not Included:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {excluded.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center p-3 bg-red-100 text-red-700 rounded-lg shadow-sm"
                        >
                            <XCircle className="w-5 h-5 mr-2" />
                            <span className="relative -top-2">  {item}</span>
                           
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TravelInclusions;
