import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { selectQuotations } from "../../../StoreRedux/quotationSlice";
import { useSelector } from "react-redux";
import { generatePDF } from "./quotation/PDF.js";

export function SiteInfo() {
  const StoreAllQuotations = useSelector(selectQuotations);
  const { quotationId } = useParams();
  const [currentQuotation, setCurrentQuotation] = useState(null);

  useEffect(() => {
    if (quotationId && StoreAllQuotations && StoreAllQuotations.length > 0) {
      const thisQuotation = StoreAllQuotations.find(
        (quotation) => quotation._id === quotationId
      );
      setCurrentQuotation(thisQuotation);
    }
  }, [quotationId, StoreAllQuotations]);

  const handleGeneratePDF = () => {
    generatePDF(currentQuotation);
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
                <svg
                  className="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Download PDF</span>
              </button>
            </div>
            {/* Quotation Title Section */}
            <div className="mt-6">
              <h3 className="text-2xl text-purple-500 font-bold">{currentQuotation.title}</h3>
              <div className="flex flex-row md:flex-row md:space-x-4">        
                <div className="mt-2 md:mt-0">
                 
                  <p className="text-gray-500">
                    <strong>Quotation Number:</strong>{" "}
                    {currentQuotation.quotationNumber}
                  </p>
                  <p className="text-gray-500">
                    <strong>Quotation Date:</strong>{" "}
                    {
                      new Date(currentQuotation.quotationDate)
                        .toISOString()
                        .split("T")[0]
                    }
                  </p>
                  <p className="text-gray-500">
                    <strong>Valid Till:</strong>{" "}
                    {
                      new Date(currentQuotation.validTill)
                        .toISOString()
                        .split("T")[0]
                    }
                  </p>

                </div>
                <img
                  src={currentQuotation.businessLogo}
                  alt="Client Business"
                  className="rounded-full -mt-4 w-24 h-24 bg-gray-100"
                />
              </div>
            </div>

            {/* Sender and Client Section */}
            <div className="flex flex-col md:flex-row justify-between mt-6 space-y-4 md:space-y-0 md:space-x-6">
              <div className="md:w-1/2 bg-purple-100 rounded-lg p-2">
                <h3 className="text-xl font-bold text-purple-500">Quotation From</h3>
                <p className="text-gray-500">
                  <strong className="text-black">Name:</strong> {currentQuotation.sender.name}
                </p>
                <p className="text-gray-500">
                  <strong  className="text-black">Email:</strong> {currentQuotation.sender.email}
                </p>
                <p className="text-gray-500">
                  <strong  className="text-black">Phone:</strong> {currentQuotation.sender.phone}
                </p>
                <p className="text-gray-500">
                  <strong  className="text-black">City:</strong> {currentQuotation.sender.city}
                </p>
                <p className="text-gray-500">
                  <strong  className="text-black">Postal Code:</strong>{" "}
                  {currentQuotation.sender.postalCode}
                </p>
                <p className="text-gray-500">
                  <strong  className="text-black">Country:</strong> {currentQuotation.sender.country}
                </p>
              </div>
              <div className="md:w-1/2  bg-purple-100 rounded-lg p-2">
                <h3 className="text-xl font-bold text-purple-500">Quotation For</h3>
                <p className="text-gray-500">
                  <strong className="text-black">Name:</strong> {currentQuotation.client.name}
                </p>
                <p className="text-gray-500">
                  <strong className="text-black">Email:</strong> {currentQuotation.client.email}
                </p>
                <p className="text-gray-500">
                  <strong className="text-black">Industry:</strong>{" "}
                  {currentQuotation.client.industry}
                </p>
                <p className="text-gray-500">
                  <strong className="text-black">City:</strong> {currentQuotation.client.city}
                </p>
                <p className="text-gray-500">
                  <strong className="text-black">Country:</strong> {currentQuotation.client.country}
                </p>
              </div>
            </div>

            {/* Items Section */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-purple-500">Quotation Items</h3>
              <table className="min-w-full mt-4 border">
                <thead>
                  <tr className="bg-purple-600 text-[#ffff]">
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
                      <td className="border px-4 py-2">
                        {Number(item?.rate) * Number(item.quantity)}
                      </td>
                
                    </tr>
                    
                  ))}            
                </tbody>     
              </table>            
                    <div className="w-2/3 lg:w-1/2 mt-2 ml-6">
                      {currentQuotation.items.map((item, index) => (
                        <span className="text-md text-justify whitespace-pre-line tracking-tight"
                          key={index}
                          dangerouslySetInnerHTML={{
                            __html: item.description || "",
                          }}
                        ></span>
                      ))}
                    </div>
                    <div className="flex float-right gap-2 text-right font-bold border-t border-b border-0 text-2xl border-black">
                    <span className="text-2xl">Total PKR:</span>
                    <span className="text-2xl">{currentQuotation.items
                        .reduce((total, item) => {
                          const rate = parseFloat(item.rate || 0);
                          const quantity = parseFloat(item.quantity || 0);
                          return total + rate * quantity;
                        }, 0)
                        .toFixed(2)}</span>
                    </div>
            </div>

         
            {/* Terms and Attachments Section */}
            <div className="flex flex-col md:flex-row justify-between mt-6 space-y-4 md:space-y-0 md:space-x-6">
            <div className="md:w-1/2">
  <h3 className="text-xl text-purple-500">Terms and Conditions</h3>
  <ol className="list-decimal ml-6 text-gray-500">
    {currentQuotation.terms.map((term, index) => (
      <li key={index} className="p-1">
        {typeof term === "string" ? term : term?.text}
      </li>
    ))}
  </ol>
</div>
   {/* Description and Additional Info */}

            </div>
   <div className="flex flex-col md:flex-row justify-between mt-6 space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-full">
                <h3 className="text-xl text-purple-500 ">Additional Notes</h3>
                <div className="text-gray-500 p-4">
                  <div className=""
                    dangerouslySetInnerHTML={{
                      __html:
                        currentQuotation?.descriptionField?.description || "",
                    }}
                  />
                </div>
              </div>             
            </div>
              <div className="text-md mt-4 flex gap-2 md:w-1/2">
                <h2 className="text-gray-600 font-bold">
                 Label: {currentQuotation.descriptionField.label}
                </h2>
                <p className="text-gray-500 font-semibold ">
                 Details {currentQuotation.descriptionField.inputText}
                </p>
              </div>

              {/* attachment */}
              <div className="md:w-1/2">
                <h3 className="text-2xl text-purple-500">Attachments</h3>
                {currentQuotation.descriptionField.attachment && (
                  <a
      href={currentQuotation.descriptionField.attachment}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline mt-2 block"
    >
      View Attachment
    </a>
                )}
              </div>
            {/* contact info */}
            <div className="flex flex-wrap mt-6 font-mono text-center justify-center items-center gap-4 ">
  <span className="text-gray-500">For any enquiry, reach out via email at</span>
  <p>
    <a href={`tel:${currentQuotation.descriptionField.phone}`} className="text-black font-semibold underline">
      {currentQuotation.descriptionField.phone}
    </a>
  </p>
  call on
  <p>
    <a href={`mailto:${currentQuotation.descriptionField.email}`} className="text-black font-semibold underline">
      {currentQuotation.descriptionField.email}
    </a>
  </p>
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
