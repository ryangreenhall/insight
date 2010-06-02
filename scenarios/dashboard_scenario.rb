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

    it "should provide a warning when a server is dead" do
        home = navigate_to_home
        dashboard = home.navigate_to_dashboard "Prod"
        dashboard.server_is_dead?.should eql true
    end

    def navigate_to_home
        homepage = HomePage.new
        homepage.load
        return homepage
    end
end