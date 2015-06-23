import {QuickRecipe} from "interfaces/quick-recipe";
import {Timer} from "interfaces/timer";
import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {EventAggregator} from "aurelia-event-aggregator";
import {Compiler} from "gooy/aurelia-compiler";
import {jQuery} from "jquery";

@inject (HttpClient, Compiler, EventAggregator)
export class QuickRecipePage {
    http: HttpClient;
    url: string = "../../Json/recipeModel-pouding.json";
    recipe: QuickRecipe;
	compiler: Compiler;
	eventAggregator: EventAggregator;
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
			this.activeTimers.push(payload);
		
			$(".active-timers").pushpin({ top: 0 });
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
}