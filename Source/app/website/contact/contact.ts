import { inject, NewInstance } from "aurelia-framework";
import { ValidationController, ValidationRules, ValidateResult } from "aurelia-validation";
import { ContactService } from "app/shared/contact-service";
import { ContactForm } from "app/website/models/contact-form";

@inject(ContactService, NewInstance.of(ValidationController))
export class ContactPage {
    errors: Array<ValidateResult> = [];

    contactForm: ContactForm = new ContactForm();

    sending: boolean = false;
    sent: boolean = false;

    constructor(private _contactService: ContactService, private _controller: ValidationController) {
        ValidationRules
            .ensure(x => x.name).required()
            .ensure(x => x.email).required().email()
            .ensure(x => x.message).required()
            .on(this.contactForm);
    }

    send() {
        this._controller.validate().then(errors => {
            this.errors = errors;
            const errorResults = this.errors.results.filter(x => !x.valid);
            if (!errorResults.length) {
                try {
                    this.sending = true;
                    this._contactService.send(this.contactForm)
                        .then(() => {
                            this.sending = false;
                            this.sent = true;
                        });
                } catch (e) {
                    this.errors.results.push({error: { message: e.statusText }});
                }
            }
        });
    }
}
