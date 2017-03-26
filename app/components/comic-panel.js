import Ember from 'ember';
/* global GroupEffect */

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  classNames: ['comic-panel'],
  timeline: document.timeline,

  isPlaying: true,
     
  keyFrameEffects: [],
  keyFrameEffectsReady: computed('keyFrameEffects.@each','layerItems.@each', function(){
    return this.get('keyFrameEffects') !== undefined && this.get('keyFrameEffects.length') > 0 && this.get('keyFrameEffects.length') === this.get('layerItems.length');
  }),
  animations: computed('timeline', function() {
    return this.get('timeline').getAnimations();
  }),
  setup() {
    if (this.get('keyFrameEffectsReady')) {
      const keyFrameEffects = this.get('keyFrameEffects');
      const group = new GroupEffect(keyFrameEffects);

     //   let animation = new Animation(group, this.get('timeline'));
     // let currentTimeline = this.get('timeline').play(group);
      const animation = document.timeline.play(group); /* works! */
   //  animation.pause();
    // animation.play();
     this.set('animation', animation);
    }
  },
  initPanel: Ember.on('didReceiveAttrs', function() {
    Ember.run.scheduleOnce('afterRender', this, 'setup');
  }),
  controlAnimation(controlType, bulkOption) {
     /* this.get('animations').forEach((animation) => {
        animation[controlType]();
      }); */
      const animation = this.get('animation');
      animation[controlType](); // TODO: Generic controlType call of play / pause / reverse function
  },
  actions: {
    play() {
      console.log("play it");
      this.set('isPlaying', true);
      this.controlAnimation("play");
    },

    playAll() {
      this.set('isPlaying', true);
      this.controlAnimation("play", "all");
    },

    pause(bulkOption) {
      console.log("pause it");
      this.set('isPlaying', false);
      this.controlAnimation("pause");
    },

    pauseAll() {
      this.set('isPlaying', false);
      this.controlAnimation("pause", "all");
    },

    reverse() {
      this.set('isPlaying', true);
      this.controlAnimation("reverse");
    },

    setKeyFrames(keyFrame) {
      let keyFrameEffects = this.get('keyFrameEffects');
      keyFrameEffects.push(keyFrame);
    }
  }
});

