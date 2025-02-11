import { Download } from 'lucide-react'
import React from 'react'

const DownloadButton = ({isGenerating,handleDownload}) => {
  return (
    <div>
         <button 
              onClick={handleDownload} 
              disabled={isGenerating}
              className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors z-50 screen-only disabled:bg-blue-400"
            >
              {isGenerating ? (
                <>Generating...</>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download PDF
                </>
              )}
            </button>
    </div>
  )
}

export default DownloadButton
