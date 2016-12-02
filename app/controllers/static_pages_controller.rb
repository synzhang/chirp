class StaticPagesController < ApplicationController
  def home
    if logged_in?
      @feed_items = current_user.feed.paginate(page: params[:page])
      @latest_pull_time = DateTime.now
    end
  end

  def help
  end

  def about
  end

  def contact
  end
end
