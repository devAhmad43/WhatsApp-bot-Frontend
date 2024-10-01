import React from "react";

export const PdfModal=({isModalOpen, handleGeneratePDF,handleCloseModal })=>{

return (
<>
    {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Quotation Submitted Successfully</h2>
            <p>Your quotation has been created. Would you like to generate a PDF?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleGeneratePDF}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Generate PDF
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
</>
)
}
