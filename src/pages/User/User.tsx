import { useNavigate, useParams } from 'react-router';
import styles from './User.module.css';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { GetUserResponseDto, ROLES } from 'contracts-green-shop';
import { ApiService } from '../../common/helpers/api.service';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Button } from '../../components/common/Button/Button';
import { EditField } from '../../components/EditField/EditField';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../store/app-slice/app.slice';
import { MESSAGE_TYPE } from '../../store/app-slice/enums/message-type';
import { RootState } from '../../store/store';
import { ROUTES } from '../../common/constants/routes';

export default function User() {
    const { uuid } = useParams();
    const [userData, setUserData] = useState<GetUserResponseDto | null>(null);

    const dispatch = useDispatch();
    const user = useSelector((s: RootState) => s.user.profile);
    const navigate = useNavigate();

    useEffect(() => {
        if (!uuid) {
            return;
        }
        const provideUserData = async () => {
            const result = await ApiService.getUser(uuid);
            setUserData(result);
        };

        provideUserData();
    }, [uuid]);

    const onSave = useCallback(
        async (arg: Record<string, string>): Promise<boolean> => {
            try {
                await ApiService.updateAdminUser(uuid!, arg);
                dispatch(appActions.setMessage({ content: 'Данные профиля спешно обновлены', type: MESSAGE_TYPE.SUCCESS }));
                return true;
            } catch {
                return false;
            }
        },
        [dispatch, uuid],
    );

    const photoChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !uuid || !userData) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', `users/${uuid}/photo`);

        const updatePhoto = async (formData: FormData) => {
            try {
                const { file: photo_image } = await ApiService.upload(formData);
                await ApiService.updateAdminUser(uuid!, { photo_image });
                dispatch(appActions.setMessage({ content: 'Фото профиля успешно обновлено', type: MESSAGE_TYPE.SUCCESS }));
                setUserData((prev) => {
                    if (prev) {
                        return { ...prev, photo_image };
                    }
                    return null;
                });
            } catch {
                console.log('Не удалось загрузить изображение');
            }
        };
        updatePhoto(formData);
    };

    const handleAddAdmin = useCallback(async () => {
        if (!userData) {
            return;
        }
        await ApiService.addAdminUser(userData.email);
        dispatch(appActions.setMessage({ content: 'Пользователь успешно назначен администратором', type: MESSAGE_TYPE.SUCCESS }));
        setUserData((prev) => {
            if (prev) {
                return { ...prev, role: ROLES.ADMIN };
            }
            return null;
        });
    }, [dispatch, userData]);

    const handleDelete = useCallback(async () => {
        if (!user || !userData) {
            return;
        }

        if (user.uuid === userData.uuid) {
            dispatch(
                appActions.setMessage({
                    content: 'Нельзя удалить свою учетную запись, необходимо обратится в поддержку',
                    type: MESSAGE_TYPE.ERROR,
                }),
            );
            return;
        }

        if (userData.role === ROLES.ADMIN) {
            dispatch(
                appActions.setMessage({
                    content: 'Нельзя удалить администратора',
                    type: MESSAGE_TYPE.ERROR,
                }),
            );
            return;
        }

        await ApiService.deleteAdminUser(userData.uuid);
        dispatch(appActions.setMessage({ content: 'Пользователь успешно удален', type: MESSAGE_TYPE.SUCCESS }));
        navigate(ROUTES.admin.users);
    }, [dispatch, navigate, user, userData]);

    return (
        <div className={styles.page}>
            {userData && (
                <>
                    <div className={styles.left_panel}>
                        <div className={styles.photo_block}>
                            <div className={styles.title}>Фото</div>
                            <label className={styles.file_input__label} htmlFor="photo_image">
                                <img src={userData.photo_image || '/image-not-found.png'} alt="Фото профиля" />
                            </label>
                            <input onChange={photoChangeHandler} className={styles.file_input} type="file" id="photo_image" />
                        </div>
                        <div className={styles.space_div}>
                            ID: <span>{userData.uuid}</span>
                        </div>
                        <div className={styles.space_div}>
                            Имя: <EditField value={userData.name || 'Не указано'} fieldName="name" onSave={onSave}></EditField>
                        </div>
                        <div className={styles.space_div}>
                            Почта: <EditField value={userData.email} fieldName="email" onSave={onSave}></EditField>
                        </div>
                        <div className={styles.space_div}>
                            Номер телефона:{' '}
                            <EditField
                                value={userData.phone_number || 'Не указано'}
                                fieldName="phone_number"
                                onSave={onSave}
                            ></EditField>
                        </div>
                        <div className={styles.space_div}>
                            Роль: <span>{userData.role}</span>
                        </div>
                        <div className={styles.space_div}>
                            Создан: <span>{new Date(userData.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className={styles.space_div}>
                            Обновлен: <span>{new Date(userData.updated_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className={styles.right_panel}>
                        <Button onClick={handleAddAdmin}>Назначить администратором</Button>
                        <Button onClick={handleDelete} isDelete={true}>
                            Удалить пользователя
                        </Button>
                    </div>
                </>
            )}
            {!userData && <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: 'green' }} spin />} />}
        </div>
    );
}
