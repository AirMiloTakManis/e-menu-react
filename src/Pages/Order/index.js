import React, { useState, useEffect } from 'react';
import UseHook from './hook';
import { Tabs, Tab, Button } from '@mui/material';

import MenuItems from './components/MenuItems';
import AddItemDialog from './components/AddItemDialog';
import CartSummaryDialog from './components/CartSummaryDialog';

export default function Index() {
  const h = UseHook();
  const [value, setValue] = useState(4);
  const [tabWidth, setTabWidth] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const handleResize = () => {
      const tabsContainerWidth = document.getElementById('tabs-container').offsetWidth;
      const numOfTabs = 5;
      const width = tabsContainerWidth / numOfTabs;
      setTabWidth(width);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredData = value === 4 ? h.menuItems : h.menuItems?.filter(item => item.category === value);

  return (
    <div>
      <AddItemDialog {...h} />
      <CartSummaryDialog {...h} />
      <Tabs
        id="tabs-container"
        TabIndicatorProps={{
          style: {
            backgroundColor: "var(--primary-color)",
          }
        }}
        className="tabs-container-order"
        value={value}
        onChange={handleChange}>
        <Tab className="tab-content" style={{ color: value === 4 ? 'var(--primary-color)' : 'grey', width: tabWidth }} label="All" value={4} />
        <Tab className="tab-content" style={{ color: value === 0 ? 'var(--primary-color)' : 'grey', width: tabWidth }} label="Set" value={0} />
        <Tab className="tab-content" style={{ color: value === 1 ? 'var(--primary-color)' : 'grey', width: tabWidth }} label="Local Food" value={1} />
        <Tab className="tab-content" style={{ color: value === 2 ? 'var(--primary-color)' : 'grey', width: tabWidth }} label="Western Food" value={2} />
        <Tab className="tab-content" style={{ color: value === 3 ? 'var(--primary-color)' : 'grey', width: tabWidth }} label="Beverages" value={3} />
      </Tabs>
      <div className="order-container" style={{ marginTop: '10%', maxHeight: 'calc(100vh - 48px)', overflowY: 'auto', width: '100%' }}>
        {filteredData?.map((d, index) => (
          <div key={index}>
            {value === 4 && (<h3 style={{ fontWeight: 600 }}>{d.group}</h3>)}
            {d.items.map(itm => (
              <React.Fragment key={itm.id}>
                <h4>{itm.item}</h4>
                <div className="menu-container">
                  {itm.variants.map(v => (
                    <MenuItems key={v.id} v={v} {...h} modifiers={itm.modifiers} />
                  ))}
                </div>
                {(d.items.length > 1 || value === 4) && (
                  <hr style={{ marginBlock: 20 }} />
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
      <div style={{ padding: '1rem', position: 'fixed', bottom: 0, width: '100%', zIndex: 2 }}>
        <Button
          style={{ backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 10, boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px' }}
          onClick={() => h.setOpenCartSummaryDialog(true)}
        >
          <div style={{ backgroundColor: 'white', color: 'var(--primary-color)', borderRadius: '50%', width: 25, height: 25, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {h.cart.length}
          </div>
          <text>VIEW YOUR CART</text>
          <text>RM {h.calculateTotalPriceInCart().toFixed(2)}</text>
        </Button>
      </div>
    </div>
  );
}
