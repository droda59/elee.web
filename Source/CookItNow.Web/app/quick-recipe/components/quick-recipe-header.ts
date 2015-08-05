import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {QuickRecipe, Ingredient, Step} from "quick-recipe/models/quick-recipe";
import {Timer} from "shared/models/timer";

@inject (EventAggregator)
export class QuickRecipeHeader {
	@bindable recipe: QuickRecipe = null;
	
	activeTimers: Timer[] = [];
	activeTimersSectionActive: boolean = false;
	recipeInfoSectionActive: boolean = false;
	
	private _eventAggregator: EventAggregator;
	
	constructor(eventAggregator: EventAggregator) {
		this._eventAggregator = eventAggregator;
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
	
	toggleMinimizeActiveTimers() {
		this.activeTimersSectionActive = !this.activeTimersSectionActive; 
	}
	
	toggleMinimizeRecipeInfo() {
		this.recipeInfoSectionActive = !this.recipeInfoSectionActive; 
	}
}