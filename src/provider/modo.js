import {create} from "zustand";
import {persist} from "zustand/middleware";
const useModo = create(persist((set) => ({
        mode: 'light',
        setMode: (mode) => set({ mode }),
    }),
    {
        name: 'modo',
    }));

export default useModo;


