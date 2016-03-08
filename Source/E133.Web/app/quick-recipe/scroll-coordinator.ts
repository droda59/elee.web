import * as ScrollMagic from "scrollmagic";
import * as $ from "jquery";

export class ScrollCoordinator {
    private _scrollController;

    destroyScrollController(): void {
        if (this._scrollController) {
            this._scrollController.destroy();
        }
    }

    createScrollController(): void {
        var instructions = $("#instructions");

        this._scrollController = new ScrollMagic.Controller()
            .scrollTo(function (newPos) {
                instructions.animate({
                    scrollTop: newPos
                }, 500);
            });
    }

    addScene(scene: ScrollMagic.Scene): void {
        scene.addTo(this._scrollController);
    }

    scrollTo(position: number): void {
        this._scrollController.scrollTo(position);
    }
}
