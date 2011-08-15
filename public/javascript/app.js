function refresh() {
    location.reload(true);
};

var refreshEvery60Seconds = function() {
    var sixtySecondsAsMillis = 60*1000;
    setInterval("refresh()", sixtySecondsAsMillis);
};

/* Master Init Function */

function initJS(){
  refreshEvery60Seconds();
}