Insight
=======

Provides a dashboard that collates information from multiple deployed web application nodes into a single
view.

Insight relies on web applications exposing their configuration properties as a resource providing a JSON respresentation
as defined:

    {
            [
                {
                    name:name,
                    value:value,
                    type:integration-point|property|event,
                    healthy:true|false
                 },
                 ...
            ]
    }


Example
-------

A request to http://mywebapp:8080/internal/status.json

could responds with:

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






