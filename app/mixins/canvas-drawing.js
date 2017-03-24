import Ember from 'ember';

export default Ember.Mixin.create({
  ctx: Ember.computed(function(){
      let canvas = this.$()[0]; // jQuery returns JQuery collection and not the DOM element by default
      console.log("canvas in mixin: " + JSON.stringify(canvas));
      let ctx = canvas.getContext('2d');
      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      return ctx;
  }),

  drawFrame(img, frameHeight, width, height){
     let ctx = this.get('ctx');
     ctx.clearRect(0, 0, width, height);
     ctx.drawImage(
        img,
        0,
        frameHeight,
        width,
        height,
        0,
        0,
        width,
        height
      );
  },

  pause(){
    this.get('timeline').pause();
  },

  reverse(){
    this.get('timeline').reverse();
  }
});

