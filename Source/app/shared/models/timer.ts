import {computedFrom} from "aurelia-framework";
// import {TimeValidationRule} from "app/shared/validation-rules/time-validation-rule";

export class Timer {
  private _originalSeconds: number;
  private _remainingSeconds: number;

  duration: string;

  text: string;
  action: string;
  isStopped: boolean = true;
  isEditingDescription: boolean = false;
  state: string = "original";
  timer: number;
  onFinish;

  constructor(duration?: string, action?: string, text?: string) {
    this.duration = duration;
    this.action = action;
    this.text = text;
  }

  start() {
    this.initialize();

    if (!this.timer) {
      this.play();
    }
  }

  replay() {
    this.initialize();
    this.play();
  }

  play() {
    this.isStopped = false;

    if (!this.timer) {
      var that = this;
      this.timer = setInterval(function () {
        if (!that.isStopped) {
          that._remainingSeconds--;

          that.state = that._remainingSeconds < ((that._originalSeconds / 100) * 10)
            ? "isAlmostDone"
            : "original";

          if (that._remainingSeconds <= 0) {
            that.isStopped = true;
            that.onFinish();
          }
        }
      }, 1000);
    }
  }

  delete() {
    clearInterval(this.timer);
    this.timer = null;
    this.isStopped = true;
    this.initialize();
    this.onFinish();
  }

  @computedFrom("_remainingSeconds")
  get remainingTime() {
    return this._remainingSeconds;
  }

  @computedFrom("_originalSeconds")
  get originalTime() {
    return this._originalSeconds;
  }

  private initialize() {
    var original = moment.duration(this.duration);
    this._remainingSeconds = moment.duration(original).asSeconds();
    this._originalSeconds = original.asSeconds();
  }
}
