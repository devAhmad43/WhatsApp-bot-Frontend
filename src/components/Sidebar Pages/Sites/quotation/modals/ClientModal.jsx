// import React from 'react';
// const ClientModal = ({ ClientModals, handelDelete, setQuotation, addQuotation, setClientImage, clientImage, HideClientModals }) => {
//   const handleEditImage = () => {
//     document.getElementById('fileInput').click(); // Trigger the hidden file input
//   };
//   const handleChange = (e) => {
//     setQuotation({ ...addQuotation, client: { ...addQuotation.client, [e.target.name]: e.target.value } })
//   }
//   const handleSelectImage = (e) => {
//     setClientImage(e.target.files[0])
//   }
//   return (
//     <>
//       {ClientModals && (
//         <div className="fixed z-50 inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
//           <div className="flex items-center justify-center min-h-screen">
//             <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
//               <div className="flex justify-between">
//                 <h2 className="text-xl font-semibold mb-4">Add New Client</h2>
//                 <button onClick={HideClientModals} className="font-sans">X</button>
//               </div>
//               <div className="border-t border-gray-300 pt-4">
//                 <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
//                 <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 mb-4 flex flex-col items-center justify-center">
//                   {clientImage ? (
//                     <div className="relative">
//                       <img src={
//                         clientImage instanceof File
//                           ? URL.createObjectURL(clientImage)
//                           : clientImage
//                       } alt="Preview" className="w-full h-32 object-cover" />
//                       {/* <button onClick={handleRemoveImage} className="absolute top-1 left-1 bg-red-500 text-white px-2 py-1 rounded">Remove</button> */}
//                     </div>
//                   ) : (
//                     <div onClick={handleEditImage} className="text-gray-500 text-center">
//                       <i className="fas fa-plus text-2xl mb-2"></i>
//                       <p className="cursor-pointer">Upload Logo</p>
//                       <p className="text-sm">JPG or PNG, Dimensions 1080x1080px and file size up to 20MB</p>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     id="fileInput"
//                     name='businessImage'
//                     className="hidden"
//                     onChange={handleSelectImage}  // This will trigger the input handler to update the state
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   {/* Business Name Input */}
//                   <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Business Name<span className="text-red-500">*</span></label>
//                     <input
//                       name='name'
//                       value={addQuotation.client.name}  // Ensure this value is tied to the client object
//                       onChange={handleChange}  // Call the input handler to update the state
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       type="text"
//                       placeholder="Business Name (Required)"
//                     />
//                   </div>
//                   {/* email */}
//                   <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Client Email<span className="text-red-500">*</span></label>
//                     <input
//                       name='email'
//                       value={addQuotation.client.email}  // Ensure this value is tied to the client object
//                       onChange={handleChange}  // Call the input handler to update the state
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       type="email"
//                       placeholder="Email (Required)"
//                     />
//                   </div>
//                   {/* Client Industry Dropdown */}
//                   <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientIndustry">Client Industry</label>
//                     <select
//                       name="industry"
//                       value={addQuotation.client.industry}  // Tie to client object
//                       onChange={handleChange}  // Call input handler to update state
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="clientIndustry"
//                     >
//                       <option value=''>-Select an Industry-</option>
//                       <option value='it'>IT</option>
//                       <option value='agriculture'>Agriculture</option>
//                       <option value='finance'>Finance</option>
//                     </select>
//                   </div>

//                   {/* Select Country */}
//                   <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Select Country<span className="text-red-500">*</span></label>
//                     <select
//                       name="country"
//                       value={addQuotation.client.country}  // Tie to client object
//                       onChange={handleChange}  // Call input handler to update state
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="selectCountry"
//                     >
//                       <option value=''>-Select a Country-</option>
//                       <option value='pakistan'>Pakistan</option>
//                       <option value='usa'>USA</option>
//                       <option value='canada'>Canada</option>
//                     </select>
//                   </div>

//                   {/* City Input */}
//                   <div>
//                     <label className="block text-gray-700 text-sm font-bold mb-2">City/Town</label>
//                     <input
//                       name='city'
//                       value={addQuotation.client.city}  // Ensure this value is tied to the client object
//                       onChange={handleChange}  // Call the input handler to update the state
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       type="text"
//                       placeholder="City/Town Name"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ClientModal;
import React, { useRef } from 'react';

const ClientModal = ({
  ClientModals,
  setQuotation,
  addQuotation,
  setClientImage,
  clientImage,
  HideClientModals,
}) => {
  // Create a ref for the file input
  const fileInputRef = useRef(null);

  const handleEditImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the hidden file input
    }
  };

  const handleRemoveImage = () => {
    setClientImage(null);
    setQuotation((prevQuotation) => ({
      ...prevQuotation,
      client: {
        ...prevQuotation.client,
        businessImage: null,
      },
    }));
  };

  const handleChange = (e) => {
    setQuotation({
      ...addQuotation,
      client: { ...addQuotation.client, [e.target.name]: e.target.value },
    });
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    setClientImage(file);
    setQuotation((prevQuotation) => ({
      ...prevQuotation,
      client: {
        ...prevQuotation.client,
        businessImage: file,
      },
    }));
  };

  return (
    <>
      {ClientModals && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-4">Add New Client</h2>
                <button onClick={HideClientModals} className="font-sans">
                  X
                </button>
              </div>
              <div className="border-t border-gray-300 pt-4">
                <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
                <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 mb-4 flex flex-col items-center justify-center">
                  {clientImage ? (
                    <div className="relative">
                      <img
                        src={
                          clientImage instanceof File
                            ? URL.createObjectURL(clientImage)
                            : clientImage
                        }
                        alt="Preview"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 flex space-x-2">
                        <button
                          type="button"
                          onClick={handleEditImage}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div onClick={handleEditImage} className="text-gray-500 text-center cursor-pointer">
                      <i className="fas fa-plus text-2xl mb-2"></i>
                      <p>Upload Logo</p>
                      <p className="text-sm">
                        JPG or PNG, Dimensions 1080x1080px and file size up to 20MB
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    name="businessImage"
                    className="hidden"
                    onChange={handleSelectImage}
                    ref={fileInputRef} // Attach the ref here
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Business Name Input */}
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Business Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={addQuotation.client.name || ''} // Ensure this value is tied to the client object
                      onChange={handleChange} // Call the input handler to update the state
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Business Name (Required)"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Client Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      value={addQuotation.client.email || ''} // Ensure this value is tied to the client object
                      onChange={handleChange} // Call the input handler to update the state
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="email"
                      placeholder="Email (Required)"
                    />
                  </div>
                  {/* Client Industry Dropdown */}
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="industry"
                    >
                      Client Industry
                    </label>
                    
                    <select
                      name="industry"
                      value={addQuotation.client.industry || ''} // Tie to client object
                      onChange={handleChange} // Call input handler to update state
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="clientIndustry"
                    >
                      <option value="">-Select an Industry-</option>
                      <option value="it">IT</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="finance">Finance</option>
                    </select>
                  </div>
                  {/* Select Country */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Select Country<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      value={addQuotation.client.country || ''} // Tie to client object
                      onChange={handleChange} // Call input handler to update state
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="selectCountry"
                    >
                      <option value="">-Select a Country-</option>
                      <option value="pakistan">Pakistan</option>
                      <option value="usa">USA</option>
                      <option value="canada">Canada</option>
                    </select>
                  </div>
                  {/* City Input */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      City/Town
                    </label>
                    <input
                      name="city"
                      value={addQuotation.client.city || ''} // Ensure this value is tied to the client object
                      onChange={handleChange} // Call the input handler to update the state
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="City/Town Name"
                    />
                  </div>
                </div>
                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={HideClientModals}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save Client
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientModal;
