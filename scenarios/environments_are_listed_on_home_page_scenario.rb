require "rubygems"
require "celerity"
require "spec"

require "./scenarios/pages/homepage"
require "./scenarios/pages/navigation"

describe "HomePage" do

    it "should list the environments" do
        navigate(:to => :home).environments.should eql ["Staging", "Showcase", "Prod"]
    end

end




