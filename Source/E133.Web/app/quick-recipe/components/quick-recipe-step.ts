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
	private _isLoaded: boolean;

	constructor(element: Element, scrollCoordinator: ScrollCoordinator) {
		this._scrollCoordinator = scrollCoordinator;
		this._element = element;
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

	get isLoaded(): boolean {
		if (this._isLoaded) {
			return this._isLoaded;
		}

		this._isLoaded = this._element.offsetHeight != 0;
		if (this._isLoaded) {
			var elementId = "#" + this._element.id;
			var scene = new ScrollMagic
				.Scene({ triggerElement: elementId, duration: this._element.offsetHeight })
				.setClassToggle(elementId, "active");

			this._scrollCoordinator.addScene(scene);
		}
	}
}
