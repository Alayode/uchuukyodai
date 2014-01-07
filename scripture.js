/**
 * Created by crisam on 1/7/14.
 */
function UserForm($scope) {
    var master = {
        name: 'John Smith',
        address:{
            line1: '123 Main St.',
            city:'Anytown',
            state:'AA',
            zip:'12345'
        },
        contacts:[
            {type:'phone', value:'1(234) 555-1212'}
        ]
    };

    $scope.state = /^\w\w$/;
    $scope.zip = /^\d\d\d\d\d$/;

    $scope.cancel = function() {
        $scope.form = angular.copy(master);
    };

    $scope.save = function() {
        master = $scope.form;
        $scope.cancel();
    };

    $scope.addContact = function() {
        $scope.form.contacts.push({type:'', value:''});
    };

    $scope.removeContact = function(index) {
        $scope.form.contacts.splice(index, 1);
    };

    $scope.isCancelDisabled = function() {
        return angular.equals(master, $scope.form);
    };

    $scope.isSaveDisabled = function() {
        return $scope.myForm.$invalid || angular.equals(master, $scope.form);
    };

    $scope.cancel();
}