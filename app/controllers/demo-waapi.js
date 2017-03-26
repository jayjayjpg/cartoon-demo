import Ember from 'ember';

export default Ember.Controller.extend({
 layers: [
    {
      layerType: 'comic-panel-layer',
      layerKeys: [
        { backgroundPosition: '0 0' },
        { backgroundPosition: '-1200px 0' }
      ],
      layerClass: 'moving-background',
      layerImage: '/img/f2.png',
      animationOptions: {
        duration: 1000,
        fill: 'both',
        easing: 'ease',
        iterations: Infinity
      }
     },
    {
      layerType: 'comic-panel-layer',
      layerImage: '/img/kimwalks-sprite.png',
      layerClass: 'comic-panel__foreground__character',
      layerKeys:  [
        { backgroundPosition: '0 0' },
        { backgroundPosition: '-1350px 0' }
      ],  // TODO: create my own panel object class which can be modified with classname and component type
      animationOptions: {
        duration: 1000,
        fill: 'both',
        easing: 'steps(9, end)',
        iterations: Infinity
      }
   }
 ]
});
