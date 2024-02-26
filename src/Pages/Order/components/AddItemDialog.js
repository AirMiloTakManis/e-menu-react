import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material'
import foodImg from '../../../Assets/Image/nasi-lemak.jpg'

function AddItemDialog({ openAddItemDialog, setOpenAddItemDialog, selectedVariant, setCart, cart, selectedModifier, setSelectedModifier, setSelectedVariant}) {
console.log("🚀 ~ AddItemDialog ~ cart:", cart)

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
        <text>{selectedVariant.name}</text>
        <text>RM&nbsp;{selectedVariant.price?.toFixed(2)}</text>
      </DialogTitle>
      <DialogContent>
        <img src={foodImg} height="auto" width="100%" alt="food" style={{ borderRadius: 10 }}/>
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

export default AddItemDialog