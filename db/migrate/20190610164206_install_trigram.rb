class InstallTrigram < ActiveRecord::Migration[5.0]
  def self.up
    ActiveRecord::Base.connection.execute("CREATE EXTENSION IF NOT EXISTS pg_trgm;")

    execute "CREATE INDEX trgm_items_name_indx ON items USING gist (name gist_trgm_ops);"
  end

  def self.down
  	execute "DROP INDEX IF EXISTS trgm_items_name_indx"
    ActiveRecord::Base.connection.execute("DROP EXTENSION pg_trgm;")
  end
end
