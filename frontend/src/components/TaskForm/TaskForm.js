import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, Modal, Typography, TextField, Button, 
  MenuItem, Stack, IconButton 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { config } from "../../index";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const TaskModal = ({ open, handleClose, onTaskAdded, onTaskUpdated, editData }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'TODO',
    deadline: '',
    linkedFile: null
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData && open) {
      setTaskData({
        title: editData.title,
        description: editData.description,
        status: editData.status,
        deadline: editData.deadline ? editData.deadline.split('T')[0] : '',
        linkedFile: null
      });
    } else if (open) {
      setTaskData({ title: '', description: '', status: 'TODO', deadline: '', linkedFile: null });
    }
  }, [editData, open]);

  const validate = () => {
    let tempErrors = {};
    if (!taskData.title.trim()) tempErrors.title = "Title is required";
    if (!taskData.description.trim()) tempErrors.description = "Description is required";
    if (!taskData.deadline) tempErrors.deadline = "Deadline is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e) => {
    setTaskData({ ...taskData, linkedFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (editData) {
        const { data } = await axios.patch(`${config.backendPoint}/api/tasks/update`, 
          { id: editData._id, ...taskData }, 
          { withCredentials: true }
        );
        if (data.success) onTaskUpdated(data.task);
      } else {
        const { data } = await axios.post(`${config.backendPoint}/api/tasks/create`, 
          taskData, 
          { withCredentials: true }
        );
        if (data.success) onTaskAdded(data.task);
      }
      handleClose(); 
    } catch (err) {
      setErrors({ submit: "Failed to save task." });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="600" color="#2c3e50">
            {editData ? "Edit Task" : "Create New Task"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {errors.submit && <Typography color="error">{errors.submit}</Typography>}
            
            <TextField
              fullWidth
              label="Task Title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              color="success"
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={3}
              value={taskData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              color="success"
            />

            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={taskData.status}
              onChange={handleChange}
              color="success"
            >
              <MenuItem value="TODO">TODO</MenuItem>
              <MenuItem value="DONE">DONE</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Deadline"
              name="deadline"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={taskData.deadline}
              onChange={handleChange}
              error={!!errors.deadline}
              helperText={errors.deadline}
              color="success"
            />

            <Button
              variant="outlined"
              component="label"
              color="success"
              sx={{ textTransform: 'none' }}
            >
              Upload Linked File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            
            {taskData.linkedFile && (
              <Typography variant="caption" color="textSecondary">
                Selected: {taskData.linkedFile.name}
              </Typography>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ 
                mt: 2, 
                bgcolor: '#2ecc71', 
                '&:hover': { bgcolor: '#27ae60' },
                py: 1.5,
                fontWeight: 'bold'
              }}
            >
              {editData ? "Update Task" : "Create Task"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskModal;