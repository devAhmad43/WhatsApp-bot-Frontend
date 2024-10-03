import html2pdf from "html2pdf.js";

export const generatePDF = async (currentQuotation) => {
  console.log("pdf======>", currentQuotation);
  try {
    // Create a container div for PDF content with expanded width
    const pdfContent = document.createElement("div");
    pdfContent.id = "pdf-content";
    pdfContent.className =
      "bg-gradient-to-r from-gray-100 to-gray-50 max-w-5xl mx-auto p-8 shadow-2xl rounded-lg border border-blue-200"; // Adjusted width here
    pdfContent.innerHTML = `
        <style>
          .no-page-break { page-break-inside: avoid; }
          .no-page-break * { page-break-inside: avoid; }
          .avoid-page-break { page-break-after: avoid; }
          table { width: 100%; }
          table th, table td { text-align: left; padding: 8px; }
        </style>
        <div class="no-page-break">
          <div class="flex justify-between mb-6">
            <h1 class="text-3xl text-rose-500 font-bold">${
              currentQuotation.title
            }</h1>
            <img src="${
              currentQuotation.businessLogo
            }" alt="Business Logo" class="w-20 h-20 rounded-full shadow-md border-2 border-rose-400" />
          </div>
          <div class="flex-col justify-start text-black">
          <h2 class="text-2xl font-semibold text-black"> <span class='text-rose-500'>Quotation # </span>${
            currentQuotation.quotationNumber
          }</h2>
            <p><span class='text-rose-500'>Quotation Date:</span> ${
              new Date(currentQuotation.quotationDate)
                .toISOString()
                .split("T")[0]
            }</p>
            <p><span class='text-rose-500'>Valid Till:</span> ${
              new Date(currentQuotation.validTill).toISOString().split("T")[0]
            }</p>
          </div>
        </div>

        <div class="my-8 flex justify-between gap-8 p-4 bg-white rounded-lg shadow-sm border no-page-break">
          <div class="w-1/2">
            <h3 class="text-xl font-medium text-rose-700 mb-2">Sender Details</h3>
            <p><strong>Name:</strong> ${currentQuotation.sender.name}</p>
            <p class='whitespace-nowrap'><strong>Email:</strong> ${
              currentQuotation.sender.email
            }</p>
            <p><strong>Phone:</strong> ${currentQuotation.sender.phone}</p>
            <p><strong>City:</strong> ${currentQuotation.sender.city}</p>
            <p><strong>Postal Code:</strong> ${
              currentQuotation.sender.postalCode
            }</p>
            <p><strong>Country:</strong> ${currentQuotation.sender.country}</p>
          </div>
          <div class="w-1/2 text-left">
            <h3 class="text-xl font-medium text-rose-700 mb-2">Client Details</h3>
            <p><strong>Name:</strong> ${currentQuotation.client.name}</p>
            <p class='whitespace-nowrap'><strong>Email:</strong> ${
              currentQuotation.client.email
            }</p>
            <p><strong>City:</strong> ${currentQuotation.client.city}</p>
            <p><strong>Postal Code:</strong> ${
              currentQuotation.client.postalCode
            }</p>
            <p><strong>Country:</strong> ${currentQuotation.client.country}</p>
          </div>
        </div>

        <div class="my-8 p-4 bg-white rounded-lg shadow-sm border no-page-break">
          <h3 class="text-xl font-medium text-rose-700 mb-4">Quotation Items</h3>
          <table class="table-auto w-full bg-gray-50 border-collapse">
            <thead>
              <tr class="bg-rose-200 text-black no-page-break">
                <th class="px-2 py-2">Item</th>
                <th class="px-2 py-2">Quantity</th>
                <th class="px-2 py-2">Rate</th>
                <th class="px-2 py-2">Amount</th>
              </tr>
              
            </thead>
            <tbody>
              ${currentQuotation.items
                .map(
                  (item) => `
                    <tr class="bg-white border-b border-gray-200 no-page-break">        
                      <td class="border px-2 py-2">${item.itemName}</td>
                      <td class="border px-2 py-2">${item.quantity}</td>
                      <td class="border px-2 py-2">${item.rate}</td>
                      <td class="border px-2 py-2">${(
                        Number(item?.rate) * Number(item.quantity)
                      ).toFixed(2)}</td>
                      </tr>`
                )
                .join("")}
                <td>${currentQuotation.items.map(
                  (item) => item.description || ""
                )}</td>
            </tbody>
          </table>
        </div>
        <div class="my-8 p-4 bg-white rounded-lg shadow-sm border no-page-break flex justify-end">
          <p class="text-lg font-semibold">Total: ${currentQuotation.items
            .reduce((total, item) => {
              const rate = parseFloat(item.rate || 0);
              const quantity = parseFloat(item.quantity || 0);
              return total + rate * quantity;
            }, 0)
            .toFixed(2)}
          </p>
        </div>

        <div class="my-8 p-4 bg-white rounded-lg shadow-sm border no-page-break">
          <h3 class="text-xl font-medium text-rose-700 mb-2">Terms & Conditions</h3>
          <ul class="list-disc list-inside text-gray-600">
            ${currentQuotation.terms
              .map(
                (term, index) => `
                <li key="${index}" class="text-gray-500">
                  ${typeof term === "string" ? term : term?.text}
                </li>`
              )
              .join("")}
          </ul>
        </div>

        <div class="my-8 p-4 bg-white rounded-lg shadow-sm border no-page-break">
          <h3 class="text-xl font-medium text-rose-700 mb-2">Additional Details</h3>
          <p><strong>${currentQuotation.descriptionField.label}:</strong> ${
      currentQuotation.descriptionField.inputText
    }</p>
        </div>

        <div class="my-8 p-4 bg-white rounded-lg shadow-sm border no-page-break">
          <h3 class="text-xl font-medium text-rose-700 mb-2">Contact Information</h3>
          <p><strong>Email:</strong> ${
            currentQuotation.descriptionField.email
          }</p>
          <p><strong>Phone:</strong> ${
            currentQuotation.descriptionField.phone
          }</p>
        </div>
   <div class="my-8 p-4 bg-white rounded-lg shadow-sm border no-page-break">
          <h3 class="text-xl font-medium text-rose-700 mb-2">Notes</h3>
          <p>${currentQuotation.descriptionField.description}</p>
        </div>
        <div class="my-8 p-4 bg-white rounded-lg shadow-sm border no-page-break">
          <h3 class="text-xl font-medium text-rose-700 mb-2">Attachment</h3>
            ${
              currentQuotation.descriptionField.attachment
                ? `<p><a href="${currentQuotation.descriptionField.attachment}" target="_blank" class="text-blue-500 underline">View Attachment</a></p>`
                : ""
            }
        </div>
      `;

    // Append the PDF content to the body
    document.body.appendChild(pdfContent);

    const options = {
      margin: 0.5,
      filename: "Quotation.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 4, useCORS: true }, // Ensure CORS is enabled
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate and download the PDF
    await html2pdf().from(pdfContent).set(options).save();
    console.log("PDF generated and downloaded successfully.");
  } catch (error) {
    console.error("Error during PDF generation:", error);
    alert("Failed to generate PDF. Please try again.");
  } finally {
    // Cleanup: Remove the PDF content from the DOM
    const pdfContent = document.getElementById("pdf-content");
    if (pdfContent) {
      document.body.removeChild(pdfContent);
    }
  }
};
