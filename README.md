# SecureKYC:Decentralized 
## This is an secure and tamper proof Decentralized KYC Project..
### Note: this project is currently under development 
## Features
1)Users enters his kyc number(aadhar for india) \
2)user details is fetched \
3)Users click on claim nft button,which first get the public key from the user and encrypts the data \
4)the encrypted content along with nft id(token id) is hosted on ipfs... \
5)a qr is made for the hosted content url(ipfs url) and is minted as nft to the user wallet \
6)these nfts now represent kyc details in a secure manner \
7)user when scan his qr code,the hosted content(encrypted content,nft token id) is fetched from ipfs
8)before decrypting the content,the ownership address of the nft is checked to ensure that the nft is provided by us and is owned by him only.
9)if it is true the content is decrypted using his private key,with the help of metamask.
10)Private key is not exposed anywhere in the process(codespace,env file etc)..
11)encryption using public key ensures that,it can decrypted only by that user,thus making it tamper proof..
12)all the nfts, minted to user are non transferable nfts...also these nft which represent the kyc details of person can be used globally as an asset across the world..
