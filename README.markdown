#Insight

Provides a dashboard that collates information from multiple deployed web application nodes into a single
view.  Insight relies on web applications exposing their configuration properties as a resource, which provides
status information as JSON.

## JSON format

Insight supports three types of properties:

*   Property - a simple configuration property;
*   Integration Point - a property that configures an external dependency;
*   Event - values that correspond to events that are of interest, e.g number of errors in the last hour.


        {
                [
                    {
                        name:name,
                        value:value,
                        type:integration-point|property|event,
                        healthy:true|false (optional)
                     },
                     ...
                ]
        }


##Example

A request to http://mywebapp:8080/internal/status.json

could respond with a collection of properties:

    {
            [
                {
                    name:username,
                    value:user,
                    type:property,
                },
                {
                    name:end.point
                    value:http://end.point.i.need.to.talk.to
                    type:integration
                    healthy:true
                },
                {
                    name:number.of.requests
                    value:1678,
                    type:event
                }

            ]
    }

##Configuration

Insight is configured as follows:

    {
        environments: [
            {
                    name:"Staging",
                    urls: ["http://staging.one", "http://staging.two"]
            },
            {
                    name:"Prod",
                    urls: ["http://prod.one", "http://prod.two"]
            },
            {
                    name:"Showcase",
                    urls: ["http://showcase.one", "http://showcase.two"]
            }
        ]
    }







