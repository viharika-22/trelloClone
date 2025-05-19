import React, { useState } from 'react';
import './Mainbody.css';
import List from './List';
import { useSelector, useDispatch } from 'react-redux';
import { addList, updateBoardTitle, moveCard } from '../../slices/boardReducer';
import { DragDropContext } from '@hello-pangea/dnd';

function Mainbody() {
  const dispatch = useDispatch();
  const { boards, selectedBoardId } = useSelector((state) => state.board);
  const selectedBoard = boards.find((board) => board.id === selectedBoardId);

  const [showInput, setShowInput] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(selectedBoard?.title || '');

  if (!selectedBoard) {
    return (
      <div className="mainbodyContainer">
        <div className="mainHeader"><h3>Please select a board</h3></div>
      </div>
    );
  }

  const handleAddList = () => {
    if (listTitle.trim()) {
      dispatch(addList({ boardId: selectedBoardId, title: listTitle }));
      setListTitle('');
      setShowInput(false);
    }
  };

  const handleTitleUpdate = () => {
    if (editedTitle.trim() && editedTitle !== selectedBoard.title) {
      dispatch(updateBoardTitle({ boardId: selectedBoard.id, newTitle: editedTitle }));
    }
    setEditMode(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTitleUpdate();
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    dispatch(moveCard({ source, destination }));
  };

  return (
    <div className='mainbodyContainer'>
      <div className="mainHeader">
        {!editMode ? (
          <h3 onDoubleClick={() => setEditMode(true)}>{selectedBoard.title}</h3>
        ) : (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleUpdate}
            onKeyDown={handleKeyPress}
            autoFocus
            className="editBoardTitleInput"
          />
        )}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="listCont">
          {selectedBoard.lists.map((list, index) => (
            <List key={list.id} list={list} boardId={selectedBoard.id} listIndex={index} />
          ))}

          <div className="listContainer">
            {!showInput ? (
              <button className="showInputBtn" onClick={() => setShowInput(true)}>
                + Add List
              </button>
            ) : (
              <div className="addCardSection">
                <input
                  type="text"
                  value={listTitle}
                  onChange={(e) => setListTitle(e.target.value)}
                  placeholder="Enter list title"
                />
                <div className="cardButtons">
                  <button onClick={handleAddList}>Add</button>
                  <button onClick={() => setShowInput(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default Mainbody;
