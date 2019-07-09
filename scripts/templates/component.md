---
title:  "<%= displayName%>"
---
# <%= displayName%>

> <%= description ? description : displayName + ' component'%>

|Name           |Type     |Description
|:--------------|:--------|:----------
<%
if (props) {
    for(let propName of Object.keys(props)) {
        var prop = props[propName];
        var propType = ('type' in prop) ? 'type' : 't';
        var propDesc = ('description' in prop) ? prop.description : 'd';

-%>
|`<%= propName%>`|<%= propType%>|<%= propDesc%>
<% }
} -%>
