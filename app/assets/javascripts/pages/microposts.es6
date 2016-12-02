App.Pages.MicropostsShow = (options) => {
  let $wrapper = $('.wrapper')
  let conversationView = new App.Views.Conversation(options.conversation)

  conversationView.render()
  conversationView.expand()
  $wrapper.append(conversationView.$el)
}
