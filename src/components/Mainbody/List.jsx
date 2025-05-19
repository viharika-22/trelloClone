import React, { useState } from 'react';
import './List.css';
import Card from '../Mainbody/Card';
import { useDispatch } from 'react-redux';
import { addCardToList, moveCard } from '../../slices/boardReducer';
import { Droppable, Draggable } from '@hello-pangea/dnd';

function List({ list, boardId, listIndex }) {
  const [cardText, setCardText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch();

  const handleAddCard = () => {
    if (cardText.trim()) {
      dispatch(addCardToList({ boardId, listId: list.id, content: cardText }));
      setCardText('');
      setShowInput(false);
    }
  };

  const handleCancel = () => {
    setCardText('');
    setShowInput(false);
  };

  return (
    <div className='listContainer'>
      <div className="listHeader">
        <div className="listTitle"><h4>{list.title}</h4></div>
        <div className="btns">
          <div className="collapseBtn">↔</div>
          <div className="listActions">...</div>
        </div>
      </div>

      <Droppable droppableId={list.id} type="CARD">
        {(provided) => (
          <div
            className="cards"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.cards.length === 0 ? (
              <p className='noCards'>No cards</p>
            ) : (
              list.cards.map((card, index) => (
                <Draggable
                  key={card.id}
                  draggableId={card.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card content={card.content} />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {!showInput ? (
        <button className="showInputBtn" onClick={() => setShowInput(true)}>+ Add Card</button>
      ) : (
        <div className="addCardSection">
          <input
            type="text"
            placeholder="Enter card content"
            value={cardText}
            onChange={(e) => setCardText(e.target.value)}
          />
          <div className="cardButtons">
            <button onClick={handleAddCard}>Add</button>
            <button onClick={handleCancel}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
