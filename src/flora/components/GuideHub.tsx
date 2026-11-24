import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Info } from 'lucide-react';
import { CyclePhase } from '../types';
import { phaseForCycleDay, toLocalISO } from '../utils/cycleIntelligence';
import { soundEngine } from '../utils/audio';
import { isLifeId, LifeScreen, RehberAlerts } from './GuideLife';
import { marketLines, menuFor, readJson, writeJson } from '../guideKitchen';
import { guideNote } from '../dailyTips';

export type GuideSignals = {
  waterCurrentMl: number;
  waterGoalMl: number;
  mood?: string;
  symptoms: string[];
  supplementsTaken: number;
  supplementsTotal: number;
};

const EMPTY_SIGNALS: GuideSignals = {
  waterCurrentMl: 0,
  waterGoalMl: 2500,
  symptoms: [],
  supplementsTaken: 0,
  supplementsTotal: 0,
};

export type GuideId =
  | 'recipes'
  | 'market'
  | 'balance'
  | 'training'
  | 'energy'
  | 'stretch'
  | 'sound'
  | 'breath'
  | 'skin'
  | 'mind'
  | 'meeting'
  | 'fog'
  | 'trip'
  | 'delay'
  | 'travel'
  | 'libido'
  | 'social'
  | 'talk';

const SCREEN_TITLE: Record<GuideId, string> = {
  recipes: 'Tarif ve menü',
  market: 'Market',
  balance: 'Denge',
  training: 'Antrenman',
  energy: 'Enerji',
  stretch: 'Esneme',
  sound: 'Ses',
  breath: 'Nefes ve uyku',
  skin: 'Cilt',
  mind: 'Zihin',
  meeting: 'Toplantı',
  fog: 'Beyin sisi',
  trip: 'Tatil',
  delay: 'Tarih',
  travel: 'Uçuş ve gece',
  libido: 'Libido',
  social: 'Sosyal pil',
  talk: 'İletişim',
};

const PHASE_LABEL: Record<CyclePhase, string> = {
  regl: 'Kanama günleri',
  folikuler: 'Foliküler faz',
  ovulasyon: 'Doğurgan pencere',
  luteal: 'Luteal faz',
  pms: 'Adet öncesi',
};

const SECTIONS: {
  title: string;
  subtitle: string;
  wash: string;
  boxes: { id: GuideId; title: string; hint: string; icon: string; tint: string }[];
}[] = [
  {
    title: 'Beslenme',
    subtitle: 'Faza göre mutfak',
    wash: 'from-rose-50 to-amber-50',
    boxes: [
      { id: 'recipes', title: 'Tarif & menü', hint: 'Dört faz', icon: '🍓', tint: 'bg-gradient-to-br from-rose-100 to-rose-200' },
      { id: 'market', title: 'Market', hint: 'Bu hafta', icon: '🌷', tint: 'bg-gradient-to-br from-amber-100 to-orange-100' },
      { id: 'balance', title: 'Denge', hint: 'Tohum ve kafein', icon: '🌿', tint: 'bg-gradient-to-br from-emerald-100 to-lime-100' },
    ],
  },
  {
    title: 'Egzersiz',
    subtitle: 'Faza göre hareket',
    wash: 'from-emerald-50 to-teal-50',
    boxes: [
      { id: 'training', title: 'Antrenman', hint: 'HIIT, pilates', icon: '🩰', tint: 'bg-gradient-to-br from-emerald-100 to-teal-100' },
      { id: 'energy', title: 'Enerji', hint: 'Güç ve eklem', icon: '✨', tint: 'bg-gradient-to-br from-amber-100 to-yellow-100' },
      { id: 'stretch', title: 'Esneme', hint: 'Spazm için', icon: '🪷', tint: 'bg-gradient-to-br from-teal-100 to-cyan-100' },
    ],
  },
  {
    title: 'Sanctuary',
    subtitle: 'Zihin, uyku, cilt',
    wash: 'from-violet-50 to-pink-50',
    boxes: [
      { id: 'sound', title: 'Ses', hint: '432 Hz, theta', icon: '🎶', tint: 'bg-gradient-to-br from-indigo-100 to-violet-100' },
      { id: 'breath', title: 'Nefes & uyku', hint: '4-7-8', icon: '🫧', tint: 'bg-gradient-to-br from-violet-100 to-fuchsia-100' },
      { id: 'skin', title: 'Cilt', hint: 'Bakım takvimi', icon: '🌸', tint: 'bg-gradient-to-br from-pink-100 to-rose-200' },
    ],
  },
  {
    title: 'İş',
    subtitle: 'Faza göre üretkenlik',
    wash: 'from-sky-50 to-indigo-50',
    boxes: [
      { id: 'mind', title: 'Zihin', hint: 'Analiz ve imza', icon: '💭', tint: 'bg-gradient-to-br from-sky-100 to-blue-100' },
      { id: 'meeting', title: 'Toplantı', hint: 'Gün seç', icon: '📌', tint: 'bg-gradient-to-br from-blue-100 to-indigo-100' },
      { id: 'fog', title: 'Beyin sisi', hint: 'İşi ertele', icon: '☁️', tint: 'bg-gradient-to-br from-slate-100 to-zinc-100' },
    ],
  },
  {
    title: 'Seyahat',
    subtitle: 'Tatil ve özel gün',
    wash: 'from-orange-50 to-amber-50',
    boxes: [
      { id: 'trip', title: 'Tatil', hint: 'Çakışma hesabı', icon: '🌴', tint: 'bg-gradient-to-br from-orange-100 to-amber-100' },
      { id: 'delay', title: 'Öteleme', hint: 'Tarih kayması', icon: '🌼', tint: 'bg-gradient-to-br from-amber-100 to-yellow-50' },
      { id: 'travel', title: 'Uçuş & gece', hint: 'Jet-lag ve cilt', icon: '🌙', tint: 'bg-gradient-to-br from-sky-100 to-cyan-100' },
    ],
  },
  {
    title: 'Sosyal',
    subtitle: 'Libido ve iletişim',
    wash: 'from-rose-50 to-fuchsia-50',
    boxes: [
      { id: 'libido', title: 'Libido', hint: 'Zirve notu', icon: '🌹', tint: 'bg-gradient-to-br from-rose-100 to-pink-200' },
      { id: 'social', title: 'Sosyal pil', hint: 'Dışarı ya da ev', icon: '🎀', tint: 'bg-gradient-to-br from-fuchsia-100 to-pink-100' },
      { id: 'talk', title: 'İletişim', hint: 'Yazmadan önce', icon: '💌', tint: 'bg-gradient-to-br from-violet-100 to-purple-100' },
    ],
  },
];

const SECTION_INFO: Record<string, string> = {
  Beslenme: 'Menü her gece değişir. Market listesi o günün tabaklarından kurulur. Denge, su, tohum, kahve ve alkolü bu cihazda tutar.',
  Egzersiz: 'Antrenman ve esneme, bulunduğun faza göre seans açar. Enerji halkası su, ruh hali, belirti ve takviye kayıtlarınla birlikte hesaplanır.',
  Sanctuary: 'Ses kulaklıkla 20 saniye çalar. Nefes 4-7-8 ritmindedir. Cilt önerisi teşhis değildir; faz çoğu kişide cildi böyle etkiler.',
  İş: 'Zihin takvimi analiz, sunum ve imza için daha uygun günleri döngüden hesaplar. Beyin sisi uyarısı yoğun işi ertelemen için hatırlatma tutar.',
  Seyahat: 'Tatil aralığı, kayıtlı döngüyle çakışıyor mu diye bakar. İlaçla gün kaydırmaz. Uçuş ve özel gece için hazırlık adımı verir.',
  Sosyal: 'Sosyal pil önümüzdeki günlere göre tahmin edilir. Libido notu yalnızca Rehber açıkken görünür. İletişim kutusu gergin günde metni yumuşatır.',
};

type Drill = { name: string; cue: string; seconds: number; image: string };

const TRAINING: Record<CyclePhase, { type: string; avoid: string; moves: Drill[] }> = {
  regl: {
    type: 'Yumuşak seans',
    avoid: 'HIIT ve sıçrama bugün gerekmez.',
    moves: [
      { name: 'Yerinde yürüyüş', cue: 'Kısa adım, omuzlar gevşek.', seconds: 40, image: '/training/yuruyus.jpg' },
      { name: 'Yan eğilme', cue: 'İki yana, belden zorlamadan.', seconds: 30, image: '/training/yan-egilme.jpg' },
      { name: 'Kuş köpek', cue: 'Karşı kol ve bacak. Bel sabit.', seconds: 40, image: '/training/kus-kopek.jpg' },
      { name: 'Kalça köprüsü', cue: 'Kalçayı yavaş kaldır, çeneyi gevşet.', seconds: 35, image: '/training/kopru.jpg' },
      { name: 'Ölü böcek', cue: 'Bel yerde. Nefesle uzat.', seconds: 35, image: '/training/dead-bug.jpg' },
    ],
  },
  folikuler: {
    type: 'Güç ve tempo',
    avoid: 'Isınmadan yük bindirme.',
    moves: [
      { name: 'Yerinde yürüyüş', cue: 'Dizleri rahat kaldır.', seconds: 30, image: '/training/yuruyus.jpg' },
      { name: 'Çömelme', cue: 'Topuklar yerde, göğüs açık.', seconds: 40, image: '/training/comelme.jpg' },
      { name: 'Geri lunge', cue: 'Diz ayak bileğini geçmesin.', seconds: 40, image: '/training/lunge.jpg' },
      { name: 'Çekiş', cue: 'Sırt düz, dirsekler geri.', seconds: 40, image: '/training/cekis.jpg' },
      { name: 'Kalça köprüsü', cue: 'Üstte bir nefes bekle.', seconds: 35, image: '/training/kopru.jpg' },
      { name: 'Kuş köpek', cue: 'Denge için yavaş.', seconds: 30, image: '/training/kus-kopek.jpg' },
    ],
  },
  ovulasyon: {
    type: 'Kontrollü güç',
    avoid: 'Eklem gevşek. Zıplamayı kısalt.',
    moves: [
      { name: 'Uzun yürüyüş', cue: 'Isınmayı aceleye getirme.', seconds: 45, image: '/training/yuruyus.jpg' },
      { name: 'Çömelme', cue: 'Kontrollü in, kontrollü kalk.', seconds: 40, image: '/training/comelme.jpg' },
      { name: 'Geri lunge', cue: 'Kısa adım, diz içeri kaçmasın.', seconds: 40, image: '/training/lunge.jpg' },
      { name: 'Çekiş', cue: 'Ani savurma yok.', seconds: 40, image: '/training/cekis.jpg' },
      { name: 'Ölü böcek', cue: 'Karın destekler, bel boşalmaz.', seconds: 35, image: '/training/dead-bug.jpg' },
      { name: 'Kalça köprüsü', cue: 'Pilates temposuyla kapat.', seconds: 35, image: '/training/kopru.jpg' },
    ],
  },
  luteal: {
    type: 'Orta tempo',
    avoid: 'Maksimum HIIT yerine sabit tempo.',
    moves: [
      { name: 'Yerinde yürüyüş', cue: 'Nefes konuşma temposunda.', seconds: 35, image: '/training/yuruyus.jpg' },
      { name: 'Kalça köprüsü', cue: 'Yavaş, on tekrar hayal et.', seconds: 40, image: '/training/kopru.jpg' },
      { name: 'Kuş köpek', cue: 'Sallanma. Küçük hareket yeter.', seconds: 35, image: '/training/kus-kopek.jpg' },
      { name: 'Yan eğilme', cue: 'Kaburga açılır, bel ezilmez.', seconds: 30, image: '/training/yan-egilme.jpg' },
      { name: 'Ölü böcek', cue: 'Tempo sabit.', seconds: 35, image: '/training/dead-bug.jpg' },
      { name: 'Çekiş', cue: 'Hafif. Sırtı topla.', seconds: 30, image: '/training/cekis.jpg' },
    ],
  },
  pms: {
    type: 'Yavaş akış',
    avoid: 'Rekor deneme. Eklemleri zorlama.',
    moves: [
      { name: 'Yerinde yürüyüş', cue: 'Çok yavaş. Ağrı artarsa dur.', seconds: 30, image: '/training/yuruyus.jpg' },
      { name: 'Yan eğilme', cue: 'İki yan, kısa tutuş.', seconds: 30, image: '/training/yan-egilme.jpg' },
      { name: 'Kuş köpek', cue: 'Dizler yerde. Bel nötr.', seconds: 30, image: '/training/kus-kopek.jpg' },
      { name: 'Kalça köprüsü', cue: 'Küçük kaldırma yeter.', seconds: 30, image: '/training/kopru.jpg' },
      { name: 'Ölü böcek', cue: 'Nefes uzun, tempo yok.', seconds: 30, image: '/training/dead-bug.jpg' },
    ],
  },
};

const EXTRA_DRILLS: Drill[] = [
  { name: 'Diz şınavı', cue: 'Dizler yerde. Göğsü indir, it.', seconds: 30, image: '/training/diz-sinav.jpg' },
  { name: 'Diz plank', cue: 'Ön kollar yerde. Bel çukurlaşmasın.', seconds: 25, image: '/training/diz-plank.jpg' },
  { name: 'Yan plank', cue: 'Dizden. Kalça düşmesin. İki yan.', seconds: 25, image: '/training/yan-plank.jpg' },
  { name: 'Sumo çömelme', cue: 'Ayaklar geniş, topuklar yerde.', seconds: 35, image: '/training/sumo.jpg' },
  { name: 'Duvar oturuşu', cue: 'Sırt duvarda. Dizler ayak hizasında.', seconds: 30, image: '/training/duvar.jpg' },
  { name: 'Sırt açma', cue: 'Yüzüstü, kol ve bacak hafif kalkar.', seconds: 25, image: '/training/superman.jpg' },
  { name: 'Midye', cue: 'Yan yat, üst diz açılır. İki yan.', seconds: 30, image: '/training/midye.jpg' },
  { name: 'Kalça dairesi', cue: 'Ayakta, küçük daire. İki yön.', seconds: 30, image: '/training/kalca-daire.jpg' },
  { name: 'Yan adım', cue: 'Sağa sola, yumuşak iniş.', seconds: 30, image: '/training/yan-adim.jpg' },
  { name: 'Diz kaldırma', cue: 'Göbek hizasına, zıplama yok.', seconds: 30, image: '/training/diz-kaldirma.jpg' },
];

const ENERGY: Record<CyclePhase, { level: number; joint: string }> = {
  regl: { level: 40, joint: 'Eklemler hassas olabilir. Yumuşak zemin, kısa adım.' },
  folikuler: { level: 78, joint: 'Eklemler daha stabil. Yükü kademeli artır.' },
  ovulasyon: { level: 90, joint: 'Bu pencerede eklem gevşekliği artabilir. Isınmayı uzat, ani yön değiştirme.' },
  luteal: { level: 58, joint: 'Güç düşer, gevşeklik sürebilir. Kontrolü hıza tercih et.' },
  pms: { level: 42, joint: 'Şişlik ve gerginlik olabilir. Zıplama ve derin bel dönüşü yok.' },
};

const STRETCHES = [
  { name: 'Diz göğse', hold: '40 sn', note: 'Sırt üstü, tek diz. Alt beli boşalt.', image: '/stretches/diz-gogse.jpg' },
  { name: 'Çocuk pozu', hold: '60 sn', note: 'Kalçayı topuklara bırak, nefes yavaş.', image: '/stretches/cocuk.jpg' },
  { name: 'Kedi-inek', hold: '8 tur', note: 'Omurgayı zorlamadan, ağrı noktasında dur.', image: '/stretches/kedi-inek.jpg' },
  { name: 'Yan yatar bükülme', hold: '30 sn', note: 'Üst dizi öne, göğüs açık. İki yan.', image: '/stretches/yan-bukum.jpg' },
  { name: 'Kalça köprüsü', hold: '40 sn', note: 'Kalçayı kaldır, nefesi tutma.', image: '/stretches/kopru.jpg' },
  { name: 'Kelebek', hold: '45 sn', note: 'Ayak tabanları birleşik. Dizleri zorlama.', image: '/stretches/kelebek.jpg' },
  { name: 'Figür dört', hold: '40 sn', note: 'Ayak bileği karşı dizin üstünde. İki yan.', image: '/stretches/figur-dort.jpg' },
  { name: 'Omuz', hold: '30 sn', note: 'Kol göğüste. İki yan, boyun gevşek.', image: '/stretches/omuz.jpg' },
  { name: 'Kuş köpek', hold: '8 tur', note: 'Karşı kol ve bacak. Bel oynamasın.', image: '/stretches/kus-kopek.jpg' },
  { name: 'Yan eğilme', hold: '30 sn', note: 'Ayakta, kaburga açılır. İki yan.', image: '/stretches/yan-egilme.jpg' },
  { name: 'İğne iplik', hold: '40 sn', note: 'Dört ayak. Bir kol göğsün altından kayar.', image: '/stretches/igne.jpg' },
  { name: 'Kalça fleksör', hold: '40 sn', note: 'Arka diz yerde, gövde dik. İki yan.', image: '/stretches/kalca-flexor.jpg' },
  { name: 'Öne katlanma', hold: '40 sn', note: 'Oturarak, belden. Dizler yumuşak olabilir.', image: '/stretches/one-katlanma.jpg' },
  { name: 'Baldır', hold: '30 sn', note: 'Topuk yerde, arka bacak düz. İki yan.', image: '/stretches/baldir.jpg' },
  { name: 'Boyun', hold: '25 sn', note: 'Kulağı omuza yaklaştır. İki yan.', image: '/stretches/boyun.jpg' },
  { name: 'Göğüs açma', hold: '30 sn', note: 'Eller arkada, omuzlar aşağı.', image: '/stretches/gogus.jpg' },
  { name: 'Arka bacak', hold: '40 sn', note: 'Sırt üstü, bir bacak havada. İki yan.', image: '/stretches/hamstring.jpg' },
  { name: 'Bel dönüşü', hold: '30 sn', note: 'Oturarak, göğüs yavaş döner. İki yan.', image: '/stretches/bel-donus.jpg' },
  { name: 'Duvara bacak', hold: '50 sn', note: 'Sırt yerde, bacaklar duvarda. Bel boşalır.', image: '/stretches/duvar-bacak.jpg' },
  { name: 'Bilek', hold: '20 sn', note: 'Avuç öne, diğer elle yavaşça. İki yan.', image: '/stretches/bilek.jpg' },
];

const SOUNDS: { id: string; title: string; hz: string; left: number; right: number }[] = [
  { id: '432', title: '432 Hz banyo', hz: 'Sakin ton', left: 432, right: 432 },
  { id: 'theta', title: 'Theta', hz: '6 Hz vuru', left: 200, right: 206 },
  { id: 'delta', title: 'Delta', hz: '2 Hz vuru', left: 100, right: 102 },
];

const SKIN: Record<CyclePhase, { state: string; morning: string[]; night: string[]; avoid: string; acne: string; hair: string }> = {
  regl: {
    state: 'Bariyer daha hassas, cilt mat ve kuru hissedilebilir.',
    morning: ['Ilık su, nazik temizleyici', 'Seramid veya hyalüronik nem', 'Güneş koruma'],
    night: ['Aynı nazik temizleyici', 'Panthenol veya centella nem', 'Asit yok'],
    avoid: 'AHA, BHA, peeling ve yeni retinol.',
    acne: 'Sıkma. Sert köpük bariyeri daha da inceltir.',
    hair: 'Saç derisi hassas. Ağda ve lazeri ertele.',
  },
  folikuler: {
    state: 'Östrojen yükselirken cilt çoğu kişide daha dayanıklı ve nemli olur.',
    morning: ['C vitamini veya peptit', 'Hafif nem', 'Güneş koruma'],
    night: ['Toleransın varsa AHA veya retinol', 'Ardından nem', 'İlk denemede tek ürün'],
    avoid: 'Aynı anda birkaç yeni aktif.',
    acne: 'Bu pencere genelde daha sakindir. Kendi leke düzenini not et.',
    hair: 'Kanama bittikten sonraki günler ağda ve lazer için daha rahat penceredir.',
  },
  ovulasyon: {
    state: 'Parlaklık artabilir. Testosteronla yağ da artabilir.',
    morning: ['Niacinamide', 'Yağsız jel nem', 'Güneş koruma'],
    night: ['Gözenek için seyrek BHA', 'Ağır yağlı krem yok', 'Yeşil çay toniği isteğe bağlı'],
    avoid: 'Shea gibi ağır kapatıcılar ve yeni asit yığmak.',
    acne: 'Alın ve çene yağlanırsa tek BHA gecesi yeter. Her gün değil.',
    hair: 'Hâlâ uygun. Kızarıklık olursa bir gün bekle.',
  },
  luteal: {
    state: 'Progesteron gözenekleri ve çene hattını doldurabilir.',
    morning: ['Nazik temizleyici', 'Niacinamide', 'Jel nem ve güneş koruma'],
    night: ['BHA’yı bu hafta 2-3 gece', 'Bir gece kil maskesi', 'Nem katmanı ince olsun'],
    avoid: 'Ağır yağ, her gün asit, yeni ürün denemek.',
    acne: 'Adet öncesi alevlenme klinikte bilinen bir örüntüdür. Teşhis değildir.',
    hair: 'Saç daha yağlı görünebilir. Ağdayı kısalt.',
  },
  pms: {
    state: 'Son günlerde hassasiyet ve çene akneşi sık görülür.',
    morning: ['Ilık su', 'Centella veya seramid', 'Güneş koruma'],
    night: ['Bildiğin leke ürünün', 'Yeni asit yok', 'Peeling yok'],
    avoid: 'Retinol dozunu artırmak ve ovalamak.',
    acne: 'Çene ve çene altı. Elleri ciltten uzak tut.',
    hair: 'Sıkı topuz ve sıcak alet yok. Epilasyonu ertele.',
  },
};

interface GuideHubProps {
  phase: CyclePhase;
  cycleDay: number;
  cycleLength: number;
  periodLength: number;
  lastPeriodDate: string;
  signals: GuideSignals;
  openId: GuideId | null;
  onOpen: (id: GuideId) => void;
  onBack: () => void;
}

export function RehberTab({
  phase,
  cycleDay,
  cycleLength,
  periodLength,
  lastPeriodDate,
  onTitle,
  signals,
}: {
  phase: CyclePhase;
  cycleDay: number;
  cycleLength: number;
  periodLength: number;
  lastPeriodDate: string;
  onTitle?: (title: string) => void;
  signals: GuideSignals;
}) {
  const [guideId, setGuideId] = useState<GuideId | null>(null);
  useEffect(() => {
    onTitle?.(guideId ? SCREEN_TITLE[guideId] : 'Rehber');
  }, [guideId, onTitle]);
  return (
    <div className="pt-2">
      {guideId === null && (
        <div className="mb-3 px-1">
          <h2 className="text-[28px] font-semibold tracking-tight">Rehber</h2>
          <p className="text-[12px] text-[#9a8088] mb-3">Bugünün fazına göre.</p>
          <RehberAlerts phase={phase} />
        </div>
      )}
      <GuideHub
        phase={phase}
        cycleDay={cycleDay}
        cycleLength={cycleLength}
        periodLength={periodLength}
        lastPeriodDate={lastPeriodDate}
        signals={signals}
        openId={guideId}
        onOpen={setGuideId}
        onBack={() => setGuideId(null)}
      />
    </div>
  );
}

export function GuideHub({ phase, cycleDay, cycleLength, periodLength, lastPeriodDate, signals, openId, onOpen, onBack }: GuideHubProps) {
  const [info, setInfo] = useState<string | null>(null);
  const ratio = signals && signals.waterGoalMl > 0 ? signals.waterCurrentMl / signals.waterGoalMl : 1;
  const waterLow = ratio < 0.4;
  const focus = waterLow
    ? { id: 'balance' as GuideId, kicker: 'Bugün', title: 'Su eksik', body: 'Enerji halkası su kaydına bakıyor. Bir bardak ekle, denge ekranında durur.' }
    : phase === 'regl'
      ? { id: 'stretch' as GuideId, kicker: 'Bugün', title: 'Yumuşak hareket', body: 'Ağır seans gerekmez. Esneme ve ılık tabak daha uygun.' }
      : phase === 'folikuler'
        ? { id: 'training' as GuideId, kicker: 'Bugün', title: 'Güç seansı', body: 'Yükü kademeli artır. Isınmayı atlama.' }
        : phase === 'ovulasyon'
          ? { id: 'social' as GuideId, kicker: 'Bugün', title: 'Sosyal pil dolu', body: 'Kısa buluşma iyi gelir. Geceyi uzatma, eklemi ısıt.' }
          : phase === 'luteal'
            ? { id: 'recipes' as GuideId, kicker: 'Bugün', title: 'Tok tutan tabak', body: 'Tatlı isteği gelirse proteini artır, tuzu kıs.' }
            : { id: 'breath' as GuideId, kicker: 'Bugün', title: 'Nefesi uzat', body: 'Göndermeden ve spor rekorundan önce 4-7-8.' };
  const whisper = guideNote(phase);
  if (openId) {
    return (
      <GuideDetail
        id={openId}
        phase={phase}
        cycleDay={cycleDay}
        cycleLength={cycleLength}
        periodLength={periodLength}
        lastPeriodDate={lastPeriodDate}
        signals={signals}
        onBack={onBack}
      />
    );
  }

  return (
    <section className="floria-tab-grid space-y-7 pb-40">
      <button
        onClick={() => {
          soundEngine.playDropletSound();
          onOpen(focus.id);
        }}
        className="relative w-full overflow-hidden text-left rounded-[32px] bg-[#161314] text-white p-6 cursor-pointer"
      >
        <span className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-[#b0004a]/40 blur-2xl" />
        <p className="relative text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-200">{focus.kicker}</p>
        <p className="relative text-[28px] font-semibold tracking-tight mt-2 leading-none">{focus.title}</p>
        <p className="relative text-sm text-white/70 mt-3 leading-relaxed max-w-[28ch]">{focus.body}</p>
        <span className="relative inline-flex mt-5 items-center gap-2 text-[12px] font-semibold text-white">
          Aç
          <span className="h-px w-8 bg-white/40" />
        </span>
      </button>
      <div className="rounded-[28px] bg-white border border-[#f6e4ea] px-5 py-4 shadow-[0_10px_30px_rgba(22,19,20,0.04)]">
        <p className="text-[11px] font-bold tracking-[0.16em] text-[#e23b78]">BUGÜNÜN FISILTISI</p>
        <p className="text-sm leading-relaxed text-[#5c4a50] mt-2">{whisper}</p>
      </div>
      {SECTIONS.map((section) => (
        <div key={section.title} className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-[13px] font-semibold tracking-tight text-[#1f1a1c]">{section.title}</h3>
              <span className="text-[11px] text-[#9a8088]">{section.subtitle}</span>
            </div>
            <button
              onClick={() => {
                soundEngine.playDropletSound();
                setInfo(section.title);
              }}
              className="w-8 h-8 rounded-full bg-white border border-[#f0e4e8] text-[#b0004a] flex items-center justify-center cursor-pointer"
              aria-label={`${section.title} bilgisi`}
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className={`rounded-[30px] bg-gradient-to-br ${section.wash} p-2`}>
            <div className="grid grid-cols-3 gap-2">
              {section.boxes.map((box) => (
                <button
                  key={box.id}
                  onClick={() => {
                    soundEngine.playDropletSound();
                    onOpen(box.id);
                  }}
                  className="text-center rounded-[26px] bg-white/90 border border-white p-3 shadow-[0_10px_24px_rgba(176,0,74,0.06)] active:scale-[0.98] cursor-pointer min-h-[132px] flex flex-col items-center justify-between"
                >
                  <span className={`w-16 h-16 rounded-[22px] ${box.tint} flex items-center justify-center text-[32px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]`}>
                    {box.icon}
                  </span>
                  <span className="mt-2">
                    <span className="block text-[13px] font-semibold text-[#1f1a1c] leading-tight">{box.title}</span>
                    <span className="block text-[10px] text-[#9a8088] mt-1 leading-tight">{box.hint}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
      {info && (
        <div className="fixed inset-0 z-50 bg-[#161314]/45 backdrop-blur-[2px] flex items-end justify-center" onClick={() => setInfo(null)}>
          <div className="max-w-md w-full mx-3 mb-24 rounded-[28px] bg-[#fffdfb] p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b0004a]">Rehber</p>
            <p className="text-xl font-semibold tracking-tight mt-1">{info}</p>
            <p className="text-sm leading-relaxed text-[#5c4a50] mt-3">{SECTION_INFO[info]}</p>
            <button onClick={() => setInfo(null)} className="mt-5 px-4 py-2 rounded-full bg-[#161314] text-white text-xs font-semibold cursor-pointer">Kapat</button>
          </div>
        </div>
      )}
    </section>
  );
}

const SCREEN_LOOK: Record<string, { name: string; sub: string; icon: string; chip: string }> = {
  'Tarif ve menü': { name: 'Tarif', sub: 'Günün menüsü', icon: '🥣', chip: 'Beslenme' },
  'Market listesi': { name: 'Market', sub: 'Haftalık liste', icon: '🧺', chip: 'Beslenme' },
  Denge: { name: 'Denge', sub: 'Tohum ve kafein', icon: '⚖️', chip: 'Beslenme' },
  Antrenman: { name: 'Antrenman', sub: 'Faza göre seans', icon: '🏋️', chip: 'Egzersiz' },
  'Enerji ve eklem': { name: 'Enerji', sub: 'Güç ve eklem', icon: '⚡', chip: 'Egzersiz' },
  Esneme: { name: 'Esneme', sub: 'Poz akışı', icon: '🧘', chip: 'Egzersiz' },
  'Ses banyosu': { name: 'Ses', sub: 'Ses banyosu', icon: '🎧', chip: 'Sanctuary' },
  'Nefes ve uyku': { name: 'Nefes', sub: 'Uyku geçişi', icon: '🌙', chip: 'Sanctuary' },
  'Cilt ve epilasyon': { name: 'Cilt', sub: 'Bakım takvimi', icon: '✨', chip: 'Sanctuary' },
};

const SCREEN_DESCRIPTION: Record<string, string> = {
  "Tarif ve menü": "Tariflere göz at ve günün öğünlerini planla.",
  "Market listesi": "Öğün planındaki malzemeleri alışveriş listende işaretle.",
  "Denge": "Tohum ve kafein önerilerini incele.",
  "Antrenman": "Egzersiz seçeneklerini ve hareketlerin uygulamasını incele.",
  "Enerji ve eklem": "Enerji ve eklem konforuna göre hareket seçeneklerini keşfet.",
  "Esneme": "Esneme pozlarını ve bekleme sürelerini adım adım takip et.",
  "Ses banyosu": "Bir ses seç ve 20 saniyelik dinleme molası ver.",
  "Nefes ve uyku": "Bir ritim seç, nefes adımlarını ve uyku için üç turu ekrandan takip et."
};

function Shell({ title, phase, onBack, children }: { title: string; phase: CyclePhase; onBack: () => void; children: React.ReactNode }) {
  const look = SCREEN_LOOK[title] ?? { name: title, sub: PHASE_LABEL[phase], icon: '🌸', chip: 'Rehber' };
  return (
    <div className="space-y-3 pb-40 pt-1 text-[#1f1a1c]">
      <GuideTop chip={look.chip} onBack={onBack} />
      <GuideIntro icon={look.icon} name={look.name} sub={look.sub} description={SCREEN_DESCRIPTION[title] ?? look.sub} />
      {children}
    </div>
  );
}

function GuideTop({ chip, onBack }: { chip: string; onBack: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => {
          soundEngine.playDropletSound();
          onBack();
        }}
        className="flex items-center gap-1 rounded-full bg-white border border-[#f3e7eb] px-3 py-2 text-xs font-semibold cursor-pointer"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Rehbere Dön
      </button>
      <span className="rounded-full bg-[#fde7ef] text-[#e23b78] px-3 py-2 text-xs font-bold">{chip}</span>
    </div>
  );
}

function GuideIntro({ icon, name, sub, description }: { icon: string; name: string; sub: string; description: string }) {
  return (
    <div className="rounded-[28px] bg-white border border-[#f6e4ea] p-4 shadow-[0_10px_30px_rgba(22,19,20,0.04)]">
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-[18px] bg-[#fff4d8] flex items-center justify-center text-2xl shrink-0">{icon}</div>
        <div className="min-w-0">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[#e23b78]">FLORIA</p>
          <h2 className="text-[26px] font-black leading-none mt-1">{name}</h2>
          <p className="text-sm font-bold text-[#e23b78] mt-1">{sub}</p>
        </div>
      </div>
      <p className="text-[14px] leading-relaxed text-[#6d5a60] mt-3">{description}</p>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[28px] bg-white border border-[#f3e7eb] p-[18px] shadow-[0_10px_30px_rgba(22,19,20,0.04)] space-y-3">
      {children}
    </div>
  );
}

function GuideDetail({
  id,
  phase,
  cycleDay,
  cycleLength,
  periodLength,
  lastPeriodDate,
  signals,
  onBack,
}: {
  id: GuideId;
  phase: CyclePhase;
  cycleDay: number;
  cycleLength: number;
  periodLength: number;
  lastPeriodDate: string;
  signals: GuideSignals;
  onBack: () => void;
}) {
  if (isLifeId(id)) {
    return (
      <LifeScreen
        id={id}
        phase={phase}
        cycleDay={cycleDay}
        cycleLength={cycleLength}
        periodLength={periodLength}
        lastPeriodDate={lastPeriodDate}
        onBack={onBack}
      />
    );
  }
  if (id === 'recipes') return <Recipes phase={phase} cycleDay={cycleDay} onBack={onBack} />;
  if (id === 'market') return <Market phase={phase} cycleDay={cycleDay} cycleLength={cycleLength} periodLength={periodLength} onBack={onBack} />;
  if (id === 'balance') return <Balance phase={phase} onBack={onBack} />;
  if (id === 'training') return <Training phase={phase} onBack={onBack} />;
  if (id === 'energy') return <Energy phase={phase} signals={signals} onBack={onBack} />;
  if (id === 'stretch') return <Stretch phase={phase} onBack={onBack} />;
  if (id === 'sound') return <SoundBath phase={phase} onBack={onBack} />;
  if (id === 'breath') return <BreathSleep phase={phase} onBack={onBack} />;
  return <SkinCare phase={phase} cycleDay={cycleDay} cycleLength={cycleLength} onBack={onBack} />;
}

function Recipes({ phase, cycleDay, onBack }: { phase: CyclePhase; cycleDay: number; onBack: () => void }) {
  const [tab, setTab] = useState<CyclePhase>(phase);
  const hour = new Date().getHours();
  const nowWhen = hour < 11 ? 'Sabah' : hour < 15 ? 'Öğle' : hour < 18 ? 'Ara' : 'Akşam';
  const menu = menuFor(tab);
  const order: CyclePhase[] = ['regl', 'folikuler', 'ovulasyon', 'luteal', 'pms'];
  return (
    <Shell title="Tarif ve menü" phase={phase} onBack={onBack}>
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {order.map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${
              tab === key ? 'bg-[#b0004a] text-white' : 'bg-white text-[#805062] border border-pink-100'
            }`}
          >
            {PHASE_LABEL[key]}
          </button>
        ))}
      </div>
      <Card>
        <p className="text-[11px] font-black text-[#b0004a]">Bugün · {menu.name} · döngü {cycleDay}. gün</p>
        <p className="text-[11px] text-[#805062]">{menu.note} Yarın başka bir tabak gelir. Market aynı malzemeleri listeler.</p>
        {menu.meals.map((meal) => (
          <div key={meal.when} className={`py-2 border-b border-pink-50 last:border-0 ${meal.when === nowWhen ? 'bg-rose-50/80 -mx-2 px-2 rounded-2xl' : ''}`}>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-lg">{meal.icon}</span>
              <span>
                <span className="block text-[10px] font-black uppercase tracking-wide text-[#b0004a]">{meal.when}{meal.when === nowWhen ? ' · şimdi' : ''}</span>
                <span className="block text-xs font-black text-[#1f1a1c]">{meal.title}</span>
              </span>
            </div>
            <p className="text-[11px] text-[#5a4044] leading-relaxed mt-1.5">{meal.detail}</p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {meal.items.map((item) => (
                <span key={item} className="px-2 py-0.5 rounded-full bg-amber-50 text-[10px] font-semibold text-[#805062]">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </Shell>
  );
}

function Market({
  phase,
  cycleDay,
  cycleLength,
  periodLength,
  onBack,
}: {
  phase: CyclePhase;
  cycleDay: number;
  cycleLength: number;
  periodLength: number;
  onBack: () => void;
}) {
  const tomorrowPhase = phaseForCycleDay(cycleDay >= cycleLength ? 1 : cycleDay + 1, periodLength, cycleLength);
  const { today, rows } = marketLines(phase, tomorrowPhase);
  const storeKey = `flora-guide-market-${toLocalISO(new Date())}`;
  const [checks, setChecks] = useState<Record<string, boolean>>(() => readJson(storeKey, {}));
  const done = rows.filter((row) => checks[row.name]).length;
  const toggle = (name: string) => {
    setChecks((prev) => {
      const next = { ...prev, [name]: !prev[name] };
      writeJson(storeKey, next);
      return next;
    });
  };
  return (
    <Shell title="Market listesi" phase={phase} onBack={onBack}>
      <Card>
        <p className="text-xs font-black">{today.name}</p>
        <p className="text-[11px] text-[#805062]">
          Liste bugünkü menüden ve yarının fazından kurulur. {done}/{rows.length} alındı. İşaretler bu günde kalır.
        </p>
        <div className="h-1.5 rounded-full bg-amber-100 overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: `${rows.length ? (done / rows.length) * 100 : 0}%` }} />
        </div>
        {rows.map((row) => (
          <button
            key={row.name}
            onClick={() => toggle(row.name)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left cursor-pointer border ${
              checks[row.name] ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50/40 border-amber-100'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${checks[row.name] ? 'bg-emerald-500 text-white' : 'bg-white border border-pink-200'}`}>
              {checks[row.name] ? '✓' : ''}
            </span>
            <span>
              <span className={`block text-xs font-semibold ${checks[row.name] ? 'line-through text-[#805062]' : ''}`}>{row.name}</span>
              <span className="block text-[10px] text-[#805062]">{row.why}</span>
            </span>
          </button>
        ))}
      </Card>
    </Shell>
  );
}

type BalanceDay = { coffee: number; alcohol: number; water: number; seed: boolean; sweet: boolean };

function Balance({ phase, onBack }: { phase: CyclePhase; onBack: () => void }) {
  const today = toLocalISO(new Date());
  const seedEarly = phase === 'regl' || phase === 'folikuler';
  const tips = [
    'Öğünü atlama. Açlık tatlı krizini büyütür.',
    'Tuzu akşam kıs. Şişlik sabaha kalmaz.',
    'Son kahveyi 14:00’te bırak.',
    'Bir kase yoğurt, bir elma, bir avuç çekirdek.',
  ];
  const tip = tips[new Date().getDate() % tips.length];
  const [log, setLog] = useState<Record<string, BalanceDay>>(() => readJson('flora-guide-balance', {}));
  const current = log[today] ?? { coffee: 0, alcohol: 0, water: 0, seed: false, sweet: false };
  const save = (patch: Partial<BalanceDay>) => {
    setLog((prev) => {
      const next = { ...prev, [today]: { ...current, ...patch } };
      const keys = Object.keys(next).sort();
      const trimmed: Record<string, BalanceDay> = {};
      keys.slice(-21).forEach((key) => {
        trimmed[key] = next[key];
      });
      writeJson('flora-guide-balance', trimmed);
      return trimmed;
    });
  };
  const sensitive = phase === 'luteal' || phase === 'pms';
  const note =
    current.coffee >= 3 || current.alcohol >= 2
      ? 'Bu miktar uykuyu ve su tutulumunu bozar. Yarın yarıya indir.'
      : sensitive && (current.coffee >= 2 || current.alcohol >= 1)
        ? 'Bu fazda aynı miktar daha sert gelir. Öğleden sonra kahveyi kes.'
        : 'Bugünkü tempo faza uygun.';
  const week = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = toLocalISO(date);
    return { key, label: date.getDate(), row: log[key] };
  });
  return (
    <Shell title="Denge" phase={phase} onBack={onBack}>
      <Card>
        <p className="text-xs font-black">Bugünün notu</p>
        <p className="text-xs leading-relaxed">{tip}</p>
        <p className="text-xs leading-relaxed">
          {seedEarly
            ? 'Tohum: 1 yemek kaşığı kabak çekirdeği + 1 yemek kaşığı keten. Sabah yoğurda.'
            : 'Tohum: 1 yemek kaşığı susam + 1 yemek kaşığı ayçiçeği. Öğle salatasına.'}
        </p>
        <button
          onClick={() => save({ seed: !current.seed })}
          className={`px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${current.seed ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800'}`}
        >
          {current.seed ? 'Tohum alındı' : 'Tohumu işaretle'}
        </button>
      </Card>
      <Card>
        <p className="text-xs font-black">Su ve tatlı</p>
        <div className="flex items-center justify-between text-xs">
          <span>Su bardağı · {current.water}</span>
          <button onClick={() => save({ water: Math.min(12, current.water + 1) })} className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 font-bold cursor-pointer">+1</button>
        </div>
        <button
          onClick={() => save({ sweet: !current.sweet })}
          className={`px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${current.sweet ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-800'}`}
        >
          {current.sweet ? 'Tatlı krizi vardı' : 'Tatlı krizi yok'}
        </button>
        <p className="text-[11px] text-[#805062]">Şeker yerine protein ve lif. Ödem için tuzu kıs, akşam bacakları yukarı. Bitki kürü ilaç değildir.</p>
      </Card>
      <Card>
        <p className="text-xs font-black">Kafein ve alkol</p>
        <label className="flex items-center justify-between text-xs">
          Kahve fincanı
          <input type="number" min={0} max={8} value={current.coffee} onChange={(event) => save({ coffee: Number(event.target.value) || 0 })} className="w-16 rounded-lg border border-pink-200 px-2 py-1 text-right" />
        </label>
        <label className="flex items-center justify-between text-xs">
          Alkol kadeh
          <input type="number" min={0} max={8} value={current.alcohol} onChange={(event) => save({ alcohol: Number(event.target.value) || 0 })} className="w-16 rounded-lg border border-pink-200 px-2 py-1 text-right" />
        </label>
        <p className="text-[11px] text-[#805062] leading-relaxed">{note}</p>
        <div className="flex items-end justify-between gap-1 h-16 pt-2">
          {week.map((day) => (
            <div key={day.key} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full h-10 bg-pink-50 rounded-full overflow-hidden flex items-end">
                <div className="w-full bg-[#d81b60]" style={{ height: `${Math.min(100, ((day.row?.coffee || 0) + (day.row?.alcohol || 0)) * 25)}%` }} />
              </div>
              <span className="text-[9px] text-[#805062]">{day.label}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-[#805062]">Son 7 gün bu cihazda durur. Sıfırlama hepsini siler.</p>
      </Card>
    </Shell>
  );
}

function Training({ phase, onBack }: { phase: CyclePhase; onBack: () => void }) {
  const plan = TRAINING[phase];
  const blocks = [...plan.moves, ...EXTRA_DRILLS];
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(blocks[0].seconds);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const block = blocks[Math.min(index, blocks.length - 1)];

  useEffect(() => {
    if (!running || finished) return;
    const timer = window.setInterval(() => {
      setLeft((value) => (value > 1 ? value - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, finished, index]);

  useEffect(() => {
    if (!running || left !== 0 || finished) return;
    setRunning(false);
    setLeft(blocks[index]?.seconds ?? 30);
    writeJson('flora-guide-workout', { text: blocks[index]?.name ?? plan.type, at: Date.now() });
  }, [running, left, finished, index, blocks, plan.type]);

  const spent = blocks.slice(0, index).reduce((sum, item) => sum + item.seconds, 0) + (finished ? block.seconds : block.seconds - left);
  const total = blocks.reduce((sum, item) => sum + item.seconds, 0);
  const ratio = total > 0 ? Math.max(0, Math.min(1, spent / total)) : 0;

  return (
    <Shell title="Antrenman" phase={phase} onBack={onBack}>
      <div className="overflow-hidden rounded-[32px] bg-white border border-[#f3e7eb] shadow-[0_10px_30px_rgba(22,19,20,0.04)]">
        <img src={block.image} alt={block.name} className="h-64 w-full object-cover" />
        <div className="px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b0004a]">{plan.type}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0">
              <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(#161314 ${ratio * 360}deg, #f4e7eb 0deg)` }} />
              <div className="absolute inset-[5px] rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl font-semibold tabular-nums">{finished ? '00' : String(Math.max(0, left)).padStart(2, '0')}</span>
              </div>
            </div>
            <div className="min-w-0 text-left">
              <p className="text-xl font-semibold tracking-tight">{finished ? 'Seans bitti' : block.name}</p>
              <p className="mt-1 text-sm text-[#5c4a50] leading-relaxed">{finished ? plan.type : block.cue}</p>
            </div>
          </div>
        <p className="mt-3 text-xs text-[#9a8088] leading-relaxed">{plan.avoid} İstediğin harekete dokun.</p>
          <button
            onClick={() => {
              if (finished) {
                setFinished(false);
                setIndex(0);
                setLeft(blocks[0].seconds);
                setRunning(true);
                return;
              }
              setRunning((value) => !value);
            }}
            className="mt-4 w-full rounded-full bg-[#161314] text-white py-3 text-sm font-semibold cursor-pointer"
          >
            {finished ? 'Yeniden başlat' : running ? 'Duraklat' : 'Seansı başlat'}
          </button>
        </div>
      </div>
      <div className="rounded-[28px] bg-white border border-[#f3e7eb] p-2">
        {blocks.map((item, itemIndex) => {
          const active = itemIndex === index && !finished;
          const past = itemIndex < index || finished;
          return (
            <button
              type="button"
              key={item.name}
              onClick={() => {
                soundEngine.playDropletSound();
                setRunning(false);
                setFinished(false);
                setIndex(itemIndex);
                setLeft(item.seconds);
              }}
              className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left cursor-pointer ${active ? 'bg-[#161314] text-white' : ''}`}
            >
              <img src={item.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <span className="flex-1 min-w-0">
                <span className={`block text-sm font-semibold ${active ? '' : past ? 'text-[#9a8088]' : ''}`}>{item.name}</span>
                <span className={`block text-[11px] truncate ${active ? 'text-white/60' : 'text-[#9a8088]'}`}>{item.cue}</span>
              </span>
              <span className={`text-[11px] tabular-nums ${active ? 'text-white/70' : 'text-[#9a8088]'}`}>{item.seconds} sn</span>
            </button>
          );
        })}
      </div>
    </Shell>
  );
}

function Energy({ phase, signals = EMPTY_SIGNALS, onBack }: { phase: CyclePhase; signals?: GuideSignals; onBack: () => void }) {
  const base = ENERGY[phase];
  const symptoms = signals.symptoms ?? [];
  const water = signals.waterGoalMl > 0 ? signals.waterCurrentMl / signals.waterGoalMl : 0;
  const moodBoost = signals.mood === 'Canlı & Pozitif' ? 8 : signals.mood === 'Sakin' ? 4 : signals.mood === 'Yorgun' ? -12 : signals.mood === 'Sinirli' ? -8 : signals.mood === 'Hassas' ? -4 : 0;
  const symptomDrop = Math.min(12, symptoms.length * 3);
  const supplementBoost = signals.supplementsTotal > 0 ? Math.round((signals.supplementsTaken / signals.supplementsTotal) * 6) : 0;
  const score = Math.max(12, Math.min(98, base.level + Math.round(water * 10) + moodBoost - symptomDrop + supplementBoost));
  const rows = [
    { label: 'Faz', value: `${base.level}` },
    { label: 'Su', value: water >= 0.7 ? 'dolu' : water > 0 ? 'eksik' : 'yok' },
    { label: 'Ruh hali', value: signals.mood || 'seçilmedi' },
    { label: 'Belirti', value: symptoms.length ? `${symptoms.length}` : 'yok' },
    { label: 'Takviye', value: `${signals.supplementsTaken}/${signals.supplementsTotal}` },
  ];
  return (
    <Shell title="Enerji ve eklem" phase={phase} onBack={onBack}>
      <Card>
        <div className="flex items-center gap-4">
          <div className="relative w-28 h-28 shrink-0">
            <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(#d81b60 ${score * 3.6}deg, #fde7ef 0deg)` }} />
            <div className="absolute inset-2 rounded-full bg-white flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-[#b0004a]">{score}</span>
              <span className="text-[9px] text-[#805062]">senkron</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-black">Bugünkü güç</p>
            <p className="text-xs leading-relaxed mt-1">{base.joint}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          {rows.map((row) => (
            <div key={row.label} className="rounded-2xl bg-amber-50 px-3 py-2">
              <p className="text-[10px] text-[#805062]">{row.label}</p>
              <p className="text-xs font-black">{row.value}</p>
            </div>
          ))}
        </div>
      </Card>
    </Shell>
  );
}

function Stretch({ phase, onBack }: { phase: CyclePhase; onBack: () => void }) {
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const item = STRETCHES[index];
  const seconds = item.hold.includes('tur') ? 40 : parseInt(item.hold, 10) || 40;

  useEffect(() => {
    if (!running || left <= 0) return;
    const timer = window.setInterval(() => {
      setLeft((value) => (value > 1 ? value - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, index]);

  useEffect(() => {
    if (!running || left !== 0) return;
    setRunning(false);
  }, [running, left]);

  const poseRatio = running ? Math.max(0, Math.min(1, 1 - left / seconds)) : 0;

  return (
    <Shell title="Esneme" phase={phase} onBack={onBack}>
      <div className="overflow-hidden rounded-[32px] bg-white border border-[#f3e7eb] shadow-[0_10px_30px_rgba(22,19,20,0.04)]">
        <img src={item.image} alt={item.name} className="h-64 w-full object-cover" />
        <div className="px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3f6f62]">
            {phase === 'regl' || phase === 'pms' ? 'Yumuşak akış' : 'Hareket akışı'}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0">
              <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(#1f4d42 ${poseRatio * 360}deg, #e7f3ef 0deg)` }} />
              <div className="absolute inset-[5px] rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl font-semibold tabular-nums">{running ? left : seconds}</span>
              </div>
            </div>
            <div className="min-w-0 text-left">
              <p className="text-xl font-semibold tracking-tight">{item.name}</p>
              <p className="mt-1 text-sm text-[#5c4a50] leading-relaxed">{item.note} İstediğin poza dokun.</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (!running) setLeft(seconds);
              setRunning((value) => !value);
              soundEngine.playDropletSound();
            }}
            className="mt-5 w-full rounded-full bg-[#10221c] text-white py-3 text-sm font-semibold cursor-pointer"
          >
            {running ? 'Duraklat' : 'Akışı başlat'}
          </button>
        </div>
      </div>
      <div className="rounded-[28px] bg-white border border-[#f3e7eb] p-2">
        {STRETCHES.map((pose, poseIndex) => {
          const active = poseIndex === index;
          return (
            <button
              type="button"
              key={pose.name}
              onClick={() => {
                soundEngine.playDropletSound();
                const nextSeconds = pose.hold.includes('tur') ? 40 : parseInt(pose.hold, 10) || 40;
                setRunning(false);
                setIndex(poseIndex);
                setLeft(nextSeconds);
              }}
              className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left cursor-pointer ${active ? 'bg-[#10221c] text-white' : ''}`}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold ${active ? 'bg-white/15' : 'bg-[#eef6f3] text-[#1f4d42]'}`}>
                {poseIndex + 1}
              </span>
              <img src={pose.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <span className="flex-1 min-w-0 text-left">
                <span className="block text-sm font-semibold">{pose.name}</span>
                <span className={`block text-[11px] truncate ${active ? 'text-white/60' : 'text-[#9a8088]'}`}>{pose.note}</span>
              </span>
              <span className={`text-[11px] ${active ? 'text-white/70' : 'text-[#9a8088]'}`}>{pose.hold}</span>
            </button>
          );
        })}
      </div>
    </Shell>
  );
}

function SoundBath({ phase, onBack }: { phase: CyclePhase; onBack: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [left, setLeft] = useState(20);
  const [error, setError] = useState(false);

  const stop = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    setPlaying(null);
  };

  useEffect(() => () => {
    audioRef.current?.pause();
    audioRef.current = null;
  }, []);

  const play = async (sound: (typeof SOUNDS)[number]) => {
    stop();
    setError(false);
    setLeft(20);
    const audio = new Audio(`/sounds/${sound.id}.wav`);
    audioRef.current = audio;
    audio.ontimeupdate = () => setLeft(Math.max(0, Math.ceil(20 - audio.currentTime)));
    audio.onended = () => { if (audioRef.current === audio) stop(); };
    audio.onerror = () => {
      if (audioRef.current !== audio) return;
      stop();
      setError(true);
    };
    try {
      await audio.play();
      if (audioRef.current === audio) setPlaying(sound.id);
    } catch {
      if (audioRef.current !== audio) return;
      stop();
      setError(true);
    }
  };

  const current = SOUNDS.find((sound) => sound.id === playing);
  const ratio = playing ? Math.max(0, Math.min(1, (20 - left) / 20)) : 0;

  return (
    <Shell title="Ses banyosu" phase={phase} onBack={onBack}>
      <style>{`
        @keyframes flora-drift { from { transform: scale(1.06); } to { transform: scale(1.14) translate3d(-1.5%, -1%, 0); } }
        @keyframes flora-ripple { 0% { transform: translateX(-50%) scaleX(0.35); opacity: 0; } 25% { opacity: 0.55; } 100% { transform: translateX(-50%) scaleX(1.8); opacity: 0; } }
        @keyframes flora-moon { 0%,100% { opacity: 0.25; } 50% { opacity: 0.7; } }
      `}</style>
      <div className="relative overflow-hidden rounded-[36px] h-[480px] shadow-[0_20px_50px_rgba(22,19,20,0.18)]">
        <img
          src="/sounds/gece.jpg"
          alt="Ay ışığında durgun göl"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ animation: playing ? 'flora-drift 16s ease-in-out infinite alternate' : undefined }}
        />
        <div
          className="absolute left-[46%] top-[18%] h-16 w-16 -translate-x-1/2 rounded-full bg-white/40 blur-xl"
          style={{ animation: playing ? 'flora-moon 3.5s ease-in-out infinite' : undefined }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-[18%] h-28">
          {(playing ? [0, 0.8, 1.6, 2.4] : []).map((delay) => (
            <span
              key={delay}
              className="absolute left-[48%] bottom-2 h-8 w-40 rounded-[100%] border border-white/70"
              style={{ animation: `flora-ripple 3.2s ease-out infinite ${delay}s` }}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-5 pb-5 pt-16 text-white">
          <p className="text-[11px] tracking-[0.18em] uppercase text-white/70">{playing ? current?.hz : 'Gece'}</p>
          <p className="text-3xl font-semibold tracking-tight mt-1">{current ? current.title : 'Ayın altındaki göl'}</p>
          <p className="text-sm text-white/80 mt-1">{playing ? `${left} saniye` : '20 saniyelik ses'}</p>
          <div className="mt-3 h-1 rounded-full bg-white/25 overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${ratio * 100}%` }} />
          </div>
        </div>
      </div>
      <p className="text-[11px] text-[#9a8088] px-1">Kulaklıkla dinle. Ses kısık başlar. Tedavi değildir.</p>
      {error && <p role="alert" className="px-1 text-sm text-rose-800">Ses başlatılamadı. Medya sesini kontrol edip tekrar dene.</p>}
      {SOUNDS.map((sound) => (
        <Card key={sound.id}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-xl">
                {sound.id === '432' ? '🎧' : sound.id === 'theta' ? '🌊' : '🌌'}
              </span>
              <div>
                <p className="text-xs font-black">{sound.title}</p>
                <p className="text-[11px] text-[#805062]">{sound.hz}</p>
              </div>
            </div>
            <button
              onClick={() => (playing === sound.id ? stop() : play(sound))}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${playing === sound.id ? 'bg-fuchsia-600 text-white' : 'bg-[#1f1a1c] text-white'}`}
            >
              {playing === sound.id ? 'Durdur' : 'Dinle'}
            </button>
          </div>
        </Card>
      ))}
      <Journal />
    </Shell>
  );
}

const BREATHS = [
  {
    id: '478',
    name: '4-7-8',
    use: 'Uyku',
    steps: [
      { n: 4, label: 'Al', cue: 'Burundan. Göğüs açılıyor' },
      { n: 7, label: 'Tut', cue: 'Nefesi tut' },
      { n: 8, label: 'Ver', cue: 'Ağızdan yavaş bırak' },
    ],
    learn: 'Dört saniye al, yedi tut, sekiz ver. Veriş daha uzun olduğu için ritim yavaşlar. Yatmadan üç tur yeter.',
  },
  {
    id: 'box',
    name: 'Kutu',
    use: 'Odak',
    steps: [
      { n: 4, label: 'Al', cue: 'Göğüs açılıyor' },
      { n: 4, label: 'Tut', cue: 'Dolu tut' },
      { n: 4, label: 'Ver', cue: 'Yavaş bırak' },
      { n: 4, label: 'Bekle', cue: 'Boşta kal' },
    ],
    learn: 'Dört kenar eşit: al, tut, ver, boşta bekle. Zihin dağınıkken veya bir işe başlamadan dört tur.',
  },
  {
    id: '55',
    name: '5-5',
    use: 'Sakin',
    steps: [
      { n: 5, label: 'Al', cue: 'Burundan, sessiz' },
      { n: 5, label: 'Ver', cue: 'Aynı uzunlukta bırak' },
    ],
    learn: 'Alış ve veriş eşit, tutuş yok. Dakikada yaklaşık altı nefes. Gün içinde en kolay ritim budur.',
  },
  {
    id: 'sigh',
    name: 'Çift çekiş',
    use: 'Boşalt',
    steps: [
      { n: 2, label: 'Al', cue: 'Burundan kısa bir çekiş' },
      { n: 1, label: 'Ek', cue: 'Üstüne bir çekiş daha' },
      { n: 6, label: 'Ver', cue: 'Ağızdan uzun bırak' },
    ],
    learn: 'İki kısa alış, bir uzun veriş. Gergin anda bir veya iki tur. Bunu bütün gün tempo yapma.',
  },
] as const;

function BreathSleep({ phase, onBack }: { phase: CyclePhase; onBack: () => void }) {
  const [techId, setTechId] = useState<(typeof BREATHS)[number]['id']>('478');
  const tech = BREATHS.find((item) => item.id === techId) ?? BREATHS[0];
  const [step, setStep] = useState(0);
  const [left, setLeft] = useState<number>(tech.steps[0].n);
  const [on, setOn] = useState(false);
  const stepRef = useRef(0);
  const [sleep, setSleep] = useState(false);
  const [rounds, setRounds] = useState(0);
  const current = tech.steps[Math.min(step, tech.steps.length - 1)];

  useEffect(() => {
    if (!on) return;
    const timer = window.setInterval(() => {
      setLeft((value) => (value > 1 ? value - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [on, step]);

  useEffect(() => {
    if (!on || left !== 0) return;
    const next = (stepRef.current + 1) % tech.steps.length;
    if (sleep && next === 0) {
      setRounds(rounds + 1);
      if (rounds === 2) setOn(false);
    }
    stepRef.current = next;
    setStep(next);
    setLeft(tech.steps[next].n);
  }, [on, left, step, tech, rounds, sleep]);

  const open = current.label === 'Al' || current.label === 'Ek' || current.label === 'Tut';
  const breathScale = !on ? 1.04 : current.label === 'Ek' ? 1.16 : open ? 1.12 : 1;
  const breathSeconds = !on ? 1.4 : current.n;

  return (
    <Shell title="Nefes ve uyku" phase={phase} onBack={onBack}>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {BREATHS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              soundEngine.playDropletSound();
              setOn(false);
              setSleep(false);
              setRounds(0);
              setTechId(item.id);
              setStep(0);
              stepRef.current = 0;
              setLeft(item.steps[0].n);
            }}
            className={`shrink-0 rounded-full px-3 py-2 text-left cursor-pointer ${item.id === tech.id ? 'bg-[#1f1a1c] text-white' : 'bg-white border border-[#f3e7eb]'}`}
          >
            <span className="block text-xs font-black">{item.name}</span>
            <span className={`block text-[10px] ${item.id === tech.id ? 'text-white/70' : 'text-[#9a8088]'}`}>{item.use}</span>
          </button>
        ))}
      </div>
      <div className="relative overflow-hidden rounded-[36px] h-[460px] shadow-[0_20px_50px_rgba(22,19,20,0.18)]">
        <img
          src="/sounds/nefes.jpg"
          alt="Pencerede gözleri kapalı, elini kaburgasında tutan kadın"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transform: `scale(${breathScale})`,
            transition: `transform ${breathSeconds}s ease-in-out`,
          }}
        />
        <div
          className="absolute left-[58%] top-[46%] h-28 w-28 rounded-full bg-white/30 blur-2xl"
          style={{
            opacity: !on || !open ? 0.2 : 0.55,
            transform: `translate(-50%, -50%) scale(${breathScale})`,
            transition: `opacity ${breathSeconds}s ease-in-out, transform ${breathSeconds}s ease-in-out`,
          }}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent px-5 pb-5 pt-20 text-white">
          <p className="text-[11px] tracking-[0.18em] uppercase text-white/70">{tech.name}</p>
          <p className="text-4xl font-semibold tracking-tight mt-1">{on ? left : current.n}</p>
          <p className="text-sm text-white/85 mt-1">{current.label} · {current.cue}</p>
          <button
            onClick={() => setOn((value) => !value)}
            className="mt-4 px-5 py-2.5 rounded-full bg-white text-[#1f1a1c] text-xs font-semibold cursor-pointer"
          >
            {on ? 'Durdur' : 'Nefese başla'}
          </button>
        </div>
      </div>
      <Card>
        <p className="text-xs font-black">{tech.name} nasıl yapılır</p>
        <p className="text-sm leading-relaxed text-[#5a4044]">{tech.learn}</p>
        <p className="text-[11px] text-[#9a8088]">Pratik ritmi. Tedavi değildir. Baş dönmesi olursa bırak.</p>
      </Card>
      <Card>
        <p className="text-xs font-black">Uykuya geçiş</p>
        <progress className="block h-2 w-full accent-[#b0004a]" max={3} value={rounds} aria-label="Tamamlanan uyku turları" />
        <p className="text-xs text-[#5a4044]">{rounds} / 3 tur</p>
        <button type="button" className="rounded-full bg-[#4a1230] px-4 py-2 text-sm text-white" onClick={() => {
          setTechId('478');
          stepRef.current = 0;
          setStep(0);
          setLeft(BREATHS[0].steps[0].n);
          setRounds(0);
          setSleep(true);
          setOn(true);
        }}>3 turluk uyku ritmini başlat</button>
        <p className="text-xs leading-relaxed text-[#5a4044]">
          Işığı kıs. Ayaklar sıcak, oda serin. 4-7-8 ile üç tur yap, sonra 5-5 ritmine geç. Cümleler seyrekleşince saymayı bırak.
        </p>
      </Card>
    </Shell>
  );
}

function Journal() {
  const [text, setText] = useState(() => {
    try {
      return localStorage.getItem('flora-guide-notes') || '';
    } catch {
      return '';
    }
  });
  const [voiceUrl, setVoiceUrl] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const recRef = useRef<MediaRecorder | null>(null);

  const save = (value: string) => {
    setText(value);
    try {
      localStorage.setItem('flora-guide-notes', value);
    } catch {
      /* ignore */
    }
  };

  const toggleRec = async () => {
    if (recording && recRef.current) {
      recRef.current.stop();
      setRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      rec.ondataavailable = (event) => {
        if (event.data.size) chunks.push(event.data);
      };
      rec.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        const url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType }));
        setVoiceUrl(url);
      };
      recRef.current = rec;
      rec.start();
      setRecording(true);
    } catch {
      setRecording(false);
    }
  };

  return (
    <Card>
      <p className="text-xs font-black">Duygusal günlük</p>
      <textarea
        value={text}
        onChange={(e) => save(e.target.value)}
        placeholder="Bugün bedende ne var?"
        className="w-full min-h-24 rounded-xl border border-pink-200 p-3 text-xs"
      />
      <button onClick={toggleRec} className="px-3 py-1.5 rounded-full bg-[#1f1a1c] text-white text-[11px] font-bold cursor-pointer">
        {recording ? 'Kaydı bitir' : 'Sesli not'}
      </button>
      {voiceUrl && <audio src={voiceUrl} controls className="w-full" />}
    </Card>
  );
}

function SkinCare({
  phase,
  cycleDay,
  cycleLength,
  onBack,
}: {
  phase: CyclePhase;
  cycleDay: number;
  cycleLength: number;
  onBack: () => void;
}) {
  const info = SKIN[phase];
  const calmStart = 6;
  const calmEnd = Math.max(calmStart + 2, Math.min(14, cycleLength - 15));
  const tones: Record<CyclePhase, { label: string; bar: string; soft: string; ink: string }> = {
    regl: { label: 'Kanama', bar: 'bg-rose-500', soft: 'bg-rose-50', ink: 'text-rose-700' },
    folikuler: { label: 'Foliküler', bar: 'bg-emerald-500', soft: 'bg-emerald-50', ink: 'text-emerald-800' },
    ovulasyon: { label: 'Doğurgan pencere', bar: 'bg-amber-400', soft: 'bg-amber-50', ink: 'text-amber-800' },
    luteal: { label: 'Luteal', bar: 'bg-violet-500', soft: 'bg-violet-50', ink: 'text-violet-800' },
    pms: { label: 'Adet öncesi', bar: 'bg-fuchsia-500', soft: 'bg-fuchsia-50', ink: 'text-fuchsia-800' },
  };
  const tone = tones[phase];
  const order: CyclePhase[] = ['regl', 'folikuler', 'ovulasyon', 'luteal', 'pms'];

  return (
    <div className="space-y-4 pb-40 pt-1 text-[#1f1a1c]">
      <GuideTop chip="Sanctuary" onBack={onBack} />
      <div className="flex items-start gap-3.5">
        <div className="w-16 h-16 rounded-[22px] bg-[#fde7ef] flex items-center justify-center text-[28px] shrink-0">✨</div>
        <div className="min-w-0 pt-0.5">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[#e23b78]">FLORIA</p>
          <h2 className="text-[28px] font-black leading-none mt-1">Cilt</h2>
          <p className="text-[15px] font-bold mt-1">Bakım takvimi</p>
        </div>
      </div>
      <p className="text-[15px] leading-relaxed text-[#6d5a60]">Bakım önerilerini incele ve epilasyon için takvimdeki günlere göz at.</p>

      <div className={`rounded-[28px] bg-gradient-to-br ${phase === 'folikuler' ? 'from-emerald-100 via-white to-teal-50' : phase === 'ovulasyon' ? 'from-amber-100 via-white to-orange-50' : phase === 'luteal' ? 'from-violet-100 via-white to-fuchsia-50' : phase === 'pms' ? 'from-fuchsia-100 via-white to-rose-50' : 'from-rose-100 via-white to-pink-50'} border border-white p-4 shadow-sm`}>
        <div className="flex items-center justify-between gap-2">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold text-white ${tone.bar}`}>{tone.label}</span>
          <span className="text-[11px] font-semibold text-[#805062]">Döngü {cycleDay}. gün</span>
        </div>
        <p className="text-lg font-black mt-3 leading-snug">{info.state}</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {order.map((key) => {
          const on = key === phase;
          return (
            <div key={key} className={`min-w-[148px] rounded-2xl p-3 ${on ? 'bg-[#1f1a1c] text-white' : tones[key].soft}`}>
              <span className={`block h-1.5 w-8 rounded-full mb-2 ${tones[key].bar}`} />
              <p className="text-[12px] font-black">{tones[key].label}</p>
              <p className={`text-[11px] mt-1 leading-snug ${on ? 'text-white/75' : 'text-[#5c4a50]'}`}>{SKIN[key].state}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-[24px] bg-gradient-to-b from-orange-100 to-amber-50 p-3.5">
          <p className="text-[11px] font-black uppercase tracking-wide text-orange-700">Sabah</p>
          <div className="mt-2 space-y-1.5">
            {info.morning.map((step) => (
              <p key={step} className="text-[12px] leading-snug font-medium">{step}</p>
            ))}
          </div>
        </div>
        <div className="rounded-[24px] bg-gradient-to-b from-indigo-100 to-violet-50 p-3.5">
          <p className="text-[11px] font-black uppercase tracking-wide text-indigo-700">Gece</p>
          <div className="mt-2 space-y-1.5">
            {info.night.map((step) => (
              <p key={step} className="text-[12px] leading-snug font-medium">{step}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[24px] bg-rose-50 p-3.5">
        <p className="text-[11px] font-black uppercase tracking-wide text-rose-700">Bugün uzak dur</p>
        <p className="text-sm mt-1 leading-relaxed">{info.avoid}</p>
      </div>
      <div className="rounded-[24px] bg-amber-50 p-3.5">
        <p className="text-[11px] font-black uppercase tracking-wide text-amber-800">Akne penceresi</p>
        <p className="text-sm mt-1 leading-relaxed">{info.acne}</p>
      </div>
      <div className="rounded-[24px] bg-emerald-50 p-3.5">
        <p className="text-[11px] font-black uppercase tracking-wide text-emerald-800">Saç ve epilasyon</p>
        <p className="text-sm mt-1 leading-relaxed">{info.hair}</p>
        <p className="text-[12px] mt-2 leading-relaxed text-[#3f4a3c]">
          Daha sakin aralık {calmStart}. ve {calmEnd}. günler. Bugün {cycleDay}. gün.
          {cycleDay >= calmStart && cycleDay <= calmEnd ? ' Bu aralıktasın.' : ' Kanama ve adet öncesi günlerde ertele.'}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {Array.from({ length: cycleLength }, (_, index) => {
            const day = index + 1;
            const calm = day >= calmStart && day <= calmEnd;
            const today = day === cycleDay;
            return (
              <span
                key={day}
                className={`h-2.5 w-2.5 rounded-full ${today ? 'bg-[#e23b78] ring-2 ring-rose-200' : calm ? 'bg-emerald-400' : 'bg-white'}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
