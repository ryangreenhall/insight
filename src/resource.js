insight.resource = function(url) {
    var that = {};
    that.get = function() {
        sys.puts("GET: " + url);
    };
    return that;
};