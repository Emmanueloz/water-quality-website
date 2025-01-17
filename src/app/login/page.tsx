'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!user.trim() || !password.trim()) {
      setError('Por favor, complete todos los campos.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Usuario: user, Contraseña: password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/');
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      padding: '10px',
    }}>
      <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Iniciar Sesión</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '400px',
          gap: '20px', // Ajustamos el espacio entre los elementos
          border: '3px solid #ddd',
          padding: '30px',
          borderRadius: '15px',
        }}
      >
        <label htmlFor="user" style={{ fontWeight: 'bold' }}>Usuario:</label>
        <input
          type="text"
          id="user"
          name="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '15px',
          }}
        />

        <label htmlFor="password" style={{ fontWeight: 'bold' }}>Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '15px',
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '6px',
            backgroundColor: isLoading ? '#aaa' : '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '15px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>

      {error && (
        <p style={{
          color: 'red',
          marginTop: '15px',
          fontWeight: 'bold',
        }}>
          {error}
        </p>
      )}
    </div>
  );
}
