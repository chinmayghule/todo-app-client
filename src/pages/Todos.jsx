import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// context
import { AllTodosContext } from "../contexts/AllTodosContext.js";

// components
import PrimaryBtn from "../components/PrimaryBtn.jsx";
import Loading from "../components/Loading.jsx";



function Todos({ theme, setTheme, signinError, setSigninError }) {

  // constant variables.
  const DATABASE_UPDATE_DELAY = 1000 * 3; // in milliseconds.

  // regular variables.
  const auth = getAuth();
  const navigate = useNavigate();

  // states  
  const [errorMessage, setErrorMessage] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [
    isUserSignedIn,
    setIsUserSignedIn
  ] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [username, setUsername] = useState(null);

  // refs
  const databaseUpdateTimerIdRef = useRef(null);
  const userGoogleUID = useRef();
  const gotInitialTodos = useRef(false);

  // UI variables
  const errorMessageJSX =
    (errorMessage) ? (
      <div className="error-message">
        {errorMessage}
      </div>

    ) : (
      null
    );

  const themeBtnIconJSX =
    (theme === "dark") ? (
      <i className="fa-solid fa-moon"></i>

    ) : (
      <i className="fa-solid fa-sun"></i>
    );

  const userStatusToggleBtnIconJSX =
    (isUserSignedIn === true) ? (
      <i className="fa-solid fa-arrow-right-to-bracket"></i>

    ) : (
      <i className="fa-solid fa-right-from-bracket"></i>
    );

  const todosJSX =
    (!gotInitialTodos.current) ? (
      <Loading giveColdStartWarning={true} />
    ) : (
      <>
        {errorMessageJSX}

        < AllTodosContext.Provider value={{
          allTodos,
          setAllTodos,
          username
        }}>
          <Outlet />
        </AllTodosContext.Provider>
      </>
    );


  // functions
  function handleSignout() {
    signOut(auth)
      .then(() => {
        console.log('Signout successful!');
        setIsUserSignedIn(false);
        navigate('/signup');
        userGoogleUID.current = null;

        // experimental
        setUsername(null);
      })
      .catch((error) => {
        console.log(error);
        setSigninError(error);
        setErrorMessage(error?.message || error);
      });
  }

  function handleThemeBtnClick() {
    if (document.body.getAttribute("data-theme") === "dark") {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      setTheme("light");

    } else {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  }


  // effects
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserSignedIn(!!user);
      setIsLoading(false);

      // unique identifier: user.uid
      userGoogleUID.current = user?.uid;

      // experimental.
      setUsername(user.displayName);
    });

    return () => unsubscribe();

  }, [auth]);

  useEffect(() => {
    if (isUserSignedIn === false) {
      navigate('/signup');
    }

  }, [isUserSignedIn]);


  // GET TODOS
  useEffect(() => {
    if (userGoogleUID.current) {
      fetch(`${import.meta.env.VITE_GTODOS_API_URL}/todos/${userGoogleUID.current}`)
        .then(response => response.json())
        .then(data => {
          setAllTodos(data);
          gotInitialTodos.current = true;
          if (errorMessage) {
            setErrorMessage("");
          }
        })
        .catch(error => {
          console.log(`error while fetching todolists.\n${error}`);
          setErrorMessage('error while fetching todolists');
          gotInitialTodos.current = false;
        });
    }

  }, [userGoogleUID.current, errorMessage]);


  // UPDATE TODOS TO DATABASE
  useEffect(() => {
    const updateTodosToDatabase = async () => {
      // update todos to database.
      const url = `${import.meta.env.VITE_GTODOS_API_URL}/todos`;
      console.log(import.meta.env.VITE_GTODOS_API_URL);

      const requestBody = {
        userId: userGoogleUID.current,
        updatedFields: allTodos || []
      };

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      };

      if (gotInitialTodos.current) {
        fetch(url, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (errorMessage) {
              setErrorMessage("");
            }
          })
          .catch(err => {
            console.log(err);
            setErrorMessage('error while updating todolists');
          });
      }
    };

    const debounceUpdate = () => {
      clearTimeout(databaseUpdateTimerIdRef.current);
      databaseUpdateTimerIdRef.current =
        setTimeout(updateTodosToDatabase, DATABASE_UPDATE_DELAY);
    };

    // if we have initially fetched data from database
    // before updating the todoLists.
    // initially allTodos is [] so all data in todoLists might
    // get wiped out. this is to prevent that.
    if (gotInitialTodos.current) {
      debounceUpdate();
    }


    return () => {
      clearTimeout(databaseUpdateTimerIdRef.current);
    };



  }, [allTodos, gotInitialTodos.current]);


  // check online status.
  useEffect(() => {
    function updateOnlineStatus() {
      setIsOnline(navigator.onLine);
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };

  }, []);


  // return.

  if (
    (isLoading === true) ||
    (isLoading === false && isUserSignedIn === false)
  ) {
    return <Loading />;
  }

  return (
    <section className="todos-wrapper">
      <nav className="navbar">
        <PrimaryBtn pathname={window.location.pathname} />

        <button
          className="circular-icon-btn"
          onClick={handleThemeBtnClick}>
          {themeBtnIconJSX}
        </button>

        <button
          className="circular-icon-btn signout-btn"
          onClick={handleSignout}
        >
          {userStatusToggleBtnIconJSX}
        </button>
      </nav>

      {(isOnline === false) ? (
        <div>You are not connected to the Internet</div>

      ) : (
        todosJSX
      )}

    </section >
  );
}



export default Todos;