App.Views.Conversations = Backbone.View.extend({
  events: {
    'click .new-arrival-bar': 'prependArrival',
  },

  initialize(options) {
    this.options = options
    this.$el = $(this.options.el)
    this.$newArrivalBar = this.$('.new-arrival-bar')
    this.$newArrivalCount = this.$newArrivalBar.find('.new-arrival-count')
    this.conversations = this.options.data.conversations || []
    this.newArrivalsIndex = 0
    this.latestPullTime = this.options.data.latest_pull_time
    this.page = this.options.page || 1
    this.isLoading = false
    this.pollTimeout = null

    this.handleScroll()
    this.handlePoll()

    $document
      .on('pull.timeline', this.pull.bind(this))
  },

  render() {
    this.append(this.conversations)
  },

  initializeConversationViews(conversations) {
    let conversationViews = []

    conversations.forEach((conversation) => {
      let conversationView = new App.Views.Conversation(conversation)

      conversationViews.push(conversationView.render().el)
    })

    return conversationViews
  },

  append(conversations) {
    this.conversations.concat(conversations)
    this.$el.append(this.initializeConversationViews(conversations))
  },

  noticeArrival(data) {
    let newArrivals = data.conversations
    this.latestPullTime = data.latest_pull_time

    if (newArrivals.length > 0) {
      this.conversations = newArrivals.concat(this.conversations)
      this.newArrivalsIndex += newArrivals.length
      this.$newArrivalCount.text(this.newArrivalsIndex)
      this.$newArrivalBar.addClass('is-shown')
    }
  },

  prependArrival(event) {
    event.preventDefault()

    this.$newArrivalBar
      .removeClass('is-shown')
      .after(this.initializeConversationViews(this.conversations.slice(0, this.newArrivalsIndex)))
    this.newArrivalsIndex = 0
  },

  load() {
    this.isLoading = true

    $
      .ajax({
        url: this.options.url,
        data: {
          page: ++this.page,
        },
        dataType: 'json',
        beforeSend() {
          console.log('before load')
        },
      })
      .done((data, status, jqxhr) => {
        this.append(data.conversations)
      })
      .fail((jqxhr, status, error) => {
        alert('Load failed!')
      })
      .always(() => {
        this.isLoading = false
      })
  },

  pull() {
    $
      .ajax({
        url: this.options.url,
        data: {
          method: 'pull',
          latest_pull_time: this.latestPullTime,
        },
        dataType: 'json',
      })
      .done((data, status, jqxhr) => {
        this.noticeArrival(data)
      })
      .fail((jqxhr, status, data) => {
        alert('Pull failed!')
      })
  },

  handleScroll() {
    $window = $(window)
    $document = $(document)

    $window.on('scroll', () => {
      if (!this.isLoading && $document.height() - $window.scrollTop() - $window.height() <= this.options.scrollThreshold) {
        this.load()
      }
    })
  },

  handlePoll() {
    this.pollTimeout = setInterval(() => {
      this.pull()
    }, 20000)
  },
})
