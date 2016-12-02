json.isRepost micropost.origin_id?
if micropost.origin_id?
  json.repostUserUrl user_url micropost.user
  json.repostUsername micropost.user.username

  micropost = micropost.origin
end
json.id micropost.id
json.userId micropost.user.id
json.username micropost.user.username
json.userUrl user_url micropost.user
json.nickname micropost.user.name
json.avatar gravatar_url micropost.user, size: 50
json.url user_micropost_url micropost.user, micropost
json.timestamp micropost.created_at.strftime("%Y-%m-%d %H:%M:%S")
json.content micropost.content
json.canDelete micropost.user == current_user
