const nacl = require('libsodium-wrappers');
let myVerifyingKey;

(async() => {
    await nacl.ready;
    myVerifyingKey = nacl.crypto_sign_keypair();
})();

exports.verifyingKey = async function(){
	await nacl.ready;
    return myVerifyingKey.publicKey;
}

exports.sign = async function(msg){
	await nacl.ready;
    return nacl.crypto_sign(msg, myVerifyingKey.privateKey);
}


