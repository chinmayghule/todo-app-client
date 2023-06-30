import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() { 
  
  const navigate = useNavigate();
  const {currentUser, setCurrentUser } = useContext(IsAuthContext) || {};
  
  useEffect(() => {
    // navigate('/signup');
    console.log(`useEffect current user: ${currentUser}`);

  }, [currentUser]);
  
  return (
    <div>Homepage</div>
  );
}

export default Homepage;