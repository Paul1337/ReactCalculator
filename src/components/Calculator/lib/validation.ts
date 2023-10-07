import { TCalculatorButtons } from '../model/buttons';

export const validateExpression = (expression: string, buttons: TCalculatorButtons) => {
    for (let i = 0; i < expression.length; i++) {
        if (!validateExpressionChar(expression[i], buttons)) return false;
    }
    return true;
};

export const validateExpressionChar = (char: string, buttons: TCalculatorButtons) => {
    return buttons.flat().some((btn) => char === btn.value.toString());
};
