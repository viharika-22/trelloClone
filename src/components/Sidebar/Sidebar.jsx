import React from 'react'
import './Sidebar.css'
import {useDispatch,useSelector} from 'react-redux'
import { addBoard,selectBoard } from '../../slices/boardReducer';

function Sidebar() {
  const handleToggle = () => {
    const expandBtn = document.querySelector('.expand');
    expandBtn.classList.toggle('flipped');
  };
const board = useSelector(state=>state.board)
const dispatch=useDispatch()
function handelAddBoard(){
  dispatch(addBoard({ title: 'New Board' }))
}
  return (
    <div className='sidebarContainer'>
      <div className="title">
        <h3>Boards</h3>
        <div className="expand" onClick={handleToggle}>›</div>
      </div>
      <button className='addBoardBtn'onClick={handelAddBoard}>+ Add Board</button>
      <div className="boards">
        {board.boards.map((singleBoard) => (
          <div className="boardName" key={singleBoard.id} onClick={() => dispatch(selectBoard(singleBoard.id))}
>
            {singleBoard.title}
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Sidebar
