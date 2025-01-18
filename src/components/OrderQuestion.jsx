import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


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

export const OrderQuestion = ({questionData,questionIndex}) => {
  const [options, setOptions] = useState(questionData.options);

  const sensors = useSensors(
    useSensor(PointerSensor),
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

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
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
  );
};
