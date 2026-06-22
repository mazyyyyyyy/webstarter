import { useState } from 'react'

const ProductGallery = ({ images, name }) => {
  const [active, setActive] = useState(0)

  const next = () => setActive(i => (i + 1) % images.length)

  return (
    <div className="pc-gallery">

      {/* Главное фото */}
      <div className="pc-gallery__main">
        <img
          className="pc-gallery__main-img"
          src={images[active]}
          alt={name}
          loading="lazy"
        />
        <button
          className="pc-gallery__arrow pc-gallery__arrow--next"
          onClick={next}
          aria-label="Следующее изображение"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      {/* Миниатюры */}
      <div className="pc-gallery__thumbs">
        {images.map((img, i) => (
          <button
            key={i}
            className={`pc-gallery__thumb ${active === i ? 'pc-gallery__thumb--active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Фото ${i + 1}`}
          >
            <img src={img} alt={`${name} — вид ${i + 1}`} />
          </button>
        ))}
      </div>

    </div>
  )
}

export default ProductGallery