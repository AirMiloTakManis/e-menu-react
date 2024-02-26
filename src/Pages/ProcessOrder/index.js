import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import OrderPlacedAnimation from '../../Assets/Image/order-placed-animation.json';
import SuccessAnimation from '../../Assets/Image/success.json';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ProcessOrder() {
  const { id } = useParams();
  
  const container = useRef(null);
  const cartItems = JSON.parse(sessionStorage.getItem(id));
  const sanitizedID = id ? id.split('order-')[1] : null;
  
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + (item.price + (item.modifiers.reduce((acc, mod) => acc + mod.price, 0))), 0).toFixed(2);
  }

  useEffect(() => {
    console.log("Component mounted");
    const firstAnimation = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: OrderPlacedAnimation,
    });
  
    const timeout = setTimeout(() => {
      console.log("Timeout reached");
      setIsCompleted(true);
      firstAnimation.destroy();
      const secondAnimation = lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: SuccessAnimation,
      });
      return () => {
        console.log("Second Animation unmounted");
        secondAnimation.destroy();
      };
    }, 10000);
    
    return () => {
      console.log("First Animation unmounted");
      firstAnimation.destroy();
      clearTimeout(timeout);
    };
  }, [id]);
  

  return (
    <div className="process-order-container">
      <h3 style={{ fontSize: 24, textAlign: 'center' }}>ORDER #{sanitizedID} has been {isCompleted ? 'completed' : 'placed'}!</h3>
      <div className="lottie-content" ref={container} />
      <div style={{ textAlign: 'center' }}>
        <Link to='/order' style={{ cursor: 'pointer', textDecoration: 'none' }}>Order More</Link>
        <p style={{ cursor: 'pointer', color: 'var(--primary-color)', marginLeft: '10px' }} onClick={() => setShowOrderDetails(!showOrderDetails)}>Order Details</p>
      </div>
      {showOrderDetails && (
        <>
          <div style={{ maxHeight: '35vh', overflowY: 'auto', boxShadow: '0 20px 10px -20px rgba(0,0,0,0.05) inset' }}>
            {cartItems?.map(c => (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBlock: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'center', width: '20%'}}>
                  <div style={{ width: '30px', height: '30px', borderRadius: 5, backgroundColor: 'white', border: '1px solid var(--primary-color)', textAlign: 'center', paddingTop: 2 }}>
                    <text>{cartItems.filter(f => f.name === c.name && f.modifiers === c.modifiers).length}x</text>
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
                <div style={{ width: '20%', display: 'flex', justifyContent: 'center' }}>
                  {(c.price + c.modifiers.reduce((acc, obj) => acc + obj.price, 0)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px -1px 2px 0px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', position: 'fixed', bottom: 20, backgroundColor: 'var(--main-color)' }}>
          <text style={{ paddingLeft: '5%' }}>TOTAL:</text>
          <text style={{ paddingRight: '5%' }}>RM {calculateTotalPrice()}</text>
        </div>
        </>
      )}
    </div>
  );
}
