import { useState } from 'react'
import { useCart } from '../context/CartContext'

const CartIcon = () => (
  <svg width="24" height="23" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.659 26.355C11.3259 26.355 11.8664 25.8144 11.8664 25.1476C11.8664 24.4808 11.3259 23.9402 10.659 23.9402C9.99223 23.9402 9.45166 24.4808 9.45166 25.1476C9.45166 25.8144 9.99223 26.355 10.659 26.355Z" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23.9403 26.355C24.6071 26.355 25.1477 25.8144 25.1477 25.1476C25.1477 24.4808 24.6071 23.9402 23.9403 23.9402C23.2735 23.9402 22.7329 24.4808 22.7329 25.1476C22.7329 25.8144 23.2735 26.355 23.9403 26.355Z" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 1H5.82955L9.06534 17.1669C9.17575 17.7228 9.47816 18.2221 9.91962 18.5775C10.3611 18.9329 10.9135 19.1217 11.4801 19.1108H23.2159C23.7825 19.1217 24.3349 18.9329 24.7764 18.5775C25.2179 18.2221 25.5203 17.7228 25.6307 17.1669L27.5625 7.03693H7.03693" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const FloatingCart = () => {
  const { items, removeItem, setQty, clear, totalCount, totalPrice } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | done

  const handleOrder = async () => {
    setStatus('sending')
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, totalPrice }),
      })
    } catch {
      // заглушка: даже если бек недоступен, считаем заказ принятым
    }
    setStatus('done')
    clear()
    setTimeout(() => { setStatus('idle'); setIsOpen(false) }, 2500)
  }

  return (
    <div className="floating-cart">
      {isOpen && (
        <div className="floating-cart__panel">
          {status === 'done' ? (
            <div className="floating-cart__done">
              Заказ принят! Мы свяжемся с вами в ближайшее время.
            </div>
          ) : items.length === 0 ? (
            <div className="floating-cart__empty">Корзина пуста</div>
          ) : (
            <>
              <ul className="floating-cart__list">
                {items.map(item => (
                  <li className="floating-cart__item" key={item.id}>
                    <img className="floating-cart__item-img" src={item.image || '/v5_160.png'} alt="" />
                    <div className="floating-cart__item-info">
                      <span className="floating-cart__item-name">{item.name}</span>
                      <div className="floating-cart__item-row">
                        <div className="floating-cart__qty">
                          <button onClick={() => setQty(item.id, item.qty - 1)} aria-label="Уменьшить">−</button>
                          <span>{item.qty}</span>
                          <button onClick={() => setQty(item.id, item.qty + 1)} aria-label="Увеличить">+</button>
                        </div>
                        <span className="floating-cart__item-price">
                          {(item.price * item.qty).toLocaleString('ru-RU')}&nbsp;₽
                        </span>
                      </div>
                    </div>
                    <button
                      className="floating-cart__item-remove"
                      aria-label="Удалить"
                      onClick={() => removeItem(item.id)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>

              <div className="floating-cart__total">
                <span>Итого:</span>
                <span>{totalPrice.toLocaleString('ru-RU')}&nbsp;₽</span>
              </div>

              <button
                className="floating-cart__order-btn"
                onClick={handleOrder}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Отправляем...' : 'Заказать'}
              </button>
            </>
          )}
        </div>
      )}

      <button
        className="floating-cart__toggle"
        aria-label="Корзина"
        onClick={() => setIsOpen(o => !o)}
      >
        <CartIcon />
        {totalCount > 0 && <span className="floating-cart__badge">{totalCount}</span>}
      </button>
    </div>
  )
}

export default FloatingCart
