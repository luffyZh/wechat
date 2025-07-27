import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import LogoImg from './images/WEB.png';

import './App.css';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (tab) => {
    navigate(`/${tab}`);
  };

  return (
    <div>
      <div className="columns is-multiline"></div>
      <nav className="navbar py-4">
        <div className="container is-fluid">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" style={{ fontSize: '24px' }}>
              <img className="image" src={LogoImg} alt="Logo" width="32px" />
              &nbsp;前端周公子课程站
            </Link>
            <a className="navbar-burger" role="button" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <a onClick={() => handleTabChange('live')} className={`navbar-item ${location.pathname === '/live' ? 'active' : ''}`} to="/live">直播预告</a>
              <Link className={`navbar-item ${location.pathname === '/web' ? 'active' : ''}`} to="/web">Web 课程</Link>
              <Link className={`navbar-item ${location.pathname === '/backend' ? 'active' : ''}`} to="/backend">后端课程</Link>
              <Link className={`navbar-item ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">联系我们</Link>
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
      <Outlet />
    </div>
  );
}

export default Layout;
