import {Home} from "app/website/home";

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

describe("the Home website module", () => {
    var home: Home;
    var mockedRouter: RouterStub;
    var mockedI18N: I18NStub;

    beforeEach(() => {
        mockedRouter = new RouterStub();
        mockedI18N = new I18NStub();

        home = new Home(mockedI18N);
        home.configureRouter(mockedRouter, mockedRouter);
    });

    it("should have a welcome route", () => {
        expect(home.router.routes).toContain({
            route: ["", "welcome"],
            name: "welcome",
            moduleId: "app/website/welcome/welcome",
            nav: true,
            title: "home.pageTitle"
        });
    });

    it("should have an about route", () => {
        expect(home.router.routes).toContain({
            route: "about",
            name: "about",
            moduleId: "app/website/about/about",
            nav: true,
            title: "about.pageTitle"
        });
    });
});