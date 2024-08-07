import { postSignIn } from '@/shared/@common/apis/auth';
import { FormValues } from '@/shared/@common/types/input';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';
import loginAction from '../loginAction';

const useLoginMutation = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await postSignIn(data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return response.json();
    },
    onSuccess: async (data) => {
      setUser(data.user.id);
      await loginAction(data);
      router.push('/');
    },
    onError: () => {
      router.push(`/modal/login`, { scroll: false });
    },
  });
};

export default useLoginMutation;
