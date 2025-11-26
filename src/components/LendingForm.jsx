import React, { useState } from 'react';

// Menerima props fungsi onAddItem untuk mengirim data ke parent
const LendingForm = ({ onAddItem }) => {
  // State lokal untuk menampung inputan form
  const [formData, setFormData] = useState({ name: '', owner: '', location: '' });

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    // Validasi sederhana: Cek jika ada field kosong
    if (!formData.name.trim() || !formData.owner.trim() || !formData.location) {
        // Menggunakan alert browser standar (bisa diganti Swal kalau mau di sini juga)
        return alert("Mohon lengkapi semua data barang!"); 
    }
    // Kirim data ke fungsi milik parent (HomePage.jsx)
    onAddItem(formData);
    // Reset form jadi kosong lagi
    setFormData({ name: '', owner: '', location: '' });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-50 mb-8">
      <h2 className="text-lg font-bold text-indigo-900 mb-5 flex items-center gap-2">
        <span className="text-xl">📦</span> Tambah Barang Inventaris
      </h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Input Nama Barang */}
        <div className="md:col-span-1">
          <input 
            type="text" 
            placeholder="Nama Barang (Cth: Setrika)" 
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        
        {/* Input Pemilik */}
        <div className="md:col-span-1">
          <input 
            type="text" 
            placeholder="Pemilik (Cth: Bro David)" 
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={formData.owner}
            onChange={(e) => setFormData({...formData, owner: e.target.value})}
          />
        </div>
        
        {/* Select Lokasi */}
        <div className="md:col-span-1">
          <select 
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          >
             <option value="">Pilih Asrama...</option>
             <option value="Crystal">Asrama Crystal</option>
             <option value="Edelweiss">Asrama Edelweiss</option>
             <option value="Gennaro">Asrama Gennaro</option>
             <option value="Jasmine">Asrama Jasmine</option>
             <option value="Annex">Asrama Annex</option>
             <option value="Lainnya">Lainnya</option>
          </select>
        </div>
        
        {/* Tombol Submit */}
        <div className="md:col-span-1">
          <button type="submit" className="w-full h-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 active:scale-95 transition shadow-sm flex items-center justify-center gap-2">
            <span>+</span> Upload Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default LendingForm;