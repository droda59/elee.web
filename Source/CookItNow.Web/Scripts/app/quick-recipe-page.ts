import {QuickRecipe} from "models/quick-recipe";
import {Timer} from "models/timer";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {EventAggregator} from "aurelia-event-aggregator";
import {Compiler} from "aurelia-compiler";
import {jQuery} from "jquery";

@inject (HttpClient, Compiler, EventAggregator)
export class QuickRecipePage {
    private http: HttpClient;
	private compiler: Compiler;
	private eventAggregator: EventAggregator;
    private url: string = "../../Json/recipeModel-pouding.json";
    recipe: QuickRecipe;
	minimized: boolean = false;
	activeTimers: Timer[] = [];
	timers: Timer[] = [];
	
	constructor(http: HttpClient, compiler: Compiler, eventAggregator: EventAggregator) {
		this.http = http;
		this.compiler = compiler;
		this.eventAggregator = eventAggregator;
	}
	
	activate() {
        return this.http.get(this.url).then(response => {
            this.recipe = response.content;
        });
	}
    
    attached() {
		this.eventAggregator.subscribe("TIMERSTARTED", payload => {
			if (!this.activeTimers.length) {
				$(".active-timers").pushpin({ top: 0 });
			}
			
			if (this.activeTimers.indexOf(payload) === -1) {
				this.activeTimers.push(payload);
			}
		});
		
		this.eventAggregator.subscribe("TIMERDELETED", payload => {
			var index = this.activeTimers.indexOf(payload);
			this.activeTimers.splice(index, 1);
		});
		
		$(".step .compose").toArray().forEach(function(element) {
			this.compiler.compile(element, this, null, element);
		}, this);
    }
	
	startTimer(timer: Timer) {
		this.activeTimers.push(timer);
	}
	
	toggleMinimizeActiveTimers() {
		this.minimized = !this.minimized; 
	}
}