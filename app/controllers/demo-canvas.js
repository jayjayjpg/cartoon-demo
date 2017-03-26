import Ember from 'ember';

export default Ember.Controller.extend({
  frameNumber: 0,
  isSmooth: true,
  animationIsRunning: false,
  actions: {
    incrementFrame() {
      if (this.get('frameNumber') < 5) {
        this.incrementProperty('frameNumber');
      }
      else {
         this.set('frameNumber', 0);
      }
    },
    toggleAnimationPlayState() {
      this.toggleProperty('animationIsRunning');
    }
  }
});
