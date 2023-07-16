import { auth, provider } from "../config/firebase";
import { getAuth, getRedirectResult, onAuthStateChanged, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      if(user) {
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
      <div>Loading...</div>
    );

  } else {
    return (
      <section className="signup-wrapper">
        <h2>Sign In With Google</h2>
        <button onClick={signInWithGoogle}>Sign In</button>
        <div>{signinError}</div>
      </section>
    );
  }


}

export default Signup;