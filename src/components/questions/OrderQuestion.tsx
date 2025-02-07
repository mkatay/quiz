import React from 'react';
import { Box, Button, List } from '@mui/material';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { DBQuestion } from '../../lib/appwrite';
import { DragIndicator, ExpandLess, ExpandMore } from '@mui/icons-material';
import SortableItem from '../SortableItem';


export default function OrderQuestion(
  {question, state, setState, reveal}: {question: DBQuestion, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>, reveal?: boolean}
) {

  React.useEffect(() => {
    if (!state?.length) setState([...question.options].sort(() => Math.random() - 0.5));
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!active.id || !over.id) return;
    if (active.id !== over.id) {
      const oldIndex = state.indexOf(active.id);
      const newIndex = state.indexOf(over.id);
      setState(arrayMove(state, oldIndex, newIndex));
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
          items={state || []}
          strategy={verticalListSortingStrategy}
        >
          <List>
            {state?.map((option, index, array) => (
              <SortableItem key={option} id={option} sx={{
                border: reveal ? 2 : 'none',
                borderColor: (t) => option === question.options[index] ? t.palette.success.dark : t.palette.error.dark
              }}>
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
