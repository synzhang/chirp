App.Pages.StaticPagesHome = (options) => {
  let conversationsView = new App.Views.Conversations({
    el: '#conversations',
    data: options.data,
    url: '/timeline',
    scrollThreshold: 300,
  })

  conversationsView.render()
}
