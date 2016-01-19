import {ValidationRule} from "aurelia-validation";
import * as moment from "moment";

export class TimeValidationRule extends ValidationRule {
    constructor() {
        super(
            null,
            (newValue) => {
                 return this.isTime(newValue);
            },
            (newValue, threshold) => {
                return `needs to be a duration representation`;
            },
            "TimeValidationRule"
        );
    }

    private isTime(value): boolean {
        return moment.duration(value).asMilliseconds() > 0;
    }
}
