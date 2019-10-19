const nacl = require('libsodium-wrappers');
let myKey;


exports.setKey = async function(key)
{
    myKey = key;
}

exports.decrypt = async function(ciphertext, nonce)
{
    if (myKey == null){
        throw 'no key';
	}
	await nacl.ready;
    return nacl.crypto_secretbox_open_easy(ciphertext, nonce, myKey);
}