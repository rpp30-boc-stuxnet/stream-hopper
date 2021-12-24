import logo from './logo.svg';
import Welcome from './components/Welcome.jsx';

import './App.css';


function App() {
  return (
    <div className="App" data-testid="main-app-div">
      <header className="App-header">
        <p>Stream Hopper</p>
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome />
      </header>
    </div>
  );
}

export default App;
