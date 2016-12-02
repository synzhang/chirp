App.Collections.Microposts = Backbone.Collection.extend({
  model: App.Models.Micropost,

  initialize(models, options) {
    this.options = options
  },

  url() {
    switch (this.options.type) {
      case 'statements':
        return `${window.location.origin}/users/${this.options.userId}/microposts/${this.options.micropostId}/statements`
        break
      case 'replies':
        return `${window.location.origin}/users/${this.options.userId}/microposts/${this.options.statementId}/replies`
        break
    }
  },
});
