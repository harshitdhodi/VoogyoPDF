import { Card } from "@/components/ui/card"
import { Plane, MapPin } from "lucide-react"

export default function ItineraryCard() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      {/* Flight Details */}
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Plane className="w-4 h-4 text-blue-500" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-lg font-semibold">6:46 AM - Central Daylight Time</p>
                <p className="text-sm text-muted-foreground">Depart MCI To MSP</p>
              </div>
              <p className="text-lg font-semibold">$552.86 USD</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">CONFIRMATION NUMBER</p>
                <p>HSU4M7</p>
              </div>
              <div>
                <p className="text-muted-foreground">BOOKED THROUGH</p>
                <p>Delta Vacations</p>
              </div>
              <div>
                <p className="text-muted-foreground">FLIGHT NUMBER</p>
                <p>DL 1620</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Plane className="w-4 h-4 text-blue-500" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-lg font-semibold">10:10 AM - Central Daylight Time</p>
                <p className="text-sm text-muted-foreground">Arrive in Cancun: MSP to CUN</p>
              </div>
              <p className="text-lg font-semibold">$552.86 USD</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">CONFIRMATION NUMBER</p>
                <p>HSU4M7</p>
              </div>
              <div>
                <p className="text-muted-foreground">BOOKED THROUGH</p>
                <p>Delta Vacations</p>
              </div>
              <div>
                <p className="text-muted-foreground">FLIGHT NUMBER</p>
                <p>DL 519</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Airport Info */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg"
              alt="Cancun Airport"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">Cancun International Airport</h3>
            <p className="text-sm text-muted-foreground">Carretera Cancún-Chetumal Km 22, Cancun, QROO, MX, 75220</p>
            <p className="text-sm text-muted-foreground">01 55 5284 0400</p>
          </div>
        </div>
      </Card>

      {/* Welcome Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Welcome to Cancún!</h2>
        <p className="text-muted-foreground">
          Cancún is naturally divided into two distinctive districts, the famous Hotel Zone (Zona Hotelera) and the
          actual city of Cancún, known as Centro. The Hotel Zone, shaped like a narrow horseshoe and surrounded by 25
          kilometers of pure white sandy beach, is linked to the city on the mainland via the four-lane Boulevard
          Kukulcán.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <img
            src="https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg"
            alt="Cancun Street"
            className="rounded-lg w-full h-48 object-cover"
          />
          <img
            src="https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg"
            alt="Beach Resort"
            className="rounded-lg w-full h-48 object-cover"
          />
          <img
            src="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg"
            alt="Beachfront"
            className="rounded-lg w-full h-48 object-cover"
          />
          <img
            src="https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg"
            alt="Sunset View"
            className="rounded-lg w-full h-48 object-cover"
          />
          <img
            src="https://images.pexels.com/photos/2087323/pexels-photo-2087323.jpeg"
            alt="Local Cuisine"
            className="rounded-lg w-full h-48 object-cover"
          />
        </div>
      </div>

      {/* Ground Transport */}
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-pink-500" />
        </div>
        <div>
          <p className="text-lg font-semibold">3:45 PM - Central Daylight Time</p>
          <p className="text-sm text-muted-foreground">Ground Transport to Resort</p>
        </div>
      </div>
    </div>
  )
}

