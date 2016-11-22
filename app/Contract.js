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
    address importerBank;
    address trucker;
    address portAuthority;
    address customs;
    address exporterBank;
    address parentBlock;

    function ShipperContract(string _name, 
            string _supplierName,
            string _value,
            string _bank,
            address _trucker,
            address _portAuthority,
            address _customs,
            address _exporterBank,
            address _importerBank,
            address _parentBlock) public {
        name = _name;
        supplierName = _supplierName;
        value = _value;
        bank = _bank;
        trucker = _trucker;
        customs = _customs;
        exporterBank = _exporterBank;
        importerBank = _importerBank;
        parentBlock = _parentBlock;
    }

    function set

    function greet() constant returns (string) {
        return greeting;
    }
}
*/
    });

    return contractString;
});