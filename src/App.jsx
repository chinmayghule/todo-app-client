import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';

// pages
import Signup from './pages/Signup';
import Todos from './pages/Todos';
import Homepage from './pages/Homepage';

// components
import TodoList from './pages/TodoList';
import AllTodos from './components/AllTodos';



function App() {

  // experimental temporary.
  const [signinError, setSigninError] = useState(null);
  
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />,
    },
    {
      path: '/signup',
      element:
        <Signup
          signinError={signinError}
          setSigninError={setSigninError}
        />,
    },
    {
      path: '/todos',
      element:
        <Todos
          theme={theme}
          setTheme={setTheme}
          signinError={signinError}
          setSigninError={setSigninError}
        />,
      children: [
        {
          index: true,
          element: <AllTodos />
        },
        {
          path: ':todoListId',
          element: <TodoList />
        }
      ]
    }
  ]);

  setSiteTheme();

  function setSiteTheme() {
    if (theme === 'dark') {
      document.body.dataset.theme = 'dark';

    } else {
      document.body.removeAttribute('data-theme');
    }
  }


  return (
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
}

export default App;
