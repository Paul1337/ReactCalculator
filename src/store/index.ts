import { create } from 'zustand';

interface IExperssionState {
    expression: string;
    clear: () => void;
    update: (value: string) => void;
    append: (value: string) => void;
}

export const useStore = create<IExperssionState>()((set, get) => ({
    expression: '',
    clear() {
        set({ expression: '' });
    },
    append(value: string) {
        const newExpression = get().expression + value;
        get().update(newExpression);
    },
    update(value: string) {
        if (value[value.length - 1] === '=') {
            try {
                set({ expression: eval(value.substring(0, value.length - 1)) });
            } catch (err) {
                console.log(err);
            }
        } else {
            set({ expression: value });
        }
    },
}));
