App.Views.ReplyModal = Backbone.View.extend({
  el: '#reply-modal',

  events: {
    'ajax:success': 'successHandler',
    'ajax:error': 'errorHandler',
    'ajax:complete': 'completeHandler',
    'hide.bs.modal': 'reset',
  },

  initialize() {
    this.$context = this.$('.reply__context')
    this.$content = this.$('.reply__content').find('textarea')
    this.$submit = this.$('[type="submit"]')
  },

  render() {
    return this
  },

  loadingContext() {
    this.$context.text('Loading...')
  },

  fillContext(data) {
    let micropostView = new App.Views.Micropost({
      model: new App.Models.Micropost(data),
    })
    this.$context.html(micropostView.render().$el)
  },

  prepare(user, id) {
    this.$el.attr('action', `/users/${user}/microposts/${id}/replies`)
    this.$submit
      .removeAttr('disabled')
      .removeClass('is-disabled')
  },

  focusContent() {
    let value = this.$content.val()
    this.$content.focus().val('').val(value)
  },

  show(user, id) {
    this.prepare(user, id)
    this.loadingContext()
    this.focusContent()
    this.$el.modal('show')
  },

  successHandler() {
    $document.trigger('pull.timeline')
    this.$el.modal('hide')
  },

  errorHandler() {
  },

  completeHandler() {
  },

  reset() {
    this.$context.empty()
    this.$content.val('')
    this.$submit
      .attr('disabled', true)
      .addClass('is-disabled')
  },
})
