import React from 'react';
import { BRUSH, ERASER } from '../../store/tools';

const ToolSelector = (props) => {
  const { action, tool } = props;

  return (
    <div className='toolbox'>
      <div className='toolImage'>
        <input
          type='radio'
          name='tool'
          id='brush-select'
          value={BRUSH}
          checked={tool === BRUSH}
          onChange={(e) => {
            action(e.target.value);
          }}
        />
        <label htmlFor='brush-select'>BRUSH</label>
      </div>
    </div>
  );
};

export default ToolSelector;
