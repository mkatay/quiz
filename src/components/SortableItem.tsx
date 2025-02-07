import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ListItem, ListItemText, Paper } from '@mui/material';

export default function SortableItem({ id, children }) {
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