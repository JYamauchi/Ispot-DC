class CreateMaps < ActiveRecord::Migration
  def change
    create_table :maps do |t|
    	t.string :text
    	t.string :place_name
    	t.string :address
    	t.string :center
    	t.string :context
    end
  end
end
