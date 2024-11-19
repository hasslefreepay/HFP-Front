import {create} from "zustand";
import {persist} from "zustand/middleware";



const useNumeroA = create(persist((set,) => ({
    numeroa: 0,
    setNumeroa: (numeroa) => set({numeroa}),
})
    ,
    {
        name:'numero',
    }));

export default useNumeroA;