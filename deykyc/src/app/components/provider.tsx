"use client";

import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";


export default function Providers({children,}: {
    children: React.ReactNode
  }) {
  return (
    <ThirdwebProvider activeChain="mumbai" clientId={process.env.TEMPLATE_CLIENT_ID} supportedWallets={[metamaskWallet()]}>
      {children}
    </ThirdwebProvider>
  )
}