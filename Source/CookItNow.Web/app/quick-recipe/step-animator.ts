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
	
	private _nextSubrecipeElement: Element;
	
	private PreviousestStepClass: string = "previousest-step";
	private PreviousStepClass: string = "previous-step";
	private CurrentStepClass: string = "current-step";
	private NextStepClass: string = "next-step";
	private NextestStepClass: string = "nextest-step";
	
	constructor(eventAggregator: EventAggregator, animator: CssAnimator) {
		this._animator = animator;
		this._eventAggregator = eventAggregator;
	}
	
    attached() {
		var that = this;
		this._eventAggregator.subscribe("STEPCOMPLETED", element => this.completeStep(element));
		
		var firstStep = this.findFirstStep(this.element);
		this._nextSubrecipeElement = firstStep;
		
		this.currentStep = firstStep;
		this.nextStep = this.findNextStep(this._currentStep);
		this.nextestStep = this.findNextStep(this._nextStep);
	}

	private completeStep(element: Element): void {
		if (this._previousestStep) {
			this._animator.removeClass(this._previousestStep, this.PreviousestStepClass);
		}
		
		if (this._previousStep) {
			this._animator.removeClass(this._previousStep, this.PreviousStepClass)
				.then(this.previousestStep = this._previousStep);
		}
		
		this._animator.removeClass(element, this.CurrentStepClass)
			.then(this.previousStep = element);
		
		var newCurrent = this._nextStep || this.findNextStep(element); 
		if (newCurrent) {
			this._animator.removeClass(newCurrent, this.NextStepClass)
				.then(this.currentStep = newCurrent);
			
			var next = this._nextestStep || this.findNextStep(newCurrent); 
			if (next) {
				this._animator.removeClass(next, this.NextestStepClass)
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
		else if (nextPhrase && nextPhrase.classList.contains("post-step")) {
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
					var firstStep = this.findFirstStep(nextSubrecipe);
					while (!firstStep) {
						nextSubrecipe = nextSubrecipe.nextElementSibling;
						if (nextSubrecipe && nextSubrecipe.classList.contains("subrecipe")) {
							firstStep = this.findFirstStep(nextSubrecipe.nextElementSibling);
						} else {
							break;
						}
					}
					
					this._nextSubrecipeElement = firstStep;
					return firstStep;
				}
			}
		}
		
		return undefined;
	}
	
	private set previousestStep(element: Element) {
		this._previousestStep = element;
		this._animator.addClass(element, this.PreviousestStepClass);
	}
	
	private set previousStep(element: Element) {
		this._previousStep = element;
		this._animator.addClass(element, "completed-step");
		this._animator.addClass(element, this.PreviousStepClass);
	}
	
	private set currentStep(element: Element) {
		this._currentStep = element;
		this._animator.addClass(element, this.CurrentStepClass);
		
		if (this._nextSubrecipeElement === element) {
			this._nextSubrecipeElement = undefined;
			
			var subrecipe: Element = $(element).parents(".subrecipe")[0];
			var subrecipeTitle = $(subrecipe).find(".subrecipe-title-wrapper")[0];
			this._animator.animate(subrecipeTitle, "show-subrecipe-title-animation");
		}
	}
	
	private set nextStep(element: Element) {
		this._nextStep = element;
		this._animator.addClass(element, this.NextStepClass);
	}
	
	private set nextestStep(element: Element) {
		this._nextestStep = element;
		this._animator.addClass(element, this.NextestStepClass);
	}
}