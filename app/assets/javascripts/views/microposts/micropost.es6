App.Views.Micropost = Backbone.View.extend({
  
  className: 'micropost',

  template: HandlebarsTemplates['microposts/micropost'],

  render() {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }

});
