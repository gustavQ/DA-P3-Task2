import Link from 'next/link';
import React, {useMemo} from 'react';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {WalletModalProvider, WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import {PhantomWalletAdapter} from "@solana/wallet-adapter-wallets";
import {clusterApiUrl} from '@solana/web3.js';

require('@solana/wallet-adapter-react-ui/styles.css');

const Layout = ({ children }) => {

  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo( () => 
    [new PhantomWalletAdapter()],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} >
        <WalletModalProvider>
          <main className="m-0 mx-auto max-w-3xl flex flex-col justify-center items-center text-center">
            <Link href='/'>
              <h1 className="my-10 text-5xl">
                DOGE CAPITAL PHASE3 TASK2
              </h1>
            </Link>
            <div>
              <WalletMultiButton className="bg-black"/>
            </div>
            {children}
          </main>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default Layout
