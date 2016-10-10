export class QuickRecipeSubrecipe {
    id: number;
    title: string;
    completedSteps: number = 0;
    steps: Step[];
    ingredients: Ingredient[];
    timers: QuickRecipeTimer[];
}
