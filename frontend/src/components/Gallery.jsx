export default function Gallery({ images, title = 'Gallery' }) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <h3 className="display-font text-2xl font-bold text-temple-deep">{title}</h3>
        <span className="text-sm text-slate-500">{images.length} images</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image) => (
          <figure key={image.src} className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm">
            <div className="aspect-[4/3]">
              <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
            </div>
            <figcaption className="px-4 py-3 text-sm text-slate-600">{image.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}