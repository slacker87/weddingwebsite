class StaticPagesController < ApplicationController
  include Getimages
  
  def home
  end

  def help
  end

  def venue
  end

  def date
  end

  def menu
  end
  
  def photos
    @PAGE = "https://drive.google.com/folderview?id=0B68PQDtw30drdDZLSGNYd3ZlNmM"
    imageurl = Getimages.getimagelist(@PAGE)
    imageurlpreview = Getimages.getimagelistpreview(@PAGE)
    @imagefinal = imageurl.zip(imageurlpreview)
  end
end
