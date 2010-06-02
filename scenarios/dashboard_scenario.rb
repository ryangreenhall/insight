require "rubygems"
require "celerity"
require "spec"

require "./scenarios/pages/homepage"
require "./scenarios/pages/dashboardpage"

describe "Dashboard" do

    it "Prod dashboard has Prod as the heading" do
        home = navigate_to_home
        dashboard = home.navigate_to_dashboard "Prod"
        dashboard.heading.should eql "Prod"
    end

    xit "should provide property names as headings" do
        home = navigate_to_home
        dashboard = home.navigate_to_dashboard "Prod"
        
        dashboard.property_headings.should eql []
    end

    def navigate_to_home
        homepage = HomePage.new
        homepage.load
        return homepage
    end
end