App.Views.MicropostModal = Backbone.View.extend({

  el: '#micropost-modal',

  events: {
    'ajax:beforeSend': 'beforeSendHandler',
    'ajax:success': 'successHandler',
    'ajax:error': 'errorHandler',
    'ajax:complete': 'completeHandler',
    'change [name="micropost[picture]"]': 'checkImageSize'
  },

  initialize() {
    this.validated = true;
    this.$imageField = this.$('[name="micropost[picture]"]');
  },

  render() {
    this.$el.modal('show');

    return this;
  },

  checkImageSize() {
    let size = this.$imageField[0].files[0].size/1024/1024;
    if (size > 5) {
      this.validated = false;
      alert('Maximum file size is 5MB. Please choose a smaller file.');
    }
  },

  beforeSendHandler(event, xhr, settings) {
    return this.validated;
  },

  successHandler(event, data, status, xhr) {
    this.$el.modal('hide');
    $('.flashes').append('<li class="flash flash--success">Micropost posted!</li>')
  },

  errorHandler(event, xhr, status, error) {
  },

  completeHandler(event, xhr, status) {
  }

});
