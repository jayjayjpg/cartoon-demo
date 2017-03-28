import Ember from 'ember';

export default Ember.Controller.extend({
 layers: [
    {
      layerType: 'comic-panel-layer',
      layerClass: 'scaling-background',
      layerImage: '/img/panorama-cut.png',

      frameNumber: 1,

      layerKeys: [
        { backgroundPosition: '0 0', 
          transform: 'scale(1.2, 1.2)', 
          filter: 'blur(0px)', 
          backgroundSize: '100% auto',
          opacity: 1 },
        { backgroundPosition: '0 bottom', 
          transform: 'scale(1, 1)', 
          filter: 'blur(2px) saturate(8)', 
          backgroundSize: '100% auto',
          opacity: 0.5 }
      ],

      animationOptions: {
        duration: 30000,
        fill: 'forwards',
        easing: 'linear',
        iterations: 1
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
