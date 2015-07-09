class AddOriginRefToMicroposts < ActiveRecord::Migration
  def change
    add_reference :microposts, :origin, index: true
    add_foreign_key :microposts, :origins
  end
end
