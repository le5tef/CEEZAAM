import { ElNotification } from 'element-plus'
import type { VNode } from 'vue'

interface INotify {
  type?: 'success' | 'warning' | 'info' | 'error'
  title?: string
  message?: string | VNode
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  duration?: number
}

export function notify<undefined>({ type, title, message, position, duration }: INotify) {
  ElNotification({
    position: position || 'bottom-right',
    type: type || 'info',
    title: title || '',
    message: message || '',
    duration: duration || 5000,
  })
}
