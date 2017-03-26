import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('comic-panel-layer', 'Integration | Component | comic panel layer', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{comic-panel-layer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#comic-panel-layer}}
      template block text
    {{/comic-panel-layer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
