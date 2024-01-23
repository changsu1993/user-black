import { create } from 'zustand'


interface Damage {
    data:any// Assuming imagePaths are strings, adjust if they have a different type
}  

interface Store {
    damages: any[];
    addDamage: (damage: Damage) => void;
  }

const useStore = create<Store>((set) => ({
    damages: [],
    addDamage: (damage) => set((state) => ({ damages: [...state.damages, damage] })),
  }));
  
  export default useStore;