import { onUnmounted, onMounted } from 'vue';

export const useDetectOutsideClick = (component: any, callback: () => void) => {
  if (!component) return;
  const listener = (event: MouseEvent) => {
    if (event.target !== component.value && event.composedPath().includes(component.value)) {
      return;
    }

    if (typeof callback === 'function') {
      callback();
    }
  }
  onMounted(() => { window.addEventListener('click', listener) });
  onUnmounted(() => { window.removeEventListener('click', listener) });
};
