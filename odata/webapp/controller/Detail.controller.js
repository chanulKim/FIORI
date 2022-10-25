sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
  ],
  function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("odata.controller.Detail", {
      onInit: function () {},

      onPress: function () {
        //메모 저장 기능

        var oViewModel = this.getView().getModel("app");

        var vPlant = oViewModel.oData.detail.Plant;
        var vRoomid = oViewModel.oData.detail.Roomid;
        var vCondx = oViewModel.oData.detail.Condx; // 방상태
        var vNote = oViewModel.oData.detail.Note; // 노트
        var oDataModel = this.getView().getModel();

        var oData = {
          Plant: vPlant,
          Roomid: vRoomid,
          Condx: vCondx,
          Note: vNote,
        };

        var sPath =
          "/RoomstatusSet(Plant='" + vPlant + "',Roomid='" + vRoomid + "')";

        oDataModel.update(sPath, oData, {
          success: function () {
            MessageToast.show("특이사항 접수 및 방 상태변경 완료.");
          },
        });
      },
    });
  }
);
