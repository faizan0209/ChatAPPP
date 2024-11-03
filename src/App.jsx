// src/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/Login';
import ErrorPage from './Components/ErrorPage';
import Register from './Components/Register';
import ChatRoom from './Components/ChatRoom';
import Mains from './Components/Mains';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Mains/>, 
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Login />, 
          errorElement: <ErrorPage/>
        },
        {
          path: 'register', 
          element: <Register />,
          errorElement: <ErrorPage />,
        },
        {
          path: 'ChatRoom',
          element: <ChatRoom/>,
          errorElement: <ErrorPage/>
        }
      ],
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App;
