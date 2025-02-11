// filepath: /workspaces/TravelingTOHO/website/src/Home/HomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeContent from './home/HomeContent';
import VoogyoLandingPage from './home/HomeContent';

export default function HomePage() {
  const [agencyName, setAgencyName] = useState('');
  const [info, setInfo] = useState('');
  const [isSubdomain, setIsSubdomain] = useState(false);

  useEffect(() => {
    const fetchAgencyData = async () => {
      try {
        const response = await axios.get('/api/v1/agency');
        setAgencyName(response.data.data.agencyName);
        setInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching agency data:', error);
      }
    };

    fetchAgencyData();
  }, []);

  return (
    <div>
      {/* <h1>Welcome to {agencyName}</h1> */}
      <VoogyoLandingPage info={info} />
    </div>
  );
}