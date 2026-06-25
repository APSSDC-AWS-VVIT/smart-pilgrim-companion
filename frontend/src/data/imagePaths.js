export function asset(path) {
  return new URL(`../../public/assets/images/${path}`, import.meta.url).href;
}

export const templeImageSets = {
  T001: {
    hero: asset('Tirupathi/Sri Venkateswara Swamy Temple_.jpg'),
    banner: asset('Tirupathi/Sri Venkateswara Swamy Temple_.jpg'),
    gallery: [
      asset('Tirupathi/Govindaraja swamy temple.jpg'),
      asset('Tirupathi/Padmavathi Temple .jpg'),
      asset('Tirupathi/Papavinasam Waterfalls.png'),
      asset('Tirupathi/Silathoranam (Natural Rock Arch).png'),
      asset('Tirupathi/Sri Venkateswara Zoological Park.png'),
      asset('Tirupathi/Srinivasa Mangapuram Temple.jpg'),
      asset('Tirupathi/Sree venugopala swamy temple.png'),
    ],
  },
  T002: {
    hero: asset('Srisailam/Mallikarjun_temple.png'),
    banner: asset('Srisailam/Mallikarjun_temple.png'),
    gallery: [
      asset('Srisailam/BhramarambaDevi_temple.png'),
      asset('Srisailam/SakshiGanapati_temple.png'),
      asset('Srisailam/PathalaGanga.png'),
      asset('Srisailam/Paladhara-Panchadhara.png'),
      asset('Srisailam/akkamahadevi caves.png'),
      asset('Srisailam/Chenchu Lakshmi Tribal Museum.jpg'),
      asset('Srisailam/Srisailam ropeway.jpg'),
    ],
  },
  T003: {
    hero: asset('Srikalahasti/Srikalahasti temple.jpg'),
    banner: asset('Srikalahasti/Srikalahasti temple.jpg'),
    gallery: [
      asset('Srikalahasti/Srikalahasthi pathala ganapati.jpg'),
      asset('Srikalahasti/Bharadwaja Tirtham.png'),
      asset('Srikalahasti/Durgambika Temple.png'),
      asset('Srikalahasti/Gnana Prasunambika Temple.png'),
      asset('Srikalahasti/Temple Pushkarini.png'),
      asset('Srikalahasti/Veyilingala Kona Waterfall.png'),
      asset('Srikalahasti/Forest trail.jpg'),
    ],
  },
};

export function getTempleImage(templeId, kind = 'hero') {
  return templeImageSets[templeId]?.[kind] || '';
}