import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Button } from '@mui/material';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CheckIcon from '@mui/icons-material/Check';


const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform:CSS.Transform.toString(transform),
    transition,
    marginBottom: '8px',
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      component={Paper}
      sx={{ padding: 1 }}
    >
      <ListItemText primary={children} />
    </ListItem>
  );
};

export const OrderQuestion = ({questionData,questionIndex,setHit}) => {
  const [options, setOptions] = useState(questionData.options);
  const [isSubmitted, setIsSubmitted] = useState(false); // Új állapot a gomb letiltásához
  const [correct,setCorrect]=useState(false)

console.log(options,questionData.answer);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor , { pressDelay: 200, activationConstraint: { distance: 10 } }), // Hozzáadva a TouchSensor
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = options.indexOf(active.id);
      const newIndex = options.indexOf(over.id);
      setOptions(arrayMove(options, oldIndex, newIndex));
    }
  };
 const handleSubmit = () => {
  if (isSubmitted) return;
  // Ellenőrzés, hogy az options állapot helyes sorrendben van-e
  const isCorrectOrder = options.every((option, index) => option === questionData.options[questionData.answer[index]]);
  if (isCorrectOrder) {
    setHit((prev) => prev + 1); // A hit számláló növelése
    setCorrect(true); // A helyes válasz kijelzése
  }
  setIsSubmitted(true);
};
  return (
    <>
    <Box sx={{ width:'100%', margin: 'auto',padding:'10px' }}>
      <Typography variant="h6" gutterBottom>
      {questionIndex}.{questionData.question}
      </Typography>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={options} strategy={verticalListSortingStrategy}>
          <List>
            {options.map((option) => (
              <SortableItem key={option} id={option}>
                {option}
              </SortableItem>
            ))}
          </List>
        </SortableContext>
      </DndContext>
    </Box>
    <div style={{display:'flex',gap:'5px',justifyContent:'center'}}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: "20px",display:'block' }}
          disabled={isSubmitted } >
        Save
        </Button>
        {correct && <CheckIcon sx={{color:'green',marginTop: "20px"}}/>}
      </div>
    </>
  );
};
