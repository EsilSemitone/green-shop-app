import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import styles from './AccountAddress.module.css';
import cn from 'classnames';
import { FormEvent, useState } from 'react';

export function AccountAddress() {
    const submit = async (e: FormEvent) => {
        console.log(e);
    };

    return (
        <div className={cn(styles['account-me--container'])}>
            <form className={cn(styles['account-form'])} onSubmit={submit}>
                <div className={styles['form-module']}>
                    <div className={styles['title']}>Billing Address</div>
                    <div>The following addresses will be used on the checkout page by default.</div>
                    <div className={styles['form-item']}>
                        <label className={styles['form-item--title']} htmlFor="city">
                            Town / City
                        </label>
                        <Input
                            className={cn(styles['login-form--input'])}
                            type="text"
                            id="city"
                            placeholder="Enter your email address"
                        ></Input>
                    </div>
                    <div className={styles['form-item']}>
                        <label className={styles['form-item--title']} htmlFor="city">
                            Street Address
                        </label>
                        <Input
                            className={cn(styles['login-form--input'])}
                            type="text"
                            id="street"
                            placeholder="Enter your email address"
                        ></Input>
                    </div>
                    <div className={styles['form-item']}>
                        <label className={styles['form-item--title']} htmlFor="phone-number">
                            Phone Number
                        </label>
                        <Input
                            className={cn(styles['login-form--input'])}
                            type="text"
                            id="hone-number"
                            placeholder="Enter your email address"
                        ></Input>
                    </div>
                </div>
                <Button className={styles['submit-button']}>Save Address</Button>
            </form>
        </div>
    );
}
