import { createRouter, createWebHistory } from 'vue-router';  // Importiere Router und History
import Login from '../components/Login.vue'; // Importiere Views
import Callback from '../components/CallbackHandler.vue';
import Messenger from "../components/messenger.vue"; // Importiere Views

// Definiere die Routen
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Login
    },
    {
        path: '/callback',
        name: 'Callback',
        component: Callback
    },
    {
        path: '/messenger',
        name: 'Messenger',
        component: Messenger
    }
];

// Erstelle den Router mit den definierten Routen
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // Anpassung für Vite
    routes
});

export default router;
