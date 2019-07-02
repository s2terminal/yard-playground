require 'sinatra'
require 'sinatra/reloader' if development?
require 'yard'
set :bind, '0.0.0.0' if development?

NEXT_HOST = 'http://localhost:3000'

post '/yard-push' do
  headers 'Access-Control-Allow-Origin' => NEXT_HOST, 'Access-Control-Allow-Methods' => ['POST']

  File.write('./tmp/index.rb', params[:ruby])
  YARD::CLI::Yardoc.run(['./tmp/index.rb'])
  params[:ruby] + "が渡されました。戻ってみてね"
end

get '/yard' do
  headers 'Access-Control-Allow-Origin' => NEXT_HOST, 'Access-Control-Allow-Methods' => ['GET']

  s = "empty"
  File.open('./doc/top-level-namespace.html') do |file|
    s = file.read
  end
  s
end
