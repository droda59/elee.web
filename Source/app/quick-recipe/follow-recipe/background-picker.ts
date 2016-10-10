import {autoinject} from "aurelia-framework";
import {BackgroundDefinition} from "app/quick-recipe/backgrounds/models/background-definition";
import {RecipeBackgroundService} from "app/quick-recipe/shared/recipe-background-service";

@autoinject()
export class BackgroundPicker {
    private _pictureQualifiers: PictureToQualifiersMap = {};
    private _genericPictures: Array<string> = [];
    private _backgroundService: RecipeBackgroundService;

    constructor(backgroundService: RecipeBackgroundService) {
        this._backgroundService = backgroundService;
    }

    findPicture(title: string): Promise<string> {
        return this._backgroundService.getBackgrounds()
            .then(response => {
                response.map(content => this._pictureQualifiers[content.fileName] = content.qualifiers);

                for (var key in this._pictureQualifiers) {
                    if (this._pictureQualifiers[key].indexOf("generic") >= 0) {
                        this._genericPictures.push(key);
                    }
                }
            })
            .then(() => this._selectBackgroundPicture(title));
    }

    private _selectBackgroundPicture(title: string): string {
        const words: Array<string> = title.toLowerCase().split(" ");
        var matchPossibilities: Array<string> = [];

        // For each picture, compare the words in the recipe title to get a weight
        for (var key in this._pictureQualifiers) {
            words.forEach(word => {
                // Skip the article words
                if (word.length > 3 && this._pictureQualifiers[key].indexOf(word) >= 0) {
                    // Every time a word is found, add this picture in the array
                    matchPossibilities.push(key);
                }
            });
        }

        // If no match was found, pick a generic picture
        if (!matchPossibilities.length) {
            matchPossibilities = this._genericPictures;
        }

        // Then pick randomly a picture in the possibilities array
        const randomIndex: number = this._randomNumberFromInterval(0, matchPossibilities.length - 1);
        const backgroundPicture: string = matchPossibilities[randomIndex];

        return backgroundPicture;
    }

    private _randomNumberFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

interface PictureToQualifiersMap {
    [picture: string]: Array<string>;
}
