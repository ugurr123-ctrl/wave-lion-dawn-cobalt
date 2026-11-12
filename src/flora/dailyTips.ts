const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

const TEAS = [
  'Akşam yorulduysan kendine bir fincan ıhlamur koy. Şekersiz, yavaş yavaş iç. İkinci fincan şart değil. Bu, günü kendine karşı yumuşak kapatmanın hali.',
  'Öğleden sonra içinin ısınması için kısa bir zencefil. İnce bir dilim, beş dakika. Miden hassassa biraz daha su kat. Kahveyi bırakman gerekmiyor.',
  'Uykudan önce bir fincan papatya. Telefonu kenara bırakıp çayın bitmesini beklemek de sana iyi gelir. Acele etme.',
  'Yemekten sonra bir fincan nane. Sıcak olsun. Öğün ağır geldiyse bu küçük mola, kendine verdiğin bir nefes arası.',
  'Sabah bir lokmadan sonra ılık kuşburnu. Ekşi ve sıcak, içini uyandırır. Başka bir vaadi yok, sadece sana eşlik eder.',
  'Şişkin hissediyorsan rezene iyi bir arkadaş. Bir tatlı kaşığı tohum, on dakika. Gazlı içeceği bugün kenara bırakmak istersen bırak, zorunda değilsin.',
  'Öğleden sonra bir fincan adaçayı, sakince. Geceye saklamana gerek yok. Hamileysen bu çayı geç, başka bir bitki de seni aynı sıcaklıkla karşılar.',
  'İçin gerginse melisa. Loş odada bir fincan. Öfkeyi silmeye çalışmaz. Sadece oturup “şimdi buradayım” demen için yanındadır.',
  'Tatlı canın çektiğinde elma kabuğu çayı. Beş dakika, istersen bir çubuk tarçın. Tatlıyı kendinden esirgeme. Bu sadece ilk isteği yumuşatır.',
  'Kahveden önce bir bardak tarçınlı ılık su. Kahven senin, onu bırakmak zorunda değilsin. İlk fincanı biraz ertelemek de şefkat sayılır.',
  'Sabah bir fincan yeşil çay, nazikçe. İkincisini bugün istemezsen sorun değil. Aç karnına yakıyorsa yemekten sonraya bırak, bedenin sana söylesin.',
  'Ekranı kapatınca ılık süt ya da sevdiğin bir bitki çayı. Işıklar kısık. Bu bir görev değil, kendine söylediğin küçük bir iyi geceler.',
  'Bir fincan ıhlamur, yanında küçük bir lokma. Çay yalnız kalmasın, sen de yalnız kalma onunla.',
  'Bugün papatya. İkinci fincan şart değil. Birincisi zaten “yavaşla” diyor.',
  'Kuşburnu ekşi ve sıcak. Bir dilim elmayla içersen gün daha tatlı durur.',
  'Nane ve limon, öğleden sonra. Miden yorgansa şekeri boş ver, sıcaklık yeter.',
  'Rezene çayı şişkin bir güne küçük bir omuz. On dakika, sonra bardağı bırak.',
  'Adaçayı bir yudum. Geceye saklama. Hamileysen bunu geç, ılık su da seni tutar.',
  'Melisa, loş odada. Öfkeyi silmez. Sadece yanına oturur.',
  'Tarçınlı ılık süt, tatlı krizine yumuşak bir cevap. Yasak yok, sadece önce bu.',
  'Yeşil çay nazik olsun. Aç karnına yakıyorsa yemekten sonraya bırak, sorun değil.',
  'Zencefil ince bir dilim. Çok geldiyse su kat. İçin ısınsın, zorlanmasın.',
  'Sevdiğin bitki, sevdiğin fincan. Marka önemli değil. Sıcaklık önemli.',
];

const FOODS = [
  'Öğle tabağın sıcak olsun: mercimek, ıspanak ve bir dilim ekmek. Sosu canın istediği kadar. Akşam aynı şeyi istemezsen bir kâse çorba da seni doyurur.',
  'Kahvaltıda yoğurt, yulaf ve birkaç ceviz. Balı tadımlık, bir tatlı kaşığı. On dakikanı kendine ayır, ayakta geçiştirme.',
  'Yumurta, domates ve biraz peynir. Bildiğin, seni yormayan bir tabak. Yeni bir liste açmana gerek yok, bugün bildiğin yeter.',
  'Nohut, maydanoz ve limon. Kızartmayı bugün kenara bırakmak istersen bırak. Şişkinlik olursa porsiyonu küçült, tabağı bitirmek zorunda değilsin.',
  'Fırın kabak ve sade yoğurt. Akşam için yumuşak bir tabak. Tuzu sonra, damak tadına göre ekle. Üstüne tatlı sırası açmak zorunda değilsin.',
  'Varsa ızgara balık, yoksa fasulye. Yanına limon ve yeşillik. Kızartma ile mayonezi aynı anda istemezsen birini seç, ikisi de kalsın.',
  'Akşam erken bir çorba, mercimek ya da sebze. Bir dilim ekmek. Sonra acıkırsan bir meyve yeter. İkinci tabağa borçlu değilsin.',
  'Ara öğünde mevsim meyvesi ve bir kaşık tahin. Ekmeğe sürmek de olur. Cipsi özlemen ayıp değil. Bu sadece yanında duran daha yumuşak bir seçenek.',
  'Bulgur ya da kinoa, bol yeşillik. Sos yoğurt ya da limon. Öğle seni tutsun, akşam kendini hafif hissetmen için yer kalsın.',
  'Haşlanmış patates, az tuz, yanında yoğurt ya da cacık. Geç olduysa küçük bir kâse yeter. Kızartma bugün şart değil.',
  'Peynir, salatalık, domates ve bir dilim ekmek. Otur, yavaş ye. Meyve suyu olmasa da su yanında güzel durur.',
  'Sebze yemeği ve küçük bir kepçe pilav. İkinci kepçe yarına kalabilir. Ekmek istersen pilavı biraz azalt, ikisini birden de sevebilirsin.',
  'Bir kâse yoğurt, içine meyve. Kaşık yavaş gitsin. Bu öğün de seni sever.',
  'Omlet ve yeşillik. Az yağ, bol renk. Ayakta yeme, bir sandalyeye otur.',
  'Mercimek çorbası ve limon. Ekmek istersen bandır, bandırmasan da doyarsın.',
  'Izgara tavuk ya da nohut, yanında salata. Sosu sen koy, tabak seni zorlamasın.',
  'Akşam kahvaltısı da olur: peynir, domates, zeytin. Kurallı olmak zorunda değilsin.',
  'Fırın elma, biraz tarçın. Tatlı niyetine, küçük bir kâse. Kendini esirgeme.',
  'Pirinç lapası ya da çorba, mide yorgunken. Tuz az, sıcaklık çok.',
  'Bir avuç ceviz ve meyve, ara öğün. Açık kalmak zorunda değilsin.',
  'Sebzeli yumurta. Akşam da kahvaltı da yakışır. İkisinden birini seç, ikisi de güzel.',
];

const LINES = [
  'Bugün biraz yavaşlamak sana iyi gelir. Liste kısalabilir, iş yarına kalabilir. Bitmeyen şey seni eksik yapmaz.',
  'Öğle yemeğini kendinden esirgeme. Aç kalıp akşama yüklenmek bedenini yorar. Masada on dakika oturmak, kendine verdiğin küçük bir söz.',
  'Akşam yemeğini erken ve sakin kapat. Mutfak toplanınca ikinci tura gerek kalmaz. Tatlı istersen bir meyve de seni karşılar.',
  'Su bardağını gözünün önünde tut. Hatırlatmak için kendine yük olma. Çay ve kahve dursun, su da yanında dursun.',
  'On beş dakikalık yumuşak bir yürüyüş yeter. Rekor senin borcun değil. Ağrı olursa dön. Bunu yazmak zorunda da değilsin.',
  'Tatlı gelecekse önce yoğurt, yumurta ya da peynir ye. Hâlâ istiyorsan küçük bir porsiyon al. Kendine yasak koyma.',
  'Yatmadan bir saat önce ekranı bırakırsan oda sana daha yumuşak gelir. Uyku gelmezse kalk, biraz dolaş. Telefonu yatağa alma, kendine yer bırak.',
  'Omuzlarını indir, çeneni gevşet, nefesi biraz uzat. Su içerken de hatırla. Düzeltmek için değil, bedenine “buradayım” demek için.',
  'Bugün yeni bir diyet açma. Bildiğin yemeği ye. Liste ve yasak bugün seni daha da yorar. Bildiğin yeter.',
  'Alışık olduğun yemek, alışık olduğun yürüyüş. Misafirlikte bir tabak da olur. Üç çeşit tatmak zorunda değilsin.',
  'Güne bir bardak suyla başla. Kahve hemen ardından da gelebilir. Küçük bir kahvaltı içini ısıtır. Aç kahve mideni yalnız bırakmasın.',
  'Akşam planın sade kalsın. Yeni bir buluşma eklemek zorunda değilsin. Çantanı bu akşam hazırlarsan sabah kendine daha yumuşak gelir.',
  'Bugün kendine iyi gelen şey küçük olabilir. Bir bardak, bir nefes, bir erken yatış.',
  'Acele eden bir günse, sen acele etmek zorunda değilsin. Bir iş yarına kalsın.',
  'Bedenin yavaş diyorsa inan. Liste kısalabilir, sen eksilmezsin.',
  'Tatlı söz bugün kendine de gelsin. “İyi gidiyorsun” demen yeter.',
  'Bir şeyi bitiremediysen gün boşa gitmedi. Kalkmış olman da sayılır.',
  'Kalabalıksa ara ver. Sessiz bir oda, beş dakika, yeniden sen.',
  'Akşam üstü omuzların düşsün. Dünyayı bu gece düzeltmen gerekmiyor.',
  'Yarın da var. Bugün nazik kalsın, bu kadar.',
  'Küçük bir gülümseme de bakım sayılır. Aynaya bakınca acele etme.',
];

const MOVES = [
  'On dakika düz yürüyüş. Konuşabilecek kadar yavaş. Merdiven varsa tutun. Bitince omuzlarını bırak, başka bir şey yapmana gerek yok.',
  'Oturup omuzlarını çevir. Öne beş, geriye beş, usulca. Boynunu zorlama. Çay demlenirken, kendinle kalabileceğin küçük bir an.',
  'Sırt üstü kısa bir kalça köprüsü. Topuklar yerde, on iki tekrar yeter. Belin söylerse dur. Nefesi tutma, bırak akıp gitsin.',
  'Eller ve dizler yerde, kedi-inek. Sekiz yavaş nefes. Hareket küçük kalsın. Başın dönerse otur, bu da hareketin parçası.',
  'Sırtını duvara ver. Dört sayı al, altı sayı ver. Beş tur. Bu antrenman değil. Ayakta kendine verdiğin bir nefes molası.',
  'Sandalyede gövdeni yavaşça sağa, sonra sola çevir. Her yanda üç nefes. Dizler yerinde. Zor gelirse küçült, zorlamak yok.',
  'Ayakta baldırını esnet, duvara tutun. Her bacakta yirmi saniye. Zıplama yok. Topuk yerde, nefesin yanında.',
  'Yerinde yumuşak adım, iki dakika. Dizleri yükseğe kaldırmak şart değil. Nefes kesilirse dur. Sessizlik de olur, müzik de.',
  'Çocuk pozu. Dizler yerde, alın yere ya da yumruğunun üstüne, bir dakika. Belin hassassa dizlerinin arasına bir yastık koy. Kendine yer aç.',
  'Boynunu yana bırak, kulak omuza yaklaşsın, değmek zorunda değil. Her yanda üç nefes. Elle çekme. Ağrı olursa nazikçe geri gel.',
  'Ayakta yana eğil. Bir kol başının üstünde, diğeri kalçada. Her yanda üç nefes. Acele yok. Belden kırmana gerek yok.',
  'Sırt üstü bir dizi göğsüne çek, diğer bacak uzun. Her yanda yirmi saniye. Belin kalkıyorsa dizi biraz daha az çek. Zorlama.',
  'Pencereden dışarı bakarak üç derin nefes. Bu da hareket. Kimse saymak zorunda değil.',
  'Otururken ayak bileğini çevir, yavaşça. Her yöne beş. Masadan kalkmadan da olur.',
  'İki dakika yerinde sallan. Müzik varsa fısıltı gibi. Yoksa sessizlik de dans sayılır.',
  'Ellerini ovuştur, avuçlarını yanaklarına koy. Sıcaklık küçük bir merhaba.',
  'Merdiveni yavaş in. Tutun. Acele inmek bugünün görevi değil.',
  'Yastığa yaslan, dizlerini yana bırak. Bir dakika. Buna esneme demen yeter.',
  'Omuzlarını kulaklarına çek, sonra bırak. Üç kez. Yük orada kalmasın.',
  'Mutfakta bir şarkı, yavaş adım. İki dakika. Terlemek şart değil.',
  'Akşam ışığında gerin. Kollar yukarı, nefes dışarı. Gün burada kapansın.',
];

const FOCUSES = [
  'Bugün kendine sıcak bir tabak ve az tuz yeter. Sos yanında dursun, isteyince eklersin. Tuz da sonra, sen karar ver.',
  'Tabağının yarısı yeşillik olursa bedenin rahatlar. Ağır sos ile kızartmayı aynı anda istemezsen birini bırak. Ekmek istersen bir dilim senin.',
  'Su ve gölge bugün sana iyi gelir. Güneşli yürüyüş yarına kalabilir. Bardağın dolu dursun. Kahveyi öğleden sonraya alırsan su daha kolay içilir.',
  'Erken yatmak bugün bir lütuf. Yarınki iş bu gece bitmek zorunda değil. Işığı kıs, ekranı başka odaya bırak. Saati biraz öne çekmen yeter.',
  'Öğle seni tutsun: yumurta, yoğurt, mercimek ya da peynir. Öğleni atlamak zorunda değilsin. Akşam tatlısı da küçük kalabilir, yasak değil.',
  'Akşam hafif ve sıcak olsun. Çorba ya da sebze, küçük bir pilav. İkinci çeşit pişirmek senin borcun değil.',
  'Kısa bir hareket, uzun bir nefes. On dakika yeter. Nefesin kesilen yere çıkma. Bitince omuzlarını ve çeneni yokla, orada mısın diye.',
  'Bildik düzen bugün yeterli. Yeni ders, yeni diyet, yeni uygulama yok. Dünkü yürüyüş ve dünkü tabak yine seni karşılar.',
  'Tatlıyı küçültebilirsin, kendinden esirgeme. İstersen yarım porsiyon, yanında yoğurt ya da meyve. Paketi kaldırmak da olur, sofrada bırakmak da.',
  'Bugün bir kâse çorba ve bir dilim ekmek yeter. Yanına ağır bir şey eklemek zorunda değilsin. Sıcaklık alsın seni.',
  'Sabahı yavaş aç. Önce su, sonra bir lokma, kahve onların ardından. Haber ve mesaj ilk on dakikanı senden almasın.',
  'Akşam sakin kalsın. Yeni plan ekleme. Evi bitirmek için uykunu erteleme. Bulaşık yarına kalabilir. Işık ve ses biraz azalsın, sen de azalsın.',
  'Bugün tuz az, sıcak çok olsun. Çorba seni tutar.',
  'Su bardağını sevdiğin yere koy. Gözün değince hatırlarsın, kendine yük olmadan.',
  'Akşam ışığını kıs. Yarınki iş bu lambanın altında bitmek zorunda değil.',
  'Bir meyve, bir lokma peynir. Ara öğün de şefkat olabilir.',
  'Yürüyüş kısa, nefes uzun. İkisini karıştırma, ikisi de senin.',
  'Bugün yeni kural yok. Dünkü iyi gelen şey yine gelsin.',
  'Tatlıyı paylaş ya da küçült. Kendinden tamamen alma.',
  'Erken bir duş, gevşek bir pijama. Gün burada yumuşasın.',
  'Masada telefon ters dursun. Yemek sadece yemek olsun, bir süre.',
];

const SEASONS: { lead: string; a: string; b: string }[][] = [
  [
    { lead: 'Ocak’ta yeni bir liste açma. Bildiğin sabah yeter.', a: 'Kahvaltıyı sıcak tut. Çorba da, yumurta da olur.', b: 'Akşam yürüyüşü kısa olsun. Evde on dakika da sayılır.' },
    { lead: 'Ocak soğuğu acele sevmez.', a: 'Bir kat fazla al, içeride terleyince çıkar.', b: 'Akşam çayın yanında bir lokma bulundur.' },
    { lead: 'Yılın ilk ayı yavaş açılabilir.', a: 'Haberi kahveden sonraya bırak.', b: 'Erken yatmak da bir başlangıçtır.' },
    { lead: 'Ocakta kendine borç yazma.', a: 'Bildiğin yemeği ye, yeni diyet yok.', b: 'Işığı kıs, gün orada kapansın.' },
  ],
  [
    { lead: 'Şubat griyse ışığı kendin aç.', a: 'Pencere kenarında on dakika otur.', b: 'Akşamı çorbayla kapat.' },
    { lead: 'Kısa günler suçun değil.', a: 'Öğleden sonra bir fincan sıcak bir şey.', b: 'İş bitmese de yatabilirsin.' },
    { lead: 'Şubat yavaş bir ay olabilir.', a: 'Yürüyüşü içeride de yapabilirsin.', b: 'Tatlıyı küçült, kendinden alma.' },
    { lead: 'Gri havada nazik kal.', a: 'Sevdiğin kazağı giy, gerekçesi olmasın.', b: 'Akşam telefonu başka odaya bırak.' },
  ],
  [
    { lead: 'Mart rüzgârlı. İnce bir kat yanında olsun.', a: 'Hırkanı çıkarma, rüzgâr çabuk keser.', b: 'Öğle tabağın sade kalsın.' },
    { lead: 'Mart bir açılır bir kapanır.', a: 'Islanırsan kuru çorap bulundur.', b: 'Akşam yürüyüşünü pencereye göre seç.' },
    { lead: 'İlkbahar acele etmesin.', a: 'Yeşillik varsa ekle, yoksa bildiğin yemek.', b: 'Erken kararan akşama kızma.' },
    { lead: 'Martta omuzların düşsün.', a: 'Çayın sıcak olsun, planın kısa.', b: 'Yarın da rüzgâr eser, bugün bitirmek zorunda değilsin.' },
  ],
  [
    { lead: 'Nisan yağmuru planı bozabilir.', a: 'Islak havada uzun yürüyüş şart değil.', b: 'Çayın yanında bir dilim ekmek.' },
    { lead: 'Yağmur da bir mola sayılır.', a: 'Pencereden bak, üç nefes yeter.', b: 'Akşam çorbası evi ısıtır.' },
    { lead: 'Nisan tatlı ama ıslak.', a: 'Ayakkabın kurusun, sen acele etme.', b: 'Bir meyve, günü tatlandırır.' },
    { lead: 'Bozulan plan seni borçlu etmez.', a: 'İçeride esne, dışarıyı yarına bırak.', b: 'Işığı erken kıs.' },
  ],
  [
    { lead: 'Mayıs akşamı uzuyor.', a: 'Yemekten önce on dakika dışarı çık.', b: 'Tabağa bir renk ekle, kural ekleme.' },
    { lead: 'Mayıs yeşil ve yavaş olsun.', a: 'Çilek ya da yoğurt, küçük bir kâse.', b: 'Akşamı yeni bir davete doldurma.' },
    { lead: 'Gün ışığı sana kalsın.', a: 'Öğle yürüyüşü gölgede de olur.', b: 'Su bardağı masada dursun.' },
    { lead: 'Mayısta acele etme.', a: 'Akşam yemeğini karanlık bastırmadan ye.', b: 'Sonra ışığı kıs, gün bitti.' },
  ],
  [
    { lead: 'Haziran sıcak. Su gölgede dursun.', a: 'Öğle yürüyüşünü ertele.', b: 'Ayran ya da cacık yanında olsun.' },
    { lead: 'Sıcak bir gün, yumuşak bir tempo.', a: 'Serin bir duş akşamı toplar.', b: 'Öğünü ağır sosla doldurma.' },
    { lead: 'Haziranda gölge de bakım.', a: 'Meyve öğünün yanına gelsin, yerine değil.', b: 'Akşam erken, oda serin.' },
    { lead: 'Güneş nazik değilse sen nazik ol.', a: 'Şapka ya da gölge, ikisi de olur.', b: 'Bir bardak su, hatırlatmadan önce.' },
  ],
  [
    { lead: 'Temmuz öğlesi yakar.', a: 'Antrenmanı akşama bırak.', b: 'Meyve yanında dursun, akşam küçük bir tabak.' },
    { lead: 'Sıcakta kahramanlık yok.', a: 'Öğle uykusu kısa olsun, geceyi çalmasın.', b: 'Soğuk bir şey, yudum yudum.' },
    { lead: 'Temmuzda gölge yeter.', a: 'Yürüyüşü gün batımına kaydır.', b: 'Tuzlu ayran da su sayılır, bir bardak.' },
    { lead: 'Bugün serin kalmak da iş.', a: 'İnce kıyafet, bol su.', b: 'Akşam balkonu ya da pencere, beş dakika.' },
  ],
  [
    { lead: 'Ağustos dağınık geçebilir.', a: 'Misafirlikte bir tabak seç.', b: 'Akşamı biraz öne çek.' },
    { lead: 'Tatil bitse de tempo yumuşak kalsın.', a: 'Bildiğin kahvaltıya dön.', b: 'Erken yat, telafiyi yarına bırakma.' },
    { lead: 'Ağustosta sadeleş.', a: 'Üç çeşit yerine birini sev.', b: 'Su ve meyve, günün omurgası.' },
    { lead: 'Dağınık gün de gün sayılır.', a: 'Listeyi kısalt.', b: 'Akşam ışığı az, ses az.' },
  ],
  [
    { lead: 'Eylül tempo artar. Akşam yemeğini işe bırakma.', a: 'Çantana su ve bir ara öğün koy.', b: 'Eve gelince önce su, sonra mutfak.' },
    { lead: 'Okul ya da iş, sen yine yumuşak kal.', a: 'Öğleni toplantıya yedirme.', b: 'Akşam yürüyüşü on dakika yeter.' },
    { lead: 'Eylül düzeni nazik olsun.', a: 'Sabah bir lokma, sonra kapı.', b: 'Geceyi yarına devretme.' },
    { lead: 'Yeni tempo, eski şefkat.', a: 'Bildik yemeğe dön.', b: 'Telefonu masadan indir, bir öğün.' },
  ],
  [
    { lead: 'Ekim serin. Ağır program açma.', a: 'Çorba ve bir dilim ekmek yeter.', b: 'Bir kat fazla al, terleyince çıkar.' },
    { lead: 'İlk soğukta acele etme.', a: 'Akşam lambası erken yansın.', b: 'Yürüyüş kısa, atkı uzun.' },
    { lead: 'Ekim yaprak gibi yavaşlasın.', a: 'Sıcak bir içecek, öğleden sonra.', b: 'Erken yatmak bu ay yakışır.' },
    { lead: 'Hava değişince beden de değişir.', a: 'Çorap ve çorba, küçük bir düzen.', b: 'Yeni spor listesi yarına kalsın.' },
  ],
  [
    { lead: 'Kasım erken kararıyor. Akşam ışığını ekrana bırakma.', a: 'Masaya küçük bir lamba koy. Yemeği o ışıkta ye.', b: 'Sıcak çorba ve kalın çorap. Yeni spor listesi yok.' },
    { lead: 'Kasım yağmuru bir mola.', a: 'Islaksa içeride esne. Dışarı borç değil.', b: 'Bir fincan papatya, günü kapatır.' },
    { lead: 'Kısa gün, uzun nefes.', a: 'Öğleden sonra ışığı aç, kendine görün.', b: 'Akşam ikinci plan ekleme.' },
    { lead: 'Kasımda ev sıcak kalsın.', a: 'Kestane, çorba ya da sahlep, küçük bir kâse.', b: 'Yatmadan telefon başka odada.' },
    { lead: 'Gün erken bitiyor, sen bitmek zorunda değilsin.', a: 'İşin kalanı yarına not olsun.', b: 'Kalın bir battaniye, erken bir yatış.' },
    { lead: 'Kasım nazik bir ay olabilir.', a: 'Sevdiğin kazağı gerekçesiz giy.', b: 'Akşam yürüyüşü market kadarı da yeter.' },
    { lead: 'Yağmur camda, sen içeridesin.', a: 'Üç nefes, pencerenin önünde.', b: 'Sıcak tabak, az tuz, bol yavaşlık.' },
    { lead: 'Kasım akşamı sana kalsın.', a: 'Misafirlik yoksa evde kalmak da şenlik.', b: 'Işığı kıs, yarın yine gelir.' },
  ],
  [
    { lead: 'Aralık kalabalık. Bir tabak da kutlama.', a: 'Sofrada bir çeşit seç.', b: 'Yanında su dursun.' },
    { lead: 'Aralıkta uyku da hediye.', a: 'İkinci gece planını ekleme.', b: 'Erken dön, yarın da var.' },
    { lead: 'Kalabalıkta kendine bir boşluk bırak.', a: 'Bir köşede bir fincan, beş dakika.', b: 'Tatlıdan bir dilim yeter, tepsisi değil.' },
    { lead: 'Yıl kapanırken acele kapanmasın.', a: 'Listeyi yakma, kısalt.', b: 'Akşam ışığı az, ses az, sen varsın.' },
  ],
];

const MORNINGS = [
  'Günaydın. Bugün kendine nazik bir bakış yeter.',
  'Günaydın. Acele yok, önce bir yudum su.',
  'Günaydın. Küçük bir kahvaltı günü yumuşatır.',
  'Günaydın. Bugün her şeyi bitirmek zorunda değilsin.',
  'Günaydın. Omuzlarını indir, gün oradan başlasın.',
  'Günaydın. Bir bardak sıcak bir şey, sonra kapı.',
  'Günaydın. Yavaş bir sabah da verimli sayılır.',
  'Günaydın. Kendine iyi gelen şeyi bugün de seç.',
  'Günaydın. Liste kısalabilir, sen eksilmezsin.',
  'Günaydın. Işık vurmuşsa bir dakika dur, bak.',
  'Günaydın. Bugün nazik kalmak da bir plan.',
  'Günaydın. Bedenin ne diyorsa ona küçük bir yer aç.',
  'Günaydın. Kahveden önce bir lokma, miden sevinsin.',
  'Günaydın. Bugün de buradayız, acele etmiyoruz.',
  'Günaydın. Bir gülümseme, bir bardak su. Başlangıç bu.',
  'Günaydın. Zor bir günse bile ilk adım yumuşak olsun.',
  'Günaydın canım. Perdeyi arala, ışık içeri gelsin.',
  'Günaydın. Saçını toplaman bile bugün yeter, gerisi yavaş gelir.',
  'Günaydın. Çayın demlensin, sen de bir dakika otur.',
  'Günaydın. Aynaya bakınca acele etme. Orada sen varsın.',
  'Günaydın. Bugün “hayır” demek de şefkat sayılır.',
  'Günaydın. Çorabını giy, suyu iç, sonra dünyaya çık.',
  'Günaydın. Küçük bir şarkı, mutfakta. Gün oradan ısınır.',
  'Günaydın. Dünkü yorgunluk bugüne borç değil.',
  'Günaydın. Bir çiçek gibi açılmak zorunda değilsin. Tomurcuk da güzelsin.',
  'Günaydın. Telefonu beş dakika sonra al. Önce nefes.',
  'Günaydın. Bugün kendine “iyi ki” de. Gerekçesi olmasın.',
  'Günaydın. Kahvaltı küçük olsun, gülümseme büyük.',
  'Günaydın. Hava griyse sen sıcak kal. Bu da bir plan.',
  'Günaydın. Bugün aceleyi kapıda bırak. İçeri sen gir.',
];

const EVENINGS = [
  'Işığı kıs, ekranı bırak. Yarın da buradayız.',
  'Akşam sana kalsın. İkinci bir plan ekleme.',
  'Battaniyeyi çek, gün bitti. Kalan iş yarına not.',
  'Bir fincan sıcak bir şey, sonra ışıklar insin.',
  'Bu gece erken yatmak da şefkat.',
  'Telefonu başka odaya bırak. Oda senin olsun.',
  'Akşam yürüyüşü market kadarı da yeter, sonra ev.',
  'Yarın yine gelir. Bu geceyi tamamlaman gerekmez.',
  'Günü kapatırken omuzlarını indir. Taşıdığın yeter.',
  'Akşam çorbası, loş lamba, sessiz bir köşe. Hepsi senin.',
  'Bugün olan oldu. Bu gece düzeltmek zorunda değilsin.',
  'Pijamanı giy, suyu iç, ışığı kıs. Ritüel bu kadar tatlı.',
  'Mesajlar yarına kalsın. Bu saat senin saatin.',
  'Bir şarkı, bir nefes, sonra yastık. İyi geceler.',
  'Kendine “bugün de geçti, aferin” de. Sonra uyu.',
  'Akşam üstü tatlı çektiyse küçük bir lokma yeter. Yasak yok.',
  'Pencereyi bir dakika arala, odayı havalandır, sonra kapan.',
  'Yarınki sen bu geceki uykuya teşekkür edecek.',
  'Kalabalık bittiyse evde kalmak da kutlama.',
  'Işıklar inerken sen de in. Acele bir veda yok.',
];

const PHASE_LINES: Record<string, string[]> = {
  Kanama: [
    'Sıcak bir şey ve kısa bir yürüyüş yeter. Kendini aceleye sokma.',
    'Bugün yavaş olmak bir eksik değil. Battaniye de plan sayılır.',
    'Kramp varsa dur. Sıcak su torbası küçük bir dost.',
    'İş listesi kısalabilir. Bedenin bugün önde.',
    'Tatlı bir çorba, erken bir yatış. Başka borç yok.',
    'Kendine sert konuşma. Bu günler geçici, sen kalıcısın.',
    'Bugün kanama varsa nazik ol. Sıcak içecek, yumuşak kıyafet.',
    'Ağrı gelirse dur. Kahramanlık bugün gerekli değil.',
    'Bir kâse çorba, bir battaniye. Gün bu kadar da güzel olur.',
    'Dışarı çıkmak zorunda değilsin. Ev de bir sığınak.',
    'Bugün “sonra” demen serbest. İşler bekler.',
    'Karnına sıcak bir el koy. Sadece “buradayım” de.',
    'Su torbası, loş oda, az ses. Üçü de ilaç değil, şefkat.',
    'Bugün az iş, çok yumuşaklık. İkisi de doğru.',
    'Kanama günü de senin günün. Küçülmek zorunda değilsin, yavaşlamak yeter.',
  ],
  'Foliküler faz': [
    'Enerjin toparlanıyor. Küçük bir plan bile bugüne yeter.',
    'İçin açıksa bir işi seç, hepsini değil.',
    'Yürüyüş bugün daha kolay gelebilir. Yine de yavaş başla.',
    'Yeni bir fikre yer var. Zorlamak yok, davet var.',
    'Sabah ışığına bir dakika bak. Gün oradan açılsın.',
    'Gücün varsa paylaş, yoksa sakla. İkisi de doğru.',
    'Bugün bir tohum ek. Büyük bir bahçe şart değil.',
    'Enerjin varsa bir işi bitir, sonra dur. Kutla.',
    'Saçını açık bırak, yürüyüşü uzat. Canın isterse.',
    'Yeni bir tarif dene. Olmazsa eski tabak da seni sever.',
    'Bugün “evet” demek kolay gelebilir. Yine de sınırın senin.',
    'Işık çoğalıyor gibi. Onu işe değil, keyfe de ayır.',
    'Küçük bir başlangıç bugün çok yakışır. Defter, adım, mesaj.',
    'Toparlanan günlerde de mola haktır.',
    'Gülümse, su iç, bir işi seç. Üçü de yeter.',
  ],
  'Doğurgan pencere': [
    'Bedenin daha canlı hissedebilir. Bu bir test değil, sadece bir not.',
    'Bugün parlak hissediyorsan tadını çıkar, görev çıkarma.',
    'Su ve uyku bu pencereyi de tutar. İkisini esirgeme.',
    'Sosyal bir gün olabilir. Yorulursan eve dönmek de cevap.',
    'Nazik bir enerji. Onu tüketmek zorunda değilsin.',
    'Ayna bugün yumuşak dursun. Acele etme.',
    'Parlıyorsan paylaş, yorulursan sakla. İkisi de senin.',
    'Bugün bir buluşma iyi gelir. Geceyi uzatmak şart değil.',
    'Canlı hissetmek bir sınav değil. Sadece bugünün hali.',
    'Su, uyku, bir güzel tabak. Pencere bunlarla daha tatlı.',
    'Kendine bir iltifat et. Başkası unutsa da sen unutma.',
    'Kısa bir yürüyüş, açık bir pencere. Enerji orada durur.',
    'Bugün “hayır” da hâlâ nazik bir cevap.',
    'Işığın varsa onu aceleye harcama. Bir şarkı da olur.',
    'Bu günler geçer. Tadını çıkar, biriktirmek zorunda değilsin.',
  ],
  'Luteal faz': [
    'Akşamı sade bırak. Bitmeyen iş yarına kalabilir.',
    'Tatlı çekebilir. Küçük bir porsiyon da sevgi sayılır.',
    'Tempoyu bir kademe indir. Kimseye açıklamak zorunda değilsin.',
    'Tuzlu atıştırmalık yerine önce bir yemek. Sonra karar verirsin.',
    'Erken yatmak bu fazda çok yakışır.',
    'Sinir geldiyse ertele. Yarınki sen daha sakin konuşur.',
    'Bugün her şeye cevap vermek zorunda değilsin.',
    'Bir kâse yoğurt, bir erken yatış. İkisi de yatıştırır.',
    'Kalabalık fazla gelirse eve dön. Bu da bilgelik.',
    'Göğsün daralırsa nefesi uzat. Düzeltmek için değil, yanında olmak için.',
    'Tatlı istedin diye kendine kızma. Küçük bir lokma yeter.',
    'Listeyi yarıya indir. Kalanı yarın da seni bekler.',
    'Bugün yumuşak ses, yumuşak ışık. Sert plan yok.',
    'Bedenin yavaş diyorsa inan. İnanmak da bakım.',
    'Akşam çayı ve battaniye. Dünya dışarıda kalsın.',
  ],
  'Adet öncesi': [
    'Hassas hissedebilirsin. Sert bir konuşmayı ertelemek de olur.',
    'Bugün kendine geniş bir yer aç. Kalabalık şart değil.',
    'Bir fincan papatya, bir erken yatış. Gün bu kadar da olabilir.',
    'Göğsün ya da karnın hassassa sıkı kıyafeti çıkar.',
    'Ağlamak da olur. Sonra su iç, omuzların düşsün.',
    'Yarın daha yumuşak olabilir. Bu akşamı zorlama.',
    'Bugün kırılgan olmak ayıp değil. İnce bir cam da ışık tutar.',
    'Mesajı göndermeden bir nefes bekle. Yarınki sen teşekkür eder.',
    'Tuzlu ve tatlı gelebilir. Önce yemeğini ye, sonra küçük bir pay.',
    'Sıcak duş, gevşek kıyafet, az ses. Üçlü bir sığınak.',
    'Bugün “iyi değilim” demen yeterli. Açıklama borç değil.',
    'Bir arkadaşın sesi iyi gelirse ara. Gelmezse yalnız kalmak da olur.',
    'Kramp öncesi yavaşla. Yarınki yükü bugün taşıma.',
    'Kendine sert cümle kurma. Bu hafta daha yumuşak bir dil.',
    'Erken yat. Yarınki sen bu iyiliği hatırlar.',
  ],
};

const GUIDE_NOTES: Record<string, string[]> = {
  regl: [
    'Bugün mutfak sıcak, hareket kısa olsun. Çorba ve esneme yeter.',
    'Rehberde bugün esnemeyi aç. Ağır seans bekleyebilir.',
    'Kanama gününde tarif sade kalsın. Mercimek, ekmek, limon.',
    'Kendine bir sıcak içecek koy, sonra rehberdeki nefese bak.',
    'Bugün “az ama iyi” günü. Bir tabak, bir nefes, bir erken yatış.',
  ],
  folikuler: [
    'Enerjin açılıyorsa antrenmanı kısaca dene. Isınmayı atlama.',
    'Bugün yeni bir tarif yakışır. Olmazsa bildiğin tabak da durur.',
    'Zihin daha net olabilir. Tek bir işi seç, hepsini değil.',
    'Yürüyüş ve yeşillik. Rehberin bugünkü nazik ikilisi.',
    'Bir başlangıç yap. Defter, adım ya da küçük bir pişirme.',
  ],
  ovulasyon: [
    'Canlı hissediyorsan kısa bir buluşma iyi gelir. Geceyi uzatma.',
    'Su ve uyku bu parlak günü de tutar. İkisini esirgeme.',
    'Sosyal pil dolu görünebilir. Yorulunca eve dönmek de cevap.',
    'Bugün aynaya yumuşak bak. Acele bir düzeltme yok.',
    'Enerjin varsa paylaş. Yoksa sakla. İkisi de doğru.',
  ],
  luteal: [
    'Tatlı gelirse önce proteini koy. Küçük bir pay da sevgi.',
    'Akşamı sade bırak. Rehberdeki nefes, mesajdan önce gelsin.',
    'Tempo bir kademe insin. Kimseye anlatmak zorunda değilsin.',
    'Tok tutan bir tabak bugün daha iyi arkadaş.',
    'Sinir yükselirse ertele. Yarınki cümle daha tatlı olur.',
  ],
  pms: [
    'Hassas bir gün. Sert konuşmayı yarına bırak.',
    'Papatya, gevşek kıyafet, erken yatış. Rehberin bugünkü üçlüsü.',
    'Ağlamak da olur. Sonra su iç, omuzların düşsün.',
    'Kalabalık fazla gelirse evde kal. Bu da bir plan.',
    'Kendine geniş yer aç. Bugün açıklama borç değilsin.',
  ],
};

const WATER_LINES = [
  'İstersen bir bardak daha. Zorunda değilsin, sadece hatırlatma.',
  'Su bardağın gözünün önünde mi? Bir yudum yeter, şimdi.',
  'Çayın yanında bir bardak su da dursun. İkisi kardeş.',
  'Susamadın diye geç kalma. Küçük bir yudum, büyük bir iyilik.',
  'Bardak boşaldıysa doldur. Kendine söylediğin küçük bir evet.',
  'Öğleden sonra suyu unutmak kolay. Bu not sadece bir fısıltı.',
  'Bir yudum su, bir nefes. İkisi de bedenine “buradayım” der.',
  'Bardağı sevdiğin yere koy. Gözün değince hatırlarsın.',
  'Su soğuk olsun, yudum yavaş. Acele bir ilaç değil.',
  'Çiçek gibi su isteriz. Bir bardak, pencere kenarı.',
  'Öğle geçtiyse bir yudum daha. Kimse saymıyor, sen iç.',
  'Bardak doluysa gülümse. Küçük bir iş, büyük bir bakım.',
];

const WATER_DONE = [
  'Bugünkü su tamam. Kendine küçük bir teşekkür yeter.',
  'Su hedefin doldu. Güzel, nazik bir iş başardın.',
  'Bardaklar tamam. Akşam başka bir borç yok bu konuda.',
  'Su bitti sayılır. Şimdi omuzlarını bırakabilirsin.',
  'Hedef doldu. Bir çiçek kadar kararlıydın bugün.',
  'Su tamam. Şimdi çayın varsa o da senin, borç değil.',
  'Aferin. Bardaklar bitti, sen de bir dakika otur.',
  'Su işi bitti. Kalan gün daha yumuşak gelsin.',
];

function daySalt(date: Date, salt: number) {
  return date.getDate() + date.getMonth() * salt + date.getFullYear();
}

export function morningLine(date = new Date()) {
  return MORNINGS[daySalt(date, 3) % MORNINGS.length];
}

export function eveningLine(date = new Date()) {
  return EVENINGS[daySalt(date, 5) % EVENINGS.length];
}

export function phaseLine(phaseName: string, date = new Date()) {
  const list = PHASE_LINES[phaseName] ?? ['Bugün de kendine iyi davran. Acele yok.'];
  return list[daySalt(date, 2) % list.length];
}

export function guideNote(phase: string, date = new Date()) {
  const list = GUIDE_NOTES[phase] ?? GUIDE_NOTES.folikuler;
  return list[daySalt(date, 6) % list.length];
}

export function waterLine(remaining: number, date = new Date()) {
  const list = remaining > 0 ? WATER_LINES : WATER_DONE;
  return list[daySalt(date, 4) % list.length];
}

export function supplementLine(name: string, dose: string, date = new Date()) {
  const soft = [
    'İstersen şimdi',
    'Nazik bir hatırlatma',
    'Acele yok, sadece saat',
    'Kendine küçük bir iyilik',
    'Varsa yanındaysa',
    'Bir yudum suyla birlikte',
    'Bugün de unutma, tatlım',
    'Zorunda değilsin ama saati geldi',
    'Küçük bir iyilik vakti',
    'Cebindeyse, şimdi uygun',
  ];
  const lead = soft[daySalt(date, 1) % soft.length];
  return `${lead}: ${name}${dose ? `, ${dose}` : ''}.`;
}
export type DailySuggestion = {
  month: string;
  day: number;
  tea: string;
  food: string;
  line: string;
  move: string;
  focus: string;
  seasonLead: string;
  seasonA: string;
  seasonB: string;
};

export function dailySuggestion(date = new Date()): DailySuggestion {
  const month = date.getMonth();
  const day = date.getDate();
  const pick = (list: string[], salt: number) => list[(day + month * salt) % list.length];
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
    seasonB: season.b,
  };
}
