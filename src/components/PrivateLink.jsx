import { useSelector } from "react-redux";
import { Link as AppLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateLink = ({ to, children, ...linkProps }) => {
  const { userLogin } = useSelector((state) => state.UserReducer);
  const navigate = useNavigate();

  const handleNavigate = async () => {
    if (!userLogin) {
      let url = `/auth/login?from=${to}`;
      const result = await Swal.fire({
        icon: "error",
        title: "Bạn chưa đăng nhập?",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Không đăng nhập",
      });
      if (result.isConfirmed) {
        navigate(url);
      }
    } else {
      setTimeout(() => {
        navigate(to);
      });
    }
  };

  return (
    <AppLink onClick={handleNavigate} {...linkProps}>
      {children}
    </AppLink>
  );
};

export default PrivateLink;
