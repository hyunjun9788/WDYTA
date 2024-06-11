'use client';

import { useSearchParams } from 'next/navigation';
import { AutoComplete } from '@/components/Compare/AutoComplete';
import { Table } from '@/components/Compare/Table';
import { PRODUCT_ID_1_MOCK } from '@/components/Compare/mock/PRODUCT_ID_1_MOCK';
import { Button, ButtonKind } from '@/shared/ui/Button/Button/Button';
import { Floating } from '@/shared/ui/Button/Floating/Floating';
import { CompareColor } from '@/shared/ui/Chip/CompareChip';
import { Loading } from '@/shared/ui/Icon';
import { useEffect, useState } from 'react';
import { useCompareItems } from '@/stores/useCompareItems';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  writerId: number;
  isFavorite: boolean;
  category: {
    id: number;
    name: string;
  };
  categoryMetric: {
    rating: number;
    favoriteCount: number;
    reviewCount: number;
  };
}

const Compare = () => {
  const { firstItem, changingFirstItem, secondItem, changingSecondItem } =
    useCompareItems();
  const [isCompare, setIsCompare] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  // const userId = cookies().get('accessToken');

  const searchParams = useSearchParams();
  const product = searchParams.get('product');

  // api로 product의 id를 이용해서 product1은 product의 name을 받아와야 하는 것이다.

  const handleSelectFirstProduct = (id: number) => {
    changingFirstItem(id);
  };

  const handleSelectSecondProduct = (id: number) => {
    changingSecondItem(id);
  };

  useEffect(() => {
    if (typeof product === 'string') {
      const parsedProduct = parseInt(product, 10);
      if (!Number.isNaN(parsedProduct)) {
        const fetchProductDetail = async () => {
          try {
            // const response = await getDetailProduct(parsedProduct, userId);
            // const productDetail: Product = await response.json();
            const productDetail: Product = PRODUCT_ID_1_MOCK;
            changingFirstItem(productDetail.id);
          } catch (error) {
            console.error('Failed to fetch product detail:', error);
          }
        };
        fetchProductDetail();
      }
    }
  }, [product]);

  useEffect(() => {
    if (isCompare) {
      setIsLoad(true);
    }
  }, [isCompare]);

  return (
    <>
      <div className="flex justify-center gap-5 w-full mt-[60px] h-[400px] mobile:flex-col mobile:items-center">
        <div className="flex flex-row gap-5 mobile:flex-col">
          <div className="flex flex-col items-start gap-[10px]">
            <p className="text-base text-white">상품 1</p>
            <AutoComplete
              color={CompareColor.GREEN}
              onSelectProduct={handleSelectFirstProduct}
              selectedProduct={firstItem}
            />
          </div>
          <div className="flex flex-col items-start gap-[10px]">
            <p className="text-base text-white">상품 2</p>
            <AutoComplete onSelectProduct={handleSelectSecondProduct} />
          </div>
        </div>
        <div className="mt-">
          <Button
            kind={ButtonKind.primary}
            customSize="w-[200px] h-[70px] mt-[34px] w-[200px] md:w-[164px] mobile:w-[288px]"
            onClick={() => setIsCompare(!isCompare)}
          >
            비교하기
          </Button>
        </div>
      </div>
      {isCompare && (
        <div className="flex flex-col items-center gap-5">
          <Loading />
          <p className=" text-xl align-center text-gray-6E">Loading...</p>
        </div>
      )}
      {isLoad && (
        <Table
          selectedFirstProductId={firstItem}
          selectedSecondProductId={secondItem}
        />
      )}

      <Floating />
    </>
  );
};

export default Compare;
