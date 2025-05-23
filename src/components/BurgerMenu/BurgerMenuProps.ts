import { HtmlHTMLAttributes } from 'react';

export interface IBurgerMenuProps extends HtmlHTMLAttributes<HTMLElement> {
    onClose: () => void;
    isAuthorized: boolean;
    handlerLogout: () => void;
    handleLogin: () => void;
}
