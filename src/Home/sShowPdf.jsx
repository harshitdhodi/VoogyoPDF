import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import {toast } from 'react-toastify';
const QuotePDF = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { leadId, code } = useParams();


  const fetchPolicyContent = async (serviceType) => {
    try {
      const response = await axios.get(`/api/v1/terms/${serviceType}`, {
        headers: {
          'X-Tenant-Id': dN,
          'Accept': 'text/html'
        }
      })
      
      setPolicyContents(prev => ({
        ...prev,
        [serviceType]: response.data
      }))
    } catch (error) {
      console.error(`Error fetching policy for ${serviceType}:`, error)
      setPolicyContents(prev => ({
        ...prev,
        [serviceType]: 'Default policy content'
      }))
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tenancyResponse = await axios.get(`/api/v1/tenecy-code/${code}`);
        const db = tenancyResponse.data.databaseName;
        axios.defaults.headers.common['X-Tenant-Id'] = db;

        // Fetch all necessary data in parallel
        const [tourPackageResponse, agencyResponse] = await Promise.all([
          axios.get(`/api/v1/lead-packages/${leadId}`),
          axios.get('/api/v1/agency-getOne')
        ]);

        const travelPackageResponse = fetchPolicyContent(tourPackageResponse.data.leadData.serviceType);
        console.log(tourPackageResponse);
        // Extract the necessary data
        const { tourPackages, leadData } = tourPackageResponse.data;

        // Set the fetched data in state
        setQuoteData({
          tourPackage: tourPackages[0],
          travelPackage: travelPackageResponse.data,
          agency: agencyResponse.data,
          customerData: leadData.customerData[0]
        });
      } catch (err) {
        setError('Failed to fetch quote data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [leadId, code]);


  const downloadPDF = () => {
    const element = document.getElementById('quote');
    const opt = {
      margin: 10,
      filename: `quote-${leadId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderSection = (section) => (
    <section className="mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2"><span className="bg-yellow-200">{section.title}</span></h3>
      <ul className="list-disc list-inside text-gray-600">
        {section.points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </section>
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <button
        onClick={downloadPDF}
        className="block w-48 mx-auto mt-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
      >
        Download Quote PDF
      </button>
      <div className="container mx-auto p-4">
        {quoteData && (
          <div id="quote" className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
            {/* Header section */}
            <header className="text-center mb-8 ">
              {quoteData.agency?.logo && (
                <img src={`/api/file/${quoteData.agency.logo}`} alt="Agency Logo" className="mx-auto mb-4 h-24 object-contain bg-slate-800  " />
              )}
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{quoteData.agency.agencyName}</h1>
              <p className="text-gray-600 font-semibold">GST Number: {quoteData.agency.gstNumber}</p>
            </header>

            {/* Welcome section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Dear {quoteData.customerData.name[0]} Sir,</h2>
              <p className="text-gray-600">
                Welcome to {quoteData.agency.agencyName}! We're thrilled to present you with this personalized travel package.
                Our agency specializes in creating unforgettable experiences, and we've crafted this itinerary with your preferences in mind.
                Get ready for an adventure of a lifetime!
              </p>
            </section>

            {/* Package overview section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-yellow-200 inline-block px-2">OVERVIEW OF PACKAGE</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><span className="font-semibold">Package Name:</span> {quoteData.tourPackage.packageName}</li>
                <li><span className="font-semibold">Tour Route:</span> {quoteData.tourPackage.tourRoute.map(route => route.label).join(' – ')}</li>
                <li><span className="font-semibold">Duration:</span> {quoteData.tourPackage.duration.nights} Nights/{quoteData.tourPackage.duration.days} Days</li>
                <li>
                  <span className="font-semibold">Number of Travellers:</span>
                  {' '}{quoteData.tourPackage.travellers.adults} Adults,
                  {quoteData.tourPackage.travellers.children} Children,
                  {quoteData.tourPackage.travellers.infants} Infants
                </li>
                <li><span className="font-semibold">Travel Dates:</span> {formatDate(quoteData.tourPackage.travelDates.startDate)} - {formatDate(quoteData.tourPackage.travelDates.endDate)}</li>
              </ul>
            </section>

            {/* Tour itinerary section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">TOUR ITINERARY</h2>
              <p className="text-gray-600 mb-4">
                NOTE: {quoteData.agency.agencyName} has listed the maximum number of sightseeing that can be covered in a day. However, few places
                may not be possible to visit due to Covid-19 restrictions by the Govt/ strikes/ heavy snowfall / traffic jams/ limited time
                /closed roads or monuments/ unforeseen incidents then {quoteData.agency.agencyName} is not liable to provide any kind of claim on above
                mentioned or similar scenarios.
              </p>
              {quoteData.tourPackage.itinerary.map((day, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2"><span className="bg-yellow-200">DAY {day.day}: {day.title.toUpperCase()}</span></h3>
                  <p className="text-gray-600 mb-2"><span className="font-semibold bg-yellow-200">Day Services: {day.services.map(service => service.label).join(', ')}</span></p>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Location:</span> {day.location}</p>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Description:</span> {day.description}</p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold underline">Major Attractions:</span> {day.attractivePlaces.join(', ')}
                  </p>
                  {day.note && <p className="text-gray-600 italic">Note: {day.note}</p>}
                </div>
              ))}
            </section>

            {/* Package costing section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">PACKAGE COSTING INFORMATION</h2>
              <p className="text-gray-600">
                <span className="font-semibold text-lg">Total Cost: ₹</span>
                {quoteData.tourPackage.packageCost.totalCost}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-lg">Cost per Person: ₹</span>
                {quoteData.tourPackage.packageCost.perPerson}
              </p>
            </section>

            {/* // Additional information section */}
            {/* {console.log(quoteData.travelPackage.details)} */}

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">ADDITIONAL INFORMATION</h2>
              {renderSection(quoteData.travelPackage.details.information)}
              {renderSection(quoteData.travelPackage.details.cancellationPolicy)}
              {renderSection(quoteData.travelPackage.details.amendmentPolicy)}
              {renderSection(quoteData.travelPackage.details.specialInclusions)}
              {renderSection(quoteData.travelPackage.details.costExclusions)}
              {renderSection(quoteData.travelPackage.details.advancePaymentPolicy)}
              {renderSection(quoteData.travelPackage.details.paymentProcess)}
            </section>

            {/* Contact information section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">CONTACT INFORMATION</h2>
              <p className="text-gray-600"><span className="font-semibold">Tour Expert:</span> John Doe</p>
              <p className="text-gray-600"><span className="font-semibold">Phone:</span> +1 234 567 8900</p>
              <p className="text-gray-600"><span className="font-semibold">Email:</span> john.doe@example.com</p>
            </section>

            {/* Company information section */}
            <section className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">COMPANY INFORMATION</h2>
              <p className="text-gray-600"><span className="font-semibold">Company Name:</span> {quoteData.agency.agencyName}</p>
              <p className="text-gray-600 my-3"><span className="font-semibold">Headquarters:</span> {quoteData.agency.gstDetails.pradr.adr}</p>
              <p className="text-gray-600"><span className="font-semibold">Contact Number:</span> {quoteData.agency.phoneNumber}</p>
              <div className="flex space-x-4 mt-2 justify-center">
                <a href="#" className="text-blue-600 hover:text-blue-800"><Facebook size={24} /></a>
                <a href="#" className="text-pink-600 hover:text-pink-800"><Instagram size={24} /></a>
                <a href="#" className="text-red-600 hover:text-red-800"><Youtube size={24} /></a>
              </div>
              <a href="#" className="text-blue-600 hover:underline">Google Reviews</a>
            </section>

            {/* Footer section */}
            <footer className="text-center text-gray-600">
              <p className="mb-2">I hope the above details are in order and I'm looking forward to hearing from you!</p>
              <p className="mb-2">Your early response would be highly appreciated.</p>
              <p>Have a great day!</p>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotePDF;