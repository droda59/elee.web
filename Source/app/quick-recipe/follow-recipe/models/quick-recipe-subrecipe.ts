import { Ingredient } from "app/shared/models/ingredient";
import { QuickRecipeTimer } from "app/quick-recipe/follow-recipe/models/quick-recipe-timer";

export class QuickRecipeSubrecipe {
    id: number;
    title: string;
    completedSteps: number = 0;
    steps: Step[];
    ingredients: Ingredient[];
    timers: QuickRecipeTimer[];
}
