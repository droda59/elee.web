import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";
import {I18N, BaseI18N} from "aurelia-i18n";
import {EventAggregator} from "aurelia-event-aggregator";
import {QuickRecipeService} from "app/shared/quick-recipe-service";

@inject(Element, Router, I18N, EventAggregator, QuickRecipeService)
export class Welcome extends BaseI18N {
    private _router: Router;
    private _service: QuickRecipeService;

    searchTerms: string = "";
    results: {}[] = undefined;

    constructor(element: Element, router: Router, i18n: I18N, ea: EventAggregator, service: QuickRecipeService) {
        super(i18n, element, ea);

        this._service = service;
        this._router = router;
    }

    searchRecipes(): void {
        this._service.findRecipes(this.searchTerms)
            .then(response => {
                this.results = response.slice(0, 8);
                let searchContainer = $("#search-container")[0];
                $("html, body").animate({ scrollTop: searchContainer.offsetTop + searchContainer.offsetHeight }, 500);
            });
    }

    loadRecipe(id: string): void {
        this._router.navigateToRoute("quick-recipe", { "id": id }, undefined);
    }
}
