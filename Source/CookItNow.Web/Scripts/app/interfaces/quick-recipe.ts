export interface IQuickRecipe {
    id : number;
    title : string;
    originalUrl : string;
    summary : string;
    originalServings : number;
    duration : IDuration[];
    subrecipes : ISubRecipe[];
    ingredients : IIngredient[];
    steps: IStep[];
}

export interface IDuration {
    title: string;
    time: string;
}

export interface ISubRecipe {
    id: number;
    title: string;
}

export interface IIngredient {
    id: number;
    subrecipeId: number;
    name: string;
    quantity: IQuantity;
    requirements: string[];
    replacements: IIngredient[];
}

export interface IQuantity {
    value: number;
    originalMeasureUnit: string;
}

export interface IStep {
    subrecipeId: number;
    description: string;
    postStep: IStep;
}