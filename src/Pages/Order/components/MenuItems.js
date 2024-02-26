import React from 'react'
import foodimg from '../../../Assets/Image/nasi-lemak.jpg'
import { Add, Remove } from '@mui/icons-material';
import { IconButton, Badge } from '@mui/material';

function MenuItems({ v, selectedVariant, setSelectedVariant, cart, setOpenAddItemDialog, modifiers }) {
  return (
    <div className="menu-items-container">
      <img className="food-img" src={foodimg} alt="food" />
      <div className="menu-item-detail">
        <div>
          <p>{v.name}</p>
          <p>RM {v.price.toFixed(2)}</p>
        </div>
        <div className="menu-item-cta">
          <IconButton style={{ backgroundColor: 'var(--primary-color)' }} onClick={() => { setSelectedVariant({ ...v, modifiers }); setOpenAddItemDialog(true) }}>
            {cart.length !== 0 ?
              <Badge badgeContent={cart.filter(c => c.name === v.name).length} sx={{
                "& .MuiBadge-badge": {
                  color: "var(--primary-color)",
                  backgroundColor: "white",
                  border: '1px solid var(--primary-color)'
                }
              }}>
                <Add style={{ color: 'white' }} />
              </Badge>
              : <Add style={{ color: 'white' }} />}
          </IconButton>

          {!!selectedVariant.length === 0 && (
            <IconButton style={{ position: 'relative', zIndex: 1 }}>
              <Remove />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuItems;