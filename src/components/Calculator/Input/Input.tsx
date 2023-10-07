import cls from './Input.module.css';
import { ChangeEvent, forwardRef } from 'react';

interface IInputProps {
    onChange?: (value: string) => void;
    value: string;
    onHistoryToggleClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
    const { onChange, value, onHistoryToggleClick } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={cls.Input}>
            <input
                ref={ref}
                className={cls.inputField}
                onChange={handleChange}
                value={value}
                type='text'
            />
            <div className={cls.historyToggleButton} onClick={onHistoryToggleClick}></div>
        </div>
    );
});

export default Input;
