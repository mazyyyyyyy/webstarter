/**
 * SEO-текст внизу посадочной страницы (над футером).
 */
const SeoText = ({ children }) => (
  <section className="seo-text">
    <div className="container">
      <div className="seo-text__body">{children}</div>
    </div>
  </section>
)

export default SeoText
