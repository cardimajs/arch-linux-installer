import { useContext } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './components/Layout';

import WelcomePage from './pages/Welcome';
import ParticionsPage from './pages/Particions';
import LocationPage from './pages/Location';
import KeyboardPage from './pages/Keyboard';
import UsersPage from './pages/Users';
import FinishPage from './pages/Finish';

import { MainContext } from './contexts/MainContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App() {
  const { theme } = useContext(MainContext);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/particions" element={<ParticionsPage/>} />
            <Route path="/location" element={<LocationPage/>} />
            <Route path="/keyboard" element={<KeyboardPage/>} /> 
            <Route path="/users"  element={<UsersPage/>} />
            <Route path="/finish"  element={<FinishPage/>} />
            <Route path="/"  element={<WelcomePage/>} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
