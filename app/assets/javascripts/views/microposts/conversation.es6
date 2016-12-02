App.Views.Conversation = Backbone.View.extend({
  className: 'conversation',

  events: {
    'click .micropost--original': 'toggle',
  },

  initialize(options) {
    this.options = options
    this.isLazyInitialized = false
    this.isExpanded = false
    if (typeof this.options.micropost != 'undefined') {
      this.micropostView = new App.Views.Micropost({
        model: new App.Models.Micropost(this.options.micropost),
      })
    }
    this.$el.data('conversation', this)
  },

  render() {
    this.micropostView
      .render()
      .$el
        .addClass('micropost--original')
    this.$el.append(this.micropostView.$el)

    return this
  },

  lazyInitialize() {
    if (this.options.isReply) {
      if (typeof this.options.statements != 'undefined') {
        this.statements = new App.Collections.Microposts(this.options.statements, {
          type: 'statements',
          userId: this.options.micropost.userId,
          micropostId: this.options.micropost.id,
        })
      } else {
        this.statements = new App.Collections.Microposts(null, {
          type: 'statements',
          userId: this.options.micropost.userId,
          micropostId: this.options.micropost.id,
        })
      }
      this.statementsView = new App.Views.Microposts({collection: this.statements})
      this.statementsView.$el.addClass('micropost--statements')
      this.$el.prepend(this.statementsView.$el)
      if (typeof this.options.statements != 'undefined') {
        this.statementsView.render()
      } else {
        this.statements.fetch({reset: true})
      }
    }

    if (typeof this.options.replies != 'undefined') {
      this.replies = new App.Collections.Microposts(this.options.replies, {
        type: 'replies',
        userId: this.options.micropost.userId,
        statementId: this.options.micropost.id,
      })
    } else {
      this.replies = new App.Collections.Microposts(null, {
        type: 'replies',
        userId: this.options.micropost.userId,
        statementId: this.options.micropost.id,
      })
    }
    this.repliesView = new App.Views.Microposts({collection: this.replies})
    this.repliesView.$el.addClass('micropost--replies')

    this.replyFormView = new App.Views.ReplyForm({
      collection: this.replies,
      userId: this.options.micropost.userId,
      statementId: this.options.micropost.id,
      conversationUsers: this.options.micropost.conversationUsers,
    })

    this.$el
      .append(this.replyFormView.render().$el)
      .append(this.repliesView.$el)
    if (typeof this.options.replies != 'undefined') {
      this.repliesView.render()
    }

    this.isLazyInitialized = true
  },

  toggle(event) {
    let $target = $(event.target)
    if (!$target.is('.micropost, .micropost__header, .micropost__body, .micropost__actions')) return
    this[this.$el.hasClass('is-expanded') ? 'collapse' : 'expand']()
  },

  expand() {
    if (!this.isLazyInitialized) this.lazyInitialize()
    this.replies.fetch({reset: true})
    this.$el.addClass('is-expanded')
    this.isExpanded = true
  },

  collapse() {
    this.$el.removeClass('is-expanded')
    this.isExpanded = false
  },

  focusReplyForm() {
    this.replyFormView.focusContent()
  },
})
