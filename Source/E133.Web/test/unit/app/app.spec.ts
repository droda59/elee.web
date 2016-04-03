import {App} from "app/app";

class RouterStub {
    routes;

    configure(handler) {
        handler(this);
    }

    map(routes) {
        this.routes = routes;
    }
}

describe("the App module", () => {
    var app: App;
    var mockedRouter: RouterStub;

    beforeEach(() => {
        mockedRouter = new RouterStub();
        app = new App();
        app.configureRouter(mockedRouter, mockedRouter);
    });

    it("contains a router property", () => {
        expect(app.router).toBeDefined();
    });

    it("configures the router title", () => {
        expect(app.router.title).toEqual("E133");
    });

    it("should have a welcome route", () => {
        expect(app.router.routes).toContain({ route: ["","welcome"], moduleId: "app/welcome/welcome", nav: true, title:"Welcome" });
    });

    it("should have a comments page", () => {
        expect(app.router.routes).toContain({ route: "typeform", name: "typeform", moduleId: "app/shared/components/typeform", nav: true, title:"Comments" });
    });

    it("should have a quick recipe route", () => {
        expect(app.router.routes).toContain({ route: "recipe/:id", name: "quick-recipe", moduleId: "app/quick-recipe/quick-recipe-page" });
    });
});
