class ApplicationJob < ActiveJob::Base
  include Rails.application.routes.url_helpers

  protected
  def default_url_options
    Rails.application.config.active_job.default_url_options
  end
end
