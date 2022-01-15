// import logo from './logo.svg';
import AppRouter from './components/AppRouter.jsx';


function App() {
  return (
    <div className="app" data-testid="main-app-div">
      <div className="backImg" alt="An old tv on a four-legged stand."></div>
      <div className="fader"></div>
      <AppRouter />
    </div>
  );
}

export default App;
