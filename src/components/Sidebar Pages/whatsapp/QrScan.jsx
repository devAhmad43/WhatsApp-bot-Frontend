import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const serverUrl = process.env.REACT_APP_Server_Url;

const QrCodeDisplay = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);  // Store the QR code URL
  const [isClientReady, setIsClientReady] = useState(false);  // To handle ready state
  const [loading, setLoading] = useState(true);  // Loading state

  // Function to parse HTML and extract the image URL
  const extractQrCodeUrlFromHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    
    const imgElement = doc.querySelector('img');  // Look for the <img> tag
    if (imgElement) {
      return imgElement.getAttribute('src');  // Return the src attribute (image URL)
    }
    return null;
  };

  // Function to fetch the QR code from the backend
  const fetchQrCode = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get(`${serverUrl}/api/whatsapp/qr`, { responseType: 'text' }); // Make API call
      const data = response.data;

      // Check for client ready message
      if (data.includes("Client is already connected!")) {
        setIsClientReady(true);
      } else {
        const qrCodeUrl = extractQrCodeUrlFromHTML(data);  // Extract the QR code image URL
        if (qrCodeUrl) {
          setQrCodeUrl(qrCodeUrl);  // Set the QR code image URL
          setIsClientReady(false);
        } else {
          setQrCodeUrl(null);  // Handle case where no QR code is found
        }
      }
    } catch (error) {
      console.error("Error fetching QR code:", error);
    } finally {
      setLoading(false);
    }
  };
  // Fetch the QR code on component mount
  useEffect(() => {
    fetchQrCode();
  }, []);  // Only run once on mount
  const [message, setMessage] = useState('');

    const handleLogout = async () => {
        try {
            // Call the logout API to disconnect WhatsApp
            const response = await axios.post(`${serverUrl}/api/whatsapp/logout`);

            if (response.status === 200) {
                // Provide feedback about successful disconnection
                setMessage("Disconnected from WhatsApp successfully.");
                toast.success(message)
            } else {
                // Handle unexpected response
                setMessage("Failed to disconnect from WhatsApp. Please try again.");
                toast.info(message)
            }
        } catch (error) {
            console.error("Error disconnecting from WhatsApp:", error);
            setMessage("An error occurred during disconnection."); // Provide feedback to user
       toast.error(message)
          }
    };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <p>Loading QR code...</p>
      ) : isClientReady ? (
        <>
        <div class="py-8 px-4 mx-auto sm:py-16 lg:px-6 bg-green-50 mt-40">
    <div class="mx-auto max-w-screen-sm text-center">
        <h2 class="mb-4 text-3xl tracking-tight font-bold leading-tight text-green-800">WhatsApp is Connected SuccessFully!</h2>
        <p class="mb-6 text-center text-green-700 md:text-lg">You Can Send Message Now.</p>       
    </div>
</div>
             </>
      ) : qrCodeUrl ? (
        <div className="text-center">
          <h1 className="text-2xl mb-4 font-semibold">Scan the QR Code to Connect to WhatsApp</h1>
          {/* Render the QR code as an image */}
          <img
            src={qrCodeUrl} // Render the extracted QR code image URL
            alt="QR Code"
            className="p-4 border border-gray-300 bg-white inline-block rounded-md shadow-md"
          />
          <button
            onClick={fetchQrCode}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Refresh QR Code
          </button>
        </div>
      ) : (
        <div class="py-8 px-4 mx-auto sm:py-16 lg:px-6 bg-red-50 mt-40">
    <div class="mx-auto max-w-screen-sm text-center">
        <h2 class="mb-4 text-3xl tracking-tight font-bold leading-tight text-rose-800">QR NOT GENERATED YET!</h2>
    </div>
        <p class="mb-6 text-center text-green-700 md:text-lg">Please wait to connect Whatsapp.</p>       
</div>      )}
    </div>
  );
};
export default QrCodeDisplay;
