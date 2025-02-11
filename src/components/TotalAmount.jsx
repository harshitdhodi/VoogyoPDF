import React from "react";

const TotalWithGST = ({ totalWithGST }) => {
    console.log(totalWithGST)
  return (
    <div className="p-6  text-end">
      <h2 className="text-xl font-semibold text-blue-600 mb-2">Total Amount (Including GST)</h2>
      <div className="text-3xl font-bold text-green-700">
        ₹{totalWithGST?.toLocaleString("en-IN")}
      </div>
      <p className="text-sm text-gray-500 mt-1">This amount includes all applicable taxes.</p>
    </div>
  );
};

export default TotalWithGST;
