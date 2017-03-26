import Ember from 'ember';
import canvasDrawing from '../mixins/canvas-drawing';

export default Ember.Component.extend(canvasDrawing, {
  tagName: 'canvas',
  isRunning: false,
  frameNum: 0,
  currentLoop: null,
  totalNumOfFrames: 5,
  classNames: ['panel','comic-panel', 'comic-panel-canvas'],
  attributeBindings: ['canvasWidth:width', 'canvasHeight:height'],
  canvasWidth: 500,
  canvasHeight: 500,
  imgUrl: 'img/batguy-sprite.png',
  setup: Ember.observer('pseudoImg', 'isRunning', function() {
    this.draw();
    if (this.get('isRunning') && Ember.isEmpty(this.get('currentLoop')) ) {
      this.loop();
    }
    else {
      const currentLoop = this.get('currentLoop');
      Ember.run.cancel(currentLoop);
      this.set('currentLoop', null);
    }
  }),
  drawFrame: Ember.observer('frameNum', function() {
    this.draw();
  }),
  draw() {
    const frame = this.get('frameNum');
    const srcHeight = this.get('naturalHeight');
    const framesTotal = this.get('totalNumOfFrames') + 1;
    const sx = 0;
    const sy = srcHeight / framesTotal * frame;
    const sWidth = this.get('naturalWidth');
    const dWidth = this.get('naturalWidth');
    const sHeight = srcHeight / framesTotal;
    const ctx = this.get('ctx');
    const canvasWidth = this.get('canvasWidth');
    const canvasHeight = this.get('canvasHeight');
    const img = this.get('pseudoImg');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    /* drawImage method signature: void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); */
    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, dWidth, canvasHeight);
  },
  loop() {
    this.draw();
    this.nextFrame();
    const loop = Ember.run.later(this, this.loop, 100);
    this.set('currentLoop', loop);
  },
  nextFrame() {
      if (this.get('frameNum') < this.get('totalNumOfFrames')) {
        this.incrementProperty('frameNum');
      }
      else {
         this.set('frameNum', 0);
      }
  }
})

