import {inject, NewInstance} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {BackgroundDefinitionDto} from "app/quick-recipe/models/background-definition";
import "fetch";

@inject(NewInstance.of(HttpClient))
export class RecipeBackgroundService {
    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient.configure(config => {
            config
                .useStandardConfiguration();
        });
    }

    getBackgrounds(): Promise<Array<BackgroundDefinitionDto>> {
        return this._httpClient.fetch("dist/app/quick-recipe/assets/background-definitions.json")
            .then(response => response.json());
    }
}
