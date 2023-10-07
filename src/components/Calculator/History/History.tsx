import { FC } from 'react';
import { IHistoryItem, THistory } from '../model/history';
import cls from './History.module.css';

interface IHistoryProps {
    historyItems: THistory;
    onItemClick?: (item: IHistoryItem) => void;
}

const History: FC<IHistoryProps> = (props) => {
    const { historyItems, onItemClick } = props;

    return (
        <div className={cls.InputHistory}>
            {historyItems.length > 0 ? (
                historyItems.map((item, ind) => (
                    <div
                        className={cls.historyItem}
                        key={item.expression + item.result + ind}
                        onClick={() => onItemClick?.(item)}
                    >
                        <span>{item.expression}</span>
                        <span> = {item.result}</span>
                    </div>
                ))
            ) : (
                <span>Здесь отображается история</span>
            )}
        </div>
    );
};

export default History;
