import {Quantity} from "shared/models/quantity"; 

export interface Ingredient {
    id: number;
    subrecipeId: number;
    name: string;
    quantity: Quantity;
    requirements: string[];
    replacements: Ingredient[];
}