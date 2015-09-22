class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
    	t.text :name
    	t.integer :permit_id
    	t.text :address
    	t.decimal :latitude
    	t.decimal :longitude
    	t.text :yelp_id
    	
    	t.timestamps null: false
    end
  end
end
