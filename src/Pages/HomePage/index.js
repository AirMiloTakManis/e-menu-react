import React from 'react';
import { Restaurant } from '@mui/icons-material';
import { TextField, Button } from '@mui/material';
import useHook from './hook';
import { Link } from 'react-router-dom';
import foodImage from '../../Assets/Image/nasi-lemak.jpg'; // Import your food image

export default function Homepage() {
  const h = useHook();
  return (
    <div style={{ position: 'relative' }}>
      <img src={foodImage} alt="Food" style={{ position: 'absolute', zIndex: -1, width: '100vw', opacity: 0.15, objectFit: 'cover', height: '100vh' }} />
      <div className="homepage-container">
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Restaurant style={{ color: 'var(--primary-color)', fontSize: 90 }} />
            &nbsp;&nbsp;
            <span style={{ fontSize: 50, fontWeight: 600 }}>E-Menu</span>
          </div>
          <p>
            Satisfy every craving with our exceptional online ordering system
          </p>
        </div>
        <div style={{ width: '50%' }}>
          <TextField
            value={h.searchData}
            onChange={e => h.setSearchData(e.target.value)}
            style={{ backgroundColor: 'white', color: 'black' }}
            placeholder="Search for restaurants or location"
            fullWidth
            size='small'
          />
        </div>
        <div style={{ width: '50%', marginTop: 10, textAlign: 'center' }}>
          <Button
            style={{ backgroundColor: 'var(--primary-color)', width: '100%', color: '#333333', fontWeight: 600 }}
            onClick={h.onSearch}
          >
            I'm Hungry
          </Button>
          <Link to="/" style={{ marginTop: 5 }}>
            Don't know what to order? Let us do the work!
          </Link>
        </div>
      </div>
    </div>
  );
}
