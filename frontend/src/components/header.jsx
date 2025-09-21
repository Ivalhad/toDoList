import { useNavigate } from 'react-router-dom';
import Button from './button';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  return (
    <header className="bg-blue-500 text-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">To-Do List</h1>
        {token && (
           <div className="flex items-center space-x-4">
           <span className="hidden sm:block">Halo, {name}!</span>
           <Button onClick={handleLogout} secondary>
             Logout
           </Button>
         </div>
        )}
      </div>
    </header>
  );
};

export default Header;