module Getimages

require 'net/http'
require 'nokogiri'
require 'open-uri'

  def self.getimagelist(url)
    @urllist = []
    doc = Nokogiri::HTML(open(url))
    doc.xpath('//img').each do |img|
      if img['src'].include?("gstatic.com/docs/doclist") == false and img['src'].include?("www.google.com/images") == false
        @urllist << img['src'].chomp('=s190')
      end
    end
  return @urllist
  end
  
  def self.getimagelistpreview(url)
    @urllistpreview = []
    doc = Nokogiri::HTML(open(url))
    doc.xpath('//img').each do |img|
      if img['src'].include?("gstatic.com/docs/doclist") == false and img['src'].include?("www.google.com/images") == false
        @urllistpreview << img['src']
      end
    end
    return @urllistpreview
  end
  
end