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