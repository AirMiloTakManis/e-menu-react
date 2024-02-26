import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AccountCircle, Home, LocalOffer, Restaurant, ShoppingBasket } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import { Sling as Hamburger } from 'hamburger-react'

export default function MenuBar() {
  const location = useLocation();
  const [showNav, setShowNav] = useState(false)
  const [onHover, setOnHover] = useState(false)

  const toggleNavItems = () => {
    setShowNav(!showNav)
  }
  return (
      <div className="menubar">
        <div className="container">
        <div className="menu-icon">
          <Hamburger size={24} direction="right" duration={0.3} rounded toggled={showNav} toggle={setShowNav} />
        </div>
        <NavLink to="/" style={{ textDecoration: 'none', color: 'black', display: "flex", alignItems: 'center' }}>
          <Restaurant style={{ color: 'var(--primary-color)', fontSize: 56 }} />
          <span style={{ fontSize: 20, fontWeight: 600 }}>E-Menu</span>
        </NavLink>
        <div className={`nav-elements ${showNav && 'active'}`}>
          <ul>
            {[
              {
                text: 'Home',
                link: '/',
                class: "home",
                icon: <Home style={{ width: 20 }}/>
              },
              {
                text: 'Order',
                link: '/order',
                class: 'car',
                icon: <ShoppingBasket style={{ width: 20 }} />
              },
              {
                text: 'Voucher',
                link: '/voucher',
                class: 'dealerships',
                icon: <LocalOffer style={{ width: 20 }} />
              },
              {
                text: 'Me',
                link: '/profile-page',
                class: 'dealerships',
                icon: <AccountCircle style={{ width: 20 }} />
              }
            ].map((d, index) => (
                <NavLink key={index} to={d.link} className="hover-active">
                  <li
                    // onMouseOver={() => setOnHover(true)}
                    // onMouseLeave={() => setOnHover(false)}
                    onClick={toggleNavItems}
                    style={{ marginInline: 20 }}
                    >
                    {d.icon}
                    &nbsp;
                    <span>{d.text}</span>
                  </li>
                </NavLink>
              ))}
          </ul>
        </div>
        {/* <div className="d-flex align-items-center">
          <NavLink to="profile-page">
            <Avatar style={{ width: 30, height: 30, cursor: 'pointer' }}/>
          </NavLink>
          &nbsp;&nbsp;
          <IconButton>
            <Logout style={{ color: 'salmon', width: 20 }} />
          </IconButton>
        </div> */}
      </div>

      </div>
      
  )
}
