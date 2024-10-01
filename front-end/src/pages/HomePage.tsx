import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../store/loginStore";
import NavBar from "../components/NavBar";

const HomePage = () => {
  const { setEmail, setPassword } = useLoginStore();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          '/auth/test',
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      setEmail('');
      setPassword('');
      // Redirect to login or homepage
      navigate('/');
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <>
      <NavBar />
      <button onClick={() => handleLogout()}>Logout</button>
      <div>
        <h1>Agent Page</h1>
        <p>Welcome to Home page</p>
      </div>
    </>
  );
};

export default HomePage;
