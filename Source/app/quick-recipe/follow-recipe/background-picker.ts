export class BackgroundPicker {
    private _pictureQualifiers: PictureToQualifiersMap = {};
    private _genericPictures: Array<string> = [];

    constructor() {
        this._pictureQualifiers["berries.jpg"] = ["baies", "framboise", "framboises"];
        this._pictureQualifiers["photo-1443146517630-ac1e04dfed9a.jpeg"] = ["baies", "framboise", "framboises"];
        this._pictureQualifiers["photo-1457296795659-6f458be7a874.jpeg"] = ["cupcakes", "cupcake", "gâteaux", "gâteau", "crémage", "chocolat", "vanille"];
        this._pictureQualifiers["photo-1461595520627-42e3c83019bc.jpeg"] = ["thé"];
        this._pictureQualifiers["photo-1463569643904-4fbae71ed917.jpeg"] = ["pain", "soupe", "oeufs", "oeuf"];
        this._pictureQualifiers["photo-1466065478348-0b967011f8e0.jpeg"] = ["baies", "framboise", "framboises", "bleuets", "blueuet"];
        this._pictureQualifiers["photo-1467189386127-c4e5e31ee213.jpeg"] = ["gâteau", "bleuets", "bleuet", "chocolat", "menthe", "lime", "latte", "café"];
        this._pictureQualifiers["photo-1467630144534-da2b634ce269.jpeg"] = ["muffins", "muffin", "chocolat", "tarte"];
        this._pictureQualifiers["photo-1470338745628-171cf53de3a8.jpeg"] = ["menthe"];
        this._pictureQualifiers["photo-1473256599800-b48c7c88cd7e.jpeg"] = ["gâteau", "crémage", "glaçage", "citrons", "citron"];
        this._pictureQualifiers["photo-1474625342403-1b8a2c0f7215.jpeg"] = ["cupcakes", "cupcake", "gâteaux", "gâteau", "chocolat", "bonbons"];

        this._genericPictures.push("photo-1463569643904-4fbae71ed917");
    }

    findPicture(title: string): string {
        const words: Array<string> = title.toLowerCase().split(" ");
        var matches: PictureToMatchMap = {};

        // For each picture, compare the words in the recipe title to get a weight
        for (var key in this._pictureQualifiers) {
            matches[key] = 0;
            words.forEach(word => {
                // Skip the article words
                if (word.length > 3 && this._pictureQualifiers[key].indexOf(word) >= 0) {
                    matches[key]++;
                }
            });
        }

        // Every time a word is found, add this picture in the array
        // TODO Put the push(key) in the preceding loop
        var matchPossibilities: Array<string> = [];
        for (var key in matches) {
            if (matches[key] > 0) {
                for (var i = 0; i < matches[key]; i++) {
                    matchPossibilities.push(key);
                }
            }
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

interface PictureToMatchMap {
    [picture: string]: number;
}
