import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function CartSummaryDialog({ openCartSummaryDialog, setOpenCartSummaryDialog, cart }) {
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return cart.reduce((acc, item) => acc + (item.price + (item.modifiers.reduce((acc, mod) => acc + mod.price, 0))), 0).toFixed(2);
  }

  const handlePlaceOrder = () => {
    const orderId = uuidv4();
    sessionStorage.setItem(`order-${orderId}`, JSON.stringify(cart));
    setOpenCartSummaryDialog(false);
    navigate(`/order-processing/order-${orderId}`, { replace: true })
  };

  return (
    <Dialog fullWidth={true} maxWidth="xs" open={openCartSummaryDialog} onClose={() => setOpenCartSummaryDialog(false)}>
      <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 2px 0px' }}>
        <text style={{ fontSize: 18 }}>Order Summary</text>
        <text style={{ fontSize: 12, cursor: 'pointer' }} onClick={() => setOpenCartSummaryDialog(false)}>Add Items</text>
      </DialogTitle>
      <DialogContent>
          {cart.map(c => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBlock: 10, maxHeight: '70vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'center', width: '20%'}}>
                <div style={{ width: '30px', height: '30px', borderRadius: 5, backgroundColor: 'white', border: '1px solid var(--primary-color)', textAlign: 'center', paddingTop: 2 }}>
                  <text>{cart.filter(f => f.name === c.name && f.modifiers === c.modifiers).length}x</text>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', whiteSpace: 'nowrap' }}>
                {c.name}
                {c.modifiers?.map(m => (
                  <text style={{ fontSize: 14 }}>
                  -{m.name}
                </text>
                ))}
                <text style={{ fontSize: 12, cursor: 'pointer', color: 'var(--primary-color)' }}>Edit</text>
              </div>
              <div style={{ width: '20%', display: 'flex', justifyContent: 'end' }}>
                {/* {calculatePrice(c.price, c.modifiers)} */}
                {(c.price + c.modifiers.reduce((acc, obj) => acc + obj.price, 0)).toFixed(2)}
              </div>
            </div>
          ))}
      </DialogContent>
      <DialogActions>
        <div style={{ width: '100%' }}>
          <div style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px -1px 2px 0px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 10 }}>
            <text>TOTAL:</text>
            <text>RM {calculateTotalPrice()}</text>
          </div>
          <Button
            onClick={handlePlaceOrder}
            style={{ width: '100%', color: 'white', backgroundColor: 'var(--primary-color)' }}
          >
          Place Order
        </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default CartSummaryDialog