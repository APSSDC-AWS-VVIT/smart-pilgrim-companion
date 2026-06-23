/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        temple: {
          gold: '#c89b3c',
          deep: '#17324d',
          warm: '#fbf4e8',
          saffron: '#f4b64f',
          ink: '#0f2235',
          muted: '#6b7280',
        },
      },
      boxShadow: {
        glow: '0 20px 45px rgba(23, 50, 77, 0.12)',
      },
      backgroundImage: {
        'temple-radial': 'radial-gradient(circle at top left, rgba(200, 155, 60, 0.22), transparent 36%), radial-gradient(circle at top right, rgba(23, 50, 77, 0.16), transparent 30%)',
      },
    },
  },
  plugins: [],
};