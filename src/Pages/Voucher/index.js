import React from 'react'
import { Discount } from '@mui/icons-material'
export default function Voucher(){
  return (
    <div style={{ marginTop: '5%', padding: 20, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20%' }}>
        <Discount style={{ color: 'var(--primary-color)', fontSize: 80 }} />
        &nbsp;&nbsp;
        <p>No Voucher Available</p>
      </div>
    </div>
  )
}
