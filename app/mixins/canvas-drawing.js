import Ember from 'ember';

export default Ember.Mixin.create({
  isSmooth: false,
  pseudoImg: null,

  ctx: Ember.computed(function(){
    let canvas = this.get('element');
    let ctx = canvas.getContext('2d');
    return ctx;
  }),

  smoothingEnabled: Ember.computed('isSmooth', function() {
    const isSmooth = this.get('isSmooth');
    const ctx = this.get('ctx');
    ctx.mozImageSmoothingEnabled = isSmooth;
    ctx.webkitImageSmoothingEnabled = isSmooth;
    ctx.msImageSmoothingEnabled = isSmooth;
    ctx.imageSmoothingEnabled = isSmooth
  }),

  loadImage: Ember.on('init', function() {
   const srcImage = new Image();
   srcImage.onload = () => {
     this.set('naturalHeight', srcImage.height);
     this.set('naturalWidth', srcImage.width);
     this.set('pseudoImg', srcImage);
     console.log("LOADED PSEUDO IMAGE");
   };
   srcImage.src = this.get('imgUrl');
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

