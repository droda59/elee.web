import {autoinject} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {CssAnimator} from "aurelia-animator-css";
import {I18N} from "aurelia-i18n";
import {QuickRecipeService} from "app/quick-recipe/quick-recipe-service";
import {QuickRecipe, Step, IngredientPart, QuantityOfIngredientPart, EnumerationPart} from "app/quick-recipe/models/quick-recipe";
import {HelpOverlay} from "app/quick-recipe/follow-recipe/components/help-overlay";
import {TimerCoordinator} from "app/quick-recipe/follow-recipe/timer-coordinator";
import {BackgroundPicker} from "app/quick-recipe/follow-recipe/background-picker";
import {QuickRecipeTimer} from "app/quick-recipe/follow-recipe/models/quick-recipe-timer";
import {Ingredient} from "app/shared/models/ingredient";
import {Timer} from "app/shared/models/timer";
import {QuickRecipeSubrecipe} from "app/quick-recipe/follow-recipe/models/quick-recipe-subrecipe";

@autoinject()
export class QuickRecipePage {
  recipe: QuickRecipe;
  subrecipes: QuickRecipeSubrecipe[] = [];
  currentStep: Step;

  isRecipeStarted: boolean;
  isRecipeDone: boolean;
  backgroundPicture: string;
  navigationStepId: number = undefined;
  originalServings: string;

  private _currentStepId: number = undefined;
  private _timerCoordinator: TimerCoordinator;
  private _dialogService: DialogService;
  private _service: QuickRecipeService;
  private _i18n: I18N;
  private _animator: CssAnimator;
  private _backgroundPicker: BackgroundPicker;

  constructor(service: QuickRecipeService,
							i18n: I18N,
							timerCoordinator: TimerCoordinator,
							dialogService: DialogService,
							animator: CssAnimator,
							backgroundPicker: BackgroundPicker) {
    this._service = service;
    this._i18n = i18n;
    this._dialogService = dialogService;
    this._animator = animator;
    this._timerCoordinator = timerCoordinator;
    this._backgroundPicker = backgroundPicker;

    this._timerCoordinator.onTimerStarted = timer => { this.onTimerStarted(timer, this); };
    this._timerCoordinator.onTimerEnded = timer => { this.onTimerEnded(timer, this); };
  }

    activate(route, routeConfig): Promise<void>  {
        if ("Notification" in window) {
            if (Notification.permission !== "denied") {
                Notification.requestPermission();
            }
        }

        return this._service.getRecipe(route.uniqueName)
            .then(response => {
                this.recipe = new QuickRecipe(response);
                this.originalServings = this.recipe.originalServings;

                this._backgroundPicker.findPicture(this.recipe.title).then(backgroundPicture => {
                    this.backgroundPicture = backgroundPicture;
                })

                moment.locale(this.recipe.language);
                this._i18n.setLocale(this.recipe.language);

                routeConfig.navModel.title = this.recipe.title;

                (this.recipe.subrecipes || []).forEach(
                    (subrecipe) => {
                        var quickRecipeSubrecipe = new QuickRecipeSubrecipe();
                        quickRecipeSubrecipe.id = subrecipe.id;
                        quickRecipeSubrecipe.title = subrecipe.title;
                        quickRecipeSubrecipe.steps = this.recipe.steps.filter(step => step.subrecipeId === subrecipe.id);
                        quickRecipeSubrecipe.ingredients = this.recipe.ingredients.filter(ingredient => ingredient.subrecipeId === subrecipe.id);
                        quickRecipeSubrecipe.timers = [];

                        if (quickRecipeSubrecipe.steps.length || quickRecipeSubrecipe.ingredients.length) {
                            this.subrecipes.push(quickRecipeSubrecipe);
                        }
                    }
                );
            });
    }

    attached() {
        var hasSeenHelp = localStorage.getItem("helpSeen");
        if (!hasSeenHelp) {
            localStorage.setItem("helpSeen", "true");
            // this._dialogService
            //     .open({ viewModel: HelpOverlay });
        }
    }

  canDeactivate() {
    if (this.isRecipeStarted && !this.isRecipeDone) {
      return confirm(this._i18n.tr("quickRecipe.exitConfirmation"));
    }
  }

  startRecipe(): void {
      var that = this;
    this._currentStepId = this.getNextUncompletedStepId();
    this.currentStep = this.recipe.steps.filter(step => step.id === this._currentStepId)[0];

    this.navigationStepId = this._currentStepId;
    this.goToCurrentStep();

    var element = $("#presentation-section");
    var animationClassName = "fadeOutUpBig";
    var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    element.addClass(animationClassName).one(animationEnd, function () {
        element.removeClass(animationClassName);
		that.isRecipeStarted = true;
    });
  }

  completeStep(): void {
    if (!this.isCurrentStepActive) {
      return;
    }

    var currentStep = this.getCurrentStep();
    currentStep.isCompleted = true;
    this.decorateStepIngredients(currentStep, "done");

    var currentSubrecipe = this.subrecipes.filter(subrecipe => subrecipe.id == currentStep.subrecipeId)[0];
    currentSubrecipe.completedSteps = currentSubrecipe.steps.filter(step => step.isCompleted).length;

    if (this.isCurrentLastStep) {
      this.isRecipeDone = true;
      return;
    }

    this._currentStepId = this.getNextUncompletedStepId();
    this.currentStep = this.recipe.steps.filter(step => step.id === this._currentStepId)[0];

    this.goToCurrentStep();
  }

  goToSubrecipe(subrecipeId: number): void {
    var subrecipeSteps = this.subrecipes.filter(subrecipe => subrecipe.id == subrecipeId)[0].steps;
    var uncompletedSubrecipeSteps = subrecipeSteps.filter(step => !step.isCompleted && !step.isOnHold);

    var step;
    if (uncompletedSubrecipeSteps.length) {
      step = uncompletedSubrecipeSteps[0];
    } else {
      step = subrecipeSteps[0];
    }
    var nextStepId = step.id;

    this.triggerSubrecipeChangeAnimation(this._currentStepId, nextStepId);
    this.decorateStepIngredients(this.getCurrentStep(), "");

    this._currentStepId = nextStepId;
    this.currentStep = this.recipe.steps.filter(step => step.id === this._currentStepId)[0];

    this.navigationStepId = this._currentStepId;
    this.goToStepId(this._currentStepId);
  }

  goToPreviousStep(): void {
    if (this.isNavigationFirstStep) {
      return;
    }

    this.triggerSubrecipeChangeAnimation(this.navigationStepId, this.navigationStepId - 1);
    this.decorateStepIngredients(this.getStep(this.navigationStepId), "");

    this.navigationStepId--;
    this._currentStepId = this.navigationStepId;
    this.currentStep = this.recipe.steps.filter(step => step.id === this._currentStepId)[0];

    this.goToStepId(this.navigationStepId);
  }

  goToNextStep(): void {
    if (this.isNavigationLastStep) {
      return;
    }

    this.triggerSubrecipeChangeAnimation(this.navigationStepId, this.navigationStepId + 1);
    this.decorateStepIngredients(this.getStep(this.navigationStepId), "");

    this.navigationStepId++;
    this._currentStepId = this.navigationStepId;
    this.currentStep = this.recipe.steps.filter(step => step.id === this._currentStepId)[0];

    this.goToStepId(this.navigationStepId);
  }

  goToCurrentStep(): void {
    this.triggerSubrecipeChangeAnimation(this.navigationStepId, this._currentStepId);
    this.decorateStepIngredients(this.getStep(this.navigationStepId), "");

    this.navigationStepId = this._currentStepId;

    this.goToStepId(this._currentStepId);
  }

  getStep(stepId: number): Step {
      return this.recipe.steps[stepId];
  }

  get activeSubrecipeId(): number {
    if (!this.navigationStepId) {
      return -2;
    }

    return this.getStep(this.navigationStepId).subrecipeId;
  }

  get isCurrentStepActive(): boolean {
      return true;
    // var currentStep = document.getElementById("step-" + this._currentStepId);
    // if (!currentStep) {
    //   return false;
    // }
    //
    // return currentStep.classList.contains("active");
  }

  get isCurrentLastStep(): boolean {
    return this._currentStepId == this.recipe.steps.length - 1;
  }

  get isNavigationFirstStep(): boolean {
    return this.navigationStepId <= 0;
  }

  get isNavigationLastStep(): boolean {
    return this.navigationStepId == this.recipe.steps.length - 1;
  }

  private onTimerStarted(timer: QuickRecipeTimer, that: QuickRecipePage): void {
    var timerStep = that.recipe.steps.filter(step => step.id === timer.stepId)[0];
    var timerStepSubrecipe = this.subrecipes.filter(subrecipe => subrecipe.id == timerStep.subrecipeId)[0];
    timerStepSubrecipe.timers.push(timer);

    // that.recipe.steps
    //   .filter(step => step.subrecipeId === timerStep.subrecipeId && step.id > timer.stepId)
    //   .forEach(postStep => { postStep.isOnHold = true; });
  }

  private onTimerEnded(timer: QuickRecipeTimer, that: QuickRecipePage): void {
    var timerStep = that.recipe.steps.filter(step => step.id === timer.stepId)[0];
    var timerStepSubrecipe = this.subrecipes.filter(subrecipe => subrecipe.id == timerStep.subrecipeId)[0];

    var index = timerStepSubrecipe.timers.indexOf(timer);
    timerStepSubrecipe.timers.splice(index, 1);

    // that.recipe.steps
    //   .filter(step => step.subrecipeId === timerStep.subrecipeId && step.id > timer.stepId)
    //   .forEach(postStep => { postStep.isOnHold = false; });
  }

  private getNextUncompletedStepId(): number {
    var stepId = undefined;

    if (this._currentStepId === undefined) {
      return 0;
    }

    var uncompletedSubrecipeSteps = this.recipe.steps.filter(step => !step.isCompleted && !step.isOnHold && step.id > this._currentStepId);
    if (uncompletedSubrecipeSteps.length) {
      stepId = uncompletedSubrecipeSteps[0].id;
    }

    return stepId;
  }

  private goToStepId(stepId: number): void {
    // var element = document.getElementById("step-" + stepId);
    // var navHeight = 65;
    // var top = Math.max(0, element.offsetTop - ((window.innerHeight - navHeight - element.offsetHeight) / 2) + 32);

    var targetStep = this.recipe.steps[stepId];
    this.decorateStepIngredients(targetStep, "current");
  }

  private triggerSubrecipeChangeAnimation(currentStepId: number, nextStepId: number): void {
    // var subrecipeIdBefore = this.recipe.steps[currentStepId].subrecipeId;
    // var subrecipeIdAfter = this.recipe.steps[nextStepId].subrecipeId;
    //
    // if (subrecipeIdBefore != subrecipeIdAfter) {
    //   var subrecipeTitleElement = document.getElementById("subrecipe-title-" + subrecipeIdAfter);
    //   this._animator.animate(subrecipeTitleElement, "subrecipe-title-animation");
    //
    //   var element = $("#subrecipe-title-" + subrecipeIdAfter + " h1");
    //
    //   var animationClassName = "fadeInDown";
    //   if (subrecipeIdBefore < subrecipeIdAfter) {
    //     animationClassName = "fadeInUp";
    //   }
    //
    //   var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    //   element.addClass("animated " + animationClassName).one(animationEnd, function () {
    //     element.removeClass("animated " + animationClassName);
    //   });
    // }
  }

  private getCurrentStep(): Step {
    return this.getStep(this._currentStepId);
  }

    private decorateStepIngredients(step: Step, state: string): void {
        var ingredients: Ingredient[] = [];

        step.parts
            .filter(part => part instanceof IngredientPart)
            .forEach((part: IngredientPart) => ingredients.push(part.ingredient));

        step.parts
            .filter(part => part instanceof QuantityOfIngredientPart)
            .forEach((part: QuantityOfIngredientPart) => ingredients.push(part.ingredient));

        const enumerationParts = step.parts
            .filter(part => part instanceof EnumerationPart)
            .selectMany((part: EnumerationPart) => part.parts);

        enumerationParts
            .filter(part => part instanceof IngredientPart)
            .forEach((part: IngredientPart) => ingredients.push(part.ingredient));

        enumerationParts
            .filter(part => part instanceof QuantityOfIngredientPart)
            .forEach((part: QuantityOfIngredientPart) => ingredients.push(part.ingredient));

    ingredients.forEach(ingredient => {
      if (ingredient.state !== "done") {
        ingredient.state = "";

        if (state !== "done" || step.subrecipeId >= -1) {
          ingredient.state = state;
        }
      }
    });
  }
}
