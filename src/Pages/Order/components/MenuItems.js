import React from 'react'
import nasiLemak from '../../../Assets/Image/nasi-lemak.jpg'
import teaO from '../../../Assets/Image/teho.jpg'
import teaC from '../../../Assets/Image/tehc.jpg'
import kopiO from '../../../Assets/Image/kopio.png'
import kopi from '../../../Assets/Image/kopi.png'
import toast from '../../../Assets/Image/kayatoast.jpg'
import chicChopBP from '../../../Assets/Image/chic-bp.jpg'
import chicChopM from '../../../Assets/Image/chick-m.jpg'
import appleJuice from '../../../Assets/Image/apple-juice.jpg'
import { Add, Remove } from '@mui/icons-material';
import { IconButton, Badge } from '@mui/material';

function MenuItems({ v, selectedVariant, setSelectedVariant, cart, setOpenAddItemDialog, modifiers }) {
  return (
    <div className="menu-items-container">
      {/* Should put the image in s3 bucket and later just put the link insde the menu json */}
      <img className="food-img" src={menuImage(v)} alt="food" />
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

const menuImage = (v) => {
  if(v.name === "Kopi") return kopi;
  if(v.name === "Kopi O") return kopiO;
  if(v.name === "Hot" && v.price === 3.00) return kopiO;
  if(v.name === "Cool" && v.price === 3.50) return kopiO;
  if(v.name === "Kopi C") return kopi;
  if(v.name === "Tea") return teaC;
  if(v.name === "Hot" && v.price === 3.20) return teaC;
  if(v.name === "Cool" && v.price === 3.70) return teaC;
  if(v.name === "Tea O") return teaO;
  if(v.name === "Tea C") return teaC;
  if(v.name === "Nasi Lemak Telur") return nasiLemak;
  if(v.name === "Nasi Lemak Ayam Goreng") return nasiLemak;
  if(v.name === "Nasi Lemak Ayam Rendang") return nasiLemak;
  if(v.name === "White toast") return toast;
  if(v.name === "Wholemeal") return toast;
  if(v.name === "Black Pepper Sauce") return chicChopBP;
  if(v.name === "Mushroom Sauce") return chicChopM;
  if(v.name === "Normal") return appleJuice;
  if(v.name === "Less Ice") return appleJuice;
  if(v.name === "No Ice") return appleJuice;
}

export default MenuItems;