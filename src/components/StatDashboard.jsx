import React from 'react';

// Menerima props angka: total, available, borrowed
const StatDashboard = ({ total, available, borrowed }) => {
  return (
    // Grid 3 kolom, responsif jadi 1 kolom di HP
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      
      {/* KARTU 1: TOTAL (Aksen Biru) */}
      <div className="bg-white p-5 rounded-xl shadow-sm border-l-[6px] border-blue-500 flex flex-col justify-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Barang</p>
        <p className="text-3xl font-extrabold text-gray-800">{total}</p>
      </div>

      {/* KARTU 2: TERSEDIA (Aksen Hijau) */}
      <div className="bg-white p-5 rounded-xl shadow-sm border-l-[6px] border-green-500 flex flex-col justify-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tersedia</p>
        <p className="text-3xl font-extrabold text-green-600">{available}</p>
      </div>

      {/* KARTU 3: DIPINJAM (Aksen Merah) */}
      <div className="bg-white p-5 rounded-xl shadow-sm border-l-[6px] border-red-500 flex flex-col justify-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Sedang Dipinjam</p>
        <p className="text-3xl font-extrabold text-red-600">{borrowed}</p>
      </div>
    </div>
  );
};

export default StatDashboard;