class Micropost < ActiveRecord::Base
  belongs_to :user
  has_many :reposts, class_name: 'Micropost', foreign_key: 'origin_id'
  belongs_to :origin, class_name: 'Micropost'
  default_scope -> { order(created_at: :desc) }
  mount_uploader :picture, PictureUploader
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 140 }, if: 'origin_id.nil?'
  validate :picture_size

  def repost(user)
    @micropost = user.microposts.build({origin_id: self.id})
    @micropost.save
  end

  private

    def picture_size
      if picture.size > 5.megabytes
        errors.add(:picture, "should be less than 5MB")
      end
    end
end
