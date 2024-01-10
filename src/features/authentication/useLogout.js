import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogout() {
  const navigate = useNavigate("/login");
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("You have been logged out!");
      queryClient.removeQueries();
      navigate("/", { replace: true });
    },
    onError: () => {
      toast.error("There was an error logging out.");
    },
  });

  return { logout, isLoading };
}
