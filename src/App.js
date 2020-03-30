/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import InfoPanel from './components/InfoPanel'
import AdminPage from './pages/AdminPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import aframeWorker from './aframeWorker'
aframeWorker()
function App() {

    return (
        <>
            <AdminPage />
        </>
    );
}

export default App;
