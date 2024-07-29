import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminLogin from './Components/Login';
import Register from './Components/Register';
import TodoList from './Components/TodoList'


const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<AdminLogin/>} />
          <Route path="/login" element={<AdminLogin/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/employee" element={ <TodoList />} />
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;
