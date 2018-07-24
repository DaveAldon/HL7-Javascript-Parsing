# HL7-Javascript-Parsing
Making HL7 look pretty and more organized using jQuery and nothing else.

## Instructions
Place the js file in your directory and link to it:
```HTML
<script type="text/javascript" src="js/hl7.js"></script>
```

Then add your table somewhere and make sure it has an id:
```HTML
<table id="content"></table>
```

Then once you have your raw HL7, pass the string and the element id you want the result placed inside to the function like this:
```javascript
var hl7 = "MSH|^~\&|SENDING_APPLICATION|SENDING_FACILITY|RECEIVING_APPLICATION|RECEIVING_FACILITY|20110613061611||SIU^S12|24916560|P|2.3||||||"

parseHL7(hl7, '#content')
```

And you'll have a table that breaks down your HL7 into something human readable.

## Limitations
Many common HL7 categories are supported, but some are not. They will be added as the need arises.

## Development
You can do some cool things once the HL7 is parsed out. For example, the demo included in this repo demonstrates how to make the table collapsible according to each HL7 header by adding this to your javascript:
```Javascript
$('#content').on('click', 'tr.header', function (e) {
  $(this).nextUntil('tr.header').css('display', function(i,v) {
      return this.style.display === 'table-row' ? 'none' : 'table-row';
  });
});
```

You're responsible for the styling of the resulting table, and for the HL7 being properly formatted. HL7 is just a pattern, so if anything is off slightly it simply won't be predictable.
