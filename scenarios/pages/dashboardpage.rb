class DashBoardPage

    def initialize(browser)
        @browser = browser
    end

    def heading
       heading = @browser.h1(:index, 1).text
       return heading
    end

    def property_headings
       th_elements = @browser.th(:xpath, "//th[@class='propertyName']")
       puts th_elements
       return th_elements 
    end

    def server_is_dead?
        dead_server = @browser.td(:class, "deadServer")
        return dead_server != nil
    end
end