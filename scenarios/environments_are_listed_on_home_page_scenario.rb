require "rubygems"
require "celerity"
require "spec"

require "./scenarios/pages/homepage"

describe "HomePage" do

    it "should list the environments" do
        homepage = HomePage.new
        homepage.load
        homepage.get_environments.should eql ["Staging", "Showcase", "Prod"]
    end
end

