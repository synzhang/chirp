$(function() {
  let micropostModal = new App.Views.MicropostModal(),
      repostModal    = new App.Views.RepostModal();

  $(document)
    .on('click', '.js-repost', (event) => {
      event.preventDefault();

      let $micropost = $(event.currentTarget).closest('.micropost'),
          id         = $micropost.attr('id').replace('micropost-', ''),
          user       = $micropost.data('user');

      $.ajax({
        url: `/microposts`,
        data: {id: id},
        dataType: 'json',
        beforeSend: (xhr, settings) => {
          repostModal.render(user, id);
        }
      }).done((data, status, xhr) => {
        repostModal.fillOrigin(data);
      }).fail((xhr, status, error) => {
      });
    });
});
