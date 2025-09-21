import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/loginPages';
import RegisterPage from './pages/registerPage';
import TodoListPage from './pages/todoListPage';
import Header from './components/header';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideHeader && <Header />}
      <main className="pt-16">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <TodoListPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;