import {create} from "zustand";
import {persist} from "zustand/middleware";


const useTiempo=create(persist((set,get) => ({
    tiempo:0,
    setTiempo:(tiempo)=>set({tiempo}),
}),
{
    name:'tiempo',
}
));

export default useTiempo;
