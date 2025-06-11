import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { UpdateUserRequestDto } from 'contracts-green-shop';
import { ApiService } from '../../../common/helpers/api.service';
import { appActions } from '../../app-slice/app.slice';
import { MESSAGE_TYPE } from '../../app-slice/enums/message-type';

export const updateUser = createAsyncThunk('user/update', async (updateData: UpdateUserRequestDto, {dispatch}) => {
    try {
        const data = ApiService.updateUser(updateData);
        dispatch(appActions.setMessage({ type: MESSAGE_TYPE.SUCCESS, content: 'Данные обновлены' }));
        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            throw new Error(e.response?.data.error);
        }
        throw new Error('Неизвестная ошибка');
    }
});
