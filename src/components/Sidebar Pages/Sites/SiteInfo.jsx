import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectQuotations } from '../../../StoreRedux/quotationSlice';
import { useSelector } from 'react-redux';
import { generatePDF } from './quotation/PDF.js';
import TitleSection from './quotation/TitleSection'
export function SiteInfo() {
  const StoreAllQuotations = useSelector(selectQuotations);
  const { quotationId } = useParams();
  const [currentQuotation, setCurrentQuotation] = useState(null);
  useEffect(() => {
    if (quotationId && StoreAllQuotations && StoreAllQuotations.length > 0) {
      const thisQuotation = StoreAllQuotations.find((quotation) => quotation._id === quotationId);
      setCurrentQuotation(thisQuotation);
    }
  }, [quotationId, StoreAllQuotations]);

  const handleGeneratePDF = () => {
    generatePDF(currentQuotation);
  };

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>/g, ''); // Remove all HTML tags
  };

  return (
    <>
      <div className="bg-white">
        {currentQuotation ? (
          <div className="mx-auto max-w-7xl p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Quotation Details
              </h2>
              <button
                onClick={handleGeneratePDF}
                className="bg-rose-500 hover:bg-rose-400 text-white font-bold py-4 px-4 rounded inline-flex items-center"
              >
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Download PDF</span>
              </button>
            </div>

            {/* Quotation Title Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold">Quotation Title</h3>
              <img
                  src={currentQuotation.client.businessImage}
                  alt="Client Business"
                  className="rounded-full w-24 h-24 bg-gray-100"
                />
              <p className="mt-2 text-gray-500"><strong>Title:</strong> {currentQuotation.title}</p>
              <p className="mt-2 text-gray-500"><strong>Quotation Number:</strong> {currentQuotation.quotationNumber}</p>
              <p className="mt-2 text-gray-500"><strong>Quotation Date:</strong> {new Date(currentQuotation.quotationDate).toISOString().split('T')[0]}</p>
              <p className="mt-2 text-gray-500"><strong>Valid Till:</strong>{new Date(currentQuotation.validTill).toISOString().split('T')[0]}</p>
            </div>

            {/* Sender Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold">Sender Details</h3>
              <p className="mt-2 text-gray-500"><strong>Name:</strong> {currentQuotation.sender.name}</p>
              <p className="mt-2 text-gray-500"><strong>Email:</strong> {currentQuotation.sender.email}</p>
              <p className="mt-2 text-gray-500"><strong>Phone:</strong> {currentQuotation.sender.phone}</p>
              <p className="mt-2 text-gray-500"><strong>City:</strong> {currentQuotation.sender.city}</p>
              <p className="mt-2 text-gray-500"><strong>Postal Code:</strong> {currentQuotation.sender.postalCode}</p>
              <p className="mt-2 text-gray-500"><strong>Country:</strong> {currentQuotation.sender.country}</p>
            </div>

            {/* Client Section */}
            <div className="mt-6">
            <div className='flex justify-between'>
              <h3 className="text-2xl font-bold mt-4">Client Details</h3>
                            {/* Business Image */}
                            {currentQuotation?.client?.businessImage && (
                <img
                  src={currentQuotation.client.businessImage}
                  alt="Client Business"
                  className="rounded-full w-24 h-24 bg-gray-100"
                />
              )}
            </div>
              <p className="mt-2 text-gray-500"><strong>Name:</strong> {currentQuotation.client.name}</p>
              <p className="mt-2 text-gray-500"><strong>Email:</strong> {currentQuotation.client.email}</p>
              <p className="mt-2 text-gray-500"><strong>Postal Code:</strong> {currentQuotation.client.postalCode}</p>
              <p className="mt-2 text-gray-500"><strong>City:</strong> {currentQuotation.client.city}</p>
              <p className="mt-2 text-gray-500"><strong>Country:</strong> {currentQuotation.client.country}</p>
              
            </div>

            {/* Description Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold">Description</h3>
              <div className="mt-2 text-gray-500">
  <strong>Description:</strong>
  <div dangerouslySetInnerHTML={{ __html: currentQuotation?.descriptionField?.description || '' }} />
</div>              <p className="mt-2 text-gray-500"><strong>Email:</strong> {currentQuotation.descriptionField.email}</p>
              <p className="mt-2 text-gray-500"><strong>Phone:</strong> {currentQuotation.descriptionField.phone}</p>
              <p className="mt-2 text-gray-500"><strong>Additional Info:</strong> {currentQuotation.descriptionField.inputText}</p>
            </div>

            {/* Items Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold">Quotation Items</h3>
              <table className="min-w-full mt-4 border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Item Name</th>
                    <th className="border px-4 py-2">Quantity</th>
                    <th className="border px-4 py-2">Rate</th>
                    <th className="border px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {currentQuotation.items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="border px-4 py-2">{item.itemName}</td>
                      <td className="border px-4 py-2">{item.quantity}</td>
                      <td className="border px-4 py-2">{item.rate}</td>
                      <td className="border px-4 py-2">{Number(item?.rate) * Number(item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-2 text-pretty text-gray-500">
  <strong>Items Description:</strong>
  {currentQuotation.items.map((item, index) => (
    <div key={index} dangerouslySetInnerHTML={{ __html: item.description || '' }} />
  ))}
</div>
            </div>

            {/* Terms Section */}
            {currentQuotation?.terms?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-2xl font-bold">Terms and Conditions</h3>
                <ul className="list-disc ml-6">
                  {currentQuotation.terms.map((term, index) => (
                    <li key={index} className="text-gray-500 p-2">
                      {typeof term === 'string' ? term : term?.text} {/* Handle both string and object */}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Attachments Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold">Attachments</h3>
              {currentQuotation.descriptionField.attachment && (
                <img
                  src={currentQuotation.descriptionField.attachment}
                  alt="Attachment"
                  className="rounded-lg bg-gray-100 mt-4"
                />
              )}
            </div>
            {/* Contact Info Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <p className="mt-2 text-gray-500"><strong>Phone:</strong>{currentQuotation.descriptionField.phone}</p>
              <p className="mt-2 text-gray-500"><strong>Email:</strong>{currentQuotation.descriptionField.email}</p>
            </div>

            {/* Additional Info Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold">Additional Information</h3>
              <p className="mt-2 text-gray-500">{currentQuotation.descriptionField.inputText}</p>
            </div>

          </div>
        ) : (
          <div className="mx-auto max-w-7xl p-4">
            <p>No Quotation found</p>
          </div>
        )}
      </div>
    
    </>
  );
}
