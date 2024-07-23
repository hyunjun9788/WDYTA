import { QueryClient, useMutation } from '@tanstack/react-query';
import { deleteReview } from '@/shared/@common/apis';
import { productKeys } from '@/app/[category]/[product]/queryKeyFactories';
import useAuthStore from '@/stores/useAuthStore';
import { profileKeys } from '@/app/profile/queryKeyFactories';

export const useDeleteReviewMutation = (
  queryClient: QueryClient,
  productId: number,
  accessToken: string,
  reviewId: number,
  currentFilter: string,
) => {
  const userId = useAuthStore((state) => state.userId);
  return useMutation({
    mutationFn: async () => {
      await deleteReview(reviewId, accessToken);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.reviews(productId, currentFilter),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(productId),
      });
      queryClient.invalidateQueries({
        queryKey: profileKeys.productCard(Number(userId), 'reviewedProduct'),
        refetchType: 'inactive',
      });
    },
  });
};
