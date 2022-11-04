import React, {useEffect, useState} from 'react';
import {useWallet, useConnection} from "@solana/wallet-adapter-react";
import {TOKEN_PROGRAM_ID} from '@solana/spl-token';



const MintDisplay = () => {
  const {publicKey} = useWallet();
  const {connection} = useConnection();
  const [splTokens, setSplTokens] = useState([]);
  const [available, setAvailable] = useState(false); 
  
  useEffect(() => {
    let id = 0;
    if(publicKey) {
      console.log(publicKey);
     
      const getAccounts = async () => {
        await connection.getParsedProgramAccounts(
          TOKEN_PROGRAM_ID,
          {
            filters: [
              {
                dataSize: 165,
              },
              {
                memcmp: {
                  offset: 32,
                  bytes: publicKey.toBase58(),
                },
              }  
            ]
          }
        ).then( 
          (accounts) => { 
            return accounts.map((a) => ( {
              id : id++,
              address: a.account.data["parsed"]["info"]["mint"],
              amount: a.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]

            } )) 
          }
				).then( (t) => {
      	    setSplTokens(t)  
            setAvailable(true)
          }
				)
      }

      getAccounts();

    }
    else {
      setAvailable(false);
    }
  }, [publicKey]);

  return (
    <div className="max-w-full h-full rounded-md bg-indigo-100">
      { !available && 
        <div className="flex items-center justify-center h-full">
          <div>
            <h1 className="text-2xl text-white font-bold">Wallet not Connected</h1>
          </div>
        </div>  
      }
      { available && splTokens.map((token) => ( 
        <div className="flex flex-row justify-center align-center" key={token.id}>
          <div className="bg-white m-2 rounded grow">{token.address}</div>
          <div className="w-10 bg-white m-2 rounded flex-none">{token.amount}</div>
        </div>
      ))

      }

    </div>
  );
}

export default MintDisplay
