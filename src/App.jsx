import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';

import { travelData, agencyInfo } from "./hello.js"
import { CoverPage } from './components/CoverPage';
import DownloadButton from './components/DownloadButton';
import ItineraryWithTransport from './components/dummy/ItenaryWithTransport.jsx';
import TravelInclusions from './components/TravelInclusion.jsx';
import { FamilyPricing } from './components/Familypricing.jsx';
import TermsAndConditions from './components/TermCondition.jsx';
import TotalWithGST from './components/TotalAmount.jsx';
// test

const ItinerarySeparator = () => (
  <div className="flex items-center justify-center my-8 text-gray-400">
    <div className="flex items-center space-x-4">
      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      <div className="w-16 h-px bg-gray-300"></div>
      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      <div className="w-16 h-px bg-gray-300"></div>
      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
    </div>
  </div>
);

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const contentRef = useRef(null);

  const handleDownload = async () => {
    setIsGenerating(true);
    const element = contentRef.current;
    if (!element) return;

    const opt = {
      margin: [1, 1],
      filename: "kashmir-travel-itinerary.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: {
        mode: ["css", "legacy"],
        before: ".day-section",
        after: ".cover-page",
      },
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <DownloadButton isGenerating={isGenerating} handleDownload={handleDownload} />

      <div ref={contentRef} className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none">
        {/* Cover Page */}

        <CoverPage agencyInfo={agencyInfo} travelData={travelData} />
        {/* <TransportList travelData={travelData} />
        {travelData.itineraries.map((day, index) => (
          <ItineraryDay key={index} day={day} pageNumber={index + 2} />
        ))} */}

        <ItineraryWithTransport
          itineraries={travelData.itineraries}
          transports={travelData.transports}
          hotels={travelData.hotels}
          activities={travelData.activities}
          travelDate={travelData.travelDate}
        />
        <TravelInclusions travel={travelData} />
        <FamilyPricing travelData={travelData} />
        <TotalWithGST totalWithGST={travelData.totalWithGST} />
        <TermsAndConditions travelData={travelData}/>
      </div>
    </div>
  );
}

export default App;