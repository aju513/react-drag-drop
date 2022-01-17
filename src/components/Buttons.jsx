import React from 'react';

const Buttons = ({ index, removeButton, columnId, columnName }) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => removeButton(index, columnId, columnName)}
      >
        remove
      </button>
    </div>
  );
};

export default Buttons;
