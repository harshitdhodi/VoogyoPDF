import React from "react";
import { TransportInfo } from "../TransportData";
import { HotelInfo } from "../HotelInfo";
import { ActivityInfo } from "../ActivityData";
import { SegmentInfo } from "../ItenarySegment";

const ItineraryWithTransport = ({ itineraries = [], transports = [], hotels = [], activities = [], travelDate }) => {

  // Helper function to format date safely
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date) ? null : date.toISOString().split('T')[0];
  };

  // Normalize day numbers
  const normalizeDayNumber = (day) => (typeof day === "string" ? day.replace("Day ", "") : day);

  // Convert travelDate to Date object
  const baseDate = travelDate ? new Date(travelDate) : null;

  // Map hotels by day
  const hotelsByDay = hotels.reduce((acc, hotel) => {
    const startDate = new Date(hotel.startDate);
    if (!baseDate || isNaN(startDate)) return acc;

    // Calculate day number based on travelDate
    const dayNumber = Math.floor((startDate - baseDate) / (1000 * 60 * 60 * 24)) + 1;

    if (!acc[dayNumber]) acc[dayNumber] = [];
    acc[dayNumber].push(hotel);
    return acc;
  }, {});
  console.log(hotelsByDay)
  // Map transports by day
  const transportsByDay = itineraries.reduce((acc, itinerary, index) => {
    acc[itinerary.dayNumber] = (transports || []).filter((_, i) => i === index);
    return acc;
  }, {});

  // Map activities by day
  const activitiesByDay = itineraries.reduce((acc, itinerary) => {
    const dayNumber = normalizeDayNumber(itinerary.dayNumber);
    acc[dayNumber] = (activities || []).filter(
      (activity) => activity.dayNumbers.includes(`Day ${dayNumber}`)
    );
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {itineraries.map((itinerary) => {
        const dayNumber = normalizeDayNumber(itinerary.dayNumber);
        return (
          <div key={itinerary.id} className=" ">
            <div className="flex items-center day-section gap-4  border-b-2 px-4 pb-3 border-gray-300">
            
              <h2 className="text-xl font-bold py-2 -mt-2 text-blue-900">{`Day ${dayNumber}`}</h2>
            </div>


            {/* Transports for the day */}
            {transportsByDay[itinerary.dayNumber]?.map((transport) => (
              <TransportInfo key={transport.id} transport={transport} />
            ))}

            {/* Hotels for the day */}
            {hotelsByDay[dayNumber]?.map((hotel) => (
              <HotelInfo key={hotel.id} hotel={hotel} />
            ))}

            {/* Activities for the day */}
            {activitiesByDay[dayNumber]?.map((activity) => (
              <ActivityInfo key={activity.id} activity={activity} />
            ))}

            {/* Segments for the day */}
            {itinerary.segments.map((segment) => (
              <SegmentInfo key={segment.id} segment={segment} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ItineraryWithTransport;
