class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.text :desc
      t.decimal :price, null: false
      
      t.timestamps
    end
  end
end
