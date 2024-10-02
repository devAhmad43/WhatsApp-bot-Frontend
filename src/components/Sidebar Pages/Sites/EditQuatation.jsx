import React, { useEffect, useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import BusinessInfo from "./quotation/modals/BusinessInfo";
import ClientModal from "./quotation/modals/ClientModal";
import { ItemsSection } from "./quotation/ItemsSection";
import { ButtonsSection } from "./quotation/ButtonsSection";
import { Loader } from "../../Loader/loader";
import { selectQuotations, updateQuotations } from "../../../StoreRedux/quotationSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { uploadtoCloudinary } from "../../../uploadFiletoCloudinary";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const serverUrl = process.env.REACT_APP_Server_Url;

const EditQuotation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const storeAllQuotation = useSelector(selectQuotations);
    const { quotationId } = useParams(); // Get the quotation ID from the URL parameters

    const quotationError = {
        // ... (same as your existing error object)
    };

    const [error, setError] = useState(quotationError);
    const [quotation, setQuotation] = useState(null); // Initialize with null
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [clientImage, setClientImage] = useState("");
    const [attachment, setAttachment] = useState("");
    const [businessLogo, setBusinessLogo] = useState("");

     // Create refs for the file inputs
  const businessLogoInputRef = useRef(null);
  const clientImageInputRef = useRef(null); // Assuming you have a similar section for client image
  const attachmentInputRef = useRef(null); // Assuming you have a similar section for attachment

    const handleChangeInput = (e) => {
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

    // Fetch quotation by ID for editing
    useEffect(() => {
        if (quotationId) {
          const currentQuotation = storeAllQuotation.find(
            (quotation) => quotation._id === quotationId
          );
          if (currentQuotation) {
            setQuotation(currentQuotation);
            setBusinessLogo(currentQuotation?.businessLogo);
            setAttachment(currentQuotation?.descriptionField?.attachment);
            setClientImage(currentQuotation?.client?.businessImage);
          } else {
            // Fetch from server if not in store
            axios
              .get(`${serverUrl}/api/quotation/${quotationId}`)
              .then((response) => {
                setQuotation(response.data);
                setBusinessLogo(response.data?.businessLogo);
                setAttachment(response.data?.descriptionField?.attachment);
                setClientImage(response.data?.client?.businessImage);
              })
              .catch((error) => {
                console.error("Error fetching quotation:", error);
                toast.error("Failed to fetch quotation data");
              });
          }
        }
      }, [quotationId, storeAllQuotation]);
  

      const handleFormSubmit = async () => {
        setLoading(true);
        console.log(quotation?.items);
        try {
          const updatedQuotation = {
            title: quotation?.title,
            quotationNumber: quotation?.quotationNumber,
            quotationDate: quotation?.quotationDate,
            validTill: quotation?.validTill,
            businessLogo: quotation?.businessLogo,
            sender: {
              name: quotation?.sender?.name,
              email: quotation?.sender?.email,
              phone: quotation?.sender?.phone,
              city: quotation?.sender?.city,
              postalCode: quotation?.sender?.postalCode,
              country: quotation?.sender?.country,
            },
            client: {
              businessImage: quotation?.client?.businessImage,
              name: quotation?.client?.name,
              email: quotation?.client?.email,
              postalCode: quotation?.client?.postalCode,
              city: quotation?.client?.city,
              country: quotation?.client?.country,
            },
            items: quotation?.items,
            descriptionField: quotation?.descriptionField,
            terms: quotation?.terms.filter((term)=>term !==null).map((term) => term?.text),
          };
    
          // Image compression and upload if new images are provided
          if (businessLogo instanceof File) {
            const compressedBusinessLogo = await imageCompression(
              businessLogo,
              options
            );
            updatedQuotation["businessLogo"] = await uploadtoCloudinary(
              compressedBusinessLogo,
              "quotation"
            );
          }
          if (attachment instanceof File) {
            const compressedAttachment = await imageCompression(
              attachment,
              options
            );
            updatedQuotation.descriptionField[
              "attachment"
            ] = await uploadtoCloudinary(compressedAttachment, "quotation");
          }
          if (clientImage instanceof File) {
            const compressedClientImage = await imageCompression(
              clientImage,
              options
            );
            updatedQuotation.client[
              "businessImage"
            ] = await uploadtoCloudinary(compressedClientImage, "quotation");
          }
          for (let i = 0; i < updatedQuotation.items.length; i++) {
            const item = updatedQuotation.items[i];
            if (item.thumbnailImage instanceof File) {
              const compressedItemImage = await imageCompression(
                item.thumbnailImage,
                options
              );
              updatedQuotation.items[
                i
              ].thumbnailImage = await uploadtoCloudinary(
                compressedItemImage,
                "quotation"
              );
            }
          }
    
          // Update existing quotation
          const response = await axios.put(
            `${serverUrl}/api/quotation/${quotationId}/edit-quotation`,
            updatedQuotation,
            { headers: { "Content-Type": "application/json" } }
          );
          if (response?.status === 200) {
            dispatch(updateQuotations(response?.data?.existingQuotation));
            navigate("/admin/sites");
            toast.success("Quotation updated successfully");
          }
          setLoading(false);
        } catch (error) {
            console.log(error)
          setLoading(false);
          toast.error("An error occurred while updating the quotation");
        }
      };

    // Title section content and other handlers can remain the same
    const [showModal, setShowModal] = useState(false);
    const [clientModals, setClientModals] = useState(false);
    const handleEdit = () => {
    if (businessLogoInputRef.current) {
      businessLogoInputRef.current.click(); // Trigger file input click
    }
  };
   
  const handleRemove = () => {
    setBusinessLogo(null); // Remove the image by resetting the state
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const showClientModal = () => {
    setClientModals(true);
  };
  const hideClientModals = () => {
    setClientModals(false);
  };
  const handleHideModal = () => {
    setShowModal(false);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!quotation) {
    return <Loader loading={true} />;
  }


    return (

        //     <>
        //     <h2 className="text-xl mt-4 font-semibold text-center">
        //       {quotationId ? "Edit Quotation" : "Create New Quotation"}
        //     </h2>
        //     <div className="max-w-full mx-auto space-y-12 bg-white m-2 rounded-md p-2">
        //       {/* Title Section */}
        //       <div className="flex mt-4 justify-center items-center text-center">
        //           <input
        //             type="text"
        //             value={quotation.title}
        //             onChange={handleChangeInput}
        //             name="title"
        //             placeholder="Quotation title"
        //             className="py-1 px-0 max-w-xs text-3xl font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
        //           />
        //         </div>
        //       {/* Quotation Number and Date */}
        //       <div className="flex justify-between items-start">
        //         <div className="w-2/3 pr-4">
        //           {/* Quotation No */}
        //           <div className="flex items-center gap-3 mb-5">
        //             <label className="text-sm border-dashed border-b border-gray-600 font-medium text-gray-900 mr-4 mt-1 whitespace-nowrap">
        //               Quotation No <span className="text-red-500">*</span>
        //             </label>
        //             <input
        //               type="text"
        //               value={quotation.quotationNumber}
        //               onChange={handleChangeInput}
        //               name="quotationNumber"
        //               className="block py-1 px-0 w-full max-w-xs text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        //               placeholder=" "
        //             />
        //           </div>
        //           {/* Quotation Date */}
        //           <div className="flex items-center gap-3 mb-5">
        //             <label className="text-sm border-dashed border-b border-gray-600 font-medium text-gray-900 mr-4 mt-1 whitespace-nowrap">
        //               Quotation Date <span className="text-red-500">*</span>
        //             </label>
        //             <input
        //               type="date"
        //               name="quotationDate"
        //               value={
        //                 quotation?.quotationDate
        //                   ? new Date(quotation.quotationDate)
        //                       .toISOString()
        //                       .split("T")[0]
        //                   : ""
        //               }
        //               onChange={handleChangeInput}
        //               className="block py-1 px-0 w-full max-w-xs text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        //             />
        //           </div>
        //           {/* Valid Till */}
        //           <div className="flex items-center gap-3 mb-5">
        //             <label className="text-sm border-dashed border-b border-gray-600 font-medium text-gray-900 mr-4 mt-1 whitespace-nowrap">
        //               Valid Till <span className="text-red-500">*</span>
        //             </label>
        //             <input
        //               type="date"
        //               name="validTill"
        //               value={
        //                 quotation?.validTill
        //                   ? new Date(quotation.validTill)
        //                       .toISOString()
        //                       .split("T")[0]
        //                   : ""
        //               }
        //               onChange={handleChangeInput}
        //               className="block py-1 px-0 w-full max-w-xs text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        //             />
        //           </div>
        //         </div>
        //         {/* Business Logo */}
        //         <div className="w-1/3 flex items-center justify-center p-4">
        //           <label
        //             htmlFor="business-logo"
        //             className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
        //           >
        //             <div className="flex flex-col items-center justify-center">
        //               {businessLogo ? (
        //                 <div className="relative text-center object-fill w-full h-32">
        //                   <img
        //                     src={
        //                       businessLogo instanceof File
        //                         ? URL.createObjectURL(businessLogo)
        //                         : businessLogo
        //                     }
        //                     alt="Selected"
        //                     id="business-logo"
        //                     className="object-fill h-32 w-full rounded-lg"
        //                   />

        //                   <div className="absolute bottom-2 right-2 flex space-x-2">
        //                     <button
        //                       type="button"
        //                       onClick={handleEdit}
        //                       className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
        //                     >
        //                       Edit
        //                     </button>
        //                     <button
        //                       type="button"
        //                       // onClick={handelDelete("businessLogo", addQuotation.businessLogo, addQuotation._id.toString()) }
        //                       className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
        //                     >
        //                       Remove
        //                     </button>
        //                   </div>
        //                 </div>
        //               ) : (
        //                 <>
        //                   <svg
        //                     className="w-6 h-6 mb-2 text-gray-500"
        //                     aria-hidden="true"
        //                     xmlns="http://www.w3.org/2000/svg"
        //                     fill="none"
        //                     viewBox="0 0 20 16"
        //                   >
        //                     <path
        //                       stroke="currentColor"
        //                       strokeLinecap="round"
        //                       strokeLinejoin="round"
        //                       strokeWidth="2"
        //                       d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        //                     />
        //                   </svg>
        //                   <p className="mb-2 text-sm text-gray-500">
        //                     <span className="font-semibold">Add Business Logo</span>
        //                   </p>
        //                   <p className="text-xs text-gray-500">
        //                     PNG or JPEG (MAX. 800x400px)
        //                   </p>
        //                 </>
        //               )}
        //             </div>
        //             <input
        //               id="business-logo"
        //               type="file"
        //               className="hidden"
        //               accept="image/*"
        //               name="businessLogo"
        //               onChange={handleSelectImage}
        //             />
        //           </label>
        //         </div>
        //       </div>

        //       <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4 mt-4">
        //         <div className="lg:w-1/2 w-full">
        //           <div className="grid grid-cols-1 gap-6">
        //             {/* sender */}
        //             <div className="p-7 bg-gray-100 rounded-md shadow-md">
        //               <h2 className="text-lg font-semibold border-b border-dashed pb-2 mb-4">
        //                 Quotation From{" "}
        //                 <span className="text-gray-600 text-sm">Your Details</span>
        //               </h2>
        //               <div className="p-6 bg-white rounded-lg shadow-md">
        //                 {/* Business Details Section */}
        //                 <div className="flex justify-center">
        //                   <h1 className="font-semibold">Business Details</h1>               
        //                 </div>
        //                 <div className="mt-6 space-y-2">
        //                 <button
        //                 onClick={handleShowModal}
        //                 className="w-full p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        //               >
        //                 + Add Business Details
        //               </button>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //         {/* client */}
        //         <div className="lg:w-1/2 w-full">
        //           <div className="p-6 bg-gray-100 rounded-md shadow-md">
        //             <h2 className="text-lg font-semibold border-b border-dashed pb-2 mb-4">
        //               Quotation For{" "}
        //               <span className="text-gray-600 text-sm whitespace-nowrap">
        //                 Client's Details
        //               </span>
        //             </h2>
        //             <div className="p-6 bg-white rounded-lg shadow-md">
        //               <div className="text-center text-sm text-gray-600 mb-4">
        //                 Select a Client/Business from list <br /> or
        //               </div>
        //               <button
        //                 onClick={showClientModal}
        //                 className="w-full p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        //               >
        //                 + Add New Client
        //               </button>
        //             </div>
        //           </div>
        //         </div>
        //       </div>

        //       {/* Items Section - Passing Data and Handlers */}
        //       <ItemsSection
        //         addQuotation={quotation}
        //         setQuotation={setQuotation}
        //         items={quotation.items}
        //         handleInputChange={handleChangeInput}
        //       />
        //       <ButtonsSection
        //         attachment={attachment}
        //         setAttachment={setAttachment}
        //         addQuotation={quotation}
        //         setQuotation={setQuotation}
        //         descriptionField={quotation.descriptionField}
        //         handleChangeInput={handleChangeInput}
        //       />

        //       {showModal && (
        //         <BusinessInfo
        //           showModal={showModal}
        //           addQuotation={quotation}
        //           setQuotation={setQuotation}
        //           handleHideModal={handleHideModal}
        //           sender={quotation.sender}
        //           handelChangeInput={handleChangeInput}
        //         />
        //       )}

        //       {clientModals && (
        //         <ClientModal
        //           setClientImage={setClientImage}
        //           clientImage={clientImage}
        //           addQuotation={quotation}
        //           setQuotation={setQuotation}
        //           ClientModals={clientModals}
        //           HideClientModals={hideClientModals}
        //           client={quotation.client}
        //           handelChangeInput={handleChangeInput}
        //         />
        //       )}

        //       <div className="flex justify-center mt-6">
        //         <button
        //           onClick={handleFormSubmit}
        //           className="px-4 py-2 bg-blue-600 text-white rounded"
        //         >
        //           {quotationId ? "Update Quotation" : "Submit Quotation"}
        //         </button>
        //       </div>

        //     </div>
        //     <div className="hidden">


        //     </div>
        //     <Loader loading={loading} />
        //   </>
        <>
            <h2 className="text-xl mt-4 font-semibold text-center">
                {quotationId ? "Edit Quotation" : "Create New Quotation"}
            </h2>
            <div className="max-w-full mx-auto space-y-12 bg-white m-2 rounded-md p-2">
                {/* Title Section */}
                <div className="flex mt-4 justify-center items-center text-center">
                    <input
                        type="text"
                        value={quotation.title}
                        onChange={handleChangeInput}
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
                                value={quotation.quotationNumber}
                                onChange={handleChangeInput}
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
                                    quotation?.quotationDate
                                        ? new Date(quotation.quotationDate)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }
                                onChange={handleChangeInput}
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
                                    quotation?.validTill
                                        ? new Date(quotation.validTill)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }
                                onChange={handleChangeInput}
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
                                ref={businessLogoInputRef} // Attach the ref here
                            />
                        </label>
                    </div>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4 mt-4">
                    <div className="lg:w-1/2 w-full">
                        <div className="grid grid-cols-1 gap-6">
                            {/* Sender */}
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
                    {/* Client */}
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
                                    onClick={showClientModal}
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
                    addQuotation={quotation}
                    setQuotation={setQuotation}
                    items={quotation.items}
                    handleInputChange={handleChangeInput}
                />
                <ButtonsSection
                    attachment={attachment}
                    setAttachment={setAttachment}
                    addQuotation={quotation}
                    setQuotation={setQuotation}
                    descriptionField={quotation.descriptionField}
                    handleChangeInput={handleChangeInput}
                />

                {showModal && (
                    <BusinessInfo
                        showModal={showModal}
                        addQuotation={quotation}
                        setQuotation={setQuotation}
                        handleHideModal={handleHideModal}
                        sender={quotation.sender}
                        handelChangeInput={handleChangeInput}
                    />
                )}

                {clientModals && (
                    <ClientModal
                        setClientImage={setClientImage}
                        clientImage={clientImage}
                        addQuotation={quotation}
                        setQuotation={setQuotation}
                        ClientModals={clientModals}
                        HideClientModals={hideClientModals}
                        client={quotation.client}
                        handelChangeInput={handleChangeInput}
                    />
                )}

                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleFormSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        {quotationId ? "Update Quotation" : "Submit Quotation"}
                    </button>
                </div>
            </div>
            <Loader loading={loading} />
        </>
    );
};

export default EditQuotation;
