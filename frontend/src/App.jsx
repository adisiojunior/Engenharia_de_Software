import React from 'react';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

const App = () => {
  return (
    <div>
      <Routes />
      <ToastContainer />
    </div>
  )
};

export default App;
