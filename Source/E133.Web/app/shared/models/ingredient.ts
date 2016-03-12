import {Quantity} from "shared/models/quantity";

export class Ingredient implements IngredientDto {
    id: number;
    subrecipeId: number;
    name: string;
    quantity: Quantity;
    requirements: string;
    replacements: Ingredient[];
    state: string;

    constructor(ingredient: IngredientDto) {
        this.id = ingredient.id;
        this.subrecipeId = ingredient.subrecipeId;
        this.name = ingredient.name;
        this.quantity = ingredient.quantity;
        this.requirements = ingredient.requirements;
        this.replacements = ingredient.replacements;

        this.state = "";
    }
}
export interface IngredientDto {
    id: number;
    subrecipeId: number;
    name: string;
    quantity: Quantity;
    requirements: string;
    replacements: Ingredient[];
}
