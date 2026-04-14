import { App, ComponentPublicInstance } from 'vue';

export default function handleError(Vue: App, baseUrl: string) {
  if (!baseUrl) {
    return;
  }
  Vue.config.errorHandler = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => {
    // send error info
    fetch(`${baseUrl}/report-error`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        err: err instanceof Error ? err.message : String(err),
        info,
      }),
    }).catch(console.error);
  };
}
