import {autoinject} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {CssAnimator} from "aurelia-animator-css";
import {I18N} from "aurelia-i18n";
import {QuickRecipeService} from "app/shared/quick-recipe-service";
import {QuickRecipe, Step, IngredientPart, IngredientEnumerationPart} from "app/quick-recipe/models/quick-recipe";
import {HelpOverlay} from "app/quick-recipe/components/help-overlay";
import {TimerCoordinator} from "app/quick-recipe/timer-coordinator";
import {ScrollCoordinator} from "app/quick-recipe/scroll-coordinator";
import {Ingredient} from "app/shared/models/ingredient";
import {Timer} from "app/shared/models/timer";
import {QuickRecipeTimer} from "app/quick-recipe/models/quick-recipe-timer";

@autoinject()
export class QuickRecipePage {
  recipe: QuickRecipe;
  subrecipes: QuickRecipeSubrecipe[] = [];

  isRecipeStarted: boolean;
  isRecipeDone: boolean;

  private _currentStepId: number = undefined;
  private _navigationStepId: number = undefined;
  private _scrollCoordinator: ScrollCoordinator;
  private _timerCoordinator: TimerCoordinator;
  private _dialogService: DialogService;
  private _service: QuickRecipeService;
  private _i18n: I18N;
  private _animator: CssAnimator;

  constructor(service: QuickRecipeService, i18n: I18N, timerCoordinator: TimerCoordinator, scrollCoordinator: ScrollCoordinator, dialogService: DialogService, animator: CssAnimator) {
    this._service = service;
    this._i18n = i18n;
    this._scrollCoordinator = scrollCoordinator;
    this._dialogService = dialogService;
    this._animator = animator;
    this._timerCoordinator = timerCoordinator;

    this._timerCoordinator.onTimerStarted = timer => { this.onTimerStarted(timer, this); };
    this._timerCoordinator.onTimerEnded = timer => { this.onTimerEnded(timer, this); };
  }

  activate(route, routeConfig) {
    if ("Notification" in window) {
      if (Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }

    var hasSeenHelp = localStorage.getItem("helpSeen");
    if (!hasSeenHelp) {
      localStorage.setItem("helpSeen", "true");
      this._dialogService
        .open({ viewModel: HelpOverlay });
    }

    return this._service.getRecipe(route.id)
        .then(response => {
            this.recipe = new QuickRecipe(response.content);

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

  canDeactivate() {
    if (this.isRecipeStarted && !this.isRecipeDone) {
      return confirm(this._i18n.tr("quickRecipe.exitConfirmation"));
    }
  }

  deactivate() {
    this._scrollCoordinator.destroyScrollController();
  }

  startRecipe(): void {
    var that = this;
    this._scrollCoordinator.createScrollController();
    this._currentStepId = this.getNextUncompletedStepId();
    this._navigationStepId = this._currentStepId;
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
      this._scrollCoordinator.destroyScrollController();
      return;
    }

    this._currentStepId = this.getNextUncompletedStepId();
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
    this._navigationStepId = this._currentStepId;
    this.goToStepId(this._currentStepId);
  }

  goToPreviousStep(): void {
    if (this.isNavigationFirstStep) {
      return;
    }

    this.triggerSubrecipeChangeAnimation(this._navigationStepId, this._navigationStepId - 1);
    this.decorateStepIngredients(this.getStep(this._navigationStepId), "");

    this._navigationStepId--;

    this.goToStepId(this._navigationStepId);
  }

  goToNextStep(): void {
    if (this.isNavigationLastStep) {
      return;
    }

    this.triggerSubrecipeChangeAnimation(this._navigationStepId, this._navigationStepId + 1);
    this.decorateStepIngredients(this.getStep(this._navigationStepId), "");

    this._navigationStepId++;

    this.goToStepId(this._navigationStepId);
  }

  goToCurrentStep(): void {
    this.triggerSubrecipeChangeAnimation(this._navigationStepId, this._currentStepId);
    this.decorateStepIngredients(this.getStep(this._navigationStepId), "");

    this._navigationStepId = this._currentStepId;

    this.goToStepId(this._currentStepId);
  }

  get activeSubrecipeId(): number {
    if (!this._navigationStepId) {
      return -2;
    }

    return this.getStep(this._navigationStepId).subrecipeId;
  }

  get isCurrentStepActive(): boolean {
    var currentStep = document.getElementById("step-" + this._currentStepId);
    if (!currentStep) {
      return false;
    }

    return currentStep.classList.contains("active");
  }

  get isCurrentLastStep(): boolean {
    return this._currentStepId == this.recipe.steps.length - 1;
  }

  get isNavigationFirstStep(): boolean {
    return this._navigationStepId <= 0;
  }

  get isNavigationLastStep(): boolean {
    return this._navigationStepId == this.recipe.steps.length - 1;
  }

  private onTimerStarted(timer: QuickRecipeTimer, that: QuickRecipePage): void {
    var timerStep = that.recipe.steps.filter(step => step.id === timer.stepId)[0];
    var timerStepSubrecipe = this.subrecipes.filter(subrecipe => subrecipe.id == timerStep.subrecipeId)[0];
    timerStepSubrecipe.timers.push(timer);

    that.recipe.steps
      .filter(step => step.subrecipeId === timerStep.subrecipeId && step.id > timer.stepId)
      .forEach(postStep => { postStep.isOnHold = true; });
  }

  private onTimerEnded(timer: QuickRecipeTimer, that: QuickRecipePage): void {
    var timerStep = that.recipe.steps.filter(step => step.id === timer.stepId)[0];
    var timerStepSubrecipe = this.subrecipes.filter(subrecipe => subrecipe.id == timerStep.subrecipeId)[0];

    var index = timerStepSubrecipe.timers.indexOf(timer);
    timerStepSubrecipe.timers.splice(index, 1);

    that.recipe.steps
      .filter(step => step.subrecipeId === timerStep.subrecipeId && step.id > timer.stepId)
      .forEach(postStep => { postStep.isOnHold = false; });
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
    var element = document.getElementById("step-" + stepId);
    var navHeight = 65;
    var top = Math.max(0, element.offsetTop - ((window.innerHeight - navHeight - element.offsetHeight) / 2) + 32);
    this._scrollCoordinator.scrollTo(top);

    var targetStep = this.recipe.steps[stepId];
    this.decorateStepIngredients(targetStep, "current");
  }

  private triggerSubrecipeChangeAnimation(currentStepId: number, nextStepId: number): void {
    var subrecipeIdBefore = this.recipe.steps[currentStepId].subrecipeId;
    var subrecipeIdAfter = this.recipe.steps[nextStepId].subrecipeId;

    if (subrecipeIdBefore != subrecipeIdAfter) {
      var subrecipeTitleElement = document.getElementById("subrecipe-title-" + subrecipeIdAfter);
      this._animator.animate(subrecipeTitleElement, "subrecipe-title-animation");

      var element = $("#subrecipe-title-" + subrecipeIdAfter + " h1");

      var animationClassName = "fadeInDown";
      if (subrecipeIdBefore < subrecipeIdAfter) {
        animationClassName = "fadeInUp";
      }

      var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      element.addClass("animated " + animationClassName).one(animationEnd, function () {
        element.removeClass("animated " + animationClassName);
      });
    }
  }

  private getCurrentStep(): Step {
    return this.getStep(this._currentStepId);
  }

  private getStep(stepId: number): Step {
    return this.recipe.steps[stepId];
  }

  private decorateStepIngredients(step: Step, state: string): void {
    var ingredients: Ingredient[] =
      step.parts
        .filter(part => part instanceof IngredientPart)
        .map((part: IngredientPart) => part.ingredient);

    step.parts
      .filter(part => part instanceof IngredientEnumerationPart)
      .map((part: IngredientEnumerationPart) => part.ingredients)
      .forEach(enumeration => {
        ingredients = ingredients.concat(enumeration);
      });

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

class QuickRecipeSubrecipe {
  id: number;
  title: string;
  completedSteps: number = 0;
  steps: Step[];
  ingredients: Ingredient[];
  timers: QuickRecipeTimer[];
}
