import cls from './Calculator.module.css';
import Input from './Input/Input';
import Layout from './Layout/Layout';
import { FC, useRef, useState } from 'react';
import ButtonContainer from './ButtonsContainer/ButtonsContainer';
import { useCalculator } from './hooks/useCalculator';
import History from './History/History';
import { TCalculatorButtons } from './model/buttons';
import ErrorLog from './ErrorLog/ErrorLog';

interface ICalculatorProps {
    className?: string;
    localStorKey: string;
    buttons: TCalculatorButtons;
    historyLength: number;
}

const Calculator: FC<ICalculatorProps> = (props) => {
    const { className, localStorKey, buttons, historyLength } = props;
    const [showHistory, setShowHistory] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const { expression, history, error, handleButton, handleInputChange, handleHistoryItemClick } =
        useCalculator({ localStorKey, buttons, historyLength, inputRef });
    const handleHistoryToggleClick = () => setShowHistory((prevState) => !prevState);

    return (
        <Layout className={className}>
            <Input
                ref={inputRef}
                value={expression}
                onChange={handleInputChange}
                onHistoryToggleClick={handleHistoryToggleClick}
            />
            <ErrorLog message={error} />
            <hr className={cls.splitter} />
            <ButtonContainer onButtonClick={handleButton} buttons={buttons} />
            {showHistory && <History historyItems={history} onItemClick={handleHistoryItemClick} />}
        </Layout>
    );
};

export default Calculator;
