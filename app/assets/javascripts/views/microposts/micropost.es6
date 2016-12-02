App.Views.Micropost = Backbone.View.extend({
  className: 'micropost',

  template: HandlebarsTemplates['microposts/micropost'],

  initialize(options) {
    this.model = options.model
    this.$el
      .attr({
        'data-micropost': this.model.get('id'),
        'data-user': this.model.get('userId'),
      })

    this
      .listenTo(this.model, 'destroy', () => {
        this.$el
          .fadeOut(400, () => {
            this.$el.remove()
          })
      })
  },

  render() {
    this.$el.html(this.template(this.model.toJSON()))

    return this
  },
})

