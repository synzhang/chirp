class MicropostsController < ApplicationController
  before_action :logged_in_user, only: [:create, :destroy]
  before_action :correct_user,   only: [:destroy]
  before_action :find_micropost, only: [:show, :reply, :repost]

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
