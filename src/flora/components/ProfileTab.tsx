import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Settings,
  ChevronRight,
  Activity,
  Heart,
  Droplet,
  Moon,
  HelpCircle,
  Bell,
  RefreshCw,
  Pill,
  Watch,
  Camera,
  Check,
  X,
  Clock,
  Calendar,
  AlertCircle,
  Plus,
  Trash2,
  Wind
} from 'lucide-react';
import { UserProfile, SupplementItem, defaultPartnerShare, PartnerShareKey, PARTNER_ENABLED } from '../types';
import { FloraLogo } from './FloraLogo';
import { soundEngine } from '../utils/audio';
import { triggerRosePollenBurst } from '../utils/confetti';
import { askNotifyPermission, readNotifyState, type NotifyState } from '../notifications';

interface ProfileTabProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'water') => void;
  supplements: SupplementItem[];
  onAddSupplement: (item: SupplementItem) => void;
  onDeleteSupplement: (id: string) => void;
  onResetData: () => void;
  reminderError: boolean;
  onReminderError: (failed: boolean) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  profile,
  onUpdateProfile,
  showToast,
  supplements,
  onAddSupplement,
  onDeleteSupplement,
  onResetData,
  reminderError,
  onReminderError,
}) => {
  // Goal state
  const [selectedGoal, setSelectedGoal] = useState<'regl' | 'hamilelik' | 'gebelik'>('hamilelik');

  // Water slider state
  const [sliderLiters, setSliderLiters] = useState<number>(profile.waterGoalMl / 1000 || 2.4);

  // Modals state
  const [showAvatarModal, setShowAvatarModal] = useState<boolean>(false);
  const [showSleepModal, setShowSleepModal] = useState<boolean>(false);
  const [showCycleParamModal, setShowCycleParamModal] = useState<boolean>(false);
  const [showAddSupplementModal, setShowAddSupplementModal] = useState<boolean>(false);
  const [showHormoneModal, setShowHormoneModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  // Add Supplement Form State
  const [newSuppName, setNewSuppName] = useState('');
  const [newSuppDose, setNewSuppDose] = useState('1 Tablet');
  const [newSuppTime, setNewSuppTime] = useState('09:00');
  const [newSuppReminder, setNewSuppReminder] = useState(true);
  const [notify, setNotify] = useState<NotifyState>('default');
  React.useEffect(() => {
    void readNotifyState().then(setNotify).catch(() => onReminderError(true));
  }, [onReminderError]);

  // Form states for sleep and cycle
  const [bedtime, setBedtime] = useState<string>(profile.quietHoursStart || '23:00');
  const [waketime, setWaketime] = useState<string>(profile.quietHoursEnd || '07:30');
  const [editCycleLen, setEditCycleLen] = useState<number>(profile.cycleLength || 28);
  const [editPeriodLen, setEditPeriodLen] = useState<number>(profile.periodLength || 5);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const defaultAvatar = '/logo.png';
  const currentAvatar = profile.avatarUrl || defaultAvatar;

  const presetAvatars: { id: string; url: string; label: string }[] = [];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          soundEngine.playCrystalChime();
          triggerRosePollenBurst();
          onUpdateProfile({ avatarUrl: reader.result });
          setShowAvatarModal(false);
          showToast('Profil Fotoğrafı Güncellendi 🌸', 'Yeni avatarınız başarıyla yüklendi.', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSliderChange = (val: number) => {
    soundEngine.playDropletSound();
    setSliderLiters(val);
    onUpdateProfile({ waterGoalMl: Math.round(val * 1000) });
  };

  const handleCreateSupplement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSuppName.trim()) return;

    soundEngine.playCrystalChime();
    triggerRosePollenBurst();
    const newItem: SupplementItem = {
      id: Date.now().toString(),
      name: newSuppName.trim(),
      dose: newSuppDose || '1 Porsiyon',
      time: newSuppTime || '09:00',
      taken: false,
      reminderEnabled: newSuppReminder,
    };

    onAddSupplement(newItem);
    setShowAddSupplementModal(false);
    setNewSuppName('');
    showToast('Yeni Takviye Eklendi', `${newItem.name} (${newItem.time}) profilinize kaydedildi.`, 'success');
  };

  const handleSaveSleep = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playCrystalChime();
    onUpdateProfile({ quietHoursStart: bedtime, quietHoursEnd: waketime });
    setShowSleepModal(false);
    showToast('Sessiz saat', `${bedtime}–${waketime} arasında takviye hatırlatması çıkmaz.`, 'success');
  };

  const handleSaveCycleParams = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playCrystalChime();
    onUpdateProfile({ cycleLength: editCycleLen, periodLength: editPeriodLen });
    setShowCycleParamModal(false);
    showToast('Döngü güncellendi', `Döngü ${editCycleLen} gün, akış ${editPeriodLen} gün.`, 'success');
  };

  return (
    <div className="space-y-5 pb-40 pt-2 select-none text-[#1f1a1c]">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Top Header Bar (No Apple Health mention) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FloraLogo size="sm" />
          <span className="text-sm font-extrabold text-[#1f1a1c]">
            Profil
          </span>
        </div>
      </div>

      {/* HERO PROFILE CLAY CARD */}
      <div className="w-full bg-white rounded-3xl p-5 clay-card shadow-[0_12px_32px_rgba(216,27,96,0.08)] border border-white relative overflow-hidden">
        <div className="flex items-center gap-4 mb-4 relative z-10">
          {/* Avatar with Dual-Layer Botanical Halo */}
          <div className="relative shrink-0">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400 blur-sm opacity-60 animate-pulse pointer-events-none" />

            <div
              onClick={() => setShowAvatarModal(true)}
              className="relative w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-[#d81b60] to-rose-400 shadow-md cursor-pointer group"
            >
              <img
                src={currentAvatar}
                alt={profile.name}
                className="w-full h-full object-cover rounded-full bg-pink-100 group-hover:opacity-90 transition-opacity"
              />
            </div>

            {/* Pencil Button -> Opens Avatar Modal & File Picker */}
            <button
              onClick={() => {
                soundEngine.playDropletSound();
                setShowAvatarModal(true);
              }}
              title="Profil Fotoğrafını Değiştir"
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-tr from-[#b0004a] to-amber-500 flex items-center justify-center shadow-md border-2 border-white text-white cursor-pointer active:scale-90 hover:scale-105 transition-transform"
            >
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <label className="text-[10px] font-bold text-[#805062] block mb-1">Adın</label>
            <input
              type="text"
              value={profile.name}
              maxLength={40}
              placeholder="Adını yaz"
              onChange={(e) => onUpdateProfile({ name: e.target.value })}
              className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-base font-black text-[#1f1a1c] tracking-tight outline-none focus:border-[#d81b60] placeholder:text-[#c4a8b0] placeholder:font-semibold select-text"
            />
            <p className="text-xs font-semibold text-[#805062] mt-1.5">
              {profile.lastPeriodDate
                ? `Son başlangıç: ${new Date(`${profile.lastPeriodDate}T00:00:00`).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`
                : 'Başlangıç tarihi yok'}
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-50 to-amber-50 text-[#b0004a] text-xs font-bold border border-pink-200/60 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{profile.goal || 'Hedef seçilmedi'}</span>
            </div>
          </div>
        </div>

        {/* 3 Pill Stats Row */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-pink-100/60 relative z-10">
          <div
            onClick={() => setShowCycleParamModal(true)}
            className="p-3 rounded-2xl bg-gradient-to-b from-white to-pink-50/50 border border-pink-100/80 text-center shadow-xs cursor-pointer hover:border-pink-300 transition-all"
          >
            <span className="text-[11px] font-bold text-[#805062] flex items-center justify-center gap-1">
              <span>🌿</span> Döngü
            </span>
            <span className="block text-xl font-black text-[#b0004a] my-0.5">
              {profile.cycleLength}
            </span>
            <span className="text-[10px] text-[#805062] font-semibold">Gün Ritmi ✎</span>
          </div>

          <div
            onClick={() => setShowCycleParamModal(true)}
            className="p-3 rounded-2xl bg-gradient-to-b from-white to-pink-50/50 border border-pink-100/80 text-center shadow-xs cursor-pointer hover:border-pink-300 transition-all"
          >
            <span className="text-[11px] font-bold text-[#805062] flex items-center justify-center gap-1">
              <span>🌸</span> Akış
            </span>
            <span className="block text-xl font-black text-[#b0004a] my-0.5">
              {profile.periodLength}
            </span>
            <span className="text-[10px] text-[#805062] font-semibold">Gün Akış ✎</span>
          </div>

          <div className="p-3 rounded-2xl bg-gradient-to-b from-white to-pink-50/50 border border-pink-100/80 text-center shadow-xs">
            <span className="text-[11px] font-bold text-[#805062] flex items-center justify-center gap-1">
              <span>✨</span> Luteal
            </span>
            <span className="block text-xl font-black text-amber-600 my-0.5">
              14
            </span>
            <span className="text-[10px] text-[#805062] font-semibold">Altın Faz</span>
          </div>
        </div>
      </div>

      {PARTNER_ENABLED && (
      <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold">Partner</p>
            <p className="text-[11px] text-[#805062]">Açıksa alt menüde kod ekranı durur.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (profile.partnerMode) {
                onUpdateProfile({ partnerMode: false });
                return;
              }
              onUpdateProfile({
                partnerMode: true,
                partnerCode: profile.partnerCode || String(Math.floor(100000 + Math.random() * 900000)),
                partnerShare: profile.partnerShare || defaultPartnerShare(),
              });
            }}
            className={`rounded-full px-3 py-1.5 text-xs font-bold cursor-pointer ${profile.partnerMode ? 'bg-[#1f1a1c] text-white' : 'bg-pink-50 text-[#b0004a]'}`}
          >
            {profile.partnerMode ? 'Açık' : 'Kapalı'}
          </button>
        </div>
        {profile.partnerMode && (
          <div className="space-y-2">
            <input
              value={profile.partnerName || ''}
              onChange={(event) => onUpdateProfile({ partnerName: event.target.value })}
              placeholder="Partnerinin adı"
              maxLength={40}
              className="w-full rounded-xl border border-pink-100 px-3 py-2 text-sm outline-none"
            />
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold tracking-[0.28em]">{profile.partnerCode || '------'}</p>
              <button
                type="button"
                onClick={() => onUpdateProfile({ partnerCode: String(Math.floor(100000 + Math.random() * 900000)) })}
                className="text-[11px] font-bold text-[#b0004a] cursor-pointer"
              >
                Yeni kod
              </button>
            </div>
            <p className="text-[11px] text-[#805062]">Bu kodu giren kişi yalnız “Görür” dediklerini okur. Kayıt ekleyemez.</p>
            {(
              [
                ['phase', 'Faz ve gün'],
                ['mood', 'Ruh hali'],
                ['flow', 'Kanama'],
                ['pain', 'Ağrı'],
                ['symptoms', 'Belirtiler'],
                ['intimacy', 'İlişki'],
                ['note', 'Gün notu'],
              ] as [PartnerShareKey, string][]
            ).map(([key, label]) => {
              const share = { ...defaultPartnerShare(), ...profile.partnerShare };
              const on = share[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onUpdateProfile({ partnerShare: { ...share, [key]: !on } })}
                  className="w-full flex items-center justify-between rounded-xl bg-pink-50/50 px-3 py-2 text-xs cursor-pointer"
                >
                  <span>{label}</span>
                  <span className={on ? 'text-[#b0004a] font-bold' : 'text-[#805062]'}>{on ? 'Görür' : 'Gizli'}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
      )}

      {/* GÜNLÜK TAKVİYE YÖNETİMİ & TAKVİYE EKLEME (PROFİLDE) */}
      <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-50 text-[#d81b60] flex items-center justify-center shadow-xs">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#1f1a1c]">
                Günlük Takviyeler & Öz-Bakım
              </h3>
              <p className="text-[11px] text-[#805062]">
                {supplements.length} aktif takviye listenizde
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playDropletSound();
              setShowAddSupplementModal(true);
            }}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold flex items-center gap-1 shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yeni Takviye Ekle</span>
          </button>
        </div>

        {/* Supplements list in Profile */}
        <div className="space-y-2">
          {supplements.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-pink-50/30 border border-pink-100 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-white text-[#b0004a] flex items-center justify-center font-bold text-xs shadow-xs">
                  💊
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1f1a1c] truncate">{item.name}</p>
                  <p className="text-[10.5px] text-[#805062]">
                    Doz: {item.dose} • Saat: {item.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {item.reminderEnabled ? 'Hatırlatma açık' : 'Hatırlatma yok'}
                </span>
                {supplements.length > 1 && (
                  <button
                    onClick={() => {
                      soundEngine.playDropletSound();
                      onDeleteSupplement(item.id);
                      showToast('Takviye Silindi', `${item.name} listenizden çıkarıldı.`, 'info');
                    }}
                    className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 cursor-pointer transition"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ORGANİK BİYO-RİTİM & SIVI */}
      <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-[#1f1a1c]">
            Organik Biyo-Ritim & Sıvı
          </h3>
          <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 text-[11px] font-bold border border-cyan-200/60 flex items-center gap-1 shadow-xs">
            💧 Floria
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-pink-50/40 to-rose-50/20 border border-pink-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🚰</span>
              <div>
                <span className="text-xs font-bold text-[#1f1a1c] block">Günlük Canlı Su & Hidrasyon</span>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-cyan-100/70 text-cyan-900 font-black text-xs shadow-xs">
              {sliderLiters.toFixed(1)} Litre ({Math.round(sliderLiters / 0.3)} Bardak)
            </div>
          </div>

          <div className="relative pt-2 pb-1">
            <input
              type="range"
              min="1.0"
              max="4.0"
              step="0.1"
              value={sliderLiters}
              onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
              className="w-full h-3.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#d81b60] shadow-inner"
            />

            <div className="flex items-center justify-between text-[10px] font-bold text-[#805062] mt-1.5 px-1">
              <span>1.0 L (Hafif)</span>
              <span className="text-[#b0004a]">🌸 Doğurganlık için +0.5 L Önerilir</span>
              <span>4.0 L (Yüksek)</span>
            </div>
          </div>
        </div>

        {/* Melatonin Düzenle */}
        <div className="p-3.5 rounded-2xl bg-pink-50/30 border border-pink-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-base shadow-xs">
              🌙
            </div>
            <div>
              <span className="text-xs font-bold text-[#1f1a1c] block">
                Melatonin & Gece Koruma Saati
              </span>
              <span className="text-[11px] text-[#805062]">
                {profile.quietHoursStart || '23:00'} - {profile.quietHoursEnd || '07:30'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playDropletSound();
              setShowSleepModal(true);
            }}
            className="px-3 py-1.5 rounded-full bg-white text-xs font-bold text-[#b0004a] border border-pink-200 hover:bg-pink-50 shadow-xs cursor-pointer active:scale-95 transition-transform"
          >
            Düzenle
          </button>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-pink-100 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-[#1f1a1c]">Bildirim izni</p>
            <p className="text-[11px] text-[#805062]">
              {notify === 'granted' ? 'İzin açık. Su molaları, günlük tatlı notlar ve seçtiğin takviye saatlerinde hatırlatılır. Su ve günlük notlar sessiz saatlerde gelmez.' : notify === 'denied' ? 'Kapalı. Telefon ayarından açabilirsin.' : notify === 'unsupported' ? 'Kurulu Floria uygulamasında sorulur. Tarayıcıda gelmez.' : 'Henüz sorulmadı.'}
            </p>
          </div>
          {reminderError && <p role="alert" className="text-xs text-rose-800">Hatırlatıcı kurulamadı. Tekrar dene.</p>}
          {notify !== 'unsupported' && (
            <button
              type="button"
              onClick={() => {
                onReminderError(false);
                void askNotifyPermission(supplements, profile).then(setNotify).catch(() => onReminderError(true));
              }}
              className="shrink-0 px-3 py-1.5 rounded-full bg-[#1f1a1c] text-white text-xs font-bold cursor-pointer"
            >
              {notify === 'granted' ? 'Hatırlatıcıları kur' : 'İzin ver'}
            </button>
          )}
        </div>
      </div>

      <details className="rounded-2xl border border-pink-100 bg-white p-4 text-sm">
        <summary className="cursor-pointer font-semibold">Gizlilik ve cihazdaki veriler</summary>
        <p className="mt-2">Döngü, belirti, profil ve takviye kayıtların bu cihazda saklanır. Profil ayarlarından uygulama kayıtlarını silebilirsin.</p>
        <p className="mt-2">İndirdiğin raporlar ayrı dosyalardır. Bu dosyaları cihazının dosya yöneticisinden silebilirsin.</p>
      </details>

      {/* FOOTER ACTIONS */}
      <div className="space-y-2 pt-2">
        <button
          onClick={() => {
            soundEngine.playDropletSound();
            setShowHelpModal(true);
          }}
          className="w-full p-3.5 rounded-2xl bg-white border border-pink-100 flex items-center justify-between text-xs font-bold text-[#1f1a1c] hover:bg-pink-50 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2 text-[#805062]">
            <HelpCircle className="w-4 h-4 text-[#d81b60]" />
            <span>Yardım</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#805062]" />
        </button>

        <button
          onClick={() => {
            soundEngine.playDropletSound();
            setShowResetModal(true);
          }}
          className="w-full py-3 text-center text-xs font-bold text-[#b0004a] flex items-center justify-center gap-1.5 cursor-pointer hover:underline"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Verileri Sıfırla</span>
        </button>

        <p className="text-[10px] text-center text-[#805062]/80 pt-1">
          Kayıtlar bu cihazda kalır. Tıbbi teşhis değildir.
        </p>
      </div>

      {/* MODAL: YENİ TAKVİYE EKLE */}
      {showAddSupplementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-pink-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-pink-50 pb-2.5">
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-[#d81b60]" />
                <h3 className="font-extrabold text-sm text-[#1f1a1c]">
                  Yeni Takviye Ekle
                </h3>
              </div>
              <button
                onClick={() => setShowAddSupplementModal(false)}
                className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSupplement} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#1f1a1c] block mb-1">
                  Takviye Adı
                </label>
                <input
                  type="text"
                  placeholder="örn: B12 Vitamini, Demir, Kolajen, İnositol"
                  value={newSuppName}
                  onChange={(e) => setNewSuppName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-pink-50/40 border border-pink-200 focus:outline-hidden focus:ring-2 focus:ring-[#d81b60]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#1f1a1c] block mb-1">
                    Doz / Miktar
                  </label>
                  <input
                    type="text"
                    placeholder="örn: 1 Tablet, 500 mg"
                    value={newSuppDose}
                    onChange={(e) => setNewSuppDose(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-pink-50/40 border border-pink-200 focus:outline-hidden focus:ring-2 focus:ring-[#d81b60]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1f1a1c] block mb-1">
                    Saat
                  </label>
                  <input
                    type="time"
                    value={newSuppTime}
                    onChange={(e) => setNewSuppTime(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-pink-50/40 border border-pink-200 focus:outline-hidden focus:ring-2 focus:ring-[#d81b60]"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-pink-50/50 border border-pink-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#d81b60]" />
                  <span className="text-xs font-bold text-[#1f1a1c]">Günlük Hatırlatıcı Aç</span>
                </div>
                <input
                  type="checkbox"
                  checked={newSuppReminder}
                  onChange={(e) => setNewSuppReminder(e.target.checked)}
                  className="w-4 h-4 accent-[#d81b60] rounded cursor-pointer"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSupplementModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold shadow-md cursor-pointer hover:brightness-105 active:scale-98"
                >
                  Takviyeyi Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: AVATAR FOTOĞRAFI DEĞİŞTİR */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-pink-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-pink-50 pb-2.5">
              <div className="flex items-center gap-2">
                <FloraLogo size="sm" />
                <h3 className="font-extrabold text-sm text-[#1f1a1c]">
                  Profil Fotoğrafını Güncelle
                </h3>
              </div>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center py-2">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-[#d81b60] to-rose-400 shadow-lg">
                <img
                  src={currentAvatar}
                  alt="Önizleme"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-xs font-bold text-[#1f1a1c] mt-2">{profile.name}</span>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Cihazdan Fotoğraf Seç & Yükle</span>
            </button>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#805062] block">
                Veya Hazır Avatarlardan Seç:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {presetAvatars.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => {
                      soundEngine.playDropletSound();
                      onUpdateProfile({ avatarUrl: av.url });
                      setShowAvatarModal(false);
                      showToast('Avatar Seçildi', `${av.label} profil fotoğrafınız oldu.`, 'success');
                    }}
                    className="p-1 rounded-2xl border border-pink-100 hover:border-[#d81b60] transition-all cursor-pointer flex flex-col items-center gap-1 group"
                  >
                    <img
                      src={av.url}
                      alt={av.label}
                      className="w-12 h-12 rounded-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="text-[9px] font-semibold text-[#805062] truncate w-full text-center">
                      {av.label.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowAvatarModal(false)}
              className="w-full py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* MODAL: MELATONİN & UYKU SAATİ */}
      {showSleepModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-pink-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-pink-50 pb-2.5">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-sm text-[#1f1a1c]">
                  Sessiz Botanik Uyku Saatleri
                </h3>
              </div>
              <button
                onClick={() => setShowSleepModal(false)}
                className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSleep} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-pink-50/40 border border-pink-100">
                  <label className="text-[11px] font-bold text-[#805062] block mb-1">
                    Yatış Saati
                  </label>
                  <input
                    type="time"
                    value={bedtime}
                    onChange={(e) => setBedtime(e.target.value)}
                    required
                    className="w-full text-sm font-black text-[#1f1a1c] bg-transparent focus:outline-hidden"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-pink-50/40 border border-pink-100">
                  <label className="text-[11px] font-bold text-[#805062] block mb-1">
                    Uyanış Saati
                  </label>
                  <input
                    type="time"
                    value={waketime}
                    onChange={(e) => setWaketime(e.target.value)}
                    required
                    className="w-full text-sm font-black text-[#1f1a1c] bg-transparent focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSleepModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold shadow-md cursor-pointer hover:brightness-105 active:scale-98"
                >
                  Saatleri Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DÖNGÜ PARAMETRELERİ */}
      {showCycleParamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-pink-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-pink-50 pb-2.5">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#d81b60]" />
                <h3 className="font-extrabold text-sm text-[#1f1a1c]">
                  Döngü Parametreleri
                </h3>
              </div>
              <button
                onClick={() => setShowCycleParamModal(false)}
                className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCycleParams} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#1f1a1c]">
                    Döngü Uzunluğu: <span className="text-[#b0004a]">{editCycleLen} Gün</span>
                  </label>
                  <span className="text-[10px] text-[#805062] font-semibold">21 - 45 Gün</span>
                </div>
                <input
                  type="range"
                  min="21"
                  max="45"
                  value={editCycleLen}
                  onChange={(e) => setEditCycleLen(parseInt(e.target.value))}
                  className="w-full accent-[#d81b60]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#1f1a1c]">
                    Kanama süresi: <span className="text-[#b0004a]">{editPeriodLen} gün</span>
                  </label>
                  <span className="text-[10px] text-[#805062] font-semibold">2 - 10 Gün</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={editPeriodLen}
                  onChange={(e) => setEditPeriodLen(parseInt(e.target.value))}
                  className="w-full accent-[#d81b60]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCycleParamModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold shadow-md cursor-pointer hover:brightness-105 active:scale-98"
                >
                  Parametreleri Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: YARDIM & REHBER */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 border border-pink-100 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-pink-50 pb-2.5">
              <div className="flex items-center gap-2">
                <FloraLogo size="sm" />
                <h3 className="font-extrabold text-sm text-[#1f1a1c]">
                  Yardım
                </h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-[#5a4044]">
              <div className="p-3 rounded-2xl bg-pink-50/50 border border-pink-100">
                <h5 className="font-bold text-[#b0004a] mb-1">🌸 Zirve Doğurganlık Nasıl Hesaplanır?</h5>
                <p>
                  Pencere, döngü uzunluğundan tahmin edilir. Yüzde verilmez. Test, teşhis veya gebelik güvencesi değildir.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-pink-50/50 border border-pink-100">
                <h5 className="font-bold text-[#b0004a] mb-1">🕊️ Öfke ve PMS Öncesi Yatıştırma Nedir?</h5>
                <p>
                  Adet öncesi gerginlikte 4-7-8 nefesi bir pratiktir. Öfkeyi veya hastalığı tedavi etmez.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-pink-50/50 border border-pink-100">
                <h5 className="font-bold text-[#b0004a] mb-1">🔒 Verilerim Nerede Saklanıyor?</h5>
                <p>
                  Kayıtlar yalnızca bu cihazda durur. Sunucuya gitmez. Hesap yoktur. Ayrı bir şifreli kasa yoktur.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold cursor-pointer"
            >
              Tamam
            </button>
          </div>
        </div>
      )}

      {/* MODAL: ÇIKIŞ YAP */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-pink-100 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-[#b0004a] flex items-center justify-center mx-auto">
              <RefreshCw className="w-6 h-6" />
            </div>

            <h3 className="text-base font-black text-[#1f1a1c]">Veriler silinsin mi?</h3>
            <p className="text-xs text-[#805062] leading-relaxed">
              Adın, döngü tarihin, belirtilerin, su kaydın ve takviyelerin silinir. Bu işlem geri alınamaz.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                onClick={() => {
                  soundEngine.playDropletSound();
                  setShowResetModal(false);
                  onResetData();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#b0004a] text-white text-xs font-bold shadow-md cursor-pointer hover:bg-[#d81b60]"
              >
                Sıfırla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
