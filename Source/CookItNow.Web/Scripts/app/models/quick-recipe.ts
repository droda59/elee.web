import {Quantity} from "models/quantity"; 

export interface QuickRecipe {
    id : number;
    title : string;
    originalUrl : string;
    summary : string;
    originalServings : number;
    duration : Duration[];
    subrecipes : SubRecipe[];
    ingredients : Ingredient[];
    requirements: Requirement[];
    steps: Step[];
}

export interface Duration {
    title: string;
    time: string;
}

export interface SubRecipe {
    id: number;
    title: string;
}

export interface Ingredient {
    id: number;
    subrecipeId: number;
    name: string;
    quantity: Quantity;
    requirements: string[];
    replacements: Ingredient[];
}

export interface Requirement {
    action: string;
    ingredientId: number;
}

export interface Step {
    subrecipeId: number;
    description: string;
    postStep: Step;
}
