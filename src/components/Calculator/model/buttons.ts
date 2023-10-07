export enum EButtonType {
    Character = 'Char',
    Clear = 'Clear',
    Backspace = 'Backspace',
    Calculate = 'Calculate',
}

export interface IButton {
    type: EButtonType;
    value: string | number;
}

export type TCalculatorButtons = Array<Array<IButton>>;
