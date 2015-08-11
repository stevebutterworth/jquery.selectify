// jQuery Plugin TabSelect
// Originally by Fredi Bach
// fredibach.ch
// Updated by Steve Butterworth
// https://github.com/stevebutterworth/jquery.selectify

$.expr[':'].contains_exact = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().match("^" + arg + "$");
    };
});

(function($) {

    $.tabSelect = function(element, options) {

      var defaults = {
      activeClass: 'active',
      inactiveClass: 'inactive',
      elementType: 'span',
      tabElements: [],
      selectedTabs: [],
      formElement: undefined,
      multipleSelections: true,

      onChange: function() {}
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);

      if (plugin.settings.selectedTabs == 'all'){
        plugin.settings.selectedTabs = plugin.settings.tabElements;
      }

      if (plugin.settings.formElement != undefined){
        if ($(plugin.settings.formElement).is("select")){
          $(plugin.settings.formElement).find(':selected').each(function(i, selected){
            plugin.settings.selectedTabs[i] = $(selected).text();
          });
        } else {
          plugin.settings.selectedTabs = $(plugin.settings.formElement).val().split(',');
        }
      }

      var nilElement = $(plugin.settings.formElement).find("option[value='']");
      var nilTab;

      $.each(plugin.settings.tabElements, function(index, value){
        var tab = document.createElement('span');
        if (plugin.settings.selectedTabs.indexOf(value) == -1){
          $(tab).html(value).addClass(plugin.settings.inactiveClass);
        } else {
          $(tab).html(value).addClass(plugin.settings.activeClass);
        }
        if(value == ''){
          nilTab = $(tab);
          nilTab.hide();
        }
        $(tab).click(function(){
          if($(plugin.settings.formElement).attr("multiple") == "multiple"){
            if ($(this).hasClass(plugin.settings.activeClass)){
              $(this).removeClass(plugin.settings.activeClass).addClass(plugin.settings.inactiveClass);
            } else {
              $(this).removeClass(plugin.settings.inactiveClass).addClass(plugin.settings.activeClass);
            }
          }
          else if(nilElement.length != 0){
            var clicked_item = $(this)
            $.each($(element).find('span'), function(index, value){
              if($(value)[0] != clicked_item[0]){
                $(value).removeClass(plugin.settings.activeClass);
                $(value).addClass(plugin.settings.inactiveClass);
              }
            });
            clicked_item.toggleClass(plugin.settings.activeClass);
            clicked_item.toggleClass(plugin.settings.inactiveClass);
            if($(this).parent().find("." + plugin.settings.activeClass).length == 0){
              nilTab.removeClass(plugin.settings.inactiveClass).addClass(plugin.settings.activeClass);
            }
          }
          else{
            $.each($(element).find('span'), function(index, value){
              $(value).removeClass(plugin.settings.activeClass);
              $(value).addClass(plugin.settings.inactiveClass);
            });
            $(this).removeClass(plugin.settings.inactiveClass);
            $(this).addClass(plugin.settings.activeClass);
          }
          plugin.onChange();
        });
        $element.append(tab);
      });
        }

    plugin.onChange = function(){
      if (plugin.settings.formElement != undefined){
        var vals = $.map(plugin.getAllSelected(), function(val, i){
          return $(plugin.settings.formElement + " option:contains_exact('" + val + "')").attr('value');
        })
        var previous_value = $(plugin.settings.formElement).val()
        $(plugin.settings.formElement).val(vals);
        if(previous_value != vals){
          $(plugin.settings.formElement).trigger("change");
        }
      }
      plugin.settings.onChange(plugin.getAllSelected());
    }

    plugin.getAllSelected = function() {
      var values = [];
      $element.find(plugin.settings.elementType).each(function(){
        if ($(this).hasClass(plugin.settings.activeClass)){
          values.push($(this).html());
        }
      });
      return values;
    }

    plugin.selectAll = function() {
      var cnt = 0;
      $element.find(plugin.settings.elementType).each(function(){
        if ($(this).hasClass(plugin.settings.inactiveClass)){
          $(this).removeClass(plugin.settings.inactiveClass).addClass(plugin.settings.activeClass);
          cnt++;
        }
      });
      if (cnt > 0){
        plugin.onChange();
      }
        }

    plugin.deselectAll = function() {
      var cnt = 0;
      $element.find(plugin.settings.elementType).each(function(){
        if ($(this).hasClass(plugin.settings.activeClass)){
          $(this).removeClass(plugin.settings.activeClass).addClass(plugin.settings.inactiveClass);
          cnt++;
        }
      });
      if (cnt > 0){
        plugin.onChange();
      }
        }

        plugin.init();

    }

    $.fn.tabSelect = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('tabSelect')) {
                var plugin = new $.tabSelect(this, options);
                $(this).data('tabSelect', plugin);
            }
        });

    }

})(jQuery);

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(obj, start) {
       for (var i = (start || 0), j = this.length; i < j; i++) {
           if (this[i] === obj) { return i; }
       }
       return -1;
  }
}

jQuery(document).ready(function($) {
  $.fn.selectify = function(){
    return this.each(function() {
      var $this = $(this);
      var options = $this.find("option").map(function(){ return $(this).text(); });
      var tabs_id = "tab_selectify_" + $this.attr('id');
      $this.after("<div class='select_tabs' id='"+ tabs_id +"'></div>");
      $this.hide();
      $("#" + tabs_id).tabSelect({
        formElement: "#" + $this.attr('id'),
        tabElements: options
      });
    });
  }
})
