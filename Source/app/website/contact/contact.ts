import { autoinject } from "aurelia-framework";
import { ContactService } from "app/quick-recipe/shared/contact-service";
import { ContactForm } from "app/quick-recipe/shared/models/contact-form";

@autoinject()
export class ContactPage {
    email: string;
    name: string;
    message: string;

    sending: boolean = false;
    sent: boolean = false;

    constructor(private _contactService: ContactService) { }

    send() {
        let contactForm: ContactForm = { email: this.email, name: this.name, message: this.message};

        this.sending = true;
        this._contactService.send(contactForm)
            .then(() => {
                this.sending = false;
                this.sent = true;
            });
    }
}
