import {bindable} from "aurelia-framework";
import {Step} from "quick-recipe/models/quick-recipe";

export class QuickRecipeStep {
	@bindable step: Step = null;
	
	isTechnicalStep(): boolean {
		if (!this.step) {
			return false;
		}
		
		var ingredientParts = this.step.parts.filter(
			(part) => part.type == "ingredient" || part.type == "enumeration"
		);
			
		return ingredientParts.length === 0;
	}
}
