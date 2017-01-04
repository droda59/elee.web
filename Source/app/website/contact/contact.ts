import { autoinject } from "aurelia-framework";
import { ContactService } from "app/quick-recipe/shared/contact-service";
import { ContactForm } from "app/quick-recipe/shared/models/contact-form";

@autoinject()
export class ContactPage {
    private _contactService: ContactService;

    email: string;
    name: string;
    message: string;

    constructor(contactService: ContactService) {
        this._contactService = contactService;
    }

    send() {
        let contactForm: ContactForm = { email: this.email, name: this.name, message: this.message};

        // this._contactService.send(contactForm);
    }
}
