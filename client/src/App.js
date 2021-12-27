
import TestComponent from './components/TestComponent/TestComponent.jsx';
import Dashboard from './components/Dashboard.jsx';
import { Routes, Route } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App" data-testid="main-app-div">
      <header className="App-header">

        <Routes>
          <Route path='/test' element={<TestComponent />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>

      </header>
    </div>
  );
}

export default App;
