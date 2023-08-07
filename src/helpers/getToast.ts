import { useToast, type ToastPropsWithMessage, type ToastProps } from 'vue-toast-notification';
const $toast = useToast()

export const showToast = ({message, type}: ToastPropsWithMessage & ToastProps) => {
    $toast.open({message, type, position: 'top-right', duration: 1000})
}