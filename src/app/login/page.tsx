'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
    } else {
      setError(data.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label className="input-label" htmlFor="user">Usuario:</label>
          <input
            type="text"
            id="user"
            name="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            className="input-field"
          />
          
          <label className="input-label" htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <Link href="/" passHref>
            <button type="submit" disabled={isLoading} className="btn-submit">
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </Link>

        </form>
        
        {error && <p className="error-message">{error}</p>}

      </div>
    </div>
  );
}
