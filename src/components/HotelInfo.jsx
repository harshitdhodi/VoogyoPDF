import { Bed } from "lucide-react";

export const HotelInfo = ({ hotel }) => (
    <div className="px-4 py-2 shadow-sm">
      <h2 className="font-bold text-blue-600 mb-3">Hotel Info:-</h2>
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
          <Bed className="w-4 h-4 text-blue-500" />
        </div>
  
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-semibold">{hotel.hotelName}</p>
              <p className="text-sm text-gray-600">{hotel.destination}</p>
            </div>
            <div className="px-3 py-1   bg-blue-100 text-blue-800 rounded-full text-sm">
             <span  className="relative -top-2">
             {hotel.roomType}
             </span>
            </div>
          </div>
  
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">NIGHTS</p>
              <p>{hotel.nights}</p>
            </div>
            <div>
              <p className="text-gray-500">MEAL PLAN</p>
              <p>{hotel.mealPlan}</p>
            </div>
            <div>
              <p className="text-gray-500">NOTE</p>
              <p>{hotel.note || "No additional notes"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
