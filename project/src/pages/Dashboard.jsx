import React, { useState } from 'react';
import '../App.css';

const Dashboard = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Living Room Light', status: false, room: 'Living Room', image: 'https://images.unsplash.com/photo-1719887741662-f641ec603471?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpdmluZyUyMHJvb20lMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 2, name: 'Bedroom Fan', status: true, room: 'Bedroom', image: 'https://images.unsplash.com/photo-1677959098115-1aafeb9313c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVkcm9vbSUyMGZhbnxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 3, name: 'Kitchen Light', status: false, room: 'Kitchen', image: 'https://media.istockphoto.com/id/1371279809/photo/modern-pendant-lighting-home-decoration-kitchen-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=wjAdRxunpA9JQWGRlesfm2mQPKRWU_q0F_Uq22vz34k=' },
  ]);

  const toggleDevice = async (id, currentStatus) => {
  const action = currentStatus ? 'off' : 'on';
  try {
    const response = await fetch(`/api/relay/${id}/${action}`);
    if (response.ok) {
      // Only update state if backend call was successful
      setDevices(prev =>
        prev.map(dev => dev.id === id ? { ...dev, status: !dev.status } : dev)
      );
    } else {
      console.error("Failed to toggle device");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


  return (
    <div 
      className="dashboard" 
      style={{ 
        backgroundImage: 'url(https://media.istockphoto.com/id/1824615222/photo/orange-sofa-in-cozy-living-room-interior-with-pastel-green-wall-and-wood-furniture-wall.jpg?s=612x612&w=0&k=20&c=FNA7sRL6fNB9w9AIEhqwsruljfhiAWnHxRWv_JvQ75Q=)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '2rem',
        margin: 0
      }}
    >
      <h2 style={{ color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>Welcome to IntelliHome</h2>
      {devices.map(device => (
        <div 
          key={device.id} 
          className="device-card" 
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(10px)',
            borderRadius: '20px', 
            padding: '1rem', 
            margin: '1rem 0', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={device.image} alt={device.name} style={{ width: '60px', height: '60px', borderRadius: '8px' }} />
            <div style={{ textAlign: 'left', color: '#fff' }}>
              <strong>{device.name}</strong><br />
              <span style={{ color: device.status ? '#00ff99' : '#ff6666' }}>({device.room}) — {device.status ? 'ON' : 'OFF'}</span>
            </div>
          </div>
          <button 
            onClick={() => toggleDevice(device.id, device.status)}

            style={{ 
              backgroundColor: '#00c896', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              padding: '6px 14px', 
              fontSize: '0.85rem', 
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}
          >
            Switch
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
