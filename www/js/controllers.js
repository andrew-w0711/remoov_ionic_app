angular.module('starter.controllers', [ ])

.controller('DashCtrl', function($scope ,$http, Items) {
    
    $scope.isLoading = true;
    
    $http.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
    
    var params = { 
        "access_token": "edTRVehOeKyzAktamszKZtJyQRKEIpHfDTSwaqPoqGeFnrxuPT",
        "execute": "get_contracts",
        "params": { "search_string": "Chris" }
    };
    
    $http({
        url: 'http://remoov-staging.herokuapp.com/api/',
        method: "POST",
        data: { 'request' : params }
    })
    .then(function(response) {
        $scope.isLoading = false;
        $scope.customers = response.data.response;
        Items.setItems(response.data.response);
    })
    .catch(function(response) {
        $scope.isLoading = false;
        alert("Please check your network connection and try again ! ");
    });
    
    $scope.SaveCustomerInfo = function(id){
        localStorage.setItem('customerId' , id);
    }
})

.controller('CagetoryCtrl' , function ($scope) {
  $scope.SaveCategoryId = function(id) {
    localStorage.setItem("category_id" , id);
  }
  $scope.calPastUrl = function(){
    $scope.customer_id = localStorage.getItem("customerId");  
  }
})

.controller('ItemPageCtrl' , function($scope , $ionicPopup, $stateParams , Items, $http){
    
    $scope.items = Items.get($stateParams.itemId);
    var object = $scope.items.items;
    $scope.processing = false;
    
    $scope.remove_item = function(item){
        var myPopup = $ionicPopup.show({
          title: 'Remove this item ?',
          scope: $scope,
          buttons: [
           { text: 'No' },
           {
             text: '<b>Yes</b>',
             type: 'button-assertive',
             onTap: function(e) {
                $scope.processing = true;
                var barcode = item.barcode;
                var params = { 
                    "access_token": "edTRVehOeKyzAktamszKZtJyQRKEIpHfDTSwaqPoqGeFnrxuPT",
                    "execute": "destroy_item",
                    "params": { "barcode": barcode }
                };

                $http({
                    url: 'http://remoov-staging.herokuapp.com/api/',
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    data: { "request" : params }
                })
                .then(function(response) {
                    $scope.processing = false;
                    object.splice(object.indexOf(item),1);
                    alert("Removed Successfully");
                })
                .catch(function(response) {
                    $scope.processing = false;
                    alert(response.data.message);
                });
             }
           },
          ]
        });
    }
})

.controller('ItemViewCtrl' , function($scope , $stateParams , Items){
    $scope.information = Items.get_item_by_barcode($stateParams.barcode);
    $scope.customer_id = Items.get_customer_id_by_barcode($stateParams.barcode);
})

.controller('BarcodeCtrl', function($scope , $cordovaBarcodeScanner) {

    $scope.calcuatePathagain = function() {
      var category_id = parseInt(localStorage.getItem("category_id"));

      switch (category_id) {
        case 0:
          $scope.nextpage = "#/remoov/furniture";
          break;
        case 1:
          $scope.nextpage = "#/remoov/painting";
          break;
        case 2:
          $scope.nextpage = "#/remoov/electronic";
          break;
        case 3:
          $scope.nextpage = "#/remoov/wearable";
          break;
        case 4:
          $scope.nextpage = "#/remoov/appliance";
          break;
        default:
          $scope.nextpage = "#/remoov/other";
          break;
      }
    };
 
    localStorage.setItem("Barcode","");
    var barcode = "";
    var scanned = false;

    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            barcode = imageData.text;
            if(barcode == "") {
                alert("Please Scan Barcode again");
            } else {
                $scope.barcode_text = imageData.text;
                scanned = true;
                alert("Barcode = " + imageData.text);
            }
            localStorage.setItem("Barcode",barcode);
        });
    };

    $scope.SaveBarcode = function(){
        $scope.calcuatePathagain();

        if(scanned == false) {
          barcode = document.getElementById("barcode_text").value;
          localStorage.setItem("Barcode",barcode);
        }

        barcode = localStorage.getItem("Barcode");
        if(barcode == ""){
          alert("You must scan barcode automatically or input manuallly.");
          $scope.nextpage = "javascript: void(0)";
        }
    };
})

.controller('FurnitureCtrl' , function ($scope, PhotoUrls, $window) {

    $scope.barcode = localStorage.getItem("Barcode");
    
    $scope.photourls = PhotoUrls.all_photourls();
    $scope.photo_index = PhotoUrls.all_photo_index();
    $scope.check_existance = function() {
//        var index = parseInt(pos);
//        var existance = false;
//        if($scope.photo_index){
//            for(var i = 0 ; i < $scope.photo_index.length ; i++){
//                if($scope.photo_index[i] == index) {
//                    existance = true;
//                    break;
//                }
//            }
//        }
//        return existance;
    };
    $scope.check_existance();
})

.controller('PaintingCtrl' , function ($scope) {})

.controller('ElectronicCtrl' , function ($scope) {})

.controller('WearableCtrl' , function ($scope) {})

.controller('ApplianceCtrl' , function ($scope) {})

.controller('OtherCategoryCtrl' , function ($scope) {})

.controller('PhotoGalleryCtrl', function($scope , $ionicPopup, $cordovaCamera, $cordovaFile, PhotoUrls){
    
    var imagearray = [];
  
    var indexingarray = [];
    
    jQuery(".selection_button").on('click',function(){
        jQuery(".selection_button").removeClass("selected_button");
        jQuery(this).addClass("selected_button");
    });

    $scope.barcode = localStorage.getItem("Barcode");

    $scope.imgURL = "./img/150x150.png";
    
    function onImageSuccess(fileURI) {
        createFileEntry(fileURI);
    }

    function createFileEntry(fileURI) {
        window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
    }

    // 5
    function copyFile(fileEntry) {
     var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
     var newName = makeid() + name;

     window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
         fileEntry.copyTo(fileSystem2,newName,onCopySuccess,fail);
     },fail);
    }

    // 6
    function onCopySuccess(entry) {
        $scope.$apply(function () {
            var index = parseInt(jQuery(".selected_button").attr("value"));
            var existed = false;
            var existed_id = 0;
            for( var i = 0 ; i < indexingarray.length ; i++){
                if(indexingarray[i] == index){
                    existed = true;
                    existed_id = i;
                    break;
                }
            }
            
            if(existed == false) {
                indexingarray.push(index);
                imagearray.push(entry.nativeURL);
            } else {
                imagearray[existed_id] = entry.nativeURL;
            }
        });
    }

    function fail(error) {
        console.log("fail: " + error.code);
    }

    function makeid() {
     var text = "";
     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

     for (var i=0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
     }
     return text;
    }
    
    $scope.takePhoto = function () {
      
        var options = {
            quality: 100,
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 150,
            targetHeight: 150,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
                        
            var myPopup = $ionicPopup.show({
              template: '<img class="full-image" src="' + imageData + '">',
              title: 'Use this picture?',
              scope: $scope,
              buttons: [
               { text: 'No' },
               {
                 text: '<b>Yes</b>',
                 type: 'button-positive',
                 onTap: function(e) {
                     $scope.imgURL = imageData;
                     onImageSuccess(imageData);
                 }
               },
              ]
            });
        }, function (err) {
            alert(err);
        });
    };
    
  $scope.show_image = function(index1){
      
      var index = parseInt(index1);
      var imageName;
      for( var i = 0 ; i < indexingarray.length; i++){
          if(indexingarray[i] == index){
              imageName = imagearray[i];
              break;
          } else {
              imageName = "";
          }
      }
      
      if(imageName) {
          var name = imageName.substr(imageName.lastIndexOf('/') + 1);
          var trueOrigin = cordova.file.dataDirectory + name;
          $scope.imgURL = trueOrigin;
      } else {
          $scope.imgURL = "./img/150x150.png";
      }
  };
    
  $scope.SaveImageUrls = function(){
      PhotoUrls.setPhotoData(imagearray, indexingarray);
  };
});
