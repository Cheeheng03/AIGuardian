export function TrendingWidget(): JSX.Element {
  return (
    <div className="rounded-2xl bg-[rgb(32,35,39)] p-4">
      <h2 className="text-lg font-bold text-gray-300">Trending</h2>

      <div className="flex justify-between mt-3">
        <div className="flex flex-col">
          <h2 className="text-white font-bold">Solana Radar Hackathon Malaysia Side Track</h2>
          <p className="text-gray-500">by Superteam Malaysia</p>
        </div>
        <img
          src="/assets/images/solana.png"
          alt="News Image"
          className="rounded-xl w-[60px] h-[60px]"
        />
      </div>
    </div>
  );
}
