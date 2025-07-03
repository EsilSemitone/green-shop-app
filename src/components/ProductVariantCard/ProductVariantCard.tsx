import { memo, useCallback } from 'react';
import styles from './ProductVariantCard.module.css';
import { IProductVariantCardProps } from './ProductVariantCard.props';
import cn from 'classnames';
import { EditField } from '../EditField/EditField';
import { Rating } from '../Rating/Rating';
import { SIZE, UpdateProductVariantRequestDto } from 'contracts-green-shop';
import { EditFieldSelect } from '../EditFieldSelect/EditFieldSelect';
import { sizeInvertMap } from '../../pages/Shop/helpers/size-map';
import { ApiService } from '../../common/helpers/api.service';
import { Button } from '../common/Button/Button';
import { useDispatch } from 'react-redux';
import { appActions } from '../../store/app-slice/app.slice';
import { MESSAGE_TYPE } from '../../store/app-slice/enums/message-type';
import { AxiosError } from 'axios';

export const ProductVariantCard = memo(({ product_variant, className, onDelete, ...props }: IProductVariantCardProps) => {
    const dispatch = useDispatch();

    const onSaveVariantField = useCallback(
        async (args: UpdateProductVariantRequestDto) => {
            if (!product_variant) {
                return false;
            }

            const currentArgs = {
                ...args,
                ...(args.price ? { price: Number(args.price) } : {}),
                ...(args.stock ? { stock: Number(args.stock) } : {}),
            };
            try {
                await ApiService.updateProductVariant(product_variant.product_id, product_variant.uuid, currentArgs);
                return true;
            } catch (e) {
                if (e instanceof AxiosError) {
                    dispatch(
                        appActions.setMessage({
                            type: MESSAGE_TYPE.ERROR,
                            content: `Не удалось обновить ${e.response?.data?.message || e.message}`,
                        }),
                    );
                }
                return false;
            }
        },
        [product_variant],
    );

    const handleDelete = async () => {
        try {
            await ApiService.deleteProductVariant(product_variant.product_id, product_variant.uuid);
            onDelete(product_variant.uuid);
        } catch (e) {
            if (e instanceof AxiosError) {
                dispatch(
                    appActions.setMessage({
                        type: MESSAGE_TYPE.ERROR,
                        content: `Не удалось удалить ${e.response?.data?.message || e.message}`,
                    }),
                );
            }
        }
    };

    return (
        <div {...props} className={cn(styles.product_variant__card, className)}>
            <div className={styles.left}>
                <div className={styles.product_field}>
                    <span>ID:</span>
                    {product_variant.uuid}
                </div>
                <div className={styles.product_field}>
                    <span>Рейтинг:</span>
                    <Rating rating={product_variant.rating}></Rating>
                </div>
                <div className={styles.product_field}>
                    <span>Размер:</span>
                    <EditFieldSelect
                        value={sizeInvertMap.get(product_variant.size) || product_variant.size}
                        onSave={onSaveVariantField}
                        fieldName={'size'}
                        options={Array.from(sizeInvertMap).map(([value, label]) => {
                            return { value, label };
                        })}
                        middleware={(arg: SIZE) => sizeInvertMap.get(arg)}
                    ></EditFieldSelect>
                </div>
                <div className={styles.product_field}>
                    <span>Цена:</span>
                    <EditField value={String(product_variant.price)} onSave={onSaveVariantField} fieldName={'price'}></EditField>
                </div>
                <div className={styles.product_field}>
                    <span>Количество:</span>
                    <EditField value={String(product_variant.stock)} onSave={onSaveVariantField} fieldName={'stock'}></EditField>
                </div>
            </div>
            <div className={styles.right}>
                <Button onClick={handleDelete} isDelete={true}>
                    Удалить
                </Button>
            </div>
        </div>
    );
});
