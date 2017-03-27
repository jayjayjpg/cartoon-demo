import Ember from 'ember';

export default Ember.Controller.extend({
 layers: [
    {
      layerType: 'comic-panel-layer',
      layerClass: 'moving-background',
      layerImage: '/img/batguy-sprite.png',

      frameNumber: 6,

      layerKeys: [
        { backgroundPosition: '0 0' },
        { backgroundPosition: '0 120%' }
      ],

      animationOptions: {
        duration: 1000,
        fill: 'both',
        easing: 'steps(6)',
        iterations: Infinity
      }
     },
    {
      layerType: 'comic-panel-layer',
      layerImage: '/img/kimwalks-cut-sprite.png',
      layerClass: 'character',

      frameNumber: 8,

      layerKeys: [
        { backgroundPosition: '0 0' },
        { backgroundPosition: '0 114.275%' } // default: 0 125%
      ],

      animationOptions: {
        duration: 1200,
        fill: 'none',
        direction: 'normal',
        easing: 'steps(8)',
        iterations: Infinity
      }
   }
 ]
});
