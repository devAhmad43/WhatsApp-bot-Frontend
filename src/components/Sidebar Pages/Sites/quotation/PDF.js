import html2pdf from "html2pdf.js";

export const generatePDF = async (currentQuotation) => {
  console.log("pdf======>", currentQuotation);
  try {
    const pdfContent = document.createElement("div");
    pdfContent.id = "pdf-content";
    pdfContent.className =
      "bg-white max-w-7xl mx-auto p-4"; // Mirroring the Quotation Details page class structure
    pdfContent.innerHTML = `
      <style>
        .no-page-break { page-break-inside: avoid; }
        .no-page-break * { page-break-inside: avoid; }
        .avoid-page-break { page-break-after: avoid; }
        table { width: 100%; border-collapse: collapse; }
        table th, table td { text-align: left; padding: 8px; border: 1px solid black; }
        .text-3xl { font-size: 1.875rem; }
        .font-bold { font-weight: bold; }
        .text-purple-500 { color: #805ad5; }
        .text-gray-500 { color: #6b7280; }
        .w-1/2 { width: 50%; }
        .flex { display: flex; }
        .mt-6 { margin-top: 1.5rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .bg-purple-100 { background-color: #faf5ff; }
        .bg-purple-600 { background-color: #6b46c1; }
        .text-white { color: white; }
        .border { border: 1px solid black; }
        .total-row { font-weight: bold; background-color: #f3f4f6; }
      </style>
      <div class="flex justify-between mt-6">
      <div>
        <h3 class="text-2xl text-purple-500 font-bold">${currentQuotation.title}</h3>       
            <p class="text-gray-500"><strong>Quotation Number:</strong> ${currentQuotation.quotationNumber}</p>
            <p class="text-gray-500"><strong>Quotation Date:</strong> ${
              new Date(currentQuotation.quotationDate).toISOString().split("T")[0]
            }</p>
            <p class="text-gray-500"><strong>Valid Till:</strong> ${
              new Date(currentQuotation.validTill).toISOString().split("T")[0]
            }</p>
      </div>
            <div>
          <img
            src="${currentQuotation.businessLogo}"
            alt="Business logo"
            class="rounded-full w-24 h-24 float-right bg-gray-100"
          />         
        </div>
      </div>
      <div class="flex flex-col md:flex-row justify-between mt-6 space-y-4 md:space-y-0 md:space-x-6">
        <div class="w-1/2 bg-purple-100 rounded-lg p-2">
          <h3 class="text-xl font-bold text-purple-500">Quotation From</h3>
          <p class="text-gray-500"><strong>Name:</strong> ${currentQuotation.sender.name}</p>
          <p class="text-gray-500"><strong>Email:</strong> ${currentQuotation.sender.email}</p>
          <p class="text-gray-500"><strong>Phone:</strong> ${currentQuotation.sender.phone}</p>
          <p class="text-gray-500"><strong>City:</strong> ${currentQuotation.sender.city}</p>
          <p class="text-gray-500"><strong>Postal Code:</strong> ${currentQuotation.sender.postalCode}</p>
          <p class="text-gray-500"><strong>Country:</strong> ${currentQuotation.sender.country}</p>
        </div>

        <div class="w-1/2 bg-purple-100 rounded-lg p-2">
          <h3 class="text-xl font-bold text-purple-500">Quotation For</h3>
          <p class="text-gray-500"><strong>Name:</strong> ${currentQuotation.client.name}</p>
          <p class="text-gray-500"><strong>Email:</strong> ${currentQuotation.client.email}</p>
          <p class="text-gray-500"><strong>Industry:</strong> ${currentQuotation.client.industry}</p>
          <p class="text-gray-500"><strong>City:</strong> ${currentQuotation.client.city}</p>
          <p class="text-gray-500"><strong>Country:</strong> ${currentQuotation.client.country}</p>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="text-xl font-bold text-purple-500">Quotation Items</h3>
        <table class="border mt-4">
          <thead>
            <tr class="bg-purple-600 text-white">
              <th class="border px-4 py-2">Item Name</th>
              <th class="border px-4 py-2">Quantity</th>
              <th class="border px-4 py-2">Rate</th>
              <th class="border px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${currentQuotation.items.map(item => `
              <tr>
                <td class="border px-4 py-2">${item.itemName}</td>
                <td class="border px-4 py-2">${item.quantity}</td>
                <td class="border px-4 py-2">${item.rate}</td>
                <td class="border px-4 py-2">${(Number(item.rate) * Number(item.quantity)).toFixed(2)}</td>
              </tr>
            `).join('')}         
            <tr class="total-row">
              <td colspan="2" class="border px-4 py-2 text-xl text-right">Total PKR:</td>
              <td colspan='2' class="border px-4 text-xl py-2">${
                currentQuotation.items
                  .reduce((acc, item) => acc + Number(item.rate) * Number(item.quantity), 0)
                  .toFixed(2)
              }</td>
            </tr>
          </tbody>
            ${currentQuotation.items.map(item => `
            <tr><td class="border px-4 py-2">${item.description || "N/A"}</td>
</tr>`).join('')}
        </table>
      </div>
      <div class="mt-6">
        <h3 class="text-xl mb-2 text-purple-500">Terms and Conditions</h3>
        <ol class="list-decimal ml-6 text-gray-500">
          ${currentQuotation.terms.map((term, index) => `
            <li key="${index}">${typeof term === "string" ? term : term?.text}</li>
          `).join('')}
        </ol>
      </div>
      <div class="mt-6">
        <h3 class="text-xl text-purple-500">Additional Notes</h3>
        <p class="text-gray-500 ">${currentQuotation.descriptionField.description}</p>
      </div>
      <div class="mt-6">
        <h3 class="text-xl text-purple-500">Attachments</h3>
        ${currentQuotation.descriptionField.attachment ? `
          <a href="${currentQuotation.descriptionField.attachment}" target="_blank" class="text-blue-500 underline">View Attachment</a>
        ` : ''}
      </div>
      <div class="mt-6 flex flex-col md:flex-row justify-between">
        <div class="w-1/2">
          <h3 class="text-xl text-purple-500">Contact Information</h3>
          <p class="text-gray-500"><strong>Email:</strong> ${currentQuotation.descriptionField.email}</p>
          <p class="text-gray-500"><strong>Phone:</strong> ${currentQuotation.descriptionField.phone}</p>
        </div>
      </div>
    `;
    document.body.appendChild(pdfContent);
    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: "Quotation.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 4, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    await html2pdf().from(pdfContent).set(options).save();
    console.log("PDF generated and downloaded successfully.");
  } catch (error) {
    console.error("Error during PDF generation:", error);
    alert("Failed to generate PDF. Please try again.");
  } finally {
    const pdfContent = document.getElementById("pdf-content");
    if (pdfContent) {
      document.body.removeChild(pdfContent);
    }
  }
};
