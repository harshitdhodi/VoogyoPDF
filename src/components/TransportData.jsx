import { Plane } from "lucide-react";

export const TransportInfo = ({ transport }) => (
  <div className="px-4 py-2 shadow-sm">
    <h2 className="font-bold text-blue-600 mb-3">Transport Info:-</h2>
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
        <Plane className="w-4 h-4 text-blue-500" />
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-semibold">
              {transport.departureTime} - {transport.arrivalTime}
            </p>
            <p className="text-sm text-gray-600">
              {transport.from} → {transport.to}
            </p>
          </div>
          <div style={{ padding: "4px 8px", backgroundColor: "#DBEAFE", color: "#1E40AF", borderRadius: "9999px", fontSize: "14px" }}>
           <span className="relative -top-2"> {transport.vehicleType}</span>
          </div>

        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">TYPE</p>
            <p className="capitalize">{transport.type}</p>
          </div>
          <div>
            <p className="text-gray-500">FROM</p>
            <p>{transport.fromDetails.city || transport.fromDetails.name}</p>
          </div>
          <div>
            <p className="text-gray-500">TO</p>
            <p>{transport.toDetails.city || transport.toDetails.name}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);