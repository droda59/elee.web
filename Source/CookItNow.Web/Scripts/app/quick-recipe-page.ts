import {QuickRecipe, Ingredient} from "models/quick-recipe";
import {Timer} from "models/timer";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {EventAggregator} from "aurelia-event-aggregator";

@inject (HttpClient, EventAggregator)
export class QuickRecipePage {
    private _http: HttpClient;
	private _eventAggregator: EventAggregator;
    private _url: string;
    recipe: QuickRecipe;
	minimized: boolean = false;
	activeTimers: Timer[] = [];
	timers: Timer[] = [];
	
	constructor(http: HttpClient, eventAggregator: EventAggregator) {
		this._http = http;
		this._eventAggregator = eventAggregator;
	}
	
	activate(route) {
		switch (route.id) {
			case "1":
				this._url = "../../Json/recipeModel-pouding.json";
				break;
			case "2": 
				this._url = "../../Json/recipeModel-gaufres.json";
				break;
			default:
				break;
		}
		
        return this._http.get(this._url).then(response => {
            this.recipe = response.content;
        });
	}
    
    attached() {
		this._eventAggregator.subscribe("TIMERSTARTED", payload => {
			if (this.activeTimers.indexOf(payload) === -1) {
				this.activeTimers.push(payload);
			}
		});
		
		this._eventAggregator.subscribe("TIMERDELETED", payload => {
			var index = this.activeTimers.indexOf(payload);
			this.activeTimers.splice(index, 1);
		});
    }
	
	startTimer(timer: Timer) {
		this.activeTimers.push(timer);
	}
	
	toggleMinimizeActiveTimers() {
		this.minimized = !this.minimized; 
	}
}