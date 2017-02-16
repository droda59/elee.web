import { inject, NewInstance } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { Configure } from "aurelia-configuration";
import { ContactForm } from "app/website/contact/models/contact-form";
import "fetch";

@inject(NewInstance.of(HttpClient), Configure)
export class AdminContactService {
	private _httpClient: HttpClient;

	constructor(httpClient: HttpClient, configure: Configure) {
		this._httpClient = httpClient.configure(config => {
			config
				.useStandardConfiguration()
				.withDefaults({
					headers: {
						"Accept": "application/json",
						"X-Requested-With": "Fetch",
                        "X-Admin": configure.is("development")
					}
				})
				.withBaseUrl(configure.get("api"));
		});
	}

	get(): Promise<Array<ContactForm>> {
		return this._httpClient.fetch("api/contactform", {
			method: "get"
		}).then(response => response.json());
	}
}
