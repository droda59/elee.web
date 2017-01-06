import {autoinject} from "aurelia-framework";
import {RecipeBackgroundService} from "app/quick-recipe/recipe-background-service";
import {BackgroundDefinition} from "app/administration/backgrounds/models/background-definition";

@autoinject()
export class BackgroundAdministration {
    backgroundDefinitions: Array<BackgroundDefinition> = [];
    jsonOutput: string;

    private _recipeBackgroundService: RecipeBackgroundService;

    constructor(recipeBackgroundService: RecipeBackgroundService) {
        this._recipeBackgroundService = recipeBackgroundService;
    }

    // TODO Use virtualization, mad image loading here
    activate() {
        return this._recipeBackgroundService.getBackgrounds()
            .then(response => {
                this.backgroundDefinitions = response.map(content => new BackgroundDefinition(content));
            });
    }

    saveBackgrounds() {
        this.backgroundDefinitions.forEach(backgroundDefinition => {
            backgroundDefinition.qualifiers = backgroundDefinition.tagQualifiers.map(tagQualifier => tagQualifier.tag);
        });

        this.jsonOutput = this._syntaxHighlight(this._recipeBackgroundService.saveBackgrounds(this.backgroundDefinitions));
    }

    private _syntaxHighlight(json) {
        if (typeof json != 'string') {
             json = JSON.stringify(json, undefined, 2);
        }

        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
}
