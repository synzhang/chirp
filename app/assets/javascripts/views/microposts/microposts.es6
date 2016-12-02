App.Views.Microposts = Backbone.View.extend({
  className: 'microposts',

  initialize(options) {
    this.options = options
    this.collection = this.options.collection

    this
      .listenTo(this.collection, 'add', this.addOne)
      .listenTo(this.collection, 'reset', this.addAll)
  },

  render() {
    this.addAll()

    return this
  },

  addOne(micropost) {
    let micropostView = new App.Views.Micropost({model: micropost})

    this.$el.append(micropostView.render().el)
  },

  addAll() {
    let micropostViews = []

    this.collection.each((micropost, index) => {
      micropostViews[index] = new App.Views.Micropost({model: micropost}).render().el
    })
    this.$el
      .empty()
      .append(micropostViews)
  },
})

