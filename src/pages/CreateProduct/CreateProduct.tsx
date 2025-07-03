import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './CreateProduct.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomCreateProduct, CustomCreateProductSchema } from './constants/custom-create-product.schema';
import { Input } from '../../components/common/Input/Input';
import { Button } from '../../components/common/Button/Button';
import { Alert, Select } from 'antd';
import { useCallback, useState } from 'react';
import { CreateProductRequestDto, PRODUCT_CATEGORY, PRODUCT_CATEGORY_ENUM } from 'contracts-green-shop';
import { categoryInvertMap } from '../Shop/helpers/category-map';
import { ApiService } from '../../common/helpers/api.service';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../common/constants/routes';
import { useDispatch } from 'react-redux';
import { appActions } from '../../store/app-slice/app.slice';
import { MESSAGE_TYPE } from '../../store/app-slice/enums/message-type';
import { AxiosError } from 'axios';

export default function CreateProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [category, setCategory] = useState<PRODUCT_CATEGORY>(PRODUCT_CATEGORY_ENUM.ACCESSORIES);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CustomCreateProduct>({
        defaultValues: {},
        resolver: zodResolver(CustomCreateProductSchema),
    });

    const submit: SubmitHandler<CustomCreateProduct> = async (data) => {
        const result: CreateProductRequestDto = { ...data, category, images: [] };
        console.log(result);
        try {
            const res = await ApiService.createProduct(result);
            reset();
            navigate(ROUTES.admin.productDynamic(res.uuid));
        } catch (e) {
            if (e instanceof AxiosError)
                dispatch(appActions.setMessage({ type: MESSAGE_TYPE.ERROR, content: e.response?.data?.message ?? e.message }));
        }
    };

    const onChangeCategory = useCallback((value: PRODUCT_CATEGORY) => {
        setCategory(value);
    }, []);

    return (
        <div className={styles.create_product__page}>
            <h1>Создание продукта</h1>
            <form className={styles.create_product__form} onSubmit={handleSubmit(submit)}>
                <div className={styles.form_block}>
                    {errors.name && <Alert showIcon message={errors.name.message} type="error" />}
                    <label htmlFor="name">
                        <span className={styles.input_name}>Название</span>
                    </label>
                    <Input {...register('name')} id="name" type="text" placeholder="Название"></Input>
                </div>
                <div className={styles.form_block}>
                    {errors.short_description && <Alert showIcon message={errors.short_description.message} type="error" />}
                    <label htmlFor="short_description">
                        <span className={styles.input_name}>Короткое описание</span>
                    </label>
                    <Input
                        {...register('short_description')}
                        id="short_description"
                        type="text"
                        placeholder="Короткое описание"
                    ></Input>
                </div>
                <div className={styles.form_block}>
                    {errors.description && <Alert showIcon message={errors.description.message} type="error" />}
                    <label htmlFor="description">
                        <span className={styles.input_name}>Описание</span>
                    </label>
                    <Input
                        isTextArea={true}
                        textAreaProps={{ id: 'description', placeholder: 'Описание', ...{ ...register('description') } }}
                    ></Input>
                </div>
                <div className={styles.form_block}>
                    <Select
                        defaultValue={category}
                        onChange={onChangeCategory}
                        options={Object.keys(PRODUCT_CATEGORY_ENUM).map((c) => {
                            return { value: c, label: categoryInvertMap.get(c as PRODUCT_CATEGORY) };
                        })}
                    />
                </div>
                <Button>Создать</Button>
            </form>
        </div>
    );
}
