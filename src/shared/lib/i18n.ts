import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to My Spotify",
      "login_with_spotify": "Login with Spotify",
      "toggle_theme": "Toggle Theme ({{theme}})",
      "language": "Language",
      "english": "English",
      "brazilian_portuguese": "Brazilian Portuguese",
      "spanish": "Spanish",
      "loading_user_data": "Loading user data...",
      "error_loading_user_data": "Error loading user data.",
      "not_logged_in": "Not logged in.",
      "welcome_user": "Welcome, {{userName}}",
      "loading_playlists": "Loading playlists...",
      "error_loading_playlists": "Error loading playlists",
      "no_playlists_found": "No playlists found.",
      "your_playlists": "Your Playlists",
      "authentication_failed_message": "Authentication failed. Please try logging in again.",
    },
  },
  'pt-BR': {
    translation: {
      "welcome": "Bem-vindo ao Meu Spotify",
      "login_with_spotify": "Entrar com Spotify",
      "toggle_theme": "Alternar Tema ({{theme}})",
      "language": "Idioma",
      "english": "Inglês",
      "brazilian_portuguese": "Português Brasileiro",
      "spanish": "Espanhol",
      "loading_user_data": "Carregando dados do usuário...",
      "error_loading_user_data": "Erro ao carregar dados do usuário.",
      "not_logged_in": "Não conectado.",
      "welcome_user": "Bem-vindo, {{userName}}",
      "loading_playlists": "Carregando playlists...",
      "error_loading_playlists": "Erro ao carregar playlists",
      "no_playlists_found": "Nenhuma playlist encontrada.",
      "your_playlists": "Suas Playlists",
      "authentication_failed_message": "Autenticação falhou. Por favor, tente fazer login novamente.",
    },
  },
  es: {
    translation: {
      "welcome": "Bienvenido a Mi Spotify",
      "login_with_spotify": "Iniciar sesión con Spotify",
      "toggle_theme": "Cambiar Tema ({{theme}})",
      "language": "Idioma",
      "english": "Inglés",
      "brazilian_portuguese": "Portugués Brasileño",
      "spanish": "Español",
      "loading_user_data": "Cargando datos del usuario...",
      "error_loading_user_data": "Error al cargar datos del usuario.",
      "not_logged_in": "No ha iniciado sesión.",
      "welcome_user": "Bienvenido, {{userName}}",
      "loading_playlists": "Cargando listas de reproducción...",
      "error_loading_playlists": "Error al cargar listas de reproducción",
      "no_playlists_found": "No se encontraron listas de reproducción.",
      "your_playlists": "Tus Listas de Reproducción",
      "authentication_failed_message": "La autenticación falló. Por favor, intente iniciar sesión de nuevo.",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || 'en' : 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
