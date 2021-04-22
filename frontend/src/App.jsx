import React from 'react';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles/global.css';

const App = () => {
  return (
    <div id='root'>
      <Routes />
      <ToastContainer />
    </div>
  );
};

export default App;
