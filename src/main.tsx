import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("Main.tsx: Starting application");
const rootElement = document.getElementById("root");
if (rootElement) {
  console.log("Main.tsx: Root element found, creating React root");
  createRoot(rootElement).render(<App />);
} else {
  console.error("Main.tsx: Root element not found!");
}
