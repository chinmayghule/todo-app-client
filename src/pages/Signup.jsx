import { auth, provider } from "../config/firebase";
import { getAuth, getRedirectResult, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import Loading from "../components/Loading";
import GoogleSignInButton from "../components/GoogleSignInButton";


function Signup({ signinError, setSigninError }) {

  const auth = getAuth();
  const navigate = useNavigate();

  // states
  const [isLoading, setIsLoading] = useState(true);


  // functions
  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
    setIsLoading(true);
  };

  const handleRedirectResult = () => {

    getRedirectResult(auth)
      .then(result => {
        if (result?.user) {
          navigate('/todos');
        }
      })
      .catch(error => {
        console.log(error);
        setSigninError(error.message);
        navigate('/signup');
      });
  };


  // effects
  useEffect(() => {
    handleRedirectResult();

  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(true);
        navigate('/todos');

      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();

  }, [auth]);

  // return statement.
  if (isLoading) {
    return (
      <Loading />
    );

  } else {
    return (
      <section className="signup-wrapper">
        <div className="signup-content">
          <h2>Sign In With Google</h2>
          <GoogleSignInButton onClickHandler={signInWithGoogle} />
          <p>or</p>
          <Link
            to="/"
            className="return-to-homepage-link"
          >
            Return to Homepage
          </Link>
          {signinError && <div>{signinError}</div>}
        </div>
      </section>
    );
  }


}

export default Signup;