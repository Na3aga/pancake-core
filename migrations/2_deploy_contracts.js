const Factory = artifacts.require("PancakeFactory.sol");

const Token1 = artifacts.require("Token1.sol");
const Token2 = artifacts.require("Token2.sol");


module.exports = async function (deployer, network, addresses) {
    await deployer.deploy(Factory, addresses[0]);
    const factory = await Factory.deployed();

    let token1Adress, token2Adress;
    if (network == 'mainnet'){
        // token1Adress = '';
        // token2Adress = '';
        await deployer.deploy(Token1);
        await deployer.deploy(Token2);
        const token1 = await Token1.deployed();
        const token2 = await Token2.deployed();
        token1Adress = token1.address;
        token2Adress = token2.address;
        
    } else {
        await deployer.deploy(Token1);
        await deployer.deploy(Token2);
    const token1 = await Token1.deployed();
    const token2 = await Token2.deployed();
    token1Adress = token1.address;
    token2Adress = token2.address;
    }
    await factory.createPair(token1Adress, token2Adress);
};

