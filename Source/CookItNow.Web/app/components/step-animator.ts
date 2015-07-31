import {bindable, noView, inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {CssAnimator} from 'aurelia-animator-css';

@noView()
@inject (EventAggregator, CssAnimator)
export class StepAnimator {
	@bindable element: Element = null;
	
	private _animator: CssAnimator;
	private _eventAggregator: EventAggregator;
	
	private _previousestStep: Element;
	private _previousStep: Element;
	private _currentStep: Element;
	private _nextStep: Element;
	private _nextestStep: Element;
	
	constructor(eventAggregator: EventAggregator, animator: CssAnimator) {
		this._animator = animator;
		this._eventAggregator = eventAggregator;
	}
	
    attached() {
		var that = this;
		this._eventAggregator.subscribe("STEPCOMPLETED", element => this.completeStep(element));
		
		this.currentStep = this.findFirstStep(this.element);
		this.nextStep = this.findNextStep(this._currentStep);
		this.nextestStep = this.findNextStep(this._nextStep);
	}

	private completeStep(element: Element): void {
		if (this._previousestStep) {
			this._animator.removeClass(this._previousStep, "previousest-step");
		}
		
		if (this._previousStep) {
			this._animator.removeClass(this._previousStep, "previous-step")
				.then(this.previousestStep = this._previousStep);
		}
		
		this._animator.removeClass(element, "current-step")
			.then(this.previousStep = element);
		
		var newCurrent = this._nextStep || this.findNextStep(element); 
		if (newCurrent) {
			this._animator.removeClass(newCurrent, "next-step")
				.then(this.currentStep = newCurrent);
			
			var next = this._nextestStep || this.findNextStep(newCurrent); 
			if (next) {
				this._animator.removeClass(next, "nextest-step")
					.then(this.nextStep = next);
				
				var nextest = this.findNextStep(next); 
				if (nextest) {
					this.nextestStep = nextest;
				}
			}
		}
	}
	
	private findFirstStep(element: Element): Element	{
		var firstStep = $(element).find(".phrase:first-of-type")[0];
		
		return firstStep;
	}
	
	private findNextStep(element: Element): Element {
		var nextPhrase = element.nextElementSibling;
		if (nextPhrase && nextPhrase.classList.contains("phrase")) {
			return nextPhrase; 
		}
		else if (nextPhrase && nextPhrase.classList.contains("postStep")) {
			return this.findFirstStep(nextPhrase);
		}
		else {
			var nextStep: Element = $(element).parents(".step")[0].nextElementSibling;
			if (nextStep && nextStep.classList.contains("step")) {
				return this.findFirstStep(nextStep);
			}
			else {
				var nextSubrecipe: Element = $(element).parents(".subrecipe")[0].nextElementSibling;
				if (nextSubrecipe && nextSubrecipe.classList.contains("subrecipe")) {
					return this.findFirstStep(nextSubrecipe);
				}
			}
		}
		
		return undefined;
	}
	
	private set previousestStep(element: Element) {
		this._previousestStep = element;
		this._animator.addClass(element, "previousest-step");
	}
	
	private set previousStep(element: Element) {
		this._previousStep = element;
		this._animator.addClass(element, "completed-step");
		this._animator.addClass(element, "previous-step");
	}
	
	private set currentStep(element: Element) {
		this._currentStep = element;
		this._animator.addClass(element, "current-step");
	}
	
	private set nextStep(element: Element) {
		this._nextStep = element;
		this._animator.addClass(element, "next-step");
	}
	
	private set nextestStep(element: Element) {
		this._nextestStep = element;
		this._animator.addClass(element, "nextest-step");
	}
}