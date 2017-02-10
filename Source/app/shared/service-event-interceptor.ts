import { inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";

@inject(EventAggregator)
export class ServiceEventInterceptor {
	private _eventAggregator: EventAggregator;

	constructor(eventAggregator: EventAggregator) {
		this._eventAggregator = eventAggregator;
	}

	request(request) {
		this._eventAggregator.publish("service.request");

		return request;
	}

	response(response) {
		this._eventAggregator.publish("service.response");

		return response;
	}
}
