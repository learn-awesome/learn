class CreateVouchers < ActiveRecord::Migration[5.2]
  def change
    create_table :vouchers, id: :uuid do |t|
        t.references :user, null: false
    	t.string  :code, null: false
    	t.integer :max_limit
    	t.string  :payment_ref
    	t.string  :domain
    	t.integer :price
    	t.integer :period_days
    	t.string  :internal_description
    	t.string  :status, null: false
    	t.timestamps
    end

    create_table :user_vouchers, id: :uuid do |t|
    	t.references :user, null: false
    	t.references :voucher, null: false
    	t.string     :status, null: false
    	t.date       :expires_at
    	t.timestamps
    end
  end
end
