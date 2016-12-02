App.Views.ReplyForm = Backbone.View.extend({
  className: 'reply-form',

  tagName: 'form',

  template: HandlebarsTemplates['microposts/reply_form'],

  events: {
    'click .reply-form__content': 'focusContent',
    'click .reply-form__submit': 'submitForm',
  },

  initialize(options) {
    this.options = options
    this.replies = this.options.collection

    this
      .listenTo(this.replies, 'add', this.resetForm)
  },

  render() {
    this.$el
      .addClass('is-folded')
      .html(this.template())

    this.$content = this.$('.reply-form__content')
    this.$submit  = this.$('.reply-form__submit')

    this.resetForm()

    return this
  },

  focusContent(replyTo) {
    let value = this.$content.val()
    this.$el.removeClass('is-folded')
    this.$content.focus().val('').val(value)
  },

  blurContent() {
    this.$form.addClass('is-folded')
    this.$content.blur()
  },

  submitForm(event) {
    event.preventDefault()
    this.replies.create(this.newAttributes(), {wait: true})
  },

  newAttributes() {
    return {
      collection: this.replies,
      userId: this.options.userId,
      statementId: this.options.statementId,
      content: this.$content.val(),
    }
  },

  resetForm() {
    this.$content.val(this.options.conversationUsers + ' ')
  },
})
