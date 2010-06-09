require "rubygems"
require "celerity"
require "spec"

require "./scenarios/pages/homepage"

describe "HomePage" do

    it "should list the environments" do
        navigate(:to => :home).get_environments.should eql ["Staging", "Showcase", "Prod"]
    end

    def application_pages
        pages = Hash.new()
        pages[:home] = HomePage.new
        puts pages
        return pages
    end

    def navigate(where_to)
        page = application_pages()[where_to[:to]]
        page.load
        return page
    end
end




