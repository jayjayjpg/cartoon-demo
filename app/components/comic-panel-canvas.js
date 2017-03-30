import Ember from 'ember';
import canvasDrawing from '../mixins/canvas-drawing';

export default Ember.Component.extend(canvasDrawing, {
  tagName: 'canvas',
  isRunning: false,
  classNames: ['panel','comic-panel', 'comic-panel-canvas'],
  attributeBindings: ['canvasWidth:width', 'canvasHeight:height'],
  currentLoop: null,
  frameNum: 0,
  totalNumOfFrames: 5,
  canvasWidth: 500,
  canvasHeight: 500,
  imgUrl: 'img/batguy-sprite-3.png',

  noRunningLoop: Ember.computed.empty('currentLoop'),
  createNewLoop: Ember.computed.and('isRunning', 'noRunningLoop'),

  setup: Ember.observer('pseudoImg', 'isRunning', function() {
    this.draw();
    if (this.get('createNewLoop')) {
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

  dWidth: Ember.computed('canvasHeight', 'naturalWidth', 'naturalHeight', 'totalNumOfFrames' function() {
    return (this.get('canvasHeight') * this.get('naturalWidth')) * this.get('totalNumOfFrames') / this.get('naturalHeight');
  }),

  draw() {
    const frame = this.get('frameNum');
    const srcHeight = this.get('naturalHeight');
    const framesTotal = this.get('totalNumOfFrames') + 1;
    const sx = 0;
    const sy = srcHeight / framesTotal * frame;
    const sWidth = this.get('naturalWidth');
    const dWidth = this.get('dWidth');
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
});

