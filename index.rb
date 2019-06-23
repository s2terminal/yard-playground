require 'sinatra'
require 'sinatra/reloader' if development?

get '/' do
  s = 'Hello world!'
end
