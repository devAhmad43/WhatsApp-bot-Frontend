import React, { useState } from "react";
import AddTransport from "../quotation/modals/AddTransport";
const ShippingDetails = () => {
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transporterList, setTransporterList] = useState([]);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [selectedTransporter, setSelectedTransporter] = useState(null); // State for selected transporter

  const handleAddNew = () => {
    setIsModalOpen(true);
    setCurrentEditIndex(null); // Null means we're adding a new transporter
  };

  const handleEdit = (index) => {
    setIsModalOpen(true);
    setCurrentEditIndex(index); // Index of transporter being edited
  };

  const handleSave = (formData) => {
    if (currentEditIndex !== null) {
      // Update existing transporter
      const updatedList = [...transporterList];
      updatedList[currentEditIndex] = formData;
      setTransporterList(updatedList);
    } else {
      // Add new transporter
      setTransporterList([...transporterList, formData]);
    }
    setIsModalOpen(false);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = () => {
    setShowShippingDetails(!showShippingDetails);
  };
  const handleSelectTransporter = (index) => {
    setSelectedTransporter(transporterList[index]); // Update selected transporter
    setIsOpen(false); // Close dropdown after selection
  };
  return (
    <>
      <div className="mb-4">
        <input
          type="checkbox"
          id="addShippingDetails"
          className="mr-2 border-b border border-gray-400 text-sm"
          onChange={handleCheckboxChange}
          checked={showShippingDetails}
        />
        <label htmlFor="addShippingDetails" className="font-semibold text-sm">
          Add Shipping Details
        </label>
      </div>
      {/* Conditionally render the form section */}
      {showShippingDetails && (
        <div className="p-8 bg-gray-200">
          {/* details form */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="font-semibold mb-4 text-sm">Shipped From</h2>
              <div className="mb-4">
                <input
                  type="checkbox"
                  id="sameAsBusinessAddress"
                  className="mr-2 border border-gray-300 text-sm"
                />
                <label htmlFor="sameAsBusinessAddress" className="text-sm">
                  Same as your business address
                </label>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Business"
                  className="w-full p-2 border-0 border-b-2 border-gray-300 rounded text-sm"
                />
              </div>
              <div className="mb-4">
                <select className="w-full p-2 border-0 border-b-2 border-gray-300 rounded text-sm">
                  <option>Pakistan</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Address (optional)"
                  className="w-full p-2 border-0 border-b-2 border-gray-300 rounded text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="City / Town (optional)"
                    className="w-full p-2 border-0 border-b-2 border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Postal Code / Zip Code"
                    className="w-full p-2 border-0 border-b-2 border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="State (optional)"
                  className="w-full p-2 border-0 border-b-2 border-gray-300 rounded text-sm"
                />
              </div>
              <div className="text-blue-500 text-sm">
                <i className="fas fa-plus-circle mr-2"></i>
                <span>Add More Fields</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="font-semibold mb-4 text-sm">Shipped To</h2>
              <div className="mb-4">
                <select className="w-full p-2 border-0 border-b-2 border-gray-300 rounded text-sm">
                  <option value="">Select a Country</option>
                  <option>Pakistan</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="checkbox"
                  id="sameAsClientAddress"
                  className="mr-2 border border-gray-300 text-sm"
                />
                <label htmlFor="sameAsClientAddress" className="text-sm">
                  Same as client's address
                </label>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Client's business name"
                  className="w-full p-2 border-0 border-b-2 border-gray-300 rounded text-sm"
                />
              </div>
              <div className="mb-4">
                <select className="w-full p-2 border-0 border-b-2 border-gray-300 rounded text-sm">
                  <option value="">Country</option>
                  <option>Pakistan</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Address (optional)"
                  className="w-full p-2 border-0 border-b-2 border-gray-300 rounded text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="City / Town (optional)"
                    className="w-full p-2 border-0 border-b-2 border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Postal Code / Zip Code"
                    className="w-full p-2 border-0 border-b-2 border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="State (optional)"
                  className="w-full p-2 border-0 border-b-2 border-gray-300 rounded text-sm"
                />
              </div>
              <div className="mb-4">
                <input
                  type="checkbox"
                  id="saveToClientDetails"
                  className="mr-2 border border-gray-300 text-sm"
                />
                <label htmlFor="saveToClientDetails" className="text-sm">
                  Save to Client Details
                </label>
              </div>
              <div className="text-blue-500 text-sm">
                <i className="fas fa-plus-circle mr-2"></i>
                <span>Add More Fields</span>
              </div>
            </div>
          </div>
          <div className="max-w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Transport Details</h2>
            <div className="space-y-4">
              <div className="relative w-full">
                <label className="block text-gray-500 text-sm">
                  Transporter Details
                </label>
                <div
                  className="w-full mt-1 p-2 border border-gray-300 rounded text-sm cursor-pointer"
                  onClick={toggleDropdown}
                >
                 {selectedTransporter
          ? `${selectedTransporter.name} (Id: ${selectedTransporter.id})`
          : 'Select Transporter'}
                </div>
                {isOpen && (
                  <div className="absolute w-full mt-1 p-2 border border-gray-300 rounded bg-white shadow-md">
                    <ul className="space-y-2">
                      {transporterList.map((transporter, index) => (
                        <li
                          key={index}
                          className="flex justify-between cursor-pointer hover:bg-gray-100 p-2"
                          onClick={() => handleSelectTransporter(index)} // Select transporter on click         
                        >
                          <div>
                            {transporter.name} <br /> Id: {transporter.id}
                          </div>
                          <span
                            className="text-blue-500 cursor-pointer"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="py-1 items-center justify-center">
                      <button
                        className="text-purple-500 font-serif justify-center hover:underline"
                        onClick={handleAddNew}
                      >
                        + Add New
                      </button>
                    </div>
                  </div>
                )}

                {isModalOpen && (
                  <AddTransport
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    initialData={
                      currentEditIndex !== null
                        ? transporterList[currentEditIndex]
                        : { name: "", id: "" }
                    }
                    isEditing={currentEditIndex !== null}
                  />
                )}
              </div>
              <div>
                <label className="block text-gray-500 text-sm">Distance</label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-sm">
                  Mode of Transport
                </label>
                <select className="w-full mt-1 p-2 border border-gray-300 rounded text-sm">
                  <option>Select...</option>
                  <option value="air">Air</option>
                  <option value="road">Road</option>
                  <option value="rail">Rail</option>
                  <option value="ship">Ship</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="border-dashed border-b border-gray-600 text-gray-500 text-sm">
                    Challan Number
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="Transport Doc Number (optional)"
                  />
                </div>
                <div>
                  <label className="border-dashed border-b border-gray-600 text-gray-500 text-sm">
                    Challan Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full mt-1 p-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 text-sm">
                    Vehicle Type
                  </label>
                  <select className="w-full mt-1 p-2 border border-gray-300 rounded text-sm">
                    <option>Select...</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 text-sm">
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 border border-gray-300 rounded text-sm"
                    placeholder="Vehicle Number (optional)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShippingDetails;
