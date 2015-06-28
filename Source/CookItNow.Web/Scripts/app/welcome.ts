import {jQuery} from "jquery";

export class Welcome {
	selectedRecipeId: number;
	recipes: {}[] = [];
	
	constructor() {
		this.recipes.push({ id: 1, title: "Pouding au chocolat" });
		this.recipes.push({ id: 2, title: "Gaufres" });
	}
	
	attached() {
	    $('.parallax').parallax();
	}
}