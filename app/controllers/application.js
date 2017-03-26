import Ember from 'ember';

export default Ember.Controller.extend({
  routeTitle: Ember.computed('target.url', function(){
    return 'route title';
  }),
  actions: {
    didTransition() {
      const owner        = Ember.getOwner(this);
      const currentRoute = owner.lookup('router:main').currentRouteName;
      const routeInfo    = owner.lookup(`route:${currentRoute}`).get('info');
      console.log(routeInfo);
      this.set('currentRouteTitle', routeInfo);
    }
  }
});
