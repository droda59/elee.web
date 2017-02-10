import {bindable, autoinject, containerless} from "aurelia-framework";
import {I18N} from "aurelia-i18n";
import {Quantity} from "app/shared/models/quantity";

@autoinject()
@containerless()
export class NextWord {
    @bindable quantity: Quantity;
    @bindable ingredientName: string;

    nextWord: string;

    private _i18n: I18N;

    constructor(i18n: I18N) {
        this._i18n = i18n;
    }

    bind() {
        this.nextWord = "&nbsp;" + (this.quantity.unit.type !== undefined
            ? this.isVowel(this.ingredientName[0])
            ? this._i18n.tr("quantities.nextWordVowel")
            : this._i18n.tr("quantities.nextWordConsonant") + "&nbsp;"
            : "");
    }

    private isVowel(letter: string): boolean {
        return letter === "a" || letter === "A"
            || letter === "e" || letter === "E"
            || letter === "i" || letter === "I"
            || letter === "o" || letter === "O"
            || letter === "u" || letter === "U"
            || letter === "y" || letter === "Y"
            || letter === "h" || letter === "H";
    }
}
