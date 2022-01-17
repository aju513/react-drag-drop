import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import Buttons from './components/Buttons';
import Input from './components/Input';
import onDragEnd from './logic/onDragEnd';
const allData = {
  [uuid()]: {
    name: `Today's task`,
    items: [],
  },

  [uuid()]: {
    name: 'In Progress',
    items: [],
  },
  [uuid()]: {
    name: 'Done',
    items: [],
  },
};

function App() {
  const localData = JSON.parse(localStorage.getItem('columns'));

  console.log(localData);
  const [columns, setColumns] = useState(localData ? localData : allData);
  console.log(columns);

  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          const removeButton = (i, returnedId, columnName) => {
            const columnCopy = column.items;
            const newColumn = columnCopy.filter(
              (item) => item !== columnCopy[i]
            );
            setColumns({
              ...columns,
              [returnedId]: {
                name: columnName,
                items: [...newColumn],
              },
            });
          };
          const handlerChange = (returnedId, columnName, enteredValue) => {
            setColumns({
              ...columns,
              [returnedId]: {
                name: columnName,
                items: [...column.items, { id: uuid(), content: enteredValue }],
              },
            });
          };
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              key={columnId}
            >
              <Input
                index={index}
                handlerChange={handlerChange}
                columnId={columnId}
                columnName={column.name}
              />

              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? 'lightblue'
                            : 'lightgrey',
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: 'none',
                                      padding: 16,
                                      margin: '0 0 8px 0',
                                      minHeight: '50px',
                                      backgroundColor: snapshot.isDragging
                                        ? '#263B4A'
                                        : '#456C86',
                                      color: 'white',
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <Buttons
                                      removeButton={removeButton}
                                      index={index}
                                      columnId={columnId}
                                      columnName={column.name}
                                    />
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
