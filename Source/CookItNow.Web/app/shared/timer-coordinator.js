var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-i18n"], function (require, exports, aurelia_framework_1, aurelia_i18n_1) {
    "use strict";
    var TimerCoordinator = (function () {
        function TimerCoordinator(i18n) {
            this.activeTimers = [];
            this._i18n = i18n;
        }
        TimerCoordinator.prototype.startTimer = function (timer) {
            var that = this;
            this.addTimer(timer);
            timer.start();
            if (!timer.onFinish) {
                timer.onFinish = function () {
                    if ("Notification" in window) {
                        if (Notification.permission === "granted") {
                            var options = {
                                body: timer.action
                            };
                            new Notification(that._i18n.tr("quickRecipe.timerEnded"), options);
                        }
                    }
                };
            }
        };
        TimerCoordinator.prototype.addTimer = function (timer) {
            if (this.activeTimers.indexOf(timer) === -1) {
                this.activeTimers.push(timer);
            }
        };
        TimerCoordinator.prototype.deleteTimer = function (timer) {
            var index = this.activeTimers.indexOf(timer);
            this.activeTimers.splice(index, 1);
            timer.delete();
            timer.onFinish = null;
        };
        TimerCoordinator = __decorate([
            aurelia_framework_1.inject(aurelia_i18n_1.I18N), 
            __metadata('design:paramtypes', [aurelia_i18n_1.I18N])
        ], TimerCoordinator);
        return TimerCoordinator;
    }());
    exports.TimerCoordinator = TimerCoordinator;
});
