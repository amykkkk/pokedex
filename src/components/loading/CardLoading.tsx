export default function CardLoading({ limit }: { limit: number }) {
  return new Array(limit).fill(0).map((_, i) => (
    <div
      key={i}
      className="group relative overflow-hidden rounded-2xl p-4 shadow-md"
    >
      <p className="skeleton mb-4 h-3 w-10" />
      <div className="skeleton mx-auto h-24 w-24 rounded-3xl object-contain drop-shadow-md" />
      <h3 className="skeleton mt-4 h-4" />
    </div>
  ));
}
