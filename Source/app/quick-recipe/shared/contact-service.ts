import { inject, NewInstance } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { Configure } from "aurelia-configuration";
import { EventAggregator } from "aurelia-event-aggregator";
import { ContactForm } from "app/quick-recipe/shared/models/contact-form";
import "fetch";

@inject(NewInstance.of(HttpClient), Configure, EventAggregator)
export class ContactService {
	private _httpClient: HttpClient;

	constructor(httpClient: HttpClient, configure: Configure, eventAggregator: EventAggregator) {
		this._httpClient = httpClient.configure(config => {
			config
				.useStandardConfiguration()
				.withDefaults({
					headers: {
						"Accept": "application/json",
						"X-Requested-With": "Fetch"
					}
				})
				.withInterceptor({
		            request(request) {
						eventAggregator.publish("service.request");
		                return request;
		            },
		            response(response) {
						eventAggregator.publish("service.response");
		                return response;
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

	send(contactForm: ContactForm): Promise<boolean> {
		return this._httpClient.fetch("api/contactform", {
			method: "post",
			body: json(contactForm)
		}).then(response => response.json());
	}
}
