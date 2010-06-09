class HomePage

    def initialize
        @browser = Celerity::Browser.new
    end

    def load
        @browser.goto("http://localhost:3000")
    end

    def navigate_to_dashboard(environment)
        dashboardLink = @browser.link(:text, environment)
        @browser.goto "http://localhost:3000" + dashboardLink.href
        return DashBoardPage.new(@browser)
    end

    def environments
        links = @browser.links

        environments = []
        links.each do |link|
           environments << link.text
        end
        return environments
    end
end