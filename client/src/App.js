// import logo from './logo.svg';
import AppRouter from './components/AppRouter.jsx';
import './App.css';


function App() {
  return (
    <div className="app" data-testid="main-app-div">
      <div className="backImg" style={{"backgroundImage": "url('https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1328&q=80')"}} alt="An old tv on a four-legged stand."></div>
      <div className="fader"></div>
      <AppRouter />
    </div>
  );
}

export default App;
