import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://server-protium.onrender.com/api/tasks';

const initialState = {
  tasks: [],
  selectedTaskId: null,
  filters: {
    status: '',
    priority: '',
    dueDate: '',
  },
  loading: false,
  error: null,
};

// Async Thunks for API calls
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(BASE_URL);
  return response.data; // Ensure the API returns an array
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  try {
    const response = await axios.post(BASE_URL, task);
    return response.data; // Ensure the API returns the newly created task
  } catch (error) {
    console.error("Error while adding task:", error.response.data); // Log error response
    throw error; // Rethrow error to handle it in the slice
  }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updates }) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, updates);
  return response.data; // Ensure the API returns the updated task
});

export const addComment = createAsyncThunk('tasks/addComment', async ({ taskId, comment }) => {
  const response = await axios.post(`${BASE_URL}/${taskId}/comments`, { text: comment });
  return response.data; // Ensure the API returns the updated task with comments
});

// New thunk for deleting a comment
export const deleteComment = createAsyncThunk('tasks/deleteComment', async ({ taskId, commentId }) => {
  await axios.delete(`${BASE_URL}/${taskId}/comments/${commentId}`); // Perform the delete request
  return { taskId, commentId }; // Return the taskId and commentId
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    selectTask: (state, action) => {
      state.selectedTaskId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on fetch
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = Array.isArray(action.payload)
          ? action.payload.map((task) => ({
              ...task,
              comments: task.comments || [], // Initialize comments if not present
            }))
          : []; // Ensure tasks is an array
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Handle error
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push({
          ...action.payload,
          comments: [], // Initialize comments for new task
        });
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload; // The payload should be the updated task
        const taskIndex = state.tasks.findIndex((task) => task._id === updatedTask._id); // Use _id for matching

        if (taskIndex !== -1) {
          state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask }; // Merge updated fields
        } else {
          console.error(`Task with ID ${updatedTask._id} not found for update.`); // Debugging message
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const updatedTask = action.payload; // API should return updated task with comments
        const taskIndex = state.tasks.findIndex((task) => task._id === updatedTask._id); // Match with _id

        if (taskIndex !== -1) {
          state.tasks[taskIndex] = updatedTask; // Replace task with updated task
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { taskId, commentId } = action.payload;
        const taskIndex = state.tasks.findIndex((task) => task._id === taskId); // Find the task

        if (taskIndex !== -1) {
          // Filter out the deleted comment
          state.tasks[taskIndex].comments = state.tasks[taskIndex].comments.filter(comment => comment._id !== commentId);
        }
      });
  },
});

export const { setFilter, selectTask } = tasksSlice.actions;
export default tasksSlice.reducer;
