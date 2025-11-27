import React, { useState, useEffect, useRef } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import StatDashboard from '../components/StatDashboard';
import LendingForm from '../components/LendingForm';
import ItemCard from '../components/ItemCard';
import EditForm from '../components/EditForm';
import SearchBar from '../components/SearchBar';


const HomePage = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const response = await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          ...newItem, isAvailable: true,
          id: Date.now().toString()
        }),
      });
      if (response.ok) {
        fetchItems();
      }
    } catch (error) {
      console.error('Gagal menambahkan barang.', error);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          ...items.find(item => item.id === id),
          isAvailable: !currentStatus
        }),
      });
      if (response.ok) {
        fetchItems();
      }
    } catch (error) {
      console.error('Gagal memperbarui status barang.', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchItems();
      }
    } catch (error) {
      console.error('Gagal menghapus barang.', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      const response = await fetch(`http://localhost:3000/items/${updatedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedItem),
      });
      if (response.ok) {
        setEditingItem(null);
        fetchItems();
      }
    } catch (error) {
      console.error('Gagal memperbarui data barang.', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const totalItems = items.length;
  const availableItems = items.filter(item => item.isAvailable).length;
  const borrowedItems = totalItems - availableItems;

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <StatDashboard 
          total={totalItems} 
          available={availableItems} 
          borrowed={borrowedItems} 
        />

        {editingItem && (
          <EditForm 
            defaultData={editingItem} 
            onUpdate={handleUpdateItem} 
            onCancel={handleCancelEdit} 
          />
        )}
        <LendingForm onAddItem={handleAddItem} />

        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <ItemCard 
              key={item.id} 
              item={item}
              onDelete={handleDeleteItem}
              onToggleStatus={handleToggleStatus}
              onEdit={handleEdit}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Tidak ada barang yang ditemukan.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;