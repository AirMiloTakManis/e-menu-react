import React, { useState, useEffect } from 'react';
import menuData from './menuItems.json'

export default function UseHook() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState([]);
  const [selectedModifier, setSelectedModifier] = useState([]);
  const [cart, setCart] = useState([]);
  const [openAddItemDialog, setOpenAddItemDialog] = useState(false);
  const [openCartSummaryDialog, setOpenCartSummaryDialog] = useState(false);

  useEffect(() => {
    setMenuItems(menuData.menu);
  }, [])

  const handleVariantChange = (event) => {
    setSelectedVariant(event.target.value);
  };

  const calculateTotalPriceInCart = () => {
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price;

        item.modifiers.forEach(modifier => {
            totalPrice += modifier.price;
        });
    });
    return totalPrice;
  }

  useEffect(() => {
    calculateTotalPriceInCart();
  }, [cart])

  return {
    handleVariantChange,
    menuItems,
    selectedVariant,
    setSelectedVariant,
    selectedModifier,
    setSelectedModifier,
    cart,
    setCart,
    openAddItemDialog,
    setOpenAddItemDialog,
    calculateTotalPriceInCart,
    openCartSummaryDialog,
    setOpenCartSummaryDialog,
  }
}
