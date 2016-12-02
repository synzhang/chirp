if defined? latest_pull_time
  json.latest_pull_time latest_pull_time
end
json.conversations do
  json.partial! 'microposts/conversation.json', collection: conversations, as: :micropost, lazyload: true
end
