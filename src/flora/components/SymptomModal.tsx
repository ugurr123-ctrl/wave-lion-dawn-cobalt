import React, { useState } from 'react';
import { X, Check, Smile, Heart, Flame, Sparkles, Activity } from 'lucide-react';
import { DayInfo } from '../types';
import { FloraLogo } from './FloraLogo';
import { soundEngine } from '../utils/audio';

interface SymptomModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayInfo: DayInfo;
  onSave: (updated: Partial<DayInfo>) => void;
}

export const SymptomModal: React.FC<SymptomModalProps> = ({
  isOpen,
  onClose,
  dayInfo,
  onSave,
}) => {
  const [flow, setFlow] = useState<DayInfo['flow']>(dayInfo.flow || 'Yok');
  const [mood, setMood] = useState(dayInfo.mood || 'Mutlu');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(dayInfo.symptoms || []);
  const [libido, setLibido] = useState<DayInfo['libido']>(dayInfo.libido || 'Normal');
  const [discharge, setDischarge] = useState<DayInfo['discharge']>(dayInfo.discharge || 'Yok');
  const [dischargeColor, setDischargeColor] = useState<DayInfo['dischargeColor']>(dayInfo.dischargeColor || 'Yok');
  const [clots, setClots] = useState<DayInfo['clots']>(dayInfo.clots || 'Yok');
  const [crampWhere, setCrampWhere] = useState<DayInfo['crampWhere']>(dayInfo.crampWhere || 'Yok');
  const [intimacy, setIntimacy] = useState<DayInfo['intimacy']>(dayInfo.intimacy || 'Yok');
  const [sleep, setSleep] = useState<DayInfo['sleep']>(dayInfo.sleep || 'İyi');
  const [pain, setPain] = useState<DayInfo['pain']>(dayInfo.pain || 'Yok');
  const [note, setNote] = useState(dayInfo.note || '');
  const [energyLevel, setEnergyLevel] = useState<'Düşük' | 'Dengeli' | 'Zirve'>(
    dayInfo.mood?.includes('Canlı') || dayInfo.mood?.includes('Enerjik') ? 'Zirve' : 'Dengeli'
  );

  const symptomGroups: { title: string; items: string[] }[] = [
    { title: 'Kramp ve ağrı', items: ['Hafif kramp', 'Dalga dalga kramp', 'Şiddetli kramp', 'Kasılmalı kramp', 'Bel ağrısı', 'Belde yanma', 'Kasık ağrısı', 'Sağ kasık', 'Sol kasık', 'Bacakta ağrı', 'Baş ağrısı', 'Şakakta ağrı', 'Migren', 'Ense ağrısı', 'Eklem ağrısı', 'Kas ağrısı'] },
    { title: 'Kanama ayrıntısı', items: ['Lekelenme', 'Kahverengi leke', 'Pembe leke', 'Pıhtılı akış', 'Ani yoğunlaşma', 'Gece pedi', 'Kanama durdu'] },
    { title: 'Sindirim', items: ['Şişkinlik', 'Sert şişkinlik', 'Bulantı', 'Kusma', 'Gaz', 'Mide yanması', 'Kabızlık', 'İshal', 'İştah artışı', 'İştahsızlık', 'Tuz isteği', 'Tatlı isteği', 'Çikolata isteği'] },
    { title: 'Göğüs', items: ['Göğüs hassasiyeti', 'Dokununca acı', 'Göğüste dolgunluk', 'Göğüste ağırlık', 'Meme ucu hassasiyeti'] },
    { title: 'Cilt ve saç', items: ['Akne', 'Çene akne', 'Alın akne', 'Cilt kuruluğu', 'Cilt yağlanması', 'Kaşıntı', 'Saç dökülmesi', 'Saç yağlanması'] },
    { title: 'Vücut', items: ['Sıcak basması', 'Gece terlemesi', 'Üşüme', 'Titreme', 'Baş dönmesi', 'Göz kararması', 'Çarpıntı', 'Nefes darlığı', 'Yorgunluk', 'Bitkinlik', 'Enerji düşüklüğü', 'İdrar sızısı', 'Sık idrara çıkma', 'Ödem', 'El ayak şişliği'] },
    { title: 'Uyku', items: ['Uykuya dalamama', 'Gece uyanma', 'Erken uyanma', 'Kabus', 'Gündüz uykusu', 'Çok uyuma'] },
    { title: 'Ruh', items: ['Ağlama isteği', 'Kaygı', 'Panik hissi', 'Odak dağınıklığı', 'Unutkanlık', 'İçe kapanma', 'Gerginlik', 'Sabırsızlık', 'Yalnız hissetme', 'Motivasyon düşüklüğü'] },
  ];

  const moodList = [
    { label: 'Mutlu', icon: '🌸' },
    { label: 'Enerjik', icon: '⚡' },
    { label: 'Sakin', icon: '🕊️' },
    { label: 'Hassas', icon: '🥺' },
    { label: 'Yorgun', icon: '😴' },
    { label: 'Sinirli', icon: '🌩️' },
    { label: 'Kaygılı', icon: '💭' },
    { label: 'İçe kapanık', icon: '🌙' },
  ];

  const toggleSymptom = (sym: string) => {
    soundEngine.playDropletSound();
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const handleSave = () => {
    soundEngine.playCrystalChime();
    onSave({
      flow,
      mood: energyLevel === 'Zirve' ? `${mood} (Zirve Enerji)` : mood,
      symptoms: selectedSymptoms,
      libido,
      discharge,
      dischargeColor,
      clots,
      crampWhere,
      intimacy,
      sleep,
      pain,
      note: note.trim(),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-pink-100">
        {/* Header */}
        <div className="p-4 px-5 border-b border-[#f6ebed] flex items-center justify-between bg-gradient-to-r from-pink-50/50 to-rose-50/30">
          <div className="flex items-center gap-2.5">
            <FloraLogo size="sm" />
            <div>
              <h3 className="font-extrabold text-base text-[#1f1a1c] flex items-center gap-1.5">
                Günlük Belirti & Ruh Hali
              </h3>
              <p className="text-xs text-[#805062] font-medium">
                {dayInfo.date} • Döngü {dayInfo.cycleDay}. Gün
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black shadow-xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Flow Level */}
          <div>
            <label className="text-xs font-bold text-[#1f1a1c] mb-2 block">Kanama Yoğunluğu</label>
            <div className="grid grid-cols-4 gap-2">
              {(['Yok', 'Hafif', 'Normal', 'Yoğun'] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setFlow(item)}
                  className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    flow === item
                      ? 'bg-[#d81b60] text-white border-[#d81b60] shadow-sm scale-102'
                      : 'bg-[#fff8f8] text-[#5a4044] border-[#f0e6e8] hover:bg-[#ffd9de]/30'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            {flow !== 'Yok' && (
              <div className="mt-2">
                <label className="text-[11px] font-bold text-[#805062] mb-1.5 block">Pıhtı</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Yok', 'Az', 'Belirgin'] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setClots(item)}
                      className={`py-2 text-xs font-bold rounded-xl border cursor-pointer ${clots === item ? 'bg-[#d81b60] text-white border-[#d81b60]' : 'bg-white text-[#5a4044] border-pink-100'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-2">
              <label className="text-[11px] font-bold text-[#805062] mb-1.5 block">Kramp yeri</label>
              <div className="grid grid-cols-5 gap-1.5">
                {(['Yok', 'Karın', 'Bel', 'Kasık', 'Bacak'] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCrampWhere(item)}
                    className={`py-2 text-[11px] font-bold rounded-xl border cursor-pointer ${crampWhere === item ? 'bg-[#1f1a1c] text-white border-[#1f1a1c]' : 'bg-white text-[#5a4044] border-pink-100'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mood */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#1f1a1c]">Ruh Hali</label>
              <span className="text-[10px] text-[#b0004a] font-bold">Öneriler buna göre ayarlanır</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {moodList.map((m) => (
                <button
                  key={m.label}
                  onClick={() => {
                    soundEngine.playDropletSound();
                    setMood(m.label);
                  }}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    mood === m.label
                      ? 'bg-[#ffd9de] text-[#b0004a] border-[#d81b60] font-bold'
                      : 'bg-white text-[#5a4044] border-gray-100 hover:bg-pink-50/40'
                  }`}
                >
                  <span className="text-base">{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            {mood === 'Sinirli' && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-center gap-2 animate-in fade-in">
                <span>🕊️</span>
                <span className="text-[11px] leading-snug">
                  Öfke ve gerginlik için 4-7-8 yatıştırıcı nefes ve melisa çayı molası ana ekrana eklendi.
                </span>
              </div>
            )}
            {mood === 'Hassas' && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-center gap-2 animate-in fade-in">
                <span>🌸</span>
                <span className="text-[11px] leading-snug">
                  Duygusal esenlik ve şefkatli öz-bakım alanı hazırlandı.
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-[#1f1a1c] block">Belirtiler · {selectedSymptoms.length} seçili</label>
            {symptomGroups.map((group) => (
              <div key={group.title}>
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#b0004a] mb-1.5">{group.title}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((sym) => {
                    const isSelected = selectedSymptoms.includes(sym);
                    return (
                      <button
                        key={sym}
                        onClick={() => toggleSymptom(sym)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                          isSelected
                            ? 'bg-[#b0004a] text-white shadow-xs font-semibold'
                            : 'bg-[#f6ebed] text-[#805062] hover:bg-[#ffd9de]/60'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        {sym}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Enerji & Vitalite Seviyesi (replaces cervical mucus) */}
          <div>
            <label className="text-xs font-bold text-[#1f1a1c] mb-2 flex items-center justify-between">
              <span>Enerji & Biyo-Vitalite Seviyesi</span>
              <span className="text-[#b0004a] font-black">{energyLevel}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Düşük', 'Dengeli', 'Zirve'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setEnergyLevel(lvl)}
                  className={`py-2 px-1 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                    energyLevel === lvl
                      ? 'bg-gradient-to-r from-amber-400 to-[#d81b60] text-white border-transparent shadow-sm'
                      : 'bg-white text-gray-700 border-gray-100 hover:bg-amber-50/30'
                  }`}
                >
                  {lvl === 'Düşük' ? '🌙 Dinlenme' : lvl === 'Dengeli' ? '🌱 Dengeli' : '⚡ %85 Zirve'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1f1a1c] mb-2 block">Cinsel ilişki</label>
            <p className="text-[11px] text-[#805062] mb-2">İstersen boş bırak. Bu kayıt yalnızca bu cihazda durur.</p>
            <div className="grid grid-cols-3 gap-2">
              {(['Yok', 'Korunarak', 'Korunmasız'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setIntimacy(item)}
                  className={`py-2 text-xs font-bold rounded-xl border cursor-pointer ${
                    intimacy === item ? 'bg-[#1f1a1c] text-white border-[#1f1a1c]' : 'bg-white text-[#5a4044] border-pink-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1f1a1c] mb-2 block">Akıntı</label>
            <div className="grid grid-cols-4 gap-2">
              {(['Yok', 'Az', 'Krem', 'Yumurta akı'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setDischarge(item)}
                  className={`py-2 px-1 text-[11px] font-bold rounded-xl border cursor-pointer ${
                    discharge === item ? 'bg-[#d81b60] text-white border-[#d81b60]' : 'bg-white text-[#5a4044] border-pink-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-2">
              <label className="text-[11px] font-bold text-[#805062] mb-1.5 block">Akıntı rengi</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Yok', 'Şeffaf', 'Beyaz', 'Sarı', 'Kahverengi', 'Pembe'] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDischargeColor(item)}
                    className={`py-2 text-[11px] font-bold rounded-xl border cursor-pointer ${dischargeColor === item ? 'bg-[#d81b60] text-white border-[#d81b60]' : 'bg-white text-[#5a4044] border-pink-100'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#1f1a1c] mb-2 block">Uyku</label>
              <div className="grid grid-cols-1 gap-1.5">
                {(['İyi', 'Bölündü', 'Az'] as const).map((item) => (
                  <button key={item} type="button" onClick={() => setSleep(item)} className={`py-2 text-xs font-bold rounded-xl border cursor-pointer ${sleep === item ? 'bg-[#1f1a1c] text-white' : 'bg-white border-pink-100'}`}>{item}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-[#1f1a1c] mb-2 block">Ağrı</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['Yok', 'Hafif', 'Orta', 'Şiddetli'] as const).map((item) => (
                  <button key={item} type="button" onClick={() => setPain(item)} className={`py-2 text-xs font-bold rounded-xl border cursor-pointer ${pain === item ? 'bg-[#1f1a1c] text-white' : 'bg-white border-pink-100'}`}>{item}</button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1f1a1c] mb-2 block">Gün notu</label>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              maxLength={280}
              rows={3}
              placeholder="Bugün ne oldu, ne iyi geldi..."
              className="w-full rounded-2xl border border-pink-100 px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* Libido */}
          <div>
            <label className="text-xs font-bold text-[#1f1a1c] mb-2 block">Cinsel İstek (Libido)</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Düşük', 'Normal', 'Yüksek'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLibido(l)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    libido === l
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white border-transparent'
                      : 'bg-white text-gray-700 border-gray-100 hover:bg-rose-50/30'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#f6ebed] bg-gray-50 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold shadow-md hover:brightness-105 active:scale-98 transition-all cursor-pointer"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};
