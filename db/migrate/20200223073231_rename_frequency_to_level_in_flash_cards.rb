class RenameFrequencyToLevelInFlashCards < ActiveRecord::Migration[6.0]
  def change
    rename_column :flash_cards, :frequency, :level
  end
end
