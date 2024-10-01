import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function ItemsSection({ addQuotation, setQuotation }) {
  const [items, setItems] = useState([
    { itemName: "", quantity: 1, rate: 1, amount: 1 },
  ]);
  console.log("add items==>",addQuotation)
  const [selectedItemId, setSelectedItemId] = useState(0); // Track which item is selected
const [thumbnailImage,setThumbnailImage] = useState()
  // Add item
  const addItem = () => {
    // e.preventDefault()
    const newItem = { itemName: "", quantity: 1, rate: 1, amount: 1 };
    setItems([...items, newItem]);
    setQuotation((prevQuotation) => ({
      ...prevQuotation,
      items: [...prevQuotation.items, newItem],
    }));
  };
console.log("thumbnail items section", addQuotation?.items?.thumbnailImage)
  // Remove item
  const removeItem = (index) => {
    const FiltrItem = addQuotation.items.filter((_, i) => i !== index);
    setQuotation((prevQuotation) => ({
      ...prevQuotation,
      items: FiltrItem,
    }));
  };

  // Duplicate input fields only (no description or thumbnail)
  const duplicateItem = (index) => {
    const itemToDuplicate = addQuotation.items[index];
    setQuotation((prevQuotation) => ({
      ...prevQuotation,
      items: [...prevQuotation.items, itemToDuplicate],
    }));
  };

  const handleChange = (index, field, value) => {
    // Create a copy of the items array
    const updatedItems = [...addQuotation.items];

    const updatedItem = { ...updatedItems[index] };

    updatedItem[field] = value;

    updatedItems[index] = updatedItem;
    // Update the state immutably
    setQuotation((prevQuotation) => ({
      ...prevQuotation,
      items: updatedItems,
    }));
  };

  // Handle description change
  const handleDescriptionChange = (value) => {
    const updatedItems = [...addQuotation.items];
    const updatedItem = { ...updatedItems[selectedItemId] };
    updatedItem["description"] = value;
    updatedItems[selectedItemId] = updatedItem;
    // Update the state immutably
    setQuotation((prevQuotation) => ({
      ...prevQuotation,
      items: updatedItems,
    }));
  };

  const handleSelectImage=(e)=>{
    const updatedItems = [...addQuotation.items];

    const updatedItem = { ...updatedItems[selectedItemId] };

    updatedItem['thumbnailImage'] = e.target.files[selectedItemId];

    updatedItems[selectedItemId] = updatedItem;
    setThumbnailImage(e.target.files[selectedItemId])

    // Update the state immutably
    setQuotation((prevQuotation) => ({
      ...prevQuotation,
      items: updatedItems,
    }));
    // setClientImage(e.target.files[0])
  }

  const staticDiscription = (index) => {
    setSelectedItemId(index);
  };
  // Calculate total amount
 const calculateTotal = () => {
    return addQuotation.items
      .reduce((total, item) => {
        const rate = parseFloat(item.rate || 0);
        const quantity = parseFloat(item.quantity || 0);
        return total + rate * quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <>

      <div className="p-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center justify-between bg-purple-600 text-white p-2 rounded-t-lg">
            <div className="w-1/3">Item</div>
            <div className="w-1/3">Quantity</div>
            <div className="w-1/3">Rate (RS)</div>
            <div className="w-1/3">Amount (RS)</div>
          </div>
          {addQuotation?.items?.map((item, index) => (
            <div
              key={index}
              className={`p-2 border-b ${
                selectedItemId === index ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex gap-2 justify-start">
                <div className="w-1/2">
                  <input
                    type="text"
                    name="itemName"
                    onFocus={()=> staticDiscription(index)}
                    placeholder="Item Name (Required)"
                    className="w-full border-b border-0 focus:outline-none focus:ring-0 border-gray-300 "
                    value={item?.itemName}
                    onChange={(e) =>
                      handleChange(index, "itemName", e.target.value)
                    }
                    // onClick={() => handleItemSelect(index)} // Set the selected item on click
                  />
                  
                </div>
                <div className="w-1/2">
                  <input
                    type="number"
                    name="quantity"
                    className="w-full border-b border-0 border-gray-300 focus:ring-0 focus:outline-none text-center"
                    value={item?.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="number"
                    name="rate"
                    className="w-full border-b border-0 border-gray-300  focus:ring-0 focus:outline-none text-center"
                    value={item?.rate}
                    onChange={(e) =>
                      handleChange(index, "rate", e.target.value)
                    }
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="number"
                    name="amount"
                    disabled
                    className="w-full border-b border-0 border-gray-300  focus:ring-0 focus:outline-none text-right"
                    value={Number(item?.rate) * Number(item.quantity)}
                    // onChange={(e) => handleChange(index, 'amount', Number(item?.rate)*Number(item.quantity))}
                  />
                </div>
                <div className="w-1/3 text-right">
                  <button
                    className={`text-gray-500 hover:text-gray-700 ${
                      index === 0 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={() =>{
                      removeItem(index)}}
                    disabled={index === 0} // Disable the remove button for the first item
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>

              {/* Duplicate Button (for input fields only) */}
              <div className="flex mt-4 justify-end p-2">
                <button
                  className="text-purple-600 flex items-center space-x-2"
                  onClick={() => duplicateItem(index)}
                >
                  <i className="fas fa-clone"></i> <span>Duplicate</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Description and Thumbnail (Separate from Items) */}
        {  (
          <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
            <h3 className="text-lg font-bold mb-4">
              Details for Selected Item
            </h3>
            {/* Description Editor */}
            <div className="p-2 mb-4">
              <ReactQuill
                className="mb-6 rounded-lg"
                name="description"
                value={addQuotation?.items[selectedItemId]?.description} // Use the description for the selected item
                onChange={handleDescriptionChange}
                theme="snow"
                placeholder="Description"
                style={{ height: "150px", width: "500px" }}
              />
            </div>

            {/* Thumbnail Upload */}
            <div className="flex mt-4 items-center space-x-4 p-2">
              { addQuotation?.items[0]?.thumbnailImage && (
                <img
                  src={
                    addQuotation?.items[0]?.thumbnailImage  instanceof File
      ? URL.createObjectURL(addQuotation?.items[0]?.thumbnailImage )
      : addQuotation?.items[0]?.thumbnailImage 
  }
                  alt="Thumbnail"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  name="thumbnailImage"
                  accept="image/*"
                  id={`thumbnail-${selectedItemId}`}
                  className="hidden"
                  onChange={handleSelectImage}
                />
                <label
                  htmlFor={`thumbnail-${selectedItemId}`}
                  className="border border-dashed border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white cursor-pointer"
                >
                  <i className="fas fa-plus"></i> Upload Thumbnail
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Add Field Button */}
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg mt-4"
          onClick={addItem}
        >
          <i className="fas fa-plus"></i> Add Field
        </button>

        {/* Total Calculation */}
        <div className="flex p-4 justify-end">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-plus text-purple-500"></i>
              <span>Give Discount on Total</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-plus text-purple-500"></i>
              <span>Add Additional Charges</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-eye-slash text-purple-500"></i>
              <span>Hide Totals</span>
            </div>
            <hr className="my-4 max-w-sm border-gray-300" />
            <div className="flex justify-between space-x-12 font-bold">
              <span className="font-semibold text-2xl">Total(PKR)</span>
              <span className="font-semibold text-2xl">
                Rs {calculateTotal()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
