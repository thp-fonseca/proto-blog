import {MetadataRoute} from 'next';
import {getTranslations} from 'next-intl/server';
 
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  // Pick a locale that is representative of the app
  const locale = 'pt-BR';
 
  const t = await getTranslations({
    namespace: 'Manifest',
    locale
  });
 
  return {
    name: t('name'),
    description: t('description'),
    start_url: '/',
    theme_color: '#101E33',
    orientation: 'portrait',
    icons: [
      {
        src: '/assets/favicon/favicon.ico',
        sizes: '64x64',
        type: 'image/x-icon',
      },
      {
        src: '/assets/favicon/favicon.svg',
        sizes: '64x64',
        type: 'image/svg+xml',
      },
      {
        src: '/assets/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ]
  };
}
