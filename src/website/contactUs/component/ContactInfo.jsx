import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="max-w-7xl my-16 mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {/* Email Section */}
        <div className="flex flex-col border-r border-[#6366f1] items-center text-center">
          <div className="w-20 h-20 bg-[#6366f1] rounded-2xl flex items-center justify-center mb-4">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Email</h2>
          <a href="mailto:info@yourmail.com" className="text-gray-600 hover:text-[#6366f1] transition-colors">
            info@yourmail.com
          </a>
        </div>

        {/* Phone Section */}
        <div className="flex flex-col items-center border-[#6366f1] border-r text-center">
          <div className="w-20 h-20 bg-[#6366f1] rounded-2xl flex items-center justify-center mb-4">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Phone</h2>
          <a href="tel:(000)1234567899" className="text-gray-600 hover:text-[#6366f1] transition-colors">
            (000) 123 456 7899
          </a>
        </div>

        {/* Address Section */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[#6366f1] rounded-2xl flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Address</h2>
          <p className="text-gray-600">17782 Casper Crest, NY</p>
        </div>
      </div>
    </div>
  )
}

