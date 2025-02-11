export default function FeatureCard({ icon: Icon, title, description }) {
    return (
      <div className="flex flex-col items-center text-center p-6 bg-white  rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-400">
        <div className="w-16 h-16 mb-4 rounded-full bg-white shadow-lg flex items-center justify-center">
          <Icon className="w-8 h-8 text-sky-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    )
  }