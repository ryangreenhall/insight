require "rubygems"
require "celerity"
require "spec"

describe "HomePage" do

    it "should list the environments" do
        browser = Celerity::Browser.new
        browser.goto("http://localhost:3000")

        links = browser.links

        environments = []
        links.each do |link|
           environments << link.text
        end

        environments.should eql ["Staging", "Showcase", "Prod"]
    end

end




