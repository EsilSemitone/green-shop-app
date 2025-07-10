import { ICreateProductVariantModalProps } from './CreateProductVariantModal-props';
import styles from './CreateProductVariantModal.module.css';
import cn from 'classnames';
import { Modal } from '../../common/Modal/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateProductVariantRequestDto, GetAllTagsResponseDto, SIZE } from 'contracts-green-shop';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../common/Button/Button';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Select } from 'antd';
import { Input } from '../../common/Input/Input';
import { ApiService } from '../../../common/helpers/api.service';
import {
    CreateProductVariantRequestCustom,
    CreateProductVariantRequestCustomSchema,
} from './constants/create-product-variant.schema';
import { SIZE_OPTIONS } from './constants/size-options';

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

    const onChangeSize = useCallback((value: SIZE) => {
        setSize(value);
    }, []);

    const onChangeTags = useCallback((value: string[]) => {
        setCurrentTags(value);
    }, []);

    const tagsOptions = useMemo(() => {
        if (!tags) {
            return [];
        }
        return tags.map((t) => {
            return { value: t.uuid, label: t.name };
        });
    }, [tags]);

    return (
        <Modal {...props} className={cn(styles.create_product_variant__modal, className)} isOpen={isOpen} onClose={onClose}>
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
                <h2>Создать вариант</h2>
                <div>
                    <p>Размер</p>
                    {errors.size && <Alert showIcon message={errors.size.message} type="error" />}
                    <Select defaultValue={size} onChange={onChangeSize} options={SIZE_OPTIONS} />
                    <input {...register('size')} className={styles.ghost_input} type="text" value={size} />
                </div>
                <div>
                    <p>Цена</p>
                    {errors.price && <Alert showIcon message={errors.price.message} type="error" />}
                    <Input defaultValue={1} {...register('price')} type="number"></Input>
                </div>
                <div>
                    <p>Количество</p>
                    {errors.stock && <Alert showIcon message={errors.stock.message} type="error" />}
                    <Input defaultValue={1} {...register('stock')} type="number"></Input>
                </div>
                <div>
                    <p>Теги</p>
                    {errors.tags && <Alert showIcon message={errors.tags.message} type="error" />}
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Добавить теги"
                        onChange={onChangeTags}
                        style={{ width: '100%' }}
                        options={tagsOptions}
                    />
                </div>
                <Button>Создать</Button>
            </form>
        </Modal>
    );
}
