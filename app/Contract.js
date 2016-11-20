angular.module('bookme')
.factory('Contract', function () {
    var MultiString = function(f) {
        var stringCom = f.toString().split('\n').slice(1, -1).join('\n');
        stringCom = stringCom.replace("/*", "");
        stringCom = stringCom.replace("*/", "");
        return stringCom;
    }

    var contractString = MultiString(function() {
/*
pragma solidity ^0.4.0;

 contract mortal {
    
    address owner;

    function mortal() { owner = msg.sender; }

    function kill() { if (msg.sender == owner) selfdestruct(owner); }
}

contract ShipperContract is mortal {
    string name;
    string supplierName;
    string value;
    string bank;
    address trucker;
    address portAuthority;
    address customs;
    address parentBlock;

    function ShipperContract(string _name, 
            string _supplierName,
            string _value,
            string _bank,
            bool _trucker,
            bool _portAuthority,
            bool _customs,
            _parentBlock) public {
        name = _name;
        supplierName = _supplierName;
        value = _value;
        bank = _bank;
        trucker = _trucker;
        customs = _customs;
        parentBlock = _parentBlock;
    }

    function greet() constant returns (string) {
        return greeting;
    }
}
*/
    });

    return contractString;
});