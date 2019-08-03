class ApplicationJob < ActiveJob::Base
  include Rails.application.routes.url_helpers

  protected
  def default_url_options
    Rails.configuration.x.application_job.default_url_options
  end
end
