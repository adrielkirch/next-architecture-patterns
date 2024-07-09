import { useRouter } from "next/navigation";

const useAuthenticationRouter = () => {
  const router = useRouter();

  const goToHomePage = () => {
    router.push('/');
  };

  return {
    goToHomePage
  };
};

export default useAuthenticationRouter;
