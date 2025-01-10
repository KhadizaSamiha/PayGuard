import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/useAuth";
import { logout } from "@/features/auth/authService";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "@/utils/toastUtils";

const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/login");
      showToast("Logout Success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <p>Email: {user?.email || 'No User'}</p>
      {user ? <Button onClick={logoutHandler}>Logout</Button>: <Link to='/login'><Button>Login</Button></Link>}
    </div>
  );
};

export default Home;
