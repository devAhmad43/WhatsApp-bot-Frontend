import React from 'react';

const BusinessInfo = ({ showModal,addQuotation, setQuotation, handleHideModal,handelChangeInput,sender }) => {
  const handleBChange=(e)=>{
    setQuotation({...addQuotation,sender:{...addQuotation.sender,[e.target.name]:e.target.value}})
  }
  return (
    <>
      {showModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white lg:w-1/2 w-full m-2 p-6 rounded-md shadow-md">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Business Details</h2>
                <button onClick={handleHideModal} className="text-gray-700 hover:text-red-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <hr />
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                     Business Name
                    </label>
                    <input
                      type="text"                      
                      name="name"
                      value={addQuotation.sender.name}
                      onChange={handleBChange}
                      className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"                   
                      name="city"
                      value={addQuotation.sender.city}
                      onChange={handleBChange}
                      className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={addQuotation.sender.postalCode}
                      onChange={handleBChange}
                      className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="text"                      
                      name="phone"
                      value={addQuotation.sender.phone}
                      onChange={handleBChange}
                      className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"                   
                      name="email"
                      value={addQuotation.sender.email}
                      onChange={handleBChange}
                      className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <input
                      type="text"                      
                      name="country"
                      value={addQuotation.sender.country}
                      onChange={handleBChange}
                      className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <button onClick={handleHideModal} className='bg-purple-600 text-white font-serif  rounded-md px-12 py-2 mt-4 -mb-2 float-right'>Save</button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default BusinessInfo;
