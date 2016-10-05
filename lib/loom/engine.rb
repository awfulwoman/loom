module Loom
  class Engine < Rails::Engine

    initializer 'Loom.assets.precompile' do |app|
      app.config.assets.paths << root.join('assets').to_s
    end

  end
end
