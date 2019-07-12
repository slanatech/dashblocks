---
title:  "<%= name%>"
---
# <%= name%>

<%- description ? description : name + ' component'%>


### Properties

|Name           |Type     |Required|Default |Description
|:--------------|:--------|:-------|:-------|:----------
<%
for(let prop of props) {
-%>
|**<%- prop.name%>**|<%- prop.type%>|<%- prop.required%>|<%- prop.default%>|<%- prop.description%>
<% 
}
-%>

### Examples
<br/>
<br/>

<%
for(let example of examples) {
-%>

<<%- example.component%>></<%- example.component%>>

#### Code

```vue
<%- example.code%>
```
<% 
}
-%>
