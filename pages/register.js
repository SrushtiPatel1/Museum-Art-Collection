import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '@/lib/authenticate';
import { Card, Button, FormControl, Alert } from 'react-bootstrap';

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    const success = await registerUser(username, password, password2);
    if (success) {
      router.push('/login');
    } else {
      setError('Registration failed');
    }
  };

  return (
    <div>
      <br />
      <br />
      <Card style={{ backgroundColor: '#333', color: '#fff' }}>
        <Card.Body>
          <h1>Register</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
