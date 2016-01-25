import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";
import {I18N} from 'aurelia-i18n';

@inject (Router, I18N, Element)
export class Welcome {
	private _router: Router;
	private _i18n: I18N;
	private _element: Element;

	selectedRecipeId: string;
	recipes: {}[] = [];
	popularCategories: {}[] = [];

	constructor(router: Router, i18n: I18N, element: Element) {
		this._router = router;
		this._i18n = i18n;
		this._element = element;

		this.recipes.push({ id: "1", title: "Pouding au chocolat" });

		this.popularCategories.push({ id: "1", title: "Asie", cover: "/app/welcome/assets/images/categ1.png" });
		this.popularCategories.push({ id: "2", title: "Dessert", cover: "/app/welcome/assets/images/categ2.png" });
		this.popularCategories.push({ id: "3", title: "Sans gluten", cover: "/app/welcome/assets/images/categ3.png" });
		this.popularCategories.push({ id: "4", title: "BBQ", cover: "/app/welcome/assets/images/categ4.png" });
	}

	attached(){
		this._i18n.updateTranslations(this._element);

		var scrollStart = 0;
	   	var startchange = $(".popular-categories-container");
		var nav = $("nav");
		var offset = startchange.offset();
		var navHeight = nav.height();
	    if (startchange.length) {
	   		$(document).scroll(function() {
	      		scrollStart = $(this).scrollTop();
	      		if(scrollStart > offset.top - navHeight) {
	          		nav.addClass("primary-color");
	       		} else {
	          		nav.removeClass("primary-color");
	       		}
	   		});
	    }
	}

	loadRecipe() {
		this._router.navigateToRoute("quick-recipe", { "id": this.selectedRecipeId }, undefined);
	}

	changeLocale() {
		var newLocale;
		var currentLocale = this._i18n.getLocale();
		if (currentLocale === "fr") {
			newLocale = "en";
		} else if (currentLocale === "en") {
			newLocale = "fr";
		}

        this._i18n
            .setLocale(newLocale)
            .then(() => {
				this._i18n.updateTranslations(this._element);
        	});
	}
}
