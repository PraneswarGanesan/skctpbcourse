// src/components/dashboards/EmployeeDashboard/components/Dashboard.js
import React, { useState } from 'react';
import { Box, Typography, Paper, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

// Sample data
const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Task 1', description: 'Description for Task 1' },
    'task-2': { id: 'task-2', content: 'Task 2', description: 'Description for Task 2' },
    'task-3': { id: 'task-3', content: 'Task 3', description: 'Description for Task 3' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Backlog',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-3'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const Dashboard = () => {
  const [data] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleClickOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Kanban Board
      </Typography>
      <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2 }}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return (
            <Paper
              key={column.id}
              sx={{
                p: 2,
                mx: 1,
                minWidth: '250px',
                maxWidth: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                minHeight: '100px',
                overflowY: 'auto',
              }}
            >
              <Typography variant="h6">{column.title}</Typography>
              <Divider sx={{ my: 1 }} />
              {tasks.map((task) => (
                <Paper
                  key={task.id}
                  sx={{
                    mb: 1,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    boxShadow: 1,
                    borderRadius: 1,
                    width: '100%', // Ensure tasks take full width of the column
                    maxWidth: '300px', // Ensure tasks do not exceed column width
                  }}
                >
                  {task.content}
                  <IconButton
                    sx={{ ml: 'auto' }}
                    onClick={() => handleClickOpen(task)}
                  >
                    <MoreVert />
                  </IconButton>
                </Paper>
              ))}
            </Paper>
          );
        })}
      </Box>

      {/* Dialog for Task Details */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          {selectedTask && (
            <>
              <Typography variant="h6">{selectedTask.content}</Typography>
              <Typography variant="body2">{selectedTask.description}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
