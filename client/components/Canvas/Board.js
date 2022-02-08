// import React, { useEffect, useRef, useState } from 'react';
// // import { Stage, Layer, Line } from 'react-konva';
// import { CirclePicker } from 'react-color';
// import Eraser from '../../../public/icons/eraser.svg';
// import Pencil from '../../../public/icons/pencil.svg';
// import { Howl } from 'howler';
// import { Link } from 'react-router-dom';
// import { Container, ButtonGroup, Button } from 'react-bootstrap';
// import socket from '../../socket';

// const audioClip = {
//   soundBrushStroke:
//     'https://algorithmic-8ball.neocities.org/zapsplat_industrial_paint_brush_long_single_stroke_001_11977.mp3',
// };

// const Board = () => {
//   //initializing state
//   const canvasRef = useRef(null);
//   const colorsRef = useRef(null);
//   const [selectedColor, setColor] = useState('#f44336');

//   useEffect(() => {
//     // --------------- getContext() method returns a drawing context on the canvas-----

//     const canvas = canvasRef.current;
//     const test = colorsRef.current;
//     const context = canvas.getContext('2d');

//     // ----------------------- Colors --------------------------------------------------

//     const colors = document.getElementsByClassName('color');
//     console.log(colors, 'the colors');
//     console.log(test);
//     // set the current color
//     const current = {
//       color: 'black',
//     };

//     // helper that will update the current color
//     const onColorUpdate = (e) => {
//       current.color = e.target.className.split(' ')[1];
//     };

//     // loop through the color elements and add the click event listeners
//     for (let i = 0; i < colors.length; i++) {
//       colors[i].addEventListener('click', onColorUpdate, false);
//     }
//     let drawing = false;

//     // ------------------------------- create the drawing ----------------------------

//     const drawLine = (x0, y0, x1, y1, color, emit) => {
//       context.beginPath();
//       context.moveTo(x0, y0);
//       context.lineTo(x1, y1);
//       context.strokeStyle = color;
//       context.lineWidth = 2;
//       context.stroke();
//       context.closePath();

//       if (!emit) {
//         return;
//       }
//       const w = canvas.width;
//       const h = canvas.height;

//       socket.emit('drawing', {
//         x0: x0 / w,
//         y0: y0 / h,
//         x1: x1 / w,
//         y1: y1 / h,
//         color,
//       });
//     };

//     // ---------------- mouse movement --------------------------------------

//     const onMouseDown = (e) => {
//       drawing = true;
//       current.x = e.clientX;
//       current.y = e.client;
//     };

//     const onMouseMove = (e) => {
//       if (!drawing) {
//         return;
//       }
//       drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
//       current.x = e.clientX;
//       current.y = e.clientY;
//     };

//     const onMouseUp = (e) => {
//       if (!drawing) {
//         return;
//       }
//       drawing = false;
//       drawLine(current.x, current.y, e.clientX, current.color, true);
//     };

//     // ----------- limit the number of events per second -----------------------

//     const throttle = (callback, delay) => {
//       let previousCall = new Date().getTime();
//       return function () {
//         const time = new Date().getTime();

//         if (time - previousCall >= delay) {
//           previousCall = time;
//           callback.apply(null, arguments);
//         }
//       };
//     };

//     // -----------------add event listeners to our canvas ----------------------

//     canvas.addEventListener('mousedown', onMouseDown, false);
//     canvas.addEventListener('mouseup', onMouseUp, false);
//     canvas.addEventListener('mouseout', onMouseUp, false);
//     canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

//     // Touch support for mobile devices
//     canvas.addEventListener('touchstart', onMouseDown, false);
//     canvas.addEventListener('touchend', onMouseUp, false);
//     canvas.addEventListener('touchcancel', onMouseUp, false);
//     canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

//     // -------------- make the canvas fill its parent component -----------------

//     const onResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     window.addEventListener('resize', onResize, false);
//     onResize();

//     // ----------------------- socket.io connection ----------------------------
//     const onDrawingEvent = (data) => {
//       const w = canvas.width;
//       const h = canvas.height;
//       drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
//     };

//     socket.on('drawing', onDrawingEvent);
//   }, []);

//   // ------------- The Canvas and color elements --------------------------

//   const getDataURI = () => {
//     const uri = stageRef.current.toDataURL();
//     console.log('this is the data url ', uri);
//     localStorage.setItem('dataURI', uri);
//   };

//   return (
//     <div className='board'>
//       <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
//       <span className='toolbox'>
//         <CirclePicker
//           color={selectedColor}
//           onChange={(e) => {
//             setColor(e.hex);
//           }}
//         />
//         <ButtonGroup vertical>
//           <Button
//             variant='outline-primary'
//             type='button'
//             value='eraser'
//             onClick={(e) => {
//               setTool(e.currentTarget.value);
//             }}
//           >
//             <Eraser />
//           </Button>
//           <Button
//             variant='outline-primary'
//             type='button'
//             value='pen'
//             className='toolbox-btn'
//             onClick={(e) => {
//               setTool(e.currentTarget.value);
//             }}
//           >
//             <Pencil />
//           </Button>
//           <Link to='/postdraw'>
//             <Button variant='outline-primary' onClick={getDataURI}>
//               end session
//             </Button>
//           </Link>
//         </ButtonGroup>
//       </span>
//     </div>
//   );
// };

// export default Board;
