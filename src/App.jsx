/**
 * App root component.
 * Single Responsibility: renders the current page.
 * Currently renders the HomeRegister page.
 */

import './App.css';
import RegisterPage from './pages/Register';

function App() {
  return <RegisterPage />;
}

export default App;
