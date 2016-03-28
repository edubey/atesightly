<%@include file="/libs/granite/ui/global.jsp" %><%
%><%@page session="false"
          import="com.adobe.granite.ui.components.AttrBuilder,
                  com.adobe.granite.ui.components.Config,
                  com.adobe.granite.ui.components.Field,
                  com.adobe.granite.ui.components.Tag" %>
                      <%
	Config cfg = cmp.getConfig();
    ValueMap vm = (ValueMap) request.getAttribute(Field.class.getName());
    Field field = new Field(cfg);

    boolean isMixed = field.isMixed(cmp.getValue());
    
    String name = cfg.get("name", String.class);


    Tag tag = cmp.consumeTag();
    AttrBuilder attrs = tag.getAttrs();

    attrs.add("id", cfg.get("id", String.class));
    attrs.addClass(cfg.get("class", String.class));
    attrs.addRel(cfg.get("rel", String.class));
    attrs.add("title", i18n.getVar(cfg.get("title", String.class)));

    attrs.addClass("coral-InputGroup");
    attrs.add("value", cfg.get("value", String.class)); 

    // Use JCR standard date format for storage
    // FIXME data-stored-format is a bad name; use data-value-format
    if (isMixed) {
        attrs.addClass("foundation-field-mixed");
    }
    
    attrs.addOthers(cfg.getProperties(), "id", "class", "rel", "title", "name", "value", "emptyText", "type", "displayedFormat", "minDate", "maxDate", "displayTimezoneMessage", "fieldLabel", "fieldDescription", "renderReadOnly", "ignoreData");
    

    AttrBuilder attrsInput = new AttrBuilder(request, xssAPI);
    attrsInput.addClass("coral-InputGroup-input coral-Textfield");
    attrsInput.add("name", name);

    attrsInput.addDisabled(cfg.get("disabled", false));
    attrsInput.add("type", cfg.get("type", "text"));

    if (isMixed) {
        attrsInput.add("placeholder", i18n.get("<Mixed Entries>")); 
    } else {
        attrsInput.add("value", vm.get("value", String.class));
        log.info("Current value:" + vm.get("value", String.class)+":");
        attrsInput.add("placeholder", i18n.getVar(cfg.get("emptyText", String.class)));
    }

    if (cfg.get("required", false)) {
        attrsInput.add("aria-required", true);
    }

    AttrBuilder typeAttrs = new AttrBuilder(request, xssAPI);
    typeAttrs.add("type", "hidden");
    typeAttrs.add("value", "Color");
    if (name != null && name.trim().length() > 0) {
        typeAttrs.add("name", name + "@TypeHint");
    }

%><div <%= attrs.build() %>>
    <input id="mycolor" <%= attrsInput.build() %>>
    <div class="coral-InputGroup-button">
        <button data-toggle="popover" data-target="#colorpicker" class="coral-Button coral-Button--square" id="customColorButton" type="button" title="<%= xssAPI.encodeForHTMLAttr(i18n.get("Color Picker")) %>">
            <i class="coral-Icon coral-Icon--sizeS coral-Icon coral-Icon--colorPalette"></i>
        </button>
    </div>
</div>


<div  id="colorpicker" class="coral-Popover"></div>
<script type="text/javascript">

  $(document).ready(function() {

    $('#colorpicker').farbtastic('#mycolor');
      $("#customColorButton").click(function(){

     $('#colorpicker').toggle();
          var x = $("#mycolor").val();
          if(x.length==0) {
                   $("#mycolor").val("#000000");
          }

});

  });

</script>