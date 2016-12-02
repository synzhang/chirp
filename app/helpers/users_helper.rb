module UsersHelper
  def gravatar_url(user, options = {size: 80})
    size = options[:size]
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
  end

  def gravatar_for(user, options = {size: 80})
    image_tag gravatar_url(user, options), alt: user.name, class: "gravatar", size: options[:size].to_s
  end
end
