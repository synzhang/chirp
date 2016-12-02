class MicropostsController < ApplicationController
  before_action :logged_in_user, only: [:create, :destroy]
  before_action :correct_user,   only: [:destroy]
  before_action :find_micropost, only: [:show, :statements, :reply, :replies, :repost, :reposts]

  def create
    @micropost = current_user.microposts.build(micropost_params)

    respond_to do |format|
      if @micropost.save
        format.html {
          flash[:success] = "Micropost created!"
          redirect_to root_url
        }
        format.json { render json: @micropost, status: :created }
      else
        format.html {
          @feed_items = []
          render 'static_pages/home'
        }
        format.json { render json: @micropost.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json
    end
  end

  def destroy
    @micropost.destroy
    flash[:success] = "Micropost deleted"
    redirect_to request.referrer || root_url
  end

  def timeline
    method = params[:method] || 'load'
    locals = {}

    case params[:type]
    when :feed
      case method
      when 'pull'
        @collection = current_user.feed(later_than: params[:latest_pull_time])
      when 'load'
        @collection = current_user.feed.paginate(page: params[:page])
      end
    when :user
      microposts = User.find_by(id: params[:user_id]).microposts
      case method
      when 'pull'
        @collection = microposts.where('created_at > :later_than', later_than: DateTime.parse(params[:latest_pull_time]))
      when 'load'
        @collection = microposts.paginate(page: params[:page])
      end
    end

    locals.merge!(conversations: @collection)
    locals.merge!(latest_pull_time: DateTime.now) if method == 'pull'

    respond_to do |format|
      format.json { render template: 'microposts/conversations', locals: locals }
    end
  end

  def statements
    @statements = @micropost.statements
    respond_to do |format|
      format.json
    end
  end

  def reply
    respond_to do |format|
      @reply = @micropost.reply(current_user, params[:micropost][:content])
      if @reply.present?
        format.json
      else
        format.json { render json: @reply.errors, status: :unprocessable_entity }
      end
    end
  end

  def replies
    respond_to do |format|
      @replies = @micropost.replies.reverse
      format.json
    end
  end

  def repost
    respond_to do |format|
      if @micropost.repost(current_user)
        format.json { head :no_content }
      else
        format.json { render json: @micropost.errors, status: :unprocessable_entity }
      end
    end
  end

  def reposts
  end

  private

    def micropost_params
      params.require(:micropost).permit(:content, :picture, :user_id, :id)
    end

    def correct_user
      @micropost = current_user.microposts.find_by(id: params[:id])
      redirect_to root_url if @micropost.nil?
    end

    def find_micropost
      @micropost = Micropost.find(params[:id])
    end
end
