import React, { useState } from 'react';
import { X, Download, Share2, Printer, CheckCircle, FileText, Check } from 'lucide-react';
import { FloraLogo } from './FloraLogo';
import { soundEngine } from '../utils/audio';
import { triggerRosePollenBurst } from '../utils/confetti';
import { formatTrDate } from '../utils/cycleIntelligence';

function pdfText(value: string): string {
  return value
    .replace(/ş/g, 's')
    .replace(/Ş/g, 'S')
    .replace(/ğ/g, 'g')
    .replace(/Ğ/g, 'G')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'I')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'O')
    .replace(/ü/g, 'u')
    .replace(/Ü/g, 'U')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'C')
    .replace(/[()\\]/g, '');
}

function makePdf(lines: string[]): string {
  const body = ['BT', '/F1 11 Tf', '48 800 Td', '16 TL'];
  lines.slice(0, 42).forEach((line, index) => {
    const text = pdfText(line || ' ');
    body.push(index === 0 ? `<${text}> Tj` : `T* <${text}> Tj`);
  });
  body.push('ET');
  const stream = body.join('\n');
  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj',
    `4 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`,
    '5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding << /BaseEncoding /WinAnsiEncoding /Differences [1 /Gbreve /Idotaccent /Scedilla /gbreve /dotlessi /scedilla] >> >> endobj',
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (const object of objects) {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index < offsets.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}

interface DoctorReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  goal: string;
  cycleLength: number;
  periodLength: number;
  lastPeriodDate: string;
  cycleDay: number;
  symptomLines: string[];
}

export const DoctorReportModal: React.FC<DoctorReportModalProps> = ({
  isOpen,
  onClose,
  userName,
  goal,
  cycleLength,
  periodLength,
  lastPeriodDate,
  cycleDay,
  symptomLines,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Current Date
  const reportDate = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Real report download as clean formatted document
  const handleDownload = () => {
    soundEngine.playCrystalChime();
    triggerRosePollenBurst();

    const symptomSummary = symptomLines.length
      ? [...new Set(symptomLines)].join(', ')
      : 'Belirti kaydı yok';
    const reportContent = `FLORA CYCLE KİŞİSEL DÖNGÜ ÖZETİ
Tarih: ${reportDate}

- İsim: ${userName || 'Belirtilmedi'}
- Hedef: ${goal || 'Belirtilmedi'}
- Son başlangıç: ${lastPeriodDate ? formatTrDate(lastPeriodDate) : 'Kayıt yok'}
- Döngü uzunluğu: ${cycleLength} gün
- Kanama süresi: ${periodLength} gün
- Bugünkü döngü günü: ${lastPeriodDate ? cycleDay : '—'}
- Kaydedilen belirtiler: ${symptomSummary}

Bu özet yalnızca uygulamaya girilen kayıtlardan üretilir. Tıbbi teşhis değildir.
`;

    const blob = new Blob([makePdf(reportContent.split('\n'))], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flora-ozet-${(userName || 'flora').toLowerCase().replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const handlePrint = () => {
    soundEngine.playDropletSound();
    window.print();
  };

  const handleShare = async () => {
    soundEngine.playDropletSound();
    const shareText = `Floria özeti — ${userName || 'İsimsiz'} | Başlangıç: ${lastPeriodDate ? formatTrDate(lastPeriodDate) : 'yok'} | Döngü: ${cycleLength} gün | Bugün: ${lastPeriodDate ? `${cycleDay}. gün` : 'kayıt yok'}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100 flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 px-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-rose-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#d81b60]" />
            <div>
              <h3 className="font-extrabold text-sm text-[#1f1a1c]">
                Kişisel döngü özeti
              </h3>
              <p className="text-[11px] text-[#805062]">
                Kişisel döngü özeti
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black cursor-pointer shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable/Preview Document Area */}
        <div className="p-6 overflow-y-auto space-y-5 bg-[#faf9f9] text-[#1f1a1c] font-sans">
          {/* Document Header */}
          <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FloraLogo size="lg" />
              <div>
                <h4 className="font-black text-sm text-[#b0004a] tracking-tight">
                  FLORA CLINICAL HEALTH PROTOCOL
                </h4>
                <p className="text-[11px] text-gray-500">
                  Kadın Sağlığı & Biyo-Ritmik Veri Entegrasyonu
                </p>
                <p className="text-[10px] text-gray-400">Rapor Tarihi: {reportDate}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                Kişisel özet
              </span>
              <p className="text-[10px] text-gray-400 mt-1">ID: #FL-{new Date().toISOString().slice(0, 10)}</p>
            </div>
          </div>

          {/* Patient Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 bg-white rounded-xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-medium">Hasta Adı</p>
              <p className="font-bold text-[#1f1a1c] mt-0.5">{userName}</p>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-medium">Son başlangıç</p>
              <p className="font-bold text-[#1f1a1c] mt-0.5">{lastPeriodDate ? formatTrDate(lastPeriodDate) : 'Kayıt yok'}</p>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-medium">Döngü</p>
              <p className="font-bold text-[#1f1a1c] mt-0.5">{cycleLength} gün / {periodLength} gün kanama</p>
            </div>
            <div className="p-2.5 bg-white rounded-xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-medium">Bugün</p>
              <p className="font-bold text-[#b0004a] mt-0.5">{lastPeriodDate ? `${cycleDay}. gün` : '—'}</p>
            </div>
          </div>

          {/* Summary Findings */}
          <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <h5 className="font-extrabold text-xs text-[#1f1a1c] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#d81b60]" />
              Kayıtlı bilgiler
            </h5>

            <div className="space-y-2 text-xs leading-relaxed text-[#5a4044]">
              <p>
                Hedef: {goal || 'Belirtilmedi'}. Eski döngü kaydı olmadığı için karşılaştırma veya tıbbi yorum yok.
              </p>
              <p>
                Belirtiler: {symptomLines.length ? [...new Set(symptomLines)].join(', ') : 'Henüz belirti kaydı yok.'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-gray-200 bg-white flex flex-col gap-2">
          {downloadSuccess && (
            <div className="w-full py-1.5 px-3 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-4 h-4" />
              <span>Özet cihazına indirildi.</span>
            </div>
          )}

          {copiedSuccess && (
            <div className="w-full py-1.5 px-3 bg-pink-50 text-[#b0004a] rounded-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Rapor özeti panoya kopyalandı!</span>
            </div>
          )}

          <div className="flex gap-2 w-full">
            <button
              onClick={handleDownload}
              className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>PDF İndir</span>
            </button>
            <button
              onClick={handlePrint}
              className="py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Yazdır</span>
            </button>
            <button
              onClick={handleShare}
              className="py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Paylaş</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
