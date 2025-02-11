import React from 'react';
import { usePDF } from 'react-to-pdf';
import { 
  Download, 
  MapPin, 
  Calendar, 
  Clock, 
  Plane, 
  Phone, 
  Mail, 
  Globe, 
  Building2
} from 'lucide-react';

// Initialize travel data with extended itinerary
const travelData = {
  leadId: "TETE090225350",
  description: "Embark on an extraordinary 5-day journey through Kashmir, where nature's canvas bursts with vibrant hues. Marvel at the majestic Himalayas, towering above the serene Dal Lake. Experience the rich culture, taste authentic Kashmiri cuisine, and create unforgettable memories in this paradise on Earth.",
  images: [
    {
      url: "https://images.unsplash.com/photo-1566837497312-7be4a47b6ec7?auto=format&fit=crop&w=2070&q=80",
      alt: "Breathtaking view of Dal Lake with traditional Shikara boats in Kashmir"
    }
  ],
  itineraries: [
    {
      dayNumber: "Day 1",
      segments: [
        {
          startLocation: "Srinagar Airport",
          endLocation: "Dal Lake",
          serviceType: "Arrival & Lake Tour",
          description: "Welcome to Srinagar! After airport pickup, check into your luxurious houseboat on Dal Lake. Enjoy a serene Shikara ride through floating gardens and witness a mesmerizing sunset over the Himalayas.",
          photos: [
            {
              photos: [
                {
                  src: {
                    large: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1920&q=80",
                  },
                  alt: "Traditional Kashmiri houseboat on Dal Lake at sunset"
                },
                {
                  src: {
                    large: "https://images.unsplash.com/photo-1623492701902-47dc207df5cf?auto=format&fit=crop&w=1920&q=80",
                  },
                  alt: "Shikara ride through the floating gardens of Dal Lake"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      dayNumber: "Day 2",
      segments: [
        {
          startLocation: "Srinagar",
          endLocation: "Gulmarg",
          serviceType: "Mountain Adventure",
          description: "Travel to Gulmarg, the 'Meadow of Flowers'. Take the famous Gulmarg Gondola ride to Apharwat Peak for panoramic views. Experience skiing or snowboarding in winter, or trek through flower-laden meadows in summer.",
          photos: [
            {
              photos: [
                {
                  src: {
                    large: "https://images.unsplash.com/photo-1589881133825-bbb3b9471b1b?auto=format&fit=crop&w=1920&q=80",
                  },
                  alt: "Gulmarg Gondola with snow-capped mountains in the background"
                },
                {
                  src: {
                    large: "https://images.unsplash.com/photo-1624088643861-599602fa18d3?auto=format&fit=crop&w=1920&q=80",
                  },
                  alt: "Scenic view of Gulmarg's meadows in full bloom"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      dayNumber: "Day 3",
      segments: [
        {
          startLocation: "Gulmarg",
          endLocation: "Pahalgam",
          serviceType: "Valley Exploration",
          description: "Journey to Pahalgam, the 'Valley of Shepherds'. Visit Betaab Valley and Chandanwari. Take a pony ride to the stunning Baisaran meadows, often called 'Mini Switzerland'.",
          photos: [
            {
              photos: [
                {
                  src: {
                    large: "https://images.unsplash.com/photo-1624090809543-03736a5a3f11?auto=format&fit=crop&w=1920&q=80",
                  },
                  alt: "Scenic view of Betaab Valley in Pahalgam"
                },
                {
                  src: {
                    large: "https://images.unsplash.com/photo-1590677197180-1c5c527b25e9?auto=format&fit=crop&w=1920&q=80",
                  },
                  alt: "Baisaran meadows surrounded by pine forests"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      dayNumber: "Day 4",
      segments: [
        {
          startLocation: "Pahalgam",
          endLocation: "Sonamarg",
          serviceType: "Glacier Visit",
          description: "Head to Sonamarg, the 'Meadow of Gold'. Trek to Thajiwas Glacier and experience snow even in summer. Enjoy river rafting in the Sindh River and visit the pristine Vishansar Lake.",
          photos: [
            {
              photos: [
                {
                  src: {
                    large: "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?auto=format&fit=crop&w=1920&q=80",
                  },
                  alt: "Thajiwas Glacier in Sonamarg"
                },
                {
                  src: {
                    large: "https://images.unsplash.com/photo-1622732794783-0cdd7b60c7c5?auto=format&fit=crop&w=1920&q=80",
                  },
                  alt: "Sindh River flowing through Sonamarg valley"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      dayNumber: "Day 5",
      segments: [
        {
          startLocation: "Sonamarg",
          endLocation: "Srinagar",
          serviceType: "Cultural Experience & Departure",
          description: "Return to Srinagar. Visit the historic Mughal Gardens, shop at the traditional Lal Chowk market for Kashmiri handicrafts and spices. Transfer to airport with memories to cherish forever.",
          photos: [
            {
              photos: [
                {
                  src: {
                    large: "https://images.unsplash.com/photo-1590677197180-1c5c527b25e9?auto=format&fit=crop&w=1920&q=80",
                  },
                  alt: "Nishat Bagh Mughal Garden with terraced gardens"
                },
                {
                  src: {
                    large: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1920&q=80",
                  },
                  alt: "Traditional Kashmiri handicrafts at Lal Chowk market"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const agencyInfo = {
  name: "Wanderlust Adventures",
  license: "TA-12345-KAS",
  phone: "+91 123-456-7890",
  email: "info@wanderlustadventures.com",
  website: "www.wanderlustadventures.com",
  address: "123 Tourism Plaza, Srinagar, Kashmir"
};

function App() {
  const { toPDF, targetRef } = usePDF({
    filename: 'kashmir-travel-itinerary.pdf',
    page: { 
      margin: 20,
      format: 'A4'
    },
    options: {
      enableLinks: true,
      printBackground: true
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button 
        onClick={() => toPDF()} 
        className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors z-50 screen-only"
      >
        <Download size={20} />
        Download PDF
      </button>

      <div ref={targetRef} className="max-w-[210mm] mx-auto bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none">
        {/* Rest of the component remains the same... */}
        {/* Cover Page */}
        <div className="page-break avoid-break">
          {/* Agency Header */}
          <div className="bg-white border-b px-8 py-6">
            <div className="flex items-center gap-3">
              <Plane className="text-blue-600" size={40} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{agencyInfo.name}</h2>
                <p className="text-base text-gray-600">License: {agencyInfo.license}</p>
              </div>
            </div>
          </div>

          {/* Main Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12">
            <h1 className="text-5xl font-bold mb-4">5-Day Kashmir Adventure</h1>
            <p className="text-xl opacity-90">Lead ID: {travelData.leadId}</p>
          </div>

          {/* Hero Image */}
          {travelData.images?.[0] && (
            <div className="relative h-[400px] avoid-break">
              <img 
                src={travelData.images[0].url} 
                alt={travelData.images[0].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                <h2 className="text-white text-3xl font-bold">Experience the Magic of Kashmir</h2>
              </div>
            </div>
          )}

          {/* Overview */}
          <div className="p-12 avoid-break">
            <h2 className="text-3xl font-semibold mb-6">Overview</h2>
            <p className="text-lg leading-relaxed text-gray-700">{travelData.description}</p>
          </div>

          {/* Agency Contact Info */}
          <div className="bg-gray-50 p-8 mt-8 avoid-break">
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-6 text-lg">
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <Phone className="text-blue-600" size={20} />
                    <span>{agencyInfo.phone}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="text-blue-600" size={20} />
                    <span>{agencyInfo.email}</span>
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <Globe className="text-blue-600" size={20} />
                    <span>{agencyInfo.website}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <MapPin className="text-blue-600" size={20} />
                    <span>{agencyInfo.address}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Itinerary Pages */}
        {travelData.itineraries?.map((day, dayIndex) => (
          <div key={dayIndex} className="page-break avoid-break border-t">
            {/* Day Header */}
            <div className="bg-blue-600 text-white p-8">
              <h2 className="text-3xl font-bold">{day.dayNumber}</h2>
            </div>
            
            {day.segments?.map((segment, segmentIndex) => (
              <div key={segmentIndex} className="p-8 avoid-break">
                <div className="bg-white rounded-lg shadow-lg border p-8">
                  {/* Location and Service Type */}
                  <div className="flex items-start gap-4 mb-6">
                    <MapPin className="text-blue-600 mt-1" size={24} />
                    <div>
                      <div className="text-2xl font-semibold mb-2">{segment.serviceType}</div>
                      <div className="text-lg text-gray-600 flex items-center gap-3">
                        <span>{segment.startLocation}</span>
                        <span className="text-blue-600">→</span>
                        <span>{segment.endLocation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Photo Grid */}
                  {segment.photos?.[0]?.photos && (
                    <div className="grid grid-cols-2 gap-6 mb-6 avoid-break">
                      {segment.photos[0].photos.map((photo, photoIndex) => (
                        <div key={photoIndex} className="relative rounded-lg overflow-hidden">
                          <img
                            src={photo.src.large}
                            alt={photo.alt}
                            className="w-full h-[250px] object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <p className="text-white text-base">{photo.alt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-lg leading-relaxed text-gray-700">{segment.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;