import Link from "next/link"
import { Plane } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Plane className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-blue-600">Voogyo</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="#features" className="text-gray-600 hover:text-blue-600">
            Features
          </Link>
          <Link href="#testimonials" className="text-gray-600 hover:text-blue-600">
            Testimonials
          </Link>
          <Link href="#free-demo" className="text-gray-600 hover:text-blue-600">
            Free Demo
          </Link>
        </nav>
        <Button>Get Started</Button>
      </div>
    </header>
  )
}

