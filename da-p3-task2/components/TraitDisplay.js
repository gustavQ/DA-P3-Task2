import React, {useEffect, useState} from 'react';
import {useConnection} from "@solana/wallet-adapter-react";
import {Metaplex} from "@metaplex-foundation/js";
import {PublicKey} from "@solana/web3.js";

const TraitDisplay = ({ address }) => {
  const {connection} = useConnection();
  const [present, setPresent] = useState(false);
  const [nft, setNft] = useState(null);
  
  useEffect(() => {

      const getTraits = async () => {
        try {
          const mintAddress = new PublicKey(address);
          await Metaplex.make(connection).nfts().findByMint({mintAddress})
            .then( (nft) => {
              setNft(nft.json);
              setPresent(true);
            });
          
        } catch (e) {
          setPresent(false);
        };
      }

      getTraits();
    
  }, [address]);

  return (
    <div>
      { present ? 
        <div className="p-4">
          <h1>{nft.hasOwnProperty("name") ? nft.name : "name not found"}</h1>
          <div className="mt-8 flex flex-wrap justify-center">
            { nft.attributes.map((trait, id) => (
              <div key={id} className="bg-white p-2 rounded-xl m-2">
                <h2 className="text-sm">{trait.trait_type}</h2>
                <h3 className="text-xl">{trait.value}</h3>
              </div>
            ))}
          </div>
        </div> : 
        <div className="p-4 text-red-600">Mint address doesn't exist</div> 
      }
    </div>);
}

export default TraitDisplay
