import Ember from 'ember';
import canvasDrawing from '../mixins/canvas-drawing';
import Frame from '../models/frame';

export default Ember.Component.extend(canvasDrawing, {
  classNames: ['panel','comic-panel', 'comic-panel-canvas'],
  attributeBindings: ['id:customId'],
  width: 500,
  height: 500,
  customId: 'canvasPanel',
  imgUrl: 'img/batguy-sprite.png',
  imgSrc: Ember.computed('data.bgImg', function(){
    console.log("data bgimg src? " + this.get('data.bgImg'));
    return this.get('data.bgImg');
  }),
  setup: Ember.on('didInsertElement', function() {
    let ctx = this.$('canvas')[0].getContext('2d');
    this.set('ctx', ctx);
    let img = this.createImgObjects();
    this.set('currentImg', this.get('imgObjs')[0]);
    this.loop();
  }),
  frameNum: 0,
  drawFrame: Ember.observer('frameNum', function() {
    this.draw();
  }),
  createImgObjects(){
    let frameHeight = 2000;
    let imgCollection = [0, 200, 400, 600, 800].map((num) => {
      return this.createImgObj(num);
    });

    this.set('imgObjs', imgCollection);
    console.log("imgObjs? " + JSON.stringify(this.get('imgObjs')));
  },
  draw() {
    let frame = this.get('frameNum');
    let sx = 448 * frame;
    let ctx = this.get('ctx');
    const canvasWidth = this.get('width');
    const canvasHeight = this.get('height');
    let img = this.$('#source')[0]; /* TODO: actually load image in the component */
    //let img = this.get('currentImg');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, 0, sx, 1000, canvasWidth, 0, 0, 1000, canvasHeight);
   /* works with scott pilgrim */
   /*  const frame = this.get('frameNum');
     const ctx = this.get('ctx');
     const img = this.get('frame'); */ /* TODO: Make it work like movie panel */
  },
  createImgObj(heightCalc){
      console.log("height calc? " + heightCalc);

      let imgInst = Frame.create({ frameHeight: heightCalc, imgSrc: this.get('imgUrl') });
      return imgInst;
  },
  loop() {
    this.draw();
    this.nextFrame();
    Ember.run.later(this, this.loop, 100);
  },
  nextFrame() {
      if (this.get('frameNum') < 5) {
        this.incrementProperty('frameNum');
      }
      else {
         this.set('frameNum', 0);
      }
  },
  actions: {
    nextFrame() {
      console.log("call nextFrame");
      if (this.get('frameNum') < 5) {
        this.incrementProperty('frameNum');
      }
      else {
         this.set('frameNum', 0);
      }
    }
  }
})

