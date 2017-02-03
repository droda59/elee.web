import { autoinject, customElement } from 'aurelia-framework';

@customElement('recipe-preview')
@autoinject
export class RecipePreview {
	constructor(private element: Element) {

	}
}
