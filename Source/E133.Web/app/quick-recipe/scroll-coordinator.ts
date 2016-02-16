import * as ScrollMagic from "scrollmagic";
import * as TweenMax from "gsap";
import "scrollmagic/scrollmagic/minified/plugins/animation.gsap.min";
import "scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min";
import "gsap/src/minified/plugins/ScrollToPlugin.min";

export class ScrollCoordinator {
    private _scrollController;

    destroyScrollController(): void {
        if (this._scrollController) {
            this._scrollController.destroy();
        }
    }

    createScrollController(): void {
        this.destroyScrollController();
        var instructions = document.getElementById("instructions");

        this._scrollController = new ScrollMagic.Controller()
			.scrollTo(function (newPos) {
				TweenMax.to(instructions, 0.5, { scrollTo: { y: newPos }});
			});
    }

    addScene(scene: ScrollMagic.Scene): void {
        scene.addTo(this._scrollController);
    }

    scrollTo(position: number): void {
        this._scrollController.scrollTo(position);
    }
}
