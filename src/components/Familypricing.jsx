import { MdFamilyRestroom } from "react-icons/md";
import { FaUser, FaBaby, FaChild, FaUserTie } from "react-icons/fa"; // Icons for categories

export const FamilyPricing = ({ travelData }) => {
  // Icon mapping for clarity
  const memberIcons = {
    perPerson: <FaUser className="w-5 h-5 text-blue-500" />,
    infant: <FaBaby className="w-5 h-5 text-pink-500" />,
    child: <FaChild className="w-5 h-5 text-yellow-500" />,
    adult: <FaUserTie className="w-5 h-5 text-green-500" />,
  };

  return (
    <div className=" day-section flex flex-col bg-gray-50">
      {/* Header Section */}
      <div className="flex items-center mt-2 gap-4 border-b-2 px-4 pb-3 border-gray-300">
        <div className="w-12 h-12 mt-3 rounded-full bg-blue-100 flex items-center justify-center">
          <MdFamilyRestroom className="w-6 h-6 text-blue-500" />
        </div>
        <h2 className="text-xl font-semibold -mt-2 text-blue-600">Family Pricing</h2>
      </div>

      {/* Pricing Table */}
      {travelData.familyPricing.map((pricing) => (
        <div key={pricing.id} className="bg-white shadow-md rounded-lg p-4 mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  {Object.keys(pricing.members).map((key) => (
                    <th key={key} className="p-3 text-center border border-gray-300 font-semibold">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100">
                  {Object.entries(pricing.members).map(([key, value]) => (
                    <td key={key} className="p-3 text-center border border-gray-300 font-medium">
                      <div className="flex flex-col items-center">
                        {memberIcons[key] || <FaUser className="w-5 h-5 text-gray-500" />}
                        <span className="font-semibold text-gray-700 mt-1">₹{value}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Optional Note */}
          {pricing.note && (
            <p className="mt-2 text-xs text-gray-500 italic text-center">
              Note: {pricing.note}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
