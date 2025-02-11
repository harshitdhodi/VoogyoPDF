import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from 'react-router-dom';

export default function ThankYou() {
  

    const {payment_id}=useParams();

   
    const handleClose = () => {
        // window.close();
        // Fallback if window.close() is blocked
        window.location.href = '/'; // Redirect to home page if window doesn't close
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardContent className="pt-6">
                    <div className="text-center space-y-6">
                        {/* Success Icon */}
                        <div className="flex justify-center">
                            <div className="rounded-full bg-green-100 p-3 ring-8 ring-green-50">
                                <Check className="h-8 w-8 text-green-600" />
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                Payment Successful!
                            </h1>
                            <p>Transaction Id :{payment_id}</p>
                            <p className="text-gray-600">
                                Thank you for your subscription. Your account has been successfully activated.
                            </p>
                        </div>

                        {/* Order Details */}
                        {/* <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="text-sm text-gray-600">
                                <p>This window will automatically close in {countdown} seconds</p>
                            </div>
                        </div> */}

                        {/* Action Button */}
                        <div className="pt-4">
                            <Button
                                onClick={handleClose}
                                className="w-full"
                                variant="default"
                            >
                                Close Window Now
                            </Button>
                        </div>

                        {/* Additional Info */}
                        <p className="text-sm text-gray-500">
                            Having trouble? Contact our support team
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Mobile Dialog for better UX on small screens */}
            {/* <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <div className="rounded-full bg-green-100 p-3">
                                    <Check className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            Payment Successful!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            Your subscription has been activated successfully. This window will close in {countdown} seconds.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex justify-center">
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="px-8"
                        >
                            Close Now
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}
        </div>
    );
}