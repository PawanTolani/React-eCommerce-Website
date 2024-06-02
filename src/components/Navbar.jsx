import React, { useState, useEffect } from 'react';
import { Link, useLocation  } from 'react-router-dom';
import { items } from './Data';
import { BsFillCartCheckFill } from 'react-icons/bs';
import jersey from '../assets/jersey.jpg'; 


const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = items.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(filteredData);
  }, [searchTerm, setData]);

  const filterByCategory = (category) => {
    const element = items.filter((product) => product.category === category);
    setData(element);
  };

  return (
    <>
      <header className="sticky-top">
        <div className="nav-bar">
          <Link to={'/'} className="brand">
          <img src={jersey} alt="Jersey Logo" style={{ height: '50px', marginRight: '10px' }} />
            PTJERSEY</Link>
          <div className="search-bar">
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Jersey..."
            />
          </div>
          <Link to={'/cart'} className="cart">
            <button type="button" className="btn btn-primary position-relative">
              <BsFillCartCheckFill style={{ fontSize: '1.5rem' }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link>
          <Link to={'/orders'} className="orders">
            <button type="button" className="btn btn-primary mx-2">
              Your Orders
            </button>
          </Link>
        </div>
        {location.pathname === '/' && (
          <div className="nav-bar-wrapper">
            <div onClick={() => setData(items)} className="items">Jerseys</div>
            <div onClick={() => filterByCategory('Real Madrid')} className="items">Real Madrid</div>
            <div onClick={() => filterByCategory('Mancity')} className="items">Mancity</div>
            <div onClick={() => filterByCategory('Barcelona')} className="items">Barcelona</div>
            <div onClick={() => filterByCategory('lfc')} className="items">Liverpool Fc</div>
            <div onClick={() => filterByCategory('chelsea')} className="items">Chelsea</div>
            <div onClick={() => filterByCategory('Arsenal')} className="items">Arsenal</div>
            <div onClick={() => filterByCategory('intermiami')} className="items">Intermiami</div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
