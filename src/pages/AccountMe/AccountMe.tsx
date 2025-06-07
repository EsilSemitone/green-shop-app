import { ChangeEvent } from 'react';
import { UpdateAccountForm } from '../../components/form/UpdateAccountForm/UpdateAccountForm';
import styles from './AccountMe.module.css';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { updateUser } from '../../store/user-slice/async-actions/update-user';
import { ApiService } from '../../common/helpers/api.service';

export function AccountMe() {
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((s: RootState) => s.user.profile);

    const photoChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', `users/${profile?.uuid}/photo`);

        const updatePhoto = async (formData: FormData) => {
            try {
                const { file: photo_image } = await ApiService.upload(formData);
                dispatch(updateUser({ photo_image }));
            } catch {
                console.log('Не удалось загрузить изображение');
            }
        };
        updatePhoto(formData);
    };

    return (
        <div className={cn(styles.account_me__container)}>
            <div className={styles.photo_block}>
                <div className={styles.title}>Фото</div>
                <label className={styles.file_input__label} htmlFor="photo_image">
                    <img src={profile?.photo_image ?? '/photo.png'} alt="Фото профиля" />
                </label>
                <input onChange={photoChangeHandler} className={styles.file_input} type="file" id="photo_image" />
            </div>
            <UpdateAccountForm
                name={profile?.name ?? ''}
                email={profile?.email ?? ''}
                phone_number={profile?.phone_number ?? ''}
            ></UpdateAccountForm>
        </div>
    );
}
