import React from 'react';
import { Box, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DBQuestion } from '../../lib/appwrite';
import { DragIndicator, ExpandLess, ExpandMore } from '@mui/icons-material';


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

export default function OrderQuestion({question}: {question: DBQuestion}) {
  const [options, setOptions] = React.useState(question.options.sort(() => Math.random() - 0.5));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!active.id || !over.id) return;
    if (active.id !== over.id) {
      const oldIndex = options.indexOf(active.id);
      const newIndex = options.indexOf(over.id);
      setOptions(arrayMove(options, oldIndex, newIndex));
    }
  };
  
  const sensors = useSensors(useSensor(PointerSensor, {activationConstraint: {distance: 10}}));

  return (
    <Box sx={{ width:'100%' }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={options}
          strategy={verticalListSortingStrategy}
        >
          <List>
            {options.map((option, index, array) => (
              <SortableItem key={option} id={option} >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DragIndicator sx={{':hover': {cursor: 'grab'}, ':active': {cursor:'grabbing'}}} />
                  {option}
                  <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', gap: 1 }}>
                    <Button type='button' onClick={()=>handleDragEnd({active:{id:option},over:{id:array[index-1]}})}><ExpandLess /></Button>
                    <Button type='button' onClick={()=>handleDragEnd({active:{id:option},over:{id:array[index+1]}})}><ExpandMore /></Button>
                  </Box>
                </Box>
              </SortableItem>
            ))}
          </List>
        </SortableContext>
      </DndContext>
    </Box>
  );
};
