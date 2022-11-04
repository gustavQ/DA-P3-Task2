import Link from 'next/link';

const Home = () => {
  return (
    <div className="my-10">
      <h1 className="mb-5 text-2xl font-bold">Choose Task</h1>
      <div className="flex flex-col space-y-5 w-1/3"> 
        <Link href='/tokens'>
          <div className="w-60 h-20 rounded-lg bg-indigo-400 hover:bg-indigo-500 flex justify-center items-center text-lg font-bold text-white">Tokens</div>
        </Link>
        <Link href='/'>
          <div className="w-60 h-20 rounded-lg bg-indigo-400 hover:bg-indigo-500 flex justify-center items-center text-lg font-bold text-white">NFT Traits</div>
        </Link>
      </div>
    </div>
  );
}

export default Home
