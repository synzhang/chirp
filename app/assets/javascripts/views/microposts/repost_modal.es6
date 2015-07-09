App.Views.RepostModal = Backbone.View.extend({

  el: '#repost-modal',

  events: {
    'ajax:beforeSend': 'beforeSendHandler',
    'ajax:success': 'successHandler',
    'ajax:error': 'errorHandler',
    'ajax:complete': 'completeHandler',
    'hide.bs.modal': 'reset'
  },

  initialize() {
    this.$origin = this.$('.repost__origin');
    this.$submit = this.$('[type="submit"]');
  },

  render(user, id) {
    this.prepare(user, id);
    this.loading();
    this.$el.modal('show');

    return this;
  },

  reset() {
    console.log('reset');
  },

  loading() {
    this.$origin.text('Loading...');
  },

  prepare(user, id) {
    this.$el.attr('action', `/users/${user}/microposts/${id}/repost`);
    this.$submit
      .removeAttr('disabled')
      .removeClass('is-disabled')
  },

  fillOrigin(data) {
    let micropost = new App.Views.Micropost({
                          model: new App.Models.Micropost(data)
                        });
    this.$origin.html(micropost.render().$el);
  },

  beforeSendHandler(event, xhr, settings) {
  },

  successHandler(event, data, status, xhr) {
    this.$el.modal('hide');
  },

  errorHandler(event, xhr, status, error) {
  },

  completeHandler(event, xhr, status) {
  }

});
