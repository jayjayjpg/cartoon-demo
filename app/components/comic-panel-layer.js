import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  classNames: ['comic-panel-layer'],
  attributeBindings: ['bgImageStyle:style'],
  bgImage: null,
  frameNumber: 1,
  bgImageStyle: computed('bgImage', 'frameNumber', function() {
    return Ember.String.htmlSafe(`background-image: url(${this.get('bgImage')});
                            background-size: auto ${this.get('frameNumber') * 100}%`);
  }),
  createKeyFrames: Ember.on('didRender', function() {
    const keyFrames = this.get('keyFrames');
    const animationOptions = this.get('animationOptions');
    const layerElement = this.get('element');


    const timings = this.get('animationOptions');
    const layerKeyFrame = new KeyframeEffect(layerElement, keyFrames, timings);
    this.sendAction('frameAction', layerKeyFrame);



   // let timeline = this.createTimeline(500);
   // this.set('timeline', timeline);
   /* this.$()[0].animate(keyFrames, animationOptions);
  //  console.log("keyframes? " + keyFrames); */
  }),
  animationOptions: computed('options.@each', function() {
    const options = this.get('options');
    if (options) {
      return options;
    }
    else {
      throw "Your comic-layer's animation options are undefined. Please pass in animation options to build a KeyframeEffect";
    }
  })

});
