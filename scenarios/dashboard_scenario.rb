require "rubygems"
require "celerity"
require "spec"

require "./scenarios/pages/homepage"
require "./scenarios/pages/dashboardpage"
require "./scenarios/pages/navigation"

describe "Dashboard" do

    it "Prod dashboard has Prod as the heading" do
        dashboard = navigate(:to => :home).navigate_to_dashboard "Prod"
        dashboard.heading.should eql "Prod"
    end

    it "Showcase dashboard has Showcase as the heading" do
        dashboard = navigate(:to => :home).navigate_to_dashboard "Showcase"
        dashboard.heading.should eql "Showcase"
    end

    it "Staging dashboard has Staging as the heading" do
        dashboard = navigate(:to => :home).navigate_to_dashboard "Staging"
        dashboard.heading.should eql "Staging"
    end

    it "should provide a warning when a server is dead" do
        dashboard = navigate(:to => :home).navigate_to_dashboard "Prod"
        dashboard.server_is_dead?.should eql true
    end
end