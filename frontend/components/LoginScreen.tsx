import { useState } from 'react';

// Definimos qué datos esperamos recibir del usuario
interface UserData {
  id: number;
  username: string;
  coins: number;
  level: number;
  avatar: string;
}

interface LoginScreenProps {
  onLoginSuccess: (userData: UserData) => void;
}

export const LoginScreen = ({ onLoginSuccess }: LoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Petición al Backend
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        onLoginSuccess(data.user);
      } else {
        setError(data.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      backgroundColor: '#1a1a1a', // Fondo casi negro (igual que tu app)
      color: '#ffffff',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Tarjeta central */}
      <div style={{
        backgroundColor: '#2d2d2d', // Gris oscuro (estilo tarjeta)
        padding: '2.5rem', 
        borderRadius: '12px', 
        boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
        width: '350px',
        border: '1px solid #3d3d3d'
      }}>
        {/* Título con el color Naranja de tu app */}
        <h1 style={{ 
          fontSize: '2rem', 
          marginBottom: '2rem', 
          textAlign: 'center',
          color: '#FF9800', // <--- EL NARANJA DE LA APP
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          AnimeList
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaaaaa', fontSize: '0.9rem' }}>
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej: admin"
              style={{ 
                width: '100%', 
                padding: '0.8rem', 
                borderRadius: '6px', 
                border: '1px solid #4a4a4a', 
                backgroundColor: '#1a1a1a', // Input oscuro
                color: 'white',
                outline: 'none',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaaaaa', fontSize: '0.9rem' }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
              style={{ 
                width: '100%', 
                padding: '0.8rem', 
                borderRadius: '6px', 
                border: '1px solid #4a4a4a', 
                backgroundColor: '#1a1a1a', 
                color: 'white',
                outline: 'none',
                fontSize: '1rem'
              }}
            />
          </div>

          {error && (
            <div style={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.1)', 
              color: '#ef4444', 
              padding: '0.5rem', 
              borderRadius: '4px', 
              marginBottom: '1rem', 
              textAlign: 'center',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.9rem',
              backgroundColor: '#E65100', // <--- NARANJA INTENSO (Accent)
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              transition: 'background-color 0.2s',
              textTransform: 'uppercase'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FF9800'} // Highlight al pasar ratón
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#E65100'}
          >
            {loading ? 'Entrando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>

      <p style={{ marginTop: '2rem', color: '#666', fontSize: '0.8rem' }}>
        Proyecto Integrado 2º DAW
      </p>
    </div>
  );
};