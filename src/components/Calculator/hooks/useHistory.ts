import { useEffect, useState } from 'react';
import { IHistoryItem, THistory } from '../model/history';

interface IHistoryParams {
    localStorKey: string;
    length: number;
}

export const useHistory = (params: IHistoryParams) => {
    const [history, setHistory] = useState<THistory | null>(null);

    useEffect(() => {
        if (history) {
            localStorage.setItem(params.localStorKey, JSON.stringify(history));
        } else {
            const localData = localStorage.getItem(params.localStorKey);
            if (localData) {
                setHistory(JSON.parse(localData));
            } else {
                setHistory([]);
            }
        }
    }, [history]);

    const pushHistory = (item: IHistoryItem) => {
        if (history?.some((hisItem) => hisItem.expression === item.expression)) return;
        setHistory((prevHistory) => [item, ...(prevHistory ?? []).slice(0, params.length - 1)]);
    };

    return {
        history,
        pushHistory,
    };
};
