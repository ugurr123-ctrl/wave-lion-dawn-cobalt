import { CyclePhase } from './types';

export type KitchenMeal = {
  when: string;
  icon: string;
  title: string;
  detail: string;
  items: string[];
};

export type KitchenDay = {
  name: string;
  note: string;
  meals: KitchenMeal[];
};

const DAYS: Record<CyclePhase, KitchenDay[]> = {
  regl: [
    {
      name: 'Demir günü',
      note: 'Ilık tabak, az tuz, buzlu içecek yok.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Hurmalı yulaf', detail: 'Yulafı sütle ısıt, hurma ve kabak çekirdeğini üste ekle. On dakika dinlendir.', items: ['Yulaf', 'Hurma', 'Kabak çekirdeği', 'Süt'] },
        { when: 'Öğle', icon: '🥣', title: 'Mercimek çorbası', detail: 'Kırmızı mercimek, ıspanak ve limon. Yanına bir dilim tam tahıl.', items: ['Mercimek', 'Ispanak', 'Limon', 'Tam tahıl'] },
        { when: 'Ara', icon: '🍵', title: 'Zencefil çayı', detail: 'Taze zencefili on dakika demle. Şeker ekleme.', items: ['Zencefil', 'Limon'] },
        { when: 'Akşam', icon: '🌙', title: 'Fırın tatlı patates', detail: 'Patatesi kabuğuyla fırınla, nohut ve yoğurt ekle.', items: ['Tatlı patates', 'Nohut', 'Yoğurt'] },
      ],
    },
    {
      name: 'Sıcak kase',
      note: 'Çiğ salata yerine pişmiş sebze.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Yumurtalı ıspanak', detail: 'Ispanağı zeytinyağında söndür, yumurtayı kır. Yanına tahıl ekmeği.', items: ['Yumurta', 'Ispanak', 'Zeytinyağı', 'Tahıl ekmeği'] },
        { when: 'Öğle', icon: '🥗', title: 'Kıymalı sebze yemeği', detail: 'Kıyma yoksa mercimek. Havuç, patates, bol maydanoz.', items: ['Kıyma veya mercimek', 'Havuç', 'Patates', 'Maydanoz'] },
        { when: 'Ara', icon: '🍎', title: 'Elma ve tahin', detail: 'Bir elma, bir tatlı kaşığı tahin.', items: ['Elma', 'Tahin'] },
        { when: 'Akşam', icon: '🌙', title: 'Balık veya fasulye', detail: 'Izgara balık yoksa kuru fasulye. Limon sık.', items: ['Balık veya fasulye', 'Limon', 'Roka'] },
      ],
    },
    {
      name: 'Yumuşak gün',
      note: 'Az baharat, erken yemek.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Pirinç lapası', detail: 'Pirinci sütle pişir, tarçın ve birkaç üzüm ekle.', items: ['Pirinç', 'Süt', 'Tarçın', 'Üzüm'] },
        { when: 'Öğle', icon: '🥣', title: 'Tavuk suyu çorba', detail: 'Haşlama tavuk, havuç, ince erişte. Suyu da iç.', items: ['Tavuk', 'Havuç', 'Erişte'] },
        { when: 'Ara', icon: '🍵', title: 'Papatya', detail: 'Şekersiz. Karnın üstüne sıcak su torbası.', items: ['Papatya'] },
        { when: 'Akşam', icon: '🌙', title: 'Fırın kabak', detail: 'Kabağı zeytinyağıyla fırınla, yoğurt ve nane.', items: ['Kabak', 'Yoğurt', 'Nane', 'Zeytinyağı'] },
      ],
    },
  ],
  folikuler: [
    {
      name: 'Taze tabak',
      note: 'Protein ve renk. Yeni işe enerji bırakır.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Yoğurt kasesi', detail: 'Yoğurt, yaban mersini, keten ve bir kaşık yulaf.', items: ['Yoğurt', 'Yaban mersini', 'Keten', 'Yulaf'] },
        { when: 'Öğle', icon: '🥗', title: 'Tavuklu kinoa', detail: 'Izgara tavuk veya tofu, brokoli, limon, zeytinyağı.', items: ['Tavuk veya tofu', 'Kinoa', 'Brokoli', 'Limon'] },
        { when: 'Ara', icon: '🥒', title: 'Turşu ve peynir', detail: 'Küçük bir kase fermente turşu, beyaz peynir.', items: ['Turşu', 'Beyaz peynir'] },
        { when: 'Akşam', icon: '🌙', title: 'Izgara sebze', detail: 'Kabak, biber, patlıcan. Üstüne yoğurt.', items: ['Kabak', 'Biber', 'Patlıcan', 'Yoğurt'] },
      ],
    },
    {
      name: 'Odak tabağı',
      note: 'Öğle proteinini atlama.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Omlet ve domates', detail: 'İki yumurta, domates, biraz peynir. Ekmek isteğe bağlı.', items: ['Yumurta', 'Domates', 'Peynir'] },
        { when: 'Öğle', icon: '🥗', title: 'Nohut salatası', detail: 'Haşlanmış nohut, salatalık, maydanoz, limon.', items: ['Nohut', 'Salatalık', 'Maydanoz', 'Limon'] },
        { when: 'Ara', icon: '🫐', title: 'Meyve', detail: 'Bir avuç çilek veya elma.', items: ['Çilek', 'Elma'] },
        { when: 'Akşam', icon: '🌙', title: 'Fırın somon', detail: 'Somon yoksa mercimek köfte. Yanında haşlanmış brokoli.', items: ['Somon veya mercimek', 'Brokoli', 'Zeytinyağı'] },
      ],
    },
    {
      name: 'Hafif akşam',
      note: 'Akşamı erken kapat.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Yulaf ve kefir', detail: 'Kefire yulaf ve keten ekle. On dakika beklet.', items: ['Kefir', 'Yulaf', 'Keten'] },
        { when: 'Öğle', icon: '🥗', title: 'Hindi dürüm', detail: 'Tam lavaş, hindi veya nohut, roka, yoğurt sos.', items: ['Tam lavaş', 'Hindi veya nohut', 'Roka', 'Yoğurt'] },
        { when: 'Ara', icon: '🥕', title: 'Havuç', detail: 'Çiğ havuç, bir tutam tuzsuz.', items: ['Havuç'] },
        { when: 'Akşam', icon: '🌙', title: 'Sebze çorbası', detail: 'Kabak, patates, havuç. Blenderdan geçir.', items: ['Kabak', 'Patates', 'Havuç'] },
      ],
    },
  ],
  ovulasyon: [
    {
      name: 'Hafif ve parlak',
      note: 'Ağır sos yok. Çiğ sebze iyi gelir.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Avokadolu yumurta', detail: 'Haşlanmış yumurta, yarım avokado, domates, karabiber.', items: ['Yumurta', 'Avokado', 'Domates'] },
        { when: 'Öğle', icon: '🥗', title: 'Renkli salata', detail: 'Roka, nohut, salatalık, zeytinyağı, limon.', items: ['Roka', 'Nohut', 'Salatalık', 'Zeytinyağı', 'Limon'] },
        { when: 'Ara', icon: '🍊', title: 'Nar veya portakal', detail: 'Bir porsiyon meyve yeter.', items: ['Portakal'] },
        { when: 'Akşam', icon: '🌙', title: 'Izgara balık', detail: 'Balık, kuşkonmaz, limon. Yağ az.', items: ['Balık', 'Kuşkonmaz', 'Limon'] },
      ],
    },
    {
      name: 'Serin tabak',
      note: 'Kızartma yok.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Meyveli yoğurt', detail: 'Sade yoğurt, çilek, bir kaşık keten.', items: ['Yoğurt', 'Çilek', 'Keten'] },
        { when: 'Öğle', icon: '🥗', title: 'Ton veya nohut', detail: 'Ton balığı yoksa nohut. Bol yeşillik.', items: ['Ton veya nohut', 'Marul', 'Limon', 'Zeytin'] },
        { when: 'Ara', icon: '🥒', title: 'Salatalık', detail: 'Dilimle, tuzsuz ye.', items: ['Salatalık'] },
        { when: 'Akşam', icon: '🌙', title: 'Tavuk ızgara', detail: 'Az yağ, kekik, közlenmiş biber.', items: ['Tavuk', 'Biber', 'Kekik'] },
      ],
    },
    {
      name: 'Akşam erken',
      note: 'Gece yemeğini hafif tut.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Smoothie kasesi', detail: 'Muz, yoğurt, yaban mersini. Şeker ekleme.', items: ['Muz', 'Yoğurt', 'Yaban mersini'] },
        { when: 'Öğle', icon: '🥗', title: 'Kinoa tabbouleh', detail: 'Kinoa, maydanoz, domates, limon, zeytinyağı.', items: ['Kinoa', 'Maydanoz', 'Domates', 'Limon'] },
        { when: 'Ara', icon: '🥜', title: 'Çiğ badem', detail: 'Bir avuç, tuzsuz.', items: ['Badem'] },
        { when: 'Akşam', icon: '🌙', title: 'Sebze buğulama', detail: 'Brokoli ve havuç. Üstüne limon.', items: ['Brokoli', 'Havuç', 'Limon'] },
      ],
    },
  ],
  luteal: [
    {
      name: 'Tok tutan',
      note: 'Kompleks karbonhidrat, tuzu kıs.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Tarçınlı yulaf', detail: 'Yulaf, susam, tarçın, dilim armut.', items: ['Yulaf', 'Susam', 'Tarçın', 'Armut'] },
        { when: 'Öğle', icon: '🥗', title: 'Mercimek ve kinoa', detail: 'Yeşil mercimek, kinoa, roka, zeytinyağı.', items: ['Mercimek', 'Kinoa', 'Roka', 'Zeytinyağı'] },
        { when: 'Ara', icon: '🍫', title: 'İki kare çikolata', detail: 'Bitter, sütlü değil. Yanına badem.', items: ['Bitter çikolata', 'Badem'] },
        { when: 'Akşam', icon: '🌙', title: 'Fırın kabak', detail: 'Kabak, nohut, yoğurt. Tuz az.', items: ['Kabak', 'Nohut', 'Yoğurt'] },
      ],
    },
    {
      name: 'Magnezyum',
      note: 'Tatlı isteği gelirse proteini artır.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Muzlu tost', detail: 'Tam tahıl, fıstık ezmesi, muz dilimleri.', items: ['Tam tahıl', 'Fıstık ezmesi', 'Muz'] },
        { when: 'Öğle', icon: '🥗', title: 'Hindi veya fasulye', detail: 'Hindi yoksa kuru fasulye. Yanında salata.', items: ['Hindi veya fasulye', 'Salatalık', 'Domates'] },
        { when: 'Ara', icon: '🎃', title: 'Kabak çekirdeği', detail: 'Bir avuç, çiğ.', items: ['Kabak çekirdeği'] },
        { when: 'Akşam', icon: '🌙', title: 'Ispanaklı yumurta', detail: 'Ispanak, yumurta, bir dilim ekmek.', items: ['Ispanak', 'Yumurta', 'Ekmek'] },
      ],
    },
    {
      name: 'Sakin akşam',
      note: 'Akşam tuzunu düşür, şişlik azalır.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Armutlu yoğurt', detail: 'Yoğurt, haşlanmış armut, tarçın.', items: ['Yoğurt', 'Armut', 'Tarçın'] },
        { when: 'Öğle', icon: '🥣', title: 'Sebzeli bulgur', detail: 'İnce bulgur, havuç, kabak, nane.', items: ['Bulgur', 'Havuç', 'Kabak', 'Nane'] },
        { when: 'Ara', icon: '🍵', title: 'Rezene çayı', detail: 'Yemekten sonra. Şekersiz.', items: ['Rezene'] },
        { when: 'Akşam', icon: '🌙', title: 'Fırın patates', detail: 'Patates, yoğurt, dereotu. Tereyağı az.', items: ['Patates', 'Yoğurt', 'Dereotu'] },
      ],
    },
  ],
  pms: [
    {
      name: 'Kriz öncesi',
      note: 'Öğünü atlama. Şeker yerine protein.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Muz ve yulaf', detail: 'Yulaf, muz, ayçiçeği çekirdeği.', items: ['Yulaf', 'Muz', 'Ayçiçeği'] },
        { when: 'Öğle', icon: '🥣', title: 'Mercimek çorbası', detail: 'Kırmızı mercimek, havuç, limon. Ekmekle ye.', items: ['Mercimek', 'Havuç', 'Limon', 'Ekmek'] },
        { when: 'Ara', icon: '🍫', title: 'Bitter ve badem', detail: 'İki kare yeter. Fazlası akşamı bozar.', items: ['Bitter çikolata', 'Badem'] },
        { when: 'Akşam', icon: '🌙', title: 'Ispanak ve yumurta', detail: 'Ispanak sotelenir, yumurta eklenir, fırın patates yanında.', items: ['Ispanak', 'Yumurta', 'Patates'] },
      ],
    },
    {
      name: 'Sakin tuz',
      note: 'Hazır cips yok. Ev yemeği.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Peynirli omlet', detail: 'Yumurta, lor, domates. Tuz az.', items: ['Yumurta', 'Lor', 'Domates'] },
        { when: 'Öğle', icon: '🥗', title: 'Nohut yahni', detail: 'Nohut, patates, havuç, kimyon az.', items: ['Nohut', 'Patates', 'Havuç'] },
        { when: 'Ara', icon: '🍵', title: 'Papatya', detail: 'Öğleden sonra kahve yerine.', items: ['Papatya'] },
        { when: 'Akşam', icon: '🌙', title: 'Tavuk haşlama', detail: 'Tavuk, havuç, kabak. Suyunu da iç.', items: ['Tavuk', 'Havuç', 'Kabak'] },
      ],
    },
    {
      name: 'Erken yatış',
      note: 'Akşam yemeği hafif ve erken.',
      meals: [
        { when: 'Sabah', icon: '🌅', title: 'Kefir ve yulaf', detail: 'Kefir, yulaf, ayçiçeği. Soğuk da olur.', items: ['Kefir', 'Yulaf', 'Ayçiçeği'] },
        { when: 'Öğle', icon: '🥣', title: 'Ezogelin', detail: 'Mercimek, bulgur, nane. Yanında yoğurt.', items: ['Mercimek', 'Bulgur', 'Nane', 'Yoğurt'] },
        { when: 'Ara', icon: '🍌', title: 'Muz', detail: 'Bir tane. Çikolata isteğini keser.', items: ['Muz'] },
        { when: 'Akşam', icon: '🌙', title: 'Yoğurtlu kabak', detail: 'Rendelenmiş kabak, sarımsak az, yoğurt.', items: ['Kabak', 'Yoğurt', 'Sarımsak'] },
      ],
    },
  ],
};

export function dayIndex(offset = 0): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const index = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return index + offset;
}

export function menuFor(phase: CyclePhase, offset = 0): KitchenDay {
  const list = DAYS[phase];
  const index = ((dayIndex(offset) % list.length) + list.length) % list.length;
  return list[index];
}

export function marketLines(phase: CyclePhase, tomorrowPhase: CyclePhase) {
  const today = menuFor(phase, 0);
  const tomorrow = menuFor(tomorrowPhase, 1);
  const rows: { name: string; why: string }[] = [];
  const seen = new Set<string>();
  const push = (name: string, why: string) => {
    if (seen.has(name)) return;
    seen.add(name);
    rows.push({ name, why });
  };
  today.meals.forEach((meal) => meal.items.forEach((item) => push(item, `Bugün · ${meal.when}`)));
  if (tomorrowPhase !== phase || tomorrow.name !== today.name) {
    tomorrow.meals.forEach((meal) => meal.items.forEach((item) => push(item, `Yarın · ${meal.when}`)));
  }
  return { today, tomorrow, rows };
}

export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}
