import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import PlanPage from './components/PlanPage';
import UsersPage from './pages/UsersPage/UsersPage';
import CreateUserPage from './pages/CreateUserPage/CreateUserPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <Body>
      <Toaster position="top-right" />
      <Header onLoginToggle={() => setIsLoginOpen(true)} />
      <LoginModal
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
      <Main>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/plan"
            element={<ProtectedRoute requiredRole='user'>
              <PlanPage />
            </ProtectedRoute>} />
          <Route path="/admin">
            <Route path='user/create'
              element={<ProtectedRoute requiredRole="admin">
                <CreateUserPage />
              </ProtectedRoute>}
            />
          </Route>
        </Routes>
      </Main>
    </Body>
  );
}

const Body = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
  color: #333;
`;

const Main = styled.main`
  padding: 10px 20px;
`;


export default App;