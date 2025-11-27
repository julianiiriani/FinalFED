import React from 'react';

const Header = () => {
  return (
    // Header sticky agar tetap di atas saat discroll
    <header className="bg-indigo-900 text-white py-4 px-6 shadow-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        {/* Bagian Kiri: Logo & Judul */}
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="handshake">🤝</span>
          <h1 className="text-xl md:text-2xl font-bold tracking-wider">PinjamBarang</h1>
        </div>
        
        <span className="text-xs md:text-sm bg-indigo-700 px-3 py-1 rounded-full font-medium border border-indigo-500 shadow-sm">
          Asrama UNKLAB
        </span>
      </div>
    </header>
  );
};

export default Header;