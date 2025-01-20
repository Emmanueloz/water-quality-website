'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!user.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Por favor, complete todos los campos.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Usuario: user, Contraseña: password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/login');
      } else {
        setError(data.message || 'Error al registrar el usuario');
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
      <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Registro de Usuario</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '400px',
          gap: '20px',
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

        <label htmlFor="confirmPassword" style={{ fontWeight: 'bold' }}>Confirmar Contraseña:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          {isLoading ? 'Registrando...' : 'Registrar Usuario'}
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
