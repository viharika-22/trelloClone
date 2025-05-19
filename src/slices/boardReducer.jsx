import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  boards: [
    {
      id: "board-1",
      title: "Project Alpha",
      lists: [
        {
          id: "list-1",
          title: "To Do",
          cards: [
            { id: "card-1", content: "Design homepage" },
            { id: "card-2", content: "Create login flow" },
          ],
        },
        {
          id: "list-2",
          title: "Doing",
          cards: [
            { id: "card-3", content: "Build header component" },
            { id: "card-5", content: "Build header component" },
          ],
        },
        {
          id: "list-3",
          title: "Done",
          cards: [{ id: "card-4", content: "Setup project repo" }],
        },
      ],
    },
  ],
  selectedBoardId: "board-1",
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      const { title } = action.payload;
      const newBoard = {
        id: nanoid(),
        title,
        lists: [
          { id: nanoid(), title: "To Do", cards: [] },
          { id: nanoid(), title: "Doing", cards: [] },
          { id: nanoid(), title: "Done", cards: [] },
        ],
      };
      state.boards.push(newBoard);
    },
    selectBoard: (state, action) => {
      state.selectedBoardId = action.payload;
    },
    addCardToList: (state, action) => {
      const { boardId, listId, content } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (!board) return;

      const list = board.lists.find((l) => l.id === listId);
      if (!list) return;

      list.cards.push({
        id: nanoid(),
        content,
      });
    },
    addList: (state, action) => {
      const { boardId, title } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        board.lists.push({
          id: nanoid(),
          title,
          cards: [],
        });
      }
    },
    addListToBoard: (state, action) => {
      const { boardId, title } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        const newList = {
          id: Date.now(),
          title,
          cards: [],
        };
        board.lists.push(newList);
      }
    },
    updateBoardTitle: (state, action) => {
  const { boardId, newTitle } = action.payload;
  const board = state.boards.find(b => b.id === boardId);
  if (board) {
    board.title = newTitle;
  }
},
moveCard: (state, action) => {
  const { source, destination } = action.payload;

  const board = state.boards.find((b) => b.id === state.selectedBoardId);
  if (!board) return;

  const sourceList = board.lists.find((list) => list.id === source.droppableId);
  const destList = board.lists.find((list) => list.id === destination.droppableId);

  if (!sourceList || !destList) return;

  const [movedCard] = sourceList.cards.splice(source.index, 1);

  if (!movedCard) return;

  destList.cards.splice(destination.index, 0, movedCard);
}


  },
});

export const { addBoard, selectBoard, addCardToList, addList,addListToBoard,updateBoardTitle,moveCard } =
  boardSlice.actions;
export default boardSlice.reducer;
