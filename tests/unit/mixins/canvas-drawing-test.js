import Ember from 'ember';
import CanvasDrawingMixin from 'cartoon-demo/mixins/canvas-drawing';
import { module, test } from 'qunit';

module('Unit | Mixin | canvas drawing');

// Replace this with your real tests.
test('it works', function(assert) {
  let CanvasDrawingObject = Ember.Object.extend(CanvasDrawingMixin);
  let subject = CanvasDrawingObject.create();
  assert.ok(subject);
});
