import { FC, ReactNode } from 'react';
import cls from './Layout.module.css';
import classNames from 'classnames';

interface ILayoutProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

const Layout: FC<ILayoutProps> = (props) => {
    const { children, className, onClick } = props;
    return (
        <div onClick={onClick} className={classNames(cls.Layout, className)}>
            {children}
        </div>
    );
};

export default Layout;
