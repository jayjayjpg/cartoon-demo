import Ember from 'ember';
import canvasDrawing from '../mixins/canvas-drawing';

export default Ember.Object.extend(canvasDrawing, {
  frameHeight: null,
  imgSrc: null,
  init(){
      let image = new Image();
      image.onload = () => {
        this.set('naturalHeight', image.height);
        this.set('naturalWidth', image.width);
        this.set('pseudoImg', image);
        console.log("psudeoImg in init? " + this.get('pseudoImg'));
      };
     image.src = this.get('imgSrc');
     //debugger;

     return this._super(...arguments);
  },
  render(){
  //....

   }
});

