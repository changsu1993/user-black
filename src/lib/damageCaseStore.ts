import { create } from 'zustand'


interface Damage {
    data:any// Assuming imagePaths are strings, adjust if they have a different type
}  

interface Store {
    damages: any[];
    query:"",
    addDamage: (damage: Damage) => void;
    setQuery: (query:any) => void;
  }

const useStore = create<Store>((set) => ({
    damages: [],
    query:"",
  
    setQuery: (query) => set((state) => ({ query })),
    addDamage: (damage) => set((state) => ({ damages: [...state.damages, damage] })),
  }));
  
  export default useStore;