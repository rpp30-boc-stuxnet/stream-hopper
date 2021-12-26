import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Welcome from './Welcome.jsx';

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Welcome />
    </BrowserRouter>
  );
}

export default AppRouter;