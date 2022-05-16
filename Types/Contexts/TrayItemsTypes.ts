export type TrayItemsTypes = {
    id: number | undefined | any;
    name: string | undefined | any;
    price: number | undefined | any;
}

// export type TrayItemsAditionals = {
//     id: number;
//     name: string;
//     price: number;
// }

export type TrayItemsContextType = {
    data: TrayItemsTypes | any;
}