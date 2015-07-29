import {bindable} from "aurelia-framework";
import {Step} from "models/quick-recipe";

export class QuickRecipeStep {
	@bindable step: Step = null;
}
