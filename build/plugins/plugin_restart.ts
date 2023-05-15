import ViteRestart from 'vite-plugin-restart';

export default function () {
  return ViteRestart({
    restart: ['*.config.[jt]s', '**/config/*.[jt]s']
  });
}
