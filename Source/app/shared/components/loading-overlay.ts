import {autoinject, containerless, bindable} from "aurelia-framework";
import {EventAggregator, Subscription} from "aurelia-event-aggregator";

@autoinject()
@containerless()
export class LoadingOverlay {
    @bindable title: string = "Chargement";

    private _eventAggregator: EventAggregator;
    private _events: EventsMap = {};

    isActive: boolean = false;

    constructor(eventAggregator: EventAggregator) {
        this._eventAggregator = eventAggregator;
    }

    attached() {
        this._events["service.request"] = this._eventAggregator.subscribe("service.request", response => {
            this.isActive = true;
        });

        this._events["service.response"] = this._eventAggregator.subscribe("service.response", response => {
            this.isActive = false;
        });
    }

    detached() {
        for (var event in this._events) {
            this._events[event].dispose();
        };

        this._events = {};
    }
}

interface EventsMap {
    [event: string]: Array<Subscription>;
}
