import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch, SetStateAction } from "react";
import { ListItem, ShoppingList } from "../modules/ShoppingList/interface";

export const removeItem = (array: ListItem[], itemName: string, setter: Dispatch<SetStateAction<ListItem[]>>) => {
    let newArray = array.filter((item) => item.name !== itemName);
    console.log("NewArray:", newArray)
    setter(newArray)
}

export const saveListsOnStorage = async (lists: ShoppingList[]) => {
    try {
        const listsJson = JSON.stringify(lists)
        await AsyncStorage.setItem('ShoppingLists', listsJson);
        console.log('Datos guardados correctamente.', listsJson);
    } catch (error) {
        console.log('Error al guardar los datos:', error);
    }
};