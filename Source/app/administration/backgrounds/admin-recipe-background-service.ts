import {inject, NewInstance} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {BackgroundDefinitionDto} from "app/quick-recipe/models/background-definition";
import "fetch";

@inject(NewInstance.of(HttpClient))
export class AdminRecipeBackgroundService {
    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient.configure(config => {
            config
                .useStandardConfiguration();
        });
    }

    generateDefinitions(backgrounds: Array<BackgroundDefinitionDto>): string {
        var backgroundDefinitions = backgrounds.map(background =>
            <BackgroundDefinitionDto>{ fileName: background.fileName, qualifiers: background.qualifiers }
        );

        return JSON.stringify(backgroundDefinitions, null, 2);
    }
}
