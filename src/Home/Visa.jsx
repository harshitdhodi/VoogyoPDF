import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Visa = ({ visaQuoteData }) => {
  if (!visaQuoteData || !visaQuoteData.data) {
    return <div>No visa quote data available</div>;
  }

  const data = visaQuoteData.data;

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <Card className="w-full  mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Visa Quote Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Client and Lead Information */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Client Name</p>
              <p className="font-medium">{data.clientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lead ID</p>
              <p className="font-medium">{data.leadId}</p>
            </div>
          </div>

          {/* Visa Details */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Visa Type</p>
              <p className="font-medium">{data.visaType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Service Type</p>
              <p className="font-medium">{data.serviceType}</p>
            </div>
          </div>

          {/* Charges Breakdown */}
          <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Charges Breakdown</h3>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-sm text-gray-500">Visa Fee:</p>
              <p className="text-right">{formatCurrency(data.visaFee)}</p>
              
              <p className="text-sm text-gray-500">VFS Service Charge:</p>
              <p className="text-right">{formatCurrency(data.vfsServiceCharge)}</p>
              
              <p className="text-sm text-gray-500">Urgent Charge:</p>
              <p className="text-right">{formatCurrency(data.urgentCharge)}</p>
              
              <p className="text-sm text-gray-500">Service Charge:</p>
              <p className="text-right">{formatCurrency(data.serviceCharge)}</p>
              
              <p className="text-sm text-gray-500">Courier Charge:</p>
              <p className="text-right">{formatCurrency(data.courierCharge)}</p>
              
              <div className="col-span-2 border-t mt-2 pt-2">
                <div className="flex justify-between font-semibold">
                  <p>Total Amount:</p>
                  <p>{formatCurrency(data.totalAmount)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status and Dates */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            {/* <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">
                <span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                  {data.status}
                </span>
              </p>
            </div> */}
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="font-medium">{formatDate(data.createdAt)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Visa;