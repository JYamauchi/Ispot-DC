class MainController < ApplicationController
	
	skip_before_action :verify_authenticity_token
	# require 'httparty'

	def index

		
	end

	def search
		# client = Foursquare2::Client.new(:client_id => 'LPOOYCXSKAOSEK2BZASUA2UADOBTO0G02VOLYIU0IFMPP3VK', :client_secret => 'RATTW3V4NQHYBDDZYBOWY55NZTX44BT0PMHCHJPZ2BYQNQ0K')

		if params[:term]
    		parameters = { term: params[:term], limit: 16 }
    		# @venues = Foursquare.venues.search(:query => params[:term])
    		locale = { lang: 'en' }
    	end
    	render json: Yelp.client.search('Washington, DC', parameters)
  	end

end