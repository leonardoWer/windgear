/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        create: {
          bg: '#121212',        // Глубокий темный, почти черный
          panel: '#1e1e1e',     // Чуть светлее для карточек
          copper: '#b87333',    // Медь
          brass: '#c5a059',     // Латунь
          text: '#e0e0e0',
          muted: '#888888',
        }
      },
      fontFamily: {
        'mc': ['MinecraftHeading','monospace'],
        'sans': ['MinecraftBody','Inter', 'sans-serif'],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
      }
    },
  },
  plugins: [],
}