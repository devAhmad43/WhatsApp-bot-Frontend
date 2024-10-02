import React, { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import BusinessInfo from "../Sites/quotation/modals/BusinessInfo";
import ClientModal from "../Sites/quotation/modals/ClientModal";
import { ItemsSection } from "../Sites/quotation/ItemsSection";
import { ButtonsSection } from "../Sites/quotation/ButtonsSection";
import { Loader } from "../../Loader/loader";
import {
  selectQuotations,
  updateQuotations,
  addNewQuotation,
} from "../../../StoreRedux/quotationSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { uploadtoCloudinary } from "../../../uploadFiletoCloudinary";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const serverUrl = process.env.REACT_APP_Server_Url;
const AddSite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const storeAllQuotation = useSelector(selectQuotations);
  const { quotationId } = useParams(); // Get the quotation ID from the URL parameters
  const quotationInitial = {
    title: "",
    quotationNumber: "",
    quotationDate: "",
    validTill: "",
    businessLogo: "", // URL for business logo image
    sender: {
      name: "",
      email: "",
      phone: "",
      city: "",
      postalCode: "",
      country: "",
    },
    client: {
      businessImage: "", // URL for client business image
      name: "",
      email: "",
      postalCode: "",
      city: "",
      country: "",
    },
    items: [
      {
        itemName: "",
        quantity: 0,
        rate: 0,
        amount: 0,
        description: "",
        thumbnailImage: "", // URL for item thumbnail image
      },
    ],
    descriptionField: {
      description: "",
      email: "",
      phone: "",
      attachment: "", // URL for reference attachment
      label: "",
      inputText: "", // Additional description text
    },
    terms: [
      {
        text: "", // Text for the terms and conditions
      },
    ],
  };
  const quotationError = {
    title: "",
    quotationNumber: "", // Error message for quotation number
    quotationDate: "", // Error message for quotation date
    validTill: "", // Error message for valid till date
    businessLogo: "", // Error message for business logo URL
    sender: {
      name: "", // Error message for sender's name
      email: "", // Error message for sender's email
      phone: "", // Error message for sender's phone
      city: "", // Error message for sender's city
      postalCode: "", // Error message for sender's postal code
      country: "", // Error message for sender's country
    },
    client: {
      businessImage: "", // Error message for client business image
      name: "", // Error message for client's name
      email: "", // Error message for client's email
      postalCode: "", // Error message for client's postal code
      city: "", // Error message for client's city
      country: "", // Error message for client's country
    },
    items: [
      {
        itemName: "", // Error message for item name
        quantity: "", // Error message for item quantity
        rate: "", // Error message for item rate
        amount: "", // Error message for item amount
        description: "", // Error message for item description
        thumbnailImage: "", // Error message for item thumbnail image URL
      },
    ],
    descriptionField: {
      description: "", // Error message for description
      email: "", // Error message for description email
      phone: "", // Error message for description phone
      attachment: "", // Error message for attachment URL
      label: "", // Error message for label (Terms & Conditions)
      inputText: "", // Error message for terms and conditions text
    },
    terms: [
      {
        text: "",
      },
    ],
  };

  const [error, setError] = useState(quotationError);
  const [addQuotation, setQuotation] = useState(quotationInitial);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [clientImage, setClientImage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [businessLogo, setBusinessLogo] = useState("");
  const handelChangeInput = (e) => {
    const { name, value } = e.target;
    setQuotation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectImage = (e) => {
    setBusinessLogo(e.target.files[0]);
  };

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  // Fetch quotation by ID if editing
  useEffect(() => {
    if (quotationId) {
      const currentQuotation = storeAllQuotation.find(
        (quotation) => quotation._id === quotationId
      );
      console.log("curent iddddddd", currentQuotation._id);
      if (currentQuotation) {
        setQuotation(currentQuotation);
        console.log("current==.", currentQuotation);
        setBusinessLogo(currentQuotation?.businessLogo);
        setAttachment(currentQuotation?.descriptionField?.attachment);
        setClientImage(currentQuotation?.client?.businessImage);
        console.log(
          "attachment",
          currentQuotation?.descriptionField?.attachment
        );
        console.log("busniesslogo", currentQuotation.businessLogo);
      } else {
        setQuotation(quotationInitial);
      }
    }
  }, [quotationId, location, storeAllQuotation]);
  const handelFormSubmit = async () => {
    setLoading(true);
    try {
      const newQuotation = {
        title: addQuotation?.title,
        quotationNumber: addQuotation?.quotationNumber,
        quotationDate: addQuotation?.quotationDate,
        validTill: addQuotation?.validTill,
        businessLogo: addQuotation?.businessLogo,
        sender: {
          name: addQuotation?.sender?.name,
          email: addQuotation?.sender?.email,
          phone: addQuotation?.sender?.phone,
          city: addQuotation?.sender?.city,
          postalCode: addQuotation?.sender?.postalCode,
          country: addQuotation?.sender?.country,
        },
        client: {
          businessImage: addQuotation?.client?.businessImage,
          name: addQuotation?.client?.name,
          email: addQuotation?.client?.email,
          postalCode: addQuotation?.client?.postalCode,
          city: addQuotation?.client?.city,
          country: addQuotation?.client?.country,
        },
        items: addQuotation?.items,
        descriptionField: addQuotation?.descriptionField,
        terms: addQuotation?.terms.map((term) => term.text),
      };
      console.log("newQuotation", newQuotation);
      // Image compression and upload if new images are provided
      if (businessLogo instanceof File) {
        const compressedBusinessLogo = await imageCompression(
          businessLogo,
          options
        );
        newQuotation["businessLogo"] = await uploadtoCloudinary(
          compressedBusinessLogo,
          "quotation"
        );
      }

      if (attachment instanceof File) {
        const compressedAttachment = await imageCompression(
          attachment,
          options
        );
        newQuotation.descriptionField["attachment"] = await uploadtoCloudinary(
          compressedAttachment,
          "quotation"
        );
      }
      if (clientImage instanceof File) {
        const compressedClientImage = await imageCompression(
          clientImage,
          options
        );
        newQuotation.client["businessImage"] = await uploadtoCloudinary(
          compressedClientImage,
          "quotation"
        );
      }
      console.log("attachment upload", newQuotation);
      for (let i = 0; i < newQuotation.items.length; i++) {
        const item = newQuotation.items[i];
        if (item.thumbnailImage instanceof File) {
          const compressedItemImage = await imageCompression(
            item.thumbnailImage,
            options
          );
          newQuotation.items[i].thumbnailImage = await uploadtoCloudinary(
            compressedItemImage,
            "quotation"
          );
        }
      }
      // If quotationId exists, update, otherwise create new
      if (quotationId) {
        const response = await axios.put(
          `${serverUrl}api/quotation/${quotationId}/edit-quotation`,
          newQuotation,
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.status === 200) {
          // const data=response.data
          console.log("updated data =======>", response.data);
          dispatch(updateQuotations(response.data.quotations));
          toast.success("Quotation updated successfully");
        }
      } else {
        const response = await axios.post(
          `${serverUrl}api/quotation/create-quotation`,
          newQuotation,
          { headers: { "Content-Type": "application/json" } }
        );
        if (response?.status === 201) {
          dispatch(addNewQuotation(response.data.quotation));
          console.log("addddddddd",response.data)
          toast.success("Quotation created successfully");
          navigate(`/Admin/siteInfo/${response.data.quotation._id}`);
        }
      }
      setQuotation(quotationInitial);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while submitting the quotation");
    }
  };
  // title section content
  const [showModal, setShowModal] = useState(false);
  const [ClientModals, setClientModals] = useState(false);
  const handleEdit = () => {
    // e.preventDefault()
    document.getElementById("dropzone-file").click(); // Trigger file input click
  };
  const handleRemove = () => {
    // e.preventDefault()
    setBusinessLogo(null); // Remove the image by resetting the preview
  };
  const handleShowModal = () => {
    // e.preventDefault()
    console.log("Edit button clicked, showing modal");
    setShowModal(true);
  };
  const ShowClientModal = () => {
    // e.preventDefault()
    setClientModals(true);
  };
  const HideClientModals = () => {
    setClientModals(false);
  };
  const handleHideModal = () => {
    setShowModal(false);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <h2 className="text-xl mt-4 font-semibold text-center">
        {quotationId ? "Edit Quotation" : "Create New Quotation"}
      </h2>
      <div className="max-w-full mx-auto space-y-12 bg-white m-2 rounded-md p-2">
        {/* Title Section */}
        <div className="flex mt-4 justify-center items-center text-center">
          <input
            type="text"
            value={addQuotation.title}
            onChange={handelChangeInput}
            name="title"
            placeholder="Quotation title"
            className="py-1 px-0 max-w-xs text-3xl font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
          />
        </div>
        {/* Quotation Number and Date */}
        <div className="flex justify-between items-start">
          <div className="w-2/3 pr-4">
            {/* Quotation No */}
            <div className="flex items-center gap-3 mb-5">
              <label className="text-sm border-dashed border-b border-gray-600 font-medium text-gray-900 mr-4 mt-1 whitespace-nowrap">
                Quotation No <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={addQuotation.quotationNumber}
                onChange={handelChangeInput}
                name="quotationNumber"
                className="block py-1 px-0 w-full max-w-xs text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
            </div>
            {/* Quotation Date */}
            <div className="flex items-center gap-3 mb-5">
              <label className="text-sm border-dashed border-b border-gray-600 font-medium text-gray-900 mr-4 mt-1 whitespace-nowrap">
                Quotation Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="quotationDate"
                value={
                  addQuotation?.quotationDate
                    ? new Date(addQuotation.quotationDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={handelChangeInput}
                className="block py-1 px-0 w-full max-w-xs text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
            {/* Valid Till */}
            <div className="flex items-center gap-3 mb-5">
              <label className="text-sm border-dashed border-b border-gray-600 font-medium text-gray-900 mr-4 mt-1 whitespace-nowrap">
                Valid Till <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="validTill"
                value={
                  addQuotation?.validTill
                    ? new Date(addQuotation.validTill)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={handelChangeInput}
                className="block py-1 px-0 w-full max-w-xs text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>
          {/* Business Logo */}
          <div className="w-1/3 flex items-center justify-center p-4">
            <label
              htmlFor="business-logo"
              className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center">
                {businessLogo ? (
                  <div className="relative text-center object-fill w-full h-32">
                    <img
                      src={
                        businessLogo instanceof File
                          ? URL.createObjectURL(businessLogo)
                          : businessLogo
                      }
                      alt="Selected"
                      id="business-logo"
                      className="object-fill h-32 w-full rounded-lg"
                    />

                    <div className="absolute bottom-2 right-2 flex space-x-2">
                      <button
                        type="button"
                        onClick={handleEdit}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={handleRemove}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6 mb-2 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Add Business Logo</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG or JPEG (MAX. 800x400px)
                    </p>
                  </>
                )}
              </div>
              <input
                id="business-logo"
                type="file"
                className="hidden"
                accept="image/*"
                name="businessLogo"
                onChange={handleSelectImage}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4 mt-4">
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-1 gap-6">
              {/* sender */}
              <div className="p-7 bg-gray-100 rounded-md shadow-md">
                <h2 className="text-lg font-semibold border-b border-dashed pb-2 mb-4">
                  Quotation From{" "}
                  <span className="text-gray-600 text-sm">Your Details</span>
                </h2>
                <div className="p-6 bg-white rounded-lg shadow-md">
                  {/* Business Details Section */}
                  <div className="flex justify-center">
                    <h1 className="font-semibold">Business Details</h1>               
                  </div>
                  <div className="mt-6 space-y-2">
                  <button
                  onClick={handleShowModal}
                  className="w-full p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  + Add Business Details
                </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* client */}
          <div className="lg:w-1/2 w-full">
            <div className="p-6 bg-gray-100 rounded-md shadow-md">
              <h2 className="text-lg font-semibold border-b border-dashed pb-2 mb-4">
                Quotation For{" "}
                <span className="text-gray-600 text-sm whitespace-nowrap">
                  Client's Details
                </span>
              </h2>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="text-center text-sm text-gray-600 mb-4">
                  Select a Client/Business from list <br /> or
                </div>
                <button
                  onClick={ShowClientModal}
                  className="w-full p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  + Add New Client
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Items Section - Passing Data and Handlers */}
        <ItemsSection
          addQuotation={addQuotation}
          setQuotation={setQuotation}
          items={addQuotation.items}
          handleInputChange={handelChangeInput}
        />
        {/* Description and Buttons Section */}
        <ButtonsSection
          attachment={attachment}
          setAttachment={setAttachment}
          addQuotation={addQuotation}
          setQuotation={setQuotation}
          descriptionField={addQuotation.descriptionField}
          handleChangeInput={handelChangeInput}
        />

        {/* Sender (BusinessInfo Modal) */}
        {showModal && (
          <BusinessInfo
            showModal={showModal}
            addQuotation={addQuotation}
            setQuotation={setQuotation}
            handleHideModal={handleHideModal}
            sender={addQuotation.sender}
            handelChangeInput={handelChangeInput}
          />
        )}

        {/* Client (ClientModal Modal) */}
        {ClientModals && (
          <ClientModal
            setClientImage={setClientImage}
            clientImage={clientImage}
            addQuotation={addQuotation}
            setQuotation={setQuotation}
            ClientModals={ClientModals}
            HideClientModals={HideClientModals}
            client={addQuotation.client}
            handelChangeInput={handelChangeInput}
          />
        )}
      
        <div className="flex justify-center mt-6">
          <button
            onClick={handelFormSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {quotationId ? "Update Quotation" : "Submit Quotation"}
          </button>
        </div>
       
      </div>
      <div className="hidden">

     
      </div>
      <Loader loading={loading} />
    </>
  );
};
export default AddSite;
