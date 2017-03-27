import Ember from 'ember';
/* global GroupEffect, KeyFrameEffect */

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  classNames: ['comic-panel-wrapper'],
  timeline: document.timeline,

  isPlaying: false,

  keyFramesLength: computed('keyFrameEffects.length', function() {
    return this.get('keyFrameEffects').length;
  }),
  keyFramesEmpty: computed.empty('keyFramesLength'),
  anyKeyFramesPresent: computed.not('keyFramesEmpty'),
  
  layerItemsLength: computed('layerItems.@each', function() {
    return this.get('layerItems').length;
  }),
     
  keyFrameEffects: [],
  keyFrameEffectsReady: computed('keyFramesEmpty','layerItemsLength', function(){
    debugger;
    if (this.get('keyFramesEmpty')) {
      throw "No keyframes loaded yet";
    }
    return this.get('keyFrameEffects').length === this.get('layerItemsLength');
  }),
  setup() {
    if (this.get('keyFrameEffectsReady')) {
      const keyFrameEffects = this.get('keyFrameEffects');
      const group = new GroupEffect(keyFrameEffects);
     //   const animation = new Animation(group, this.get('timeline')); // alternative way of setting up the group animation
     // let currentTimeline = this.get('timeline').play(group);
     const animation = this.get('timeline').play(group);
     animation.pause();
     this.set('animation', animation);
    }
  },
  initPanel: Ember.observer('keyFrameEffectsReady', function() {
    if (this.get('keyFrameEffectsReady')) {
      Ember.run.scheduleOnce('afterRender', this, 'setup');
    }
  }),
  controlAnimation(controlType) {
    const animation = this.get('animation');
    animation[controlType]();
  },
  actions: {
    play() {
      this.get('animation').play();
      this.set('isPlaying', true);
    },

    pause() {
      this.get('animation').pause();
      this.set('isPlaying', false);
    },

    reverse() {
      this.set('isPlaying', true);
      this.controlAnimation("reverse");
    },

    setKeyFrames(keyFrame) {
      debugger;
      console.log("set keyframes");
      const keyFrameEffects = this.get('keyFrameEffects');
      keyFrameEffects.pushObject(keyFrame);
      console.log(keyFrameEffects);
    }
  }
});

