require "rubygems"
require "celerity"
require "spec"

describe "HomePage" do

    it "should list the environments" do
        homepage = HomePage.new
        homepage.load
        homepage.get_environments.should eql ["Staging", "Showcase", "Prod"]
    end

    class HomePage 

        def initialize
            @browser = Celerity::Browser.new
        end

        def load
            @browser.goto("http://localhost:3000")
        end

        def get_environments
            links = @browser.links

            environments = []
            links.each do |link|
               environments << link.text
            end
            return environments
        end
    end
end

