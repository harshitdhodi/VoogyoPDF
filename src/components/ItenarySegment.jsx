import { MapPin } from "lucide-react";

export const SegmentInfo = ({ segment }) => {
    const photos = segment.photos?.[0]?.photos?.slice(0, 5) || [];
  
    return (
      <div className="mb-6 p-4 shadow-sm">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <MapPin className="text-blue-600 mt-1 relative -top-1" size={20} />
          </div>
          <div>
            <div className="text-lg text-blue-600 font-semibold mb-1">
              {segment.serviceType}
            </div>
            <div className="text-gray-600 flex items-center gap-2">
              <span>{segment.startLocation}</span>
              <span className="text-blue-600">→</span>
              <span>{segment.endLocation}</span>
            </div>
          </div>
        </div>
  
        {photos.length > 0 && (
          <div
            className={`grid gap-4 ${
              photos.length === 5
                ? "grid-cols-4 grid-rows-2"
                : photos.length >= 4
                ? "grid-cols-4"
                : `grid-cols-${photos.length}`
            } mb-4`}
          >
            {photos.map((photo, index) => (
              <div
                key={index}
                className={`relative rounded-lg overflow-hidden ${
                  photos.length === 5 && index === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <div className="aspect-[4/3]">
                  <img
                    src={photo.src.large}
                    alt={photo.alt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
  
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">{segment.description}</p>
        </div>
      </div>
    );
  };