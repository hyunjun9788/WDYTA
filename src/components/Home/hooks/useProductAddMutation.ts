import { homeProductKeys } from '@/app/[category]/homeQueryKeyFactories';
import { ProductProps, postCreateProduct } from '@/shared/@common/apis/product';
import { useMutation, QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { convertIdToCategory } from '@/shared/@common/utils';
import { profileKeys } from '@/app/profile/queryKeyFactories';
import useAuthStore from '@/stores/useAuthStore';

interface ProductAddProps {
  accessToken: string;
  setErrorMessage: (message: string) => void;
  productCategoryId: number;
  queryClient: QueryClient;
}

export const useProductAddMutation = ({
  accessToken,
  setErrorMessage,
  productCategoryId,
  queryClient,
}: ProductAddProps) => {
  const router = useRouter();
  const userId = useAuthStore((state) => state.userId);
  return useMutation({
    mutationFn: async (data: ProductProps) => {
      const response = await postCreateProduct(data, accessToken);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const responseData = await response.json();
      // 상품 생성 응답에서 상품 ID를 반환
      return {
        productId: responseData.id,
        categoryPath: convertIdToCategory(productCategoryId),
      };
    },
    onSuccess: (data) => {
      router.push(`/${data.categoryPath}/${data.productId}`);
      router.refresh();
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: homeProductKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: profileKeys.productCard(Number(userId), 'createdProduct'),
        refetchType: 'inactive',
      });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
};
