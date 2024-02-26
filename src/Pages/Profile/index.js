import React from 'react'
import { Button } from '@mui/material'

export default function index() {
  return (
    <div style={{ marginTop: '5%', padding: 20, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20%' }}>
        <Button style={{ color: 'white', backgroundColor: 'var(--primary-color)', width: '30%' }}>LOG IN</Button>
        &nbsp;
        <Button style={{ color: 'var(--primary-color)', backgroundColor: 'white', border: '1px solid var(--primary-color)', width: '30%' }}>SIGN UP</Button>
      </div>
    </div>
  )
}
