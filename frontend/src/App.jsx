import React from 'react';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import NavBar from './Components/Navbar';

const App = () => {
  return (
    <div id='root'>
      <NavBar />
      <Routes />
      <ToastContainer />
    </div>
  );
};

export default App;
