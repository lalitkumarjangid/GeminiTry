import React from 'react';
import Main from './Main';
import Sidebar from './Sidebar';

const Home = () => {
    return (
        <div className="body-wrapper">
            <Sidebar />
            <Main />
        </div>
    );
}

export default Home;