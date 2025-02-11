import React from 'react';

const OurClient = () => {
  const companies = [
    { name: 'Citi', src: '/api/placeholder/120/40', alt: 'Citi logo' },
    { name: 'Sprint', src: '/api/placeholder/120/40', alt: 'Sprint logo' },
    { name: 'Gizmodo', src: '/api/placeholder/120/40', alt: 'Gizmodo logo' },
    { name: 'Mashable', src: '/api/placeholder/120/40', alt: 'Mashable logo' },
    { name: 'Toshiba', src: '/api/placeholder/120/40', alt: 'Toshiba logo' },
    { name: 'Lenovo', src: '/api/placeholder/120/40', alt: 'Lenovo logo' },
    { name: 'Verizon', src: '/api/placeholder/120/40', alt: 'Verizon logo' }
  ];

  return (
    <div className="bg-blue-600 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-3xl font-semibold text-center mb-12">
          Trusted by industry leaders
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {companies.map((company) => (
            <div key={company.name} className="w-32 h-12 flex items-center justify-center">
              <img
                src={company.src}
                alt={company.alt}
                className="max-w-full max-h-full object-contain brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurClient;