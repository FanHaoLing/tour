'use strict';

/**
 * @ngdoc function
 * @name wechatApp.controller:TopayCtrl
 * @description
 * # TopayCtrl
 * Controller of the wechatApp
 */
angular.module('wechatApp')
    .controller('TopayCtrl', ['$scope', 'config', 'invitation', '$stateParams', '$state','jssdk', function($scope, config, invitation, $stateParams, $state, jssdk) {
        var bedIdIndex = $stateParams.bedIdIndex;

        // 选中床位的id
        var bedId = bedIdIndex.bedId;
        // 选中床位的钱数
        var money = bedIdIndex.money;

        // 用factory传过来当前的邀约
        var Invite = invitation.getCacheInvitation();
        $scope.invitation = Invite;

        // 绑定钱和床位id
        $scope.money = money;
        $scope.bedId = bedId;
        // 预定时间
        $scope.orderTime = new Date();


        // 去支付并跳转到支付成功页面
        $scope.paySubmit = function() {
        	var postData = {
        		customerId: $scope.customer.id,
        		openid: $scope.customer.openid,
        		bedId: bedId,
        		invitationId: Invite.id,
        	};
        	// 去支付
        	jssdk.getPayParams(postData, 0).then(function successCallBack(response) {
                console.log(response);
                // 调用微信支付接口去支付
                jssdk.toPay(response);
            }, function errorCallBack() {

            });
            // 调到支付成功页面
            //$state.go('paysuccess');
        };
    }]);
