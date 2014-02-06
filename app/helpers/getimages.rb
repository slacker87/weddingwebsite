module Getimages

require 'net/http'
require 'nokogiri'
require 'open-uri'

  def self.getimagelist(url)
    @urllist = []
    doc = Nokogiri::HTML(open(url))
    doc.xpath('//img').each do |img|
      @urllist << img['src'][0..-6]
    end
  return @urllist
  end
  
  def self.getimagelistpreview(url)
    @urllistpreview = []
    doc = Nokogiri::HTML(open(url))
    doc.xpath('//img').each do |img|
      @urllistpreview << img['src']
    end
    return @urllistpreview
  end
  
end