const nacl = require('libsodium-wrappers');
let rx;
let tx;
let clientPrivateKey;
let serverPublicKey;
let clientPublicKey;

exports.setClientPublicKey = async function(key){
  await nacl.ready;
  if (clientPublicKey == key)
        return;

    if ((clientPublicKey != null) && (clientPublicKey != key))
        throw 'client public key already set';

    clientPublicKey = key;

    const keypair = nacl.crypto_kx_keypair();
    clientPrivateKey = keypair.privateKey;
    serverPublicKey = keypair.publicKey;

    sharedKeys = nacl.crypto_kx_server_session_keys(serverPublicKey,clientPrivateKey,key);  
    
    rx = sharedKeys.sharedRx;
    tx = sharedKeys.sharedTx;
}
exports.serverPublicKey = async function(){
	await nacl.ready;
	
	return serverPublicKey;

}
exports.decrypt = async function (ciphertext, nonce){
    await nacl.ready;
	
    return  nacl.crypto_secretbox_open_easy(ciphertext,nonce,rx);
}
exports.encrypt = async function(msg){
	await nacl.ready;

	nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES)
	ciphertext = nacl.crypto_secretbox_easy(msg, nonce, tx)

    return { ciphertext, nonce }
}