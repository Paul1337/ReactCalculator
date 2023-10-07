import { useState } from 'react';
import { useHistory } from './useHistory';
import { EButtonType, IButton, TCalculatorButtons } from '../model/buttons';
import { validateExpression } from '../lib/validation';
import { IHistoryItem } from '../model/history';
import { evaluate } from 'mathjs';

interface ICalculatorParams {
    localStorKey: string;
    buttons: TCalculatorButtons;
    historyLength: number;
    inputRef: React.RefObject<HTMLInputElement>;
}

export const useCalculator = (params: ICalculatorParams) => {
    const [expression, setExpression] = useState('');
    const [error, setError] = useState('');
    const [caretPos, setCaretPos] = useState(0);
    const { history, pushHistory } = useHistory({
        localStorKey: params.localStorKey,
        length: params.historyLength,
    });

    const clear = () => setExpression('');
    const deleteChar = () => {
        setExpression((expression) => {
            if (expression.length === 0) return expression;
            const pos = (params.inputRef.current?.selectionStart || caretPos) ?? expression.length;
            setCaretPos(pos - 1);
            return expression.substring(0, pos - 1) + expression.substring(pos);
        });
    };
    const tryAppendValue = (value: string) => {
        setExpression((expression) => {
            if (validateExpression(expression + value, params.buttons)) {
                return expression + value;
            } else {
                return expression;
            }
        });
    };
    const tryUpdateExpression = (value: string) => {
        setExpression((expression) => {
            if (validateExpression(value, params.buttons)) {
                return value;
            } else {
                return expression;
            }
        });
    };
    const calculate = () => {
        try {
            if (expression.length === 0) return;
            const result = evaluate(expression).toString();
            if (result !== expression && result.length > 0 && expression.length > 0) {
                pushHistory({ expression, result });
                setExpression(result);
                setError('');
            }
        } catch (err) {
            if (typeof err === 'string') {
                setError(err);
            } else if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const handleButton = (btn: IButton) => {
        switch (btn.type) {
            case EButtonType.Character:
                tryAppendValue(btn.value.toString());
                break;
            case EButtonType.Clear:
                clear();
                break;
            case EButtonType.Backspace:
                deleteChar();
                break;
            case EButtonType.Calculate:
                calculate();
                break;
        }
    };

    const handleInputChange = (newExpression: string) => {
        const lastChar = newExpression[newExpression.length - 1];
        const didInsertCharacter = newExpression.length > expression.length;
        if (didInsertCharacter && lastChar) {
            const button = params.buttons.flat().find((btn) => btn.value.toString() === lastChar);
            if (button) return handleButton(button);
        }
        tryUpdateExpression(newExpression);
    };

    const handleHistoryItemClick = (item: IHistoryItem) => tryUpdateExpression(item.expression);

    return {
        expression,
        history: history ?? [],
        error,

        handleButton,
        handleInputChange,
        handleHistoryItemClick,
    };
};
