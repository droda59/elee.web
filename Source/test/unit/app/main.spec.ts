import {Main} from "app/main";

class RouterStub {
    routes;

    configure(handler) {
        handler(this);
    }

    map(routes) {
        this.routes = routes;
    }
}

class I18NStub {
    tr(key: any, options?: any): any {
        return key;
    }
}

describe("the Main module", () => {
    var app: Main;
    var mockedRouter: RouterStub;
    var mockedI18N: I18NStub;

    beforeEach(() => {
        mockedRouter = new RouterStub();
        mockedI18N = new I18NStub();
        app = new Main(mockedI18N);
        app.configureRouter(mockedRouter, mockedRouter);
    });

    it("contains a router property", () => {
        expect(app.router).toBeDefined();
    });

    it("configures the router title", () => {
        expect(app.router.title).toEqual("E133");
    });

    it("should have a home route", () => {
        expect(app.router.routes).toContain({
            route: ["", "home"],
            moduleId: "app/website/home",
            nav: false
        });
    });

    it("should have a comments page", () => {
        expect(app.router.routes).toContain({
            route: "typeform",
            name: "typeform",
            moduleId: "app/shared/components/typeform",
            nav: true,
            title: "comments.pageTitle"
        });
    });

    it("should have a quick recipe route", () => {
        expect(app.router.routes).toContain({
            route: "recipe/:id",
            name: "quick-recipe",
            moduleId: "app/quick-recipe/quick-recipe-page"
        });
    });
});
