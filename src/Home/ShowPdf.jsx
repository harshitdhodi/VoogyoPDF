'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import html2pdf from 'html2pdf.js'
import { useGetLetterheadQuery } from '@/services/letter.api';
import Package from './Package'
import Visa from './Visa'

export default function ShowPdf() {
  const [quoteData, setQuoteData] = useState(null)
  const [policyContents, setPolicyContents] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { leadId, code } = useParams()
  const [letterhead, setLetterhead] = useState(null)
  const [visaQuoteData, setVisaQuoteData] = useState(null)
  const [agency, setAgency] = useState({})

  useEffect(() => {
    fetchData()
  }, [leadId, code])

  const fetchData = async () => {
    try {
      setLoading(true)
      const tenancyResponse = await axios.get(`/api/v1/tenecy-code/${code}`)
      const db = tenancyResponse.data.databaseName
      axios.defaults.headers.common['X-Tenant-Id'] = db

      const letterheadRes = await axios.get('/api/v1/letterhead')
      setLetterhead(letterheadRes.data)

      const agencyResponse = await axios.get('/api/v1/agency-getOne')
      setAgency(agencyResponse.data)

      let tourPackageResponse, termsData

      if (leadId.length > 11) {
        const visaQuoteDetails = await axios.get(`/api/v1/visaquote/${leadId}`)
        setVisaQuoteData(visaQuoteDetails.data)

        const termsResponse = await axios.get(`/api/v1/terms/${visaQuoteDetails.data.data.serviceType}`, {
          headers: { 'Accept': 'text/html' }
        })
        termsData = termsResponse.data
      } else {
        tourPackageResponse = await axios.get(`/api/v1/lead-packages/${leadId}`)
        const termsResponse = await axios.get(`/api/v1/terms/${tourPackageResponse.data.leadData.serviceType}`, {
          headers: { 'Accept': 'text/html' }
        })
        termsData = termsResponse.data
      }

      setPolicyContents(termsData)
      setQuoteData({
        tourPackage: tourPackageResponse?.data || null,
        agency: agencyResponse.data
      })
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('An error occurred while fetching data. Please try again.')
      setLoading(false)
    }
  }

  const downloadPDF = () => {
    const element = document.getElementById('quote')
    const opt = {
      filename: `quote-${leadId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    html2pdf().set(opt).from(element).save()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div id="quote" className="p-8">
          <div className="relative overflow-hidden">
            {letterhead?.headerImage && (
              <img
                src={`/api/file/${letterhead.headerImage.imgName}`}
                alt={letterhead.headerImage.altText}
                className="w-full h-auto mb-8"
                style={{
                  maxWidth: `${letterhead.headerImage.dimensions.width}px`,
                  maxHeight: `${letterhead.headerImage.dimensions.height}px`
                }}
              />
            )}
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="pattern" patternUnits="userSpaceOnUse" width="100" height="100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>

            <header className="relative z-10 flex items-center justify-between mb-8">
              {agency?.logo && (
                <img src={`/api/file/${agency.logo}`} alt="Agency Logo" className="w-32 h-auto" />
              )}
              <div className="text-right">
                <h1 className="text-2xl font-bold text-primary">{agency.agencyName}</h1>
                <p className="text-sm text-gray-600">GST Number: {agency.gstNumber}</p>
              </div>
            </header>
          
            {quoteData.tourPackage != null && <Package quoteData={quoteData} />}
            {visaQuoteData && <Visa visaQuoteData={visaQuoteData} />}


            {policyContents && (
              <section className="relative z-10 mt-4">
                <h2 className="text-2xl font-bold mb-4 text-primary">Policy Information</h2>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: policyContents }} />
              </section>
            )}
            {letterhead?.footerImage && (
              <img
                src={`/api/file/${letterhead.footerImage.imgName}`}
                alt={letterhead.footerImage.altText}
                className="w-full h-auto mt-8"
                style={{
                  maxWidth: `${letterhead.footerImage.dimensions.width}px`,
                  maxHeight: `${letterhead.footerImage.dimensions.height}px`
                }}
              />
            )}
          </div>
        
        </div>
        <div className="p-8">
            <h1 className="text-3xl font-bold text-primary mb-4">Tour Package Details</h1>
            <button
              onClick={downloadPDF}
              className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
            >
              Download Quote PDF
            </button>
          </div>
      </div>
    </div>
  )
}
