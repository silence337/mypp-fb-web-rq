import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()], //tsconfigPaths는 tsconfig.json 을 인식하고 tsconfig.json 없이는 tsconfig.app.json 은 인식 못하네.
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          reactRouter: ['react-router-dom'],
          lottie: ['lottie-web'],
          //axios: ['axios'],
          fbApp: ['@firebase/app'],
          fbAuth: ['@firebase/auth'],
          fbStore: ['@firebase/firestore'],
        },
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     return 'vendor';
        //   }
        // },
      },
    },
  },
});
