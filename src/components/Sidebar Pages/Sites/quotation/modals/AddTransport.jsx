import { useState, useEffect } from 'react';

function AddTransport({ isOpen, onClose, onSave, initialData, isEditing }) {
  const [formData, setFormData] = useState({ name: '', id: '' });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? 'Edit Transporter' : 'Add New Transporter'}
        </h2>
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">Transporter Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-2">Transporter ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 text-gray-700 p-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleSave}
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTransport;
