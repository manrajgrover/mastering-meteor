angular.module('Whatsapp').controller('ChatDetailCtrl', ChatDetailCtrl);

function ChatDetailCtrl($scope, $stateParams, $ionicScrollDelegate, $timeout) {
    var chatId = $stateParams.chatId;
    $scope.chat = $scope.$meteorObject(Chats, chatId, false);
    let isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
    $scope.sendMessage = sendMessage;
    $scope.inputUp = inputUp;
    $scope.inputDown = inputDown;
    $scope.closeKeyboard = closeKeyboard;
    $scope.messages = $scope.$meteorCollection(function() {
        return Messages.find({
            chatId: chatId
        });
    }, false);
    $scope.data = {};
    $scope.sendMessage = sendMessage;
    ///
    function sendMessage() {
        if (_.isEmpty($scope.data.message)){
        	return;
        }
        Meteor.call('newMessage', {
            text: $scope.data.message,
            type: 'text',
            chatId: chatId
        });
        delete $scope.data.message;
    }

    function inputUp() {
        if (isIOS) {
            $scope.data.keyboardHeight = 216;
        }
        $timeout(function() {
            $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
        }, 300);
    }

    function inputDown() {
        if (isIOS) {
            $scope.data.keyboardHeight = 0;
        }
        $ionicScrollDelegate.$getByHandle('chatScroll').resize();
    }

    function closeKeyboard() {
        // cordova.plugins.Keyboard.close();
    }
}