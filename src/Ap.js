import React, { useState } from 'react';

const MenuItem = ({ item, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState(item.variants[0]);
  const [modifiers, setModifiers] = useState([]);

  const handleAddToCart = () => {
    onAddToCart({ item: item.name, variant: selectedVariant, modifiers });
  };

  const handleVariantChange = (event) => {
    setSelectedVariant(event.target.value);
  };

  const handleModifierChange = (event) => {
    const modifier = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setModifiers([...modifiers, modifier]);
    } else {
      setModifiers(modifiers.filter((mod) => mod !== modifier));
    }
  };

  return (
    <div>
      <h3>{item.name}</h3>
      <select value={selectedVariant} onChange={handleVariantChange}>
        {item.variants.map((variant) => (
          <option key={variant} value={variant}>
            {variant}
          </option>
        ))}
      </select>
      <h4>Modifiers:</h4>
      {item.modifiers && (
        <div>
          {item.modifiers.map((modifier) => (
            <div key={modifier}>
              <label>
                <input
                  type="checkbox"
                  value={modifier}
                  onChange={handleModifierChange}
                />
                {modifier}
              </label>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

const EMenu = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (order) => {
    setCart([...cart, order]);
  };

  const handleSendOrders = () => {
    // Code to send orders
    console.log("Orders sent:", cart);
    // Reset cart after sending orders
    setCart([]);
  };

  return (
    <div>
      <h1>E-Menu</h1>
      {menuItems.map((item) => (
        <MenuItem key={item.name} item={item} onAddToCart={addToCart} />
      ))}
      <h2>Order Summary</h2>
      {cart.map((order, index) => (
        <div key={index}>
          <p>{order.item} - {order.variant}</p>
          <p>Modifiers: {order.modifiers.join(', ')}</p>
        </div>
      ))}
      {cart.length > 0 && (
        <button onClick={handleSendOrders}>Send Orders</button>
      )}
    </div>
  );
};

const menuItems = [
  {
    name: "Breakfast Set A",
    variants: ["Kopi", "Kopi O", "Kopi C", "Tea", "Tea O", "Tea C"],
    modifiers: [],
  },
  {
    name: "Nasi Lemak",
    variants: ["Nasi Lemak Telur", "Nasi Lemak Ayam Goreng", "Nasi Lemak Ayam Rendang"],
    modifiers: ["Tambah Nasi", "Tambah Ayam Goreng", "Tambah Ayam Rendang", "Bungkus"],
  },
  {
    name: "Kaya Butter Toast (2pcs)",
    variants: ["White toast", "Wholemeal"],
    modifiers: ["Take Away"],
  },
  {
    name: "Golden Chicken Chop",
    variants: ["Black Pepper Source", "Mushroom Source"],
    modifiers: ["Extra Source", "Take Away"],
  },
  {
    name: "Kopi O",
    variants: ["Hot", "Cool"],
    modifiers: ["Less Sweet", "Less Ice", "Kosong", "Kopi Extra", "Take Away"],
  },
  {
    name: "Teh C",
    variants: ["Hot", "Cool"],
    modifiers: ["Less Sweet", "Less Ice", "Kosong", "Kopi Extra", "Take Away"],
  },
  {
    name: "Apple Juice",
    variants: ["Normal", "Less Ice", "No Ice"],
    modifiers: ["Take Away"],
  },
];

export default EMenu;
