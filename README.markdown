#Insight

Provides a dashboard that collates information from multiple deployed web application nodes into a single
view.  Insight relies on web applications exposing their configuration properties as a resource, which provides
status information as JSON.

## JSON format

Insight supports three types of properties:

*   Property - a simple configuration property;
*   Integration Point - a property that configures an external dependency;
*   Event - values that correspond to events that are of interest, e.g number of errors in the last hour.

###Example

A request to http://mywebapp:8080/internal/status.json

could respond with a collection of properties:

    {
        "properties": {
            "username" : {
                "value": "user",
                "type" : "property"
            },

            "end.point": {
                "value" : "http://end.point.i.need.to.talk.to",
                "type" : "integration"
            },

            "number.of.requests.in.last.hour": {
                "value": "1678",
                "type" : "event"
            }
        }
    }

##Configuration

Insight is configured as follows:

    {
        "environments": {
            "Staging": {
                "urls":["a", "b"]
            },
            "Showcase": {
                "urls":["c", "d"]
            },
            "Prod": {
                "urls":["e", "f"]
            }
        }
    }


## Getting Started

    1. clone git@github.com:ryangreenhall/insight.git
    2. config the app in config/config.json
    3. sh run
    4. Insight will be running on http://localhost:8000






