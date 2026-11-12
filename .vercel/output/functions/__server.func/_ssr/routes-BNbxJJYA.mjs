import { i as __toESM, n as __exportAll } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CircleCheckBig, B as ArrowLeft, C as FileText, D as Clock, E as Coffee, F as Camera, I as Calendar, L as CalendarDays, M as ChevronLeft, N as Check, O as CircleHelp, P as ChartNoAxesColumn, R as Bell, S as Flame, T as Download, _ as Pill, b as Info, c as Sparkles, d as Settings, f as RotateCcw, g as Play, h as Plus, i as User, j as ChevronRight, k as CircleCheck, l as ShieldCheck, m as Printer, n as X, o as Trash2, p as RefreshCw, r as Wind, s as Square, t as Zap, u as Share2, v as Moon, w as Droplet, x as Heart, y as Leaf, z as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as Capacitor } from "../_libs/capacitor__core.mjs";
import { t as LocalNotifications } from "../_libs/capacitor__local-notifications.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BNbxJJYA.js
var routes_BNbxJJYA_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FloraLogo = ({ size = "md", showText = false, className = "", variant = "squircle" }) => {
	const [imageFailed, setImageFailed] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `inline-flex items-center gap-2.5 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `relative flex items-center justify-center shrink-0 ${{
				sm: "w-7 h-7",
				md: "w-9 h-9",
				lg: "w-12 h-12",
				xl: "w-16 h-16",
				"2xl": "w-24 h-24"
			}[size]}`,
			children: !imageFailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/logo.png",
				alt: "Floria",
				className: `w-full h-full object-cover shadow-sm ${variant === "circle" ? "rounded-full" : "rounded-2xl"}`,
				onError: () => setImageFailed(true)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full h-full rounded-2xl bg-gradient-to-tr from-[#b0004a] via-[#d81b60] to-[#ffb300] flex items-center justify-center text-white shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-base",
					children: "🌸"
				})
			})
		}), showText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col select-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-base font-extrabold tracking-tight bg-gradient-to-r from-[#b0004a] via-[#d81b60] to-[#ad1457] bg-clip-text text-transparent",
				children: "Floria"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] font-semibold text-[#805062] tracking-wider uppercase",
				children: "Biyolojik Ritim Alanı"
			})]
		})]
	});
};
var SoundEngine = class {
	ctx = null;
	getContext() {
		try {
			if (!this.ctx) {
				const AudioCtx = window.AudioContext || window.webkitAudioContext;
				if (AudioCtx) this.ctx = new AudioCtx();
			}
			if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
			return this.ctx;
		} catch {
			return null;
		}
	}
	playDropletSound() {
		const ctx = this.getContext();
		if (!ctx) return;
		try {
			const now = ctx.currentTime;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "sine";
			osc.frequency.setValueAtTime(600, now);
			osc.frequency.exponentialRampToValueAtTime(1400, now + .04);
			osc.frequency.exponentialRampToValueAtTime(800, now + .12);
			gain.gain.setValueAtTime(0, now);
			gain.gain.linearRampToValueAtTime(.35, now + .02);
			gain.gain.exponentialRampToValueAtTime(.001, now + .18);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start(now);
			osc.stop(now + .2);
			const osc2 = ctx.createOscillator();
			const gain2 = ctx.createGain();
			osc2.type = "triangle";
			osc2.frequency.setValueAtTime(1800, now);
			osc2.frequency.exponentialRampToValueAtTime(2400, now + .06);
			gain2.gain.setValueAtTime(0, now);
			gain2.gain.linearRampToValueAtTime(.12, now + .015);
			gain2.gain.exponentialRampToValueAtTime(.001, now + .15);
			osc2.connect(gain2);
			gain2.connect(ctx.destination);
			osc2.start(now);
			osc2.stop(now + .16);
		} catch {}
	}
	playCrystalChime() {
		const ctx = this.getContext();
		if (!ctx) return;
		try {
			const now = ctx.currentTime;
			[
				587.33,
				880,
				1174.66,
				1760
			].forEach((freq, idx) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "sine";
				osc.frequency.setValueAtTime(freq, now + idx * .04);
				const startTime = now + idx * .04;
				const duration = 1.2 - idx * .15;
				gain.gain.setValueAtTime(0, startTime);
				gain.gain.linearRampToValueAtTime(.15 / (idx + 1), startTime + .03);
				gain.gain.exponentialRampToValueAtTime(1e-4, startTime + duration);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(startTime);
				osc.stop(startTime + duration + .05);
			});
		} catch {}
	}
	playResetPoofSound() {
		const ctx = this.getContext();
		if (!ctx) return;
		try {
			const now = ctx.currentTime;
			const bufferSize = ctx.sampleRate * .25;
			const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
			const output = buffer.getChannelData(0);
			for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
			const whiteNoise = ctx.createBufferSource();
			whiteNoise.buffer = buffer;
			const filter = ctx.createBiquadFilter();
			filter.type = "bandpass";
			filter.frequency.setValueAtTime(450, now);
			filter.frequency.exponentialRampToValueAtTime(150, now + .22);
			filter.Q.setValueAtTime(2.5, now);
			const gain = ctx.createGain();
			gain.gain.setValueAtTime(.35, now);
			gain.gain.exponentialRampToValueAtTime(.001, now + .25);
			whiteNoise.connect(filter);
			filter.connect(gain);
			gain.connect(ctx.destination);
			whiteNoise.start(now);
			whiteNoise.stop(now + .26);
		} catch {}
	}
};
var soundEngine = new SoundEngine();
var MONTHS = [
	"Ocak",
	"Şubat",
	"Mart",
	"Nisan",
	"Mayıs",
	"Haziran",
	"Temmuz",
	"Ağustos",
	"Eylül",
	"Ekim",
	"Kasım",
	"Aralık"
];
var TEAS = [
	"Akşam yorulduysan kendine bir fincan ıhlamur koy. Şekersiz, yavaş yavaş iç. İkinci fincan şart değil. Bu, günü kendine karşı yumuşak kapatmanın hali.",
	"Öğleden sonra içinin ısınması için kısa bir zencefil. İnce bir dilim, beş dakika. Miden hassassa biraz daha su kat. Kahveyi bırakman gerekmiyor.",
	"Uykudan önce bir fincan papatya. Telefonu kenara bırakıp çayın bitmesini beklemek de sana iyi gelir. Acele etme.",
	"Yemekten sonra bir fincan nane. Sıcak olsun. Öğün ağır geldiyse bu küçük mola, kendine verdiğin bir nefes arası.",
	"Sabah bir lokmadan sonra ılık kuşburnu. Ekşi ve sıcak, içini uyandırır. Başka bir vaadi yok, sadece sana eşlik eder.",
	"Şişkin hissediyorsan rezene iyi bir arkadaş. Bir tatlı kaşığı tohum, on dakika. Gazlı içeceği bugün kenara bırakmak istersen bırak, zorunda değilsin.",
	"Öğleden sonra bir fincan adaçayı, sakince. Geceye saklamana gerek yok. Hamileysen bu çayı geç, başka bir bitki de seni aynı sıcaklıkla karşılar.",
	"İçin gerginse melisa. Loş odada bir fincan. Öfkeyi silmeye çalışmaz. Sadece oturup “şimdi buradayım” demen için yanındadır.",
	"Tatlı canın çektiğinde elma kabuğu çayı. Beş dakika, istersen bir çubuk tarçın. Tatlıyı kendinden esirgeme. Bu sadece ilk isteği yumuşatır.",
	"Kahveden önce bir bardak tarçınlı ılık su. Kahven senin, onu bırakmak zorunda değilsin. İlk fincanı biraz ertelemek de şefkat sayılır.",
	"Sabah bir fincan yeşil çay, nazikçe. İkincisini bugün istemezsen sorun değil. Aç karnına yakıyorsa yemekten sonraya bırak, bedenin sana söylesin.",
	"Ekranı kapatınca ılık süt ya da sevdiğin bir bitki çayı. Işıklar kısık. Bu bir görev değil, kendine söylediğin küçük bir iyi geceler.",
	"Bir fincan ıhlamur, yanında küçük bir lokma. Çay yalnız kalmasın, sen de yalnız kalma onunla.",
	"Bugün papatya. İkinci fincan şart değil. Birincisi zaten “yavaşla” diyor.",
	"Kuşburnu ekşi ve sıcak. Bir dilim elmayla içersen gün daha tatlı durur.",
	"Nane ve limon, öğleden sonra. Miden yorgansa şekeri boş ver, sıcaklık yeter.",
	"Rezene çayı şişkin bir güne küçük bir omuz. On dakika, sonra bardağı bırak.",
	"Adaçayı bir yudum. Geceye saklama. Hamileysen bunu geç, ılık su da seni tutar.",
	"Melisa, loş odada. Öfkeyi silmez. Sadece yanına oturur.",
	"Tarçınlı ılık süt, tatlı krizine yumuşak bir cevap. Yasak yok, sadece önce bu.",
	"Yeşil çay nazik olsun. Aç karnına yakıyorsa yemekten sonraya bırak, sorun değil.",
	"Zencefil ince bir dilim. Çok geldiyse su kat. İçin ısınsın, zorlanmasın.",
	"Sevdiğin bitki, sevdiğin fincan. Marka önemli değil. Sıcaklık önemli."
];
var FOODS = [
	"Öğle tabağın sıcak olsun: mercimek, ıspanak ve bir dilim ekmek. Sosu canın istediği kadar. Akşam aynı şeyi istemezsen bir kâse çorba da seni doyurur.",
	"Kahvaltıda yoğurt, yulaf ve birkaç ceviz. Balı tadımlık, bir tatlı kaşığı. On dakikanı kendine ayır, ayakta geçiştirme.",
	"Yumurta, domates ve biraz peynir. Bildiğin, seni yormayan bir tabak. Yeni bir liste açmana gerek yok, bugün bildiğin yeter.",
	"Nohut, maydanoz ve limon. Kızartmayı bugün kenara bırakmak istersen bırak. Şişkinlik olursa porsiyonu küçült, tabağı bitirmek zorunda değilsin.",
	"Fırın kabak ve sade yoğurt. Akşam için yumuşak bir tabak. Tuzu sonra, damak tadına göre ekle. Üstüne tatlı sırası açmak zorunda değilsin.",
	"Varsa ızgara balık, yoksa fasulye. Yanına limon ve yeşillik. Kızartma ile mayonezi aynı anda istemezsen birini seç, ikisi de kalsın.",
	"Akşam erken bir çorba, mercimek ya da sebze. Bir dilim ekmek. Sonra acıkırsan bir meyve yeter. İkinci tabağa borçlu değilsin.",
	"Ara öğünde mevsim meyvesi ve bir kaşık tahin. Ekmeğe sürmek de olur. Cipsi özlemen ayıp değil. Bu sadece yanında duran daha yumuşak bir seçenek.",
	"Bulgur ya da kinoa, bol yeşillik. Sos yoğurt ya da limon. Öğle seni tutsun, akşam kendini hafif hissetmen için yer kalsın.",
	"Haşlanmış patates, az tuz, yanında yoğurt ya da cacık. Geç olduysa küçük bir kâse yeter. Kızartma bugün şart değil.",
	"Peynir, salatalık, domates ve bir dilim ekmek. Otur, yavaş ye. Meyve suyu olmasa da su yanında güzel durur.",
	"Sebze yemeği ve küçük bir kepçe pilav. İkinci kepçe yarına kalabilir. Ekmek istersen pilavı biraz azalt, ikisini birden de sevebilirsin.",
	"Bir kâse yoğurt, içine meyve. Kaşık yavaş gitsin. Bu öğün de seni sever.",
	"Omlet ve yeşillik. Az yağ, bol renk. Ayakta yeme, bir sandalyeye otur.",
	"Mercimek çorbası ve limon. Ekmek istersen bandır, bandırmasan da doyarsın.",
	"Izgara tavuk ya da nohut, yanında salata. Sosu sen koy, tabak seni zorlamasın.",
	"Akşam kahvaltısı da olur: peynir, domates, zeytin. Kurallı olmak zorunda değilsin.",
	"Fırın elma, biraz tarçın. Tatlı niyetine, küçük bir kâse. Kendini esirgeme.",
	"Pirinç lapası ya da çorba, mide yorgunken. Tuz az, sıcaklık çok.",
	"Bir avuç ceviz ve meyve, ara öğün. Açık kalmak zorunda değilsin.",
	"Sebzeli yumurta. Akşam da kahvaltı da yakışır. İkisinden birini seç, ikisi de güzel."
];
var LINES = [
	"Bugün biraz yavaşlamak sana iyi gelir. Liste kısalabilir, iş yarına kalabilir. Bitmeyen şey seni eksik yapmaz.",
	"Öğle yemeğini kendinden esirgeme. Aç kalıp akşama yüklenmek bedenini yorar. Masada on dakika oturmak, kendine verdiğin küçük bir söz.",
	"Akşam yemeğini erken ve sakin kapat. Mutfak toplanınca ikinci tura gerek kalmaz. Tatlı istersen bir meyve de seni karşılar.",
	"Su bardağını gözünün önünde tut. Hatırlatmak için kendine yük olma. Çay ve kahve dursun, su da yanında dursun.",
	"On beş dakikalık yumuşak bir yürüyüş yeter. Rekor senin borcun değil. Ağrı olursa dön. Bunu yazmak zorunda da değilsin.",
	"Tatlı gelecekse önce yoğurt, yumurta ya da peynir ye. Hâlâ istiyorsan küçük bir porsiyon al. Kendine yasak koyma.",
	"Yatmadan bir saat önce ekranı bırakırsan oda sana daha yumuşak gelir. Uyku gelmezse kalk, biraz dolaş. Telefonu yatağa alma, kendine yer bırak.",
	"Omuzlarını indir, çeneni gevşet, nefesi biraz uzat. Su içerken de hatırla. Düzeltmek için değil, bedenine “buradayım” demek için.",
	"Bugün yeni bir diyet açma. Bildiğin yemeği ye. Liste ve yasak bugün seni daha da yorar. Bildiğin yeter.",
	"Alışık olduğun yemek, alışık olduğun yürüyüş. Misafirlikte bir tabak da olur. Üç çeşit tatmak zorunda değilsin.",
	"Güne bir bardak suyla başla. Kahve hemen ardından da gelebilir. Küçük bir kahvaltı içini ısıtır. Aç kahve mideni yalnız bırakmasın.",
	"Akşam planın sade kalsın. Yeni bir buluşma eklemek zorunda değilsin. Çantanı bu akşam hazırlarsan sabah kendine daha yumuşak gelir.",
	"Bugün kendine iyi gelen şey küçük olabilir. Bir bardak, bir nefes, bir erken yatış.",
	"Acele eden bir günse, sen acele etmek zorunda değilsin. Bir iş yarına kalsın.",
	"Bedenin yavaş diyorsa inan. Liste kısalabilir, sen eksilmezsin.",
	"Tatlı söz bugün kendine de gelsin. “İyi gidiyorsun” demen yeter.",
	"Bir şeyi bitiremediysen gün boşa gitmedi. Kalkmış olman da sayılır.",
	"Kalabalıksa ara ver. Sessiz bir oda, beş dakika, yeniden sen.",
	"Akşam üstü omuzların düşsün. Dünyayı bu gece düzeltmen gerekmiyor.",
	"Yarın da var. Bugün nazik kalsın, bu kadar.",
	"Küçük bir gülümseme de bakım sayılır. Aynaya bakınca acele etme."
];
var MOVES = [
	"On dakika düz yürüyüş. Konuşabilecek kadar yavaş. Merdiven varsa tutun. Bitince omuzlarını bırak, başka bir şey yapmana gerek yok.",
	"Oturup omuzlarını çevir. Öne beş, geriye beş, usulca. Boynunu zorlama. Çay demlenirken, kendinle kalabileceğin küçük bir an.",
	"Sırt üstü kısa bir kalça köprüsü. Topuklar yerde, on iki tekrar yeter. Belin söylerse dur. Nefesi tutma, bırak akıp gitsin.",
	"Eller ve dizler yerde, kedi-inek. Sekiz yavaş nefes. Hareket küçük kalsın. Başın dönerse otur, bu da hareketin parçası.",
	"Sırtını duvara ver. Dört sayı al, altı sayı ver. Beş tur. Bu antrenman değil. Ayakta kendine verdiğin bir nefes molası.",
	"Sandalyede gövdeni yavaşça sağa, sonra sola çevir. Her yanda üç nefes. Dizler yerinde. Zor gelirse küçült, zorlamak yok.",
	"Ayakta baldırını esnet, duvara tutun. Her bacakta yirmi saniye. Zıplama yok. Topuk yerde, nefesin yanında.",
	"Yerinde yumuşak adım, iki dakika. Dizleri yükseğe kaldırmak şart değil. Nefes kesilirse dur. Sessizlik de olur, müzik de.",
	"Çocuk pozu. Dizler yerde, alın yere ya da yumruğunun üstüne, bir dakika. Belin hassassa dizlerinin arasına bir yastık koy. Kendine yer aç.",
	"Boynunu yana bırak, kulak omuza yaklaşsın, değmek zorunda değil. Her yanda üç nefes. Elle çekme. Ağrı olursa nazikçe geri gel.",
	"Ayakta yana eğil. Bir kol başının üstünde, diğeri kalçada. Her yanda üç nefes. Acele yok. Belden kırmana gerek yok.",
	"Sırt üstü bir dizi göğsüne çek, diğer bacak uzun. Her yanda yirmi saniye. Belin kalkıyorsa dizi biraz daha az çek. Zorlama.",
	"Pencereden dışarı bakarak üç derin nefes. Bu da hareket. Kimse saymak zorunda değil.",
	"Otururken ayak bileğini çevir, yavaşça. Her yöne beş. Masadan kalkmadan da olur.",
	"İki dakika yerinde sallan. Müzik varsa fısıltı gibi. Yoksa sessizlik de dans sayılır.",
	"Ellerini ovuştur, avuçlarını yanaklarına koy. Sıcaklık küçük bir merhaba.",
	"Merdiveni yavaş in. Tutun. Acele inmek bugünün görevi değil.",
	"Yastığa yaslan, dizlerini yana bırak. Bir dakika. Buna esneme demen yeter.",
	"Omuzlarını kulaklarına çek, sonra bırak. Üç kez. Yük orada kalmasın.",
	"Mutfakta bir şarkı, yavaş adım. İki dakika. Terlemek şart değil.",
	"Akşam ışığında gerin. Kollar yukarı, nefes dışarı. Gün burada kapansın."
];
var FOCUSES = [
	"Bugün kendine sıcak bir tabak ve az tuz yeter. Sos yanında dursun, isteyince eklersin. Tuz da sonra, sen karar ver.",
	"Tabağının yarısı yeşillik olursa bedenin rahatlar. Ağır sos ile kızartmayı aynı anda istemezsen birini bırak. Ekmek istersen bir dilim senin.",
	"Su ve gölge bugün sana iyi gelir. Güneşli yürüyüş yarına kalabilir. Bardağın dolu dursun. Kahveyi öğleden sonraya alırsan su daha kolay içilir.",
	"Erken yatmak bugün bir lütuf. Yarınki iş bu gece bitmek zorunda değil. Işığı kıs, ekranı başka odaya bırak. Saati biraz öne çekmen yeter.",
	"Öğle seni tutsun: yumurta, yoğurt, mercimek ya da peynir. Öğleni atlamak zorunda değilsin. Akşam tatlısı da küçük kalabilir, yasak değil.",
	"Akşam hafif ve sıcak olsun. Çorba ya da sebze, küçük bir pilav. İkinci çeşit pişirmek senin borcun değil.",
	"Kısa bir hareket, uzun bir nefes. On dakika yeter. Nefesin kesilen yere çıkma. Bitince omuzlarını ve çeneni yokla, orada mısın diye.",
	"Bildik düzen bugün yeterli. Yeni ders, yeni diyet, yeni uygulama yok. Dünkü yürüyüş ve dünkü tabak yine seni karşılar.",
	"Tatlıyı küçültebilirsin, kendinden esirgeme. İstersen yarım porsiyon, yanında yoğurt ya da meyve. Paketi kaldırmak da olur, sofrada bırakmak da.",
	"Bugün bir kâse çorba ve bir dilim ekmek yeter. Yanına ağır bir şey eklemek zorunda değilsin. Sıcaklık alsın seni.",
	"Sabahı yavaş aç. Önce su, sonra bir lokma, kahve onların ardından. Haber ve mesaj ilk on dakikanı senden almasın.",
	"Akşam sakin kalsın. Yeni plan ekleme. Evi bitirmek için uykunu erteleme. Bulaşık yarına kalabilir. Işık ve ses biraz azalsın, sen de azalsın.",
	"Bugün tuz az, sıcak çok olsun. Çorba seni tutar.",
	"Su bardağını sevdiğin yere koy. Gözün değince hatırlarsın, kendine yük olmadan.",
	"Akşam ışığını kıs. Yarınki iş bu lambanın altında bitmek zorunda değil.",
	"Bir meyve, bir lokma peynir. Ara öğün de şefkat olabilir.",
	"Yürüyüş kısa, nefes uzun. İkisini karıştırma, ikisi de senin.",
	"Bugün yeni kural yok. Dünkü iyi gelen şey yine gelsin.",
	"Tatlıyı paylaş ya da küçült. Kendinden tamamen alma.",
	"Erken bir duş, gevşek bir pijama. Gün burada yumuşasın.",
	"Masada telefon ters dursun. Yemek sadece yemek olsun, bir süre."
];
var SEASONS = [
	[
		{
			lead: "Ocak’ta yeni bir liste açma. Bildiğin sabah yeter.",
			a: "Kahvaltıyı sıcak tut. Çorba da, yumurta da olur.",
			b: "Akşam yürüyüşü kısa olsun. Evde on dakika da sayılır."
		},
		{
			lead: "Ocak soğuğu acele sevmez.",
			a: "Bir kat fazla al, içeride terleyince çıkar.",
			b: "Akşam çayın yanında bir lokma bulundur."
		},
		{
			lead: "Yılın ilk ayı yavaş açılabilir.",
			a: "Haberi kahveden sonraya bırak.",
			b: "Erken yatmak da bir başlangıçtır."
		},
		{
			lead: "Ocakta kendine borç yazma.",
			a: "Bildiğin yemeği ye, yeni diyet yok.",
			b: "Işığı kıs, gün orada kapansın."
		}
	],
	[
		{
			lead: "Şubat griyse ışığı kendin aç.",
			a: "Pencere kenarında on dakika otur.",
			b: "Akşamı çorbayla kapat."
		},
		{
			lead: "Kısa günler suçun değil.",
			a: "Öğleden sonra bir fincan sıcak bir şey.",
			b: "İş bitmese de yatabilirsin."
		},
		{
			lead: "Şubat yavaş bir ay olabilir.",
			a: "Yürüyüşü içeride de yapabilirsin.",
			b: "Tatlıyı küçült, kendinden alma."
		},
		{
			lead: "Gri havada nazik kal.",
			a: "Sevdiğin kazağı giy, gerekçesi olmasın.",
			b: "Akşam telefonu başka odaya bırak."
		}
	],
	[
		{
			lead: "Mart rüzgârlı. İnce bir kat yanında olsun.",
			a: "Hırkanı çıkarma, rüzgâr çabuk keser.",
			b: "Öğle tabağın sade kalsın."
		},
		{
			lead: "Mart bir açılır bir kapanır.",
			a: "Islanırsan kuru çorap bulundur.",
			b: "Akşam yürüyüşünü pencereye göre seç."
		},
		{
			lead: "İlkbahar acele etmesin.",
			a: "Yeşillik varsa ekle, yoksa bildiğin yemek.",
			b: "Erken kararan akşama kızma."
		},
		{
			lead: "Martta omuzların düşsün.",
			a: "Çayın sıcak olsun, planın kısa.",
			b: "Yarın da rüzgâr eser, bugün bitirmek zorunda değilsin."
		}
	],
	[
		{
			lead: "Nisan yağmuru planı bozabilir.",
			a: "Islak havada uzun yürüyüş şart değil.",
			b: "Çayın yanında bir dilim ekmek."
		},
		{
			lead: "Yağmur da bir mola sayılır.",
			a: "Pencereden bak, üç nefes yeter.",
			b: "Akşam çorbası evi ısıtır."
		},
		{
			lead: "Nisan tatlı ama ıslak.",
			a: "Ayakkabın kurusun, sen acele etme.",
			b: "Bir meyve, günü tatlandırır."
		},
		{
			lead: "Bozulan plan seni borçlu etmez.",
			a: "İçeride esne, dışarıyı yarına bırak.",
			b: "Işığı erken kıs."
		}
	],
	[
		{
			lead: "Mayıs akşamı uzuyor.",
			a: "Yemekten önce on dakika dışarı çık.",
			b: "Tabağa bir renk ekle, kural ekleme."
		},
		{
			lead: "Mayıs yeşil ve yavaş olsun.",
			a: "Çilek ya da yoğurt, küçük bir kâse.",
			b: "Akşamı yeni bir davete doldurma."
		},
		{
			lead: "Gün ışığı sana kalsın.",
			a: "Öğle yürüyüşü gölgede de olur.",
			b: "Su bardağı masada dursun."
		},
		{
			lead: "Mayısta acele etme.",
			a: "Akşam yemeğini karanlık bastırmadan ye.",
			b: "Sonra ışığı kıs, gün bitti."
		}
	],
	[
		{
			lead: "Haziran sıcak. Su gölgede dursun.",
			a: "Öğle yürüyüşünü ertele.",
			b: "Ayran ya da cacık yanında olsun."
		},
		{
			lead: "Sıcak bir gün, yumuşak bir tempo.",
			a: "Serin bir duş akşamı toplar.",
			b: "Öğünü ağır sosla doldurma."
		},
		{
			lead: "Haziranda gölge de bakım.",
			a: "Meyve öğünün yanına gelsin, yerine değil.",
			b: "Akşam erken, oda serin."
		},
		{
			lead: "Güneş nazik değilse sen nazik ol.",
			a: "Şapka ya da gölge, ikisi de olur.",
			b: "Bir bardak su, hatırlatmadan önce."
		}
	],
	[
		{
			lead: "Temmuz öğlesi yakar.",
			a: "Antrenmanı akşama bırak.",
			b: "Meyve yanında dursun, akşam küçük bir tabak."
		},
		{
			lead: "Sıcakta kahramanlık yok.",
			a: "Öğle uykusu kısa olsun, geceyi çalmasın.",
			b: "Soğuk bir şey, yudum yudum."
		},
		{
			lead: "Temmuzda gölge yeter.",
			a: "Yürüyüşü gün batımına kaydır.",
			b: "Tuzlu ayran da su sayılır, bir bardak."
		},
		{
			lead: "Bugün serin kalmak da iş.",
			a: "İnce kıyafet, bol su.",
			b: "Akşam balkonu ya da pencere, beş dakika."
		}
	],
	[
		{
			lead: "Ağustos dağınık geçebilir.",
			a: "Misafirlikte bir tabak seç.",
			b: "Akşamı biraz öne çek."
		},
		{
			lead: "Tatil bitse de tempo yumuşak kalsın.",
			a: "Bildiğin kahvaltıya dön.",
			b: "Erken yat, telafiyi yarına bırakma."
		},
		{
			lead: "Ağustosta sadeleş.",
			a: "Üç çeşit yerine birini sev.",
			b: "Su ve meyve, günün omurgası."
		},
		{
			lead: "Dağınık gün de gün sayılır.",
			a: "Listeyi kısalt.",
			b: "Akşam ışığı az, ses az."
		}
	],
	[
		{
			lead: "Eylül tempo artar. Akşam yemeğini işe bırakma.",
			a: "Çantana su ve bir ara öğün koy.",
			b: "Eve gelince önce su, sonra mutfak."
		},
		{
			lead: "Okul ya da iş, sen yine yumuşak kal.",
			a: "Öğleni toplantıya yedirme.",
			b: "Akşam yürüyüşü on dakika yeter."
		},
		{
			lead: "Eylül düzeni nazik olsun.",
			a: "Sabah bir lokma, sonra kapı.",
			b: "Geceyi yarına devretme."
		},
		{
			lead: "Yeni tempo, eski şefkat.",
			a: "Bildik yemeğe dön.",
			b: "Telefonu masadan indir, bir öğün."
		}
	],
	[
		{
			lead: "Ekim serin. Ağır program açma.",
			a: "Çorba ve bir dilim ekmek yeter.",
			b: "Bir kat fazla al, terleyince çıkar."
		},
		{
			lead: "İlk soğukta acele etme.",
			a: "Akşam lambası erken yansın.",
			b: "Yürüyüş kısa, atkı uzun."
		},
		{
			lead: "Ekim yaprak gibi yavaşlasın.",
			a: "Sıcak bir içecek, öğleden sonra.",
			b: "Erken yatmak bu ay yakışır."
		},
		{
			lead: "Hava değişince beden de değişir.",
			a: "Çorap ve çorba, küçük bir düzen.",
			b: "Yeni spor listesi yarına kalsın."
		}
	],
	[
		{
			lead: "Kasım erken kararıyor. Akşam ışığını ekrana bırakma.",
			a: "Masaya küçük bir lamba koy. Yemeği o ışıkta ye.",
			b: "Sıcak çorba ve kalın çorap. Yeni spor listesi yok."
		},
		{
			lead: "Kasım yağmuru bir mola.",
			a: "Islaksa içeride esne. Dışarı borç değil.",
			b: "Bir fincan papatya, günü kapatır."
		},
		{
			lead: "Kısa gün, uzun nefes.",
			a: "Öğleden sonra ışığı aç, kendine görün.",
			b: "Akşam ikinci plan ekleme."
		},
		{
			lead: "Kasımda ev sıcak kalsın.",
			a: "Kestane, çorba ya da sahlep, küçük bir kâse.",
			b: "Yatmadan telefon başka odada."
		},
		{
			lead: "Gün erken bitiyor, sen bitmek zorunda değilsin.",
			a: "İşin kalanı yarına not olsun.",
			b: "Kalın bir battaniye, erken bir yatış."
		},
		{
			lead: "Kasım nazik bir ay olabilir.",
			a: "Sevdiğin kazağı gerekçesiz giy.",
			b: "Akşam yürüyüşü market kadarı da yeter."
		},
		{
			lead: "Yağmur camda, sen içeridesin.",
			a: "Üç nefes, pencerenin önünde.",
			b: "Sıcak tabak, az tuz, bol yavaşlık."
		},
		{
			lead: "Kasım akşamı sana kalsın.",
			a: "Misafirlik yoksa evde kalmak da şenlik.",
			b: "Işığı kıs, yarın yine gelir."
		}
	],
	[
		{
			lead: "Aralık kalabalık. Bir tabak da kutlama.",
			a: "Sofrada bir çeşit seç.",
			b: "Yanında su dursun."
		},
		{
			lead: "Aralıkta uyku da hediye.",
			a: "İkinci gece planını ekleme.",
			b: "Erken dön, yarın da var."
		},
		{
			lead: "Kalabalıkta kendine bir boşluk bırak.",
			a: "Bir köşede bir fincan, beş dakika.",
			b: "Tatlıdan bir dilim yeter, tepsisi değil."
		},
		{
			lead: "Yıl kapanırken acele kapanmasın.",
			a: "Listeyi yakma, kısalt.",
			b: "Akşam ışığı az, ses az, sen varsın."
		}
	]
];
var MORNINGS = [
	"Günaydın. Bugün kendine nazik bir bakış yeter.",
	"Günaydın. Acele yok, önce bir yudum su.",
	"Günaydın. Küçük bir kahvaltı günü yumuşatır.",
	"Günaydın. Bugün her şeyi bitirmek zorunda değilsin.",
	"Günaydın. Omuzlarını indir, gün oradan başlasın.",
	"Günaydın. Bir bardak sıcak bir şey, sonra kapı.",
	"Günaydın. Yavaş bir sabah da verimli sayılır.",
	"Günaydın. Kendine iyi gelen şeyi bugün de seç.",
	"Günaydın. Liste kısalabilir, sen eksilmezsin.",
	"Günaydın. Işık vurmuşsa bir dakika dur, bak.",
	"Günaydın. Bugün nazik kalmak da bir plan.",
	"Günaydın. Bedenin ne diyorsa ona küçük bir yer aç.",
	"Günaydın. Kahveden önce bir lokma, miden sevinsin.",
	"Günaydın. Bugün de buradayız, acele etmiyoruz.",
	"Günaydın. Bir gülümseme, bir bardak su. Başlangıç bu.",
	"Günaydın. Zor bir günse bile ilk adım yumuşak olsun."
];
var EVENINGS = [
	"Işığı kıs, ekranı bırak. Yarın da buradayız.",
	"Akşam sana kalsın. İkinci bir plan ekleme.",
	"Battaniyeyi çek, gün bitti. Kalan iş yarına not.",
	"Bir fincan sıcak bir şey, sonra ışıklar insin.",
	"Bu gece erken yatmak da şefkat.",
	"Telefonu başka odaya bırak. Oda senin olsun.",
	"Akşam yürüyüşü market kadarı da yeter, sonra ev.",
	"Yarın yine gelir. Bu geceyi tamamlaman gerekmez."
];
var PHASE_LINES = {
	Kanama: [
		"Sıcak bir şey ve kısa bir yürüyüş yeter. Kendini aceleye sokma.",
		"Bugün yavaş olmak bir eksik değil. Battaniye de plan sayılır.",
		"Kramp varsa dur. Sıcak su torbası küçük bir dost.",
		"İş listesi kısalabilir. Bedenin bugün önde.",
		"Tatlı bir çorba, erken bir yatış. Başka borç yok.",
		"Kendine sert konuşma. Bu günler geçici, sen kalıcısın."
	],
	"Foliküler faz": [
		"Enerjin toparlanıyor. Küçük bir plan bile bugüne yeter.",
		"İçin açıksa bir işi seç, hepsini değil.",
		"Yürüyüş bugün daha kolay gelebilir. Yine de yavaş başla.",
		"Yeni bir fikre yer var. Zorlamak yok, davet var.",
		"Sabah ışığına bir dakika bak. Gün oradan açılsın.",
		"Gücün varsa paylaş, yoksa sakla. İkisi de doğru."
	],
	"Doğurgan pencere": [
		"Bedenin daha canlı hissedebilir. Bu bir test değil, sadece bir not.",
		"Bugün parlak hissediyorsan tadını çıkar, görev çıkarma.",
		"Su ve uyku bu pencereyi de tutar. İkisini esirgeme.",
		"Sosyal bir gün olabilir. Yorulursan eve dönmek de cevap.",
		"Nazik bir enerji. Onu tüketmek zorunda değilsin.",
		"Ayna bugün yumuşak dursun. Acele etme."
	],
	"Luteal faz": [
		"Akşamı sade bırak. Bitmeyen iş yarına kalabilir.",
		"Tatlı çekebilir. Küçük bir porsiyon da sevgi sayılır.",
		"Tempoyu bir kademe indir. Kimseye açıklamak zorunda değilsin.",
		"Tuzlu atıştırmalık yerine önce bir yemek. Sonra karar verirsin.",
		"Erken yatmak bu fazda çok yakışır.",
		"Sinir geldiyse ertele. Yarınki sen daha sakin konuşur."
	],
	"Adet öncesi": [
		"Hassas hissedebilirsin. Sert bir konuşmayı ertelemek de olur.",
		"Bugün kendine geniş bir yer aç. Kalabalık şart değil.",
		"Bir fincan papatya, bir erken yatış. Gün bu kadar da olabilir.",
		"Göğsün ya da karnın hassassa sıkı kıyafeti çıkar.",
		"Ağlamak da olur. Sonra su iç, omuzların düşsün.",
		"Yarın daha yumuşak olabilir. Bu akşamı zorlama."
	]
};
var WATER_LINES = [
	"İstersen bir bardak daha. Zorunda değilsin, sadece hatırlatma.",
	"Su bardağın gözünün önünde mi? Bir yudum yeter, şimdi.",
	"Çayın yanında bir bardak su da dursun. İkisi kardeş.",
	"Susamadın diye geç kalma. Küçük bir yudum, büyük bir iyilik.",
	"Bardak boşaldıysa doldur. Kendine söylediğin küçük bir evet.",
	"Öğleden sonra suyu unutmak kolay. Bu not sadece bir fısıltı."
];
var WATER_DONE = [
	"Bugünkü su tamam. Kendine küçük bir teşekkür yeter.",
	"Su hedefin doldu. Güzel, nazik bir iş başardın.",
	"Bardaklar tamam. Akşam başka bir borç yok bu konuda.",
	"Su bitti sayılır. Şimdi omuzlarını bırakabilirsin."
];
function daySalt(date, salt) {
	return date.getDate() + date.getMonth() * salt + date.getFullYear();
}
function morningLine(date = /* @__PURE__ */ new Date()) {
	return MORNINGS[daySalt(date, 3) % MORNINGS.length];
}
function eveningLine(date = /* @__PURE__ */ new Date()) {
	return EVENINGS[daySalt(date, 5) % EVENINGS.length];
}
function phaseLine(phaseName, date = /* @__PURE__ */ new Date()) {
	const list = PHASE_LINES[phaseName] ?? ["Bugün de kendine iyi davran. Acele yok."];
	return list[daySalt(date, 2) % list.length];
}
function waterLine(remaining, date = /* @__PURE__ */ new Date()) {
	const list = remaining > 0 ? WATER_LINES : WATER_DONE;
	return list[daySalt(date, 4) % list.length];
}
function supplementLine(name, dose, date = /* @__PURE__ */ new Date()) {
	const soft = [
		"İstersen şimdi",
		"Nazik bir hatırlatma",
		"Acele yok, sadece saat",
		"Kendine küçük bir iyilik",
		"Varsa yanındaysa"
	];
	return `${soft[daySalt(date, 1) % soft.length]}: ${name}${dose ? `, ${dose}` : ""}.`;
}
function dailySuggestion(date = /* @__PURE__ */ new Date()) {
	const month = date.getMonth();
	const day = date.getDate();
	const pick = (list, salt) => list[(day + month * salt) % list.length];
	const seasonPack = SEASONS[month];
	const season = seasonPack[day % seasonPack.length];
	return {
		month: MONTHS[month],
		day,
		tea: pick(TEAS, 1),
		food: pick(FOODS, 3),
		line: pick(LINES, 5),
		move: pick(MOVES, 7),
		focus: pick(FOCUSES, 2),
		seasonLead: season.lead,
		seasonA: season.a,
		seasonB: season.b
	};
}
var CHANNEL = "floria";
function native() {
	return typeof window !== "undefined" && Capacitor.isNativePlatform();
}
function parseTime(value) {
	const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
	if (!match) return null;
	const hour = Number(match[1]);
	const minute = Number(match[2]);
	if (hour > 23 || minute > 59) return null;
	return {
		hour,
		minute
	};
}
async function readNotifyState() {
	if (!native()) return "unsupported";
	const status = await LocalNotifications.checkPermissions();
	if (status.display === "granted") return "granted";
	if (status.display === "denied") return "denied";
	return "default";
}
async function ensureChannel() {
	await LocalNotifications.createChannel({
		id: CHANNEL,
		name: "Floria",
		description: "Kapalıyken de gelen hatırlatma",
		importance: 4,
		visibility: 1
	});
}
async function syncReminders(supplements) {
	if (!native()) return;
	if ((await LocalNotifications.checkPermissions()).display !== "granted") return;
	try {
		if ((await LocalNotifications.checkExactNotificationSetting()).exact_alarm !== "granted") await LocalNotifications.changeExactNotificationSetting();
	} catch {}
	await ensureChannel();
	const ours = (await LocalNotifications.getPending()).notifications.filter((item) => item.id >= 901 && item.id <= 920 || item.id >= 1200 && item.id < 1800).map((item) => ({ id: item.id }));
	if (ours.length) await LocalNotifications.cancel({ notifications: ours });
	const notifications = [];
	for (let offset = 0; offset < 10; offset += 1) {
		const at = /* @__PURE__ */ new Date();
		at.setDate(at.getDate() + offset);
		at.setHours(9, 0, 0, 0);
		if (at.getTime() < Date.now() + 3e4) continue;
		notifications.push({
			id: 901 + offset,
			title: "Floria",
			body: morningLine(at),
			channelId: CHANNEL,
			schedule: {
				at,
				allowWhileIdle: true
			}
		});
	}
	supplements.forEach((item, index) => {
		if (!item.reminderEnabled) return;
		const time = parseTime(item.time);
		if (!time) return;
		for (let offset = 0; offset < 7; offset += 1) {
			const at = /* @__PURE__ */ new Date();
			at.setDate(at.getDate() + offset);
			at.setHours(time.hour, time.minute, 0, 0);
			if (at.getTime() < Date.now() + 3e4) continue;
			notifications.push({
				id: 1200 + index * 10 + offset,
				title: "Floria",
				body: supplementLine(item.name, item.dose, at),
				channelId: CHANNEL,
				schedule: {
					at,
					allowWhileIdle: true
				}
			});
		}
	});
	if (notifications.length) await LocalNotifications.schedule({ notifications });
}
async function askNotifyPermission(supplements = []) {
	if (!native()) return "unsupported";
	const perm = await LocalNotifications.requestPermissions();
	if (perm.display !== "granted") return perm.display === "denied" ? "denied" : "default";
	await syncReminders(supplements);
	window.dispatchEvent(new Event("floria-notify"));
	await LocalNotifications.schedule({ notifications: [{
		id: 902,
		title: "Floria",
		body: "Hatırlatmalar açık. Uygulama kapalıyken de gelir.",
		channelId: CHANNEL,
		schedule: {
			at: new Date(Date.now() + 1500),
			allowWhileIdle: true
		}
	}] });
	return "granted";
}
var Header = ({ currentCycleDay, currentPhaseName, menuLabel, setActiveTab, waterRemaining, premium }) => {
	const [showNotifications, setShowNotifications] = (0, import_react.useState)(false);
	const [readIds, setReadIds] = (0, import_react.useState)([]);
	const notifications = (0, import_react.useMemo)(() => {
		const today = /* @__PURE__ */ new Date();
		const phase = phaseLine(currentPhaseName, today);
		const titles = [
			"Bugün sana",
			"Nazik bir not",
			"Floria yanında",
			"Yavaş bir hatırlatma",
			"Küçük bir fısıltı"
		];
		const title = titles[(today.getDate() + today.getMonth()) % titles.length];
		const water = waterRemaining > 0 ? {
			id: "water",
			title: "Bir yudum su",
			time: "Bugün",
			desc: waterLine(waterRemaining, today),
			type: "water"
		} : {
			id: "water",
			title: "Su doldu",
			time: "Bugün",
			desc: waterLine(0, today),
			type: "water"
		};
		return [
			{
				id: "day",
				title,
				time: `${currentCycleDay}. gün`,
				desc: phase,
				type: "pms_calm"
			},
			water,
			{
				id: "evening",
				title: "Akşam sana kalsın",
				time: "Akşam",
				desc: eveningLine(today),
				type: "pms_calm"
			}
		].map((item) => ({
			...item,
			read: readIds.includes(item.id)
		}));
	}, [
		currentCycleDay,
		currentPhaseName,
		waterRemaining,
		readIds
	]);
	const markAllAsRead = () => {
		soundEngine.playDropletSound();
		setReadIds(notifications.map((item) => item.id));
	};
	const unreadCount = notifications.filter((n) => !n.read).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 bg-[#fff8f8]/95 backdrop-blur-md border-b border-[#f6ebed] transition-all",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md mx-auto px-4 h-16 flex items-center justify-between relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloraLogo, { size: "md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col select-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-black text-base tracking-tight text-[#1f1a1c] leading-tight",
						children: ["Flor", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[#d81b60]",
							children: "ia"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] font-semibold text-[#805062] flex items-center gap-1",
						title: currentPhaseName,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-[#d81b60]" }),
							menuLabel,
							premium ? " · Kraliçe" : ""
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							soundEngine.playDropletSound();
							askNotifyPermission();
							setShowNotifications(!showNotifications);
						},
						className: "w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#805062] hover:text-[#b0004a] hover:bg-pink-50 active:scale-95 transition-all relative cursor-pointer border border-pink-100 shadow-xs",
						"aria-label": "Bildirimler",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-4 h-4" }), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#d81b60] text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white",
							children: unreadCount
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						soundEngine.playDropletSound();
						setActiveTab("profil");
					},
					title: "Profil",
					className: "w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#805062] hover:text-[#b0004a] hover:bg-pink-50 active:rotate-45 transition-all cursor-pointer border border-pink-100 shadow-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "w-4 h-4" })
				})]
			})]
		}), showNotifications && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-start justify-center p-3 pt-16 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 border-b border-pink-100 bg-gradient-to-r from-pink-50 via-rose-50/50 to-white flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloraLogo, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-black text-sm text-[#1f1a1c]",
								children: "Sana notlar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-[#805062] font-semibold",
								children: "Tatlı ve kısa hatırlatmalar"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowNotifications(false),
							className: "w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black cursor-pointer shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 overflow-y-auto space-y-2.5 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] font-bold text-[#805062]",
								children: [
									"Son Güncellemeler (",
									unreadCount,
									" Okunmamış)"
								]
							}), unreadCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: markAllAsRead,
								className: "text-[11px] font-bold text-[#d81b60] hover:underline cursor-pointer",
								children: "Tümünü Okundu Say"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-gray-400",
								children: "Hepsi okundu ✓"
							})]
						}), notifications.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `p-3 rounded-2xl transition-all border ${item.read ? "bg-[#fff8f8] border-pink-50" : "bg-gradient-to-r from-pink-50/90 to-rose-50/70 border-pink-200 shadow-xs"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-7 h-7 rounded-full bg-white shadow-xs flex items-center justify-center shrink-0 mt-0.5 text-base",
									children: item.type === "pms_calm" ? "🕊️" : item.type === "follicular" ? "🌱" : item.type === "ovulation" ? "🌸" : item.type === "water" ? "💧" : "💊"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-[#1f1a1c] truncate",
											children: item.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-gray-400 shrink-0",
											children: item.time
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-[#5a4044] mt-0.5 leading-snug",
										children: item.desc
									})]
								})]
							})
						}, item.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-3 border-t border-pink-100 bg-[#fff8f8] flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowNotifications(false),
							className: "px-4 py-1.5 text-xs font-bold text-white bg-[#b0004a] hover:bg-[#d81b60] rounded-full shadow-xs cursor-pointer transition-all",
							children: "Kapat"
						})
					})
				]
			})
		})]
	});
};
var defaultPartnerShare = () => ({
	phase: true,
	mood: true,
	flow: false,
	pain: false,
	symptoms: false,
	intimacy: false,
	note: false
});
var ADMOB_BANNER_ID = "ca-app-pub-3940256099942544/6300978111";
var TEST_PUBLISHER = "3940256099942544";
function bridge() {
	if (typeof window === "undefined") return null;
	const cap = window.Capacitor;
	if (!cap?.isNativePlatform?.()) return null;
	return cap.Plugins?.AdMob ?? null;
}
var shown = false;
function admobIsTestUnit() {
	return ADMOB_BANNER_ID.includes(TEST_PUBLISHER);
}
async function showAdMobBanner() {
	const admob = bridge();
	if (!admob) return false;
	await admob.initialize({ initializeForTesting: admobIsTestUnit() });
	await admob.showBanner({
		adId: ADMOB_BANNER_ID,
		adSize: "ADAPTIVE_BANNER",
		position: "BOTTOM_CENTER",
		margin: 78,
		isTesting: admobIsTestUnit(),
		npa: true
	});
	shown = true;
	return true;
}
async function hideAdMobBanner() {
	if (!shown) return;
	const admob = bridge();
	shown = false;
	if (!admob) return;
	try {
		await admob.removeBanner();
	} catch {}
}
var PREMIUM_PLANS = [
	{
		id: "week",
		name: "Haftalık",
		price: 50,
		days: 7,
		note: "7 gün"
	},
	{
		id: "month",
		name: "Aylık",
		price: 99,
		days: 30,
		note: "30 gün"
	},
	{
		id: "year",
		name: "Yıllık",
		price: 499,
		days: 365,
		note: "En seçilen"
	}
];
var PREMIUM_INCLUDES = [
	{
		title: "Rehber",
		text: "Beslenme, egzersiz, ses, nefes, cilt, iş, seyahat ve sosyal. Altı başlık, on sekiz ekran."
	},
	{
		title: "PDF özet",
		text: "Döngü ve belirti kayıtlarından indirilen kişisel özet."
	},
	{
		title: "Reklamsız",
		text: "Premium açıkken alt şeritteki reklam kalkar."
	}
];
var FREE_LINE = "Bugün, döngü takvimi, su, belirti ve rapor rakamları ücretsiz kalır.";
function formatUntil(iso) {
	const [year, month, day] = iso.split("-").map(Number);
	if (!year || !month || !day) return iso;
	return new Date(year, month - 1, day).toLocaleDateString("tr-TR", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
var KEY = "flora-store-receipt";
function todayISO$1(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function readReceipt() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed?.until || !parsed.plan) return null;
		return parsed;
	} catch {
		return null;
	}
}
function isPremiumActive(now = /* @__PURE__ */ new Date()) {
	const receipt = readReceipt();
	return Boolean(receipt && receipt.until >= todayISO$1(now));
}
function planName(id) {
	return PREMIUM_PLANS.find((plan) => plan.id === id)?.name ?? "Premium";
}
function purchasePlan(id) {
	const plan = PREMIUM_PLANS.find((item) => item.id === id) ?? PREMIUM_PLANS[1];
	const until = /* @__PURE__ */ new Date();
	until.setDate(until.getDate() + plan.days);
	const receipt = {
		plan: plan.id,
		price: plan.price,
		until: todayISO$1(until)
	};
	localStorage.setItem(KEY, JSON.stringify(receipt));
	window.dispatchEvent(new Event("flora-premium"));
	return receipt;
}
function restorePlan() {
	const receipt = readReceipt();
	if (!receipt) return null;
	if (receipt.until < todayISO$1()) return null;
	window.dispatchEvent(new Event("flora-premium"));
	return receipt;
}
function AdBanner({ premium, onRemove }) {
	const [hidden, setHidden] = (0, import_react.useState)(premium || isPremiumActive());
	const [native, setNative] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHidden(premium || isPremiumActive());
	}, [premium]);
	(0, import_react.useEffect)(() => {
		const sync = () => setHidden(isPremiumActive());
		window.addEventListener("flora-premium", sync);
		return () => window.removeEventListener("flora-premium", sync);
	}, []);
	(0, import_react.useEffect)(() => {
		if (hidden) {
			hideAdMobBanner();
			setNative(false);
			return;
		}
		let cancel = false;
		showAdMobBanner().then((ok) => {
			if (!cancel) setNative(ok);
		});
		return () => {
			cancel = true;
			hideAdMobBanner();
		};
	}, [hidden]);
	if (hidden || native) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-auto mb-2 rounded-2xl border border-[#f0e6e8] bg-white px-3 py-2 shadow-sm flex items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 rounded-md bg-[#f6ebed] px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-[#9a8088]",
				children: "ADMOB"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-w-0 flex-1 text-[11px] leading-snug text-[#5c4a50]",
				children: "Test reklam birimi bağlı. Bu tarayıcıda dolmaz. Android uygulamasında aynı birim açılır. Döngü bilgisi gitmez."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRemove,
				className: "shrink-0 text-[11px] font-semibold text-[#b0004a] cursor-pointer",
				children: "Kaldır"
			})
		]
	});
}
var CYCLE_RING = [
	{
		flower: "🌸",
		radius: 18,
		seconds: 7,
		delay: 0,
		reverse: false
	},
	{
		flower: "🌿",
		radius: 26,
		seconds: 11,
		delay: 1.4,
		reverse: true
	},
	{
		flower: "✨",
		radius: 15,
		seconds: 6,
		delay: .6,
		reverse: false
	},
	{
		flower: "🌼",
		radius: 28,
		seconds: 13,
		delay: 2.2,
		reverse: true
	},
	{
		flower: "🌺",
		radius: 21,
		seconds: 8,
		delay: 1.1,
		reverse: false
	},
	{
		flower: "🍃",
		radius: 24,
		seconds: 10,
		delay: 2.8,
		reverse: true
	},
	{
		flower: "✨",
		radius: 17,
		seconds: 9,
		delay: .3,
		reverse: true
	},
	{
		flower: "🌿",
		radius: 30,
		seconds: 14,
		delay: 1.8,
		reverse: false
	},
	{
		flower: "🌷",
		radius: 20,
		seconds: 8,
		delay: .9,
		reverse: true
	},
	{
		flower: "💐",
		radius: 33,
		seconds: 12,
		delay: 2.5,
		reverse: false
	},
	{
		flower: "🌻",
		radius: 16,
		seconds: 7,
		delay: 1.6,
		reverse: true
	},
	{
		flower: "💮",
		radius: 27,
		seconds: 15,
		delay: .2,
		reverse: false
	},
	{
		flower: "🌹",
		radius: 23,
		seconds: 9,
		delay: 3.2,
		reverse: true
	},
	{
		flower: "🪻",
		radius: 19,
		seconds: 11,
		delay: .7,
		reverse: false
	},
	{
		flower: "🏵️",
		radius: 31,
		seconds: 13,
		delay: 2.1,
		reverse: true
	},
	{
		flower: "🌸",
		radius: 25,
		seconds: 8,
		delay: 1.3,
		reverse: false
	},
	{
		flower: "🌼",
		radius: 22,
		seconds: 10,
		delay: 2.6,
		reverse: true
	},
	{
		flower: "🌺",
		radius: 29,
		seconds: 12,
		delay: .5,
		reverse: false
	},
	{
		flower: "🍃",
		radius: 17,
		seconds: 9,
		delay: 3.4,
		reverse: true
	}
];
var Navigation = ({ activeTab, setActiveTab, premium, partnerMode }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed bottom-0 left-0 right-0 z-40 pb-safe pointer-events-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md mx-auto px-4 pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdBanner, {
				premium,
				onRemove: () => setActiveTab("profil")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-auto bg-white/95 backdrop-blur-xl rounded-full py-2 px-3 shadow-[0_12px_36px_rgba(216,27,96,0.18)] border border-pink-100 flex items-center justify-around",
				children: [
					{
						id: "bugun",
						label: "Bugün",
						icon: Heart
					},
					{
						id: "dongu",
						label: "Döngü",
						icon: CalendarDays
					},
					{
						id: "rehber",
						label: "Rehber",
						icon: Leaf
					},
					{
						id: "raporlar",
						label: "Raporlar",
						icon: ChartNoAxesColumn
					},
					...[],
					{
						id: "profil",
						label: "Profil",
						icon: User
					}
				].map((tab) => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveTab(tab.id),
						className: `relative flex flex-col items-center justify-center transition-all duration-200 cursor-pointer select-none ${isActive ? "text-white" : "text-[#805062] hover:text-[#b0004a]"}`,
						children: isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-10 h-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pointer-events-none absolute inset-0",
									children: CYCLE_RING.map((bit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute left-1/2 top-1/2 h-0 w-0",
										style: {
											animation: `spinSlow ${bit.seconds}s linear infinite`,
											animationDirection: bit.reverse ? "reverse" : "normal",
											animationDelay: `-${bit.delay}s`
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute left-0 top-0 text-[11px] leading-none",
											style: { transform: `translate(-50%, -${bit.radius}px) rotate(${index * 18}deg)` },
											children: bit.flower
										})
									}, `${bit.flower}-${index}`))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#b0004a] to-[#d81b60] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(216,27,96,0.4)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 stroke-[2.5]" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] font-extrabold text-[#b0004a] mt-1",
								children: tab.id === "rehber" && !premium ? "Rehber 👑" : tab.label
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center py-1 px-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 text-[#805062]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] font-semibold text-[#805062] mt-1",
								children: tab.id === "rehber" && !premium ? "Rehber 👑" : tab.label
							})]
						})
					}, tab.id);
				})
			})]
		})
	});
};
function triggerRosePollenBurst(originX, originY) {
	const canvas = document.createElement("canvas");
	canvas.style.position = "fixed";
	canvas.style.top = "0";
	canvas.style.left = "0";
	canvas.style.width = "100vw";
	canvas.style.height = "100vh";
	canvas.style.pointerEvents = "none";
	canvas.style.zIndex = "999999";
	document.body.appendChild(canvas);
	const ctx = canvas.getContext("2d");
	if (!ctx) {
		document.body.removeChild(canvas);
		return;
	}
	const dpr = window.devicePixelRatio || 1;
	const width = window.innerWidth;
	const height = window.innerHeight;
	canvas.width = width * dpr;
	canvas.height = height * dpr;
	ctx.scale(dpr, dpr);
	const startX = originX ?? width / 2;
	const startY = originY ?? height / 2;
	const colors = [
		"#d81b60",
		"#ff80ab",
		"#f43f5e",
		"#fbbf24",
		"#34d399",
		"#ffd9e4"
	];
	const particles = [];
	const count = 55;
	for (let i = 0; i < count; i++) {
		const angle = Math.PI * 2 * i / count + (Math.random() - .5) * .5;
		const speed = 4 + Math.random() * 8;
		particles.push({
			x: startX,
			y: startY,
			vx: Math.cos(angle) * speed,
			vy: Math.sin(angle) * speed - 2.5,
			size: 5 + Math.random() * 7,
			color: colors[Math.floor(Math.random() * colors.length)],
			alpha: 1,
			rotation: Math.random() * 360,
			rotationSpeed: (Math.random() - .5) * 8,
			isPetal: Math.random() > .4
		});
	}
	let animationFrameId;
	function render() {
		if (!ctx) return;
		ctx.clearRect(0, 0, width, height);
		let activeParticles = 0;
		for (const p of particles) {
			if (p.alpha <= .01) continue;
			activeParticles++;
			p.x += p.vx;
			p.y += p.vy;
			p.vy += .22;
			p.vx *= .98;
			p.rotation += p.rotationSpeed;
			p.alpha -= .014;
			ctx.save();
			ctx.translate(p.x, p.y);
			ctx.rotate(p.rotation * Math.PI / 180);
			ctx.globalAlpha = Math.max(0, p.alpha);
			ctx.fillStyle = p.color;
			if (p.isPetal) {
				ctx.beginPath();
				ctx.ellipse(0, 0, p.size, p.size * .6, 0, 0, Math.PI * 2);
				ctx.fill();
			} else {
				ctx.beginPath();
				ctx.arc(0, 0, p.size * .45, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.restore();
		}
		if (activeParticles > 0) animationFrameId = requestAnimationFrame(render);
		else {
			cancelAnimationFrame(animationFrameId);
			if (canvas.parentNode) document.body.removeChild(canvas);
		}
	}
	render();
}
/**
* Accurately calculates conception probability based on cycle day and cycle length.
* Ovulation is typically 14 days before the next period (Luteal phase is stable ~14 days).
*/
function calculateConceptionProbability(cycleDay, cycleLength = 28) {
	const ovulationDay = Math.max(10, cycleLength - 14);
	const diff = cycleDay - ovulationDay;
	ovulationDay - cycleDay;
	if (diff === 0) return {
		percentage: 88,
		label: "Tahmini zirve",
		status: "Zirve",
		tagColor: "bg-rose-100 text-[#b0004a] border-rose-300",
		explanation: "Döngü uzunluğuna göre bugün tahmini zirve. Yumurtlama testi yoktur, bu bir teşhis değildir.",
		daysToPeak: 0
	};
	if (diff === -1) return {
		percentage: 82,
		label: "Tahmini çok yüksek",
		status: "Çok Yüksek",
		tagColor: "bg-pink-100 text-[#b0004a] border-pink-300",
		explanation: "Yumurtlamadan 24 saat önce. Sperm canlılığı ve LH piki sebebiyle gebe kalma ihtimali en yüksek seviyededir.",
		daysToPeak: 1
	};
	if (diff === -2) return {
		percentage: 70,
		label: "Tahmini yüksek",
		status: "Yüksek",
		tagColor: "bg-pink-100 text-[#b0004a] border-pink-200",
		explanation: "Doğurgan pencere doruğa yaklaşıyor. Östrojen zirvesi rahim ortamını optimize ediyor.",
		daysToPeak: 2
	};
	if (diff === -3 || diff === -4) return {
		percentage: diff === -3 ? 55 : 38,
		label: diff === -3 ? "Tahmini yüksek" : "Tahmini orta",
		status: "Yüksek",
		tagColor: "bg-pink-50 text-[#b0004a] border-pink-200",
		explanation: "Doğurganlık penceresi açıldı. Spermler kadın üreme kanalında 3-5 gün canlı kalabilir.",
		daysToPeak: -diff
	};
	if (diff === -5) return {
		percentage: 22,
		label: "Tahmini orta",
		status: "Orta",
		tagColor: "bg-amber-50 text-amber-800 border-amber-200",
		explanation: "Doğurgan pencerenin başlangıç sınırı. Foliküler fazın sonuna yaklaşılıyor.",
		daysToPeak: 5
	};
	if (diff === 1) return {
		percentage: 35,
		label: "Tahmini orta",
		status: "Orta",
		tagColor: "bg-amber-50 text-amber-800 border-amber-200",
		explanation: "Yumurta salındıktan sonra 12-24 saat yaşayabilir; luteal faz başlangıcında pencere kapanmak üzeredir.",
		daysToPeak: -1
	};
	if (cycleDay > 5 && diff < -5) return {
		percentage: 12,
		label: "Tahmini düşük",
		status: "Düşük",
		tagColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
		explanation: "Foliküler faz: Östrojen yükseliyor, yeni foliküller olgunlaşıyor. Henüz ovülasyona birkaç gün var.",
		daysToPeak: Math.max(1, -diff)
	};
	if (cycleDay <= 5) return {
		percentage: 2,
		label: "Tahmini çok düşük",
		status: "Çok Düşük",
		tagColor: "bg-gray-100 text-gray-700 border-gray-200",
		explanation: "Regl kanaması dönemi. Rahim içi astar yenilenmektedir; gebe kalma olasılığı istatistiki olarak asgaridir.",
		daysToPeak: ovulationDay - cycleDay
	};
	return {
		percentage: 3,
		label: "Tahmini çok düşük",
		status: "Çok Düşük",
		tagColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
		explanation: "Luteal faz / PMS: Progesteron hakimiyetinde döllenme penceresi kapanmıştır; beden dinlenme evresindedir.",
		daysToPeak: cycleLength - cycleDay + ovulationDay
	};
}
/**
* Returns customized comforting self-care, pre-anger mitigation, and PMS soothing advice
* based on the logged mood, PMS proximity, and current cycle day.
*/
function getMoodComfortAdvice(mood = "Mutlu", cycleDay = 14, cycleLength = 28) {
	const isPmsPhase = cycleDay >= cycleLength - 5;
	const moodLower = mood.toLowerCase();
	if (moodLower.includes("sinirli") || moodLower.includes("öfke") || isPmsPhase && (moodLower.includes("hassas") || moodLower.includes("yorgun"))) return {
		title: "🕊️ Öfke & Gerginlik Öncesi Şefkatli Sığınak",
		subtitle: isPmsPhase ? "PMS evresinde progesteron dalgalanması tahammülü azaltabilir. Bu senin suçun değil, bedenin sakinlik istiyor." : "Yükselen nabız ve gerginlik hissini yatıştırmak için birkaç dakikalık botanik bir mola ver.",
		tag: "Öfke Öncesi Rahatlama",
		colorTheme: "from-rose-500/10 via-amber-50/50 to-pink-50/80 border-rose-200 text-rose-950",
		soothingTechnique: "4-7-8 Yatıştırıcı Nefes: 4 sn burnundan derin nefes al, 7 sn tut, 8 sn boyunca fısıltıyla bırak. Kortizol seviyen 90 saniyede dengelenir.",
		herbalDrink: "Melisa, Papatya & Çarkıfelek (Passiflora) çayı. Yanına 1 çay kaşığı bal ekleyerek GABA reseptörlerini sakinleştir.",
		nutritionTip: "200 mg Magnezyum Bisglisinat + 1 avuç kabak çekirdeği. Sinir sistemi gerginliğini ve kas kasılmalarını çözer.",
		affirmation: "\"Şu an hissettiğim öfkeyi ve gerginliği yargılamıyorum. Derin bir nefes alıyor ve sakinleşmeyi seçiyorum.\"",
		isHighAlert: true
	};
	if (moodLower.includes("hassas") || moodLower.includes("üzgün")) return {
		title: "🌸 Şefkatli Ruh Hali & Öz-Bakım Kalkanı",
		subtitle: "Duygusal algıların bugün çok açık ve derin. Kendine ekstra nazik davranma vakti.",
		tag: "Duygusal Esenlik",
		colorTheme: "from-purple-500/10 via-pink-50/50 to-white border-purple-200 text-purple-950",
		soothingTechnique: "Gözlerini kapatıp ellerini kalbinin ve karnının üzerine koy. Bedeninin sıcaklığını hissederek 5 yavaş diyafram nefesi al.",
		herbalDrink: "Gül goncası & Lavanta çayı. Ruhsal yorgunluğu ve kalp çarpıntısını hafifletir.",
		nutritionTip: "Kompleks karbonhidratlar (yulaf, fırınlanmış tatlı patates) serotonin sentezini doğal olarak destekler.",
		affirmation: "\"Duygularım değerli. Bedenimin ritmine teslim oluyor ve kendimi olduğum gibi kabul ediyorum.\"",
		isHighAlert: false
	};
	if (moodLower.includes("yorgun") || moodLower.includes("tüken")) return {
		title: "🌙 Adrenal Dinlenme & Sessiz Yenilenme",
		subtitle: "Bedenin enerji rezervlerini korumak istiyor. Bugün ağır görevleri ertelemek bir zayıflık değil, biyolojik bilgeliktir.",
		tag: "Yenilenme Molası",
		colorTheme: "from-indigo-500/10 via-pink-50/40 to-white border-indigo-200 text-indigo-950",
		soothingTechnique: "Ayakları duvara yaslama (Viparita Karani) pozunda 8 dakika uzan. Bacaklardaki venöz dolaşımı ve beyne giden kan akışını rahatlatır.",
		herbalDrink: "Ihlamur veya Zencefil-Limon çayı. Beden ısısını dengeler ve bağışıklık rezervlerini besler.",
		nutritionTip: "Elektrolitli ılık su ve birkaç ceviz içi. Adrenal yorgunluğu hızlıca hafifletir.",
		affirmation: "\"Dinlenmek benim hakkım. Bedenimin dur çağrısını sevgiyle dinliyorum.\"",
		isHighAlert: false
	};
	return {
		title: "✨ Zirve Biyo-Vitalite & Yaratıcı Güç",
		subtitle: "Östrojen ve mutluluk hormonların tepe noktasında! Yüksek motivasyonunu yeni projelere ve sevdiklerine aktar.",
		tag: "Zirve Enerji",
		colorTheme: "from-amber-400/15 via-rose-50/50 to-emerald-50/30 border-amber-200 text-amber-950",
		soothingTechnique: "Dinamik 15 dakikalık yürüyüş veya dans. Artan enerjiyi endorfin patlamasına dönüştür.",
		herbalDrink: "Matcha veya Taze Nane & Limonlu canlı su. Hücresel odaklanmayı berraklaştırır.",
		nutritionTip: "Renkli sebzeler, taze somon ve avokado. Yumurta sağlığını ve mitokondriyal enerjiyi besler.",
		affirmation: "\"Canlıyım, dengeliyim ve biyolojik ritmimle kusursuz bir uyum içindeyim.\"",
		isHighAlert: false
	};
}
function toLocalISO(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function parseLocalISO(iso) {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
	if (!match) return null;
	const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
	return Number.isNaN(date.getTime()) ? null : date;
}
function formatTrDate(iso) {
	const date = parseLocalISO(iso);
	if (!date) return "Seçilmedi";
	return date.toLocaleDateString("tr-TR", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function cycleDayFromLastPeriod(lastPeriodDate, cycleLength) {
	const start = parseLocalISO(lastPeriodDate);
	if (!start || cycleLength < 1) return 1;
	const today = /* @__PURE__ */ new Date();
	today.setHours(0, 0, 0, 0);
	start.setHours(0, 0, 0, 0);
	const diff = Math.round((today.getTime() - start.getTime()) / 864e5);
	if (diff < 0) return 1;
	return diff % cycleLength + 1;
}
function phaseForCycleDay(cycleDay, periodLength, cycleLength) {
	const ovulation = Math.max(periodLength + 1, cycleLength - 14);
	if (cycleDay <= Math.max(1, periodLength)) return "regl";
	if (cycleDay >= ovulation - 1 && cycleDay <= ovulation + 1) return "ovulasyon";
	if (cycleDay > ovulation) return cycleDay >= cycleLength - 3 ? "pms" : "luteal";
	return "folikuler";
}
var TodayTab = ({ currentDayInfo, waterCurrentMl, waterGoalMl, onAddWater, onResetWater, autoResetAtMidnight, onOpenWaterSettings, onOpenSymptomModal, onSelectDay, showToast, cycleLength = 28, onUpdateMood, supplements, onToggleSupplement, userName = "", lastPeriodDate = "", onPeriodStarted }) => {
	const [isBreathingActive, setIsBreathingActive] = (0, import_react.useState)(false);
	const [breathPhase, setBreathPhase] = (0, import_react.useState)("Nefes Al (4s)");
	const [breathTimer, setBreathTimer] = (0, import_react.useState)(4);
	const [pressProgress, setPressProgress] = (0, import_react.useState)(0);
	const [isPressing, setIsPressing] = (0, import_react.useState)(false);
	const [isPoofing, setIsPoofing] = (0, import_react.useState)(false);
	const pressIntervalRef = (0, import_react.useRef)(null);
	const now = /* @__PURE__ */ new Date();
	const todayFormatted = now.toLocaleDateString("tr-TR", {
		day: "numeric",
		month: "long"
	});
	const todayWeekday = now.toLocaleDateString("tr-TR", { weekday: "long" });
	const currentMonthYear = now.toLocaleDateString("tr-TR", {
		month: "long",
		year: "numeric"
	});
	const conceptionInfo = calculateConceptionProbability(currentDayInfo.cycleDay, cycleLength);
	const activeMood = currentDayInfo.mood || "Canlı & Pozitif";
	const phaseName = {
		regl: "Kanama",
		folikuler: "Foliküler faz",
		ovulasyon: "Doğurgan pencere",
		luteal: "Luteal faz",
		pms: "Adet öncesi"
	}[currentDayInfo.phase] || "Döngü";
	const cycleProgress = Math.max(0, Math.min(1, currentDayInfo.cycleDay / cycleLength));
	const moodAdvice = getMoodComfortAdvice(activeMood, currentDayInfo.cycleDay, cycleLength);
	const todayTip = dailySuggestion(now);
	(0, import_react.useEffect)(() => {
		if (!isBreathingActive) {
			setBreathPhase("Nefes Al (4s)");
			setBreathTimer(4);
			return;
		}
		const interval = setInterval(() => {
			setBreathTimer((prev) => prev > 1 ? prev - 1 : 0);
		}, 1e3);
		return () => clearInterval(interval);
	}, [isBreathingActive, breathPhase]);
	(0, import_react.useEffect)(() => {
		if (!isBreathingActive || breathTimer !== 0) return;
		if (breathPhase.startsWith("Nefes Al")) {
			setBreathPhase("Tut (7s)");
			setBreathTimer(7);
		} else if (breathPhase.startsWith("Tut")) {
			setBreathPhase("Yavaşça Ver (8s)");
			setBreathTimer(8);
		} else {
			setBreathPhase("Nefes Al (4s)");
			setBreathTimer(4);
			soundEngine.playCrystalChime();
		}
	}, [
		isBreathingActive,
		breathTimer,
		breathPhase
	]);
	const handleToggleDailySupplement = (id) => {
		soundEngine.playDropletSound();
		triggerRosePollenBurst();
		onToggleSupplement(id);
	};
	const handleSelectQuickMood = (newMood) => {
		soundEngine.playDropletSound();
		if (onUpdateMood) onUpdateMood(newMood);
		showToast("Ruh halin duruyor", `${newMood}. Bunu not aldım.`, "success");
	};
	const startLongPress = () => {
		setIsPressing(true);
		setPressProgress(0);
		const startTime = Date.now();
		const duration = 1200;
		pressIntervalRef.current = setInterval(() => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(100, elapsed / duration * 100);
			setPressProgress(progress);
			if (progress >= 100) {
				clearInterval(pressIntervalRef.current);
				setIsPressing(false);
				setIsPoofing(true);
				triggerRosePollenBurst();
				soundEngine.playResetPoofSound();
				onResetWater();
				showToast("Su baştan", "Sayaç sıfırlandı. İstersen yeniden doldurursun.", "water");
				setTimeout(() => {
					setIsPoofing(false);
					setPressProgress(0);
				}, 600);
			}
		}, 20);
	};
	const cancelLongPress = () => {
		if (pressIntervalRef.current) clearInterval(pressIntervalRef.current);
		setIsPressing(false);
		setPressProgress(0);
	};
	const handleQuickAddWater = () => {
		soundEngine.playDropletSound();
		onAddWater(250);
		showToast("Bir yudum daha", `Bugünkü toplam ${(Math.min(waterCurrentMl + 250, 4500) / 1e3).toFixed(2)} L. Afiyet olsun.`, "water");
	};
	const waterPercent = Math.min(100, Math.round(waterCurrentMl / waterGoalMl * 100));
	const miniDays = Array.from({ length: 5 }, (_, index) => {
		const date = new Date(now);
		date.setDate(now.getDate() - 2 + index);
		const name = date.toLocaleDateString("tr-TR", { weekday: "short" }).replace(".", "");
		return {
			dayNumber: date.getDate(),
			name,
			isCurrent: index === 2
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 pb-40 pt-2 select-none text-[#1f1a1c]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-2 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-semibold text-[#805062] block",
						children: [
							todayFormatted,
							", ",
							todayWeekday
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-2xl font-black text-[#1f1a1c] tracking-tight",
						children: ["Merhaba", userName ? ` ${userName}` : ""]
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mt-0.5 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "px-3 py-1 rounded-full bg-white text-[#b0004a] text-xs font-bold shadow-xs flex items-center gap-1.5 border border-pink-100",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-[#d81b60] animate-ping" }),
							phaseName,
							" · Gün ",
							currentDayInfo.cycleDay
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `px-3 py-1 rounded-full text-xs font-bold shadow-xs flex items-center gap-1 border ${conceptionInfo.tagColor}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-3.5 h-3.5 fill-current" }),
							"Tahmini doğurganlık: ",
							conceptionInfo.label
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `p-5 rounded-3xl bg-gradient-to-br ${moodAdvice.colorTheme} border shadow-[0_8px_24px_rgba(216,27,96,0.08)] space-y-3.5 transition-all`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-start justify-between gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `w-9 h-9 rounded-2xl flex items-center justify-center text-lg shadow-xs ${moodAdvice.isHighAlert ? "bg-rose-500 text-white animate-pulse" : "bg-white text-[#b0004a]"}`,
								children: moodAdvice.isHighAlert ? "🕊️" : "🌸"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-extrabold text-sm text-[#1f1a1c]",
									children: moodAdvice.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[9.5px] font-black px-2 py-0.2 rounded-full ${moodAdvice.isHighAlert ? "bg-rose-100 text-rose-800" : "bg-pink-100 text-[#b0004a]"}`,
									children: moodAdvice.tag
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-[#805062] font-medium leading-snug mt-0.5",
								children: moodAdvice.subtitle
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10.5px] font-bold text-[#805062] block",
							children: "Bugün nasıl hissediyorsun?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-5 gap-1.5",
							children: [
								{
									id: "Canlı & Pozitif",
									icon: "🥰",
									label: "Canlı"
								},
								{
									id: "Sakin",
									icon: "🕊️",
									label: "Sakin"
								},
								{
									id: "Hassas",
									icon: "🥺",
									label: "Hassas"
								},
								{
									id: "Yorgun",
									icon: "😴",
									label: "Yorgun"
								},
								{
									id: "Sinirli",
									icon: "🌩️",
									label: "Öfkeli/Sinirli"
								}
							].map((m) => {
								const isCurrent = activeMood.includes(m.label) || activeMood === m.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleSelectQuickMood(m.id),
									className: `py-2 px-1 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-0.5 ${isCurrent ? "bg-gradient-to-b from-[#b0004a] to-[#d81b60] text-white border-transparent shadow-sm scale-105 font-black" : "bg-white text-[#5a4044] border-pink-100 hover:bg-pink-50 text-[11px]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base",
										children: m.icon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold truncate w-full",
										children: m.label
									})]
								}, m.id);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-2xl bg-white/90 border border-pink-100/80 shadow-xs space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "w-4 h-4 text-[#d81b60]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-[#1f1a1c]",
									children: "4-7-8 Öfke & Gerginlik Yatıştırıcı Nefes"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									soundEngine.playDropletSound();
									setIsBreathingActive(!isBreathingActive);
								},
								className: `px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs ${isBreathingActive ? "bg-rose-100 text-rose-700 hover:bg-rose-200" : "bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white hover:brightness-105"}`,
								children: isBreathingActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "w-3 h-3 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Durdur" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-3 h-3 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Nefes Başlat" })] })
							})]
						}), isBreathingActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-3 flex flex-col items-center justify-center text-center space-y-2 animate-in fade-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-20 h-20 flex items-center justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-0 rounded-full bg-pink-300/40 blur-md transition-all duration-1000 ${breathPhase.startsWith("Nefes Al") ? "scale-125 bg-rose-400/50" : breathPhase.startsWith("Tut") ? "scale-110 bg-amber-400/50" : "scale-90 bg-indigo-300/40"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-16 h-16 rounded-full bg-gradient-to-tr from-[#b0004a] to-rose-400 text-white flex flex-col items-center justify-center shadow-md relative z-10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl font-black",
										children: breathTimer
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] font-bold uppercase",
										children: "sn"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-black text-[#b0004a]",
								children: breathPhase
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-[#805062] mt-0.5",
								children: "Burundan al, göğüste tut, dudaklarını büzerek yavaşça üfle"
							})] })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-[#5a4044] leading-relaxed",
							children: [
								todayTip.move,
								" ",
								todayTip.line
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 rounded-2xl bg-white/90 border border-pink-100/80 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] font-bold text-[#b0004a] flex items-center gap-1 mb-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coffee, { className: "w-3 h-3" }), " Botanik Çay Molası"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold text-[#1f1a1c] leading-tight",
								children: todayTip.tea
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[9.5px] text-[#805062] mt-1.5 block",
								children: [
									todayTip.month,
									" · ",
									todayTip.day
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 rounded-2xl bg-white/90 border border-pink-100/80 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] font-bold text-amber-700 flex items-center gap-1 mb-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-3 h-3" }), " Biyolojik Denge"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold text-[#1f1a1c] leading-tight",
								children: todayTip.food
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9.5px] text-[#805062] mt-1.5 block",
								children: todayTip.focus
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-2.5 rounded-2xl bg-white/80 border border-pink-100 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "🕊️"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] italic font-semibold text-[#805062] leading-snug",
							children: todayTip.line
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 rounded-3xl bg-gradient-to-r from-emerald-50/60 via-teal-50/40 to-pink-50/50 border border-emerald-200/70 shadow-xs space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base shadow-xs",
							children: "🌱"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "text-xs font-black text-emerald-950",
								children: [todayTip.month, " önerisi"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[9px] font-extrabold bg-emerald-200/70 text-emerald-900 px-2 py-0.2 rounded-full",
								children: [todayTip.day, ". gün"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-emerald-800 font-medium",
							children: todayTip.seasonLead
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1 shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🌱" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bugün" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2 text-xs",
					children: [{
						icon: "🕯️",
						title: "Akşam",
						desc: todayTip.seasonA
					}, {
						icon: "🍂",
						title: "Bu ay",
						desc: todayTip.seasonB
					}].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-2.5 rounded-2xl bg-white/90 border border-emerald-100 shadow-xs space-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10.5px] font-extrabold text-emerald-900 flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }),
								" ",
								item.title
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-[#5a4044] leading-relaxed",
							children: item.desc
						})]
					}, item.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative w-full rounded-3xl bg-white p-6 shadow-[0_16px_36px_rgba(216,27,96,0.1)] border border-pink-100/70 flex flex-col items-center text-center overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-[#ffd9de] text-[#b0004a] text-xs font-bold mb-3 shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3.5 h-3.5 text-[#d81b60]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							phaseName,
							" · ",
							currentDayInfo.cycleDay,
							". gün"
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: onOpenSymptomModal,
						className: "relative w-48 h-48 flex items-center justify-center my-1 cursor-pointer active:scale-95 transition-transform select-none group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-3 rounded-full bg-gradient-to-tr from-rose-500/25 via-fuchsia-400/25 to-amber-300/20 blur-2xl animate-pulse pointer-events-none opacity-90" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1 rounded-full border border-pink-200/60 pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 pointer-events-none z-20 overflow-visible animate-spin-slow",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-3 left-6 text-amber-400 text-sm filter drop-shadow-[0_0_8px_#facc15]",
										children: "🌸"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute top-3 right-0 text-emerald-400 text-xs filter drop-shadow-[0_0_8px_#10b981]",
										children: "🌿"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute top-12 -right-3 text-pink-500 text-xs filter drop-shadow-[0_0_8px_#ec4899]",
										children: "✨"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute bottom-3 right-1 text-cyan-400 text-xs filter drop-shadow-[0_0_8px_#22d3ee]",
										children: "🌼"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -bottom-3 right-10 text-purple-400 text-xs filter drop-shadow-[0_0_8px_#c084fc]",
										children: "🌺"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -bottom-3 left-9 text-rose-400 text-xs filter drop-shadow-[0_0_8px_#fb7185]",
										children: "🍃"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute bottom-5 -left-2 text-amber-400 text-xs filter drop-shadow-[0_0_8px_#facc15]",
										children: "✨"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute top-5 left-0 text-emerald-400 text-xs filter drop-shadow-[0_0_8px_#10b981]",
										children: "🌿"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative w-44 h-44 rounded-full bg-gradient-to-br from-pink-50 via-white to-pink-100 flex items-center justify-center p-3 shadow-[0_12px_32px_rgba(216,27,96,0.18),inset_0_2px_4px_rgba(255,255,255,0.9)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									className: "absolute inset-0 w-full h-full -rotate-90 pointer-events-none",
									viewBox: "0 0 120 120",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "60",
											cy: "60",
											fill: "none",
											opacity: "0.55",
											r: "50",
											stroke: "#ffd9de",
											strokeLinecap: "round",
											strokeWidth: "7"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											className: "drop-shadow-[0_2px_8px_rgba(216,27,96,0.45)]",
											cx: "60",
											cy: "60",
											fill: "none",
											r: "50",
											stroke: "url(#progressGlowGradient)",
											strokeDasharray: "314",
											strokeDashoffset: 314 * (1 - cycleProgress),
											strokeLinecap: "round",
											strokeWidth: "8"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "progressGlowGradient",
											x1: "0%",
											y1: "0%",
											x2: "100%",
											y2: "100%",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "0%",
													stopColor: "#ec4899"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "50%",
													stopColor: "#d81b60"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "100%",
													stopColor: "#b0004a"
												})
											]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "60",
											cy: "10",
											fill: "#ffffff",
											r: "4.5",
											stroke: "#b0004a",
											strokeWidth: "2.5",
											style: { filter: "drop-shadow(0 0 6px #d81b60)" }
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-32 h-32 rounded-full bg-white flex flex-col items-center justify-center shadow-[inset_0_3px_8px_rgba(176,0,74,0.06),0_4px_14px_rgba(128,80,98,0.08)] border border-pink-100 relative overflow-hidden select-none",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-black text-[#805062] leading-none tracking-normal text-center",
											children: "Döngünün"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline justify-center gap-0.5 leading-none my-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-4xl font-black text-[#b0004a] tracking-tight",
												children: currentDayInfo.cycleDay
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg font-black text-[#d81b60]",
												children: "."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold text-[#1f1a1c] leading-tight",
											children: "Gün"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 px-2.5 py-0.5 rounded-full bg-pink-100/70 text-[#b0004a] border border-pink-200 shadow-xs flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px]",
												children: "🌸"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[9.5px] font-black tracking-tight",
												children: [conceptionInfo.status, " Doğurganlık"]
											})]
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2.5 w-full mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 rounded-2xl bg-pink-50/60 border border-pink-100 flex flex-col items-center text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-semibold text-[#805062]",
								children: "Gelecek Adet"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-base font-black text-[#1f1a1c] mt-0.5",
								children: [Math.max(1, cycleLength - currentDayInfo.cycleDay), " Gün"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 rounded-2xl bg-[#ffd9e4]/70 border border-pink-200/70 flex flex-col items-center text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-semibold text-[#805062]",
								children: "Tahmini doğurganlık"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base font-black text-[#b0004a] mt-0.5",
								children: conceptionInfo.label
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-[#805062] mt-3 leading-relaxed text-center px-2",
						children: conceptionInfo.explanation
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onOpenSymptomModal,
						className: "w-full mt-4 py-3.5 px-4 rounded-full bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_8px_20px_rgba(216,27,96,0.3)] active:scale-98 transition-transform cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Belirti kaydet" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							if (!onPeriodStarted) return;
							soundEngine.playDropletSound();
							onPeriodStarted();
						},
						disabled: lastPeriodDate === toLocalISO(/* @__PURE__ */ new Date()),
						className: "w-full mt-2 py-3 px-4 rounded-full border border-pink-200 bg-white text-[#b0004a] text-xs font-bold cursor-pointer disabled:opacity-60 disabled:cursor-default",
						children: lastPeriodDate === toLocalISO(/* @__PURE__ */ new Date()) ? "Bugün 1. gün" : "Adetim başladı"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-3xl p-4 shadow-sm border border-pink-100 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-bold text-[#1f1a1c] flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "w-4 h-4 text-[#d81b60]" }), currentMonthYear]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onSelectDay((/* @__PURE__ */ new Date()).getDate()),
						className: "text-xs font-bold text-[#b0004a] hover:underline flex items-center gap-0.5 cursor-pointer",
						children: ["Tüm Takvim ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3.5 h-3.5" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between gap-1.5",
					children: miniDays.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onSelectDay(d.dayNumber),
						className: `flex-1 py-3 px-1 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${d.isCurrent ? "bg-gradient-to-b from-[#b0004a] to-[#d81b60] text-white shadow-md scale-105 font-bold ring-2 ring-white" : "bg-pink-50/50 hover:bg-pink-100 text-[#805062] border border-pink-100"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase font-bold opacity-80",
								children: d.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base font-black mt-0.5",
								children: d.dayNumber
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1 mt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${d.isCurrent ? "bg-white animate-ping" : "bg-[#d81b60]"}` })
							})
						]
					}, d.dayNumber))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `bg-white rounded-3xl p-5 shadow-sm border border-pink-100 space-y-4 transition-all duration-150 ${isPressing ? "scale-[0.98]" : ""} ${isPoofing ? "scale-105" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-9 h-9 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 shadow-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "w-5 h-5 fill-cyan-500 text-cyan-500" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-extrabold text-sm text-[#1f1a1c]",
								children: "Su Tüketimi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-[#805062]",
								children: [
									"Hedef: ",
									(waterGoalMl / 1e3).toFixed(2),
									" L • Kalan: ",
									Math.max(0, (waterGoalMl - waterCurrentMl) / 1e3).toFixed(2),
									" L"
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onOpenWaterSettings,
							className: `px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border transition-all cursor-pointer shadow-xs ${autoResetAtMidnight ? "bg-cyan-50 text-cyan-800 border-cyan-200 hover:bg-cyan-100" : "bg-gray-100 text-gray-500 border-gray-200"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["00:00 ", autoResetAtMidnight ? "Otomatik" : "Pasif"] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-2xl font-black text-[#1f1a1c]",
								children: [
									(waterCurrentMl / 1e3).toFixed(2),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-semibold text-[#805062]",
										children: [
											"/ ",
											(waterGoalMl / 1e3).toFixed(2),
											" L"
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-black text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200",
								children: ["%", waterPercent]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full h-3.5 bg-pink-50 rounded-full overflow-hidden p-0.5 border border-pink-100 shadow-inner",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-gradient-to-r from-cyan-400 via-sky-500 to-[#d81b60] rounded-full transition-all duration-300",
								style: { width: `${Math.min(100, waterPercent)}%` }
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleQuickAddWater,
							className: "flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:brightness-105 active:scale-98 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 stroke-[3]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+250 ml Ekle" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onMouseDown: startLongPress,
								onMouseUp: cancelLongPress,
								onMouseLeave: cancelLongPress,
								onTouchStart: startLongPress,
								onTouchEnd: cancelLongPress,
								title: "Sıfırlamak için 1.2 saniye basılı tutun",
								className: "relative w-12 h-12 rounded-2xl bg-pink-50 hover:bg-pink-100 active:scale-95 text-[#805062] flex items-center justify-center transition-all cursor-pointer select-none border border-pink-200 shadow-xs",
								children: [isPressing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "20",
										cy: "20",
										r: "16",
										stroke: "#d81b60",
										strokeWidth: "3.5",
										fill: "transparent",
										strokeDasharray: "100",
										strokeDashoffset: `${100 - pressProgress}`
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: `w-5 h-5 ${isPressing ? "text-[#d81b60] scale-110" : ""}` })]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-3xl p-5 shadow-sm border border-pink-100 space-y-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-8 h-8 rounded-full bg-pink-50 text-[#d81b60] flex items-center justify-center shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-4 h-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-extrabold text-sm text-[#1f1a1c]",
							children: "Bugün Alınacak Günlük Takviyeler"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-[#805062]",
							children: [
								supplements.filter((s) => s.taken).length,
								" / ",
								supplements.length,
								" alındı"
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold text-[#b0004a] bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100",
						children: "✓ Günlük Takip"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
					children: supplements.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => handleToggleDailySupplement(item.id),
						className: `p-3 rounded-2xl border flex items-center justify-between gap-2 transition-all cursor-pointer select-none active:scale-98 ${item.taken ? "bg-emerald-50/60 border-emerald-200 text-emerald-900 shadow-xs" : "bg-white border-pink-100 text-[#1f1a1c] hover:border-pink-200 hover:bg-pink-50/40"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 flex-1 min-w-0 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: `w-5 h-5 shrink-0 ${item.taken ? "text-emerald-600 fill-emerald-100" : "text-gray-300"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "truncate",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `text-xs font-bold truncate leading-tight ${item.taken ? "line-through text-emerald-800/80 font-semibold" : ""}`,
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-[#805062] font-medium mt-0.5",
									children: [
										item.dose,
										" • Saat: ",
										item.time
									]
								})]
							})]
						}), item.reminderEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							title: `Hatırlatıcı: ${item.time}`,
							className: "p-1 rounded-full bg-pink-50 text-[#b0004a] text-[10px] shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-3 h-3" })
						})]
					}, item.id))
				})]
			})
		]
	});
};
var CycleTab = ({ selectedDay, onSelectDay, onOpenSymptomModal, dayDataMap, cycleLength = 28, periodLength = 5, lastPeriodDate = "" }) => {
	const todayDate = /* @__PURE__ */ new Date();
	const year = todayDate.getFullYear();
	const monthIndex = todayDate.getMonth();
	const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
	const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
	const leadingBlanks = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
	const loggedDay = dayDataMap[`${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`];
	const monthTitle = todayDate.toLocaleDateString("tr-TR", {
		month: "long",
		year: "numeric"
	});
	const monthName = todayDate.toLocaleDateString("tr-TR", { month: "long" });
	const ovulationDay = Math.max(periodLength + 1, cycleLength - 14);
	const cycleDayOn = (day) => {
		const start = parseLocalISO(lastPeriodDate);
		if (!start) return null;
		const date = new Date(year, monthIndex, day);
		date.setHours(0, 0, 0, 0);
		start.setHours(0, 0, 0, 0);
		const diff = Math.round((date.getTime() - start.getTime()) / 864e5);
		if (diff < 0) return null;
		return diff % cycleLength + 1;
	};
	const phaseMeta = (day) => {
		const cycleDay = cycleDayOn(day);
		if (!cycleDay) return {
			phase: "folikuler",
			label: "Tarih yok",
			cycleDay: 0
		};
		const phase = phaseForCycleDay(cycleDay, periodLength, cycleLength);
		return {
			phase,
			label: {
				regl: "Kanama",
				folikuler: "Foliküler faz",
				ovulasyon: "Doğurgan pencere",
				luteal: "Luteal faz",
				pms: "Adet öncesi"
			}[phase],
			cycleDay
		};
	};
	const handleDayClick = (day, e) => {
		soundEngine.playDropletSound();
		onSelectDay(day);
		if (cycleDayOn(day) === ovulationDay) triggerRosePollenBurst(e.clientX, e.clientY);
	};
	const selectedPhaseMeta = phaseMeta(selectedDay);
	const selectedConception = calculateConceptionProbability(selectedPhaseMeta.cycleDay || 1, cycleLength);
	const forecast = (() => {
		const start = parseLocalISO(lastPeriodDate);
		if (!start) return null;
		const today0 = new Date(year, monthIndex, todayDate.getDate());
		today0.setHours(0, 0, 0, 0);
		start.setHours(0, 0, 0, 0);
		const diff = Math.round((today0.getTime() - start.getTime()) / 864e5);
		const into = diff < 0 ? 0 : diff % cycleLength;
		const daysLeft = cycleLength - into;
		const label = (n) => {
			const d = new Date(today0);
			d.setDate(d.getDate() + n);
			return d.toLocaleDateString("tr-TR", {
				day: "numeric",
				month: "long",
				weekday: "long"
			});
		};
		const pmsDay = Math.max(ovulationDay + 1, cycleLength - 4);
		return {
			period: `${label(daysLeft)} • ${daysLeft} gün kaldı`,
			pms: label((pmsDay - 1 - into + cycleLength) % cycleLength),
			ov: label((ovulationDay - 1 - into + cycleLength) % cycleLength)
		};
	})();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 pb-40 pt-2 select-none text-[#1f1a1c]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloraLogo, { size: "md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-[#805062] uppercase tracking-wider block",
							children: "Floria"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] px-2 py-0.2 rounded-full bg-pink-100 text-[#b0004a] font-bold",
							children: "Biyo-Takvim"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-black text-[#1f1a1c] tracking-tight",
						children: monthTitle
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						soundEngine.playDropletSound();
						onSelectDay(todayDate.getDate());
					},
					className: "px-3.5 py-1.5 rounded-full bg-pink-100 text-[#b0004a] text-xs font-black hover:bg-pink-200 transition-all shadow-xs cursor-pointer",
					children: "Bugün"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-2.5 rounded-2xl bg-white border border-pink-100 shadow-xs flex items-center justify-between text-[11px] font-bold text-[#805062] overflow-x-auto no-scrollbar gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 rounded-full bg-[#d81b60]" }),
							" Kanama (1-",
							periodLength,
							". gün)"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400" }), " Foliküler"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 rounded-full bg-pink-300" }),
							" Doğurgan (~",
							ovulationDay,
							". gün)"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 shrink-0 text-amber-700 font-extrabold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 rounded-full bg-amber-400" }), " Adet öncesi"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-3xl p-5 shadow-sm border border-pink-100 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-bold text-[#1f1a1c] flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-4 h-4 text-[#d81b60]" }), monthTitle]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-black text-[#b0004a] bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200",
							children: lastPeriodDate ? `Yumurtlama ~${ovulationDay}. gün` : "Tarih yok"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-7 gap-1 text-center py-1 border-y border-pink-50",
						children: [
							"Pt",
							"Sa",
							"Ça",
							"Pe",
							"Cu",
							"Ct",
							"Pz"
						].map((dw) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-[#805062]",
							children: dw
						}, dw))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-7 gap-1.5 py-1",
						children: [Array.from({ length: leadingBlanks }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10" }, `blank-${i}`)), monthDays.map((day) => {
							const isSelected = selectedDay === day;
							const isToday = day === todayDate.getDate();
							const meta = phaseMeta(day);
							const { phase } = meta;
							const isPeak = meta.cycleDay === ovulationDay && meta.cycleDay > 0;
							let bgClass = "bg-[#fff8f8] text-[#1f1a1c]";
							let dotColor = "";
							if (!lastPeriodDate) bgClass = "bg-[#fff8f8] text-[#1f1a1c]";
							else if (phase === "regl") {
								bgClass = "bg-rose-100/70 text-rose-900 border border-rose-200/50";
								dotColor = "bg-[#d81b60]";
							} else if (phase === "folikuler") {
								bgClass = "bg-emerald-50/50 text-[#1f1a1c] border border-emerald-100/60";
								dotColor = "bg-emerald-400";
							} else if (phase === "ovulasyon") {
								if (isPeak) {
									bgClass = "bg-gradient-to-tr from-[#b0004a] to-[#d81b60] text-white shadow-[0_4px_14px_rgba(216,27,96,0.38)] font-black ring-2 ring-white z-10";
									dotColor = "bg-white animate-ping";
								} else {
									bgClass = "bg-[#ffd9de] text-[#b0004a] font-bold border border-pink-200";
									dotColor = "bg-[#d81b60]";
								}
							} else if (phase === "luteal") {
								bgClass = "bg-pink-50/40 text-[#805062]";
								dotColor = "bg-pink-300";
							} else if (phase === "pms") {
								bgClass = "bg-amber-50 text-amber-900 border border-amber-200/50";
								dotColor = "bg-amber-400";
							}
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: (e) => handleDayClick(day, e),
								className: `h-11 rounded-2xl flex flex-col items-center justify-center relative transition-all cursor-pointer ${bgClass} ${isSelected && !isPeak ? "ring-2 ring-[#b0004a] font-black bg-white shadow-sm" : ""} ${isToday ? "outline outline-1 outline-[#b0004a]" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-xs ${isSelected ? "font-black" : "font-bold"}`,
									children: day
								}), dotColor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full mt-0.5 ${dotColor}` })]
							}, day);
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-3xl p-5 shadow-sm border border-pink-100 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-base font-black text-[#1f1a1c]",
								children: [
									selectedDay,
									" ",
									monthName
								]
							}), selectedDay === todayDate.getDate() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold",
								children: "Bugün"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-bold text-[#b0004a] mt-0.5",
							children: [
								selectedPhaseMeta.cycleDay ? `Döngü günü ${selectedPhaseMeta.cycleDay}` : "Döngü günü yok",
								" • ",
								selectedPhaseMeta.label
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-[#805062] block font-semibold",
								children: "Tahmini doğurganlık"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-black text-[#b0004a]",
								children: selectedConception.label
							})]
						})]
					}),
					selectedPhaseMeta.phase === "pms" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/70 space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-extrabold text-amber-950 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🕊️" }), " Adet Öncesi Şefkat & Öfke Yatıştırma"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-[#5a4044] leading-relaxed",
							children: "Progesteron düşüşü nedeniyle gerginlik veya öfke hissi olağandır. 4-7-8 nefes egzersizi yapın, melisa çayı için ve kendinize dinlenme alanı açın."
						})]
					}) : selectedPhaseMeta.phase === "folikuler" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/70 space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-extrabold text-emerald-950 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🌱" }), " Foliküler Faz: Östrojen Yükseliyor"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-[#5a4044] leading-relaxed",
							children: "Yumurta folikülü gelişirken enerji, zihinsel odak ve motivasyon artar. Yeni projelere başlamak ve dinamik sporlar için en verimli evre."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-3 rounded-2xl bg-pink-50/60 border border-pink-100 text-[11px] text-[#5a4044] leading-relaxed",
						children: selectedConception.explanation
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-2.5 rounded-2xl bg-pink-50/40 border border-pink-100 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-bold text-[#805062] flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-3 h-3 text-amber-500" }), " Enerji"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-black text-[#1f1a1c]",
							children: selectedPhaseMeta.phase === "ovulasyon" ? "Zirve" : selectedPhaseMeta.phase === "folikuler" ? "Yükselişte" : "Dengeli"
						})]
					}),
					loggedDay && (loggedDay.flow || loggedDay.intimacy || loggedDay.sleep || loggedDay.note || loggedDay.symptoms?.length) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1.5",
						children: [
							loggedDay.flow && loggedDay.flow !== "Yok" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-pink-50 px-2 py-1 text-[10px] font-bold text-[#b0004a]",
								children: ["Kanama ", loggedDay.flow]
							}),
							loggedDay.intimacy && loggedDay.intimacy !== "Yok" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-pink-50 px-2 py-1 text-[10px] font-bold text-[#b0004a]",
								children: ["İlişki ", loggedDay.intimacy]
							}),
							loggedDay.sleep && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-pink-50 px-2 py-1 text-[10px] font-bold text-[#b0004a]",
								children: ["Uyku ", loggedDay.sleep]
							}),
							loggedDay.pain && loggedDay.pain !== "Yok" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-pink-50 px-2 py-1 text-[10px] font-bold text-[#b0004a]",
								children: ["Ağrı ", loggedDay.pain]
							}),
							loggedDay.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-pink-50 px-2 py-1 text-[10px] font-bold text-[#805062]",
								children: loggedDay.note
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: onOpenSymptomModal,
						className: "w-full py-3 rounded-2xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bu güne ekle: belirti, uyku, ilişki, not" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-gradient-to-br from-[#4a152e] to-[#2d0b1a] text-white p-5 shadow-xl space-y-3.5 border border-rose-950/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center text-rose-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-extrabold text-sm text-white",
						children: "Akıllı Döngü Tahmin Motoru"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-rose-200/70",
						children: "Döngü uzunluğundan hesaplanan evreler"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-rose-100",
								children: "Sonraki kanama"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-rose-300",
								children: forecast ? forecast.period : "Başlangıç tarihi yok"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-2.5 py-1 rounded-full bg-[#d81b60] text-white text-[10px] font-black shadow-xs",
								children: "Tahmin"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-rose-100",
								children: "Adet öncesi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-rose-300",
								children: forecast ? forecast.pms : "Başlangıç tarihi yok"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-amber-300",
								children: "Bu döngü"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-rose-100",
								children: "Sonraki yumurtlama"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-rose-300",
								children: forecast ? forecast.ov : "Başlangıç tarihi yok"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-bold text-emerald-300",
								children: [
									"~",
									ovulationDay,
									". gün"
								]
							})]
						})
					]
				})]
			})
		]
	});
};
function PremiumGarden({ compact = false, showToast, onChange }) {
	const [receipt, setReceipt] = (0, import_react.useState)(readReceipt);
	const [note, setNote] = (0, import_react.useState)("");
	const active = isPremiumActive();
	const buy = (id) => {
		const next = purchasePlan(id);
		setReceipt(next);
		const message = `${planName(id)} açıldı. ${formatUntil(next.until)} tarihine kadar. Yeni plan bugünden sayılır.`;
		setNote(message);
		showToast?.("Premium", message, "success");
		onChange?.();
	};
	const restore = () => {
		const found = restorePlan();
		setReceipt(readReceipt());
		const message = found ? `${planName(found.plan)} geri yüklendi. ${formatUntil(found.until)} tarihine kadar.` : "Bu cihazda geçerli bir satın alma bulunamadı.";
		setNote(message);
		showToast?.(found ? "Geri yüklendi" : "Satın alma yok", message, "info");
		onChange?.();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-[32px] bg-gradient-to-b from-[#4a1230] via-[#8e2458] to-[#f3b7c9] text-white p-5 shadow-[0_18px_40px_rgba(142,36,88,0.28)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-3 top-3 text-lg",
				children: "🌸"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute right-4 top-6 text-base",
				children: "🌺"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-6 bottom-5 text-base",
				children: "🌼"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute right-5 bottom-4 text-lg",
				children: "🌷"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-1/2 top-2 -translate-x-1/2 text-xs opacity-80",
				children: "✿"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-col items-center text-center pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-16 h-16 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-3xl shadow-[0_0_24px_rgba(255,214,140,0.45)]",
						children: "👑"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[11px] tracking-[0.22em] uppercase text-rose-100",
						children: "Kraliçe"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl font-semibold tracking-tight",
						children: "Floria Premium"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-white/80 max-w-[32ch] leading-relaxed",
						children: active && receipt ? `${planName(receipt.plan)} açık. ${formatUntil(receipt.until)} tarihine kadar Rehber, PDF ve reklamsız kullanım açık.` : "Kraliçe planı Rehber’i ve PDF özetini açar, reklamı kaldırır. Döngüyü kaydetmek buna bağlı değil."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 w-full space-y-2 text-left",
						children: PREMIUM_INCLUDES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-2xl bg-white/10 border border-white/20 px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-semibold",
								children: ["👑 ", item.title]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-white/80 mt-0.5 leading-relaxed",
								children: item.text
							})]
						}, item.title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[11px] text-white/75 leading-relaxed",
						children: FREE_LINE
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `relative mt-4 grid gap-2 ${compact ? "grid-cols-1" : "grid-cols-3"}`,
				children: PREMIUM_PLANS.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => buy(plan.id),
					className: `rounded-2xl px-3 py-3 text-left cursor-pointer border ${plan.id === "year" ? "bg-white text-[#4a1230] border-white" : "bg-white/10 border-white/25"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[10px] font-semibold uppercase tracking-wide opacity-70",
							children: plan.note
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold mt-1",
							children: plan.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-lg font-semibold",
							children: [plan.price, " TL"]
						})
					]
				}, plan.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: restore,
				className: "relative mt-3 w-full text-xs font-semibold underline underline-offset-4 cursor-pointer",
				children: "Satın almayı geri yükle"
			}),
			note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "relative mt-2 text-center text-[11px] text-white/85",
				children: note
			})
		]
	});
}
var ReportsTab = ({ onOpenDoctorReport, cycleLength, periodLength, lastPeriodDate, goal, loggedDays, cycles, premium }) => {
	const [paywall, setPaywall] = (0, import_react.useState)(false);
	const [allowed, setAllowed] = (0, import_react.useState)(premium);
	const [activeFilter, setActiveFilter] = (0, import_react.useState)("6months");
	const hasCycle = Boolean(lastPeriodDate);
	const cycleDay = hasCycle ? cycleDayFromLastPeriod(lastPeriodDate, cycleLength) : 0;
	const source = cycles.length ? cycles : hasCycle ? [{
		start: lastPeriodDate,
		cycleLength,
		periodLength
	}] : [];
	const cutoff = /* @__PURE__ */ new Date(/* @__PURE__ */ new Date());
	if (activeFilter === "6months") cutoff.setMonth(cutoff.getMonth() - 6);
	if (activeFilter === "year") cutoff.setFullYear(cutoff.getFullYear() - 1);
	const inWindow = source.filter((item) => {
		const date = parseLocalISO(item.start);
		if (!date) return false;
		return activeFilter === "3cycles" ? true : date >= cutoff;
	});
	const shown = activeFilter === "3cycles" ? inWindow.slice(-3) : inWindow;
	const lengths = shown.map((item) => item.cycleLength);
	const avg = lengths.length ? Math.round(lengths.reduce((sum, value) => sum + value, 0) / lengths.length) : cycleLength;
	const spread = lengths.length > 1 ? Math.max(...lengths) - Math.min(...lengths) : null;
	const earliest = shown[0]?.start;
	const visibleLogs = loggedDays.filter((day) => {
		if (!day.date || !earliest) return activeFilter !== "3cycles" ? false : Boolean(day.date);
		if (activeFilter === "3cycles") return day.date >= earliest;
		const date = parseLocalISO(day.date);
		return Boolean(date && date >= cutoff);
	});
	const ringOffset = 257.6 * (1 - (hasCycle ? cycleDay / cycleLength : 0));
	const ovulationDay = Math.max(periodLength + 1, cycleLength - 14);
	const reglDays = Math.min(periodLength, cycleLength);
	const fertileDays = Math.min(5, Math.max(1, ovulationDay - reglDays));
	const follicularDays = Math.max(0, ovulationDay - fertileDays - reglDays);
	const lutealDays = Math.max(0, cycleLength - ovulationDay);
	const phaseTotal = reglDays + follicularDays + fertileDays + lutealDays || 1;
	const pct = (days) => Math.round(days / phaseTotal * 100);
	const symptomCounts = /* @__PURE__ */ new Map();
	for (const day of visibleLogs) for (const symptom of day.symptoms || []) symptomCounts.set(symptom, (symptomCounts.get(symptom) || 0) + 1);
	const loggedWithSymptoms = visibleLogs.filter((day) => (day.symptoms || []).length > 0).length;
	const symptomRows = [...symptomCounts.entries()].sort((a, b) => b[1] - a[1]).map(([label, count]) => ({
		label,
		percent: Math.round(count / Math.max(1, loggedWithSymptoms) * 100),
		count
	}));
	const filterTitles = {
		"3cycles": "Son 3 döngü",
		"6months": "Son 6 ay",
		year: "Son 12 ay"
	};
	const current = {
		title: hasCycle ? filterTitles[activeFilter] : "Rapor",
		score: hasCycle ? cycleDay : 0,
		regularity: shown.length > 1 ? `${shown.length} döngü` : hasCycle ? "Tek döngü" : "Kayıt yok",
		avgLength: hasCycle ? `${avg} gün` : "—",
		deviation: spread === null ? "eski döngü yok" : `${spread} gün fark`,
		periodDays: hasCycle ? `${shown.at(-1)?.periodLength ?? periodLength} gün` : "—",
		diagnostic: hasCycle ? `${filterTitles[activeFilter]} içinde ${shown.length} döngü kaydı var. Son başlangıç ${formatTrDate(lastPeriodDate)}. Bugün ${cycleDay}. gün${goal ? ` (${goal})` : ""}.` : "Rapor, döngü başlangıcını kaydettikten sonra bu döngüye göre oluşur.",
		history: shown.map((item) => ({
			month: parseLocalISO(item.start)?.toLocaleDateString("tr-TR", { month: "short" }) || item.start,
			days: item.cycleLength,
			active: item.start === lastPeriodDate
		})),
		offset: ringOffset
	};
	const handleFilterClick = (filter, e) => {
		soundEngine.playDropletSound();
		setActiveFilter(filter);
		triggerRosePollenBurst(e.clientX, e.clientY);
	};
	const handlePdfClick = (e) => {
		if (!allowed && !isPremiumActive()) {
			setPaywall(true);
			return;
		}
		soundEngine.playCrystalChime();
		triggerRosePollenBurst(e.clientX, e.clientY);
		onOpenDoctorReport();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 pb-40 pt-2 select-none text-[#1f1a1c]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloraLogo, { size: "md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#b0004a] to-amber-600",
							children: "Biyometrik Özet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200 shadow-xs flex items-center gap-0.5",
							children: "🌸 Canlı"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-black text-[#1f1a1c]",
						children: current.title
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handlePdfClick,
					"aria-label": "PDF Paylaş veya İndir",
					className: "w-12 h-12 rounded-full bg-gradient-to-tr from-white to-pink-50 text-[#b0004a] shadow-[0_10px_24px_-4px_rgba(216,27,96,0.22)] hover:shadow-lg active:scale-90 transition-all flex items-center justify-center relative border border-pink-100 cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-5 h-5 text-[#d81b60]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-tr from-amber-400 to-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.7)] flex items-center justify-center text-[9px] text-white font-bold",
						children: "✨"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-1.5 bg-gradient-to-r from-pink-50/60 via-white to-pink-50/60 rounded-full flex items-center justify-between gap-1 border border-pink-100/80 shadow-inner",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: (e) => handleFilterClick("3cycles", e),
						className: `flex-1 py-2 rounded-full text-xs font-bold transition-all text-center cursor-pointer ${activeFilter === "3cycles" ? "bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white shadow-md" : "text-[#805062] hover:text-[#b0004a]"}`,
						children: "Son 3 Döngü"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: (e) => handleFilterClick("6months", e),
						className: `flex-1 py-2 rounded-full text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${activeFilter === "6months" ? "bg-gradient-to-r from-[#b0004a] via-[#d81b60] to-fuchsia-600 text-white shadow-[0_8px_20px_rgba(216,27,96,0.4)]" : "text-[#805062] hover:text-[#b0004a]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Son 6 Ay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[12px] animate-pulse",
							children: "🌿"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: (e) => handleFilterClick("year", e),
						className: `flex-1 py-2 rounded-full text-xs font-bold transition-all text-center cursor-pointer ${activeFilter === "year" ? "bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white shadow-md" : "text-[#805062] hover:text-[#b0004a]"}`,
						children: "Tüm Yıl"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-3xl p-5 shadow-[0_16px_36px_-8px_rgba(216,27,96,0.14)] border border-pink-100/80 relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-8 -top-8 w-44 h-44 rounded-full bg-gradient-to-bl from-pink-200/50 via-rose-100/40 to-amber-100/30 blur-2xl pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-8 -bottom-8 w-36 h-36 rounded-full bg-emerald-100/40 blur-2xl pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4 relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-3 h-3 rounded-full bg-gradient-to-r from-[#b0004a] to-amber-400 animate-pulse shadow-[0_0_10px_#d81b60]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-black uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#805062] to-[#b0004a] flex items-center gap-1.5",
								children: ["Döngü günü", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-amber-500 animate-spin-slow text-sm",
									children: "🌿"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold flex items-center gap-1 border border-emerald-200/70 shadow-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-emerald-600 font-bold",
									children: "✔"
								}),
								" ",
								current.regularity,
								" 🌸"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-28 h-28 flex items-center justify-center shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								className: "w-full h-full -rotate-90 drop-shadow-[0_8px_16px_rgba(216,27,96,0.35)]",
								viewBox: "0 0 100 100",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "scoreGlowGrad",
										x1: "0%",
										y1: "0%",
										x2: "100%",
										y2: "100%",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "#ff007a"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "50%",
												stopColor: "#d81b60"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "#f59e0b"
											})
										]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "50",
										cy: "50",
										fill: "transparent",
										r: "41",
										stroke: "#f6ebed",
										strokeWidth: "10"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										className: "transition-all duration-700 ease-out",
										cx: "50",
										cy: "50",
										fill: "transparent",
										r: "41",
										stroke: "url(#scoreGlowGrad)",
										strokeDasharray: "257.6",
										strokeDashoffset: current.offset,
										strokeLinecap: "round",
										strokeWidth: "10"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 flex flex-col items-center justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#b0004a] via-[#d81b60] to-amber-600 tracking-tight",
									children: current.score
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] font-bold text-[#805062] flex items-center",
									children: [
										"/ ",
										hasCycle ? cycleLength : "—",
										" gün"
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-2.5 rounded-2xl bg-pink-50/40 border border-pink-100/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-medium text-[#805062]",
										children: "Döngü uzunluğu"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs",
										children: "🌿"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-1 mt-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-[#b0004a] to-fuchsia-600",
										children: current.avgLength
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded",
										children: [
											"(",
											current.deviation,
											")"
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-2.5 rounded-2xl bg-pink-50/40 border border-pink-100/60 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-medium text-[#805062]",
									children: "Kanama Süresi"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base font-black text-[#1f1a1c]",
									children: current.periodDays
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs",
										children: "💧"
									})
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 p-3 rounded-2xl bg-gradient-to-r from-pink-50/80 to-amber-50/60 border border-pink-100 text-xs text-[#5a4044] leading-relaxed relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-extrabold text-[#b0004a] block mb-0.5",
							children: "Bu döngü"
						}), current.diagnostic]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-3xl p-5 shadow-sm border border-pink-100 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "font-extrabold text-sm text-[#1f1a1c]",
						children: [
							"Döngü Uzunluğu Geçmişi (",
							current.history.length,
							" Dönem)"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-[#805062]",
						children: hasCycle ? `Başlangıç: ${formatTrDate(lastPeriodDate)}` : "Tarih yok"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2.5 py-1 rounded-full bg-pink-50 text-[#b0004a] text-xs font-black border border-pink-200",
						children: current.regularity
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative pt-6 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-11 left-0 right-0 border-b border-dashed border-amber-400 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[9px] font-extrabold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 shadow-xs -mt-2",
							children: [cycleLength, "G"]
						})
					}), current.history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-[#805062] py-6 text-center",
						children: "Henüz döngü kaydı yok."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-end justify-between gap-1.5 sm:gap-2.5 h-28 pt-4 overflow-x-auto no-scrollbar",
						children: current.history.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-[28px] max-w-[72px] flex flex-col items-center gap-1.5 h-full justify-end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] font-black text-[#1f1a1c]",
									children: [item.days, "g"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full rounded-2xl transition-all duration-500 bg-gradient-to-t from-[#b0004a] to-[#d81b60] shadow-md ring-2 ring-pink-300",
									style: { height: `${item.days / 40 * 100}%` }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-[#b0004a]",
									children: item.month
								})
							]
						}, `${item.month}-${idx}`))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-3xl p-5 shadow-sm border border-pink-100 space-y-3.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "font-extrabold text-sm text-[#1f1a1c]",
							children: [
								"Ortalama Faz Dağılımı (",
								cycleLength,
								" gün)"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold text-[#805062]",
							children: hasCycle ? "Bu döngü" : "—"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full h-3.5 rounded-full overflow-hidden flex gap-0.5 p-0.5 bg-pink-50 border border-pink-100 shadow-inner",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-[#d81b60] rounded-l-full",
								style: { width: `${pct(reglDays)}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-[#fec1d6]",
								style: { width: `${pct(follicularDays)}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-emerald-500 shadow-xs",
								style: { width: `${pct(fertileDays)}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-[#a35879] rounded-r-full",
								style: { width: `${pct(lutealDays)}%` }
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 rounded-2xl bg-pink-50/40 border border-pink-100",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10.5px] font-extrabold text-[#d81b60] block",
										children: "Kanama"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-black text-[#1f1a1c] mt-0.5 text-sm",
										children: [
											reglDays,
											" gün (%",
											pct(reglDays),
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-[#805062]",
										children: "Kaydettiğin kanama süresi"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 rounded-2xl bg-pink-50/40 border border-pink-100",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10.5px] font-extrabold text-[#805062] block",
										children: "Foliküler Evre"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-black text-[#1f1a1c] mt-0.5 text-sm",
										children: [
											follicularDays,
											" gün (%",
											pct(follicularDays),
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-[#805062]",
										children: "Kanama sonrası, doğurgan pencereden önce"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10.5px] font-extrabold text-emerald-700 block",
										children: "Doğurgan Pencere"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-black text-emerald-950 mt-0.5 text-sm",
										children: [
											fertileDays,
											" gün (%",
											pct(fertileDays),
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-emerald-700",
										children: [
											"Yaklaşık ",
											ovulationDay,
											". gün"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 rounded-2xl bg-pink-50/40 border border-pink-100",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10.5px] font-extrabold text-[#a35879] block",
										children: "Luteal Evre"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-black text-[#1f1a1c] mt-0.5 text-sm",
										children: [
											lutealDays,
											" gün (%",
											pct(lutealDays),
											")"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-[#805062]",
										children: "Sonraki adete kadar"
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-3xl p-5 shadow-sm border border-pink-100 space-y-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-extrabold text-sm text-[#1f1a1c]",
					children: "Sık Görülen Belirtiler & Biyo-Korelasyon"
				}), symptomRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-[#805062] leading-relaxed",
					children: "Henüz belirti kaydı yok. Bugün ekranından eklediğin belirtiler burada görünür."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: symptomRows.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-xs font-bold text-[#1f1a1c]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[#b0004a] font-extrabold",
								children: [item.count, " kayıt"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full h-2.5 bg-pink-50 rounded-full overflow-hidden p-0.5 border border-pink-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-gradient-to-r from-pink-400 to-[#b0004a] rounded-full",
								style: { width: `${item.percent}%` }
							})
						})]
					}, item.label))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-r from-[#b0004a] to-[#d81b60] rounded-3xl p-5 text-white shadow-xl space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-5 h-5 text-amber-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-extrabold text-sm",
							children: "Döngü özeti"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-pink-100 leading-relaxed",
						children: "Kaydettiğin döngü ve belirtilerden oluşan özeti görüntüle. Eski döngü uydurulmaz."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handlePdfClick,
						className: "w-full py-3.5 rounded-2xl bg-white text-[#b0004a] text-xs font-black shadow-lg hover:bg-pink-50 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4 text-[#d81b60]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: allowed || isPremiumActive() ? "Özeti görüntüle ve PDF indir" : "PDF Premium’da" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })
						]
					}),
					paywall && !isPremiumActive() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumGarden, { onChange: () => setAllowed(isPremiumActive()) })
				]
			})
		]
	});
};
var ProfileTab = ({ profile, onUpdateProfile, showToast, supplements, onAddSupplement, onDeleteSupplement, onResetData }) => {
	const [selectedGoal, setSelectedGoal] = (0, import_react.useState)("hamilelik");
	const [sliderLiters, setSliderLiters] = (0, import_react.useState)(profile.waterGoalMl / 1e3 || 2.4);
	const [showAvatarModal, setShowAvatarModal] = (0, import_react.useState)(false);
	const [showSleepModal, setShowSleepModal] = (0, import_react.useState)(false);
	const [showCycleParamModal, setShowCycleParamModal] = (0, import_react.useState)(false);
	const [showAddSupplementModal, setShowAddSupplementModal] = (0, import_react.useState)(false);
	const [showHormoneModal, setShowHormoneModal] = (0, import_react.useState)(false);
	const [showHelpModal, setShowHelpModal] = (0, import_react.useState)(false);
	const [showResetModal, setShowResetModal] = (0, import_react.useState)(false);
	const [newSuppName, setNewSuppName] = (0, import_react.useState)("");
	const [newSuppDose, setNewSuppDose] = (0, import_react.useState)("1 Tablet");
	const [newSuppTime, setNewSuppTime] = (0, import_react.useState)("09:00");
	const [newSuppReminder, setNewSuppReminder] = (0, import_react.useState)(true);
	const [notify, setNotify] = (0, import_react.useState)("default");
	import_react.useEffect(() => {
		readNotifyState().then(setNotify);
	}, []);
	const [bedtime, setBedtime] = (0, import_react.useState)(profile.quietHoursStart || "23:00");
	const [waketime, setWaketime] = (0, import_react.useState)(profile.quietHoursEnd || "07:30");
	const [editCycleLen, setEditCycleLen] = (0, import_react.useState)(profile.cycleLength || 28);
	const [editPeriodLen, setEditPeriodLen] = (0, import_react.useState)(profile.periodLength || 5);
	const fileInputRef = (0, import_react.useRef)(null);
	const currentAvatar = profile.avatarUrl || "/logo.png";
	const presetAvatars = [];
	const handleImageUpload = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				if (typeof reader.result === "string") {
					soundEngine.playCrystalChime();
					triggerRosePollenBurst();
					onUpdateProfile({ avatarUrl: reader.result });
					setShowAvatarModal(false);
					showToast("Profil Fotoğrafı Güncellendi 🌸", "Yeni avatarınız başarıyla yüklendi.", "success");
				}
			};
			reader.readAsDataURL(file);
		}
	};
	const handleSliderChange = (val) => {
		soundEngine.playDropletSound();
		setSliderLiters(val);
		onUpdateProfile({ waterGoalMl: Math.round(val * 1e3) });
	};
	const handleCreateSupplement = (e) => {
		e.preventDefault();
		if (!newSuppName.trim()) return;
		soundEngine.playCrystalChime();
		triggerRosePollenBurst();
		const newItem = {
			id: Date.now().toString(),
			name: newSuppName.trim(),
			dose: newSuppDose || "1 Porsiyon",
			time: newSuppTime || "09:00",
			taken: false,
			reminderEnabled: newSuppReminder
		};
		onAddSupplement(newItem);
		setShowAddSupplementModal(false);
		setNewSuppName("");
		showToast("Yeni Takviye Eklendi", `${newItem.name} (${newItem.time}) profilinize kaydedildi.`, "success");
	};
	const handleSaveSleep = (e) => {
		e.preventDefault();
		soundEngine.playCrystalChime();
		onUpdateProfile({
			quietHoursStart: bedtime,
			quietHoursEnd: waketime
		});
		setShowSleepModal(false);
		showToast("Sessiz saat", `${bedtime}–${waketime} arasında takviye hatırlatması çıkmaz.`, "success");
	};
	const handleSaveCycleParams = (e) => {
		e.preventDefault();
		soundEngine.playCrystalChime();
		onUpdateProfile({
			cycleLength: editCycleLen,
			periodLength: editPeriodLen
		});
		setShowCycleParamModal(false);
		showToast("Döngü güncellendi", `Döngü ${editCycleLen} gün, akış ${editPeriodLen} gün.`, "success");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 pb-40 pt-2 select-none text-[#1f1a1c]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				ref: fileInputRef,
				accept: "image/*",
				onChange: handleImageUpload,
				className: "hidden"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloraLogo, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-extrabold text-[#1f1a1c]",
						children: "Profil"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full bg-white rounded-3xl p-5 clay-card shadow-[0_12px_32px_rgba(216,27,96,0.08)] border border-white relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 mb-4 relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-2 rounded-full bg-gradient-to-r from-amber-300 via-pink-400 to-rose-400 blur-sm opacity-60 animate-pulse pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								onClick: () => setShowAvatarModal(true),
								className: "relative w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-[#d81b60] to-rose-400 shadow-md cursor-pointer group",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: currentAvatar,
									alt: profile.name,
									className: "w-full h-full object-cover rounded-full bg-pink-100 group-hover:opacity-90 transition-opacity"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									soundEngine.playDropletSound();
									setShowAvatarModal(true);
								},
								title: "Profil Fotoğrafını Değiştir",
								className: "absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-tr from-[#b0004a] to-amber-500 flex items-center justify-center shadow-md border-2 border-white text-white cursor-pointer active:scale-90 hover:scale-105 transition-transform",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-3.5 h-3.5 text-white" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-bold text-[#805062] block mb-1",
								children: "Adın"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: profile.name,
								maxLength: 40,
								placeholder: "Adını yaz",
								onChange: (e) => onUpdateProfile({ name: e.target.value }),
								className: "w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-base font-black text-[#1f1a1c] tracking-tight outline-none focus:border-[#d81b60] placeholder:text-[#c4a8b0] placeholder:font-semibold select-text"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-[#805062] mt-1.5",
								children: profile.lastPeriodDate ? `Son başlangıç: ${(/* @__PURE__ */ new Date(`${profile.lastPeriodDate}T00:00:00`)).toLocaleDateString("tr-TR", {
									day: "numeric",
									month: "long",
									year: "numeric"
								})}` : "Başlangıç tarihi yok"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-50 to-amber-50 text-[#b0004a] text-xs font-bold border border-pink-200/60 shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: profile.goal || "Hedef seçilmedi" })]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2 pt-2 border-t border-pink-100/60 relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => setShowCycleParamModal(true),
							className: "p-3 rounded-2xl bg-gradient-to-b from-white to-pink-50/50 border border-pink-100/80 text-center shadow-xs cursor-pointer hover:border-pink-300 transition-all",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-bold text-[#805062] flex items-center justify-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🌿" }), " Döngü"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xl font-black text-[#b0004a] my-0.5",
									children: profile.cycleLength
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-[#805062] font-semibold",
									children: "Gün Ritmi ✎"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => setShowCycleParamModal(true),
							className: "p-3 rounded-2xl bg-gradient-to-b from-white to-pink-50/50 border border-pink-100/80 text-center shadow-xs cursor-pointer hover:border-pink-300 transition-all",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-bold text-[#805062] flex items-center justify-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🌸" }), " Akış"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xl font-black text-[#b0004a] my-0.5",
									children: profile.periodLength
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-[#805062] font-semibold",
									children: "Gün Akış ✎"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 rounded-2xl bg-gradient-to-b from-white to-pink-50/50 border border-pink-100/80 text-center shadow-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-bold text-[#805062] flex items-center justify-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✨" }), " Luteal"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xl font-black text-amber-600 my-0.5",
									children: "14"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-[#805062] font-semibold",
									children: "Altın Faz"
								})
							]
						})
					]
				})]
			}),
			false,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-3xl p-5 border border-pink-100 shadow-sm space-y-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-8 h-8 rounded-full bg-pink-50 text-[#d81b60] flex items-center justify-center shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { className: "w-4 h-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-black text-[#1f1a1c]",
							children: "Günlük Takviyeler & Öz-Bakım"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-[#805062]",
							children: [supplements.length, " aktif takviye listenizde"]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							soundEngine.playDropletSound();
							setShowAddSupplementModal(true);
						},
						className: "px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold flex items-center gap-1 shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Yeni Takviye Ekle" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: supplements.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 rounded-2xl bg-pink-50/30 border border-pink-100 flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-7 h-7 rounded-full bg-white text-[#b0004a] flex items-center justify-center font-bold text-xs shadow-xs",
								children: "💊"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-[#1f1a1c] truncate",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10.5px] text-[#805062]",
									children: [
										"Doz: ",
										item.dose,
										" • Saat: ",
										item.time
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200",
								children: item.reminderEnabled ? "Açıkken hatırlatır" : "Hatırlatma yok"
							}), supplements.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									soundEngine.playDropletSound();
									onDeleteSupplement(item.id);
									showToast("Takviye Silindi", `${item.name} listenizden çıkarıldı.`, "info");
								},
								className: "p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 cursor-pointer transition",
								title: "Sil",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
							})]
						})]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-3xl p-5 border border-pink-100 shadow-sm space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-black text-[#1f1a1c]",
							children: "Organik Biyo-Ritim & Sıvı"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 text-[11px] font-bold border border-cyan-200/60 flex items-center gap-1 shadow-xs",
							children: "💧 Floria"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 rounded-2xl bg-gradient-to-b from-pink-50/40 to-rose-50/20 border border-pink-100 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lg",
									children: "🚰"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-[#1f1a1c] block",
									children: "Günlük Canlı Su & Hidrasyon"
								}) })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-3 py-1 rounded-full bg-cyan-100/70 text-cyan-900 font-black text-xs shadow-xs",
								children: [
									sliderLiters.toFixed(1),
									" Litre (",
									Math.round(sliderLiters / .3),
									" Bardak)"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative pt-2 pb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: "1.0",
								max: "4.0",
								step: "0.1",
								value: sliderLiters,
								onChange: (e) => handleSliderChange(parseFloat(e.target.value)),
								className: "w-full h-3.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#d81b60] shadow-inner"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[10px] font-bold text-[#805062] mt-1.5 px-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1.0 L (Hafif)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[#b0004a]",
										children: "🌸 Doğurganlık için +0.5 L Önerilir"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "4.0 L (Yüksek)" })
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-2xl bg-pink-50/30 border border-pink-100 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-base shadow-xs",
								children: "🌙"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-[#1f1a1c] block",
								children: "Melatonin & Gece Koruma Saati"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] text-[#805062]",
								children: [
									profile.quietHoursStart || "23:00",
									" - ",
									profile.quietHoursEnd || "07:30"
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								soundEngine.playDropletSound();
								setShowSleepModal(true);
							},
							className: "px-3 py-1.5 rounded-full bg-white text-xs font-bold text-[#b0004a] border border-pink-200 hover:bg-pink-50 shadow-xs cursor-pointer active:scale-95 transition-transform",
							children: "Düzenle"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-2xl bg-white border border-pink-100 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-[#1f1a1c]",
							children: "Bildirim izni"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-[#805062]",
							children: notify === "granted" ? "Açık. Sabah 9 ve takviye saatinde, uygulama kapalıyken de gelir." : notify === "denied" ? "Kapalı. Telefon ayarından açabilirsin." : notify === "unsupported" ? "Kurulu Floria uygulamasında sorulur. Tarayıcıda gelmez." : "Henüz sorulmadı."
						})] }), notify !== "granted" && notify !== "unsupported" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								askNotifyPermission(supplements).then(setNotify);
							},
							className: "shrink-0 px-3 py-1.5 rounded-full bg-[#1f1a1c] text-white text-xs font-bold cursor-pointer",
							children: "İzin ver"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumGarden, { showToast }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							soundEngine.playDropletSound();
							setShowHelpModal(true);
						},
						className: "w-full p-3.5 rounded-2xl bg-white border border-pink-100 flex items-center justify-between text-xs font-bold text-[#1f1a1c] hover:bg-pink-50 transition-all cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[#805062]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "w-4 h-4 text-[#d81b60]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Yardım" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4 text-[#805062]" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							soundEngine.playDropletSound();
							setShowResetModal(true);
						},
						className: "w-full py-3 text-center text-xs font-bold text-[#b0004a] flex items-center justify-center gap-1.5 cursor-pointer hover:underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verileri Sıfırla" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-center text-[#805062]/80 pt-1",
						children: "Kayıtlar bu cihazda kalır. Tıbbi teşhis değildir."
					})
				]
			}),
			showAddSupplementModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm bg-white rounded-3xl p-5 border border-pink-100 shadow-2xl space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-pink-50 pb-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { className: "w-5 h-5 text-[#d81b60]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-extrabold text-sm text-[#1f1a1c]",
								children: "Yeni Takviye Ekle"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowAddSupplementModal(false),
							className: "w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleCreateSupplement,
						className: "space-y-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-[#1f1a1c] block mb-1",
								children: "Takviye Adı"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "örn: B12 Vitamini, Demir, Kolajen, İnositol",
								value: newSuppName,
								onChange: (e) => setNewSuppName(e.target.value),
								required: true,
								className: "w-full px-3.5 py-2.5 text-xs rounded-xl bg-pink-50/40 border border-pink-200 focus:outline-hidden focus:ring-2 focus:ring-[#d81b60]"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-[#1f1a1c] block mb-1",
									children: "Doz / Miktar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "örn: 1 Tablet, 500 mg",
									value: newSuppDose,
									onChange: (e) => setNewSuppDose(e.target.value),
									className: "w-full px-3.5 py-2 text-xs rounded-xl bg-pink-50/40 border border-pink-200 focus:outline-hidden focus:ring-2 focus:ring-[#d81b60]"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-[#1f1a1c] block mb-1",
									children: "Saat"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "time",
									value: newSuppTime,
									onChange: (e) => setNewSuppTime(e.target.value),
									className: "w-full px-3.5 py-2 text-xs rounded-xl bg-pink-50/40 border border-pink-200 focus:outline-hidden focus:ring-2 focus:ring-[#d81b60]"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 rounded-2xl bg-pink-50/50 border border-pink-100 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-4 h-4 text-[#d81b60]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-[#1f1a1c]",
										children: "Günlük Hatırlatıcı Aç"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: newSuppReminder,
									onChange: (e) => setNewSuppReminder(e.target.checked),
									className: "w-4 h-4 accent-[#d81b60] rounded cursor-pointer"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowAddSupplementModal(false),
									className: "flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 cursor-pointer",
									children: "Vazgeç"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold shadow-md cursor-pointer hover:brightness-105 active:scale-98",
									children: "Takviyeyi Kaydet"
								})]
							})
						]
					})]
				})
			}),
			showAvatarModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm bg-white rounded-3xl p-5 border border-pink-100 shadow-2xl space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-pink-50 pb-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloraLogo, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-extrabold text-sm text-[#1f1a1c]",
									children: "Profil Fotoğrafını Güncelle"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowAvatarModal(false),
								className: "w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-[#d81b60] to-rose-400 shadow-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: currentAvatar,
									alt: "Önizleme",
									className: "w-full h-full object-cover rounded-full"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-[#1f1a1c] mt-2",
								children: profile.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => fileInputRef.current?.click(),
							className: "w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cihazdan Fotoğraf Seç & Yükle" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-bold text-[#805062] block",
								children: "Veya Hazır Avatarlardan Seç:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-4 gap-2",
								children: presetAvatars.map((av) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										soundEngine.playDropletSound();
										onUpdateProfile({ avatarUrl: av.url });
										setShowAvatarModal(false);
										showToast("Avatar Seçildi", `${av.label} profil fotoğrafınız oldu.`, "success");
									},
									className: "p-1 rounded-2xl border border-pink-100 hover:border-[#d81b60] transition-all cursor-pointer flex flex-col items-center gap-1 group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: av.url,
										alt: av.label,
										className: "w-12 h-12 rounded-full object-cover group-hover:scale-105 transition-transform"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] font-semibold text-[#805062] truncate w-full text-center",
										children: av.label.split(" ")[0]
									})]
								}, av.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowAvatarModal(false),
							className: "w-full py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer",
							children: "Kapat"
						})
					]
				})
			}),
			showSleepModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm bg-white rounded-3xl p-5 border border-pink-100 shadow-2xl space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-pink-50 pb-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-5 h-5 text-indigo-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-extrabold text-sm text-[#1f1a1c]",
								children: "Sessiz Botanik Uyku Saatleri"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowSleepModal(false),
							className: "w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveSleep,
						className: "space-y-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 rounded-2xl bg-pink-50/40 border border-pink-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] font-bold text-[#805062] block mb-1",
									children: "Yatış Saati"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "time",
									value: bedtime,
									onChange: (e) => setBedtime(e.target.value),
									required: true,
									className: "w-full text-sm font-black text-[#1f1a1c] bg-transparent focus:outline-hidden"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 rounded-2xl bg-pink-50/40 border border-pink-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] font-bold text-[#805062] block mb-1",
									children: "Uyanış Saati"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "time",
									value: waketime,
									onChange: (e) => setWaketime(e.target.value),
									required: true,
									className: "w-full text-sm font-black text-[#1f1a1c] bg-transparent focus:outline-hidden"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowSleepModal(false),
								className: "flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 cursor-pointer",
								children: "İptal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold shadow-md cursor-pointer hover:brightness-105 active:scale-98",
								children: "Saatleri Kaydet"
							})]
						})]
					})]
				})
			}),
			showCycleParamModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm bg-white rounded-3xl p-5 border border-pink-100 shadow-2xl space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-pink-50 pb-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-4 h-4 text-[#d81b60]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-extrabold text-sm text-[#1f1a1c]",
								children: "Döngü Parametreleri"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowCycleParamModal(false),
							className: "w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveCycleParams,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-bold text-[#1f1a1c]",
									children: ["Döngü Uzunluğu: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[#b0004a]",
										children: [editCycleLen, " Gün"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-[#805062] font-semibold",
									children: "21 - 45 Gün"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: "21",
								max: "45",
								value: editCycleLen,
								onChange: (e) => setEditCycleLen(parseInt(e.target.value)),
								className: "w-full accent-[#d81b60]"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-bold text-[#1f1a1c]",
									children: ["Kanama süresi: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[#b0004a]",
										children: [editPeriodLen, " gün"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-[#805062] font-semibold",
									children: "2 - 10 Gün"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: "2",
								max: "10",
								value: editPeriodLen,
								onChange: (e) => setEditPeriodLen(parseInt(e.target.value)),
								className: "w-full accent-[#d81b60]"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowCycleParamModal(false),
									className: "flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 cursor-pointer",
									children: "Vazgeç"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold shadow-md cursor-pointer hover:brightness-105 active:scale-98",
									children: "Parametreleri Kaydet"
								})]
							})
						]
					})]
				})
			}),
			showHelpModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md bg-white rounded-3xl p-5 border border-pink-100 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-pink-50 pb-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloraLogo, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-extrabold text-sm text-[#1f1a1c]",
									children: "Yardım"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowHelpModal(false),
								className: "w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 text-xs leading-relaxed text-[#5a4044]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-2xl bg-pink-50/50 border border-pink-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
										className: "font-bold text-[#b0004a] mb-1",
										children: "🌸 Zirve Doğurganlık Nasıl Hesaplanır?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pencere, döngü uzunluğundan tahmin edilir. Yüzde verilmez. Test, teşhis veya gebelik güvencesi değildir." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-2xl bg-pink-50/50 border border-pink-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
										className: "font-bold text-[#b0004a] mb-1",
										children: "🕊️ Öfke ve PMS Öncesi Yatıştırma Nedir?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Adet öncesi gerginlikte 4-7-8 nefesi bir pratiktir. Öfkeyi veya hastalığı tedavi etmez." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-2xl bg-pink-50/50 border border-pink-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
										className: "font-bold text-[#b0004a] mb-1",
										children: "🔒 Verilerim Nerede Saklanıyor?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Kayıtlar yalnızca bu cihazda durur. Sunucuya gitmez. Hesap yoktur. Ayrı bir şifreli kasa yoktur." })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowHelpModal(false),
							className: "w-full py-2.5 rounded-xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold cursor-pointer",
							children: "Tamam"
						})
					]
				})
			}),
			showResetModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm bg-white rounded-3xl p-5 border border-pink-100 shadow-2xl space-y-4 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-12 h-12 rounded-full bg-rose-50 text-[#b0004a] flex items-center justify-center mx-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-6 h-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-black text-[#1f1a1c]",
							children: "Veriler silinsin mi?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[#805062] leading-relaxed",
							children: "Adın, döngü tarihin, belirtilerin, su kaydın ve takviyelerin silinir. Bu işlem geri alınamaz."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowResetModal(false),
								className: "flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer",
								children: "Vazgeç"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									soundEngine.playDropletSound();
									setShowResetModal(false);
									onResetData();
								},
								className: "flex-1 py-2.5 rounded-xl bg-[#b0004a] text-white text-xs font-bold shadow-md cursor-pointer hover:bg-[#d81b60]",
								children: "Sıfırla"
							})]
						})
					]
				})
			})
		]
	});
};
var OnboardingModal = ({ isOpen, onClose, onComplete, initialStep = 0 }) => {
	const [step, setStep] = (0, import_react.useState)(initialStep);
	const [goal, setGoal] = (0, import_react.useState)("Sadece döngü takibi");
	const [cycleLength, setCycleLength] = (0, import_react.useState)(28);
	const [periodLength, setPeriodLength] = (0, import_react.useState)(5);
	const [intensity, setIntensity] = (0, import_react.useState)("Normal (3-4 Ped)");
	const [lastPeriodDate, setLastPeriodDate] = (0, import_react.useState)(() => toLocalISO(/* @__PURE__ */ new Date()));
	const [contraception, setContraception] = (0, import_react.useState)("Doğal Yöntem");
	const [habits, setHabits] = (0, import_react.useState)(["Su Takibi"]);
	const [partnerMode, setPartnerMode] = (0, import_react.useState)(false);
	const [partnerName, setPartnerName] = (0, import_react.useState)("");
	const [calibrationProgress, setCalibrationProgress] = (0, import_react.useState)(0);
	const goalOptions = [
		{
			id: "Sadece döngü takibi",
			title: "Sadece döngü takibi",
			desc: "Günlük fazlar, başlangıç tahmini ve adet öncesi dalgalanma.",
			icon: "🌸",
			iconBg: "bg-rose-50 text-rose-500"
		},
		{
			id: "Hamilelik & Doğurganlık Planlama",
			title: "Hamilelik & Doğurganlık Planlama",
			desc: "Doğurgan pencereyi döngü uzunluğundan hesaplar. Test veya ısı kaydı yoktur.",
			icon: "💖",
			iconBg: "bg-gradient-to-tr from-[#b0004a] to-[#d81b60] text-white shadow-sm"
		},
		{
			id: "Hormonal Denge & PCOS Takibi",
			title: "Hormonal Denge & PCOS Takibi",
			desc: "Düzensiz ritim desteği, enerji haritası ve beden farkındalığı.",
			icon: "🌿",
			iconBg: "bg-emerald-50 text-emerald-600"
		},
		{
			id: "Faz rehberi",
			title: "Faz rehberi",
			desc: "Beslenme, hareket, uyku ve bakım önerileri bulunduğun faza göre açılır.",
			icon: "✨",
			iconBg: "bg-purple-50 text-purple-600"
		}
	];
	const opened = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (isOpen && !opened.current) {
			setStep(initialStep);
			setCalibrationProgress(0);
		}
		opened.current = isOpen;
	}, [isOpen, initialStep]);
	(0, import_react.useEffect)(() => {
		if (step === 4) {
			soundEngine.playCrystalChime();
			let current = 0;
			const interval = setInterval(() => {
				current += 5;
				if (current >= 100) {
					clearInterval(interval);
					setCalibrationProgress(100);
					triggerRosePollenBurst();
					soundEngine.playCrystalChime();
					setTimeout(() => {
						onComplete({
							goal,
							cycleLength,
							periodLength,
							lastPeriodDate,
							intensity,
							contraception,
							habits,
							partnerMode: false,
							partnerName: partnerName.trim()
						});
						onClose();
					}, 1200);
				} else setCalibrationProgress(current);
			}, 60);
			return () => clearInterval(interval);
		}
	}, [step]);
	const toggleHabit = (h) => {
		soundEngine.playDropletSound();
		if (habits.includes(h)) setHabits(habits.filter((item) => item !== h));
		else setHabits([...habits, h]);
	};
	const handleNext = () => {
		soundEngine.playDropletSound();
		if (step === 0) setStep(1);
		else if (step === 1) setStep(2);
		else if (step === 2) setStep(3);
		else if (step === 3) setStep(4);
	};
	const handlePrev = () => {
		soundEngine.playDropletSound();
		if (step > 0) setStep(step - 1);
	};
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md bg-[#fff8f8] rounded-[2.5rem] shadow-2xl overflow-hidden border border-pink-100 flex flex-col max-h-[95vh] relative text-[#1f1a1c]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 pt-3 pb-1 flex items-center justify-between gap-1 bg-[#fff8f8] border-b border-pink-100/60 z-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									soundEngine.playDropletSound();
									setStep(0);
								},
								className: `px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${step === 0 ? "bg-[#b0004a] text-white shadow-xs" : "bg-white text-[#805062] hover:text-[#b0004a]"}`,
								children: "✨ Karşılama"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									soundEngine.playDropletSound();
									setStep(1);
								},
								className: `px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${step === 1 ? "bg-[#b0004a] text-white shadow-xs" : "bg-white text-[#805062] hover:text-[#b0004a]"}`,
								children: "1. Hedef"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									soundEngine.playDropletSound();
									setStep(2);
								},
								className: `px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${step === 2 ? "bg-[#b0004a] text-white shadow-xs" : "bg-white text-[#805062] hover:text-[#b0004a]"}`,
								children: "2. Parametre"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									soundEngine.playDropletSound();
									setStep(3);
								},
								className: `px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${step === 3 ? "bg-[#b0004a] text-white shadow-xs" : "bg-white text-[#805062] hover:text-[#b0004a]"}`,
								children: "3. Kişisel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									soundEngine.playDropletSound();
									setStep(4);
								},
								className: `px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${step === 4 ? "bg-[#b0004a] text-white shadow-xs" : "bg-pink-100/80 text-[#b0004a] hover:bg-pink-200"}`,
								children: "🌸 Kalibrasyon"
							})
						]
					}), step !== 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black cursor-pointer shadow-xs shrink-0 ml-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
					})]
				}),
				step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 overflow-y-auto flex-1 flex flex-col items-center text-center animate-in fade-in duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-3 py-1 rounded-full bg-pink-100/70 text-[#b0004a] text-xs font-bold flex items-center gap-1.5 shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-[#d81b60] animate-pulse" }), "DÖNGÜ FAZI: DOĞAL DENGE"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-3 py-1 rounded-full bg-pink-100/60 text-[#805062] text-xs font-bold flex items-center gap-1",
								children: "🌸 Floria"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-52 h-52 flex items-center justify-center my-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-2 rounded-full bg-gradient-to-tr from-pink-400/25 via-rose-300/20 to-amber-200/30 blur-2xl animate-pulse pointer-events-none" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border-2 border-dashed border-pink-300/60 animate-spin-slow pointer-events-none" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-white" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#d81b60] shadow-[0_0_8px_#d81b60]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-40 h-40 rounded-full overflow-hidden bg-white shadow-[0_12px_32px_rgba(216,27,96,0.18)] relative",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/logo.png",
										alt: "Floria",
										className: "h-full w-full rounded-full object-cover"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white shadow-xs border border-pink-200 text-[#b0004a] text-[11px] font-bold mt-1 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-[#b0004a] animate-ping" }), "Canlı Ritim"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-3 py-1 rounded-full bg-pink-100 text-[#b0004a] text-xs font-extrabold uppercase tracking-widest flex items-center gap-1 mb-1",
							children: "🌸 Botanik Akıllı Sağlık"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-2.5 my-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloraLogo, { size: "md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl font-black text-[#1f1a1c] tracking-tight",
								children: "Floria"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[#805062] max-w-xs mt-1.5 leading-relaxed",
							children: "Biyo-ritmik döngü, doğurganlık takvimi ve hormonal esenliğiniz için nazik bir sığınak."
						}),
						false,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full space-y-2.5 my-5 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3.5 rounded-2xl bg-white border border-pink-100 shadow-sm flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-2xl bg-pink-50 text-[#d81b60] flex items-center justify-center font-bold text-lg shadow-xs",
									children: "📅"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-bold text-[#1f1a1c]",
											children: "Akıllı Ovülasyon & Faz Takibi"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-[#b0004a]",
											children: "Takvim"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-[#805062] truncate mt-0.5",
										children: "Hormonal evrelerinizle senkronize öngörüler ve takvim."
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3.5 rounded-2xl bg-white border border-pink-100 shadow-sm flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-2xl bg-pink-50 text-[#d81b60] flex items-center justify-center font-bold text-lg shadow-xs",
									children: "💧"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-bold text-[#1f1a1c]",
											children: "Biyo-Denge & Holistik Semptom"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-[#b0004a]",
											children: "Nazik Rapor"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-[#805062] truncate mt-0.5",
										children: "Ruh hali, uyku ve bedensel duyarlılık günlüğü."
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								soundEngine.playDropletSound();
								askNotifyPermission();
								setStep(1);
							},
							className: "w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white font-extrabold text-sm shadow-[0_8px_24px_rgba(216,27,96,0.35)] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Döngünü Keşfetmeye Başla" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-[#805062]/80 mt-4",
							children: "Kayıtlar bu cihazda kalır. Tıbbi teşhis değildir."
						})
					]
				}),
				step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 overflow-y-auto flex-1 flex flex-col justify-between animate-in fade-in duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-2 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloraLogo, { size: "md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base text-[#1f1a1c] font-black tracking-tight leading-tight",
										children: "Floria"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-[#805062] font-semibold -mt-0.5",
										children: "Biyolojik Ritim Alanı"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "px-3 py-1 rounded-full bg-[#ffd9e4]/70 text-[#330f1f] text-xs font-bold shadow-xs",
									children: [
										"Adım ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#b0004a] font-black",
											children: "1"
										}),
										" / 3"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										soundEngine.playDropletSound();
										setStep(2);
									},
									className: "text-[#805062] text-xs font-bold px-2 py-1 rounded-full hover:bg-pink-100 transition",
									children: "Atla"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full bg-[#f0e6e8] rounded-full p-1 mb-5 flex items-center space-x-1.5 shadow-inner",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 flex-1 rounded-full bg-[#d81b60] shadow-sm flex items-center justify-end pr-0.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-white" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 flex-1 rounded-full bg-[#eae0e2]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 flex-1 rounded-full bg-[#eae0e2]" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-1.5 text-[#b0004a]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: "🌷"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase tracking-wider font-extrabold",
										children: "Kişiselleştirme"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-black text-[#1f1a1c] tracking-tight",
									children: "Senin için ne yapabiliriz?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[#805062] leading-relaxed",
									children: "Floria, kadın biyolojisinin eşsiz döngüsüne saygıyla uyum sağlar. Takip hedefini seçerek başla."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3 pt-1",
							children: goalOptions.map((item) => {
								const isSelected = goal === item.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onClick: () => {
										soundEngine.playDropletSound();
										setGoal(item.id);
									},
									className: `p-4 rounded-3xl transition-all cursor-pointer flex items-center gap-3.5 border ${isSelected ? "bg-gradient-to-r from-pink-50/70 to-rose-50/70 border-pink-300 shadow-[0_8px_20px_rgba(216,27,96,0.12)] scale-[1.01]" : "bg-white border-transparent shadow-sm hover:border-pink-200"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${item.iconBg}`,
											children: item.icon
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-sm font-bold text-[#1f1a1c] leading-snug",
												children: item.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-[#805062] mt-0.5 leading-snug",
												children: item.desc
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "shrink-0",
											children: isSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-6 h-6 rounded-full bg-[#d81b60] flex items-center justify-center text-white shadow-xs",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 stroke-[3]" })
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-6 h-6 rounded-full border-2 border-gray-200 bg-gray-100/60" })
										})
									]
								}, item.id);
							})
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleNext,
							className: "w-full py-4 rounded-full bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white font-extrabold text-sm shadow-[0_8px_24px_rgba(216,27,96,0.35)] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Devam Et" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
						})
					})]
				}),
				step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 overflow-y-auto flex-1 flex flex-col justify-between animate-in fade-in duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-2 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloraLogo, { size: "md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base text-[#1f1a1c] font-black tracking-tight leading-tight",
										children: "Floria"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-[#805062] font-semibold -mt-0.5",
										children: "Biyolojik Ritim Alanı"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "px-3 py-1 rounded-full bg-[#ffd9e4]/70 text-[#330f1f] text-xs font-bold shadow-xs",
									children: [
										"Adım ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#b0004a] font-black",
											children: "2"
										}),
										" / 3"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										soundEngine.playDropletSound();
										setStep(3);
									},
									className: "text-[#805062] text-xs font-bold px-2 py-1 rounded-full hover:bg-pink-100 transition",
									children: "Atla"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full bg-[#f0e6e8] rounded-full p-1 mb-5 flex items-center space-x-1.5 shadow-inner",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 flex-1 rounded-full bg-[#d81b60]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 flex-1 rounded-full bg-[#d81b60] shadow-sm flex items-center justify-end pr-0.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-white" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 flex-1 rounded-full bg-[#eae0e2]" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-1.5 text-[#b0004a]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: "🌸"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase tracking-wider font-extrabold",
										children: "Biyo-Ritim Parametreleri"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-black text-[#1f1a1c] tracking-tight",
									children: "Döngü temellerini belirle"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[#805062] leading-relaxed",
									children: "Ortalama süreyi seç. Tahmin bu kayda göre yapılır, kesin değildir."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-3xl bg-white border border-pink-100 shadow-sm mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-[#1f1a1c]",
									children: "Ortalama Döngü Süresi"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-black text-[#d81b60] bg-pink-50 px-3 py-1 rounded-full border border-pink-200",
									children: [cycleLength, " Gün"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											if (cycleLength > 21) {
												soundEngine.playDropletSound();
												setCycleLength(cycleLength - 1);
											}
										},
										className: "w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-[#b0004a] font-bold shadow-xs cursor-pointer hover:bg-pink-100",
										children: "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 flex justify-center items-center gap-1.5 py-1",
										children: [
											-2,
											-1,
											0,
											1,
											2
										].map((offset) => {
											const val = cycleLength + offset;
											if (val < 21 || val > 42) return null;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												onClick: () => {
													soundEngine.playDropletSound();
													setCycleLength(val);
												},
												className: `w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold cursor-pointer transition-all ${offset === 0 ? "bg-[#d81b60] text-white text-base shadow-md scale-110" : "bg-pink-50/50 text-[#805062] text-xs hover:bg-pink-100"}`,
												children: val
											}, val);
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											if (cycleLength < 42) {
												soundEngine.playDropletSound();
												setCycleLength(cycleLength + 1);
											}
										},
										className: "w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-[#b0004a] font-bold shadow-xs cursor-pointer hover:bg-pink-100",
										children: "+"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-3xl bg-white border border-pink-100 shadow-sm mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-[#1f1a1c]",
									children: "Ortalama Kanama Süresi"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-black text-[#d81b60] bg-pink-50 px-3 py-1 rounded-full border border-pink-200",
									children: [periodLength, " Gün"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											if (periodLength > 2) {
												soundEngine.playDropletSound();
												setPeriodLength(periodLength - 1);
											}
										},
										className: "w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-[#b0004a] font-bold shadow-xs cursor-pointer hover:bg-pink-100",
										children: "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 flex justify-center items-center gap-1.5 py-1",
										children: [
											-2,
											-1,
											0,
											1,
											2
										].map((offset) => {
											const val = periodLength + offset;
											if (val < 2 || val > 10) return null;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												onClick: () => {
													soundEngine.playDropletSound();
													setPeriodLength(val);
												},
												className: `w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold cursor-pointer transition-all ${offset === 0 ? "bg-[#b0004a] text-white text-base shadow-md scale-110" : "bg-pink-50/50 text-[#805062] text-xs hover:bg-pink-100"}`,
												children: val
											}, val);
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											if (periodLength < 10) {
												soundEngine.playDropletSound();
												setPeriodLength(periodLength + 1);
											}
										},
										className: "w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-[#b0004a] font-bold shadow-xs cursor-pointer hover:bg-pink-100",
										children: "+"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3.5 bg-white rounded-2xl border border-pink-100 shadow-sm mb-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-bold text-[#1f1a1c] flex items-center gap-1 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-3.5 h-3.5 text-[#d81b60]" }), " Son döngü başlangıcı"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: lastPeriodDate,
									max: toLocalISO(/* @__PURE__ */ new Date()),
									onChange: (e) => {
										if (e.target.value) setLastPeriodDate(e.target.value);
									},
									className: "w-full px-3 py-2.5 rounded-xl bg-pink-50/40 border border-pink-200 text-sm font-bold text-[#1f1a1c]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-[#805062] mt-2",
									children: formatTrDate(lastPeriodDate)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3.5 bg-white rounded-2xl border border-pink-100 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-[#1f1a1c] block mb-2",
								children: "Korunma Metodu"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-4 gap-1.5",
								children: [
									"Doğal Yöntem",
									"Doğum Kontrol",
									"Spiral (RİA)",
									"Bariyer"
								].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										soundEngine.playDropletSound();
										setContraception(c);
									},
									className: `py-2 text-[10px] font-bold rounded-xl border transition-all cursor-pointer text-center ${contraception === c ? "bg-[#b0004a] text-white border-[#b0004a] shadow-xs" : "bg-pink-50/30 text-[#805062] border-pink-100"}`,
									children: c
								}, c))
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-6 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handlePrev,
							className: "py-4 px-5 rounded-full bg-white text-[#805062] font-bold text-sm border border-pink-200 active:scale-95 transition-all flex items-center gap-1 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Geri" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleNext,
							className: "flex-1 py-4 rounded-full bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white font-extrabold text-sm shadow-[0_8px_24px_rgba(216,27,96,0.35)] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Devam Et" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
						})]
					})]
				}),
				step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 overflow-y-auto flex-1 flex flex-col justify-between animate-in fade-in duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-2 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloraLogo, { size: "md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base text-[#1f1a1c] font-black tracking-tight leading-tight",
										children: "Floria"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-[#805062] font-semibold -mt-0.5",
										children: "Biyolojik Ritim Alanı"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "px-3 py-1 rounded-full bg-[#ffd9e4]/70 text-[#330f1f] text-xs font-bold shadow-xs",
									children: [
										"Adım ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#b0004a] font-black",
											children: "3"
										}),
										" / 3"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										soundEngine.playDropletSound();
										setStep(4);
									},
									className: "text-[#805062] text-xs font-bold px-2 py-1 rounded-full hover:bg-pink-100 transition",
									children: "Atla"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full bg-[#f0e6e8] rounded-full p-1 mb-5 flex items-center space-x-1.5 shadow-inner",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 flex-1 rounded-full bg-[#d81b60]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 flex-1 rounded-full bg-[#d81b60]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 flex-1 rounded-full bg-[#d81b60] shadow-sm flex items-center justify-end pr-0.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-white" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-1.5 text-[#b0004a]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: "✨"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase tracking-wider font-extrabold",
										children: "Alışkanlıklar"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-black text-[#1f1a1c] tracking-tight",
									children: "Odaklanmak istediğin detaylar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[#805062] leading-relaxed",
									children: "Sizin için en değerli olan biyo-parametreleri ve koruma kalkanlarını aktifleştirin."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2.5",
							children: [{
								id: "Su Takibi",
								title: "Akıllı Su Takibi (2.5L)",
								desc: "00:00 gece otomatik sıfırlama ve nazik su hatırlatmaları.",
								icon: Droplet
							}].map((item) => {
								const Icon = item.icon;
								const isChecked = habits.includes(item.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onClick: () => toggleHabit(item.id),
									className: `p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${isChecked ? "border-[#d81b60] bg-pink-50/50 shadow-xs" : "border-pink-100 bg-white hover:border-pink-200"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isChecked ? "bg-[#d81b60] text-white shadow-xs" : "bg-pink-50 text-[#805062]"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-5 h-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-xs font-bold text-[#1f1a1c]",
												children: item.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-[#805062] mt-0.5 leading-snug",
												children: item.desc
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `w-5 h-5 rounded-full flex items-center justify-center border transition-all ${isChecked ? "bg-[#d81b60] border-[#d81b60] text-white" : "border-gray-300"}`,
											children: isChecked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3 stroke-[3]" })
										})
									]
								}, item.id);
							})
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-6 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handlePrev,
							className: "py-4 px-5 rounded-full bg-white text-[#805062] font-bold text-sm border border-pink-200 active:scale-95 transition-all flex items-center gap-1 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Geri" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleNext,
							className: "flex-1 py-4 rounded-full bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white font-extrabold text-sm shadow-[0_8px_24px_rgba(216,27,96,0.35)] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Döngümü Kalibre Et" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
						})]
					})]
				}),
				step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-8 overflow-y-auto flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-44 h-44 flex items-center justify-center mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500/30 via-rose-400/25 to-amber-300/30 blur-2xl animate-pulse" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-2 rounded-full border-2 border-dashed border-[#d81b60]/50 animate-spin-slow pointer-events-none" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-36 h-36 rounded-full bg-white shadow-[0_16px_36px_rgba(216,27,96,0.25)] flex items-center justify-center p-3 relative",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/logo.png",
										alt: "Floria",
										className: "w-24 h-24 object-contain animate-bounce drop-shadow-[0_8px_16px_rgba(216,27,96,0.3)]"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-3 py-1 rounded-full bg-pink-100 text-[#b0004a] text-xs font-extrabold uppercase tracking-wider mb-2",
							children: "🌸 Floria kalibrasyonu"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-2xl font-black text-[#1f1a1c] tracking-tight",
							children: "Biyo-Ritminiz Senkronize Ediliyor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-[#805062] max-w-xs mt-1 leading-relaxed",
							children: [
								goal,
								" hedefi ve ",
								cycleLength,
								" günlük ritim bu cihaza kaydediliyor."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full max-w-xs mt-6 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs font-bold text-[#805062] mb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Algoritmik Eşleşme" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[#b0004a] font-black",
									children: ["%", calibrationProgress]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full h-3 rounded-full bg-pink-100 overflow-hidden shadow-inner p-0.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-gradient-to-r from-[#b0004a] via-[#d81b60] to-amber-400 transition-all duration-150",
									style: { width: `${calibrationProgress}%` }
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-[#805062] mt-3",
							children: calibrationProgress < 50 ? "Hormonal evreler analiz ediliyor..." : calibrationProgress < 85 ? "Yumurtlama ve doğurganlık pencereleri oluşturuluyor..." : "Botanik Bahçe hazırlanıyor! ✨"
						})
					]
				})
			]
		})
	});
};
var SymptomModal = ({ isOpen, onClose, dayInfo, onSave }) => {
	const [flow, setFlow] = (0, import_react.useState)(dayInfo.flow || "Yok");
	const [mood, setMood] = (0, import_react.useState)(dayInfo.mood || "Mutlu");
	const [selectedSymptoms, setSelectedSymptoms] = (0, import_react.useState)(dayInfo.symptoms || []);
	const [libido, setLibido] = (0, import_react.useState)(dayInfo.libido || "Normal");
	const [discharge, setDischarge] = (0, import_react.useState)(dayInfo.discharge || "Yok");
	const [dischargeColor, setDischargeColor] = (0, import_react.useState)(dayInfo.dischargeColor || "Yok");
	const [clots, setClots] = (0, import_react.useState)(dayInfo.clots || "Yok");
	const [crampWhere, setCrampWhere] = (0, import_react.useState)(dayInfo.crampWhere || "Yok");
	const [intimacy, setIntimacy] = (0, import_react.useState)(dayInfo.intimacy || "Yok");
	const [sleep, setSleep] = (0, import_react.useState)(dayInfo.sleep || "İyi");
	const [pain, setPain] = (0, import_react.useState)(dayInfo.pain || "Yok");
	const [note, setNote] = (0, import_react.useState)(dayInfo.note || "");
	const [energyLevel, setEnergyLevel] = (0, import_react.useState)(dayInfo.mood?.includes("Canlı") || dayInfo.mood?.includes("Enerjik") ? "Zirve" : "Dengeli");
	const symptomGroups = [
		{
			title: "Kramp ve ağrı",
			items: [
				"Hafif kramp",
				"Dalga dalga kramp",
				"Şiddetli kramp",
				"Kasılmalı kramp",
				"Bel ağrısı",
				"Belde yanma",
				"Kasık ağrısı",
				"Sağ kasık",
				"Sol kasık",
				"Bacakta ağrı",
				"Baş ağrısı",
				"Şakakta ağrı",
				"Migren",
				"Ense ağrısı",
				"Eklem ağrısı",
				"Kas ağrısı"
			]
		},
		{
			title: "Kanama ayrıntısı",
			items: [
				"Lekelenme",
				"Kahverengi leke",
				"Pembe leke",
				"Pıhtılı akış",
				"Ani yoğunlaşma",
				"Gece pedi",
				"Kanama durdu"
			]
		},
		{
			title: "Sindirim",
			items: [
				"Şişkinlik",
				"Sert şişkinlik",
				"Bulantı",
				"Kusma",
				"Gaz",
				"Mide yanması",
				"Kabızlık",
				"İshal",
				"İştah artışı",
				"İştahsızlık",
				"Tuz isteği",
				"Tatlı isteği",
				"Çikolata isteği"
			]
		},
		{
			title: "Göğüs",
			items: [
				"Göğüs hassasiyeti",
				"Dokununca acı",
				"Göğüste dolgunluk",
				"Göğüste ağırlık",
				"Meme ucu hassasiyeti"
			]
		},
		{
			title: "Cilt ve saç",
			items: [
				"Akne",
				"Çene akne",
				"Alın akne",
				"Cilt kuruluğu",
				"Cilt yağlanması",
				"Kaşıntı",
				"Saç dökülmesi",
				"Saç yağlanması"
			]
		},
		{
			title: "Vücut",
			items: [
				"Sıcak basması",
				"Gece terlemesi",
				"Üşüme",
				"Titreme",
				"Baş dönmesi",
				"Göz kararması",
				"Çarpıntı",
				"Nefes darlığı",
				"Yorgunluk",
				"Bitkinlik",
				"Enerji düşüklüğü",
				"İdrar sızısı",
				"Sık idrara çıkma",
				"Ödem",
				"El ayak şişliği"
			]
		},
		{
			title: "Uyku",
			items: [
				"Uykuya dalamama",
				"Gece uyanma",
				"Erken uyanma",
				"Kabus",
				"Gündüz uykusu",
				"Çok uyuma"
			]
		},
		{
			title: "Ruh",
			items: [
				"Ağlama isteği",
				"Kaygı",
				"Panik hissi",
				"Odak dağınıklığı",
				"Unutkanlık",
				"İçe kapanma",
				"Gerginlik",
				"Sabırsızlık",
				"Yalnız hissetme",
				"Motivasyon düşüklüğü"
			]
		}
	];
	const moodList = [
		{
			label: "Mutlu",
			icon: "🌸"
		},
		{
			label: "Enerjik",
			icon: "⚡"
		},
		{
			label: "Sakin",
			icon: "🕊️"
		},
		{
			label: "Hassas",
			icon: "🥺"
		},
		{
			label: "Yorgun",
			icon: "😴"
		},
		{
			label: "Sinirli",
			icon: "🌩️"
		},
		{
			label: "Kaygılı",
			icon: "💭"
		},
		{
			label: "İçe kapanık",
			icon: "🌙"
		}
	];
	const toggleSymptom = (sym) => {
		soundEngine.playDropletSound();
		if (selectedSymptoms.includes(sym)) setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
		else setSelectedSymptoms([...selectedSymptoms, sym]);
	};
	const handleSave = () => {
		soundEngine.playCrystalChime();
		onSave({
			flow,
			mood: energyLevel === "Zirve" ? `${mood} (Zirve Enerji)` : mood,
			symptoms: selectedSymptoms,
			libido,
			discharge,
			dischargeColor,
			clots,
			crampWhere,
			intimacy,
			sleep,
			pain,
			note: note.trim()
		});
		onClose();
	};
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-pink-100",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 px-5 border-b border-[#f6ebed] flex items-center justify-between bg-gradient-to-r from-pink-50/50 to-rose-50/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloraLogo, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-extrabold text-base text-[#1f1a1c] flex items-center gap-1.5",
							children: "Günlük Belirti & Ruh Hali"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-[#805062] font-medium",
							children: [
								dayInfo.date,
								" • Döngü ",
								dayInfo.cycleDay,
								". Gün"
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black shadow-xs cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 overflow-y-auto space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-[#1f1a1c] mb-2 block",
								children: "Kanama Yoğunluğu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-4 gap-2",
								children: [
									"Yok",
									"Hafif",
									"Normal",
									"Yoğun"
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setFlow(item),
									className: `py-2 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer ${flow === item ? "bg-[#d81b60] text-white border-[#d81b60] shadow-sm scale-102" : "bg-[#fff8f8] text-[#5a4044] border-[#f0e6e8] hover:bg-[#ffd9de]/30"}`,
									children: item
								}, item))
							}),
							flow !== "Yok" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] font-bold text-[#805062] mb-1.5 block",
									children: "Pıhtı"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-2",
									children: [
										"Yok",
										"Az",
										"Belirgin"
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setClots(item),
										className: `py-2 text-xs font-bold rounded-xl border cursor-pointer ${clots === item ? "bg-[#d81b60] text-white border-[#d81b60]" : "bg-white text-[#5a4044] border-pink-100"}`,
										children: item
									}, item))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] font-bold text-[#805062] mb-1.5 block",
									children: "Kramp yeri"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-5 gap-1.5",
									children: [
										"Yok",
										"Karın",
										"Bel",
										"Kasık",
										"Bacak"
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setCrampWhere(item),
										className: `py-2 text-[11px] font-bold rounded-xl border cursor-pointer ${crampWhere === item ? "bg-[#1f1a1c] text-white border-[#1f1a1c]" : "bg-white text-[#5a4044] border-pink-100"}`,
										children: item
									}, item))
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-[#1f1a1c]",
									children: "Ruh Hali"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-[#b0004a] font-bold",
									children: "Öneriler buna göre ayarlanır"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2",
								children: moodList.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										soundEngine.playDropletSound();
										setMood(m.label);
									},
									className: `p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${mood === m.label ? "bg-[#ffd9de] text-[#b0004a] border-[#d81b60] font-bold" : "bg-white text-[#5a4044] border-gray-100 hover:bg-pink-50/40"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base",
										children: m.icon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.label })]
								}, m.label))
							}),
							mood === "Sinirli" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-center gap-2 animate-in fade-in",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🕊️" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] leading-snug",
									children: "Öfke ve gerginlik için 4-7-8 yatıştırıcı nefes ve melisa çayı molası ana ekrana eklendi."
								})]
							}),
							mood === "Hassas" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2.5 p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-center gap-2 animate-in fade-in",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🌸" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] leading-snug",
									children: "Duygusal esenlik ve şefkatli öz-bakım alanı hazırlandı."
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-bold text-[#1f1a1c] block",
								children: [
									"Belirtiler · ",
									selectedSymptoms.length,
									" seçili"
								]
							}), symptomGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-bold uppercase tracking-wide text-[#b0004a] mb-1.5",
								children: group.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: group.items.map((sym) => {
									const isSelected = selectedSymptoms.includes(sym);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => toggleSymptom(sym),
										className: `px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${isSelected ? "bg-[#b0004a] text-white shadow-xs font-semibold" : "bg-[#f6ebed] text-[#805062] hover:bg-[#ffd9de]/60"}`,
										children: [isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3" }), sym]
									}, sym);
								})
							})] }, group.title))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs font-bold text-[#1f1a1c] mb-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Enerji & Biyo-Vitalite Seviyesi" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#b0004a] font-black",
								children: energyLevel
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2",
							children: [
								"Düşük",
								"Dengeli",
								"Zirve"
							].map((lvl) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setEnergyLevel(lvl),
								className: `py-2 px-1 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${energyLevel === lvl ? "bg-gradient-to-r from-amber-400 to-[#d81b60] text-white border-transparent shadow-sm" : "bg-white text-gray-700 border-gray-100 hover:bg-amber-50/30"}`,
								children: lvl === "Düşük" ? "🌙 Dinlenme" : lvl === "Dengeli" ? "🌱 Dengeli" : "⚡ %85 Zirve"
							}, lvl))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-[#1f1a1c] mb-2 block",
								children: "Cinsel ilişki"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-[#805062] mb-2",
								children: "İstersen boş bırak. Bu kayıt yalnızca bu cihazda durur."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [
									"Yok",
									"Korunarak",
									"Korunmasız"
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setIntimacy(item),
									className: `py-2 text-xs font-bold rounded-xl border cursor-pointer ${intimacy === item ? "bg-[#1f1a1c] text-white border-[#1f1a1c]" : "bg-white text-[#5a4044] border-pink-100"}`,
									children: item
								}, item))
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-[#1f1a1c] mb-2 block",
								children: "Akıntı"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-4 gap-2",
								children: [
									"Yok",
									"Az",
									"Krem",
									"Yumurta akı"
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setDischarge(item),
									className: `py-2 px-1 text-[11px] font-bold rounded-xl border cursor-pointer ${discharge === item ? "bg-[#d81b60] text-white border-[#d81b60]" : "bg-white text-[#5a4044] border-pink-100"}`,
									children: item
								}, item))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] font-bold text-[#805062] mb-1.5 block",
									children: "Akıntı rengi"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-2",
									children: [
										"Yok",
										"Şeffaf",
										"Beyaz",
										"Sarı",
										"Kahverengi",
										"Pembe"
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setDischargeColor(item),
										className: `py-2 text-[11px] font-bold rounded-xl border cursor-pointer ${dischargeColor === item ? "bg-[#d81b60] text-white border-[#d81b60]" : "bg-white text-[#5a4044] border-pink-100"}`,
										children: item
									}, item))
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-[#1f1a1c] mb-2 block",
								children: "Uyku"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 gap-1.5",
								children: [
									"İyi",
									"Bölündü",
									"Az"
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSleep(item),
									className: `py-2 text-xs font-bold rounded-xl border cursor-pointer ${sleep === item ? "bg-[#1f1a1c] text-white" : "bg-white border-pink-100"}`,
									children: item
								}, item))
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-[#1f1a1c] mb-2 block",
								children: "Ağrı"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-1.5",
								children: [
									"Yok",
									"Hafif",
									"Orta",
									"Şiddetli"
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setPain(item),
									className: `py-2 text-xs font-bold rounded-xl border cursor-pointer ${pain === item ? "bg-[#1f1a1c] text-white" : "bg-white border-pink-100"}`,
									children: item
								}, item))
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-bold text-[#1f1a1c] mb-2 block",
							children: "Gün notu"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: note,
							onChange: (event) => setNote(event.target.value),
							maxLength: 280,
							rows: 3,
							placeholder: "Bugün ne oldu, ne iyi geldi...",
							className: "w-full rounded-2xl border border-pink-100 px-3 py-2 text-sm outline-none"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-bold text-[#1f1a1c] mb-2 block",
							children: "Cinsel İstek (Libido)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2",
							children: [
								"Düşük",
								"Normal",
								"Yüksek"
							].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setLibido(l),
								className: `py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${libido === l ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white border-transparent" : "bg-white text-gray-700 border-gray-100 hover:bg-rose-50/30"}`,
								children: l
							}, l))
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-t border-[#f6ebed] bg-gray-50 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer",
						children: "İptal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleSave,
						className: "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold shadow-md hover:brightness-105 active:scale-98 transition-all cursor-pointer",
						children: "Kaydet"
					})]
				})
			]
		})
	});
};
var WaterSettingsModal = ({ isOpen, onClose, autoResetAtMidnight, onToggleAutoReset, waterGoalMl }) => {
	if (!isOpen) return null;
	const handleToggle = () => {
		soundEngine.playDropletSound();
		onToggleAutoReset(!autoResetAtMidnight);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100 flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 px-5 border-b border-[#f6ebed] flex items-center justify-between bg-gradient-to-r from-blue-50 to-pink-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloraLogo, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-extrabold text-sm text-[#1f1a1c]",
							children: "00:00 Gece Sıfırlama"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-[#805062]",
							children: "Floria su"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer shadow-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3.5 h-3.5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 space-y-4 text-xs text-gray-700",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-2xl bg-[#fcf1f3] border border-[#ffd9de] flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-extrabold text-xs text-[#1f1a1c]",
							children: "Gece Otomatik Sıfırla"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-[#805062] mt-0.5",
							children: "Her gece 00:00'da su sayacı sıfırlanır ve geçmişe arşivlenir."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							onClick: handleToggle,
							className: `w-12 h-7 rounded-full p-0.5 cursor-pointer transition-colors duration-200 flex items-center shrink-0 ${autoResetAtMidnight ? "toggle-track-active" : "toggle-track-inactive"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-6 h-6 rounded-full bg-white transition-transform duration-200 ${autoResetAtMidnight ? "toggle-thumb-active" : "toggle-thumb-inactive"}` })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2.5 pt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4 text-emerald-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-[#1f1a1c]",
									children: "Doğru Biyo-Ritm İstatistikleri"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-[#805062]",
									children: "Gece yarısı su sayacı sıfırlanır. Eski günün suyu saklanmaz."
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-4 h-4 text-indigo-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-[#1f1a1c]",
									children: "Uyku Koruması ile Uyumlu"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-[#805062]",
									children: "22:30 - 08:30 sessiz saatlerinde bildirim göndermez, uykunuzu bölmeden sessizce sıfırlanır."
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "w-4 h-4 text-blue-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-bold text-[#1f1a1c]",
									children: [
										"Mevcut Hedef: ",
										waterGoalMl,
										" ml"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-[#805062]",
									children: "Günlük hedefinizi Profil sekmesindeki 3D Organik Sıvı Kaydırıcısından dilediğiniz zaman değiştirebilirsiniz."
								})] })]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3.5 bg-gray-50 border-t border-gray-100 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "w-full py-2.5 rounded-xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold shadow-sm hover:brightness-105 active:scale-98 transition-all cursor-pointer",
						children: "Tamam"
					})
				})
			]
		})
	});
};
function pdfText(value) {
	return value.replace(/ş/g, "s").replace(/Ş/g, "S").replace(/ğ/g, "g").replace(/Ğ/g, "G").replace(/ı/g, "i").replace(/İ/g, "I").replace(/ö/g, "o").replace(/Ö/g, "O").replace(/ü/g, "u").replace(/Ü/g, "U").replace(/ç/g, "c").replace(/Ç/g, "C").replace(/[()\\]/g, "");
}
function makePdf(lines) {
	const body = [
		"BT",
		"/F1 11 Tf",
		"48 800 Td",
		"16 TL"
	];
	lines.slice(0, 42).forEach((line, index) => {
		const text = pdfText(line || " ");
		body.push(index === 0 ? `(${text}) Tj` : `T* (${text}) Tj`);
	});
	body.push("ET");
	const stream = body.join("\n");
	const objects = [
		"1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
		"2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
		"3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj",
		`4 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`,
		"5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj"
	];
	let pdf = "%PDF-1.4\n";
	const offsets = [0];
	for (const object of objects) {
		offsets.push(pdf.length);
		pdf += `${object}\n`;
	}
	const xref = pdf.length;
	pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
	for (let index = 1; index < offsets.length; index += 1) pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
	pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
	return pdf;
}
var DoctorReportModal = ({ isOpen, onClose, userName, goal, cycleLength, periodLength, lastPeriodDate, cycleDay, symptomLines }) => {
	const [downloadSuccess, setDownloadSuccess] = (0, import_react.useState)(false);
	const [copiedSuccess, setCopiedSuccess] = (0, import_react.useState)(false);
	const reportDate = (/* @__PURE__ */ new Date()).toLocaleDateString("tr-TR", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
	const handleDownload = () => {
		soundEngine.playCrystalChime();
		triggerRosePollenBurst();
		const symptomSummary = symptomLines.length ? [...new Set(symptomLines)].join(", ") : "Belirti kaydı yok";
		const reportContent = `FLORA CYCLE KİŞİSEL DÖNGÜ ÖZETİ
Tarih: ${reportDate}

- İsim: ${userName || "Belirtilmedi"}
- Hedef: ${goal || "Belirtilmedi"}
- Son başlangıç: ${lastPeriodDate ? formatTrDate(lastPeriodDate) : "Kayıt yok"}
- Döngü uzunluğu: ${cycleLength} gün
- Kanama süresi: ${periodLength} gün
- Bugünkü döngü günü: ${lastPeriodDate ? cycleDay : "—"}
- Kaydedilen belirtiler: ${symptomSummary}

Bu özet yalnızca uygulamaya girilen kayıtlardan üretilir. Tıbbi teşhis değildir.
`;
		const blob = new Blob([makePdf(reportContent.split("\n"))], { type: "application/pdf" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `flora-ozet-${(userName || "flora").toLowerCase().replace(/\s+/g, "-")}.pdf`;
		document.body.appendChild(link);
		link.click();
		link.remove();
		URL.revokeObjectURL(url);
		setDownloadSuccess(true);
		setTimeout(() => setDownloadSuccess(false), 3500);
	};
	const handlePrint = () => {
		soundEngine.playDropletSound();
		window.print();
	};
	const handleShare = async () => {
		soundEngine.playDropletSound();
		const shareText = `Floria özeti — ${userName || "İsimsiz"} | Başlangıç: ${lastPeriodDate ? formatTrDate(lastPeriodDate) : "yok"} | Döngü: ${cycleLength} gün | Bugün: ${lastPeriodDate ? `${cycleDay}. gün` : "kayıt yok"}`;
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(shareText);
			setCopiedSuccess(true);
			setTimeout(() => setCopiedSuccess(false), 2500);
		}
	};
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100 flex flex-col max-h-[92vh]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 px-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-rose-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-5 h-5 text-[#d81b60]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-extrabold text-sm text-[#1f1a1c]",
							children: "Kişisel döngü özeti"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-[#805062]",
							children: "Kişisel döngü özeti"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black cursor-pointer shadow-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 overflow-y-auto space-y-5 bg-[#faf9f9] text-[#1f1a1c] font-sans",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloraLogo, { size: "lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-black text-sm text-[#b0004a] tracking-tight",
										children: "FLORA CLINICAL HEALTH PROTOCOL"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-gray-500",
										children: "Kadın Sağlığı & Biyo-Ritmik Veri Entegrasyonu"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-gray-400",
										children: ["Rapor Tarihi: ", reportDate]
									})
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold",
									children: "Kişisel özet"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-gray-400 mt-1",
									children: ["ID: #FL-", (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2.5 bg-white rounded-xl border border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-gray-400 font-medium",
										children: "Hasta Adı"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-[#1f1a1c] mt-0.5",
										children: userName
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2.5 bg-white rounded-xl border border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-gray-400 font-medium",
										children: "Son başlangıç"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-[#1f1a1c] mt-0.5",
										children: lastPeriodDate ? formatTrDate(lastPeriodDate) : "Kayıt yok"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2.5 bg-white rounded-xl border border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-gray-400 font-medium",
										children: "Döngü"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-bold text-[#1f1a1c] mt-0.5",
										children: [
											cycleLength,
											" gün / ",
											periodLength,
											" gün kanama"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2.5 bg-white rounded-xl border border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-gray-400 font-medium",
										children: "Bugün"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-[#b0004a] mt-0.5",
										children: lastPeriodDate ? `${cycleDay}. gün` : "—"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
								className: "font-extrabold text-xs text-[#1f1a1c] uppercase tracking-wider flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-[#d81b60]" }), "Kayıtlı bilgiler"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-xs leading-relaxed text-[#5a4044]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Hedef: ",
									goal || "Belirtilmedi",
									". Eski döngü kaydı olmadığı için karşılaştırma veya tıbbi yorum yok."
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Belirtiler: ", symptomLines.length ? [...new Set(symptomLines)].join(", ") : "Henüz belirti kaydı yok."] })]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-t border-gray-200 bg-white flex flex-col gap-2",
					children: [
						downloadSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full py-1.5 px-3 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Özet cihazına indirildi." })]
						}),
						copiedSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full py-1.5 px-3 bg-pink-50 text-[#b0004a] rounded-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rapor özeti panoya kopyalandı!" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleDownload,
									className: "flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white text-xs font-bold shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PDF İndir" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handlePrint,
									className: "py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Yazdır" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleShare,
									className: "py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Paylaş" })]
								})
							]
						})
					]
				})
			]
		})
	});
};
function isLifeId(id) {
	return [
		"mind",
		"meeting",
		"fog",
		"trip",
		"delay",
		"travel",
		"libido",
		"social",
		"talk"
	].includes(id);
}
function Shell$1({ title, phase, onBack, children }) {
	const tone = {
		"Zihin takvimi": {
			name: "Zihin",
			sub: "Güç takvimi",
			icon: "🧠",
			chip: "İş"
		},
		"Toplantı danışmanı": {
			name: "Toplantı",
			sub: "Gün seçimi",
			icon: "📅",
			chip: "İş"
		},
		"Beyin sisi": {
			name: "Sis",
			sub: "Erteleme notu",
			icon: "🌫️",
			chip: "İş"
		},
		"Tatil çakışması": {
			name: "Tatil",
			sub: "Çakışma hesabı",
			icon: "🧳",
			chip: "Seyahat"
		},
		"Tarih kaydırma": {
			name: "Tarih",
			sub: "Öteleme notu",
			icon: "🗓️",
			chip: "Seyahat"
		},
		"Uçuş ve özel gece": {
			name: "Uçuş",
			sub: "Gece hazırlığı",
			icon: "✈️",
			chip: "Seyahat"
		},
		"Libido penceresi": {
			name: "Libido",
			sub: "Pencere hesabı",
			icon: "💗",
			chip: "Sosyal"
		},
		"Sosyal pil": {
			name: "Sosyal pil",
			sub: "Enerji tahmini",
			icon: "🎉",
			chip: "Sosyal"
		},
		İletişim: {
			name: "İletişim",
			sub: "Yumuşak metin",
			icon: "💬",
			chip: "Sosyal"
		}
	}[title] ?? {
		name: title,
		sub: {
			regl: "Kanama günleri",
			folikuler: "Foliküler faz",
			ovulasyon: "Doğurgan pencere",
			luteal: "Luteal faz",
			pms: "Adet öncesi"
		}[phase],
		icon: "🌸",
		chip: "Rehber"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 pb-40 pt-1 text-[#1f1a1c]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						soundEngine.playDropletSound();
						onBack();
					},
					className: "flex items-center gap-1 rounded-full bg-white border border-[#f3e7eb] px-3 py-2 text-xs font-semibold cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-3.5 h-3.5" }), "Rehbere Dön"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-[#fde7ef] text-[#e23b78] px-3 py-2 text-xs font-bold",
					children: tone.chip
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[28px] bg-white border border-[#f6e4ea] p-4 shadow-[0_10px_30px_rgba(22,19,20,0.04)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-14 h-14 rounded-[18px] bg-[#fff4d8] flex items-center justify-center text-2xl shrink-0",
						children: tone.icon
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-bold tracking-[0.14em] text-[#e23b78]",
								children: "FLORA BİYO-KILAVUZ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-[26px] font-black leading-none mt-1",
								children: tone.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-[#e23b78] mt-1",
								children: tone.sub
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[14px] leading-relaxed text-[#6d5a60] mt-3",
					children: "Kadın biyolojisinin fazlarına göre optimize edilmiş bilimsel rehberlik, pratik araçlar ve günlük hormon senkronizasyonu protokolü."
				})]
			}),
			children
		]
	});
}
function Card$1({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-[28px] bg-white border border-[#f3e7eb] p-[18px] shadow-[0_10px_30px_rgba(22,19,20,0.04)] space-y-3",
		children
	});
}
function startOfDay(date) {
	const copy = new Date(date);
	copy.setHours(0, 0, 0, 0);
	return copy;
}
function addDays(date, days) {
	const copy = new Date(date);
	copy.setDate(copy.getDate() + days);
	return copy;
}
function cycleDayOn$1(lastPeriodDate, cycleLength, date) {
	const start = parseLocalISO(lastPeriodDate);
	if (!start || cycleLength < 1) return null;
	const diff = Math.round((startOfDay(date).getTime() - startOfDay(start).getTime()) / 864e5);
	if (diff < 0) return null;
	return diff % cycleLength + 1;
}
function workFit(day, periodLength, cycleLength) {
	const ovulation = Math.max(periodLength + 1, cycleLength - 14);
	if (day <= Math.max(1, periodLength)) return {
		tag: "Hafif iş",
		score: 34,
		note: "Derin analiz, sunum ve imza için zayıf gün."
	};
	if (day < ovulation - 1) return {
		tag: "Analiz",
		score: 90,
		note: "Odak yüksek. Sözleşme, tablo ve karar için güçlü gün."
	};
	if (day <= ovulation + 1) return {
		tag: "Sunum",
		score: 96,
		note: "Özgüven penceresi. Toplantı, mülakat ve sunum için en uygun aralık."
	};
	if (day >= cycleLength - 4) return {
		tag: "Ertele",
		score: 28,
		note: "Beyin sisi riski. Yoğun işi bu günden kaydır."
	};
	return {
		tag: "Rutin",
		score: 60,
		note: "Alışılmış iş olur. Büyük kararı analiz gününe bırak."
	};
}
function periodStarts(lastPeriodDate, cycleLength) {
	const start = parseLocalISO(lastPeriodDate);
	if (!start) return [];
	const today = startOfDay(/* @__PURE__ */ new Date());
	const diff = Math.round((today.getTime() - startOfDay(start).getTime()) / 864e5);
	const first = diff < 0 ? 0 : Math.floor(diff / cycleLength);
	return Array.from({ length: 8 }, (_, index) => addDays(startOfDay(start), (first + index) * cycleLength));
}
function NeedDate({ lastPeriodDate }) {
	if (lastPeriodDate) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[11px] text-[#b0004a]",
		children: "Hesap için döngü başlangıcını kurulumda veya profilden kaydet."
	});
}
function LifeScreen(props) {
	if (props.id === "mind") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mind, { ...props });
	if (props.id === "meeting") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meeting, { ...props });
	if (props.id === "fog") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fog, { ...props });
	if (props.id === "trip") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trip, { ...props });
	if (props.id === "delay") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delay, { ...props });
	if (props.id === "travel") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TravelNight, { ...props });
	if (props.id === "libido") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Libido, { ...props });
	if (props.id === "social") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Social, { ...props });
	if (props.id === "talk") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Talk, { ...props });
	return null;
}
function RehberAlerts({ phase }) {
	const libido = readFlag("flora-guide-libido");
	const fog = readList("flora-guide-fog").filter((item) => item.day >= toLocalISO(/* @__PURE__ */ new Date()));
	if (!libido && fog.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 space-y-1.5",
		children: [libido && phase === "ovulasyon" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-2xl bg-[#1f1a1c] text-white text-[11px] px-3 py-2",
			children: "Libido ve çekicilik penceresi açık. Bugün zirve günü."
		}), fog.slice(0, 2).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "rounded-2xl bg-amber-50 border border-amber-200 text-[11px] px-3 py-2",
			children: ["Yoğun iş hatırlatması: ", formatTrDate(item.day)]
		}, item.day))]
	});
}
function readFlag(key) {
	try {
		return localStorage.getItem(key) === "1";
	} catch {
		return false;
	}
}
function readList(key) {
	try {
		const raw = localStorage.getItem(key);
		const parsed = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function Mind({ phase, cycleLength, periodLength, lastPeriodDate, onBack }) {
	const days = (0, import_react.useMemo)(() => {
		const today = startOfDay(/* @__PURE__ */ new Date());
		return Array.from({ length: 14 }, (_, index) => {
			const date = addDays(today, index);
			const day = cycleDayOn$1(lastPeriodDate, cycleLength, date);
			return {
				date,
				day,
				fit: day ? workFit(day, periodLength, cycleLength) : null
			};
		});
	}, [
		cycleLength,
		periodLength,
		lastPeriodDate
	]);
	const [picked, setPicked] = (0, import_react.useState)(0);
	const current = days[picked];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell$1, {
		title: "Zihin takvimi",
		phase,
		onBack,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedDate, { lastPeriodDate }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1.5 overflow-x-auto no-scrollbar",
				children: days.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setPicked(index),
					className: `shrink-0 w-16 rounded-2xl px-1 py-2 text-center cursor-pointer border ${picked === index ? "bg-[#1f1a1c] text-white border-[#1f1a1c]" : "bg-white border-sky-100"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-[10px] font-bold",
						children: item.date.getDate()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-[9px] mt-0.5",
						children: item.fit?.tag ?? "—"
					})]
				}, item.date.toISOString()))
			}),
			current?.fit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[32px] bg-[#121820] text-white p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-sky-200",
						children: [
							formatTrDate(toLocalISO(current.date)),
							" · döngü ",
							current.day,
							". gün"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-5xl font-semibold tracking-tight",
							children: current.fit.score
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-black text-sky-200",
							children: current.fit.tag
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed mt-3 text-white/80",
						children: current.fit.note
					})
				]
			})
		]
	});
}
function Meeting({ phase, cycleLength, periodLength, lastPeriodDate, onBack }) {
	const [date, setDate] = (0, import_react.useState)(toLocalISO(addDays(/* @__PURE__ */ new Date(), 1)));
	const picked = parseLocalISO(date);
	const day = picked ? cycleDayOn$1(lastPeriodDate, cycleLength, picked) : null;
	const fit = day ? workFit(day, periodLength, cycleLength) : null;
	const better = (0, import_react.useMemo)(() => {
		if (!lastPeriodDate) return [];
		const today = startOfDay(/* @__PURE__ */ new Date());
		const found = [];
		for (let index = 1; index <= 28 && found.length < 3; index += 1) {
			const next = addDays(today, index);
			const cycleDay = cycleDayOn$1(lastPeriodDate, cycleLength, next);
			if (!cycleDay) continue;
			const score = workFit(cycleDay, periodLength, cycleLength);
			if (score.score >= 88) found.push({
				iso: toLocalISO(next),
				tag: score.tag
			});
		}
		return found;
	}, [
		cycleLength,
		lastPeriodDate,
		periodLength
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell$1, {
		title: "Toplantı danışmanı",
		phase,
		onBack,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedDate, { lastPeriodDate }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs font-black block",
					children: "Toplantı veya mülakat günü"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					value: date,
					onChange: (event) => setDate(event.target.value),
					className: "w-full rounded-xl border border-pink-200 px-3 py-2 text-xs"
				}),
				fit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-[#102033] text-white p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-3xl font-black",
							children: fit.score
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-black text-sky-200",
							children: fit.tag
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed mt-2 text-white/80",
							children: fit.note
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-[#805062]",
					children: "Tarih, kayıtlı başlangıçtan sonra olmalı."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-black",
				children: "Daha uygun günler"
			}), better.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-[#805062]",
				children: "Önümüzdeki ay içinde sunum veya analiz günü çıkmadı."
			}) : better.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setDate(item.iso),
				className: "w-full text-left text-xs py-1 cursor-pointer",
				children: [
					formatTrDate(item.iso),
					" · ",
					item.tag
				]
			}, item.iso))] })
		]
	});
}
function Fog({ phase, cycleDay, cycleLength, onBack }) {
	const foggy = phase === "pms" || phase === "regl" || cycleDay >= cycleLength - 5;
	const [items, setItems] = (0, import_react.useState)(() => readList("flora-guide-fog"));
	const [day, setDay] = (0, import_react.useState)(toLocalISO(addDays(/* @__PURE__ */ new Date(), 1)));
	const save = (next) => {
		setItems(next);
		try {
			localStorage.setItem("flora-guide-fog", JSON.stringify(next));
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell$1, {
		title: "Beyin sisi",
		phase,
		onBack,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `rounded-[28px] p-5 text-white ${foggy ? "bg-gradient-to-br from-slate-800 to-indigo-700" : "bg-gradient-to-br from-emerald-700 to-teal-500"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.16em] text-white/70",
					children: foggy ? "Erken uyarı" : "Bugün net"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl font-black mt-1",
					children: foggy ? "Yoğun işi kaydır" : "Odak açık"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed mt-2 text-white/80",
					children: foggy ? "Bu fazda odak dağılabilir. Yeni sözleşme, uzun sunum ve gece mesaisini kaydır." : "Yoğun iş için engel görünmüyor. Yine de öğleden sonra tek bir derin iş seç."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-xs font-black block",
				children: "Yoğun işi şu güne ertele"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "date",
				value: day,
				onChange: (event) => setDay(event.target.value),
				className: "w-full rounded-xl border border-pink-200 px-3 py-2 text-xs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					if (!day || items.some((item) => item.day === day)) return;
					soundEngine.playDropletSound();
					save([...items, { day }].sort((a, b) => a.day.localeCompare(b.day)));
				},
				className: "px-3 py-1.5 rounded-full bg-[#b0004a] text-white text-[11px] font-bold cursor-pointer",
				children: "Hatırlatmayı kaydet"
			}),
			items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTrDate(item.day) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => save(items.filter((row) => row.day !== item.day)),
					className: "text-[#b0004a] cursor-pointer",
					children: "Sil"
				})]
			}, item.day))
		] })]
	});
}
function Trip({ phase, cycleLength, periodLength, lastPeriodDate, onBack }) {
	const [from, setFrom] = (0, import_react.useState)(toLocalISO(addDays(/* @__PURE__ */ new Date(), 14)));
	const [days, setDays] = (0, import_react.useState)(5);
	const stay = Math.max(1, Math.min(60, Number.isFinite(days) ? days : 1));
	const overlaps = (0, import_react.useMemo)(() => {
		const start = parseLocalISO(from);
		if (!start || !lastPeriodDate) return [];
		const end = addDays(start, stay - 1);
		return periodStarts(lastPeriodDate, cycleLength).flatMap((bleed) => {
			const bleedEnd = addDays(bleed, Math.max(0, periodLength - 1));
			if (startOfDay(end) < bleed || bleedEnd < startOfDay(start)) return [];
			const fromDay = bleed > startOfDay(start) ? bleed : startOfDay(start);
			const toDay = bleedEnd < startOfDay(end) ? bleedEnd : startOfDay(end);
			return [`${formatTrDate(toLocalISO(fromDay))} – ${formatTrDate(toLocalISO(toDay))}`];
		});
	}, [
		from,
		stay,
		lastPeriodDate,
		cycleLength,
		periodLength
	]);
	const start = parseLocalISO(from);
	const dayAtStart = start ? cycleDayOn$1(lastPeriodDate, cycleLength, start) : null;
	const phaseAtStart = dayAtStart ? phaseForCycleDay(dayAtStart, periodLength, cycleLength) : phase;
	const mood = phaseAtStart === "folikuler" || phaseAtStart === "ovulasyon" ? "Yüksek enerjili, hafif ve keyifli bir tatil dönemi sizi bekliyor!" : phaseAtStart === "luteal" ? "Tempo biraz düşer. Planı sıkı tutma, akşamları boş bırak." : "Dinlenme ağırlıklı bir tatil daha iyi gelir. Çantaya yedek ped koy.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell$1, {
		title: "Tatil çakışması",
		phase,
		onBack,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedDate, { lastPeriodDate }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-black flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🧳" }), " Tatil & Regl Çakışma Hesaplayıcı"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-semibold text-[#6d5a60]",
						children: "Tatil Başlangıç Tarihi"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: from,
						onChange: (event) => setFrom(event.target.value),
						className: "mt-1 w-full rounded-2xl border border-pink-100 bg-[#fff8f8] px-3 py-3 text-sm"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-semibold text-[#6d5a60]",
						children: "Tatil Süresi (Gün)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 1,
						max: 60,
						value: days,
						onChange: (event) => setDays(Number(event.target.value)),
						className: "mt-1 w-full rounded-2xl border border-pink-100 bg-[#fff8f8] px-3 py-3 text-sm"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `rounded-2xl p-4 ${overlaps.length ? "bg-rose-50" : "bg-[#e9f8ef]"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `text-sm font-black ${overlaps.length ? "text-rose-700" : "text-emerald-800"}`,
					children: overlaps.length ? "Dikkat: Regl çakışması görünüyor" : "Harika: Regl Çakışması Görünmüyor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs leading-relaxed mt-2 text-[#3f4a3c]",
					children: [dayAtStart ? `Tatil başlangıcında tahmini döngü gününüz: Gün ${dayAtStart}. ${mood}` : "Başlangıç kaydı yoksa gün hesaplanamaz.", overlaps.length ? ` Çakışan günler: ${overlaps.join(" · ")}` : ""]
				})]
			})
		] })]
	});
}
function Delay({ phase, cycleLength, periodLength, lastPeriodDate, onBack }) {
	const [event, setEvent] = (0, import_react.useState)(toLocalISO(addDays(/* @__PURE__ */ new Date(), 20)));
	const eventDate = parseLocalISO(event);
	const nearest = eventDate ? periodStarts(lastPeriodDate, cycleLength).find((bleed) => addDays(bleed, periodLength) >= startOfDay(eventDate)) : void 0;
	let gap = "";
	if (nearest && eventDate) {
		const bleedEnd = addDays(nearest, Math.max(0, periodLength - 1));
		if (startOfDay(eventDate) >= nearest && startOfDay(eventDate) <= bleedEnd) gap = `Etkinlik kanama aralığına denk geliyor. En yakın boş gün ${formatTrDate(toLocalISO(addDays(bleedEnd, 1)))}.`;
		else {
			const days = Math.round((nearest.getTime() - startOfDay(eventDate).getTime()) / 864e5);
			gap = days > 0 ? `Sonraki kanama ${days} gün sonra. Etkinlik şimdilik dışında.` : "Etkinlik, tahmin edilen aralığın dışında.";
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell$1, {
		title: "Tarih kaydırma",
		phase,
		onBack,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[28px] bg-[#3a2414] text-white p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.16em] text-amber-200",
					children: "Hesap, vaat değil"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed mt-2",
					children: "İlaçsız 2-3 gün ötelemek güvenilir değildir. İlaçla kaydırma yalnızca hekimle konuşulur."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedDate, { lastPeriodDate }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs font-black block",
					children: "Özel gün"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					value: event,
					onChange: (eventTarget) => setEvent(eventTarget.target.value),
					className: "w-full rounded-xl border border-pink-200 px-3 py-2 text-xs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-black leading-relaxed",
					children: gap || "Tarih seç."
				})
			] })
		]
	});
}
function TravelNight({ phase, cycleLength, periodLength, lastPeriodDate, onBack }) {
	const [mode, setMode] = (0, import_react.useState)("ucus");
	const [when, setWhen] = (0, import_react.useState)(toLocalISO(addDays(/* @__PURE__ */ new Date(), 10)));
	const [shift, setShift] = (0, import_react.useState)(3);
	const picked = parseLocalISO(when);
	const day = picked ? cycleDayOn$1(lastPeriodDate, cycleLength, picked) : null;
	const thatPhase = day ? phaseForCycleDay(day, periodLength, cycleLength) : null;
	const daysLeft = picked ? Math.round((startOfDay(picked).getTime() - startOfDay(/* @__PURE__ */ new Date()).getTime()) / 864e5) : 0;
	const bloat = thatPhase === "luteal" || thatPhase === "pms";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell$1, {
		title: "Uçuş ve özel gece",
		phase,
		onBack,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2",
			children: ["ucus", "gece"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setMode(key),
				className: `px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${mode === key ? "bg-[#b0004a] text-white" : "bg-white border border-pink-100"}`,
				children: key === "ucus" ? "Uçuş" : "Özel gece"
			}, key))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "date",
			value: when,
			onChange: (event) => setWhen(event.target.value),
			className: "w-full rounded-xl border border-pink-200 px-3 py-2 text-xs"
		}), mode === "ucus" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex items-center justify-between text-xs",
			children: ["Saat farkı", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "number",
				min: 0,
				max: 14,
				value: shift,
				onChange: (event) => setShift(Number(event.target.value) || 0),
				className: "w-16 rounded-lg border border-pink-200 px-2 py-1 text-right"
			})]
		}), [
			["Yatış", `Uçuştan ${Math.max(1, Math.round(shift / 2))} gece önce uykuyu ${Math.max(1, Math.round(shift / 2))} saat kaydır.`],
			["Kabin", "Her saat su. Alkol ve yeni kahve yok."],
			["İniş", "Gün ışığına çık. İlk gece oda karanlık olsun."]
		].map(([title, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-sky-50 px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-black text-sky-800",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed",
				children: text
			})]
		}, title))] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `rounded-2xl p-3 text-white ${bloat ? "bg-rose-700" : "bg-emerald-700"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-black",
				children: daysLeft >= 0 ? `${daysLeft} gün kaldı` : "Tarih geçti"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs mt-1 text-white/80",
				children: thatPhase ? bloat ? "Şişlik riski var. Erken ye, yürüyüş ekle." : "Cilt daha sakin olabilir. Yeni ürün deneme." : "Başlangıç kaydı yok."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs leading-relaxed",
			children: daysLeft > 5 ? "Tuzu azalt. Akşam yemeği hafif olsun." : "Yeni asit ve peeling yok. Bildiğin nem yeter."
		})] })] })]
	});
}
function Libido({ phase, cycleLength, periodLength, lastPeriodDate, onBack }) {
	const [on, setOn] = (0, import_react.useState)(() => readFlag("flora-guide-libido"));
	const peak = Math.max(periodLength + 1, cycleLength - 14);
	const windowDays = [
		peak - 1,
		peak,
		peak + 1
	].filter((value) => value >= 1 && value <= cycleLength);
	const today = startOfDay(/* @__PURE__ */ new Date());
	const day = cycleDayOn$1(lastPeriodDate, cycleLength, today);
	const inside = day != null && windowDays.includes(day);
	const until = day == null || inside ? 0 : (windowDays[0] - day + cycleLength) % cycleLength;
	const when = day == null ? null : addDays(today, inside ? 0 : until);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell$1, {
		title: "Libido penceresi",
		phase,
		onBack,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[28px] bg-white border border-pink-100 p-5 shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-bold uppercase tracking-[0.16em] text-[#b0004a]",
					children: day == null ? "Kayıt yok" : inside ? "Pencerenin içindesin" : "Sonraki pencere"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-4xl font-black mt-2 tracking-tight",
					children: day == null ? "—" : inside ? "Bugün" : `${until} gün`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-[#5a4044] mt-2 leading-relaxed",
					children: [
						when ? formatTrDate(toLocalISO(when)) : "Başlangıç tarihi yok, pencere hesaplanamaz.",
						" ",
						"Bu aralık döngüdeki doğurgan pencereyle aynıdır. İstek ölçümü değildir."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 mt-4",
					children: windowDays.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex-1 rounded-2xl px-2 py-3 text-center ${value === day ? "bg-[#b0004a] text-white" : value === peak ? "bg-rose-50 text-[#b0004a]" : "bg-[#fff8f8] text-[#1f1a1c]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-bold",
							children: value === peak ? "Zirve" : "Yan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-black",
							children: value
						})]
					}, value))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => {
				const nextOn = !on;
				setOn(nextOn);
				try {
					localStorage.setItem("flora-guide-libido", nextOn ? "1" : "0");
				} catch {}
				soundEngine.playDropletSound();
			},
			className: `w-full rounded-[26px] px-4 py-4 text-left cursor-pointer border ${on ? "bg-[#1f1a1c] text-white border-[#1f1a1c]" : "bg-white border-pink-100"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-black",
				children: on ? "Zirve notu açık" : "Zirve notu kapalı"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] mt-1 opacity-70",
				children: "Rehber açıkken kısa bir satır. Ana bildirim yok."
			})]
		})]
	});
}
function socialScore(phase) {
	if (phase === "ovulasyon") return 88;
	if (phase === "folikuler") return 74;
	if (phase === "luteal") return 48;
	if (phase === "pms") return 30;
	return 36;
}
function socialText(score) {
	if (score >= 75) return "Pil dolu. İnsan görmek iyi gelir. Süreyi iki saatle sınırla, gece düşer.";
	if (score >= 50) return "Yarım pil. Bir kişi, bildiğin yer, erken dönüş. Kalabalık ikinci plana.";
	return "Pil düşük. Ev, kısa mesaj, erken yatış. Zorunlu çıkış varsa tek saat ve sessiz dönüş.";
}
function Social({ phase, cycleDay, cycleLength, periodLength, onBack }) {
	const score = socialScore(phase);
	const [shown, setShown] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const frame = window.requestAnimationFrame(() => setShown(score));
		return () => window.cancelAnimationFrame(frame);
	}, [score]);
	const today = toLocalISO(/* @__PURE__ */ new Date());
	const [plan, setPlan] = (0, import_react.useState)(() => {
		try {
			return localStorage.getItem(`flora-guide-social-${today}`) || "";
		} catch {
			return "";
		}
	});
	const choose = (value) => {
		setPlan(value);
		try {
			localStorage.setItem(`flora-guide-social-${today}`, value);
		} catch {}
	};
	const forecast = Array.from({ length: 6 }, (_, index) => {
		const nextPhase = phaseForCycleDay((cycleDay - 1 + index) % cycleLength + 1, periodLength, cycleLength);
		const value = socialScore(nextPhase);
		const date = /* @__PURE__ */ new Date();
		date.setDate(date.getDate() + index);
		return {
			label: index === 0 ? "Bugün" : `${date.getDate()}`,
			value,
			phase: nextPhase
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell$1, {
		title: "Sosyal pil",
		phase,
		onBack,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `@keyframes flora-battery { 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-8px); } }` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-16 h-36 rounded-[22px] border-2 border-fuchsia-200 bg-fuchsia-50 overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute left-0 right-0 bottom-0 bg-gradient-to-t from-[#b0004a] via-rose-400 to-fuchsia-200",
							style: {
								height: `${shown}%`,
								transition: "height 1s ease",
								animation: "flora-battery 2.6s ease-in-out infinite"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute inset-0 flex items-center justify-center text-sm font-black text-[#1f1a1c]",
							children: score
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-black",
						children: "Bugünkü pil"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-relaxed mt-1",
						children: socialText(score)
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: ["Dışarı", "Evde"].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => choose(item),
						className: `px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${plan === item ? "bg-[#b0004a] text-white" : "bg-pink-50"}`,
						children: item
					}, item))
				}),
				plan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-[#805062]",
					children: [
						"Bugünkü seçim kaydedildi: ",
						plan,
						"."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-black",
					children: "Altı günlük tahmin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-[#805062]",
					children: "Pil, döngü gününe göre iner ve çıkar. Bu bir duygu ölçümü değil, faz tahmini."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-end justify-between gap-1 h-28",
					children: forecast.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex flex-col items-center gap-1 h-full justify-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] font-bold text-[#b0004a]",
								children: day.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full rounded-full bg-pink-50 overflow-hidden",
								style: { height: "72px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full bg-gradient-to-t from-[#b0004a] to-fuchsia-300 rounded-full",
									style: {
										height: `${day.value}%`,
										marginTop: `${100 - day.value}%`
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] text-[#805062]",
								children: day.label
							})
						]
					}, day.label + day.value))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-relaxed",
					children: forecast[1] ? `Yarın pil ${forecast[1].value}. ${forecast[1].value >= score ? "Biraz daha dışarı uygun." : "Yarına daha sakin bir plan bırak."}` : ""
				})
			] })
		]
	});
}
function Talk({ phase, onBack }) {
	const tactics = {
		regl: "Kısa yaz. Yeni tartışma açma. \"Bunu yarın konuşalım\" yeterli.",
		folikuler: "Net ve sıcak ol. Plan teklif etmek kolay gelir.",
		ovulasyon: "Göz teması ve kısa cümle yeter. Fazla açıklama çekiciliği düşürür.",
		luteal: "Niyetini bir cümlede söyle. İma bırakma.",
		pms: "Göndermeden önce ye, uyu, on dakika bekle."
	};
	const [draft, setDraft] = (0, import_react.useState)("");
	const [soft, setSoft] = (0, import_react.useState)("");
	const [checks, setChecks] = (0, import_react.useState)({
		food: false,
		sleep: false,
		wait: false
	});
	const tense = phase === "pms" || phase === "regl";
	const ready = !tense || checks.food && checks.sleep && checks.wait;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell$1, {
		title: "İletişim",
		phase,
		onBack,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[28px] bg-gradient-to-br from-violet-800 to-fuchsia-600 text-white p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-[0.16em] text-white/70",
				children: "Bu faz"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-black mt-1 leading-snug",
				children: tactics[phase]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: draft,
				onChange: (event) => setDraft(event.target.value),
				placeholder: "Göndermeden önce yaz",
				className: "w-full min-h-24 rounded-2xl border border-pink-200 p-3 text-sm"
			}),
			tense && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: [
					["food", "Yedim"],
					["sleep", "Uykum yerinde"],
					["wait", "On dakika"]
				].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setChecks((prev) => ({
						...prev,
						[key]: !prev[key]
					})),
					className: `px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${checks[key] ? "bg-violet-700 text-white" : "bg-violet-50 text-violet-800"}`,
					children: label
				}, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				disabled: !ready || !draft.trim(),
				onClick: () => {
					const cleaned = draft.replace(/!+/g, ".").replace(/\b(asla|her zaman)\b/gi, "bu kez");
					setSoft(tense ? `Bunu sakin söylemek istiyorum. ${cleaned}` : cleaned);
					soundEngine.playDropletSound();
				},
				className: "px-4 py-2 rounded-full bg-[#1f1a1c] text-white text-xs font-bold cursor-pointer disabled:opacity-40",
				children: ready ? "Yumuşat" : "Önce üç işareti seç"
			}),
			soft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed bg-violet-50 rounded-2xl p-3",
				children: soft
			})
		] })]
	});
}
var DAYS = {
	regl: [
		{
			name: "Demir günü",
			note: "Ilık tabak, az tuz, buzlu içecek yok.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Hurmalı yulaf",
					detail: "Yulafı sütle ısıt, hurma ve kabak çekirdeğini üste ekle. On dakika dinlendir.",
					items: [
						"Yulaf",
						"Hurma",
						"Kabak çekirdeği",
						"Süt"
					]
				},
				{
					when: "Öğle",
					icon: "🥣",
					title: "Mercimek çorbası",
					detail: "Kırmızı mercimek, ıspanak ve limon. Yanına bir dilim tam tahıl.",
					items: [
						"Mercimek",
						"Ispanak",
						"Limon",
						"Tam tahıl"
					]
				},
				{
					when: "Ara",
					icon: "🍵",
					title: "Zencefil çayı",
					detail: "Taze zencefili on dakika demle. Şeker ekleme.",
					items: ["Zencefil", "Limon"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Fırın tatlı patates",
					detail: "Patatesi kabuğuyla fırınla, nohut ve yoğurt ekle.",
					items: [
						"Tatlı patates",
						"Nohut",
						"Yoğurt"
					]
				}
			]
		},
		{
			name: "Sıcak kase",
			note: "Çiğ salata yerine pişmiş sebze.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Yumurtalı ıspanak",
					detail: "Ispanağı zeytinyağında söndür, yumurtayı kır. Yanına tahıl ekmeği.",
					items: [
						"Yumurta",
						"Ispanak",
						"Zeytinyağı",
						"Tahıl ekmeği"
					]
				},
				{
					when: "Öğle",
					icon: "🥗",
					title: "Kıymalı sebze yemeği",
					detail: "Kıyma yoksa mercimek. Havuç, patates, bol maydanoz.",
					items: [
						"Kıyma veya mercimek",
						"Havuç",
						"Patates",
						"Maydanoz"
					]
				},
				{
					when: "Ara",
					icon: "🍎",
					title: "Elma ve tahin",
					detail: "Bir elma, bir tatlı kaşığı tahin.",
					items: ["Elma", "Tahin"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Balık veya fasulye",
					detail: "Izgara balık yoksa kuru fasulye. Limon sık.",
					items: [
						"Balık veya fasulye",
						"Limon",
						"Roka"
					]
				}
			]
		},
		{
			name: "Yumuşak gün",
			note: "Az baharat, erken yemek.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Pirinç lapası",
					detail: "Pirinci sütle pişir, tarçın ve birkaç üzüm ekle.",
					items: [
						"Pirinç",
						"Süt",
						"Tarçın",
						"Üzüm"
					]
				},
				{
					when: "Öğle",
					icon: "🥣",
					title: "Tavuk suyu çorba",
					detail: "Haşlama tavuk, havuç, ince erişte. Suyu da iç.",
					items: [
						"Tavuk",
						"Havuç",
						"Erişte"
					]
				},
				{
					when: "Ara",
					icon: "🍵",
					title: "Papatya",
					detail: "Şekersiz. Karnın üstüne sıcak su torbası.",
					items: ["Papatya"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Fırın kabak",
					detail: "Kabağı zeytinyağıyla fırınla, yoğurt ve nane.",
					items: [
						"Kabak",
						"Yoğurt",
						"Nane",
						"Zeytinyağı"
					]
				}
			]
		}
	],
	folikuler: [
		{
			name: "Taze tabak",
			note: "Protein ve renk. Yeni işe enerji bırakır.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Yoğurt kasesi",
					detail: "Yoğurt, yaban mersini, keten ve bir kaşık yulaf.",
					items: [
						"Yoğurt",
						"Yaban mersini",
						"Keten",
						"Yulaf"
					]
				},
				{
					when: "Öğle",
					icon: "🥗",
					title: "Tavuklu kinoa",
					detail: "Izgara tavuk veya tofu, brokoli, limon, zeytinyağı.",
					items: [
						"Tavuk veya tofu",
						"Kinoa",
						"Brokoli",
						"Limon"
					]
				},
				{
					when: "Ara",
					icon: "🥒",
					title: "Turşu ve peynir",
					detail: "Küçük bir kase fermente turşu, beyaz peynir.",
					items: ["Turşu", "Beyaz peynir"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Izgara sebze",
					detail: "Kabak, biber, patlıcan. Üstüne yoğurt.",
					items: [
						"Kabak",
						"Biber",
						"Patlıcan",
						"Yoğurt"
					]
				}
			]
		},
		{
			name: "Odak tabağı",
			note: "Öğle proteinini atlama.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Omlet ve domates",
					detail: "İki yumurta, domates, biraz peynir. Ekmek isteğe bağlı.",
					items: [
						"Yumurta",
						"Domates",
						"Peynir"
					]
				},
				{
					when: "Öğle",
					icon: "🥗",
					title: "Nohut salatası",
					detail: "Haşlanmış nohut, salatalık, maydanoz, limon.",
					items: [
						"Nohut",
						"Salatalık",
						"Maydanoz",
						"Limon"
					]
				},
				{
					when: "Ara",
					icon: "🫐",
					title: "Meyve",
					detail: "Bir avuç çilek veya elma.",
					items: ["Çilek", "Elma"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Fırın somon",
					detail: "Somon yoksa mercimek köfte. Yanında haşlanmış brokoli.",
					items: [
						"Somon veya mercimek",
						"Brokoli",
						"Zeytinyağı"
					]
				}
			]
		},
		{
			name: "Hafif akşam",
			note: "Akşamı erken kapat.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Yulaf ve kefir",
					detail: "Kefire yulaf ve keten ekle. On dakika beklet.",
					items: [
						"Kefir",
						"Yulaf",
						"Keten"
					]
				},
				{
					when: "Öğle",
					icon: "🥗",
					title: "Hindi dürüm",
					detail: "Tam lavaş, hindi veya nohut, roka, yoğurt sos.",
					items: [
						"Tam lavaş",
						"Hindi veya nohut",
						"Roka",
						"Yoğurt"
					]
				},
				{
					when: "Ara",
					icon: "🥕",
					title: "Havuç",
					detail: "Çiğ havuç, bir tutam tuzsuz.",
					items: ["Havuç"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Sebze çorbası",
					detail: "Kabak, patates, havuç. Blenderdan geçir.",
					items: [
						"Kabak",
						"Patates",
						"Havuç"
					]
				}
			]
		}
	],
	ovulasyon: [
		{
			name: "Hafif ve parlak",
			note: "Ağır sos yok. Çiğ sebze iyi gelir.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Avokadolu yumurta",
					detail: "Haşlanmış yumurta, yarım avokado, domates, karabiber.",
					items: [
						"Yumurta",
						"Avokado",
						"Domates"
					]
				},
				{
					when: "Öğle",
					icon: "🥗",
					title: "Renkli salata",
					detail: "Roka, nohut, salatalık, zeytinyağı, limon.",
					items: [
						"Roka",
						"Nohut",
						"Salatalık",
						"Zeytinyağı",
						"Limon"
					]
				},
				{
					when: "Ara",
					icon: "🍊",
					title: "Nar veya portakal",
					detail: "Bir porsiyon meyve yeter.",
					items: ["Portakal"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Izgara balık",
					detail: "Balık, kuşkonmaz, limon. Yağ az.",
					items: [
						"Balık",
						"Kuşkonmaz",
						"Limon"
					]
				}
			]
		},
		{
			name: "Serin tabak",
			note: "Kızartma yok.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Meyveli yoğurt",
					detail: "Sade yoğurt, çilek, bir kaşık keten.",
					items: [
						"Yoğurt",
						"Çilek",
						"Keten"
					]
				},
				{
					when: "Öğle",
					icon: "🥗",
					title: "Ton veya nohut",
					detail: "Ton balığı yoksa nohut. Bol yeşillik.",
					items: [
						"Ton veya nohut",
						"Marul",
						"Limon",
						"Zeytin"
					]
				},
				{
					when: "Ara",
					icon: "🥒",
					title: "Salatalık",
					detail: "Dilimle, tuzsuz ye.",
					items: ["Salatalık"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Tavuk ızgara",
					detail: "Az yağ, kekik, közlenmiş biber.",
					items: [
						"Tavuk",
						"Biber",
						"Kekik"
					]
				}
			]
		},
		{
			name: "Akşam erken",
			note: "Gece yemeğini hafif tut.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Smoothie kasesi",
					detail: "Muz, yoğurt, yaban mersini. Şeker ekleme.",
					items: [
						"Muz",
						"Yoğurt",
						"Yaban mersini"
					]
				},
				{
					when: "Öğle",
					icon: "🥗",
					title: "Kinoa tabbouleh",
					detail: "Kinoa, maydanoz, domates, limon, zeytinyağı.",
					items: [
						"Kinoa",
						"Maydanoz",
						"Domates",
						"Limon"
					]
				},
				{
					when: "Ara",
					icon: "🥜",
					title: "Çiğ badem",
					detail: "Bir avuç, tuzsuz.",
					items: ["Badem"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Sebze buğulama",
					detail: "Brokoli ve havuç. Üstüne limon.",
					items: [
						"Brokoli",
						"Havuç",
						"Limon"
					]
				}
			]
		}
	],
	luteal: [
		{
			name: "Tok tutan",
			note: "Kompleks karbonhidrat, tuzu kıs.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Tarçınlı yulaf",
					detail: "Yulaf, susam, tarçın, dilim armut.",
					items: [
						"Yulaf",
						"Susam",
						"Tarçın",
						"Armut"
					]
				},
				{
					when: "Öğle",
					icon: "🥗",
					title: "Mercimek ve kinoa",
					detail: "Yeşil mercimek, kinoa, roka, zeytinyağı.",
					items: [
						"Mercimek",
						"Kinoa",
						"Roka",
						"Zeytinyağı"
					]
				},
				{
					when: "Ara",
					icon: "🍫",
					title: "İki kare çikolata",
					detail: "Bitter, sütlü değil. Yanına badem.",
					items: ["Bitter çikolata", "Badem"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Fırın kabak",
					detail: "Kabak, nohut, yoğurt. Tuz az.",
					items: [
						"Kabak",
						"Nohut",
						"Yoğurt"
					]
				}
			]
		},
		{
			name: "Magnezyum",
			note: "Tatlı isteği gelirse proteini artır.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Muzlu tost",
					detail: "Tam tahıl, fıstık ezmesi, muz dilimleri.",
					items: [
						"Tam tahıl",
						"Fıstık ezmesi",
						"Muz"
					]
				},
				{
					when: "Öğle",
					icon: "🥗",
					title: "Hindi veya fasulye",
					detail: "Hindi yoksa kuru fasulye. Yanında salata.",
					items: [
						"Hindi veya fasulye",
						"Salatalık",
						"Domates"
					]
				},
				{
					when: "Ara",
					icon: "🎃",
					title: "Kabak çekirdeği",
					detail: "Bir avuç, çiğ.",
					items: ["Kabak çekirdeği"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Ispanaklı yumurta",
					detail: "Ispanak, yumurta, bir dilim ekmek.",
					items: [
						"Ispanak",
						"Yumurta",
						"Ekmek"
					]
				}
			]
		},
		{
			name: "Sakin akşam",
			note: "Akşam tuzunu düşür, şişlik azalır.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Armutlu yoğurt",
					detail: "Yoğurt, haşlanmış armut, tarçın.",
					items: [
						"Yoğurt",
						"Armut",
						"Tarçın"
					]
				},
				{
					when: "Öğle",
					icon: "🥣",
					title: "Sebzeli bulgur",
					detail: "İnce bulgur, havuç, kabak, nane.",
					items: [
						"Bulgur",
						"Havuç",
						"Kabak",
						"Nane"
					]
				},
				{
					when: "Ara",
					icon: "🍵",
					title: "Rezene çayı",
					detail: "Yemekten sonra. Şekersiz.",
					items: ["Rezene"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Fırın patates",
					detail: "Patates, yoğurt, dereotu. Tereyağı az.",
					items: [
						"Patates",
						"Yoğurt",
						"Dereotu"
					]
				}
			]
		}
	],
	pms: [
		{
			name: "Kriz öncesi",
			note: "Öğünü atlama. Şeker yerine protein.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Muz ve yulaf",
					detail: "Yulaf, muz, ayçiçeği çekirdeği.",
					items: [
						"Yulaf",
						"Muz",
						"Ayçiçeği"
					]
				},
				{
					when: "Öğle",
					icon: "🥣",
					title: "Mercimek çorbası",
					detail: "Kırmızı mercimek, havuç, limon. Ekmekle ye.",
					items: [
						"Mercimek",
						"Havuç",
						"Limon",
						"Ekmek"
					]
				},
				{
					when: "Ara",
					icon: "🍫",
					title: "Bitter ve badem",
					detail: "İki kare yeter. Fazlası akşamı bozar.",
					items: ["Bitter çikolata", "Badem"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Ispanak ve yumurta",
					detail: "Ispanak sotelenir, yumurta eklenir, fırın patates yanında.",
					items: [
						"Ispanak",
						"Yumurta",
						"Patates"
					]
				}
			]
		},
		{
			name: "Sakin tuz",
			note: "Hazır cips yok. Ev yemeği.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Peynirli omlet",
					detail: "Yumurta, lor, domates. Tuz az.",
					items: [
						"Yumurta",
						"Lor",
						"Domates"
					]
				},
				{
					when: "Öğle",
					icon: "🥗",
					title: "Nohut yahni",
					detail: "Nohut, patates, havuç, kimyon az.",
					items: [
						"Nohut",
						"Patates",
						"Havuç"
					]
				},
				{
					when: "Ara",
					icon: "🍵",
					title: "Papatya",
					detail: "Öğleden sonra kahve yerine.",
					items: ["Papatya"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Tavuk haşlama",
					detail: "Tavuk, havuç, kabak. Suyunu da iç.",
					items: [
						"Tavuk",
						"Havuç",
						"Kabak"
					]
				}
			]
		},
		{
			name: "Erken yatış",
			note: "Akşam yemeği hafif ve erken.",
			meals: [
				{
					when: "Sabah",
					icon: "🌅",
					title: "Kefir ve yulaf",
					detail: "Kefir, yulaf, ayçiçeği. Soğuk da olur.",
					items: [
						"Kefir",
						"Yulaf",
						"Ayçiçeği"
					]
				},
				{
					when: "Öğle",
					icon: "🥣",
					title: "Ezogelin",
					detail: "Mercimek, bulgur, nane. Yanında yoğurt.",
					items: [
						"Mercimek",
						"Bulgur",
						"Nane",
						"Yoğurt"
					]
				},
				{
					when: "Ara",
					icon: "🍌",
					title: "Muz",
					detail: "Bir tane. Çikolata isteğini keser.",
					items: ["Muz"]
				},
				{
					when: "Akşam",
					icon: "🌙",
					title: "Yoğurtlu kabak",
					detail: "Rendelenmiş kabak, sarımsak az, yoğurt.",
					items: [
						"Kabak",
						"Yoğurt",
						"Sarımsak"
					]
				}
			]
		}
	]
};
function dayIndex(offset = 0) {
	const now = /* @__PURE__ */ new Date();
	const start = new Date(now.getFullYear(), 0, 0);
	return Math.floor((now.getTime() - start.getTime()) / 864e5) + offset;
}
function menuFor(phase, offset = 0) {
	const list = DAYS[phase];
	return list[(dayIndex(offset) % list.length + list.length) % list.length];
}
function marketLines(phase, tomorrowPhase) {
	const today = menuFor(phase, 0);
	const tomorrow = menuFor(tomorrowPhase, 1);
	const rows = [];
	const seen = /* @__PURE__ */ new Set();
	const push = (name, why) => {
		if (seen.has(name)) return;
		seen.add(name);
		rows.push({
			name,
			why
		});
	};
	today.meals.forEach((meal) => meal.items.forEach((item) => push(item, `Bugün · ${meal.when}`)));
	if (tomorrowPhase !== phase || tomorrow.name !== today.name) tomorrow.meals.forEach((meal) => meal.items.forEach((item) => push(item, `Yarın · ${meal.when}`)));
	return {
		today,
		tomorrow,
		rows
	};
}
function readJson(key, fallback) {
	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fallback;
	} catch {
		return fallback;
	}
}
function writeJson(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {}
}
var EMPTY_SIGNALS = {
	waterCurrentMl: 0,
	waterGoalMl: 2500,
	symptoms: [],
	supplementsTaken: 0,
	supplementsTotal: 0
};
var SCREEN_TITLE = {
	recipes: "Tarif ve menü",
	market: "Market",
	balance: "Denge",
	training: "Antrenman",
	energy: "Enerji",
	stretch: "Esneme",
	sound: "Ses",
	breath: "Nefes ve uyku",
	skin: "Cilt",
	mind: "Zihin",
	meeting: "Toplantı",
	fog: "Beyin sisi",
	trip: "Tatil",
	delay: "Tarih",
	travel: "Uçuş ve gece",
	libido: "Libido",
	social: "Sosyal pil",
	talk: "İletişim"
};
var PHASE_LABEL = {
	regl: "Kanama günleri",
	folikuler: "Foliküler faz",
	ovulasyon: "Doğurgan pencere",
	luteal: "Luteal faz",
	pms: "Adet öncesi"
};
var SECTIONS = [
	{
		title: "Beslenme",
		subtitle: "Faza göre mutfak",
		wash: "from-rose-50 to-amber-50",
		boxes: [
			{
				id: "recipes",
				title: "Tarif & menü",
				hint: "Dört faz",
				icon: "🥣",
				tint: "bg-rose-100"
			},
			{
				id: "market",
				title: "Market",
				hint: "Bu hafta",
				icon: "🧺",
				tint: "bg-amber-100"
			},
			{
				id: "balance",
				title: "Denge",
				hint: "Tohum ve kafein",
				icon: "⚖️",
				tint: "bg-emerald-100"
			}
		]
	},
	{
		title: "Egzersiz",
		subtitle: "Faza göre hareket",
		wash: "from-emerald-50 to-teal-50",
		boxes: [
			{
				id: "training",
				title: "Antrenman",
				hint: "HIIT, pilates",
				icon: "🏋️",
				tint: "bg-emerald-100"
			},
			{
				id: "energy",
				title: "Enerji",
				hint: "Güç ve eklem",
				icon: "⚡",
				tint: "bg-amber-100"
			},
			{
				id: "stretch",
				title: "Esneme",
				hint: "Spazm için",
				icon: "🧘",
				tint: "bg-teal-100"
			}
		]
	},
	{
		title: "Sanctuary",
		subtitle: "Zihin, uyku, cilt",
		wash: "from-violet-50 to-pink-50",
		boxes: [
			{
				id: "sound",
				title: "Ses",
				hint: "432 Hz, theta",
				icon: "🎧",
				tint: "bg-indigo-100"
			},
			{
				id: "breath",
				title: "Nefes & uyku",
				hint: "4-7-8",
				icon: "🌙",
				tint: "bg-violet-100"
			},
			{
				id: "skin",
				title: "Cilt",
				hint: "Bakım takvimi",
				icon: "✨",
				tint: "bg-pink-100"
			}
		]
	},
	{
		title: "İş",
		subtitle: "Faza göre üretkenlik",
		wash: "from-sky-50 to-indigo-50",
		boxes: [
			{
				id: "mind",
				title: "Zihin",
				hint: "Analiz ve imza",
				icon: "🧠",
				tint: "bg-sky-100"
			},
			{
				id: "meeting",
				title: "Toplantı",
				hint: "Gün seç",
				icon: "📅",
				tint: "bg-blue-100"
			},
			{
				id: "fog",
				title: "Beyin sisi",
				hint: "İşi ertele",
				icon: "🌫️",
				tint: "bg-slate-100"
			}
		]
	},
	{
		title: "Seyahat",
		subtitle: "Tatil ve özel gün",
		wash: "from-orange-50 to-amber-50",
		boxes: [
			{
				id: "trip",
				title: "Tatil",
				hint: "Çakışma hesabı",
				icon: "🧳",
				tint: "bg-orange-100"
			},
			{
				id: "delay",
				title: "Öteleme",
				hint: "Tarih kayması",
				icon: "🗓️",
				tint: "bg-amber-100"
			},
			{
				id: "travel",
				title: "Uçuş & gece",
				hint: "Jet-lag ve cilt",
				icon: "✈️",
				tint: "bg-sky-100"
			}
		]
	},
	{
		title: "Sosyal",
		subtitle: "Libido ve iletişim",
		wash: "from-rose-50 to-fuchsia-50",
		boxes: [
			{
				id: "libido",
				title: "Libido",
				hint: "Zirve notu",
				icon: "💗",
				tint: "bg-rose-100"
			},
			{
				id: "social",
				title: "Sosyal pil",
				hint: "Dışarı ya da ev",
				icon: "🎉",
				tint: "bg-fuchsia-100"
			},
			{
				id: "talk",
				title: "İletişim",
				hint: "Yazmadan önce",
				icon: "💬",
				tint: "bg-violet-100"
			}
		]
	}
];
var SECTION_INFO = {
	Beslenme: "Menü her gece değişir. Market listesi o günün tabaklarından kurulur. Denge, su, tohum, kahve ve alkolü bu cihazda tutar.",
	Egzersiz: "Antrenman ve esneme, bulunduğun faza göre seans açar. Enerji halkası su, ruh hali, belirti ve takviye kayıtlarınla birlikte hesaplanır.",
	Sanctuary: "Ses kulaklıkla 20 saniye çalar. Nefes 4-7-8 ritmindedir. Cilt önerisi teşhis değildir; faz çoğu kişide cildi böyle etkiler.",
	İş: "Zihin takvimi analiz, sunum ve imza için daha uygun günleri döngüden hesaplar. Beyin sisi uyarısı yoğun işi ertelemen için hatırlatma tutar.",
	Seyahat: "Tatil aralığı, kayıtlı döngüyle çakışıyor mu diye bakar. İlaçla gün kaydırmaz. Uçuş ve özel gece için hazırlık adımı verir.",
	Sosyal: "Sosyal pil önümüzdeki günlere göre tahmin edilir. Libido notu yalnızca Rehber açıkken görünür. İletişim kutusu gergin günde metni yumuşatır."
};
var TRAINING = {
	regl: {
		type: "Yumuşak seans",
		avoid: "HIIT ve sıçrama bugün gerekmez.",
		moves: [
			{
				name: "Yerinde yürüyüş",
				cue: "Kısa adım, omuzlar gevşek.",
				seconds: 40,
				image: "/training/yuruyus.jpg"
			},
			{
				name: "Yan eğilme",
				cue: "İki yana, belden zorlamadan.",
				seconds: 30,
				image: "/training/yan-egilme.jpg"
			},
			{
				name: "Kuş köpek",
				cue: "Karşı kol ve bacak. Bel sabit.",
				seconds: 40,
				image: "/training/kus-kopek.jpg"
			},
			{
				name: "Kalça köprüsü",
				cue: "Kalçayı yavaş kaldır, çeneyi gevşet.",
				seconds: 35,
				image: "/training/kopru.jpg"
			},
			{
				name: "Ölü böcek",
				cue: "Bel yerde. Nefesle uzat.",
				seconds: 35,
				image: "/training/dead-bug.jpg"
			}
		]
	},
	folikuler: {
		type: "Güç ve tempo",
		avoid: "Isınmadan yük bindirme.",
		moves: [
			{
				name: "Yerinde yürüyüş",
				cue: "Dizleri rahat kaldır.",
				seconds: 30,
				image: "/training/yuruyus.jpg"
			},
			{
				name: "Çömelme",
				cue: "Topuklar yerde, göğüs açık.",
				seconds: 40,
				image: "/training/comelme.jpg"
			},
			{
				name: "Geri lunge",
				cue: "Diz ayak bileğini geçmesin.",
				seconds: 40,
				image: "/training/lunge.jpg"
			},
			{
				name: "Çekiş",
				cue: "Sırt düz, dirsekler geri.",
				seconds: 40,
				image: "/training/cekis.jpg"
			},
			{
				name: "Kalça köprüsü",
				cue: "Üstte bir nefes bekle.",
				seconds: 35,
				image: "/training/kopru.jpg"
			},
			{
				name: "Kuş köpek",
				cue: "Denge için yavaş.",
				seconds: 30,
				image: "/training/kus-kopek.jpg"
			}
		]
	},
	ovulasyon: {
		type: "Kontrollü güç",
		avoid: "Eklem gevşek. Zıplamayı kısalt.",
		moves: [
			{
				name: "Uzun yürüyüş",
				cue: "Isınmayı aceleye getirme.",
				seconds: 45,
				image: "/training/yuruyus.jpg"
			},
			{
				name: "Çömelme",
				cue: "Kontrollü in, kontrollü kalk.",
				seconds: 40,
				image: "/training/comelme.jpg"
			},
			{
				name: "Geri lunge",
				cue: "Kısa adım, diz içeri kaçmasın.",
				seconds: 40,
				image: "/training/lunge.jpg"
			},
			{
				name: "Çekiş",
				cue: "Ani savurma yok.",
				seconds: 40,
				image: "/training/cekis.jpg"
			},
			{
				name: "Ölü böcek",
				cue: "Karın destekler, bel boşalmaz.",
				seconds: 35,
				image: "/training/dead-bug.jpg"
			},
			{
				name: "Kalça köprüsü",
				cue: "Pilates temposuyla kapat.",
				seconds: 35,
				image: "/training/kopru.jpg"
			}
		]
	},
	luteal: {
		type: "Orta tempo",
		avoid: "Maksimum HIIT yerine sabit tempo.",
		moves: [
			{
				name: "Yerinde yürüyüş",
				cue: "Nefes konuşma temposunda.",
				seconds: 35,
				image: "/training/yuruyus.jpg"
			},
			{
				name: "Kalça köprüsü",
				cue: "Yavaş, on tekrar hayal et.",
				seconds: 40,
				image: "/training/kopru.jpg"
			},
			{
				name: "Kuş köpek",
				cue: "Sallanma. Küçük hareket yeter.",
				seconds: 35,
				image: "/training/kus-kopek.jpg"
			},
			{
				name: "Yan eğilme",
				cue: "Kaburga açılır, bel ezilmez.",
				seconds: 30,
				image: "/training/yan-egilme.jpg"
			},
			{
				name: "Ölü böcek",
				cue: "Tempo sabit.",
				seconds: 35,
				image: "/training/dead-bug.jpg"
			},
			{
				name: "Çekiş",
				cue: "Hafif. Sırtı topla.",
				seconds: 30,
				image: "/training/cekis.jpg"
			}
		]
	},
	pms: {
		type: "Yavaş akış",
		avoid: "Rekor deneme. Eklemleri zorlama.",
		moves: [
			{
				name: "Yerinde yürüyüş",
				cue: "Çok yavaş. Ağrı artarsa dur.",
				seconds: 30,
				image: "/training/yuruyus.jpg"
			},
			{
				name: "Yan eğilme",
				cue: "İki yan, kısa tutuş.",
				seconds: 30,
				image: "/training/yan-egilme.jpg"
			},
			{
				name: "Kuş köpek",
				cue: "Dizler yerde. Bel nötr.",
				seconds: 30,
				image: "/training/kus-kopek.jpg"
			},
			{
				name: "Kalça köprüsü",
				cue: "Küçük kaldırma yeter.",
				seconds: 30,
				image: "/training/kopru.jpg"
			},
			{
				name: "Ölü böcek",
				cue: "Nefes uzun, tempo yok.",
				seconds: 30,
				image: "/training/dead-bug.jpg"
			}
		]
	}
};
var EXTRA_DRILLS = [
	{
		name: "Diz şınavı",
		cue: "Dizler yerde. Göğsü indir, it.",
		seconds: 30,
		image: "/training/diz-sinav.jpg"
	},
	{
		name: "Diz plank",
		cue: "Ön kollar yerde. Bel çukurlaşmasın.",
		seconds: 25,
		image: "/training/diz-plank.jpg"
	},
	{
		name: "Yan plank",
		cue: "Dizden. Kalça düşmesin. İki yan.",
		seconds: 25,
		image: "/training/yan-plank.jpg"
	},
	{
		name: "Sumo çömelme",
		cue: "Ayaklar geniş, topuklar yerde.",
		seconds: 35,
		image: "/training/sumo.jpg"
	},
	{
		name: "Duvar oturuşu",
		cue: "Sırt duvarda. Dizler ayak hizasında.",
		seconds: 30,
		image: "/training/duvar.jpg"
	},
	{
		name: "Sırt açma",
		cue: "Yüzüstü, kol ve bacak hafif kalkar.",
		seconds: 25,
		image: "/training/superman.jpg"
	},
	{
		name: "Midye",
		cue: "Yan yat, üst diz açılır. İki yan.",
		seconds: 30,
		image: "/training/midye.jpg"
	},
	{
		name: "Kalça dairesi",
		cue: "Ayakta, küçük daire. İki yön.",
		seconds: 30,
		image: "/training/kalca-daire.jpg"
	},
	{
		name: "Yan adım",
		cue: "Sağa sola, yumuşak iniş.",
		seconds: 30,
		image: "/training/yan-adim.jpg"
	},
	{
		name: "Diz kaldırma",
		cue: "Göbek hizasına, zıplama yok.",
		seconds: 30,
		image: "/training/diz-kaldirma.jpg"
	}
];
var ENERGY = {
	regl: {
		level: 40,
		joint: "Eklemler hassas olabilir. Yumuşak zemin, kısa adım."
	},
	folikuler: {
		level: 78,
		joint: "Eklemler daha stabil. Yükü kademeli artır."
	},
	ovulasyon: {
		level: 90,
		joint: "Bu pencerede eklem gevşekliği artabilir. Isınmayı uzat, ani yön değiştirme."
	},
	luteal: {
		level: 58,
		joint: "Güç düşer, gevşeklik sürebilir. Kontrolü hıza tercih et."
	},
	pms: {
		level: 42,
		joint: "Şişlik ve gerginlik olabilir. Zıplama ve derin bel dönüşü yok."
	}
};
var STRETCHES = [
	{
		name: "Diz göğse",
		hold: "40 sn",
		note: "Sırt üstü, tek diz. Alt beli boşalt.",
		image: "/stretches/diz-gogse.jpg"
	},
	{
		name: "Çocuk pozu",
		hold: "60 sn",
		note: "Kalçayı topuklara bırak, nefes yavaş.",
		image: "/stretches/cocuk.jpg"
	},
	{
		name: "Kedi-inek",
		hold: "8 tur",
		note: "Omurgayı zorlamadan, ağrı noktasında dur.",
		image: "/stretches/kedi-inek.jpg"
	},
	{
		name: "Yan yatar bükülme",
		hold: "30 sn",
		note: "Üst dizi öne, göğüs açık. İki yan.",
		image: "/stretches/yan-bukum.jpg"
	},
	{
		name: "Kalça köprüsü",
		hold: "40 sn",
		note: "Kalçayı kaldır, nefesi tutma.",
		image: "/stretches/kopru.jpg"
	},
	{
		name: "Kelebek",
		hold: "45 sn",
		note: "Ayak tabanları birleşik. Dizleri zorlama.",
		image: "/stretches/kelebek.jpg"
	},
	{
		name: "Figür dört",
		hold: "40 sn",
		note: "Ayak bileği karşı dizin üstünde. İki yan.",
		image: "/stretches/figur-dort.jpg"
	},
	{
		name: "Omuz",
		hold: "30 sn",
		note: "Kol göğüste. İki yan, boyun gevşek.",
		image: "/stretches/omuz.jpg"
	},
	{
		name: "Kuş köpek",
		hold: "8 tur",
		note: "Karşı kol ve bacak. Bel oynamasın.",
		image: "/stretches/kus-kopek.jpg"
	},
	{
		name: "Yan eğilme",
		hold: "30 sn",
		note: "Ayakta, kaburga açılır. İki yan.",
		image: "/stretches/yan-egilme.jpg"
	},
	{
		name: "İğne iplik",
		hold: "40 sn",
		note: "Dört ayak. Bir kol göğsün altından kayar.",
		image: "/stretches/igne.jpg"
	},
	{
		name: "Kalça fleksör",
		hold: "40 sn",
		note: "Arka diz yerde, gövde dik. İki yan.",
		image: "/stretches/kalca-flexor.jpg"
	},
	{
		name: "Öne katlanma",
		hold: "40 sn",
		note: "Oturarak, belden. Dizler yumuşak olabilir.",
		image: "/stretches/one-katlanma.jpg"
	},
	{
		name: "Baldır",
		hold: "30 sn",
		note: "Topuk yerde, arka bacak düz. İki yan.",
		image: "/stretches/baldir.jpg"
	},
	{
		name: "Boyun",
		hold: "25 sn",
		note: "Kulağı omuza yaklaştır. İki yan.",
		image: "/stretches/boyun.jpg"
	},
	{
		name: "Göğüs açma",
		hold: "30 sn",
		note: "Eller arkada, omuzlar aşağı.",
		image: "/stretches/gogus.jpg"
	},
	{
		name: "Arka bacak",
		hold: "40 sn",
		note: "Sırt üstü, bir bacak havada. İki yan.",
		image: "/stretches/hamstring.jpg"
	},
	{
		name: "Bel dönüşü",
		hold: "30 sn",
		note: "Oturarak, göğüs yavaş döner. İki yan.",
		image: "/stretches/bel-donus.jpg"
	},
	{
		name: "Duvara bacak",
		hold: "50 sn",
		note: "Sırt yerde, bacaklar duvarda. Bel boşalır.",
		image: "/stretches/duvar-bacak.jpg"
	},
	{
		name: "Bilek",
		hold: "20 sn",
		note: "Avuç öne, diğer elle yavaşça. İki yan.",
		image: "/stretches/bilek.jpg"
	}
];
var SOUNDS = [
	{
		id: "432",
		title: "432 Hz banyo",
		hz: "Sakin ton",
		left: 432,
		right: 432
	},
	{
		id: "theta",
		title: "Theta",
		hz: "6 Hz vuru",
		left: 200,
		right: 206
	},
	{
		id: "delta",
		title: "Delta",
		hz: "2 Hz vuru",
		left: 100,
		right: 102
	}
];
var SKIN = {
	regl: {
		state: "Bariyer daha hassas, cilt mat ve kuru hissedilebilir.",
		morning: [
			"Ilık su, nazik temizleyici",
			"Seramid veya hyalüronik nem",
			"Güneş koruma"
		],
		night: [
			"Aynı nazik temizleyici",
			"Panthenol veya centella nem",
			"Asit yok"
		],
		avoid: "AHA, BHA, peeling ve yeni retinol.",
		acne: "Sıkma. Sert köpük bariyeri daha da inceltir.",
		hair: "Saç derisi hassas. Ağda ve lazeri ertele."
	},
	folikuler: {
		state: "Östrojen yükselirken cilt çoğu kişide daha dayanıklı ve nemli olur.",
		morning: [
			"C vitamini veya peptit",
			"Hafif nem",
			"Güneş koruma"
		],
		night: [
			"Toleransın varsa AHA veya retinol",
			"Ardından nem",
			"İlk denemede tek ürün"
		],
		avoid: "Aynı anda birkaç yeni aktif.",
		acne: "Bu pencere genelde daha sakindir. Kendi leke düzenini not et.",
		hair: "Kanama bittikten sonraki günler ağda ve lazer için daha rahat penceredir."
	},
	ovulasyon: {
		state: "Parlaklık artabilir. Testosteronla yağ da artabilir.",
		morning: [
			"Niacinamide",
			"Yağsız jel nem",
			"Güneş koruma"
		],
		night: [
			"Gözenek için seyrek BHA",
			"Ağır yağlı krem yok",
			"Yeşil çay toniği isteğe bağlı"
		],
		avoid: "Shea gibi ağır kapatıcılar ve yeni asit yığmak.",
		acne: "Alın ve çene yağlanırsa tek BHA gecesi yeter. Her gün değil.",
		hair: "Hâlâ uygun. Kızarıklık olursa bir gün bekle."
	},
	luteal: {
		state: "Progesteron gözenekleri ve çene hattını doldurabilir.",
		morning: [
			"Nazik temizleyici",
			"Niacinamide",
			"Jel nem ve güneş koruma"
		],
		night: [
			"BHA’yı bu hafta 2-3 gece",
			"Bir gece kil maskesi",
			"Nem katmanı ince olsun"
		],
		avoid: "Ağır yağ, her gün asit, yeni ürün denemek.",
		acne: "Adet öncesi alevlenme klinikte bilinen bir örüntüdür. Teşhis değildir.",
		hair: "Saç daha yağlı görünebilir. Ağdayı kısalt."
	},
	pms: {
		state: "Son günlerde hassasiyet ve çene akneşi sık görülür.",
		morning: [
			"Ilık su",
			"Centella veya seramid",
			"Güneş koruma"
		],
		night: [
			"Bildiğin leke ürünün",
			"Yeni asit yok",
			"Peeling yok"
		],
		avoid: "Retinol dozunu artırmak ve ovalamak.",
		acne: "Çene ve çene altı. Elleri ciltten uzak tut.",
		hair: "Sıkı topuz ve sıcak alet yok. Epilasyonu ertele."
	}
};
function RehberTab({ phase, cycleDay, cycleLength, periodLength, lastPeriodDate, onTitle, signals, premium }) {
	const [guideId, setGuideId] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(premium);
	(0, import_react.useEffect)(() => {
		onTitle?.(guideId ? SCREEN_TITLE[guideId] : "Rehber");
	}, [guideId, onTitle]);
	if (!open && !isPremiumActive()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pb-40 pt-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremiumGarden, { onChange: () => setOpen(isPremiumActive()) })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pt-2",
		children: [guideId === null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 px-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[28px] font-semibold tracking-tight",
					children: "Rehber"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] text-[#9a8088] mb-3",
					children: "Bugünün fazına göre."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RehberAlerts, { phase })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuideHub, {
			phase,
			cycleDay,
			cycleLength,
			periodLength,
			lastPeriodDate,
			signals,
			openId: guideId,
			onOpen: setGuideId,
			onBack: () => setGuideId(null)
		})]
	});
}
function GuideHub({ phase, cycleDay, cycleLength, periodLength, lastPeriodDate, signals, openId, onOpen, onBack }) {
	const [info, setInfo] = (0, import_react.useState)(null);
	const focus = (signals && signals.waterGoalMl > 0 ? signals.waterCurrentMl / signals.waterGoalMl : 1) < .4 ? {
		id: "balance",
		kicker: "Bugün",
		title: "Su eksik",
		body: "Enerji halkası su kaydına bakıyor. Bir bardak ekle, denge ekranında durur."
	} : phase === "regl" ? {
		id: "stretch",
		kicker: "Bugün",
		title: "Yumuşak hareket",
		body: "Ağır seans gerekmez. Esneme ve ılık tabak daha uygun."
	} : phase === "folikuler" ? {
		id: "training",
		kicker: "Bugün",
		title: "Güç seansı",
		body: "Yükü kademeli artır. Isınmayı atlama."
	} : phase === "ovulasyon" ? {
		id: "social",
		kicker: "Bugün",
		title: "Sosyal pil dolu",
		body: "Kısa buluşma iyi gelir. Geceyi uzatma, eklemi ısıt."
	} : phase === "luteal" ? {
		id: "recipes",
		kicker: "Bugün",
		title: "Tok tutan tabak",
		body: "Tatlı isteği gelirse proteini artır, tuzu kıs."
	} : {
		id: "breath",
		kicker: "Bugün",
		title: "Nefesi uzat",
		body: "Göndermeden ve spor rekorundan önce 4-7-8."
	};
	if (openId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuideDetail, {
		id: openId,
		phase,
		cycleDay,
		cycleLength,
		periodLength,
		lastPeriodDate,
		signals,
		onBack
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-7 pb-40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					soundEngine.playDropletSound();
					onOpen(focus.id);
				},
				className: "relative w-full overflow-hidden text-left rounded-[32px] bg-[#161314] text-white p-6 cursor-pointer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-8 -top-10 h-36 w-36 rounded-full bg-[#b0004a]/40 blur-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "relative text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-200",
						children: focus.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "relative text-[28px] font-semibold tracking-tight mt-2 leading-none",
						children: focus.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "relative text-sm text-white/70 mt-3 leading-relaxed max-w-[28ch]",
						children: focus.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative inline-flex mt-5 items-center gap-2 text-[12px] font-semibold text-white",
						children: ["Aç", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-white/40" })]
					})
				]
			}),
			SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[13px] font-semibold tracking-tight text-[#1f1a1c]",
						children: section.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-[#9a8088]",
						children: section.subtitle
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							soundEngine.playDropletSound();
							setInfo(section.title);
						},
						className: "w-8 h-8 rounded-full bg-white border border-[#f0e4e8] text-[#b0004a] flex items-center justify-center cursor-pointer",
						"aria-label": `${section.title} bilgisi`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "w-3.5 h-3.5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2.5",
					children: section.boxes.map((box) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							soundEngine.playDropletSound();
							onOpen(box.id);
						},
						className: "text-left rounded-[24px] bg-white border border-[#f3e7eb] p-3 shadow-[0_8px_24px_rgba(22,19,20,0.04)] active:scale-[0.98] cursor-pointer min-h-[118px] flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `w-9 h-9 rounded-full ${box.tint} flex items-center justify-center text-base`,
							children: box.icon
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[13px] font-semibold text-[#1f1a1c] leading-tight",
							children: box.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[10px] text-[#9a8088] mt-1 leading-tight",
							children: box.hint
						})] })]
					}, box.id))
				})]
			}, section.title)),
			info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-[#161314]/45 backdrop-blur-[2px] flex items-end justify-center",
				onClick: () => setInfo(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md w-full mx-3 mb-24 rounded-[28px] bg-[#fffdfb] p-6 shadow-2xl",
					onClick: (event) => event.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b0004a]",
							children: "Rehber"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl font-semibold tracking-tight mt-1",
							children: info
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-[#5c4a50] mt-3",
							children: SECTION_INFO[info]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setInfo(null),
							className: "mt-5 px-4 py-2 rounded-full bg-[#161314] text-white text-xs font-semibold cursor-pointer",
							children: "Kapat"
						})
					]
				})
			})
		]
	});
}
var SCREEN_LOOK = {
	"Tarif ve menü": {
		name: "Tarif",
		sub: "Günün menüsü",
		icon: "🥣",
		chip: "Beslenme"
	},
	"Market listesi": {
		name: "Market",
		sub: "Haftalık liste",
		icon: "🧺",
		chip: "Beslenme"
	},
	Denge: {
		name: "Denge",
		sub: "Tohum ve kafein",
		icon: "⚖️",
		chip: "Beslenme"
	},
	Antrenman: {
		name: "Antrenman",
		sub: "Faza göre seans",
		icon: "🏋️",
		chip: "Egzersiz"
	},
	"Enerji ve eklem": {
		name: "Enerji",
		sub: "Güç ve eklem",
		icon: "⚡",
		chip: "Egzersiz"
	},
	Esneme: {
		name: "Esneme",
		sub: "Poz akışı",
		icon: "🧘",
		chip: "Egzersiz"
	},
	"Ses banyosu": {
		name: "Ses",
		sub: "Ses banyosu",
		icon: "🎧",
		chip: "Sanctuary"
	},
	"Nefes ve uyku": {
		name: "Nefes",
		sub: "Uyku geçişi",
		icon: "🌙",
		chip: "Sanctuary"
	},
	"Cilt ve epilasyon": {
		name: "Cilt",
		sub: "Bakım takvimi",
		icon: "✨",
		chip: "Sanctuary"
	}
};
function Shell({ title, phase, onBack, children }) {
	const look = SCREEN_LOOK[title] ?? {
		name: title,
		sub: PHASE_LABEL[phase],
		icon: "🌸",
		chip: "Rehber"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 pb-40 pt-1 text-[#1f1a1c]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuideTop, {
				chip: look.chip,
				onBack
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuideIntro, {
				icon: look.icon,
				name: look.name,
				sub: look.sub
			}),
			children
		]
	});
}
function GuideTop({ chip, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => {
				soundEngine.playDropletSound();
				onBack();
			},
			className: "flex items-center gap-1 rounded-full bg-white border border-[#f3e7eb] px-3 py-2 text-xs font-semibold cursor-pointer",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-3.5 h-3.5" }), "Rehbere Dön"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded-full bg-[#fde7ef] text-[#e23b78] px-3 py-2 text-xs font-bold",
			children: chip
		})]
	});
}
function GuideIntro({ icon, name, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[28px] bg-white border border-[#f6e4ea] p-4 shadow-[0_10px_30px_rgba(22,19,20,0.04)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-14 h-14 rounded-[18px] bg-[#fff4d8] flex items-center justify-center text-2xl shrink-0",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-bold tracking-[0.14em] text-[#e23b78]",
						children: "FLORA BİYO-KILAVUZ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[26px] font-black leading-none mt-1",
						children: name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold text-[#e23b78] mt-1",
						children: sub
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[14px] leading-relaxed text-[#6d5a60] mt-3",
			children: "Kadın biyolojisinin fazlarına göre optimize edilmiş bilimsel rehberlik, pratik araçlar ve günlük hormon senkronizasyonu protokolü."
		})]
	});
}
function Card({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-[28px] bg-white border border-[#f3e7eb] p-[18px] shadow-[0_10px_30px_rgba(22,19,20,0.04)] space-y-3",
		children
	});
}
function GuideDetail({ id, phase, cycleDay, cycleLength, periodLength, lastPeriodDate, signals, onBack }) {
	if (isLifeId(id)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeScreen, {
		id,
		phase,
		cycleDay,
		cycleLength,
		periodLength,
		lastPeriodDate,
		onBack
	});
	if (id === "recipes") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recipes, {
		phase,
		cycleDay,
		onBack
	});
	if (id === "market") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Market, {
		phase,
		cycleDay,
		cycleLength,
		periodLength,
		onBack
	});
	if (id === "balance") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Balance, {
		phase,
		onBack
	});
	if (id === "training") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Training, {
		phase,
		onBack
	});
	if (id === "energy") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Energy, {
		phase,
		signals,
		onBack
	});
	if (id === "stretch") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stretch, {
		phase,
		onBack
	});
	if (id === "sound") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundBath, {
		phase,
		onBack
	});
	if (id === "breath") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreathSleep, {
		phase,
		onBack
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinCare, {
		phase,
		cycleDay,
		cycleLength,
		onBack
	});
}
function Recipes({ phase, cycleDay, onBack }) {
	const [tab, setTab] = (0, import_react.useState)(phase);
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const nowWhen = hour < 11 ? "Sabah" : hour < 15 ? "Öğle" : hour < 18 ? "Ara" : "Akşam";
	const menu = menuFor(tab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Tarif ve menü",
		phase,
		onBack,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-1.5 overflow-x-auto no-scrollbar",
			children: [
				"regl",
				"folikuler",
				"ovulasyon",
				"luteal",
				"pms"
			].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setTab(key),
				className: `shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${tab === key ? "bg-[#b0004a] text-white" : "bg-white text-[#805062] border border-pink-100"}`,
				children: PHASE_LABEL[key]
			}, key))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] font-black text-[#b0004a]",
				children: [
					"Bugün · ",
					menu.name,
					" · döngü ",
					cycleDay,
					". gün"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] text-[#805062]",
				children: [menu.note, " Yarın başka bir tabak gelir. Market aynı malzemeleri listeler."]
			}),
			menu.meals.map((meal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `py-2 border-b border-pink-50 last:border-0 ${meal.when === nowWhen ? "bg-rose-50/80 -mx-2 px-2 rounded-2xl" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-lg",
							children: meal.icon
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-[10px] font-black uppercase tracking-wide text-[#b0004a]",
							children: [meal.when, meal.when === nowWhen ? " · şimdi" : ""]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs font-black text-[#1f1a1c]",
							children: meal.title
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-[#5a4044] leading-relaxed mt-1.5",
						children: meal.detail
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1 mt-1.5",
						children: meal.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-2 py-0.5 rounded-full bg-amber-50 text-[10px] font-semibold text-[#805062]",
							children: item
						}, item))
					})
				]
			}, meal.when))
		] })]
	});
}
function Market({ phase, cycleDay, cycleLength, periodLength, onBack }) {
	const { today, rows } = marketLines(phase, phaseForCycleDay(cycleDay >= cycleLength ? 1 : cycleDay + 1, periodLength, cycleLength));
	const storeKey = `flora-guide-market-${toLocalISO(/* @__PURE__ */ new Date())}`;
	const [checks, setChecks] = (0, import_react.useState)(() => readJson(storeKey, {}));
	const done = rows.filter((row) => checks[row.name]).length;
	const toggle = (name) => {
		setChecks((prev) => {
			const next = {
				...prev,
				[name]: !prev[name]
			};
			writeJson(storeKey, next);
			return next;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		title: "Market listesi",
		phase,
		onBack,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-black",
				children: today.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] text-[#805062]",
				children: [
					"Liste bugünkü menüden ve yarının fazından kurulur. ",
					done,
					"/",
					rows.length,
					" alındı. İşaretler bu günde kalır."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1.5 rounded-full bg-amber-100 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-emerald-500",
					style: { width: `${rows.length ? done / rows.length * 100 : 0}%` }
				})
			}),
			rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => toggle(row.name),
				className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left cursor-pointer border ${checks[row.name] ? "bg-emerald-50 border-emerald-100" : "bg-amber-50/40 border-amber-100"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${checks[row.name] ? "bg-emerald-500 text-white" : "bg-white border border-pink-200"}`,
					children: checks[row.name] ? "✓" : ""
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `block text-xs font-semibold ${checks[row.name] ? "line-through text-[#805062]" : ""}`,
					children: row.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-[10px] text-[#805062]",
					children: row.why
				})] })]
			}, row.name))
		] })
	});
}
function Balance({ phase, onBack }) {
	const today = toLocalISO(/* @__PURE__ */ new Date());
	const seedEarly = phase === "regl" || phase === "folikuler";
	const tips = [
		"Öğünü atlama. Açlık tatlı krizini büyütür.",
		"Tuzu akşam kıs. Şişlik sabaha kalmaz.",
		"Son kahveyi 14:00’te bırak.",
		"Bir kase yoğurt, bir elma, bir avuç çekirdek."
	];
	const tip = tips[(/* @__PURE__ */ new Date()).getDate() % tips.length];
	const [log, setLog] = (0, import_react.useState)(() => readJson("flora-guide-balance", {}));
	const current = log[today] ?? {
		coffee: 0,
		alcohol: 0,
		water: 0,
		seed: false,
		sweet: false
	};
	const save = (patch) => {
		setLog((prev) => {
			const next = {
				...prev,
				[today]: {
					...current,
					...patch
				}
			};
			const keys = Object.keys(next).sort();
			const trimmed = {};
			keys.slice(-21).forEach((key) => {
				trimmed[key] = next[key];
			});
			writeJson("flora-guide-balance", trimmed);
			return trimmed;
		});
	};
	const sensitive = phase === "luteal" || phase === "pms";
	const note = current.coffee >= 3 || current.alcohol >= 2 ? "Bu miktar uykuyu ve su tutulumunu bozar. Yarın yarıya indir." : sensitive && (current.coffee >= 2 || current.alcohol >= 1) ? "Bu fazda aynı miktar daha sert gelir. Öğleden sonra kahveyi kes." : "Bugünkü tempo faza uygun.";
	const week = Array.from({ length: 7 }, (_, index) => {
		const date = /* @__PURE__ */ new Date();
		date.setDate(date.getDate() - (6 - index));
		const key = toLocalISO(date);
		return {
			key,
			label: date.getDate(),
			row: log[key]
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Denge",
		phase,
		onBack,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-black",
					children: "Bugünün notu"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-relaxed",
					children: tip
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-relaxed",
					children: seedEarly ? "Tohum: 1 yemek kaşığı kabak çekirdeği + 1 yemek kaşığı keten. Sabah yoğurda." : "Tohum: 1 yemek kaşığı susam + 1 yemek kaşığı ayçiçeği. Öğle salatasına."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => save({ seed: !current.seed }),
					className: `px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${current.seed ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-800"}`,
					children: current.seed ? "Tohum alındı" : "Tohumu işaretle"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-black",
					children: "Su ve tatlı"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Su bardağı · ", current.water] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => save({ water: Math.min(12, current.water + 1) }),
						className: "px-3 py-1 rounded-full bg-sky-100 text-sky-800 font-bold cursor-pointer",
						children: "+1"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => save({ sweet: !current.sweet }),
					className: `px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${current.sweet ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-800"}`,
					children: current.sweet ? "Tatlı krizi vardı" : "Tatlı krizi yok"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-[#805062]",
					children: "Şeker yerine protein ve lif. Ödem için tuzu kıs, akşam bacakları yukarı. Bitki kürü ilaç değildir."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-black",
					children: "Kafein ve alkol"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between text-xs",
					children: ["Kahve fincanı", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 0,
						max: 8,
						value: current.coffee,
						onChange: (event) => save({ coffee: Number(event.target.value) || 0 }),
						className: "w-16 rounded-lg border border-pink-200 px-2 py-1 text-right"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between text-xs",
					children: ["Alkol kadeh", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 0,
						max: 8,
						value: current.alcohol,
						onChange: (event) => save({ alcohol: Number(event.target.value) || 0 }),
						className: "w-16 rounded-lg border border-pink-200 px-2 py-1 text-right"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-[#805062] leading-relaxed",
					children: note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-end justify-between gap-1 h-16 pt-2",
					children: week.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex flex-col items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full h-10 bg-pink-50 rounded-full overflow-hidden flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full bg-[#d81b60]",
								style: { height: `${Math.min(100, ((day.row?.coffee || 0) + (day.row?.alcohol || 0)) * 25)}%` }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] text-[#805062]",
							children: day.label
						})]
					}, day.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-[#805062]",
					children: "Son 7 gün bu cihazda durur. Sıfırlama hepsini siler."
				})
			] })
		]
	});
}
function Training({ phase, onBack }) {
	const plan = TRAINING[phase];
	const blocks = [...plan.moves, ...EXTRA_DRILLS];
	const [index, setIndex] = (0, import_react.useState)(0);
	const [left, setLeft] = (0, import_react.useState)(blocks[0].seconds);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [finished, setFinished] = (0, import_react.useState)(false);
	const block = blocks[Math.min(index, blocks.length - 1)];
	(0, import_react.useEffect)(() => {
		if (!running || finished) return;
		const timer = window.setInterval(() => {
			setLeft((value) => value > 1 ? value - 1 : 0);
		}, 1e3);
		return () => window.clearInterval(timer);
	}, [
		running,
		finished,
		index
	]);
	(0, import_react.useEffect)(() => {
		if (!running || left !== 0 || finished) return;
		setRunning(false);
		setLeft(blocks[index]?.seconds ?? 30);
		writeJson("flora-guide-workout", {
			text: blocks[index]?.name ?? plan.type,
			at: Date.now()
		});
	}, [
		running,
		left,
		finished,
		index,
		blocks,
		plan.type
	]);
	const spent = blocks.slice(0, index).reduce((sum, item) => sum + item.seconds, 0) + (finished ? block.seconds : block.seconds - left);
	const total = blocks.reduce((sum, item) => sum + item.seconds, 0);
	const ratio = total > 0 ? Math.max(0, Math.min(1, spent / total)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Antrenman",
		phase,
		onBack,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-[32px] bg-white border border-[#f3e7eb] shadow-[0_10px_30px_rgba(22,19,20,0.04)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: block.image,
				alt: block.name,
				className: "h-64 w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b0004a]",
						children: plan.type
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-20 w-20 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 rounded-full",
								style: { background: `conic-gradient(#161314 ${ratio * 360}deg, #f4e7eb 0deg)` }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-[5px] rounded-full bg-white flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-semibold tabular-nums",
									children: finished ? "00" : String(Math.max(0, left)).padStart(2, "0")
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xl font-semibold tracking-tight",
								children: finished ? "Seans bitti" : block.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-[#5c4a50] leading-relaxed",
								children: finished ? plan.type : block.cue
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-[#9a8088] leading-relaxed",
						children: [plan.avoid, " İstediğin harekete dokun."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							if (finished) {
								setFinished(false);
								setIndex(0);
								setLeft(blocks[0].seconds);
								setRunning(true);
								return;
							}
							setRunning((value) => !value);
						},
						className: "mt-4 w-full rounded-full bg-[#161314] text-white py-3 text-sm font-semibold cursor-pointer",
						children: finished ? "Yeniden başlat" : running ? "Duraklat" : "Seansı başlat"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-[28px] bg-white border border-[#f3e7eb] p-2",
			children: blocks.map((item, itemIndex) => {
				const active = itemIndex === index && !finished;
				const past = itemIndex < index || finished;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						soundEngine.playDropletSound();
						setRunning(false);
						setFinished(false);
						setIndex(itemIndex);
						setLeft(item.seconds);
					},
					className: `w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left cursor-pointer ${active ? "bg-[#161314] text-white" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.image,
							alt: "",
							className: "h-12 w-12 rounded-xl object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `block text-sm font-semibold ${active ? "" : past ? "text-[#9a8088]" : ""}`,
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `block text-[11px] truncate ${active ? "text-white/60" : "text-[#9a8088]"}`,
								children: item.cue
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `text-[11px] tabular-nums ${active ? "text-white/70" : "text-[#9a8088]"}`,
							children: [item.seconds, " sn"]
						})
					]
				}, item.name);
			})
		})]
	});
}
function Energy({ phase, signals = EMPTY_SIGNALS, onBack }) {
	const base = ENERGY[phase];
	const symptoms = signals.symptoms ?? [];
	const water = signals.waterGoalMl > 0 ? signals.waterCurrentMl / signals.waterGoalMl : 0;
	const moodBoost = signals.mood === "Canlı & Pozitif" ? 8 : signals.mood === "Sakin" ? 4 : signals.mood === "Yorgun" ? -12 : signals.mood === "Sinirli" ? -8 : signals.mood === "Hassas" ? -4 : 0;
	const symptomDrop = Math.min(12, symptoms.length * 3);
	const supplementBoost = signals.supplementsTotal > 0 ? Math.round(signals.supplementsTaken / signals.supplementsTotal * 6) : 0;
	const score = Math.max(12, Math.min(98, base.level + Math.round(water * 10) + moodBoost - symptomDrop + supplementBoost));
	const rows = [
		{
			label: "Faz",
			value: `${base.level}`
		},
		{
			label: "Su",
			value: water >= .7 ? "dolu" : water > 0 ? "eksik" : "yok"
		},
		{
			label: "Ruh hali",
			value: signals.mood || "seçilmedi"
		},
		{
			label: "Belirti",
			value: symptoms.length ? `${symptoms.length}` : "yok"
		},
		{
			label: "Takviye",
			value: `${signals.supplementsTaken}/${signals.supplementsTotal}`
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		title: "Enerji ve eklem",
		phase,
		onBack,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-28 h-28 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 rounded-full",
					style: { background: `conic-gradient(#d81b60 ${score * 3.6}deg, #fde7ef 0deg)` }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-2 rounded-full bg-white flex flex-col items-center justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-3xl font-black text-[#b0004a]",
						children: score
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] text-[#805062]",
						children: "senkron"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-black",
				children: "Bugünkü güç"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed mt-1",
				children: base.joint
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-2 pt-1",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-amber-50 px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-[#805062]",
					children: row.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-black",
					children: row.value
				})]
			}, row.label))
		})] })
	});
}
function Stretch({ phase, onBack }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	const [left, setLeft] = (0, import_react.useState)(0);
	const [running, setRunning] = (0, import_react.useState)(false);
	const item = STRETCHES[index];
	const seconds = item.hold.includes("tur") ? 40 : parseInt(item.hold, 10) || 40;
	(0, import_react.useEffect)(() => {
		if (!running || left <= 0) return;
		const timer = window.setInterval(() => {
			setLeft((value) => value > 1 ? value - 1 : 0);
		}, 1e3);
		return () => window.clearInterval(timer);
	}, [running, index]);
	(0, import_react.useEffect)(() => {
		if (!running || left !== 0) return;
		setRunning(false);
	}, [running, left]);
	const poseRatio = running ? Math.max(0, Math.min(1, 1 - left / seconds)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Esneme",
		phase,
		onBack,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-[32px] bg-white border border-[#f3e7eb] shadow-[0_10px_30px_rgba(22,19,20,0.04)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: item.image,
				alt: item.name,
				className: "h-64 w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3f6f62]",
						children: phase === "regl" || phase === "pms" ? "Yumuşak akış" : "Hareket akışı"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-20 w-20 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 rounded-full",
								style: { background: `conic-gradient(#1f4d42 ${poseRatio * 360}deg, #e7f3ef 0deg)` }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-[5px] rounded-full bg-white flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-semibold tabular-nums",
									children: running ? left : seconds
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xl font-semibold tracking-tight",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-[#5c4a50] leading-relaxed",
								children: [item.note, " İstediğin poza dokun."]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							if (!running) setLeft(seconds);
							setRunning((value) => !value);
							soundEngine.playDropletSound();
						},
						className: "mt-5 w-full rounded-full bg-[#10221c] text-white py-3 text-sm font-semibold cursor-pointer",
						children: running ? "Duraklat" : "Akışı başlat"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-[28px] bg-white border border-[#f3e7eb] p-2",
			children: STRETCHES.map((pose, poseIndex) => {
				const active = poseIndex === index;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						soundEngine.playDropletSound();
						const nextSeconds = pose.hold.includes("tur") ? 40 : parseInt(pose.hold, 10) || 40;
						setRunning(false);
						setIndex(poseIndex);
						setLeft(nextSeconds);
					},
					className: `w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left cursor-pointer ${active ? "bg-[#10221c] text-white" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold ${active ? "bg-white/15" : "bg-[#eef6f3] text-[#1f4d42]"}`,
							children: poseIndex + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: pose.image,
							alt: "",
							className: "h-12 w-12 rounded-xl object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex-1 min-w-0 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-semibold",
								children: pose.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `block text-[11px] truncate ${active ? "text-white/60" : "text-[#9a8088]"}`,
								children: pose.note
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-[11px] ${active ? "text-white/70" : "text-[#9a8088]"}`,
							children: pose.hold
						})
					]
				}, pose.name);
			})
		})]
	});
}
function SoundBath({ phase, onBack }) {
	const ctxRef = (0, import_react.useRef)(null);
	const stopRef = (0, import_react.useRef)(null);
	const [playing, setPlaying] = (0, import_react.useState)(null);
	const [left, setLeft] = (0, import_react.useState)(20);
	const stop = () => {
		stopRef.current?.();
		stopRef.current = null;
		setPlaying(null);
	};
	(0, import_react.useEffect)(() => {
		return () => {
			stopRef.current?.();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		setLeft(20);
		const timer = window.setInterval(() => {
			setLeft((value) => value > 0 ? value - 1 : 0);
		}, 1e3);
		return () => window.clearInterval(timer);
	}, [playing]);
	const play = async (sound) => {
		stop();
		const Ctx = window.AudioContext || window.webkitAudioContext;
		const ctx = ctxRef.current ?? new Ctx();
		ctxRef.current = ctx;
		if (ctx.state === "suspended") await ctx.resume();
		const left = ctx.createOscillator();
		const right = ctx.createOscillator();
		const gain = ctx.createGain();
		const merger = ctx.createChannelMerger(2);
		left.frequency.value = sound.left;
		right.frequency.value = sound.right;
		left.type = "sine";
		right.type = "sine";
		gain.gain.value = .03;
		left.connect(merger, 0, 0);
		right.connect(merger, 0, 1);
		merger.connect(gain);
		gain.connect(ctx.destination);
		left.start();
		right.start();
		setPlaying(sound.id);
		const timer = window.setTimeout(() => {
			left.stop();
			right.stop();
			setPlaying(null);
		}, 2e4);
		stopRef.current = () => {
			window.clearTimeout(timer);
			try {
				left.stop();
				right.stop();
			} catch {}
		};
	};
	const current = SOUNDS.find((sound) => sound.id === playing);
	const ratio = playing ? Math.max(0, Math.min(1, (20 - left) / 20)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Ses banyosu",
		phase,
		onBack,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes flora-drift { from { transform: scale(1.06); } to { transform: scale(1.14) translate3d(-1.5%, -1%, 0); } }
        @keyframes flora-ripple { 0% { transform: translateX(-50%) scaleX(0.35); opacity: 0; } 25% { opacity: 0.55; } 100% { transform: translateX(-50%) scaleX(1.8); opacity: 0; } }
        @keyframes flora-moon { 0%,100% { opacity: 0.25; } 50% { opacity: 0.7; } }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-[36px] h-[480px] shadow-[0_20px_50px_rgba(22,19,20,0.18)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/sounds/gece.jpg",
						alt: "Ay ışığında durgun göl",
						className: "absolute inset-0 h-full w-full object-cover",
						style: { animation: playing ? "flora-drift 16s ease-in-out infinite alternate" : void 0 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute left-[46%] top-[18%] h-16 w-16 -translate-x-1/2 rounded-full bg-white/40 blur-xl",
						style: { animation: playing ? "flora-moon 3.5s ease-in-out infinite" : void 0 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-x-0 bottom-[18%] h-28",
						children: (playing ? [
							0,
							.8,
							1.6,
							2.4
						] : []).map((delay) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-[48%] bottom-2 h-8 w-40 rounded-[100%] border border-white/70",
							style: { animation: `flora-ripple 3.2s ease-out infinite ${delay}s` }
						}, delay))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-5 pb-5 pt-16 text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-[0.18em] uppercase text-white/70",
								children: playing ? current?.hz : "Gece"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-3xl font-semibold tracking-tight mt-1",
								children: current ? current.title : "Ayın altındaki göl"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-white/80 mt-1",
								children: playing ? `${left} saniye` : "20 saniyelik ses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-1 rounded-full bg-white/25 overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-white",
									style: { width: `${ratio * 100}%` }
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-[#9a8088] px-1",
				children: "Kulaklıkla dinle. Ses kısık başlar. Tedavi değildir."
			}),
			SOUNDS.map((sound) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-xl",
						children: sound.id === "432" ? "🎧" : sound.id === "theta" ? "🌊" : "🌌"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-black",
						children: sound.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-[#805062]",
						children: sound.hz
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => playing === sound.id ? stop() : play(sound),
					className: `px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer ${playing === sound.id ? "bg-fuchsia-600 text-white" : "bg-[#1f1a1c] text-white"}`,
					children: playing === sound.id ? "Durdur" : "Dinle"
				})]
			}) }, sound.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Journal, {})
		]
	});
}
var BREATHS = [
	{
		id: "478",
		name: "4-7-8",
		use: "Uyku",
		steps: [
			{
				n: 4,
				label: "Al",
				cue: "Burundan. Göğüs açılıyor"
			},
			{
				n: 7,
				label: "Tut",
				cue: "Nefesi tut"
			},
			{
				n: 8,
				label: "Ver",
				cue: "Ağızdan yavaş bırak"
			}
		],
		learn: "Dört saniye al, yedi tut, sekiz ver. Veriş daha uzun olduğu için ritim yavaşlar. Yatmadan üç tur yeter."
	},
	{
		id: "box",
		name: "Kutu",
		use: "Odak",
		steps: [
			{
				n: 4,
				label: "Al",
				cue: "Göğüs açılıyor"
			},
			{
				n: 4,
				label: "Tut",
				cue: "Dolu tut"
			},
			{
				n: 4,
				label: "Ver",
				cue: "Yavaş bırak"
			},
			{
				n: 4,
				label: "Bekle",
				cue: "Boşta kal"
			}
		],
		learn: "Dört kenar eşit: al, tut, ver, boşta bekle. Zihin dağınıkken veya bir işe başlamadan dört tur."
	},
	{
		id: "55",
		name: "5-5",
		use: "Sakin",
		steps: [{
			n: 5,
			label: "Al",
			cue: "Burundan, sessiz"
		}, {
			n: 5,
			label: "Ver",
			cue: "Aynı uzunlukta bırak"
		}],
		learn: "Alış ve veriş eşit, tutuş yok. Dakikada yaklaşık altı nefes. Gün içinde en kolay ritim budur."
	},
	{
		id: "sigh",
		name: "Çift çekiş",
		use: "Boşalt",
		steps: [
			{
				n: 2,
				label: "Al",
				cue: "Burundan kısa bir çekiş"
			},
			{
				n: 1,
				label: "Ek",
				cue: "Üstüne bir çekiş daha"
			},
			{
				n: 6,
				label: "Ver",
				cue: "Ağızdan uzun bırak"
			}
		],
		learn: "İki kısa alış, bir uzun veriş. Gergin anda bir veya iki tur. Bunu bütün gün tempo yapma."
	}
];
function BreathSleep({ phase, onBack }) {
	const [techId, setTechId] = (0, import_react.useState)("478");
	const tech = BREATHS.find((item) => item.id === techId) ?? BREATHS[0];
	const [step, setStep] = (0, import_react.useState)(0);
	const [left, setLeft] = (0, import_react.useState)(tech.steps[0].n);
	const [on, setOn] = (0, import_react.useState)(false);
	const stepRef = (0, import_react.useRef)(0);
	const current = tech.steps[Math.min(step, tech.steps.length - 1)];
	(0, import_react.useEffect)(() => {
		if (!on) return;
		const timer = window.setInterval(() => {
			setLeft((value) => value > 1 ? value - 1 : 0);
		}, 1e3);
		return () => window.clearInterval(timer);
	}, [on, step]);
	(0, import_react.useEffect)(() => {
		if (!on || left !== 0) return;
		const next = (stepRef.current + 1) % tech.steps.length;
		stepRef.current = next;
		setStep(next);
		setLeft(tech.steps[next].n);
	}, [
		on,
		left,
		step,
		tech
	]);
	const open = current.label === "Al" || current.label === "Ek" || current.label === "Tut";
	const breathScale = !on ? 1.04 : current.label === "Ek" ? 1.16 : open ? 1.12 : 1;
	const breathSeconds = !on ? 1.4 : current.n;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Nefes ve uyku",
		phase,
		onBack,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: BREATHS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						soundEngine.playDropletSound();
						setOn(false);
						setTechId(item.id);
						setStep(0);
						stepRef.current = 0;
						setLeft(item.steps[0].n);
					},
					className: `shrink-0 rounded-full px-3 py-2 text-left cursor-pointer ${item.id === tech.id ? "bg-[#1f1a1c] text-white" : "bg-white border border-[#f3e7eb]"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs font-black",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `block text-[10px] ${item.id === tech.id ? "text-white/70" : "text-[#9a8088]"}`,
						children: item.use
					})]
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-[36px] h-[460px] shadow-[0_20px_50px_rgba(22,19,20,0.18)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/sounds/nefes.jpg",
						alt: "Pencerede gözleri kapalı, elini kaburgasında tutan kadın",
						className: "absolute inset-0 h-full w-full object-cover",
						style: {
							transform: `scale(${breathScale})`,
							transition: `transform ${breathSeconds}s ease-in-out`
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute left-[58%] top-[46%] h-28 w-28 rounded-full bg-white/30 blur-2xl",
						style: {
							opacity: !on || !open ? .2 : .55,
							transform: `translate(-50%, -50%) scale(${breathScale})`,
							transition: `opacity ${breathSeconds}s ease-in-out, transform ${breathSeconds}s ease-in-out`
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent px-5 pb-5 pt-20 text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-[0.18em] uppercase text-white/70",
								children: tech.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-4xl font-semibold tracking-tight mt-1",
								children: on ? left : current.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-white/85 mt-1",
								children: [
									current.label,
									" · ",
									current.cue
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setOn((value) => !value),
								className: "mt-4 px-5 py-2.5 rounded-full bg-white text-[#1f1a1c] text-xs font-semibold cursor-pointer",
								children: on ? "Durdur" : "Nefese başla"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-black",
					children: [tech.name, " nasıl yapılır"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-[#5a4044]",
					children: tech.learn
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-[#9a8088]",
					children: "Pratik ritmi. Tedavi değildir. Baş dönmesi olursa bırak."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-black",
				children: "Uykuya geçiş"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-[#5a4044]",
				children: "Işığı kıs. Ayaklar sıcak, oda serin. 4-7-8 ile üç tur yap, sonra 5-5 ritmine geç. Cümleler seyrekleşince saymayı bırak."
			})] })
		]
	});
}
function Journal() {
	const [text, setText] = (0, import_react.useState)(() => {
		try {
			return localStorage.getItem("flora-guide-notes") || "";
		} catch {
			return "";
		}
	});
	const [voiceUrl, setVoiceUrl] = (0, import_react.useState)(null);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const recRef = (0, import_react.useRef)(null);
	const save = (value) => {
		setText(value);
		try {
			localStorage.setItem("flora-guide-notes", value);
		} catch {}
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
			const chunks = [];
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-black",
			children: "Duygusal günlük"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value: text,
			onChange: (e) => save(e.target.value),
			placeholder: "Bugün bedende ne var?",
			className: "w-full min-h-24 rounded-xl border border-pink-200 p-3 text-xs"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: toggleRec,
			className: "px-3 py-1.5 rounded-full bg-[#1f1a1c] text-white text-[11px] font-bold cursor-pointer",
			children: recording ? "Kaydı bitir" : "Sesli not"
		}),
		voiceUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
			src: voiceUrl,
			controls: true,
			className: "w-full"
		})
	] });
}
function SkinCare({ phase, cycleDay, cycleLength, onBack }) {
	const info = SKIN[phase];
	const calmStart = 6;
	const calmEnd = Math.max(8, Math.min(14, cycleLength - 15));
	const tones = {
		regl: {
			label: "Kanama",
			bar: "bg-rose-500",
			soft: "bg-rose-50",
			ink: "text-rose-700"
		},
		folikuler: {
			label: "Foliküler",
			bar: "bg-emerald-500",
			soft: "bg-emerald-50",
			ink: "text-emerald-800"
		},
		ovulasyon: {
			label: "Doğurgan pencere",
			bar: "bg-amber-400",
			soft: "bg-amber-50",
			ink: "text-amber-800"
		},
		luteal: {
			label: "Luteal",
			bar: "bg-violet-500",
			soft: "bg-violet-50",
			ink: "text-violet-800"
		},
		pms: {
			label: "Adet öncesi",
			bar: "bg-fuchsia-500",
			soft: "bg-fuchsia-50",
			ink: "text-fuchsia-800"
		}
	};
	const tone = tones[phase];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 pb-40 pt-1 text-[#1f1a1c]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuideTop, {
				chip: "Sanctuary",
				onBack
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-16 h-16 rounded-[22px] bg-[#fde7ef] flex items-center justify-center text-[28px] shrink-0",
					children: "✨"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 pt-0.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold tracking-[0.14em] text-[#e23b78]",
							children: "FLORA BİYO-KILAVUZ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[28px] font-black leading-none mt-1",
							children: "Cilt"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[15px] font-bold mt-1",
							children: "Bakım takvimi"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[15px] leading-relaxed text-[#6d5a60]",
				children: "Kadın biyolojisinin fazlarına göre optimize edilmiş bilimsel rehberlik, pratik araçlar ve günlük hormon senkronizasyonu protokolü."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `rounded-[28px] bg-gradient-to-br ${phase === "folikuler" ? "from-emerald-100 via-white to-teal-50" : phase === "ovulasyon" ? "from-amber-100 via-white to-orange-50" : phase === "luteal" ? "from-violet-100 via-white to-fuchsia-50" : phase === "pms" ? "from-fuchsia-100 via-white to-rose-50" : "from-rose-100 via-white to-pink-50"} border border-white p-4 shadow-sm`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `px-2.5 py-1 rounded-full text-[11px] font-bold text-white ${tone.bar}`,
						children: tone.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] font-semibold text-[#805062]",
						children: [
							"Döngü ",
							cycleDay,
							". gün"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-black mt-3 leading-snug",
					children: info.state
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: [
					"regl",
					"folikuler",
					"ovulasyon",
					"luteal",
					"pms"
				].map((key) => {
					const on = key === phase;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `min-w-[148px] rounded-2xl p-3 ${on ? "bg-[#1f1a1c] text-white" : tones[key].soft}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `block h-1.5 w-8 rounded-full mb-2 ${tones[key].bar}` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[12px] font-black",
								children: tones[key].label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-[11px] mt-1 leading-snug ${on ? "text-white/75" : "text-[#5c4a50]"}`,
								children: SKIN[key].state
							})
						]
					}, key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[24px] bg-gradient-to-b from-orange-100 to-amber-50 p-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-black uppercase tracking-wide text-orange-700",
						children: "Sabah"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 space-y-1.5",
						children: info.morning.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] leading-snug font-medium",
							children: step
						}, step))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[24px] bg-gradient-to-b from-indigo-100 to-violet-50 p-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-black uppercase tracking-wide text-indigo-700",
						children: "Gece"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 space-y-1.5",
						children: info.night.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] leading-snug font-medium",
							children: step
						}, step))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[24px] bg-rose-50 p-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-black uppercase tracking-wide text-rose-700",
					children: "Bugün uzak dur"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm mt-1 leading-relaxed",
					children: info.avoid
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[24px] bg-amber-50 p-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-black uppercase tracking-wide text-amber-800",
					children: "Akne penceresi"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm mt-1 leading-relaxed",
					children: info.acne
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[24px] bg-emerald-50 p-3.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-black uppercase tracking-wide text-emerald-800",
						children: "Saç ve epilasyon"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm mt-1 leading-relaxed",
						children: info.hair
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[12px] mt-2 leading-relaxed text-[#3f4a3c]",
						children: [
							"Daha sakin aralık ",
							calmStart,
							". ve ",
							calmEnd,
							". günler. Bugün ",
							cycleDay,
							". gün.",
							cycleDay >= calmStart && cycleDay <= calmEnd ? " Bu aralıktasın." : " Kanama ve adet öncesi günlerde ertele."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1 mt-3",
						children: Array.from({ length: cycleLength }, (_, index) => {
							const day = index + 1;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2.5 w-2.5 rounded-full ${day === cycleDay ? "bg-[#e23b78] ring-2 ring-rose-200" : day >= calmStart && day <= calmEnd ? "bg-emerald-400" : "bg-white"}` }, day);
						})
					})
				]
			})
		]
	});
}
/**
* @license
* SPDX-License-Identifier: Apache-2.0
*/
var STORAGE = {
	profile: "flora-profile",
	days: "flora-days",
	supplements: "flora-supplements",
	onboarded: "flora-onboarded",
	cycles: "flora-cycles"
};
function cycleDayOn(lastPeriodDate, cycleLength, iso) {
	const start = parseLocalISO(lastPeriodDate);
	const day = parseLocalISO(iso);
	if (!start || !day || cycleLength < 1) return 1;
	const diff = Math.round((day.getTime() - start.getTime()) / 864e5);
	if (diff < 0) return 1;
	return diff % cycleLength + 1;
}
function blankDay(day, profile) {
	const date = dayKey(day);
	const cycleDay = profile.lastPeriodDate ? cycleDayOn(profile.lastPeriodDate, profile.cycleLength, date) : 1;
	const phase = profile.lastPeriodDate ? phaseForCycleDay(cycleDay, profile.periodLength, profile.cycleLength) : "folikuler";
	return {
		date,
		dayNumber: day,
		dayName: (/* @__PURE__ */ new Date(`${date}T00:00:00`)).toLocaleDateString("tr-TR", { weekday: "long" }),
		cycleDay,
		phase,
		isToday: date === toLocalISO(/* @__PURE__ */ new Date())
	};
}
function dayKey(day) {
	const now = /* @__PURE__ */ new Date();
	return toLocalISO(new Date(now.getFullYear(), now.getMonth(), day));
}
function normalizeDays(raw) {
	const out = {};
	if (!raw) return out;
	for (const [key, value] of Object.entries(raw)) if (/^\d{4}-\d{2}-\d{2}$/.test(key)) out[key] = {
		...value,
		date: key
	};
	else if (value?.date && /^\d{4}-\d{2}-\d{2}$/.test(value.date)) out[value.date] = value;
	else if (/^\d{1,2}$/.test(key)) {
		const iso = dayKey(Number(key));
		out[iso] = {
			...value,
			date: iso,
			dayNumber: Number(key)
		};
	}
	return out;
}
function inQuietHours(start, end, now) {
	const [startHour, startMin] = start.split(":").map(Number);
	const [endHour, endMin] = end.split(":").map(Number);
	if ([
		startHour,
		startMin,
		endHour,
		endMin
	].some((part) => Number.isNaN(part))) return false;
	const minutes = now.getHours() * 60 + now.getMinutes();
	const from = startHour * 60 + startMin;
	const to = endHour * 60 + endMin;
	if (from === to) return false;
	if (from < to) return minutes >= from && minutes < to;
	return minutes >= from || minutes < to;
}
function readStore(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fallback;
	} catch {
		return fallback;
	}
}
var emptyProfile = () => ({
	name: "",
	avatarUrl: "",
	cycleLength: 28,
	periodLength: 5,
	lastPeriodDate: "",
	goal: "",
	waterGoalMl: 2500,
	waterCurrentMl: 0,
	autoResetAtMidnight: true,
	quietHoursStart: "23:00",
	quietHoursEnd: "07:30",
	reminderIntervalMin: 90,
	vibrationActive: true,
	faceIdActive: false,
	anonymousMode: false,
	appleHealthConnected: false,
	ouraConnected: false
});
function App() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("bugun");
	const [menuLabel, setMenuLabel] = (0, import_react.useState)("Bugün");
	const [selectedDay, setSelectedDay] = (0, import_react.useState)(() => (/* @__PURE__ */ new Date()).getDate());
	const [showOnboarding, setShowOnboarding] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [showSymptomModal, setShowSymptomModal] = (0, import_react.useState)(false);
	const [showWaterSettingsModal, setShowWaterSettingsModal] = (0, import_react.useState)(false);
	const [showDoctorReportModal, setShowDoctorReportModal] = (0, import_react.useState)(false);
	const [toasts, setToasts] = (0, import_react.useState)([]);
	const [supplements, setSupplements] = (0, import_react.useState)([]);
	const handleToggleSupplement = (id) => {
		setSupplements((prev) => prev.map((s) => s.id === id ? {
			...s,
			taken: !s.taken
		} : s));
	};
	const handleAddSupplement = (item) => {
		setSupplements((prev) => [...prev, item]);
	};
	const handleDeleteSupplement = (id) => {
		setSupplements((prev) => prev.filter((s) => s.id !== id));
	};
	const [profile, setProfile] = (0, import_react.useState)(emptyProfile);
	const [dayDataMap, setDayDataMap] = (0, import_react.useState)({});
	const [cycles, setCycles] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const saved = readStore(STORAGE.profile, null);
		if (saved) setProfile((prev) => ({
			...prev,
			...saved
		}));
		setDayDataMap(normalizeDays(readStore(STORAGE.days, null)));
		setSupplements(readStore(STORAGE.supplements, []));
		setCycles(readStore(STORAGE.cycles, []));
		try {
			setShowOnboarding(localStorage.getItem(STORAGE.onboarded) !== "1");
		} catch {
			setShowOnboarding(true);
		}
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		try {
			localStorage.setItem(STORAGE.profile, JSON.stringify(profile));
			localStorage.setItem(STORAGE.days, JSON.stringify(dayDataMap));
			localStorage.setItem(STORAGE.supplements, JSON.stringify(supplements));
			localStorage.setItem(STORAGE.cycles, JSON.stringify(cycles));
		} catch {}
	}, [
		profile,
		dayDataMap,
		supplements,
		cycles,
		ready
	]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		const today = toLocalISO(/* @__PURE__ */ new Date());
		if (profile.waterDate === today) return;
		const firstSeen = !profile.waterDate;
		setProfile((prev) => ({
			...prev,
			waterDate: today,
			waterCurrentMl: !firstSeen && prev.autoResetAtMidnight ? 0 : prev.waterCurrentMl
		}));
		if (!firstSeen) setSupplements((prev) => prev.map((item) => ({
			...item,
			taken: false
		})));
	}, [
		ready,
		profile.waterDate,
		profile.autoResetAtMidnight
	]);
	(0, import_react.useEffect)(() => {
		if (!ready || !profile.lastPeriodDate) return;
		setCycles((prev) => {
			const existing = prev.find((item) => item.start === profile.lastPeriodDate);
			if (existing && existing.cycleLength === profile.cycleLength && existing.periodLength === profile.periodLength) return prev;
			return [...prev.filter((item) => item.start !== profile.lastPeriodDate), {
				start: profile.lastPeriodDate,
				cycleLength: profile.cycleLength,
				periodLength: profile.periodLength
			}].sort((a, b) => a.start.localeCompare(b.start));
		});
	}, [
		ready,
		profile.lastPeriodDate,
		profile.cycleLength,
		profile.periodLength
	]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		const run = () => {
			syncReminders(supplements);
		};
		run();
		window.addEventListener("floria-notify", run);
		return () => window.removeEventListener("floria-notify", run);
	}, [ready, supplements]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		const pending = supplements.filter((item) => item.reminderEnabled && !item.taken);
		if (!pending.length) return;
		if (inQuietHours(profile.quietHoursStart, profile.quietHoursEnd, /* @__PURE__ */ new Date())) return;
		const today = toLocalISO(/* @__PURE__ */ new Date());
		try {
			if (sessionStorage.getItem("flora-supp-ping") === today) return;
			sessionStorage.setItem("flora-supp-ping", today);
		} catch {
			return;
		}
		showToast("Küçük bir hatırlatma", `İstersen işaretle: ${pending.map((item) => item.name).join(", ")}.`, "info");
	}, [
		ready,
		supplements,
		profile.quietHoursStart,
		profile.quietHoursEnd
	]);
	const showToast = (title, message, type = "info") => {
		const id = Date.now().toString() + Math.random().toString();
		const newToast = {
			id,
			title,
			message,
			type
		};
		setToasts((prev) => [...prev, newToast]);
		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, 3200);
	};
	const handleAddWater = (amount) => {
		setProfile((prev) => ({
			...prev,
			waterCurrentMl: Math.min(prev.waterCurrentMl + amount, 4500)
		}));
	};
	const handleResetWater = () => {
		setProfile((prev) => ({
			...prev,
			waterCurrentMl: 0
		}));
	};
	const handleResetData = () => {
		setProfile(emptyProfile());
		setDayDataMap({});
		setSupplements([]);
		setSelectedDay((/* @__PURE__ */ new Date()).getDate());
		setMenuLabel("Bugün");
		setActiveTab("bugun");
		setShowOnboarding(true);
		setShowSymptomModal(false);
		setShowWaterSettingsModal(false);
		setShowDoctorReportModal(false);
		try {
			for (const key of Object.keys(localStorage)) if ((key.startsWith("flora-guide-") || key.startsWith("flora-")) && key !== "flora-store-receipt") localStorage.removeItem(key);
		} catch {}
		showToast("Temiz bir sayfa", "Kayıtlar gitti. Yeniden başlamak da olur.", "info");
	};
	const handleUpdateProfile = (updated) => {
		setProfile((prev) => ({
			...prev,
			...updated
		}));
	};
	const handleSaveSymptoms = (updated) => {
		const key = dayKey(selectedDay);
		setDayDataMap((prev) => ({
			...prev,
			[key]: {
				...prev[key] || blankDay(selectedDay, profile),
				...updated,
				date: key
			}
		}));
		showToast("Günün yazıldı", "Bu güne nazikçe kaydettim. Yarın da buradayız.", "success");
	};
	const handleCompleteOnboarding = (data) => {
		setProfile((prev) => ({
			...prev,
			goal: data.goal,
			cycleLength: data.cycleLength,
			periodLength: data.periodLength,
			lastPeriodDate: data.lastPeriodDate,
			intensity: data.intensity,
			contraception: data.contraception,
			habits: data.habits,
			partnerMode: false,
			partnerName: data.partnerName,
			partnerCode: data.partnerMode ? prev.partnerCode || String(Math.floor(1e5 + Math.random() * 9e5)) : prev.partnerCode,
			partnerShare: prev.partnerShare || defaultPartnerShare()
		}));
		try {
			localStorage.setItem(STORAGE.onboarded, "1");
		} catch {}
		showToast("Hoş geldin", `${data.cycleLength} günlük ritmin bu cihazda. Kendine iyi bak.`, "success");
	};
	(0, import_react.useEffect)(() => {}, [
		ready,
		profile.partnerMode,
		profile.partnerCode
	]);
	(0, import_react.useEffect)(() => {
		if (activeTab === "partner") setActiveTab("bugun");
	}, [profile.partnerMode, activeTab]);
	const openTab = (tab) => {
		const labels = {
			bugun: "Bugün",
			dongu: "Döngü",
			rehber: "Rehber",
			raporlar: "Raporlar",
			profil: "Profil",
			partner: "Partner"
		};
		setActiveTab(tab);
		setMenuLabel(labels[tab]);
	};
	const today = /* @__PURE__ */ new Date();
	const todayNumber = today.getDate();
	const cycleDay = profile.lastPeriodDate ? cycleDayFromLastPeriod(profile.lastPeriodDate, profile.cycleLength) : 1;
	const phase = profile.lastPeriodDate ? phaseForCycleDay(cycleDay, profile.periodLength, profile.cycleLength) : "folikuler";
	const phaseLabel = {
		regl: "Kanama",
		folikuler: "Foliküler faz",
		ovulasyon: "Doğurgan pencere",
		luteal: "Luteal faz",
		pms: "Adet öncesi"
	}[phase];
	const loggedToday = dayDataMap[toLocalISO(today)];
	const currentDayInfo = {
		date: toLocalISO(today),
		dayNumber: todayNumber,
		dayName: today.toLocaleDateString("tr-TR", { weekday: "long" }),
		cycleDay,
		phase,
		isToday: true,
		mood: loggedToday?.mood,
		symptoms: loggedToday?.symptoms,
		flow: loggedToday?.flow,
		libido: loggedToday?.libido
	};
	const handlePeriodStarted = () => {
		const today = toLocalISO(/* @__PURE__ */ new Date());
		if (profile.lastPeriodDate === today) return;
		const day = (/* @__PURE__ */ new Date()).getDate();
		handleUpdateProfile({ lastPeriodDate: today });
		setDayDataMap((prev) => {
			const key = dayKey(day);
			const existing = prev[key] || blankDay(day, {
				...profile,
				lastPeriodDate: today
			});
			return {
				...prev,
				[key]: {
					...existing,
					date: key,
					flow: existing.flow && existing.flow !== "Yok" ? existing.flow : "Hafif"
				}
			};
		});
		showToast("Yeni döngü", "Bugün 1. gün. Sayaç buradan başladı.", "success");
	};
	const handleUpdateMood = (newMood) => {
		setDayDataMap((prev) => {
			const key = dayKey(selectedDay);
			const existing = prev[key] || blankDay(selectedDay, profile);
			return {
				...prev,
				[key]: {
					...existing,
					mood: newMood
				}
			};
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#fff8f8] text-[#1f1a1c] relative selection:bg-pink-200",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 topographic-pattern pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 max-w-md mx-auto min-h-screen flex flex-col px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
						currentCycleDay: currentDayInfo.cycleDay,
						currentPhaseName: profile.lastPeriodDate ? phaseLabel : "Kurulum bekleniyor",
						menuLabel,
						activeTab,
						setActiveTab: openTab,
						waterRemaining: Math.max(0, profile.waterGoalMl - profile.waterCurrentMl),
						premium: isPremiumActive()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "flex-1",
						children: [
							activeTab === "bugun" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayTab, {
								currentDayInfo,
								waterCurrentMl: profile.waterCurrentMl,
								waterGoalMl: profile.waterGoalMl,
								onAddWater: handleAddWater,
								onResetWater: handleResetWater,
								autoResetAtMidnight: profile.autoResetAtMidnight,
								onOpenWaterSettings: () => setShowWaterSettingsModal(true),
								onOpenSymptomModal: () => {
									setShowSymptomModal(true);
								},
								onSelectDay: (day) => {
									setSelectedDay(day);
									openTab("dongu");
								},
								showToast,
								cycleLength: profile.cycleLength,
								onUpdateMood: handleUpdateMood,
								supplements,
								onToggleSupplement: handleToggleSupplement,
								userName: profile.name,
								lastPeriodDate: profile.lastPeriodDate,
								onPeriodStarted: handlePeriodStarted
							}),
							activeTab === "dongu" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CycleTab, {
								selectedDay,
								onSelectDay: (day) => setSelectedDay(day),
								onOpenSymptomModal: () => setShowSymptomModal(true),
								dayDataMap,
								cycleLength: profile.cycleLength,
								periodLength: profile.periodLength,
								lastPeriodDate: profile.lastPeriodDate
							}),
							activeTab === "rehber" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RehberTab, {
								phase,
								cycleDay,
								cycleLength: profile.cycleLength,
								periodLength: profile.periodLength,
								lastPeriodDate: profile.lastPeriodDate,
								onTitle: setMenuLabel,
								signals: {
									waterCurrentMl: profile.waterCurrentMl,
									waterGoalMl: profile.waterGoalMl,
									mood: loggedToday?.mood,
									symptoms: loggedToday?.symptoms ?? [],
									supplementsTaken: supplements.filter((item) => item.taken).length,
									supplementsTotal: supplements.length
								},
								premium: isPremiumActive()
							}),
							activeTab === "raporlar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportsTab, {
								onOpenDoctorReport: () => setShowDoctorReportModal(true),
								cycleLength: profile.cycleLength,
								periodLength: profile.periodLength,
								lastPeriodDate: profile.lastPeriodDate,
								goal: profile.goal,
								loggedDays: Object.values(dayDataMap),
								cycles,
								premium: isPremiumActive()
							}),
							false,
							activeTab === "profil" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileTab, {
								profile,
								onUpdateProfile: handleUpdateProfile,
								showToast,
								supplements,
								onAddSupplement: handleAddSupplement,
								onDeleteSupplement: handleDeleteSupplement,
								onResetData: handleResetData
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, {
						activeTab,
						setActiveTab: openTab,
						premium: isPremiumActive(),
						partnerMode: false
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnboardingModal, {
				isOpen: showOnboarding,
				onClose: () => setShowOnboarding(false),
				onComplete: handleCompleteOnboarding,
				initialStep: 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SymptomModal, {
				isOpen: showSymptomModal,
				onClose: () => setShowSymptomModal(false),
				dayInfo: dayDataMap[dayKey(selectedDay)] || blankDay(selectedDay, profile),
				onSave: handleSaveSymptoms
			}, dayKey(selectedDay)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterSettingsModal, {
				isOpen: showWaterSettingsModal,
				onClose: () => setShowWaterSettingsModal(false),
				autoResetAtMidnight: profile.autoResetAtMidnight,
				onToggleAutoReset: (val) => {
					handleUpdateProfile({ autoResetAtMidnight: val });
					showToast("00:00 Otomatik Sıfırlama", val ? "Gece sıfırlama aktif edildi." : "Gece sıfırlama devre dışı bırakıldı.", "water");
				},
				waterGoalMl: profile.waterGoalMl
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoctorReportModal, {
				isOpen: showDoctorReportModal,
				onClose: () => setShowDoctorReportModal(false),
				userName: profile.name,
				goal: profile.goal,
				cycleLength: profile.cycleLength,
				periodLength: profile.periodLength,
				lastPeriodDate: profile.lastPeriodDate,
				cycleDay,
				symptomLines: Object.values(dayDataMap).flatMap((day) => day.symptoms || [])
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed top-20 left-0 right-0 z-50 flex flex-col items-center pointer-events-none px-4 space-y-2",
				children: toasts.map((toast) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto max-w-sm w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-pink-100 p-3.5 flex items-start gap-3 animate-in fade-in slide-in-from-top-3 duration-200",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${toast.type === "water" ? "bg-blue-100 text-blue-600" : toast.type === "success" ? "bg-emerald-100 text-emerald-600" : "bg-pink-100 text-[#d81b60]"}`,
						children: toast.type === "water" ? "💧" : toast.type === "success" ? "✓" : "🌸"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-[#1f1a1c]",
							children: toast.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-[#5a4044] mt-0.5 leading-snug",
							children: toast.message
						})]
					})]
				}, toast.id))
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {});
}
//#endregion
export { Home as component, routes_BNbxJJYA_exports as t };
