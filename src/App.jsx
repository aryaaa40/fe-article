import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import AllPosts from './pages/AllPosts';
import AddNew from './pages/AddNew';
import EditPost from './pages/EditPost';
import Preview from './pages/Preview';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/posts/add" element={<AddNew />} />
          <Route path="/posts/edit/:id" element={<EditPost />} />
        </Route>
        
        <Route path="/preview" element={<Preview />} />
        
        <Route path="/" element={<Navigate to="/posts" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
