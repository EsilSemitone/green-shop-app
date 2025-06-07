import { RouterProvider } from 'react-router';
import { ROUTER } from './router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFavorites } from './store/favorites/async-actions/get-all-favorites';
import { AppDispatch, RootState } from './store/store';
import { getProfile } from './store/user-slice/async-actions/get-profile';
import { message } from 'antd';
import { appActions } from './store/app-slice/app.slice';

export function App() {
    const dispatch = useDispatch<AppDispatch>();
    const msg = useSelector((s: RootState) => s.app.message);

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        dispatch(getProfile());
        dispatch(getAllFavorites());
    }, [dispatch]);

    useEffect(() => {
        if (!msg) {
            return;
        }

        messageApi.open({
            type: msg.type,
            content: msg.content,
        });
        dispatch(appActions.setMessage(null))
    }, [msg]);

    return (
        <>
            {contextHolder}
            <RouterProvider router={ROUTER}></RouterProvider>
        </>
    );
}   
