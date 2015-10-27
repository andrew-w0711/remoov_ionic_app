angular.module("starter.services", [])

.factory("Items", function($http) {

    var items;    
    return {
        all: function() {
            return items;
        },
        setItems: function(data){
            items = data;
        },
        get_item_by_barcode : function (barcode){
          for (var i = 0; i < items.length; i++) {
            var object = items[i];
            for(var j = 0 ; j < object.items.length ; j++){
              var item = object.items[j];
              if(item.barcode == barcode){
                return object.items[j];
                break;
              }
            } 
          }

          return null;
        },

        get_customer_id_by_barcode : function (barcode){
          for (var i = 0; i < items.length; i++) {
            var object = items[i];
            for(var j = 0 ; j < object.items.length ; j++){
              var item = object.items[j];
              if(item.barcode == barcode){
                return object.contract_id;
                break;
              }
            }
          }

          return null;
        },

        get: function(chatId) {
          for (var i = 0; i < items.length; i++) {
            if (items[i].contract_id === parseInt(chatId)) {
              return items[i];
            }
          }
          return null;
        }
    };
})

.factory("PhotoUrls",function(){
    
    var photourls = [];
    var photo_index = [];
    
    return {
        all_photourls: function(){
            return photourls;
        },
        
        all_photo_index : function(){
            return photo_index;
        },
        setPhotoData : function(data , index) {
            photourls = data;
            photo_index = index;
        },
        
    }
});
