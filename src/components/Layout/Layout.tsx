import { FC, ReactNode } from 'react';
import cls from './Layout.module.css';

interface ILayoutProps {
    children: ReactNode;
}

const Layout: FC<ILayoutProps> = (props) => {
    const { children } = props;
    return <div className={cls.Layout}>{children}</div>;
};

export default Layout;
