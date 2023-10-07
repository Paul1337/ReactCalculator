import Button from '../Button/Button';
import { IButton, TCalculatorButtons } from '../model/buttons';
import cls from './ButtonsContainer.module.css';
import { FC } from 'react';

interface IButtonsContainerProps {
    onButtonClick: (btn: IButton) => void;
    buttons: TCalculatorButtons;
}

const ButtonsContainer: FC<IButtonsContainerProps> = (props) => {
    const { onButtonClick, buttons } = props;

    return (
        <div className={cls.ButtonsContainer}>
            {buttons.map((row, ind) => (
                <div className={cls.buttonsRow} key={ind}>
                    {row.map((btn, ind) => (
                        <Button
                            value={btn.value.toString()}
                            key={btn.value.toString() + ind}
                            onClick={() => onButtonClick(btn)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ButtonsContainer;
