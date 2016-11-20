angular.module('bookme')
.factory('EtheriumService', function () {
    function EtheriumConnection(host) {
        var self = this;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider(host));
        }

        self.setDefaultAccount = function(account, password) {
            web3.eth.defaultAccount = account;
            web3.personal.unlockAccount(web3.eth.defaultAccount, password);
        };

        self.getAccounts = function() {
            return web3.eth.accounts;
        }

    }

    var etheriumConnection = null;
    return {
        getConnection: function(host) {
            if (etheriumConnection === null) {
                etheriumConnection = new EtheriumConnection(host);
            }
            return etheriumConnection;
        }
    };
});