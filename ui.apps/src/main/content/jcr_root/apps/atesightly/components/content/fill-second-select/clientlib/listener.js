(function ($, $document) {
    "use strict";

    var LANGUAGE = "./language", COUNTRY = "./country";

    function adjustLayoutHeight(){
        //with only two selects, the second select drop down is not visible when expanded, so adjust the layout height
        //fixedcolumns i guess doesn't support css property height, so fallback to jquery
        //http://docs.adobe.com/docs/en/aem/6-0/develop/ref/granite-ui/api/jcr_root/libs/granite/ui/components/foundation/layouts/fixedcolumns/index.html
        $(".coral-FixedColumn-column").css("height", "20rem");
    }

    $document.on("dialog-ready", function() {
        adjustLayoutHeight();

        //http://docs.adobe.com/docs/en/aem/6-0/develop/ref/granite-ui/api/jcr_root/libs/granite/ui/components/foundation/form/select/index.html
       var language = $("[name='" + LANGUAGE +"']").closest(".coral-Select")

       var country = new CUI.Select({
            element: $("[name='" + COUNTRY +"']").closest(".coral-Select")
        });

        if(_.isEmpty(country) || _.isEmpty(language)){
            return;
        }

        var langCountries = {};

         //workaround to remove the options getting added twice, using CUI.Select()

        country._selectList.children().not("[role='option']").remove();
		console.log(country);
        function fillCountries(selectedLang, selectedCountry){
 		var x = $("[name='./country']").closest(".coral-Select").find('option').remove().end();

            console.log("s:"+selectedCountry);
            country._selectList.children().remove();
            console.log(langCountries);

            _.each(langCountries, function(value, lang){
                if( (lang.indexOf(selectedLang) !== 0) || (value.country == "*") ){
                    return;
                }

                var test2 = $("[name='./country']")[0];

         	$("<option>").appendTo(test2).val(lang).html(value.country);

            });

           country = new CUI.Select({
                element: $("[name='" + COUNTRY +"']").closest(".coral-Select")
            });


            if(!_.isEmpty(selectedCountry)){

               country.setValue(selectedCountry);

            }

        }

        //listener on language select for dynamically filling the countries on language select
        language.on('selected.select', function(event){
            console.log(event);
            fillCountries(event.selected);
        });

        //get the langs list
       $.getJSON("/libs/wcm/core/resources/languages.2.json").done(function(data){
            langCountries = data;

            var $form = country.$element.closest("form");

            //get the second select box (country) saved value
            $.getJSON($form.attr("action") + ".json").done(function(data){
                if(_.isEmpty(data)){
                    return;
                }

                fillCountries(language.val(), data.country);
            })
        });


    });
})($, $(document));