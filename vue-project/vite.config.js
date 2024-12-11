import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser', // Wichtig für aws-amplify
    },
  },
});
