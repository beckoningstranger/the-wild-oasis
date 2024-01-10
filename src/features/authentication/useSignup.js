import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created. Please verify the account from the user's email address"
      );
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("There was an error creating your account.");
    },
  });

  return { signup, isLoading };
}
