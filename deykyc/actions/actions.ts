"use server"
import { encrypt } from 'eth-sig-util';
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import QRCode from 'qrcode';

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
    const details = {
        name: "prakash",
        dob: "04/08/2003"
    }
    const encrypted = await encrypts(details);
    const detailss = {
        name: "some",
        content: encrypted
    }

    const encryptedconturl = await uploadtoipfs(detailss);
    console.log(encryptedconturl);
    const datauri = await QRCode.toDataURL(encryptedconturl);
    const buffer = await datauritobuffer(datauri);
    const buffertoipfs = await uploadtoipfs(buffer);
    console.log(buffertoipfs);
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