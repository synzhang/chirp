class Micropost < ActiveRecord::Base
  belongs_to :user
  belongs_to :origin, class_name: 'Micropost'
  has_many :reposts, class_name: 'Micropost', foreign_key: 'origin_id', dependent: :destroy
  belongs_to :statement, class_name: 'Micropost'
  has_many :replies, class_name: 'Micropost', foreign_key: 'statement_id'

  mount_uploader :picture, PictureUploader

  validates :user_id, presence: true
  validates :content, presence: true, length: {maximum: 140}, if: 'origin_id.nil?'
  validate :picture_size

  default_scope -> { order(created_at: :desc) }

  def reply(user, content)
    @reply = user.microposts.build({content: content, statement_id: self.id})
    # @ someone
    if @reply.save
      @reply
    else
      nil
    end
  end

  def statements
    statements = Array.new
    reply = self

    while reply.statement.present?
      statements.push reply.statement
      reply = reply.statement
    end

    statements.reverse
  end

  def conversation_users(current_user)
    users = statements.map(&:user).map(&:username)

    users.push user.username
    if origin.present?
      users.push origin.user.username
    end
    if statements.present?
      users = users.uniq
      users.delete current_user.username if users.size > 1
    end

    users.map{ |user| '@' + user }.join(' ')
  end

  def repost(user)
    @repost = user.microposts.build({origin_id: self.id})
    @repost.save
  end

  private

    def picture_size
      if picture.size > 5.megabytes
        errors.add(:picture, "should be less than 5MB")
      end
    end
end
