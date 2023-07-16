import { create } from "zustand";
import { ShoppingList } from "./src/modules/ShoppingList/interface";
import { saveListsOnStorage } from "./src/utils/utils";

type ShoppingListState = {
    listOfShoppingLists: ShoppingList[];
    updateList: (list: ShoppingList, id: number) => void;
    updateListStorage: (lists: ShoppingList[]) => void;
    removeList: (id: number) => void;
};

export const useStore = create<ShoppingListState>((set) => ({
    listOfShoppingLists: [],
    updateList: (list: ShoppingList, id: number) =>
        set((state) => {
            const existingIndex = state.listOfShoppingLists.findIndex(
                (item) => item.id === id
            );

            if (existingIndex !== -1) {
                // Si el ID ya existe, realizar la actualización
                const updatedLists = [...state.listOfShoppingLists];
                updatedLists[existingIndex] = list;
                saveListsOnStorage(updatedLists);

                return { listOfShoppingLists: updatedLists };
            } else {
                // Si el ID no existe, agregar un nuevo elemento al array
                const updatedLists = [...state.listOfShoppingLists, list];
                saveListsOnStorage(updatedLists);
                return { listOfShoppingLists: updatedLists };
            }
        }),
    updateListStorage: (lists: ShoppingList[]) =>
        set(() => {
            return { listOfShoppingLists: lists };
        }),
    removeList: (id: number) =>
        set((state) => {
            const updatedLists = state.listOfShoppingLists.filter(
                (item) => item.id !== id
            );
            console.log("UpdatedList: ", updatedLists)
            saveListsOnStorage(updatedLists);
            return { listOfShoppingLists: updatedLists };
        }),
}));
