import React, { useState } from 'react';
import '../App.css';

const Dashboard = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Light 1', status: false, room: 'Living Room', image: 'https://images.unsplash.com/photo-1532007271951-c487760934ae?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, name: 'Light 2', status: false, room: 'Bedroom', image: 'https://images.unsplash.com/photo-1532007271951-c487760934ae?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, name: 'Light 3', status: false, room: 'Kitchen', image: 'https://images.unsplash.com/photo-1532007271951-c487760934ae?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, name: 'Light 4', status: false, room: 'Guest room', image: 'https://images.unsplash.com/photo-1532007271951-c487760934ae?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
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
          backgroundRepeat: 'no-repeat',
          height: '100dvh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '1rem',
          boxSizing: 'border-box',
          margin: 0,
          overflowY: 'auto' // 👈 Allows vertical scroll if needed

      }}
    >
      <h2 style={{ color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>Welcome to IntelliHome</h2>
      {devices.map(device => (
        <div 
          key={device.id} 
          className="device-card" 
          style={{ 
               backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '20px', 
                padding: '1rem', 
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
                  padding: '8px 18px', 
                  fontSize: '0.9rem', 
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
