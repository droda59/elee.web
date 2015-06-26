export interface QuickRecipe {
    id : number;
    title : string;
    originalUrl : string;
    summary : string;
    originalServings : number;
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

export interface Ingredient {
    id: number;
    subrecipeId: number;
    name: string;
    quantity: Quantity;
    requirements: string[];
    replacements: Ingredient[];
}

export interface Quantity {
    value: number;
    originalMeasureUnit: string;
}

export interface Step {
    subrecipeId: number;
    description: string;
    postStep: Step;
}
