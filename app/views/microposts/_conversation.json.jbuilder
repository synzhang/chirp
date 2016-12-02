json.isReply micropost.statements.any?
if !lazyload && micropost.statements.any?
  json.statements do
    json.partial! 'microposts/micropost.json', collection: micropost.statements, as: :micropost
  end
end
json.micropost do
  json.conversationUsers micropost.conversation_users(current_user)
  json.partial! 'microposts/micropost.json', micropost: micropost
end
if !lazyload && micropost.replies.any?
  json.replies do
    json.partial! 'microposts/micropost.json', collection: micropost.replies, as: :micropost
  end
end
