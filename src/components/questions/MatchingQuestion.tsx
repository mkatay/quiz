import React from 'react';
import { Box, Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
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

export default function MatchingQuestion({question}: {question: DBQuestion}) {
  const [match, setMatch] = React.useState(question.matches.sort(() => Math.random() - 0.5));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!active.id || !over.id) return;
    if (active.id !== over.id) {
      const oldIndex = match.indexOf(active.id);
      const newIndex = match.indexOf(over.id);
      setMatch(arrayMove(match, oldIndex, newIndex));
    }
  };
  
  const sensors = useSensors(useSensor(PointerSensor, {activationConstraint: {distance: 10}}));

  return (
    <Box sx={{ width:'100%', display: 'flex', gap: 2 }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={match}
          strategy={verticalListSortingStrategy}
        >
          <List sx={{ width: '100%' }}>
            {match.map((option, index, array) => (
              <Box key={option}>
                <Typography variant='h6' sx={{ padding: 1 }}>
                  {question.options[index]}
                </Typography>
                <SortableItem id={option} >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DragIndicator sx={{':hover': {cursor: 'grab'}, ':active': {cursor:'grabbing'}}} />
                    {option}
                    <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', gap: 1 }}>
                      <Button type='button' onClick={()=>handleDragEnd({active:{id:option},over:{id:array[index-1]}})}><ExpandLess /></Button>
                      <Button type='button' onClick={()=>handleDragEnd({active:{id:option},over:{id:array[index+1]}})}><ExpandMore /></Button>
                    </Box>
                  </Box>
                </SortableItem>
              </Box>
            ))}
          </List>
        </SortableContext>
      </DndContext>
    </Box>
  );
};
