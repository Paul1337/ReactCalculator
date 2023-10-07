import { FC } from 'react';
import cls from './ErrorLog.module.css';

interface IErrorLogProps {
    message: string;
}

const ErrorLog: FC<IErrorLogProps> = (props) => {
    const { message } = props;
    return <div className={cls.ErrorLog}>{message}</div>;
};

export default ErrorLog;
