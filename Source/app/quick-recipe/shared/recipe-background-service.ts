import {inject, NewInstance} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {BackgroundDefinitionDto} from "app/quick-recipe/backgrounds/models/background-definition";
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
        return this._httpClient.fetch("dist/app/quick-recipe/backgrounds/assets/background-definitions.json")
            .then(response => response.json());
    }

    saveBackgrounds(backgrounds: Array<BackgroundDefinitionDto>): string {
        var backgroundDefinitions = backgrounds.map(background =>
            <BackgroundDefinitionDto>{ fileName: background.fileName, qualifiers: background.qualifiers }
        );

        return JSON.stringify(backgroundDefinitions, null, 2);
    }
}
