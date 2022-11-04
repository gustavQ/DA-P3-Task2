import React, {useMemo,useEffect} from 'react';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {WalletModalProvider, WalletDisconnectButton, WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import {PhantomWalletAdapter} from "@solana/wallet-adapter-wallets";
import {clusterApiUrl} from '@solana/web3.js';

import {MintDisplay} from '../components/MintDisplay';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export default function Home() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;
  
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
	
	const wallets = useMemo(
  	() => [
    	new PhantomWalletAdapter(),
     	],
    	[network]
    );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <main className="flex flex-col justify-center align-center">
            <div className="m-auto p-10">
              <WalletMultiButton />
            </div>
            <MintDisplay/>
          </main>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
