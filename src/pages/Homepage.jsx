import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../components/Loading";

function Homepage() {

  const navigate = useNavigate();
  const [isUserVerified, setIsUserVerified] = useState(false);


  // functions
  function handleGetStartedBtnClick() {
    navigate('/signup');
  }


  // effects

  // redirect to '/todos' if user is already signed in.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/todos');
      }

      setIsUserVerified(true);
    });


    return () => unsubscribe();

  }, [auth]);


  // return
  if (isUserVerified === false) {
    return <Loading />;
  }

  return (
    <section className="homepage-wrapper">
      <span className="homepage-banner">gTodos</span>
      <h2 className="homepage-banner-subtext">
        Your go-to place for doing your tasks!
      </h2>

      <div className="homepage-feature-list">
        <h3>Key features</h3>
        <ul>
          <li>Light and dark modes.</li>
          <li>Simple and easy-to-use UI.</li>
          <li>
            <p>Works anywhere!</p>
            <p>Start working on your computer and then continue on your phone.</p>
          </li>
        </ul>
      </div>

      <button
        className="basic-btn-style get-started-btn"
        onClick={handleGetStartedBtnClick}
      >
        Get Started
      </button>
    </section>
  );
}

export default Homepage;