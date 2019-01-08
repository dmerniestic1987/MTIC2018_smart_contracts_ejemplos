var ZombiFactory = artifacts.require("./ZombiFactory.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ZombiFactory);
};
