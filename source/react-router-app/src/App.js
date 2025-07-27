import { useState } from 'react';
import HomePage from './pages/home';
import LivePage from './pages/live';
import WebPage from './pages/web';
import BackendPage from './pages/backend';
import ContactPage from './pages/contact';

import LogoImg from './images/WEB.png';

import './App.css';

function PageComp({ activeTab }) {
  if (activeTab === 'home') {
    return <HomePage />;
  } else if (activeTab === 'live') {
    return <LivePage />;
  } else if (activeTab === 'web') {
    return <WebPage />;
  } else if (activeTab === 'backend') {
    return <BackendPage />;
  } else if (activeTab === 'contact') {
    return <ContactPage />;
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="columns is-multiline"></div>
      <nav className="navbar py-4">
        <div className="container is-fluid">
          <div className="navbar-brand">
            <a onClick={() => handleTabClick('home')} className="navbar-item" style={{ fontSize: '24px' }}>
              <img className="image" src={LogoImg} alt="Logo" width="32px" />
              &nbsp;前端周公子课程站
            </a>
            <a className="navbar-burger" role="button" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <a onClick={() => handleTabClick('live')} className={`navbar-item ${activeTab === 'live' ? 'active' : ''}`}>直播预告</a>
              <a onClick={() => handleTabClick('web')} className={`navbar-item ${activeTab === 'web' ? 'active' : ''}`}>Web 课程</a>
              <a onClick={() => handleTabClick('backend')} className={`navbar-item ${activeTab === 'backend' ? 'active' : ''}`}>后端课程</a>
              <a onClick={() => handleTabClick('contact')} className={`navbar-item ${activeTab === 'contact' ? 'active' : ''}`}>联系我们</a>
            </div>
            <div className="navbar-item">
              <div className="field has-addons">
                <div className="control">
                  <input className="input" type="search" placeholder="Search" aria-label="Search" />
                </div>
                <div className="control">
                  <button className="button" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke="currentColor"
                      style={{ width: '24px', height: '24px' }}>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <PageComp activeTab={activeTab} />
    </div>
  );
}

export default App;
