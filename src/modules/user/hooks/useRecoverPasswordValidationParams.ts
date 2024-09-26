import { useNavigate } from "react-router-dom";

export const useRecoverPasswordValidationParams = () => {
  const navigate = useNavigate();

  const redirectToNotFound = () => {
    navigate("/not-found");
  };

  return { redirectToNotFound };
};
