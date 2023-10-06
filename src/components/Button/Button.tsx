import { FC } from 'react';
import cls from './Button.module.css';

interface IButtonProps {
    value: string;
    onClick?: () => void;
}

const Button: FC<IButtonProps> = (props) => {
    const { value, onClick } = props;
    return (
        <div className={cls.Button} onClick={onClick}>
            <span className={cls.value}>{value}</span>
        </div>
    );
};

export default Button;
