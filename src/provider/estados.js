import {create} from "zustand";
import {persist} from "zustand/middleware";
const useEmail = create(persist((set) => ({
    correo: '',
    setCorreo: (correo) => set({ correo }),
}),
    {
    name: 'email',
}));

export default useEmail;


