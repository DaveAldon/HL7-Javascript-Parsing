# HL7-Javascript-Parsing
Making HL7 look pretty and more organized using jQuery and nothing else.

## Instructions
Place the js file in your directory and link to it:
```HTML
<script type="text/javascript" src="js/hl7.js"></script>
```

Then once you have your raw HL7, pass the string and the element id you want the result placed inside to the function like this:
```javascript
var hl7 = "MSH|^~\&|SENDING_APPLICATION|SENDING_FACILITY|RECEIVING_APPLICATION|RECEIVING_FACILITY|20110613061611||SIU^S12|24916560|P|2.3||||||"

parseHL7(hl7, '#elementid')
```

And you'll have an interactive table that breaks down your HL7 into something human readable.

## Limitations
Many common HL7 categories are supported, but some are not. They will be added as the needs arises.

## Development
You're responsible for the styling of the resulting table, and for the HL7 being properly formatted. HL7 is just a pattern, so if anything is off slightly it simply won't be predictable.
