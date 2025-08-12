import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { ThemeProvider, darkTheme } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider value={darkTheme}>
    <App />
  </ThemeProvider>
)
