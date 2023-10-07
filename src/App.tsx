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
    return (
        <>
            <Calculator
                buttons={config.buttons}
                historyLength={config.historyLength}
                className='calculator'
                localStorKey='calculator'
            />
            <Calculator
                buttons={config.buttons}
                historyLength={config.historyLength}
                className='calculator'
                localStorKey='calculator-2'
            />
        </>
    );
};

export default App;
