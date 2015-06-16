class AddOpenMyEmailToUsers < ActiveRecord::Migration
  def change
    add_column :users, :open_my_email, :boolean
  end
end
