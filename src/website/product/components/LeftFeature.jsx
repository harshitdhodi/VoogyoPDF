import dashboard from "../../images/dashboard.png";

const features = [
  {
    title: "Graphical Dashboard Management",
    description:
      "Our B2C Travel CRM Graphical Dashboard provides insightful visualizations to enhance your travel business operations. Track the real-time influx of leads, monitor month-wise lead trends with engaging graphics, and analyze lead distribution based on their status.",
    image: dashboard,
    imageAlt: "User activity graph showing increasing trend",
  },
  {
    title: "Real-Time User Monitoring",
    description:
      "Monitor user logins in real-time to improve team collaboration. Keep an eye on upcoming trips for seamless planning and outstanding customer service. Stay updated on recent tasks and follow-ups to ensure no opportunity is missed.",
    image: dashboard,
    imageAlt: "Real-time user monitoring dashboard",
  },
  {
    title: "Lead Source Analysis",
    description:
      "Intuitive charts offer a clear view of lead sources, helping you refine your marketing strategies. Manage upcoming scheduled payments efficiently for better financial planning and track customer interactions seamlessly.",
    image: dashboard,
    imageAlt: "Lead source analysis chart",
  },
];

function Feature({ feature, isOdd }) {
  return (
    <div
      className={`max-w-[83rem] mx-auto px-4 my-10 py-12 grid md:grid-cols-2 gap-20 items-center ${
        isOdd ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Left Side - Image (Alternating Placement) */}
      <div className={`relative h-[50vh] ${isOdd ? "order-2" : "order-1"}`}>
        <img
          src={feature.image}
          alt={feature.imageAlt}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Right Side - Text Content */}
      <div className={`space-y-1 ${isOdd ? "order-1" : "order-2"}`}>
        <h2 className="text-4xl md:text-5xl font-semibold text-[#272a6b] leading-tight">
          {feature.title}
        </h2>
        <p className="text-gray-500 text-md text-justify">{feature.description}</p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <div>
      {features.map((feature, index) => (
        <Feature key={index} feature={feature} isOdd={index % 2 !== 0} />
      ))}
    </div>
  );
}
