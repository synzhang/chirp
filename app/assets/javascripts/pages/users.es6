App.Pages.UsersShow = (options) => {
  let conversationsView = new App.Views.Conversations({
    el: '#conversations',
    data: options.data,
    url: `${options.userId}/timeline`,
    scrollThreshold: 300,
  })

  conversationsView.render()
}
