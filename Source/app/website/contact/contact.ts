import { autoinject, inject, NewInstance } from "aurelia-framework";
import { Router } from "aurelia-router";
import { ValidationControllerFactory, ValidationController, ValidationRules, ValidateResult } from "aurelia-validation";
import { ContactService } from "app/shared/contact-service";
import { ContactForm } from "app/website/models/contact-form";

@autoinject()
export class ContactPage {
    private _controller: ValidationController;

    errors: Array<ValidateResult> = [];
    contactForm: ContactForm = new ContactForm();
	router: Router;
    sending: boolean = false;
    sent: boolean = false;

    constructor(private _contactService: ContactService, router: Router, controllerFactory: ValidationControllerFactory) {
        this._controller = controllerFactory.createForCurrentScope();
    		this.router = router;

        ValidationRules
            .ensure(x => x.name).required()
            .ensure(x => x.email).required().email()
            .ensure(x => x.message).required()
            .on(this.contactForm);
    }

	getCurrentPageName(): string {
		return this.router.currentInstruction.config.name;
	}

    send() {
        this._controller.validate().then(errors => {
            this.errors = errors.results;
            const errorResults = this.errors.filter(x => !x.valid);
            if (!errorResults.length) {
                try {
                    this.sending = true;
                    this._contactService.send(this.contactForm)
                        .then(() => {
                            this.sending = false;
                            this.sent = true;
                        });
                } catch (e) {
                    this.errors.push({ message: e.statusText });
                }
            }
        });
    }
}
