"use server"
import { encrypt } from 'eth-sig-util';
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import QRCode from 'qrcode';
import { Wallet, ethers } from 'ethers';

const secretKeys = process.env.SECRET_KEY;
const storage = new ThirdwebStorage({
    secretKey: secretKeys,

});

async function datauritobuffer(datauri: string) {
    const response = await fetch(datauri);
    const blobs = await response.blob();
    const file = new File([blobs], "qr.png", { type: "image/png" });
    const files = Buffer.from(await file.arrayBuffer())
    return files;
}

export async function gettokenurl() {
    const wallet =new ethers.Wallet(process.env.PRIVATE_KEY as string);
    const details = {
        name: "prakash",
        dob: "04/08/2003"
    }
    const encrypted = await encrypts(details);
    const signature1=await wallet.signMessage(encrypted);
    const detailss = {
        name: "some",
        content: encrypted,
        signature:signature1
    }
    const detailsqr=await detailtoqr(detailss);
    const nftmetadata={
        name:"samplenft",
        description:"this is a testing nft",
        image:detailsqr
    }
    const nfturi=await uploadtoipfs(nftmetadata);
    
    return `https://ipfs.io/${nfturi.substring(7)}`;
}

export async function temporary(){
    const wallet=new Wallet(process.env.PRIVATE_KEY as string);
    const message="0x7624778dedc75f8b322b9fa1632a610d40b85e106c7d9bf0e743a9ce291b9c6f";

    const prefixedMessage = "\x19Ethereum Signed Message:\n" + message.length + message;
    
  const signature = await wallet.signMessage(ethers.utils.arrayify(ethers.utils.toUtf8Bytes(prefixedMessage)));
  const recoveredAddress = ethers.utils.verifyMessage(prefixedMessage, signature);
//   console.log(prefixedMessage);
// console.log(wallet.publicKey);
    console.log(signature);
    // console.log(recoveredAddress)
}
async function detailtoqr(details:object){
    const encryptedconturl = await uploadtoipfs(details);
    const datauri = await QRCode.toDataURL(encryptedconturl);
    const buffer = await datauritobuffer(datauri);
    const buffertoipfs = await uploadtoipfs(buffer);
    
    return buffertoipfs;

}

async function encrypts(data: object) {
    const encryptionPublicKey = process.env.PUBLIC_KEY as string;
    const encryptedMessage = encrypt(encryptionPublicKey, { data: JSON.stringify(data) }, 'x25519-xsalsa20-poly1305');
    const ciphertext = `0x${Buffer.from(JSON.stringify(encryptedMessage), "utf8").toString("hex")}`;
    return ciphertext;
}

async function uploadtoipfs(metadata: object | string | Buffer) {
    const uri = await storage.upload(metadata);
    return uri;
}