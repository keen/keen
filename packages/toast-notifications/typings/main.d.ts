import { Options as ToastOptions } from 'react-toast-notifications';

declare module 'react-toast-notifications' {
  interface Options extends ToastOptions {
    showDismissButton?: boolean;
  }
}
