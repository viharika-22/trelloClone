import React, { useState } from 'react';
import './Mainbody.css'; 
import { useDispatch } from 'react-redux';
import { addListToBoard } from '../../slices/boardReducer';

function AddList({ boardId }) {
  const [showInput, setShowInput] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!listTitle.trim()) return;
    dispatch(addListToBoard({ boardId, title: listTitle }));
    setListTitle('');
    setShowInput(false);
  };

  return (
    <div className="listContainer">
      {!showInput ? (
        <button className="showInputBtn" onClick={() => setShowInput(true)}>
          + Add List
        </button>
      ) : (
        <div className="addCardSection">
          <input
            type="text"
            placeholder="Enter list title"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
          />
          <div className="cardButtons">
            <button onClick={handleAdd}>Add</button>
            <button onClick={() => setShowInput(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddList;
