import {bindable} from "aurelia-framework";
import {inject} from "aurelia-framework";
import {Step} from "quick-recipe/models/quick-recipe";
import {ScrollCoordinator} from "quick-recipe/scroll-coordinator";
import * as ScrollMagic from "scrollmagic";

@inject (Element, ScrollCoordinator)
export class QuickRecipeStep {
	@bindable step: Step = null;

	private _scrollCoordinator: ScrollCoordinator;
	private _element: Element;

	constructor(element: Element, scrollCoordinator: ScrollCoordinator) {
		this._scrollCoordinator = scrollCoordinator;
		this._element = element;
	}

	attached() {
		var elementId = "#" + this._element.id;

		var scene = new ScrollMagic
			.Scene({ triggerElement: elementId, offset: 0, duration: window.innerHeight / 2 })
			.setClassToggle(elementId, "active");

		this._scrollCoordinator.addScene(scene);
	}

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
