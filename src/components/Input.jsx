import React from 'react';
import { useState } from 'react';

const Input = ({ index, handlerChange, columnId, columnName }) => {
  const [value, setValue] = useState('');

  return (
    <div>
      <input placeholder={value} onChange={(e) => setValue(e.target.value)} />
      <button
        onClick={() => handlerChange(columnId, columnName, value)}
        type="submit"
      >
        {index}
      </button>
    </div>
  );
};

export default Input;
