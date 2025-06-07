import { GetProductVariantsByProductResponseDto } from 'contracts';
import { useEffect, useState } from 'react';
import { ApiService } from '../helpers/api.service';

export const useProduct = (uuid: string) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [productData, setProductData] = useState<GetProductVariantsByProductResponseDto>();
    const [variantIndex, setVariantIndex] = useState(0);

    useEffect(() => {
        const getProductData = async () => {
            const data = await ApiService.getProductVariantsByProduct(uuid!);
            setProductData(data);
        };
        getProductData();
        setActiveImageIndex(0);
        setVariantIndex(0);
    }, [uuid]);

    return {
        productData,
        variant: productData?.variants[variantIndex],
        activeImage: productData?.images[activeImageIndex],
        setVariantIndex,
        setActiveImageIndex,
        activeImageIndex,
        variantIndex,
    };
};
