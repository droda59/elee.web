import { inject, NewInstance } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { Configure } from "aurelia-configuration";
import { ServiceEventInterceptor } from "app/shared/service-event-interceptor";
import { ContactForm } from "app/website/models/contact-form";
import "fetch";

@inject(NewInstance.of(HttpClient), Configure, ServiceEventInterceptor)
export class ContactService {
	private _httpClient: HttpClient;
	private _isAdmin: boolean;

	constructor(httpClient: HttpClient, configure: Configure, interceptor: ServiceEventInterceptor) {
		this._isAdmin = configure.is("development");
		this._httpClient = httpClient.configure(config => {
			config
				.useStandardConfiguration()
				.withDefaults({
					headers: {
						"Accept": "application/json",
						"X-Requested-With": "Fetch"
					}
				})
				.withInterceptor(interceptor)
				.withBaseUrl(configure.get("api"));
		});
	}

	get(): Promise<Array<ContactForm>> {
		return this._httpClient.fetch("api/contactform", {
			method: "get",
			headers: {
				"X-Admin": this._isAdmin
			}
		}).then(response => response.json());
	}

	send(contactForm: ContactForm): Promise<boolean> {
		return this._httpClient.fetch("api/contactform", {
			method: "post",
			body: json(contactForm)
		}).then(response => response.json());
	}
}
