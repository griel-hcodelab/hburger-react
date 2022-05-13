export type TrayItemsTypes = {
    id: number | undefined | any;
    name: string | undefined | any;
    price: number | undefined | any;
    setId: (id: any)=>void;
    setName: (name: any)=>void;
    setPrice: (price: any)=>void;
}

// export type TrayItemsAditionals = {
//     id: number;
//     name: string;
//     price: number;
// }

export type TrayItemsContextType = {
    data: TrayItemsTypes | any;
}