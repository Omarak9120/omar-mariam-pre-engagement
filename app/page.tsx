'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpLeft, Heart, MapPin, Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const celebration = {
  date: '2026-09-26T17:00:00+03:00',
  map: 'https://maps.app.goo.gl/M2cX86vqhG5PpAm87?g_st=ic',
  music: 'https://ajkigliepgmcekv6.public.blob.vercel-storage.com/music/JVKE%20-%20golden%20hour%20%28instrumental%29-AkqPghYGPBfFf5untkd6KsfvyzcgBC.mp3',
};
const arabic = new Intl.NumberFormat('ar-LB', { numberingSystem: 'arab', minimumIntegerDigits: 2 });

function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setRemaining(Math.max(0, new Date(celebration.date).getTime() - Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  const values = remaining === null ? [null, null, null, null] : [
    Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24,
    Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60,
  ];
  return remaining === 0 ? <p className="celebration-today">حان موعد فرحتنا، أهلاً بكم!</p> : (
    <div className="countdown" role="timer" aria-label="الوقت المتبقي حتى الخطبة" aria-live="off">
      {values.map((value, i) => <div className="countdown-unit" key={i}>
        <span className="countdown-number">{value === null ? '—' : arabic.format(value)}</span>
        <span className="countdown-label">{['يوم', 'ساعة', 'دقيقة', 'ثانية'][i]}</span>
      </div>)}
    </div>
  );
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    if (opened) heading.current?.focus({ preventScroll: true });
    else openButton.current?.focus({ preventScroll: true });
    return () => { document.body.style.overflow = ''; };
  }, [opened]);

  async function playMusic() {
    if (!audio.current) return;
    try {
      audio.current.volume = 0.35;
      await audio.current.play();
      setMusicError(false);
    } catch { setPlaying(false); }
  }

  function openInvitation(withMusic: boolean) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setOpened(true);
    if (withMusic) void playMusic(); else audio.current?.pause();
  }

  function returnToIntro() {
    audio.current?.pause();
    setOpened(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  return (
    <>
      <audio ref={audio} src={celebration.music} loop preload="none"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onError={() => { setMusicError(true); setPlaying(false); }} />
      <div className={`invitation-cover ${opened ? 'is-open' : ''}`} aria-hidden={opened} inert={opened}>
        <div className="cover-frame" aria-hidden="true" />
        <p className="cover-eyebrow">وصلتكم دعوة بكلّ الحبّ</p>
        <h2 className="cover-names">عمر <span>و</span> مريم</h2>
        <Button ref={openButton} className="envelope-button" onClick={() => openInvitation(true)} tabIndex={opened ? -1 : 0}>
          <img src="/images/envelope.webp" alt="" width="1536" height="1024" fetchPriority="high" />
          <span className="open-label">افتح الدعوة <ArrowUpLeft aria-hidden="true" /></span>
        </Button>
        <button className="silent-open" onClick={() => openInvitation(false)} tabIndex={opened ? -1 : 0}>الدخول بدون موسيقى</button>
        <p className="cover-bottom">بكلّ الحبّ، ندعوكم لمشاركتنا خطبتنا</p>
      </div>
      <main className={`invitation ${opened ? 'revealed' : ''}`} inert={!opened} aria-hidden={!opened}>
        <header className="site-header">
          <Button variant="ghost" className="intro-return" onClick={returnToIntro}>
            <RotateCcw aria-hidden="true" /><span>العودة إلى الافتتاحية</span>
          </Button>
          <a href="#home" className="wordmark" aria-label="عمر ومريم، بداية الدعوة">عمر <span>و</span> مريم</a>
          <Button variant="ghost" className="music-button" aria-pressed={playing}
            aria-label={playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
            onClick={() => playing ? audio.current?.pause() : void playMusic()}>
            <span>{playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}</span>
            {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </Button>
        </header>
        {musicError && <p role="status" className="music-status">تعذّر تحميل الموسيقى. يمكنك محاولة تشغيلها مجدداً.</p>}
        <section className="hero" id="home" aria-labelledby="couple-names">
          <img src="/images/floral-background.webp" className="hero-art" alt="" width="1536" height="1024" fetchPriority="high" />
          <div className="hero-inner">
            <p className="eyebrow">دعوة لحفل خطبتنا</p>
            <div className="fine-rule" aria-hidden="true"><span>✧</span></div>
            <p className="hero-intro">وبكلّ الحبّ، نبدأ معاً</p>
            <h1 className="couple-names" id="couple-names" ref={heading} tabIndex={-1}>
              <span className="person"><span className="first-name">عمر</span><span className="family-name">عبدالقادر</span></span>
              <span className="conjunction">و</span>
              <span className="person"><span className="first-name">مريم</span><span className="family-name">تليجة</span></span>
            </h1>
            <p className="hero-message">نفرح ببداية حكايتنا، وتكتمل فرحتنا بكم</p>
            <div className="hero-date" aria-label="السبت، ٢٦ أيلول ٢٠٢٦، الساعة الخامسة مساءً">
              <span>السبت</span><strong>٢٦</strong><span>أيلول<br />٢٠٢٦</span>
            </div>
            <p className="hero-time">الخامسة مساءً</p>
            <a className="scroll-link" href="#our-day"><span>تفاصيل فرحتنا</span><ArrowDown size={18} aria-hidden="true" /></a>
          </div>
        </section>
        <section className="invitation-note" id="our-day" aria-labelledby="note-title">
          <Heart className="note-icon" size={26} strokeWidth={1} aria-hidden="true" />
          <p className="section-kicker">أهلنا وأحبّتنا</p>
          <h2 id="note-title">أنتم أجمل تفاصيل هذا اليوم</h2>
          <p>بكلّ حبّ وسعادة، ندعوكم لمشاركتنا حفل خطبتنا<br className="desktop-break" /> ولحظة تبادل الخواتم، لنبدأ معاً حكاية عمر.</p>
          <p className="note-signature">بحضوركم، تحلو البدايات</p>
          <div className="fine-rule" aria-hidden="true"><span>✧</span></div>
        </section>
        <section className="countdown-section" aria-labelledby="countdown-title">
          <span className="section-kicker">نعدّ اللحظات حتى نلقاكم</span>
          <h2 id="countdown-title">اقتربت فرحتنا</h2>
          <Countdown />
          <p className="timezone-note">٢٦ أيلول ٢٠٢٦ · الخامسة مساءً بتوقيت بيروت</p>
        </section>
        <section className="venue-section" aria-labelledby="venue-title">
          <div className="venue-content">
            <MapPin className="venue-icon" size={30} strokeWidth={1.2} aria-hidden="true" />
            <p className="section-kicker">هنا نجتمع على الفرح</p>
            <h2 id="venue-title">عكّار العتيقة</h2>
            <p>ننتظركم بكلّ حبّ لنحتفل معاً بخطبتنا.</p>
            <a href={celebration.map} className="map-link" target="_blank" rel="noopener noreferrer">
              <MapPin size={18} aria-hidden="true" /> موقع الحفل على الخريطة <ArrowUpLeft size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
        <footer className="site-footer">
          <p>ومعكم، تبدأ أجمل حكاية</p>
          <div className="footer-names">عمر <span>و</span> مريم</div>
          <button className="footer-return" onClick={returnToIntro}><RotateCcw size={15} aria-hidden="true" /> العودة إلى الافتتاحية</button>
        </footer>
      </main>
      <noscript><div className="no-script"><h1>خطبة عمر عبدالقادر ومريم تليجة</h1><p>السبت ٢٦ أيلول ٢٠٢٦، الساعة الخامسة مساءً، عكّار العتيقة.</p><a href={celebration.map}>موقع الحفل على الخريطة</a><p>فعّل JavaScript لعرض الدعوة المتحركة والعدّ التنازلي.</p></div></noscript>
    </>
  );
}
