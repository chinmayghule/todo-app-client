import { auth, provider } from "../config/firebase";
import { getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  
  const auth = getAuth();
  const navigate = useNavigate();
  
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/todos');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className="signup-wrapper">
      <h2>Sign In With Google</h2>
      <button onClick={signInWithGoogle}>Sign In</button>
    </section>
  );
}

export default Signup;