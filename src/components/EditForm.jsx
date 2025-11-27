import React, { useState, useEffect } from 'react';

const EditForm = ({ defaultData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({ 
    id: '', 
    name: '', 
    owner: '', 
    location: '', 
    isAvailable: true 
  });

  useEffect(() => {
    if (defaultData) { 
      setFormData(defaultData);
    }
  }, [defaultData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.owner.trim() || !formData.location) {
      alert('Mohon lengkapi data sebelum menyimpan.');
      return;
    }
    onUpdate(formData);
  };

  const handleCancelEdit = () => {
    setFormData({
      id: '',
      name: '',
      owner: '',
      location: '',
      isAvailable: true
    });
    if (onCancel) { onCancel(); }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-6">
      <h3 className="font-bold text-lg mb-3">Edit Data Barang</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nama Barang"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="md:col-span-1">
          <input
            type="text"
            value={formData.owner}
            onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
            placeholder="Pemilik Barang"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="md:col-span-1">
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Lokasi"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="md:col-span-1 flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
            />
            <span className="text-sm">Tersedia (available)</span>
          </label>
          <div className="flex gap-2"/>
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700"
            >
              Simpan
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;