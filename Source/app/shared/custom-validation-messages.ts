import { autoinject } from "aurelia-framework";
import { validationMessages } from "aurelia-validation";
import { I18N } from "aurelia-i18n";

@autoinject()
export class CustomValidationMessages {
    constructor(i18n: I18N) {
        validationMessages["email"] = i18n.tr("validations.email");
        validationMessages["required"] = i18n.tr("validations.required");
    }
}
