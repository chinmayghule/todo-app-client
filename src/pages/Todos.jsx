import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// dummy data
import { dummyData } from "../dummyData.js";

// context
import { AllTodosContext } from "../contexts/AllTodosContext.js";

// components
import PrimaryBtn from "../components/PrimaryBtn.jsx";
import Loading from "../components/Loading.jsx";



function Todos({ theme, setTheme }) {

  // regular variables.
  const auth = getAuth();
  const navigate = useNavigate();

  // states  
  const [errorMessage, setErrorMessage] = useState(null);
  const [allTodos, setAllTodos] = useState(dummyData);
  const [
    isUserSignedIn,
    setIsUserSignedIn
  ] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  // UI variables
  const errorMessageJSX =
    (errorMessage && errorMessage.message) ? (
      <div className="error-message">
        {errorMessage?.message}
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


  // functions
  function handleSignout() {
    signOut(auth)
      .then(() => {
        console.log('Signout successful!');
        isUserSignedIn(false); // experimental. delete it if stuff doesn't work.
        navigate('/signup');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error);
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
    });

    return () => unsubscribe();

  }, [auth]);

  useEffect(() => {
    if (isUserSignedIn === false) {
      navigate('/signup');
    }

  }, [isUserSignedIn]);


  if (isLoading) {
    return (
      <Loading />
    );
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

      {errorMessageJSX}


      <AllTodosContext.Provider value={{ allTodos, setAllTodos }}>
        <Outlet />
      </AllTodosContext.Provider>

    </section >
  );
}



export default Todos;