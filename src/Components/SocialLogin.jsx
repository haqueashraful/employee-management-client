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
      const result = await signInWithGoogle();
      const user = result.user;
     const email = user.email;

     
      // If the user is not fired, proceed with the login process
      await axiosPublic.post("/users", {
        name: user.displayName,
        email: email,
        role: "Employee",
        bank_account_no: "",
        designation: "",
        photo: user.photoURL,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Login failed",
        text: error.message,
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
