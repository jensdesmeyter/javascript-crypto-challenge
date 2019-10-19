const nacl = require('libsodium-wrappers');
let myVerifyingKey;

beforeAll(async() => {
    await nacl.ready;
    myVerifyingKey = nacl.crypto_sign_keypair();
});

exports.verifyingKey = async function(){
    return myVerifyingKey.publicKey;
}

exports.sign = async function(msg){
    return nacl.crypto_sign(msg, myVerifyingKey.privateKey);
}


