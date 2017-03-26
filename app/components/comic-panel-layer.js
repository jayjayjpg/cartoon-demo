import Ember from 'ember';

const {
  Component,
  computed,
  String
} = Ember;

export default Component.extend({
  classNames: ['comic-panel-layer'],
  attributeBindings: ['bgImageStyle:style'],
  bar: true,
  bgImage: null,
  bgImageStyle: computed('bgImage', function() {
    return String.htmlSafe(`background-image: url(${this.get('bgImage')})`);
  }),
  createKeyFrames: Ember.on('didRender', function() {
    const keyFrames = this.get('keyFrames');
    const animationOptions = this.get('animationOptions');
    const layerElement = this.get('element');


    const timings = this.get('animationOptions');
    const layerKeyFrame = new KeyframeEffect(layerElement, keyFrames, timings);
    const frameAction = this.get('frameAction');
    frameAction(layerKeyFrame);

   // let timeline = this.createTimeline(500);
   // this.set('timeline', timeline);
   /* this.$()[0].animate(keyFrames, animationOptions);
  //  console.log("keyframes? " + keyFrames); */
  }),
  animationOptions: computed(function() {
    const options = this.get('options');
    if (options) {
      return options;
    }
    else {
      return {
        duration: 1000,
        easing: 'ease-in',
        iterations: Infinity
      };
    }
  })

});
