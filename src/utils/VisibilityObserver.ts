/** Обзервер вызывает коллбэк при появлении HTML-элементов (targets) в области видимости */
export interface Options {
  /** HTML-элемент или массив/нодлист/коллекцию элементов */
  targets: Element | Element[] | NodeList | HTMLCollection | undefined
  /** Отступ от края элемента - величина видимой части элемента для вызова коллбэка onInView */
  offset: number
  threshold?: number

  /** Внимание, **this** в этом коллбеке ссылается на текущий элемент. Коллбэк, срабатывающий когда элемент появляется в зоне видимости с учетом offset */
  onInView?: () => void
  /** Внимание, **this** в этом коллбеке ссылается на текущий элемент. Коллбэк, срабатывающий когда элемент находится вне зоны видимости с учетом offset */
  onOutOfView?: () => void
}

export class VisibilityObserver {
  options: Options
  observer: any

  constructor(options: Options) {
    this.options = options
    let targets = options.targets

    if (!targets) return

    if (targets instanceof NodeList || targets instanceof HTMLCollection) {
      targets = Array.from(targets) as Element[]
    }

    if (!Array.isArray(targets)) {
      targets = [targets]
    }

    for (const target of targets) {
      this.observe(target)
    }
  }

  observe(target: Element) {
    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (entry.isIntersecting) {
          if ('onInView' in this.options) {
            // @ts-ignore
            this.options.onInView.call(target)
          }
        } else {
          if ('onOutOfView' in this.options) {
            // @ts-ignore
            this.options.onOutOfView.call(target)
          }
        }
      },
      {
        rootMargin: `-${this.options.offset}px`,
        threshold: this.options.threshold || 0,
      }
    )

    this.observer.observe(target)
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}

export default VisibilityObserver
