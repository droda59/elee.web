import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";
import {I18N} from 'aurelia-i18n';

@inject (Router, I18N, Element)
export class Welcome {
	private _router: Router;
	private _i18n: I18N;
	private _element: Element;

	selectedRecipeId: string;
	recipeGroups: {}[] = [];
	popularCategories: {}[] = [];

	constructor(router: Router, i18n: I18N, element: Element) {
		this._router = router;
		this._i18n = i18n;
		this._element = element;

		this.recipeGroups.push({ label: "Asie", recipes: [
			{ id: "56a6c09d44fd4666d1194b72", title: "Tofu Général Tao", imageUrl: "http://www.ricardocuisine.com/pictures/cache/21e594b4edcc407cd10ee798646a21e0_w500_h675_sc.jpg" }
		]});

		this.recipeGroups.push({ label: "Collations", recipes: [
			{ id: "56ae7adb44fd4675fc7ed181", title: "Galettes à la mélasse", imageUrl: "http://www.ricardocuisine.com/pictures/cache/ffb7fce413436c47aefe74780199e293_w500_h675_sc.jpg" },
			{ id: "56ae7aa744fd4675fc7ed180", title: "Muffins aux framboises et au kéfir", imageUrl: "http://www.ricardocuisine.com/pictures/cache/f814dea38125bd850165339182aa81da_w500_h675_sc.jpg" }
		]});

		this.recipeGroups.push({ label: "Desserts", recipes: [
			{ id: "56a6c32144fd4666d1194b77", title: "Biscuits moelleux aux brisures de chocolat (les meilleurs)", imageUrl: "http://www.ricardocuisine.com/pictures/cache/31fd16ca0f4aa9df266583d6fdde1d36_w500_h675_sc.jpg" },
			{ id: "56a6c11444fd4666d1194b73", title: "Carré aux dattes (le meilleur)", imageUrl: "http://www.ricardocuisine.com/pictures/cache/5ac64bed352f8b0cb8bfbdde7208fa42_w500_h675_sc.jpg" },
			{ id: "56a6c13744fd4666d1194b74", title: "Gâteau au chocolat au coeur fondant", imageUrl: "http://www.ricardocuisine.com/pictures/cache/b408dddbdfa3c7feee4a1cfb278b7d4d_w500_h675_sc.jpg" },
			{ id: "56ab7acf44fd466ff20f9f97", title: "Gâteau au fromage (le meilleur)", imageUrl: "http://www.ricardocuisine.com/pictures/cache/4ddbb475cba801b158d011ef1e29eb5d_w500_h675_sc.jpg" },
			{ id: "56a6c36644fd4666d1194b78", title: "Pouding au chocolat", imageUrl: "http://www.ricardocuisine.com/pictures/cache/cf9e63cbb4b40428e4277afdf36edf5d_w500_h675_sc.jpg" }
		]});

		this.recipeGroups.push({ label: "Mijoteuse", recipes: [
			{ id: "56ae7a2a44fd4675fc7ed17e", title: "Boeuf Stroganov en mijoteuse", imageUrl: "http://www.ricardocuisine.com/pictures/cache/e16d13338d7a9873d35aff7103a03908_w500_h675_sc.jpg" },
			{ id: "56ae79da44fd4675fc7ed17d", title: "Effiloché de porc barbecue (pulled pork)", imageUrl: "http://www.ricardocuisine.com/pictures/cache/7e4648c06303e58834301a5f9180390a_w500_h675_sc.jpg" },
			{ id: "56aee92244fd467fb1b8b6d6", title: "Jambon à l'érable et à la bière à la mijoteuse", imageUrl: "http://www.ricardocuisine.com/pictures/cache/7a44a72235792cd6a04c032c73690c60_w500_h675_sc.jpg" },
			{ id: "56ae7a6844fd4675fc7ed17f", title: "Mijoté de veau et de patates douces à la mijoteuse", imageUrl: "http://www.ricardocuisine.com/pictures/cache/a4bc26afe45667762d10749e47572030_w500_h675_sc.jpg" }
		]});

		this.recipeGroups.push({ label: "Repas", recipes: [
			{ id: "56ae7a2a44fd4675fc7ed17e", title: "Boeuf Stroganov en mijoteuse", imageUrl: "http://www.ricardocuisine.com/pictures/cache/e16d13338d7a9873d35aff7103a03908_w500_h675_sc.jpg" },
			{ id: "56ae79da44fd4675fc7ed17d", title: "Effiloché de porc barbecue (pulled pork)", imageUrl: "http://www.ricardocuisine.com/pictures/cache/7e4648c06303e58834301a5f9180390a_w500_h675_sc.jpg"},
			{ id: "56aee92244fd467fb1b8b6d6", title: "Jambon à l'érable et à la bière à la mijoteuse", imageUrl: "http://www.ricardocuisine.com/pictures/cache/7a44a72235792cd6a04c032c73690c60_w500_h675_sc.jpg" },
			{ id: "56ae7a6844fd4675fc7ed17f", title: "Mijoté de veau et de patates douces à la mijoteuse", imageUrl: "http://www.ricardocuisine.com/pictures/cache/a4bc26afe45667762d10749e47572030_w500_h675_sc.jpg" },
			{ id: "56a6c30844fd4666d1194b76", title: "Pâté au poulet (le meilleur)", imageUrl: "http://www.ricardocuisine.com/pictures/cache/9c0f876d5ab0a106ef7152b7a63f99d4_w500_h675_sc.jpg" },
			{ id: "56a6c2e644fd4666d1194b75", title: "Sauce à spaghetti (la meilleure)", imageUrl: "http://www.ricardocuisine.com/pictures/cache/da66d34107c17a5a480195ab6ddd5a2c_w500_h675_sc.jpg" },
			{ id: "56a6c09d44fd4666d1194b72", title: "Tofu Général Tao", imageUrl: "http://www.ricardocuisine.com/pictures/cache/21e594b4edcc407cd10ee798646a21e0_w500_h675_sc.jpg" }
		]});

		// this.popularCategories.push({ id: "1", title: "Asie", cover: "dist/welcome/assets/images/categ1.png" });
		// this.popularCategories.push({ id: "2", title: "Dessert", cover: "dist/welcome/assets/images/categ2.png" });
		// this.popularCategories.push({ id: "3", title: "Sans gluten", cover: "dist/welcome/assets/images/categ3.png" });
		// this.popularCategories.push({ id: "4", title: "BBQ", cover: "dist/welcome/assets/images/categ4.png" });
	}

	attached(){
		this._i18n.updateTranslations(this._element);

		var scrollStart = 0;
		var nav = $("nav");
		var offset = $(".how-it-works-container").offset().top;
		var navHeight = nav.height();
   		$(document).scroll(function() {
      		scrollStart = $(this).scrollTop();
      		if(scrollStart > offset - navHeight) {
          		nav.addClass("primary-color");
       		} else {
          		nav.removeClass("primary-color");
       		}
   		});
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
