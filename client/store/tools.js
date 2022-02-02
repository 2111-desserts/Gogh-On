// //action types
// const SELECT_TOOL = 'SELECT_TOOL';
// const CHANGE_SIZE = 'CHANGE_SIZE';
// const CHANGE_COLOR = 'CHANGE_COLOR';
// const RESET_CANVAS = 'RESET_CANVAS';
// const SAVE_CANVAS = 'SAVE_CANVAS';

// export const BRUSH = 'BRUSH';
// export const ERASER = 'ERASER';

// //action types
// export const selectTool = (text) => ({
//   type: SELECT_TOOL,
//   text,
// });

// export const changeSize = (text) => ({
//   type: CHANGE_SIZE,
//   text,
// });
// export const changeColor = (color) => ({
//   type: CHANGE_COLOR,
//   color,
// });
// export const clearCanvas = () => ({
//   type: RESET_CANVAS,
// });
// export const savingCanvas = (save) => ({
//   type: SAVE_CANVAS,
//   save,
// });

// //reducer
// const initialState = {
//   tool: BRUSH,
//   brush_size: '10',
//   background_color: '#FFFFFF',
//   brush_color: '#f44336',
//   saveCanvas: 'false',
//   resetCanvas: 'false',
//   isDrawing: 'false',
// };

// export default function tools(state = initialState, action) {
//   switch (action.type) {
//     case ERASER:
//       return (
//         { ...state },
//         {
//           tool: action.tool,
//           brush_color: '#fff',
//           brush_size: '20',
//         }
//       );
//     case BRUSH:
//       return (
//         { ...state },
//         {
//           tool: action.tool,
//         }
//       );
//     case CHANGE_SIZE:
//       return (
//         { ...state },
//         {
//           brush_size: action.text,
//         }
//       );
//     case CHANGE_COLOR:
//       return {
//         brush_color: action.color,
//       };
//     case SELECT_TOOL:
//       return (
//         { ...state },
//         {
//           tool: action.text,
//         }
//       );
//     case RESET_CANVAS:
//       return (
//         { ...state },
//         {
//           canvas: initialState.canvas,
//         }
//       );
//     default:
//       return state;
//   }
// }
