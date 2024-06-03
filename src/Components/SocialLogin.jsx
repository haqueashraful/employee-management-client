import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google
      const result = await signInWithGoogle();
      const user = result.user;
      const email = user.email;
  
      // Check if the user already exists
      const existingUserResponse = await axiosPublic.get(`/users/${email}`);
      const existingUser = existingUserResponse.data;
  
      if (existingUser) {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "User already exists",
          text: "You are already registered.",
          showConfirmButton: true,
        });
        // Redirect to the dashboard or some other page
        navigate("/");
        return; // Exit early
      }
  
      // Post user data to your backend
      const response = await axiosPublic.post("/users", {
        name: user.displayName,
        email: email,
        role: "Employee",
        bank_account_no: "",
        designation: "",
        photo: user.photoURL,
      });
  
      // Check if the user data was successfully posted
      if (response.data.acknowledged) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        // Redirect to the dashboard
        navigate("/dashboard");
      } else {
        // Handle errors if the user data posting fails
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to login",
          text: "Please try again later.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      // Handle errors from Google sign-in or Axios request
      console.error("Error occurred during login:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to login",
        text: "Please try again later.",
        showConfirmButton: true,
      });
    }
  };
  
  

  return (
    <div>
      <ul className="flex justify-center items-center gap-5">
        <li>
          <button className="" onClick={handleGoogleLogin}>
            <FaGoogle className="text-3xl" />
          </button>
        </li>
        <li>
          <button className="">
            <FaFacebook className="text-3xl" />
          </button>
        </li>
        <li>
          <button className="">
            <FaGithub className="text-3xl" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SocialLogin;
