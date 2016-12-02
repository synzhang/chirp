App.Models.Micropost = Backbone.Model.extend({
  paramRoot: 'micropost',

  defaults: {
    type: 'micropost',
    author: '',
    userId: '',
    content: '',
    timestamp: '',
    repostCount: 0,
  },

  initialize(options) {
    this.options = options

    switch (this.options.type) {
      case 'statement':
        this.micropostId = this.options.micropostId
        break
      case 'reply':
        this.statementId = this.options.statementId
        break
    }

    if (typeof this.options.collection != 'undefined') {
      this.collection = this.options.collection
    }
  },

  url() {
    return `${window.location.origin}/users/${this.get('userId')}/microposts/${this.get('id')}`
  },

  validate(attrs, options) {
  },

  repost() {
  },

  reply() {
  },
})
