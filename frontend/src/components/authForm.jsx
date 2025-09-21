import { useState } from 'react';
import Input from './input';
import Button from './button';

const AuthForm = ({ isRegister = false, onSubmit }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" fullWidth>
        {isRegister ? 'Daftar' : 'Masuk'}
      </Button>
    </form>
  );
};

export default AuthForm;