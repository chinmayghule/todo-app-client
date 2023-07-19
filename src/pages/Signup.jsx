import { auth, provider } from "../config/firebase";
import { getAuth, getRedirectResult, onAuthStateChanged, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

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
          <button
            className="signup-btn basic-btn-style"
            onClick={signInWithGoogle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
            <span>
              Sign In
            </span>
          </button>
          {signinError && <div>{signinError}</div>}
        </div>
      </section>
    );
  }


}

export default Signup;