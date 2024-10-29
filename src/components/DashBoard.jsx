import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskDetail from './TaskDetails';
import Filter from './Filter';
import CommentSection from './CommentSection';
import Search from './Search';
import '../App.css';
import {
  addTask,
  updateTask,
  setFilter,
  selectTask,
  addComment,
  fetchTasks,
} from '../Store/tasksSlice'; // Ensure the path is correct (case-sensitive)

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks) || [];
  const selectedTaskId = useSelector((state) => state.tasks.selectedTaskId);
  const selectedTask = tasks.find((task) => task._id === selectedTaskId); // Use _id
  const filters = useSelector((state) => state.tasks.filters);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleTaskSubmit = async (task) => {
    const newTask = { ...task, _id: Date.now().toString(), comments: [] }; // Ensure _id is a string
    await dispatch(addTask(newTask));
  };

  const handleTaskUpdate = async (updatedTask) => {
    await dispatch(updateTask({ id: updatedTask._id, updates: updatedTask }));
  };

  const handleCommentSubmit = async (taskId, comment) => {
    await dispatch(addComment({ taskId, comment }));
  };

  const handleFilterChange = (name, value) => {
    dispatch(setFilter({ [name]: value }));
  };

  const handleTaskSelect = (taskId) => {
    // Toggle task selection
    if (selectedTaskId === taskId) {
      dispatch(selectTask(null)); // Deselect if already selected
    } else {
      dispatch(selectTask(taskId)); // Select the new task
    }
  };

  // Filtering tasks based on the filter criteria
  const filteredTasks = tasks.filter((task) => {
    const taskDueDate = new Date(task.dueDate);
    const filterDueDate = new Date(filters.dueDate);
  
    const isStatusMatch = filters.status ? task.status === filters.status : true;
    const isPriorityMatch = filters.priority ? task.priority === filters.priority : true;
    
    // Check if the filter due date is set
    const isDueDateMatch = filters.dueDate 
      ? taskDueDate.toDateString() === filterDueDate.toDateString() 
      : true;
  
    return isStatusMatch && isPriorityMatch && isDueDateMatch;
  });
  
  

  // Searching tasks based on the search term
  const searchedTasks = filteredTasks.filter((task) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      task.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      task.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="dashboard container mt-4">
      <h1 className="mb-4">Task Dashboard</h1>
      <Search onSearch={setSearchTerm} />
      <TaskForm onSubmit={handleTaskSubmit} />
      <Filter onFilterChange={handleFilterChange} />
      <TaskList 
        tasks={searchedTasks} 
        onTaskSelect={handleTaskSelect} 
        selectedTaskId={selectedTaskId} 
      />
      {selectedTask && (
        <>
          <TaskDetail
            task={selectedTask}
            onUpdate={handleTaskUpdate}
          />
          <CommentSection 
            taskId={selectedTaskId} 
            onComment={handleCommentSubmit} 
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
