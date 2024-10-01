import CoursesList from "../components/Courses";

const HomePage = () => {
  return (
    <>
      <CoursesList/>
    </>
  );
};

export default HomePage;



// const { setEmail, setPassword } = useLoginStore();
  // const navigate = useNavigate();


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosInstance.get(
  //         '/auth/test',
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleLogout = async () => {
  //   try {
  //     await axiosInstance.post('/auth/logout');
  //     setEmail('');
  //     setPassword('');
  //     // Redirect to login or homepage
  //     navigate('/');
  //   } catch (error) {
  //     console.error("Error during logout: ", error);
  //   }
  // };