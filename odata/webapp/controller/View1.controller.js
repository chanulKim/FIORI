sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/f/library",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator"
        
    ],
    function(Controller, JSONModel, library,  Filter, FilterOperator) {
      "use strict";
  
      return Controller.extend("odata.controller.View1", {
        onInit: function () {

          var oData = {
            oTableData : [],
            sSearchPlant : null,
            sSearchRoomid  : null,
            sSearchFloor : null
          }

          var oDataModel = new JSONModel(oData);
          this.getView().setModel(oDataModel, "Main");

        },

        
        onBeforeRendering: function() {
          var oModel = this.getView().getModel();
          var oViewModel = this.getView().getModel("Main")

          oModel.read("/RoomstatusSet" , {
            success: function(oModelData){
              var data = oModelData; 
              var aData = data.results;
              var oData = [];

              oData.push(aData);
              oViewModel.setProperty("/oTableData", aData);

            }
          })
        },

        onSearch: function() {
          var oViewModel = this.getView().getModel("Main");
          var sSearchPlant = oViewModel.getProperty("/sSearchPlant");
          var sSearchPono  = oViewModel.getProperty("/sSearchRoomid");
          var sSearchSeqno = oViewModel.getProperty("/sSearchFloor");

        
          var oTable = this.getView().byId("RoomTable"); 
          var oBinding = oTable.getBinding("items"); 

          var aFilter = [];

          
          if(sSearchPlant){
            var oFilter = new Filter ({
                path : 'Plant', 
                operator: FilterOperator.Contains,
                value1: sSearchPlant,
                caseSensitive : false
            });
            aFilter.push(oFilter)
          }

          if(sSearchPono){
            var oFilter = new Filter ({
                path : 'Floor', 
                operator: FilterOperator.Contains,
                value1: sSearchFloor,
                caseSensitive : false
            });
            aFilter.push(oFilter)
          }

          if(sSearchSeqno){
            var oFilter = new Filter ({
                path : 'Roomid', 
                operator: FilterOperator.Contains,
                value1: sSearchRoomid,
                caseSensitive : false
            });
            aFilter.push(oFilter)
          }

          oBinding.filter(aFilter);

        },

        onFilterChange: function () {
          this.onSearch();
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
  