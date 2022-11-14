import React, {useEffect, useState} from 'react'; 
import {useWallet, useConnection} from "@solana/wallet-adapter-react"; 
import {bundlrStorage, Metaplex, walletAdapterIdentity} from "@metaplex-foundation/js";
import {PublicKey} from "@solana/web3.js";
import PubkeyBar from './PubkeyBar';
import TraitForm from './TraitForm';

const TraitDisplay = () => {
  const {connection} = useConnection();
  const [nft, setNft] = useState(null);
  const [address, setAddress] = useState('');
  const [notPresent, setPresent] = useState(false);
  const wallet = useWallet();

  const metaplex = Metaplex.make(connection).use(
		walletAdapterIdentity(wallet)
	)

	metaplex.use(bundlrStorage({
		address: 'https://devnet.bundlr.network',
		providerUrl: 'https://api.devnet.solana.com',
		timeout: 60000,
	}));

  const handleSearch = (addr) => {
    setAddress(addr);
    setPresent(false);
  };

  const handleUpdate = (form) => {
    const updateTrait = async (form) => {
      await metaplex.nfts()
        .uploadMetadata({
          ...nft,
          attributes: [...nft.attributes, {trait_type: form.type, value: form.name}]})
        .then(async (nft) => {
          console.log(nft)
          await metaplex.nfts()
            .update({
              nftOrSft:nft,
              uri:nft.uri})
            .then( getNft() )
            .catch((e) => alert(e))
        })
        .catch((e) => console.log(e))
    }
    updateTrait(form);
  }

  useEffect(() => {
    if(address) { getNft(); }
  }, [address]);

  const getNft = async () => {
    const mintAddress = new PublicKey(address);
    await metaplex
      .nfts()
      .findByMint({mintAddress})
      .then(
        (nft) => setNft(nft.json),
        (e) => { 
          setNft(null);
          setPresent(true);
        }
      );
  };
 
  return (
    <div>
      <PubkeyBar onAddress={handleSearch} />
      <TraitForm onUpdate={handleUpdate} disable={!(nft && wallet.publicKey)} /> 
      { nft &&  
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
        </div> }  
    { (notPresent && !nft) && <div className="p-4 text-red-600">Mint address doesn't exist</div> }
    </div>);
}

export default TraitDisplay
