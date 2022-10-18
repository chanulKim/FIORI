sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/f/library"
        
    ],
    function(Controller, library) {
      "use strict";
  
      return Controller.extend("odata.controller.View1", {
        onInit: function () {

        },

        onListItemPress: function() {
          var oFCL = this.getView()
                         .getParent()
                         .getParent();

          oFCL.setLayout(library.LayoutType.TwoColumnsMidExpanded);
        }
      });
    }
  );
  