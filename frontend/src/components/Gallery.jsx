export default function Gallery({ images, title = 'Gallery' }) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <h3 className="display-font text-2xl font-bold text-temple-deep">{title}</h3>
        <span className="text-sm text-app-muted">{images.length} images</span>
      </div>
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
        {images.map((image) => (
          <figure key={image.src} className="mb-4 break-inside-avoid overflow-hidden rounded-3xl surface-card">
            <div className="aspect-[4/3]">
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
            <figcaption className="px-4 py-3 text-sm text-app-muted">{image.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}