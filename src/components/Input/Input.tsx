import { ChangeEvent } from 'react';
import { useStore } from '../../store';
import cls from './Input.module.css';
import { config } from '../../config';

const Input = () => {
    const { expression, update } = useStore();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const lastChar = e.target.value[e.target.value.length - 1];
        if (!lastChar || config.buttons.some((char) => char == lastChar)) {
            update(e.target.value);
        }
    };

    return (
        <div className={cls.Input}>
            <input className={cls.inputField} onChange={handleChange} type='text' value={expression} />
            <div className={cls.historyToggleButton}></div>
        </div>
    );
};

export default Input;
