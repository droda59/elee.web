import {Router} from 'aurelia-router';

export class ChildRouter{
  heading = 'Child Router';
  router:Router;

  configureRouter(config, router:Router){
    config.map([
      { route: ['','welcome'],  moduleId: 'welcome',      nav: true, title:'Welcome' },
      { route: 'form',  moduleId: 'form',      nav: true, title:'Form' },
      { route: 'flickr',        moduleId: 'flickr',       nav: true },
    ]);

    this.router = router;
  }
}
