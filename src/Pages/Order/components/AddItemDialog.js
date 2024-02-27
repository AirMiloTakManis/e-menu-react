import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material'
import nasiLemak from '../../../Assets/Image/nasi-lemak.jpg'
import teaO from '../../../Assets/Image/teho.jpg'
import teaC from '../../../Assets/Image/tehc.jpg'
import kopiO from '../../../Assets/Image/kopio.png'
import kopi from '../../../Assets/Image/kopi.png'
import toast from '../../../Assets/Image/kayatoast.jpg'
import chicChopBP from '../../../Assets/Image/chic-bp.jpg'
import chicChopM from '../../../Assets/Image/chick-m.jpg'
import appleJuice from '../../../Assets/Image/apple-juice.jpg'

function AddItemDialog({ openAddItemDialog, setOpenAddItemDialog, selectedVariant, setCart, cart, selectedModifier, setSelectedModifier, setSelectedVariant }) {

  const calculatePrice = () => {
    let sum = 0;
    if(selectedModifier.length === 0) return selectedVariant.price;
    return sum = selectedVariant.price + selectedModifier.reduce((acc, object) => {
      return acc + object.price;
    }, 0);
  }

  const handleAddModifier = (e, mod) => {
    const modifier = mod
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedModifier([...selectedModifier, modifier]);
    } else {
      setSelectedModifier(selectedModifier.filter((m) => m !== modifier));
    }
  }

  const handleAddToBasket = () => {
    setCart([...cart, {
        name: selectedVariant.name,
        price: selectedVariant.price,
        modifiers: selectedModifier,
    }])
    setSelectedModifier([]);
    setSelectedVariant([]);
    setOpenAddItemDialog(false);
  }
  return (
    <Dialog open={openAddItemDialog} onClose={() => setOpenAddItemDialog(false)}>
      <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
        <text>{selectedVariant?.name}</text>
        <text>RM&nbsp;{selectedVariant?.price?.toFixed(2)}</text>
      </DialogTitle>
      <DialogContent>
        <img src={menuImage(selectedVariant)} height="auto" width="100%" alt="food" style={{ borderRadius: 10 }}/>
        <FormGroup>
          {selectedVariant.modifiers?.map(mod => (
           <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: 'var(--primary-color)',
                  '&.Mui-checked': {
                    color: 'var(--primary-color)',
                  },
                }}
                // defaultChecked={selectedVariant.isFromCart ? !!selectedVariant.modifiers.find(d => d.name === mod.name) : false}
                value={mod.price}
                onClick={(e) => handleAddModifier(e, mod)} />}
                label={`${mod.name} - RM ${mod.price?.toFixed(2)}`} />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleAddToBasket}
          style={{ width: '100%', color: 'white', backgroundColor: 'var(--primary-color)' }}
        >
          Add to Basket - {calculatePrice()?.toFixed(2)} (Incl.tax)
        </Button>
      </DialogActions>
    </Dialog>
  )
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

export default AddItemDialog