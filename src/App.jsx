// src/App.jsx
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './Store/store';  // Ensure your store is properly set up in Store/store.js
import Dashboard from './components/DashBoard.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => { 
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
