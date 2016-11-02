module Loomcss
  class Engine < Rails::Engine

    initializer 'Loomcss.assets.precompile' do |app|
      app.config.assets.paths << root.join('assets').to_s
    end

  end
end
