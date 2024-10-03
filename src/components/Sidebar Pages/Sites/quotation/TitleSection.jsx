// import React from 'react'

// const TitleSection = ({currentQuotation}) => {
//   return (
//     <>
//      <div class="text-center no-page-break">
// <div class="flex justify-between items-center mb-6">
//   <h1 class="text-3xl text-rose-500 font-bold">${currentQuotation?.title}</h1>
//   <img src={currentQuotation?.businessLogo} alt="Business Logo" class="w-20 h-20 rounded-full shadow-md border-2 border-rose-400" />
// </div>
// <h2 class="text-2xl font-semibold text-black mb-5">Quotation #${currentQuotation?.quotationNumber}</h2>
// <div class=" text-black">
//   <p>Quotation Date: ${currentQuotation?.quotationDate}</p>
//   <p>Valid Till: ${currentQuotation?.validTill}</p>
// </div>
// </div>

// <div class="my-8 flex justify-between gap-8 p-4 bg-white rounded-lg shadow-sm border no-page-break">
// <div class="w-1/2">
//   <h3 class="text-xl font-medium text-rose-700 mb-2">Sender Details</h3>
//   <p><strong>Name:</strong> ${currentQuotation?.sender?.name}</p>
//   <p class='whitespace-nowrap'><strong>Email:</strong> ${currentQuotation?.sender?.email}</p>
//   <p><strong>Phone:</strong> ${currentQuotation.sender.phone}</p>
//   <p><strong>City:</strong> ${currentQuotation.sender.city}</p>
//   <p><strong>Postal Code:</strong> ${currentQuotation.sender.postalCode}</p>
//   <p><strong>Country:</strong> ${currentQuotation.sender.country}</p>
// </div>
// <div class="w-1/2 text-right">
//   <h3 class="text-xl font-medium text-rose-700 mb-2">Client Details</h3>
//   <p><strong>Name:</strong> ${currentQuotation.client.name}</p>
//   <p class='whitespace-nowrap'><strong>Email:</strong> ${currentQuotation.client.email}</p>
//   <p><strong>City:</strong> ${currentQuotation.client.city}</p>
//   <p><strong>Postal Code:</strong> ${currentQuotation.client.postalCode}</p>
//   <p><strong>Country:</strong> ${currentQuotation.client.country}</p>
// </div>
// </div>

// <div class="my-8 p-4 bg-white rounded-lg shadow-sm border no-page-break">
// <h3 class="text-xl font-medium text-rose-700 mb-4">Quotation Items</h3>
// <table class="table-auto w-full bg-gray-50 border-collapse">
//   <thead>
//     <tr class="bg-rose-200 text-black no-page-break">
//       <th class="px-2 py-2">Item</th>
//       <th class="px-2 py-2">Quantity</th>
//       <th class="px-2 py-2">Rate</th>
//       <th class="px-2 py-2">Amount</th>
//     </tr>
    
//   </thead>
//   <tbody>
//     ${currentQuotation.items
//       .map(
//         (item) => `
//           <tr class="bg-white border-b border-gray-200 no-page-break">        
//             <td class="border px-2 py-2">${item.itemName}</td>
//             <td class="border px-2 py-2">${item.quantity}</td>
//             <td class="border px-2 py-2">${item.rate}</td>
//             <td class="border px-2 py-2">${(Number(item?.rate) * Number(item.quantity)).toFixed(2)}</td>
//             </tr>`
//       )
//       .join('')}
//       <td>${currentQuotation.items.map(item =>(item.description || ''))}</td>
//   </tbody>
// </table>
// </div>
// <div class="my-8 p-4 bg-white rounded-lg shadow-sm border no-page-break flex justify-end">
// <p class="text-lg font-semibold">Total: ${currentQuotation.items
//   .reduce((total, item) => {
//     const rate = parseFloat(item.rate || 0);
//     const quantity = parseFloat(item.quantity || 0);
//     return total + rate * quantity;
//   }, 0)
//   .toFixed(2)}
// </p>
// </div>

// <div class="my-8 p-4 bg-white rounded-lg shadow-sm border no-page-break">
// <h3 class="text-xl font-medium text-rose-700 mb-2">Terms & Conditions</h3>
// <ul class="list-disc list-inside text-gray-600">
//   ${currentQuotation.terms
//     .map((term, index) => `
//       <li key="${index}" class="text-gray-500">
//         ${typeof term === 'string' ? term : term?.text}
//       </li>`)
//     .join('')}
// </ul>
// </div>

// <div class="my-8 p-4 bg-white rounded-lg shadow-sm border no-page-break">
// <h3 class="text-xl font-medium text-rose-700 mb-2">Additional Details</h3>
// <p><strong>${currentQuotation.descriptionField.label}:</strong> ${currentQuotation.descriptionField.inputText}</p>
// </div>

// <div class="my-8 p-4 bg-white rounded-lg shadow-sm border no-page-break">
// <h3 class="text-xl font-medium text-rose-700 mb-2">Contact Information</h3>
// <p><strong>Email:</strong> ${currentQuotation.descriptionField.email}</p>
// <p><strong>Phone:</strong> ${currentQuotation.descriptionField.phone}</p>
// </div>
// <div class="my-8 p-4 bg-white rounded-lg shadow-sm border no-page-break">
// <h3 class="text-xl font-medium text-rose-700 mb-2">Notes</h3>
// <p>${currentQuotation.descriptionField.description}</p>
// </div>
// <div class="my-8 p-4 bg-white rounded-lg shadow-sm border no-page-break">
// <h3 class="text-xl font-medium text-rose-700 mb-2">Attachment</h3>
//   ${
//   currentQuotation.descriptionField.attachment
//     ? `<p><a href="${currentQuotation.descriptionField.attachment}" target="_blank" class="text-blue-500 underline">View Attachment</a></p>`
//     : ''
// }
// </div>
// `;
 
//     </>
//   )
// }

// export default TitleSection
