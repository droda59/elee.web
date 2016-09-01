import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";
import {I18N, BaseI18N} from "aurelia-i18n";
import {HttpClient} from "aurelia-http-client";
import {EventAggregator} from "aurelia-event-aggregator";

@inject(HttpClient, Router, I18N, Element, EventAggregator)
export class Welcome extends BaseI18N {
  private _router: Router;
  private _httpClient: HttpClient;

  searchTerms: string = "";
  results: {}[] = undefined;

  constructor(httpClient: HttpClient, router: Router, i18n: I18N, element: Element, ea: EventAggregator) {
    super(i18n, element, ea);

    this._httpClient = httpClient;
    this._router = router;
  }

  searchRecipes(): void {
    let searchContainer = $("#search-container")[0];
    this._httpClient.createRequest(null)
      .withUrl("http://eleeapi.azurewebsites.net/api/quickrecipe/search?query=" + this.searchTerms)
      .withHeader("Accept", "application/json")
      .asGet()
      .send()
      .then(data => {
        this.results = data.content.slice(0, 8);
        $("html, body").animate({ scrollTop: searchContainer.offsetTop + searchContainer.offsetHeight }, 500);
      });
  }

  loadRecipe(id: string): void {
    this._router.navigateToRoute("quick-recipe", { "id": id }, undefined);
  }
}
