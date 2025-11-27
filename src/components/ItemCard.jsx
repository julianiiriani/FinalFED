import React from 'react';

// Menerima props: data item, fungsi onDelete, dan fungsi onToggleStatus
const ItemCard = ({ item, onDelete, onToggleStatus, onEdit }) => {
  // Logika Tampilan: Tentukan warna dan teks berdasarkan status available
  const statusBadgeColor = item.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  const statusText = item.isAvailable ? "✅ Available" : "❌ Dipinjam";
  
  const actionBtnColor = item.isAvailable ? "bg-indigo-600 hover:bg-indigo-700" : "bg-orange-500 hover:bg-orange-600";
  const actionBtnText = item.isAvailable ? "Pinjam Barang" : "Kembalikan Barang";

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col justify-between h-full group">
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
            <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors">
              {item.name}
            </h3>
            <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider whitespace-nowrap ${statusBadgeColor}`}>
                {statusText}
            </span>
        </div>
        
        <div className="text-sm text-gray-600 space-y-2 mb-6 bg-gray-50 p-3 rounded-lg">
            <p className="flex items-center gap-2">
                <span className="text-lg">👤</span> 
                <span className="font-medium">{item.owner}</span>
            </p>
            <p className="flex items-center gap-2">
                <span className="text-lg">📍</span> 
                <span className="font-medium truncate">{item.location}</span>
            </p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mt-auto">
        {/* Tombol Aksi Utama (Pinjam/Kembalikan) - Warna dinamis */}
        <button 
          onClick={() => onToggleStatus(item.id, item.isAvailable)}
          className={`col-span-3 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold text-white transition-colors shadow-sm flex items-center justify-center gap-1 active:scale-95 ${actionBtnColor}`}
        >
          {item.isAvailable ? <span>🔄</span> : <span>↩</span>}
          {actionBtnText}
        </button>

        <button
          onClick={() => onEdit(item)}
          className="col-span-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold text-yellow-700 bg-yellow-50 hover:bg-yellow-100 transition-colors border border-yellow-200 shadow-sm flex items-center justify-center gap-1 active:scale-95"
        >
          <span>✏️</span> Edit
        </button>
        <button 
          onClick={() => onDelete(item.id)}
          className="col-span-1 md:col-span-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-200 shadow-sm flex items-center justify-center gap-1 active:scale-95"
        >
          <span>🗑</span> Hapus
        </button>
      </div>
    </div>
  );
};

export default ItemCard;