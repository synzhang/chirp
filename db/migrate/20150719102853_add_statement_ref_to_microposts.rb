class AddStatementRefToMicroposts < ActiveRecord::Migration
  def change
    add_reference :microposts, :statement, index: true
    add_foreign_key :microposts, :statements
  end
end
