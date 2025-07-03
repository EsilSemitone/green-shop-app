import { ICreateProductVariantModalProps } from './CreateProductVariantModal-props';
import styles from './CreateProductVariantModal.module.css';
import cn from 'classnames';
import { Modal } from '../../common/Modal/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateProductVariantRequestDto, GetAllTagsResponseDto, SIZE } from 'contracts-green-shop';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../common/Button/Button';
import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { sizeInvertMap } from '../../../pages/Shop/helpers/size-map';
import { Input } from '../../common/Input/Input';
import { ApiService } from '../../../common/helpers/api.service';
import {
    CreateProductVariantRequestCustom,
    CreateProductVariantRequestCustomSchema,
} from './constants/create-product-variant.schema';

export function CreateProductVariantModal({ className, isOpen, onClose, productId, ...props }: ICreateProductVariantModalProps) {
    const [size, setSize] = useState<SIZE>(SIZE.SMALL);
    const [currentTags, setCurrentTags] = useState<string[]>([]);

    const [tags, setTags] = useState<GetAllTagsResponseDto['tags'] | null>(null);

    useEffect(() => {
        const provideTags = async () => {
            const res = await ApiService.getAllTags();
            setTags(res.tags);
        };
        provideTags();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateProductVariantRequestDto>({
        defaultValues: {},
        resolver: zodResolver(CreateProductVariantRequestCustomSchema),
    });
    const submit: SubmitHandler<CreateProductVariantRequestCustom> = async (data) => {
        const resultData = { ...data, tags: currentTags };
        await ApiService.createProductVariant(productId, resultData);
        reset();
        onClose();
    };

    return (
        <Modal {...props} className={cn(styles.create_product_variant__modal, className)} isOpen={isOpen} onClose={onClose}>
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
                <h2>Создать вариант</h2>
                <div>
                    <p>Размер</p>
                    {errors.size && <span>{errors.size.message}</span>}
                    <Select
                        defaultValue={size}
                        onChange={(value) => {
                            setSize(value);
                        }}
                        options={[
                            { value: SIZE.LARGE, label: sizeInvertMap.get(SIZE.LARGE) },
                            { value: SIZE.MEDIUM, label: sizeInvertMap.get(SIZE.MEDIUM) },
                            { value: SIZE.SMALL, label: sizeInvertMap.get(SIZE.SMALL) },
                        ]}
                    />
                    <input {...register('size')} className={styles.ghost_input} type="text" value={size} />
                </div>
                <div>
                    <p>Цена</p>
                    {errors.price && <span>{errors.price.message}</span>}
                    <Input defaultValue={1} {...register('price')} type="number"></Input>
                </div>
                <div>
                    <p>Количество</p>
                    {errors.stock && <span>{errors.stock.message}</span>}
                    <Input defaultValue={1} {...register('stock')} type="number"></Input>
                </div>
                <div>
                    <p>Теги</p>
                    {errors.tags && <span>{errors.tags.message}</span>}
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Добавить теги"
                        onChange={(value) => {
                            setCurrentTags(value);
                        }}
                        style={{ width: '100%' }}
                        options={tags?.map((t) => {
                            return { value: t.uuid, label: t.name };
                        })}
                    />
                </div>
                <Button>Создать</Button>
            </form>
        </Modal>
    );
}
