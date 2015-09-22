class Map < ActiveRecord::Base
	
	# can also be an IP address
	geocoded_by :full_street_address
	# auto-fetch coordinates
	after_validation :geocode

	reverse_geocoded_by :latitude, :longitude
	# auto-fetch address
	after_validation :reverse_geocode
	
end