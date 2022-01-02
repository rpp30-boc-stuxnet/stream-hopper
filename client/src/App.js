// import logo from './logo.svg';
import AppRouter from './components/AppRouter.jsx';
import './App.css';


function App() {
  return (
    <div className="App" data-testid="main-app-div">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <AppRouter />
      </header>
    </div>
  );
}

export default App;
