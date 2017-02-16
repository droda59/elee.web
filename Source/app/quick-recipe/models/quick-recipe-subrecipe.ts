import { Ingredient } from "app/shared/models/ingredient";
import { Step } from "app/quick-recipe/models/quick-recipe";
import { QuickRecipeTimer } from "app/quick-recipe/models/quick-recipe-timer";

export class QuickRecipeSubrecipe {
    id: number;
    title: string;
    completedSteps: number = 0;
    steps: Step[];
    ingredients: Ingredient[];
    timers: QuickRecipeTimer[];
}
