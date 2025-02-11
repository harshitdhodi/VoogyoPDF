import React from "react";

const TermsAndConditions = ({ travelData }) => {
  return (
    <div className="p-6 day-section border-gray-300">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Terms & Conditions</h2>

      {/* Render terms dynamically */}
      <div 
        className="text-gray-700 text-sm space-y-3" 
        dangerouslySetInnerHTML={{ __html: travelData?.terms }}
      />
    </div>
  );
};

export default TermsAndConditions;
