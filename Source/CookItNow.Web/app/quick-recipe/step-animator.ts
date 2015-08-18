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
	
	private static PreviousestStepClass: string = "previousest-step";
	private static PreviousStepClass: string = "previous-step";
	private static CurrentStepClass: string = "current-step";
	private static NextStepClass: string = "next-step";
	private static NextestStepClass: string = "nextest-step";
	private static LastStepClass: string = "last-step";
	
	constructor(eventAggregator: EventAggregator, animator: CssAnimator) {
		this._animator = animator;
		this._eventAggregator = eventAggregator;
	}
	
    attached() {
		var that = this;
		this._eventAggregator.subscribe("STEPCOMPLETED", element => this.completeStep(element));
		this._eventAggregator.subscribe("STEPRETURNED", element => this.backStep(element));
		
		var firstStep = this.findFirstStep(this.element);
		this._nextSubrecipeElement = firstStep;
		
		this.currentStep = firstStep;
		this.nextStep = this.findNextStep(this._currentStep);
		this.nextestStep = this.findNextStep(this._nextStep);
	}
	
	private backStep(element: Element): void {
		if (this._nextestStep) {
			this._animator.removeClass(this._nextestStep, StepAnimator.NextestStepClass);
		}
		
		if (this._nextStep) {
			this._animator.removeClass(this._nextStep, StepAnimator.NextStepClass)
				.then(this.nextestStep = this._nextStep);
		}
		
		this._animator.removeClass(element, StepAnimator.CurrentStepClass)
			.then(this.nextStep = element);
			
		var newCurrent = this._previousStep || this.findPreviousStep(element);
		if (newCurrent) {
			this._animator.removeClass(newCurrent, StepAnimator.PreviousStepClass)
				.then(this.currentStep = newCurrent);
			
			var previous = this._previousestStep || this.findPreviousStep(newCurrent); 
			if (previous) {
				this._animator.removeClass(previous, StepAnimator.PreviousestStepClass)
					.then(this.previousStep = previous);
				
				this.previousestStep = this.findPreviousStep(previous); 
			} else {
				this.previousStep = undefined;
			}
		}
	}

	private completeStep(element: Element): void {
		if (this._previousestStep) {
			this._animator.removeClass(this._previousestStep, StepAnimator.PreviousestStepClass);
		}
		
		if (this._previousStep) {
			this._animator.removeClass(this._previousStep, StepAnimator.PreviousStepClass)
				.then(this.previousestStep = this._previousStep);
		}
		
		this._animator.removeClass(element, StepAnimator.CurrentStepClass)
			.then(this.previousStep = element);
		
		var newCurrent = this._nextStep || this.findNextStep(element); 
		if (newCurrent) {
			this._animator.removeClass(newCurrent, StepAnimator.NextStepClass)
				.then(this.currentStep = newCurrent);
			
			var next = this._nextestStep || this.findNextStep(newCurrent); 
			if (next) {
				this._animator.removeClass(next, StepAnimator.NextestStepClass)
					.then(this.nextStep = next);
				
				this.nextestStep = this.findNextStep(next); 
			} else {
				this.nextStep = undefined;
				this._animator.addClass(newCurrent, StepAnimator.LastStepClass);
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
	
	private findPreviousStep(element: Element): Element {
		var previousPhrase = element.previousElementSibling;
		if (previousPhrase && previousPhrase.classList.contains("phrase")) {
			return previousPhrase; 
		}
		else if (previousPhrase && previousPhrase.classList.contains("post-step")) {
			return this.findFirstStep(previousPhrase);
		}
		else {
			var previousStep: Element = $(element).parents(".step")[0].previousElementSibling;
			if (previousStep && previousStep.classList.contains("step")) {
				return this.findFirstStep(previousStep);
			}
			else {
				var previousSubrecipe: Element = $(element).parents(".subrecipe")[0].previousElementSibling;
				if (previousSubrecipe && previousSubrecipe.classList.contains("subrecipe")) {
					var firstStep = this.findFirstStep(previousSubrecipe);
					while (!firstStep) {
						previousSubrecipe = previousSubrecipe.previousElementSibling;
						if (previousSubrecipe && previousSubrecipe.classList.contains("subrecipe")) {
							firstStep = this.findFirstStep(previousSubrecipe.previousElementSibling);
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
		if (this._previousestStep) {
			this._animator.addClass(element, StepAnimator.PreviousestStepClass);
		}
	}
	
	private set previousStep(element: Element) {
		this._previousStep = element;
		if (this._previousStep) {
			this._animator.addClass(element, "completed-step");
			this._animator.addClass(element, StepAnimator.PreviousStepClass);
		}
	}
	
	private set currentStep(element: Element) {
		this._currentStep = element;
		if (this._currentStep) {
			this._animator.addClass(element, StepAnimator.CurrentStepClass);
		}
		
		if (this._nextSubrecipeElement === element) {
			this._nextSubrecipeElement = undefined;
			
			var subrecipe: Element = $(element).parents(".subrecipe")[0];
			var subrecipeTitle = $(subrecipe).find(".subrecipe-title-wrapper")[0];
			this._animator.animate(subrecipeTitle, "show-subrecipe-title-animation");
		}
	}
	
	private set nextStep(element: Element) {
		this._nextStep = element;
		if (this._nextStep) {
			this._animator.addClass(element, StepAnimator.NextStepClass);
		}
	}
	
	private set nextestStep(element: Element) {
		this._nextestStep = element;
		if (this._nextestStep) {
			this._animator.addClass(element, StepAnimator.NextestStepClass);
		}
	}
}