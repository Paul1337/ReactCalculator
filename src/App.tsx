import { useEffect, useState } from 'react';
import Calculator from './components/Calculator/Calculator';
import { EButtonType, TCalculatorButtons } from './components/Calculator/model/buttons';

interface IConfig {
    buttons: TCalculatorButtons;
    historyLength: number;
}

const config: IConfig = {
    buttons: [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        ['.', '/', '*', '+', '-'],
        ['(', ')'],
    ]
        .map((row) =>
            row.map((v) => ({
                type: EButtonType.Character,
                value: v,
            }))
        )
        .concat([
            [
                {
                    type: EButtonType.Calculate,
                    value: '=',
                },
                {
                    type: EButtonType.Backspace,
                    value: 'DEL',
                },
                {
                    type: EButtonType.Clear,
                    value: 'AC',
                },
            ],
        ]),
    historyLength: 5,
};

const App = () => {
    const [calculatorsCount, setCalculatorsCount] = useState(-1);

    const handleAdd = () => setCalculatorsCount((count) => count + 1);
    const handleRemove = () => setCalculatorsCount((count) => (count > 1 ? count - 1 : 0));

    useEffect(() => {
        if (calculatorsCount === -1) {
            const calcCount = localStorage.getItem('calculators-count');
            setCalculatorsCount(calculatorsCount ? Number(calcCount) : 0);
        } else {
            localStorage.setItem('calculators-count', calculatorsCount.toString());
        }
    }, [calculatorsCount]);

    return (
        <>
            <button className='control-btn' onClick={handleAdd}>
                Add (+)
            </button>
            <button className='control-btn' onClick={handleRemove}>
                Remove (-)
            </button>
            <div className='control-counter'>Count: {calculatorsCount}</div>
            <hr />
            <div>
                {new Array(Math.max(calculatorsCount, 0)).fill(0).map((el, ind) => (
                    <Calculator
                        key={ind}
                        buttons={config.buttons}
                        historyLength={config.historyLength}
                        className='calculator'
                        localStorKey={'calculator-' + ind}
                    />
                ))}
            </div>
        </>
    );
};

export default App;
