import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { selectQuotations } from '../../../StoreRedux/quotationSlice'
import { useSelector } from 'react-redux'
import {generatePDF} from "./quotation/PDF.js"
export function SiteInfo() {
  const StoreAllQuotations = useSelector(selectQuotations)
  const { quotationId } = useParams()
  const [currentQuotation, setCurrentQuotation] = useState(null)
  useEffect(() => {
    if (quotationId && StoreAllQuotations && StoreAllQuotations.length > 0) {
      const thisQuotation = StoreAllQuotations.find((quotation) => quotation._id === quotationId)
      setCurrentQuotation(thisQuotation)
    }
  }, [quotationId, StoreAllQuotations])
  const handleGeneratePDF = () => {
    generatePDF(currentQuotation);
  };
  return (
<>
  <div className="bg-white">
    {currentQuotation ? (
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 sm:px-6 p-4 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Quotation Details
            </h2>
            <button onClick={handleGeneratePDF} class="bg-rose-500  hover:bg-rose-400 text-white hover:text-black font-bold py-4 px-4 rounded inline-flex items-center">
  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
  <span>Download PDF</span>
</button>
          </div>

          {/* Quotation Title and Number */}
          <p className="mt-4 text-gray-500">
            <strong>Title: </strong>
            {currentQuotation.title}
          </p>
          <p className="mt-4 text-gray-500">
            <strong>Quotation Number: </strong>
            {currentQuotation.quotationNumber}
          </p>
          <p className="mt-4 text-gray-500">
            <strong>Quotation Date: </strong>
            {currentQuotation.quotationDate}
          </p>
          <p className="mt-4 text-gray-500">
            <strong>Valid Till: </strong>
            {currentQuotation.validTill}
          </p>
          {/* Sender Details */}
          <h3 className="text-2xl font-bold mt-6">Sender Details</h3>
          <p className="mt-2 text-gray-500">
            <strong>Name: </strong>
            {currentQuotation.sender.name}
          </p>
          <p className="mt-2 text-gray-500">
            <strong>Email: </strong>
            {currentQuotation.sender.email}
          </p>
          <p className="mt-2 text-gray-500">
            <strong>Phone: </strong>
            {currentQuotation.sender.phone}
          </p>
          <p className="mt-2 text-gray-500">
            <strong>City: </strong>
            {currentQuotation.sender.city}
          </p>
          <p className="mt-2 text-gray-500">
            <strong>Postal Code: </strong>
            {currentQuotation.sender.postalCode}
          </p>
          <p className="mt-2 text-gray-500">
            <strong>Country: </strong>
            {currentQuotation.sender.country}
          </p>
          {/* Client Details */}
          <h3 className="text-2xl font-bold mt-6">Client Details</h3>
          <p className="mt-2 text-gray-500">
            <strong>Name: </strong>
            {currentQuotation.client.name}
          </p>
          <p className="mt-2 text-gray-500">
            <strong>Email: </strong>
            {currentQuotation.client.email}
          </p>
          <p className="mt-2 text-gray-500">
            <strong>Postal Code: </strong>
            {currentQuotation.client.postalCode}
          </p>
          <p className="mt-2 text-gray-500">
            <strong>City: </strong>
            {currentQuotation.client.city}
          </p>
          <p className="mt-2 text-gray-500">
            <strong>Country: </strong>
            {currentQuotation.client.country}
          </p>

          {/* Description Field */}
          <h3 className="text-2xl font-bold mt-6">Description</h3>
          <p className="mt-2 text-gray-500">
            <strong>Description: </strong>
            {currentQuotation.descriptionField.description}
          </p>
          <p className="mt-2 text-gray-500">
            <strong>Email: </strong>
            {currentQuotation.descriptionField.email}
          </p>
          <p className="mt-2 text-gray-500">
            <strong>Phone: </strong>
            {currentQuotation.descriptionField.phone}
          </p>
          <p className="mt-2 text-gray-500">
            <strong>Additional Info: </strong>
            {currentQuotation.descriptionField.inputText}
          </p>
   {/* Quotation Items */}
   {currentQuotation.items.map((item, index) => (
            <div key={index} className="border-t border-gray-200 py-2">
              <h4 className="font-medium text-gray-900">{item.itemName}</h4>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-500">Rate: {item.rate}</p>
              <p className="text-sm text-gray-500">Amount: {item.amount}</p>
              <p className="text-sm text-gray-500">Description: {item.description}</p>
              {item.thumbnailImage && (
                <img
                  src={item.thumbnailImage}
                  alt="Item Thumbnail"
                  className="rounded-lg bg-gray-100 mt-2"
                />
              )}
            </div>
          ))}
          {/* Terms */}
          {currentQuotation?.terms?.length > 0 && (
  <div>
    <h3 className="text-2xl font-bold mt-6">Terms and Conditions</h3>
    <ul className="list-disc ml-6">
      {currentQuotation.terms.map((term, index) => (
        <li key={index} className="text-gray-500 p-2">
          {typeof term === 'string' ? term : term?.text} {/* Handle both string and object */}
        </li>
      ))}
    </ul>
  </div>
)}

        </div>

        <div className="grid grid-row-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Business Logo */}
          {currentQuotation.businessLogo && (
            <img
              src={currentQuotation.businessLogo}
              alt="Business Logo"
              className="rounded-lg bg-gray-100"
            />
          )}

          {/* Client Business Image */}
          {currentQuotation?.client?.businessImage && ( 
            <img
              src={currentQuotation.client.businessImage}
              alt="Client Business"
              className="rounded-lg bg-gray-100"
            />
         
          )}

       

          {/* Description Field Attachment */}
          {currentQuotation.descriptionField.attachment && (
            <img
              src={currentQuotation.descriptionField.attachment}
              alt="Attachment"
              className="rounded-lg bg-gray-100 mt-4"
            />
          )}
        </div>
           </div>
    ) : (
      <div>
        <p>No Quotation found</p>
      </div>
    )}
  </div>
</>

  )
}

