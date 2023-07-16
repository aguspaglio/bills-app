export type ListItem = {
    name: string;
    isChecked: boolean,
}

export type ShoppingList = {
    id: number,
    list: ListItem[]
}