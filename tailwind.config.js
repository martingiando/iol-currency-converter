export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5F37FF',
          light: '#EDE9FE',
          icon: '#8C78E6',
        },
        header: '#05053C',
        surface: '#FFFFFF',
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
