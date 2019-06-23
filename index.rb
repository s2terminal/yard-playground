require 'sinatra'
require 'sinatra/reloader' if development?

require 'yard'

get '/yard-push' do
  File.write('./tmp/index.rb', params['ruby'])
  YARD::CLI::Yardoc.run(['./tmp/index.rb'])
  params['ruby'] + "が渡されました。戻ってみてね"
end

get '/yard' do
  s = "empty"
  File.open('doc/top-level-namespace.html') do |file|
    s = file.read
  end
  s
end
