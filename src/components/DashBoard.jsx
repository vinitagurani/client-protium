// import { useSelector, useDispatch } from 'react-redux';
// import { useState, useEffect } from 'react';
// import TaskList from './TaskList';
// import TaskForm from './TaskForm';
// import TaskDetail from './TaskDetails';
// import Filter from './Filter';
// import CommentSection from './CommentSection';
// import Search from './Search';
// import '../App.css';
// import {
//   addTask,
//   updateTask,
//   setFilter,
//   selectTask,
//   addComment,
//   fetchTasks,
//   deleteTask // Import the deleteTask action
// } from '../Store/tasksSlice'; // Ensure the path is correct (case-sensitive)

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const tasks = useSelector((state) => state.tasks.tasks) || [];
//   const selectedTaskId = useSelector((state) => state.tasks.selectedTaskId);
//   const selectedTask = tasks.find((task) => task._id === selectedTaskId); // Use _id
//   const filters = useSelector((state) => state.tasks.filters);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Fetch tasks on component mount
//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   const handleTaskSubmit = async (task) => {
//     const newTask = { ...task, comments: [] }; // No need to set _id here
//     await dispatch(addTask(newTask));
//   };

//   const handleTaskUpdate = async (updatedTask) => {
//     await dispatch(updateTask({ id: updatedTask._id, updates: updatedTask }));
//   };

//   const handleCommentSubmit = async (taskId, comment) => {
//     await dispatch(addComment({ taskId, comment }));
//   };

//   const handleFilterChange = (name, value) => {
//     dispatch(setFilter({ [name]: value }));
//   };

//   const handleTaskSelect = (taskId) => {
//     if (selectedTaskId === taskId) {
//       dispatch(selectTask(null)); // Deselect if already selected
//     } else {
//       dispatch(selectTask(taskId)); // Select the new task
//     }
//   };

//   const handleTaskDelete = async (taskId) => {
//     try {
//       await dispatch(deleteTask(taskId)); // Call the deleteTask action
//       console.log('Task deleted successfully');
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   // Filtering tasks based on the filter criteria
//   const filteredTasks = tasks.filter((task) => {
//     const taskDueDate = new Date(task.dueDate);
//     const filterDueDate = new Date(filters.dueDate);

//     const isStatusMatch = filters.status ? task.status === filters.status : true;
//     const isPriorityMatch = filters.priority ? task.priority === filters.priority : true;
//     const isDueDateMatch = filters.dueDate 
//       ? taskDueDate.toDateString() === filterDueDate.toDateString() 
//       : true;

//     return isStatusMatch && isPriorityMatch && isDueDateMatch;
//   });

//   // Searching tasks based on the search term
//   const searchedTasks = filteredTasks.filter((task) => {
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();
//     return (
//       task.name.toLowerCase().includes(lowerCaseSearchTerm) ||
//       task.description.toLowerCase().includes(lowerCaseSearchTerm)
//     );
//   });

//   return (
//     <div className="dashboard container mt-4">
//       <h1 className="mb-4">Task Dashboard</h1>
//       <Search onSearch={setSearchTerm} />
//       <TaskForm 
//         onSubmit={handleTaskSubmit} 
//         selectedTaskId={selectedTaskId} 
//         tasks={tasks} 
//       />
//       <Filter onFilterChange={handleFilterChange} />
//       <TaskList 
//         tasks={searchedTasks} 
//         onTaskSelect={handleTaskSelect} 
//         onTaskDelete={handleTaskDelete} // Pass the delete handler here
//       />
//       {selectedTask && (
//         <>
//           <TaskDetail
//             task={selectedTask}
//             onUpdate={handleTaskUpdate}
//           />
//           <CommentSection 
//             taskId={selectedTaskId} 
//             onComment={handleCommentSubmit} 
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskDetail from './TaskDetails';
import Filter from './Filter';
import CommentSection from './CommentSection';
import Search from './Search';
import ClipLoader from 'react-spinners/ClipLoader'; // Import spinner
import '../App.css';
import {
  addTask,
  updateTask,
  setFilter,
  selectTask,
  addComment,
  fetchTasks,
  deleteTask,
} from '../Store/tasksSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks) || [];
  const loading = useSelector((state) => state.tasks.loading); // Access loading state
  const selectedTaskId = useSelector((state) => state.tasks.selectedTaskId);
  const selectedTask = tasks.find((task) => task._id === selectedTaskId);
  const filters = useSelector((state) => state.tasks.filters);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleTaskSubmit = async (task) => {
    const newTask = { ...task, comments: [] };
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
    if (selectedTaskId === taskId) {
      dispatch(selectTask(null));
    } else {
      dispatch(selectTask(taskId));
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await dispatch(deleteTask(taskId));
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const taskDueDate = new Date(task.dueDate);
    const filterDueDate = new Date(filters.dueDate);
    const isStatusMatch = filters.status ? task.status === filters.status : true;
    const isPriorityMatch = filters.priority ? task.priority === filters.priority : true;
    const isDueDateMatch = filters.dueDate 
      ? taskDueDate.toDateString() === filterDueDate.toDateString() 
      : true;
    return isStatusMatch && isPriorityMatch && isDueDateMatch;
  });

  const searchedTasks = filteredTasks.filter((task) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      task.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      task.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="dashboard container mt-4">
      {loading && (
        <div className="spinner-container">
          <ClipLoader color="#007bff" loading={loading} size={50} />
        </div>
      )}
      
      <h1 className="mb-4">Task Dashboard</h1>
      <Search onSearch={setSearchTerm} />
      <TaskForm 
        onSubmit={handleTaskSubmit} 
        selectedTaskId={selectedTaskId} 
        tasks={tasks} 
      />

    {/* <TaskForm onSubmit={handleTaskSubmit} selectedTaskId={selectedTaskId} tasks={tasks} users={users} /> */}

      <Filter onFilterChange={handleFilterChange} />
      <TaskList 
        tasks={searchedTasks} 
        onTaskSelect={handleTaskSelect} 
        onTaskDelete={handleTaskDelete}
      />
      {selectedTask && (
        <>
          <TaskDetail task={selectedTask} onUpdate={handleTaskUpdate} />
          <CommentSection taskId={selectedTaskId} onComment={handleCommentSubmit} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
