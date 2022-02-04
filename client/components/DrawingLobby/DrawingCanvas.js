import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { CirclePicker } from 'react-color';
import Eraser from '../../../public/icons/eraser.svg';
import Pencil from '../../../public/icons/pencil.svg';
import { Howl } from 'howler';
import { Link } from 'react-router-dom';

const audioClip = {
  soundBrushStroke:
    'https://algorithmic-8ball.neocities.org/zapsplat_industrial_paint_brush_long_single_stroke_001_11977.mp3',
};

const DrawingCanvas = () => {
  //states
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  // const soundBrushStroke = useRef(false);
  const [selectedColor, setColor] = useState('#f44336');

  //sound: paintstroke
  const soundPlay = (src) => {
    const soundBrushStroke = new Howl({
      src,
      html5: true,
      volume: 0.09,
    });
    soundBrushStroke.play();
  };

  //mouse down event to start drawing
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    // soundBrushStroke = true;
    soundPlay(audioClip.soundBrushStroke);
    const pos = e.target.getStage().getPointerPosition();
    setLines([
      ...lines,
      { tool, points: [pos.x, pos.y], strokeColor: selectedColor },
    ]);
    console.log(lines);
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
  };

  //when user lets go of mouse click
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  // const changeEraser = (tool) => {

  // }

  var stageRef = useRef();

  const getDataURI = () => {
    const uri = stageRef.current.toDataURL();
    console.log('this is the data url ', uri);
    localStorage.setItem('dataURI', uri);
  };

  return (
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
        <Layer>
          {lines.map((line, i, strokeColor) => (
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
      {/* <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value='pen'>Pen</option>
        <option value='eraser'>Eraser</option>
      </select> */}
      <span className='toolbox'>
        <CirclePicker
          color={selectedColor}
          onChange={(e) => {
            setColor(e.hex);
          }}
        />
        <button
          type='button'
          value='eraser'
          className='toolbox-btn'
          onClick={(e) => {
            setTool(e.currentTarget.value);
          }}
        >
          <Eraser />
        </button>
        <button
          type='button'
          value='pen'
          className='toolbox-btn'
          onClick={(e) => {
            setTool(e.currentTarget.value);
          }}
        >
          <Pencil />
        </button>
      </span>
      <Link to='/postdraw'>
        <button onClick={getDataURI}>end session</button>
      </Link>
    </div>
  );
};

export default DrawingCanvas;
