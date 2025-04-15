import { createPortal } from 'react-dom';
import { IModalProps } from './Modal-props';
import styles from './Modal.module.css';
import cn from 'classnames';
import { MouseEvent, useEffect } from 'react';

export function Modal({ className, children, isOpen, onClose, ...props }: IModalProps) {

    useEffect(() => {
        if (isOpen) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollBarWidth}px`;
            document.body.style.overflow = 'hidden';
        }
    
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
      }, [isOpen]);

    const closeModal = (e: MouseEvent) => {
            if (e.target.id === "modal") {
                onClose()
            } 
        
    }

    return !isOpen 
        ? null 
        : createPortal(
            <div id="modal" onClick={closeModal} className={cn(styles['modal'])}>
                <div className={cn(styles['modal-container'], className)}>
                    <div {...props} className={cn(styles['modal-content'], className)}>
                        <button onClick={() => onClose()} className={styles['modal-exit']}>
                            <img src="/icons/exit-icon.svg" alt="Иконка закрытия окна" />
                        </button>
                        {children}
                    </div>
                </div>
            </div>,
            document.getElementById('modal-root')! 
    )
}
