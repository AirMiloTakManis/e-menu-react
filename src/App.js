import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './Components/TopBar.js';
import { Grid } from '@mui/material';
import Homepage from './Pages/HomePage';
import Order from './Pages/Order';
import Voucher from './Pages/Voucher';
import ProcessOrder from './Pages/ProcessOrder'
import Profile from './Pages/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainContainer child={<Homepage />} />} />
        <Route path='/home' element={<MainContainer child={<Homepage />} />} />
        <Route path='/order' element={<MainContainer child={<Order />} />} />
        <Route path='/order-processing/:id' element={<MainContainer child={<ProcessOrder />} />} />
        <Route path='/voucher' element={<MainContainer child={<Voucher />} />} />
        <Route path='/profile-page' element={<MainContainer child={<Profile />} />} />
      </Routes>
    </Router>
  );
}

function MainContainer(props) {
  const location = useLocation();

  return (
    <Grid className="content"
      style={{
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        overflow: location.pathname === '/' || location.pathname === '/home' ? 'hidden' : 'auto',
      }}
    >
      <TopBar />
      <Grid item xs={12}>
        {props.child}
      </Grid>
    </Grid>
  )
}

export default App;
