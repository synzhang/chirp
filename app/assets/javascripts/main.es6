$(() => {
  let micropostModal = new App.Views.MicropostModal()
  let replyModal = new App.Views.ReplyModal()
  let repostModal = new App.Views.RepostModal()

  replyModal.render()
  repostModal.render()

  $document
    .on('click', '.js-reply', (event) => {
      let $micropost = $(event.currentTarget).closest('.micropost')
      let id = $micropost.data('micropost')
      let user = $micropost.data('user')

      event.preventDefault()

      if ($micropost.is('.micropost--original')) {
        let $conversation = $micropost.closest('.conversation')
        let conversationView = $conversation.data('conversation')

        if (!conversationView.isExpanded) conversationView.expand()
        conversationView.focusReplyForm()
      } else {
        $
          .ajax({
            url: `/users/${user}/microposts/${id}`,
            dataType: 'json',
            beforeSend: (xhr, settings) => {
              replyModal.show(user, id)
            },
          })
          .done((data, status, jqxhr) => {
            replyModal.fillContext(data)
          })
          .fail((jqxhr, status, error) => {
          })
      }
    })
    .on('click', '.js-repost', (event) => {
      let $button = $(event.currentTarget)
      let $micropost = $button.closest('.micropost')
      let id = $micropost.data('micropost')
      let user = $micropost.data('user')

      event.preventDefault()

      if (!$button.hasClass('is-reposted')) {
        $
          .ajax({
            url: `/users/${user}/microposts/${id}`,
            dataType: 'json',
            beforeSend: (xhr, settings) => {
              repostModal.show(user, id)
            },
          })
          .done((data, status, xhr) => {
            repostModal.fillOrigin(data)
          })
          .fail((xhr, status, error) => {
          })
      } else {
        console.log('cancel repost')
      }
    })
    .on('click', '.js-delete', (event) => {
      event.preventDefault()

      if (confirm('Confirm delete?')) {
        $(event.currentTarget)
          .closest('.conversation')
          .data('conversation')
          .micropostView
          .model
          .destroy()
      }
    })
})
