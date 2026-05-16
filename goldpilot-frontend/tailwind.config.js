/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色调
        bg: '#f4f7fa',
        paper: '#ffffff',
        ink: '#1d252d',
        muted: '#667482',
        line: '#dfe6ec',
        'line-dark': '#c8d2dc',
        // 功能色
        green: '#0f9f6e',
        'green-soft': '#eafaf3',
        red: '#e3342f',
        'red-soft': '#fff0f0',
        blue: '#1769e0',
        'blue-soft': '#edf5ff',
        amber: '#b97800',
        'amber-soft': '#fff8e6',
      },
      boxShadow: {
        'panel': '0 14px 34px rgba(25, 44, 63, 0.08)',
      }
    },
  },
  plugins: [],
}
