import React from 'react'

export default function Package({quoteData}) {
    return (
        <>


            <section className="mb-8 relative z-10">
                <h2 className="text-xl font-semibold mb-2">Dear {quoteData.tourPackage.leadData.customerData.name},</h2>
                <p className="text-gray-700">
                    Welcome to {quoteData.agency.agencyName}! We're thrilled to present you with this personalized travel package.
                    Our agency specializes in creating unforgettable experiences, and we've crafted this itinerary with your preferences in mind.
                    Get ready for an adventure of a lifetime!
                </p>
            </section>

            <section className="mb-8 relative z-10">
                <h2 className="text-2xl font-bold mb-4 text-primary">OVERVIEW OF PACKAGE</h2>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <ul className="space-y-2">
                        <li><strong>Package Name:</strong> {quoteData.tourPackage.tourPackages[0].packageName}</li>
                        <li><strong>Tour Route:</strong> {quoteData.tourPackage.tourPackages[0].tourRoute.map(route => route.label).join(' – ')}</li>
                        <li><strong>Duration:</strong> {quoteData.tourPackage.tourPackages[0].duration.nights} Nights/{quoteData.tourPackage.tourPackages[0].duration.days} Days</li>
                        <li>
                            <strong>Number of Travellers:</strong>
                            {quoteData.tourPackage.tourPackages[0].travellers.adults} Adults,
                            {quoteData.tourPackage.tourPackages[0].travellers.children} Children,
                            {quoteData.tourPackage.tourPackages[0].travellers.infants} Infants
                        </li>
                        <li><strong>Travel Dates:</strong> {quoteData.tourPackage.tourPackages[0].travelDates.startDate} - {quoteData.tourPackage.tourPackages[0].travelDates.endDate}</li>
                    </ul>
                </div>
            </section>

            <section className="mb-8 relative z-10">
                <h2 className="text-2xl font-bold mb-4 text-primary">TOUR ITINERARY</h2>
                <p className="text-sm text-gray-600 mb-4">
                    NOTE: {quoteData.agency.agencyName} has listed the maximum number of sightseeing that can be covered in a day. However, few places
                    may not be possible to visit due to Covid-19 restrictions by the Govt/ strikes/ heavy snowfall / traffic jams/ limited time
                    /closed roads or monuments/ unforeseen incidents then {quoteData.agency.agencyName} is not liable to provide any kind of claim on above
                    mentioned or similar scenarios.
                </p>
                {quoteData.tourPackage.tourPackages[0].itinerary.map((day, index) => (
                    <div key={index} className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">DAY {day.day}: {day.title}</h3>
                        <p><strong>Day Services:</strong> {day.services.map(service => service.label).join(', ')}</p>
                        <p><strong>Location:</strong> {day.location}</p>
                        <p><strong>Description:</strong> {day.description}</p>
                        <p><strong>Major Attractions:</strong> {day.attractivePlaces.join(', ')}</p>
                        {day.note && <p className="text-sm text-gray-600 mt-2"><strong>Note:</strong> {day.note}</p>}
                    </div>
                ))}
            </section>

            <section className="mb-8 relative z-10">
                <h2 className="text-2xl font-bold mb-4 text-primary">PACKAGE COSTING INFORMATION</h2>
                <div className="bg-primary text-white p-4 rounded-lg">
                    <p className="text-2xl font-bold">Total Cost: ₹{quoteData.tourPackage.tourPackages[0].packageCost.totalCost}</p>
                    <p>Cost per Person: ₹{quoteData.tourPackage.tourPackages[0].packageCost.perPerson}</p>
                </div>
            </section>

        </>
    )
}
