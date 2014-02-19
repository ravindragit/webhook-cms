export default Ember.Component.extend({
  classNames: ['wy-control-group'],
  classNameBindings: [
    'control.required:wy-control-group-required',
    'isEditingThis:wy-control-group-edit',
    'justAdded:wy-control-group-placed'
  ],

  isEditingThis: false,
  justAdded    : true,

  controlChanged: function () {
    this.set('isEditingThis', this.get('isEditing') && this.get('control') === this.get('editingControl'));
  }.observes('control', 'editingControl', 'isEditing'),

  prepForDelete: function () {
    this.$().height(this.$().height());
    this.$().addClass('wy-control-group-removed');
    this.$().height(0);
  }.observes('control.justDeleted'),

  didInsertElement: function () {
    if (this.get('doEdit')) {
      this.$(this.get('element')).tooltip({
        placement: 'left',
        title: 'Click to edit field details.'
      });
      setTimeout(function () {
        this.set('justAdded', false);
      }.bind(this), 500);
    }
  },

  click: function () {
    this.sendAction('doEdit', this.get('control'));
  },

  notify: 'notify',

  actions: {
    notify: function (type, message) {
      this.sendAction('notify', type, message);
    }
  }
});
