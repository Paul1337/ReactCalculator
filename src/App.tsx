import Button from './components/Button/Button';
import Input from './components/Input/Input';
import Layout from './components/Layout/Layout';
import cls from './App.module.css';
import { useStore } from './store';
import { config } from './config';

const App = () => {
    const { append } = useStore();

    const handleButtonClick = (char: string) => {
        append(char);
    };

    return (
        <Layout>
            <Input />
            <hr />
            <div className={cls.buttonsContainer}>
                {config.buttons
                    .map((v) => v.toString())
                    .map((char, ind) => {
                        return [
                            ind % config.buttonsInRow === 0 && ind > 0 && <br key={'br' + char + ind} />,
                            <Button
                                value={char}
                                key={char + ind}
                                onClick={() => handleButtonClick(char)}
                            />,
                        ].filter(Boolean);
                    })}
            </div>
        </Layout>
    );
};

export default App;
