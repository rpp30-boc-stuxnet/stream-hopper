import logo from './logo.svg';
import TestComponent from './components/TestComponent/TestComponent.jsx';

import './App.css';


function App() {
  return (
    <div className="App" data-testid="main-app-div">
      <header className="App-header">
        <p>Stream Hopper</p>
        <img src={logo} className="App-logo" alt="logo" />
        <TestComponent />
      </header>
    </div>
  );
}

export default App;
