import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Library Alert Keren

// Import Komponen Tampilan (Tugas Orang B)
// Pastikan file-file ini sudah dibuat oleh temanmu di folder components
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatDashboard from '../components/StatDashboard';
import LendingForm from '../components/LendingForm';
import ItemCard from '../components/ItemCard';

const HomePage = () => {
  // --- 1. STATE MANAGEMENT ---
  const [items, setItems] = useState([]);      // Menyimpan data barang dari DB
  const [searchTerm, setSearchTerm] = useState(""); // Menyimpan kata kunci pencarian

  // --- 2. LOGIKA API (CRUD) ---

  // A. GET DATA (Menampilkan Data saat website dibuka)
  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("Gagal mengambil data:", err));
  }, []);

  // B. POST DATA (Menambah Barang Baru)
  const handleAddItem = (newItem) => {
    // Tambahkan status default: available = true
    const dataToSend = { ...newItem, isAvailable: true };
    
    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    })
    .then(res => res.json())
    .then(savedItem => {
      // Update State UI (tambah ke list tanpa reload)
      setItems([...items, savedItem]);
      
      // Tampilkan Notifikasi Sukses
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Barang berhasil ditambahkan ke inventaris asrama.',
        timer: 1500,
        showConfirmButton: false
      });
    });
  };

  // C. DELETE DATA (Menghapus Barang)
  const handleDeleteItem = (id) => {
    // Konfirmasi dulu pakai SweetAlert
    Swal.fire({
      title: 'Hapus barang ini?',
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        // Eksekusi Hapus ke API
        fetch(`http://localhost:3000/items/${id}`, { method: 'DELETE' })
        .then(() => {
          // Hapus dari State UI
          setItems(items.filter(item => item.id !== id));
          Swal.fire('Terhapus!', 'Barang sudah dihapus dari list.', 'success');
        });
      }
    });
  };

  // D. PUT DATA (Mengubah Status Pinjam/Kembali)
  const handleToggleStatus = (id, currentIsAvailable) => {
    // 1. Cari item lama berdasarkan ID
    const itemToUpdate = items.find(item => item.id === id);
    
    // 2. Siapkan data baru (status dibalik)
    const updatedItemData = { ...itemToUpdate, isAvailable: !currentIsAvailable };

    // 3. Kirim permintaan PUT ke API
    fetch(`http://localhost:3000/items/${id}`, {
      method: 'PUT', // Mengganti seluruh data object
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItemData)
    })
    .then(res => res.json())
    .then(updatedItem => {
      // 4. Update State UI
      setItems(items.map(item => item.id === id ? updatedItem : item));
      
      // 5. Notifikasi Toast Kecil
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
      Toast.fire({
        icon: updatedItem.isAvailable ? 'info' : 'success',
        title: updatedItem.isAvailable ? 'Barang Dikembalikan' : 'Barang Dipinjam'
      });
    });
  };

  // --- 3. LOGIKA STATISTIK & FILTER ---

  // Hitung Statistik (Otomatis berubah jika state items berubah)
  const totalItems = items.length;
  const availableItems = items.filter(i => i.isAvailable).length;
  const borrowedItems = totalItems - availableItems;

  // Filter Barang berdasarkan Search
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- 4. RENDER TAMPILAN (Menyatukan Komponen) ---
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Header dari Teman */}
      <Header />

      <main className="flex-grow max-w-4xl mx-auto w-full p-4 md:p-6">
        
        {/* Dashboard Statistik (Kirim Props Angka) */}
        <StatDashboard 
            total={totalItems} 
            available={availableItems} 
            borrowed={borrowedItems} 
        />

        {/* Form Input (Kirim Fungsi handleAddItem) */}
        <LendingForm onAddItem={handleAddItem} />

        {/* Search Bar (Langsung di sini saja biar simple) */}
        <div className="relative mb-6">
            <input 
                type="text"
                placeholder="🔍 Cari barang atau pemilik..." 
                className="w-full p-4 pl-5 rounded-xl border border-gray-200 shadow-sm focus:outline-indigo-500 text-gray-700 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Grid List Barang */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              // ItemCard dari Teman (Kirim Data & Fungsi Hapus/Update)
              <ItemCard 
                key={item.id} 
                item={item} 
                onDelete={handleDeleteItem} 
                onToggleStatus={handleToggleStatus} 
              />
            ))
          ) : (
            // Tampilan jika hasil search kosong
            <div className="col-span-1 md:col-span-2 text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
                <p className="text-lg">Tidak ada barang yang ditemukan.</p>
                <p className="text-sm">Coba kata kunci lain atau tambahkan barang baru.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;