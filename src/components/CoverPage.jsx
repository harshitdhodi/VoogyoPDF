import React, { useState, useEffect } from 'react';
import { Plane, Phone, Mail, Globe, MapPin, Calendar } from 'lucide-react';
import defaultLatterHead from "./images/latterhead.png";
import logo from "./images/agencyLogo1.png";

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
};

export const CoverPage = ({ travelData, agencyInfo }) => {
    const [latterHead, setLatterHead] = useState(null);

    useEffect(() => {
        // Simulating fetching latterhead from API or conditionally setting it
        setTimeout(() => {
            setLatterHead(defaultLatterHead); // Replace with API response if needed
        }, 500); 
    }, []);

    const startDate = formatDate(travelData.startDate);
    const endDate = formatDate(travelData.endDate);

    return (
        <>
            <div className="relative mb-10 w-full h-[200px]">
                {latterHead ? (
                    <img src={latterHead} className="w-full h-full object-cover" alt="Latterhead" />
                ) : (
                    <div className="absolute inset-0  flex justify-between items-center">
                        <img src={logo} className="h-16 md:h-20 mt-5" alt="Agency Logo" />

                        <div className=" mt-8 mr-5">
                            <div className="flex flex-col justify-center items-center text-lg">
                                <div className="space-y-2">
                                    <p className="flex items-center gap-3">
                                        <Phone className="text-blue-600" size={20} />
                                        <span>{agencyInfo.phone}</span>
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <Mail className="text-blue-600" size={20} />
                                        <span>{agencyInfo.email}</span>
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <Globe className="text-blue-600" size={20} />
                                        <span>{agencyInfo.website}</span>
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <MapPin className="text-blue-600" size={20} />
                                        <span>{agencyInfo.address}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="min-h-screen bg-white">
                {travelData.images?.[0] && (
                    <div className="relative h-96">
                        <img
                            src={travelData.images[0].url}
                            alt={travelData.images[0].alt}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                            <div className="text-white">
                                <h1 className="text-5xl font-bold mb-4">5-Day Kashmir Adventure</h1>
                                <div className="space-y-2">
                                    <p className="text-xl opacity-90">Lead ID: {travelData.leadId}</p>
                                    <p className="flex items-center gap-2 text-xl opacity-90">
                                        <Calendar size={20} />
                                        <span>{startDate} - {endDate}</span>
                                    </p>
                                </div>
                            </div>
                            <h2 className="text-white text-3xl font-bold">Experience the Magic of Kashmir</h2>
                        </div>
                    </div>
                )}

                <div className="p-12">
                    <h2 className="text-3xl font-semibold mb-6">Overview</h2>
                    <p className="text-lg leading-relaxed text-gray-700">{travelData.description}</p>
                </div>
            </div>
        </>
    );
};
