import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carga las variables de entorno para que estén disponibles durante el build
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Reemplaza process.env.API_KEY con el valor real durante la compilación
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});