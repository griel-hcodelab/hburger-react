
export type Burgers = {
    id: number;
    name: string;
    description: string;
    price: number;
}

export type Selectedburger = {
    id: number;
}

export type IngredientType = {
    id: number;
    name: string;
    description: string;
}

export type IngredientByType = {
    ingredient: IngredientType;
    price: string;
}