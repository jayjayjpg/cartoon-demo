import Ember from 'ember';

export default Ember.Controller.extend({
  frameNumber: 0,
  animationIsRunning: false,
  totalNumOfFrames: 5,
  actions: {
    incrementFrame() {
      if (this.get('frameNumber') < this.get('totalNumOfFrames')) {
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
