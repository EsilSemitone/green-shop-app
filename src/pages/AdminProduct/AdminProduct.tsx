import cn from 'classnames';
import styles from './AdminProduct.module.css';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { GetProductVariantsByProductResponseDto, PRODUCT_CATEGORY, UpdateProductRequestDto } from 'contracts-green-shop';
import { Spin } from 'antd';
import { ApiService } from '../../common/helpers/api.service';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { appActions } from '../../store/app-slice/app.slice';
import { MESSAGE_TYPE } from '../../store/app-slice/enums/message-type';
import { LoadingOutlined } from '@ant-design/icons';
import { EditField } from '../../components/EditField/EditField';
import { Button } from '../../components/common/Button/Button';
import { EditImage } from '../../components/EditImage/EditImage';
import { EditFieldSelect } from '../../components/EditFieldSelect/EditFieldSelect';
import { categoryInvertMap } from '../Shop/helpers/category-map';
import { ProductVariantCard } from '../../components/ProductVariantCard/ProductVariantCard';
import { CreateProductVariantModal } from '../../components/modal/CreateProductVariantModal/CreateProductVariantModal';

export default function AdminProduct() {
    const dispatch = useDispatch();
    const { uuid } = useParams();
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [product, setProduct] = useState<GetProductVariantsByProductResponseDto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isModalOpen === true) {
            return;
        }
        if (!uuid) {
            return;
        }
        const provideProduct = async () => {
            try {
                const product = await ApiService.getProductWithProductVariant(uuid);
                setProduct(product);
            } catch (e) {
                if (e instanceof AxiosError) {
                    dispatch(
                        appActions.setMessage({ type: MESSAGE_TYPE.ERROR, content: e.response?.data?.message ?? e.message }),
                    );
                }
            } finally {
                setIsLoad(false);
            }
        };

        provideProduct();
    }, [uuid, isModalOpen]);

    const onSaveProductField = useCallback(
        async (arg: UpdateProductRequestDto) => {
            if (!product) {
                return false;
            }
            try {
                await ApiService.updateProduct(product.uuid, arg);
                return true;
            } catch {
                return false;
            }
        },
        [product],
    );

    const onDeleteHandle = async (src: string) => {
        if (!uuid && !product) {
            return;
        }

        try {
            const updateProduct = await ApiService.updateProduct(uuid!, { images: product!.images.filter((i) => i !== src) });
            dispatch(appActions.setMessage({ content: 'Избражение успешно удалено', type: MESSAGE_TYPE.SUCCESS }));

            setProduct((prev) => {
                if (!prev) {
                    return null;
                }

                return { ...prev, images: updateProduct.images };
            });
        } catch {
            dispatch(appActions.setMessage({ content: 'Не удалось удалить избражение', type: MESSAGE_TYPE.ERROR }));
        }
    };

    const photoAddHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !uuid || !product) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', `product/${uuid}/photo`);

        const addPhoto = async (formData: FormData) => {
            try {
                const { file: photo_image } = await ApiService.upload(formData);
                const updateProduct = await ApiService.updateProduct(uuid, { images: [photo_image, ...product.images] });
                dispatch(appActions.setMessage({ content: 'Фото успешно обновлено', type: MESSAGE_TYPE.SUCCESS }));
                setProduct((prev) => {
                    if (!prev) {
                        return null;
                    }
                    return { ...prev, images: updateProduct.images };
                });
            } catch {
                dispatch(appActions.setMessage({ content: 'Не удалось загрузить изображение', type: MESSAGE_TYPE.ERROR }));
            }
        };
        addPhoto(formData);
    };

    const onDeleteVariant = (variantId: string) => {
        setProduct((prev) => {
            if (!prev) {
                return null;
            }

            return { ...prev, variants: prev.variants.filter((variant) => variant.uuid !== variantId) };
        });
    };

    const addProductHandler = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const onCloseModel = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return (
        <div className={styles.page}>
            {!isLoad && product && (
                <>
                    <EditField
                        fieldProps={{ className: styles.product_name }}
                        value={product.name}
                        onSave={onSaveProductField}
                        fieldName={'name'}
                    ></EditField>
                    <h3>Изображения</h3>
                    <div className={styles.images}>
                        <div className={styles.photo_input}>
                            <label htmlFor="image">
                                <img src="/photo.png" alt="" />
                            </label>
                            <span>Добавить фото</span>
                            <input onChange={photoAddHandler} className={styles.ghost_input} type="file" id="image" />
                        </div>
                        {product.images.map((i) => (
                            <EditImage key={i} className={styles.product_image} src={i} onDelete={onDeleteHandle}></EditImage>
                        ))}
                    </div>

                    <div className={styles.product_info}>
                        <h3>Основная информация</h3>
                        <div className={styles.product_info__inner}>
                            <div className={styles.product_field}>
                                <span>ID: </span>
                                {product.uuid}
                            </div>
                            <div className={cn(styles.product_field, styles.product_description)}>
                                <span>Короткое описание: </span>
                                <EditField
                                    className={styles.product_field}
                                    value={product.short_description}
                                    onSave={onSaveProductField}
                                    fieldName={'short_description'}
                                ></EditField>
                            </div>
                            <div className={cn(styles.product_field, styles.product_description)}>
                                <span>Описание: </span>
                                <EditField
                                    className={styles.product_field}
                                    value={product.description}
                                    onSave={onSaveProductField}
                                    fieldName={'description'}
                                ></EditField>
                            </div>
                            <div className={styles.product_field}>
                                <span>Категория: </span>
                                <EditFieldSelect
                                    value={categoryInvertMap.get(product.category) || product.category}
                                    onSave={onSaveProductField}
                                    fieldName={'category'}
                                    middleware={(arg: string) => categoryInvertMap.get(arg as PRODUCT_CATEGORY)}
                                    options={Array.from(categoryInvertMap).map(([value, label]) => {
                                        return { value, label };
                                    })}
                                ></EditFieldSelect>
                            </div>
                            <div className={styles.product_field}>
                                <span>Создан: </span>
                                {new Date(product.created_at).toLocaleString()}
                            </div>
                            <div className={styles.product_field}>
                                <span>Обновлен: </span>
                                {new Date(product.updated_at).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <h3>Варианты</h3>
                    <div className={styles.product_variants__container}>
                        <Button onClick={addProductHandler}>Добавить вариант</Button>
                        {product.variants.map((variant) => (
                            <ProductVariantCard
                                key={variant.uuid}
                                onDelete={onDeleteVariant}
                                product_variant={variant}
                            ></ProductVariantCard>
                        ))}
                    </div>
                </>
            )}
            {isLoad && <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />}
            {isModalOpen && product && (
                <CreateProductVariantModal
                    isOpen={isModalOpen}
                    onClose={onCloseModel}
                    productId={product.uuid}
                ></CreateProductVariantModal>
            )}
        </div>
    );
}
