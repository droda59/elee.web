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

    // forms: Array<ContactForm> = [];

    constructor(private _contactService: ContactService) { }

    // activate(): Promise<Array<ContactForm>> {
    //     return this._refreshContactForms();
    // }

    send() {
        let contactForm: ContactForm = { email: this.email, name: this.name, message: this.message};

        this.sending = true;
        this._contactService.send(contactForm)
            .then(() => {
                this.sending = false;
                this.sent = true;

                // this._refreshContactForms();
            });
    }

    // private _refreshContactForms() {
    //     return this._contactService.get()
    //         .then(response => {
    //             this.forms = response.map(form => form as ContactForm);
    //         });
    // }
}
