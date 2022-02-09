import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { CirclePicker } from 'react-color';
import Eraser from '../../../public/icons/eraser.svg';
import Pencil from '../../../public/icons/pencil.svg';
import { Howl } from 'howler';
import { Link, useHistory } from 'react-router-dom';
import { Container, ButtonGroup, Button } from 'react-bootstrap';
import socket from '../../socket';

// const audioClip = {
//   soundBrushStroke:
//     'https://algorithmic-8ball.neocities.org/zapsplat_industrial_paint_brush_long_single_stroke_001_11977.mp3',
// };

const DrawingCanvas = () => {
  //states
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  // const stageRef = useRef(null);
  const stageRef = React.createRef();
  // const soundBrushStroke = useRef(false);
  const [selectedColor, setColor] = useState('#f44336');
  const history = useHistory();

  //'COMPONENTDIDMOUNT'
  useEffect(() => {
    socket.on('is-drawing', (lines) => {
      setLines(lines);
    });
  }, [lines]);

  useEffect(()=>{
    socket.on('ending-session',()=>{
      getDataURI()
      history.push('/PostDraw');
    })
  },[])

  //sound: paintstroke
  // const soundPlay = (src) => {
  //   const soundBrushStroke = new Howl({
  //     src,
  //     html5: true,
  //     volume: 0.02,
  //   });
  //   soundBrushStroke.play();
  // };

  //mouse down event to start drawing
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    // soundBrushStroke = true;
    // soundPlay(audioClip.soundBrushStroke);
    const pos = e.target.getStage().getPointerPosition();
      setLines([
        ...lines,
        {
          tool,
          points: [pos.x, pos.y],
          strokeColor: selectedColor,
        },
      ])
  };

  //mouse movement
  const handleMouseMove = (e) => {
    //no drawing - skipping
    if (!isDrawing.current) {
      return;
    }

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    //add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    //replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
    socket.emit('is-drawing', lines);
  };

  //when user lets go of mouse click
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const endSession = () =>{
    const roomId = window.localStorage.getItem('roomId')
    socket.emit('end-session', roomId);
    getDataURI();
  }

  const getDataURI = () => {
    const uri = stageRef.current.toDataURL();
    localStorage.setItem('dataURI', uri);
  };
  
  const host = window.localStorage.getItem('host')
  return (
    <Container>
      <div className='drawingLobby'>
        <Stage
          width={1600}
          height={600}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ border: '1px solid black' }}
          ref={stageRef}
        >
          {/*layer can have an id, clearBeforeDraw set  false to prevent canvas clear*/}
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.strokeColor}
                strokeWidth={5}
                tension={0.5}
                lineCap='round'
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
        <span className='toolbox'>
          <CirclePicker
            color={selectedColor}
            onChange={(e) => {
              setColor(e.hex);
            }}
          />
          <ButtonGroup vertical>
            <Button
              variant='outline-primary'
              type='button'
              value='eraser'
              onClick={(e) => {
                setTool(e.currentTarget.value);
              }}
            >
              <Eraser />
            </Button>
            <Button
              variant='outline-primary'
              type='button'
              value='pen'
              className='toolbox-btn'
              onClick={(e) => {
                setTool(e.currentTarget.value);
              }}
            >
              <Pencil />
            </Button>
            {host === 'true' ? (
              <Link to='/postdraw'>
                <Button variant='outline-primary' onClick={endSession}>
                  end session
                </Button>
              </Link>
            ):(<br/>)} 
            
          </ButtonGroup>
        </span>
      </div>
    </Container>
  );
};

export default DrawingCanvas;
