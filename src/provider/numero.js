import {create} from "zustand";
import {persist} from "zustand/middleware";



const useNumero = create(persist((set, ) => ({
    numero: 0,
    setNumero: (numero) => set({numero}),
})
    ,
    {
        name:'numero',
    }));

export default useNumero;