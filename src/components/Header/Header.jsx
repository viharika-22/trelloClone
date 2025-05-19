import React from 'react';
import './Header.css';
import logo from './assets/logo.jpeg';
import prof from './assets/profile.jpg';
import { useDispatch } from 'react-redux';
import { addBoard } from '../../slices/boardReducer';

function Header() {
  const dispatch = useDispatch();
  const handleAddBoard = () => {
    dispatch(addBoard({ title: 'New Board' }));
  };

  return (
    <div className='headerContainer'>
      <div className="logo">
        <img src={logo} alt="logo" title="Trello" /> Trello
      </div>

      <div className="searchBar">
        <input type="text" placeholder='Search Here....' />
        <button onClick={handleAddBoard}>Create</button>
      </div>

      <div className="profile">
        <img src={prof} alt="prof" />
      </div>
    </div>
  );
}

export default Header;
