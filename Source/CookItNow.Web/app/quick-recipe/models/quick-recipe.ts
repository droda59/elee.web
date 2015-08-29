import {Ingredient} from "shared/models/ingredient"; 

export interface QuickRecipe {
    id : number;
    language: string;
    title : string;
    originalUrl : string;
    summary : string;
    originalServings : string;
    duration : Duration[];
    subrecipes : SubRecipe[];
    ingredients : Ingredient[];
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

export interface Step {
    subrecipeId: number;
    parts: Part[];
    postStep: Step;
}

export interface Part {
    type: string;
}

export interface IngredientPart extends Part {
    ingredient: Ingredient;
}

export interface TextPart extends Part {
    value: string;
}

export interface ActionPart extends Part {
    value: string;
}

export interface TimerPart extends Part {
    value: string;
    action: string;
}

export interface IngredientEnumerationPart extends Part {
    ingredients: Ingredient[];
}
