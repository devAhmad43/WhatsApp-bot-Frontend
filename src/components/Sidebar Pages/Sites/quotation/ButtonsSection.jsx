
import { useState, useRef, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";

export function ButtonsSection({ addQuotation, setQuotation, attachment, setAttachment }) {
  const [visibleSections, setVisibleSections] = useState({
    terms: false,
    notes: false,
    attachments: false,
    additionalInfo: false,
    contactDetails: false,
  });

  const sectionsRef = {
    terms: useRef(null),
    notes: useRef(null),
    attachments: useRef(null),
    additionalInfo: useRef(null),
    contactDetails: useRef(null),
  };

  const handleToggle = (section) => {
    setVisibleSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));

    // Scroll to the section after it's made visible
    setTimeout(() => {
      sectionsRef[section]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300); // Delay to allow smooth toggling animation
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuotation((prevState) => ({
      ...prevState,
      descriptionField: {
        ...prevState.descriptionField,
        [name]: value,
      },
    }));
  };

  const handleDescription = (value) => {
    setQuotation((prevState) => ({
      ...prevState,
      descriptionField: {
        ...prevState.descriptionField,
        description: value, // Set description from ReactQuill
      },
    }));
  };

  // Use useRef for the attachment file input
  const attachmentInputRef = useRef(null);

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
    setQuotation((prevState) => ({
      ...prevState,
      descriptionField: {
        ...prevState.descriptionField,
        attachment: file,
      },
    }));
  };

  const handleEditAttachment = () => {
    if (attachmentInputRef.current) {
      attachmentInputRef.current.click(); // Trigger file input click
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    setQuotation((prevState) => ({
      ...prevState,
      descriptionField: {
        ...prevState.descriptionField,
        attachment: null,
      },
    }));
  };

  const handleAddTerm = () => {
    setQuotation((prevState) => ({
      ...prevState,
      terms: [...prevState.terms, { text: "" }],
    }));
  };

  const handleRemoveTerm = (index) => {
    setQuotation((prevState) => ({
      ...prevState,
      terms: prevState.terms.filter((_, i) => i !== index),
    }));
  };

  const handleTermChange = (index, value) => {
    setQuotation((prevState) => ({
      ...prevState,
      terms: prevState.terms.map((term, i) =>
        i === index ? { ...term, text: value } : term
      ),
    }));
  };

  // Fade the button once the section is open
  const getButtonClass = (section) => {
    return visibleSections[section]
      ? "opacity-50 cursor-not-allowed"
      : "opacity-100 cursor-pointer";
  };

  return (
    <div className="p-2">
      <div className="flex flex-wrap gap-2 p-4">
        <button
          className={`flex items-center border-2 border-dashed border-gray-300 p-4 rounded-md w-64 transition-opacity ${getButtonClass('terms')}`}
          onClick={() => handleToggle('terms')}
          disabled={visibleSections.terms}
        >
          <i className="fas fa-plus text-purple-600 mr-2"></i>
          <span className="text-purple-600">Add Terms & Conditions</span>
        </button>
        <button
          className={`flex items-center border-2 border-dashed border-gray-300 p-4 rounded-md w-64 transition-opacity ${getButtonClass('notes')}`}
          onClick={() => handleToggle('notes')}
          disabled={visibleSections.notes}
        >
          <i className="fas fa-sticky-note text-purple-600 mr-2"></i>
          <span className="text-purple-600">Add Notes</span>
        </button>
        <button
          className={`flex items-center border-2 border-dashed border-gray-300 p-4 rounded-md w-64 transition-opacity ${getButtonClass('attachments')}`}
          onClick={() => handleToggle('attachments')}
          disabled={visibleSections.attachments}
        >
          <i className="fas fa-paperclip text-purple-600 mr-2"></i>
          <span className="text-purple-600">Add Attachments</span>
        </button>
        <button
          className={`flex items-center border-2 border-dashed border-gray-300 p-4 rounded-md w-64 transition-opacity ${getButtonClass('additionalInfo')}`}
          onClick={() => handleToggle('additionalInfo')}
          disabled={visibleSections.additionalInfo}
        >
          <i className="fas fa-info-circle text-purple-600 mr-2"></i>
          <span className="text-purple-600">Add Additional Info</span>
        </button>
        <button
          className={`flex items-center border-2 border-dashed border-gray-300 p-4 rounded-md w-64 transition-opacity ${getButtonClass('contactDetails')}`}
          onClick={() => handleToggle('contactDetails')}
          disabled={visibleSections.contactDetails}
        >
          <i className="fas fa-phone text-purple-600 mr-2"></i>
          <span className="text-purple-600">Add Contact Details</span>
        </button>
      </div>

      {/* Attachments Section */}
      {visibleSections.attachments && (
        <div ref={sectionsRef.attachments} className="mt-4 p-4 border rounded-md bg-gray-50 relative">
          <button
            onClick={() => handleToggle('attachments')}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <i className="fas fa-times"></i>
          </button>
          <h3 className="text-lg font-bold mb-2">Attachments</h3>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 mb-2">
              *Attachments will be accessible as clickable links within the "quotation"
            </p>
            <p className="text-sm text-gray-500 mb-4">Maximum file size allowed is 10 MB.</p>
            <div className="flex">
              {addQuotation.descriptionField?.attachment ? (
                <div className="relative">
                  <img
                    src={
                      addQuotation.descriptionField.attachment instanceof File
                        ? URL.createObjectURL(addQuotation.descriptionField.attachment)
                        : addQuotation.descriptionField.attachment
                    }
                    alt="Uploaded"
                    className="w-24 h-24 object-cover border border-gray-300 rounded-md"
                  />
                  <div className="absolute bottom-2 right-2 flex space-x-2">
                    <button
                      type="button"
                      onClick={handleEditAttachment}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveAttachment}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    name="attachment"
                    className="hidden"
                    onChange={handleSelectImage}
                    ref={attachmentInputRef}
                  />
                </div>
              ) : (
                <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    name="attachment"
                    className="hidden"
                    onChange={handleSelectImage}
                    ref={attachmentInputRef}
                  />
                  <i className="fas fa-plus text-gray-400"></i>
                </label>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Section */}
      {visibleSections.terms && (
        <div ref={sectionsRef.terms} className="mt-4 p-4 border rounded-md bg-gray-50 relative">
          <button
            onClick={() => handleToggle('terms')}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <i className="fas fa-times"></i>
          </button>
          <h3 className="text-lg font-bold mb-2">Terms and Conditions</h3>
          {addQuotation.terms.map((term, index) => (
            <div key={index} className="mb-2 flex items-center space-x-2">
              <input
                type="text"
                name='terms'
                value={typeof term === "string" ? term : term?.text}
                onChange={(e) => handleTermChange(index, e.target.value)}
                className="flex-1 p-2 border-b border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer max-w-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveTerm(index)}
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTerm}
            className="text-purple-600 hover:text-purple-800 mt-2"
          >
            <i className="fas fa-plus"></i> Add another term
          </button>
        </div>
      )}

      {/* Notes Section */}
      {visibleSections.notes && (
  <div ref={sectionsRef.notes} className="mt-4 p-4 border rounded-md bg-gray-50 relative max-w-full sm:max-w-lg ">
    <button
      onClick={() => handleToggle('notes')}
      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
    >
      <i className="fas fa-times"></i>
    </button>
    <h3 className="text-lg font-bold mb-2">Notes</h3>
    <ReactQuill
      className="mb-10 rounded-lg w-full" // Change to w-full for full width
      value={addQuotation?.descriptionField?.description}
      onChange={handleDescription}
      theme="snow"
      name="description"
      placeholder="Description"
      style={{ height: "150px" }}
    />
  </div>
)}


      {/* Additional Info Section */}
      {visibleSections.additionalInfo && (
        <div ref={sectionsRef.additionalInfo} className="mt-4 p-4 border rounded-md bg-gray-50 relative">
          <button
            onClick={() => handleToggle('additionalInfo')}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <i className="fas fa-times"></i>
          </button>
          <h3 className="text-lg font-bold mb-2">Additional Info</h3>
<div className='flex gap-6'>
<input
            type="text"
            name="label"
            onChange={handleChange}
            value={addQuotation.descriptionField?.label}
            placeholder="label"
            className="p-2 border-b border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer rounded "
          />
          <input
            type="text"
            name="inputText"
            onChange={handleChange}
            value={addQuotation.descriptionField?.inputText}
            placeholder="text"
            className="block p-2 border-b border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer rounded w-full"
          />
</div>     
   </div>
      )}

      {/* Contact Details Section */}
      {visibleSections.contactDetails && (
        <div ref={sectionsRef.contactDetails} className="mt-4 p-4 border rounded-md bg-gray-50 relative">
          <button
            onClick={() => handleToggle('contactDetails')}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <i className="fas fa-times"></i>
          </button>
          <h3 className="text-lg font-bold mb-2">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <input
              type="text"
              name="phone"
              onChange={handleChange}
              value={addQuotation.descriptionField?.phone || ''}
              placeholder="Phone"
              className="p-2 border-b border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer rounded w-full"
            />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={addQuotation.descriptionField?.email || ''}
              placeholder="Email"
              className="p-2 border-b border-0 border-gray-300  appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer rounded w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
