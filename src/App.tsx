import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle, 
  AlertTriangle, 
  Heart, 
  MessageCircle, 
  Phone, 
  ArrowRight, 
  X, 
  Building, 
  User, 
  Check, 
  Home,
  CheckCircle2,
  ChevronRight,
  Maximize2
} from "lucide-react";

// 실시간 예약 접수 대형 현황판용 순환 데이터
const LIVE_REGISTRATIONS = [
  { id: 1, name: "김*진 고객님", region: "서울 강남구 아파트 34평", status: "100% 직영 시공팀 배정 완료 (방금 전)" },
  { id: 2, name: "박*우 고객님", region: "인천 송도 오피스텔 22평", status: "무상 피톤치드 혜택 매칭 완료 (3분 전)" },
  { id: 3, name: "정*아 고객님", region: "경기 분당구 아파트 42평", status: "친환경 온수스팀 시공팀 매칭 완료 (5분 전)" },
  { id: 4, name: "이*준 고객님", region: "서울 서초구 빌라 18평", status: "안심 시공 견적 조율 완료 (8분 전)" },
  { id: 5, name: "최*민 고객님", region: "경기 하남시 아파트 31평", status: "100% 직영 전담팀 예약 접수중 (11분 전)" }
];

export default function App() {
  // 카운트다운 타이머 (극대화 스타일)
  const [timeLeft, setTimeLeft] = useState({ minutes: 28, seconds: 44 });
  const [currentRegIndex, setCurrentRegIndex] = useState(0);
  const [shortsPlayIndex, setShortsPlayIndex] = useState(0);
  const [beforeAfterPos, setBeforeAfterPos] = useState(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWelcomePopupOpen, setIsWelcomePopupOpen] = useState(true);

  // 안심 견적 폼 데이터
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    region: "서울 전체",
    type: "아파트",
    size: ""
  });

  // 타이머 1초마다 감소 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 59, seconds: 59 }; // 루프 리셋 느낌 유지
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 실시간 접수 티커 롤링
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRegIndex((prev) => (prev + 1) % LIVE_REGISTRATIONS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // 쇼츠 시퀀스 루핑
  useEffect(() => {
    const interval = setInterval(() => {
      setShortsPlayIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Before/After 이미지 슬라이더 동작용 레프 및 터치 계산
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setBeforeAfterPos(Math.max(0, Math.min(100, position)));
  };

  const handleTouch = (e: React.TouchEvent) => {
    if (e.touches[0]) handleDrag(e.touches[0].clientX);
  };

  const handleMouse = (e: React.MouseEvent) => {
    if (e.buttons === 1) handleDrag(e.clientX);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("이름과 연락처를 입력해 주세요!");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans tracking-tight selection:bg-[#0A2540]/10 selection:text-[#0A2540] flex flex-col justify-between">
      
      {/* 🚨 1. 상단 카운트다운 타이머 극대화 (48px 이상 초대형 폰트 제공) */}
      <section id="countdown-extreme-hero" className="w-full bg-[#0A2540] text-white text-center py-8 px-4 border-b-4 border-[#00A2FF] relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-at-t from-[#113154] to-transparent opacity-60 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-1">
          <p className="text-[#00A2FF] text-xs sm:text-sm font-black tracking-widest uppercase animate-pulse">
            🚨 오늘 마감 임박 ! 피톤치드 세정 무료 증정 혜택 🚨
          </p>
          <h2 className="text-sm sm:text-base font-bold text-slate-300 opacity-90">
            당일 특별 혜택 및 예약 지원 마감까지 남은 시간
          </h2>
          
          {/* 압도적인 크기의 카운트다운 타이머 (48px 이상) */}
          <div className="text-5xl sm:text-7xl md:text-8xl font-black font-mono tracking-tighter text-white drop-shadow-[0_4px_12px_rgba(0,162,255,0.3)] select-none py-1 flex items-center justify-center gap-1">
            <span className="text-[#00A2FF]">{String(timeLeft.minutes).padStart(2, "0")}</span>
            <span className="animate-pulse text-white/50">:</span>
            <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
          </div>

          <p className="text-[11px] text-sky-300/90 font-medium font-serif">
            * 당일 마감 이후에는 무료 증정 사은 혜택이 마감 가격으로 정상 복원됩니다.
          </p>
        </div>
      </section>

      {/* 브랜드 헤더 */}
      <header className="w-full bg-white border-b border-slate-200 py-5 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0A2540] flex items-center justify-center text-white font-black text-lg">
              CN
            </div>
            <h1 className="font-black text-xl tracking-tighter text-[#0A2540]">
              클린노트 <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Guide</span>
            </h1>
          </div>
          <div>
            <a 
              href="#quote-form-section" 
              className="text-xs md:text-sm font-black px-4.5 py-2.5 bg-[#0A2540] text-white rounded-full shadow-md hover:bg-slate-800 transition active:scale-95 duration-100"
            >
              간편 견적 신청 📝
            </a>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 흐름 */}
      <main className="flex-grow w-full">

        {/* 히어로 & 쇼츠 영상 영역 */}
        <section className="py-12 md:py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            
            {/* 좌측 강렬 미니멀 카피 */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <span className="inline-block px-3 py-1 rounded bg-[#0A2540]/10 text-[#0A2540] text-xs font-black tracking-wider uppercase">
                PREMIUM HOME CURE SYSTEM
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-[1.12] tracking-tight">
                설명은 줄이고,<br />
                <span className="text-[#0A2540] underline decoration-[#00A2FF] decoration-4">결과로만 증명합니다.</span>
              </h2>
              <p className="text-slate-500 font-semibold text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                일단 유인하고 현장 추가금을 뜯어내는 저질 하청에 지치셨나요?<br />
                본사 정예 정직원이 처음 계약한 약속 그대로 정찰 시공합니다.
              </p>
              <div className="pt-3">
                <a 
                  href="#quote-form-section" 
                  className="inline-flex items-center gap-2 px-7 py-4 bg-[#00A2FF] text-white font-black text-sm rounded-xl shadow-lg hover:shadow-xl transition tracking-wide active:scale-95"
                >
                  <span>30초 초고속 안심견적 조회하기</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

            {/* 우측 쇼츠 플레이어 UI */}
            <div className="flex-1 w-full flex justify-center">
              <div className="w-full max-w-[300px] aspect-[9/16] rounded-[36px] bg-[#0E131F] border-[6px] border-slate-800 p-2 shadow-2xl relative overflow-hidden">
                <div className="w-full h-full rounded-[28px] overflow-hidden relative flex flex-col justify-between p-4 text-white">
                  
                  {/* 동적 청소 액션 비주얼 백그라운드 */}
                  <div className="absolute inset-0 bg-slate-900 pointer-events-none z-0">
                    {shortsPlayIndex === 0 && (
                      <div className="w-full h-full relative">
                        <img 
                          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop" 
                          alt="고온 스팀 클리닝 시공" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}
                    {shortsPlayIndex === 1 && (
                      <div className="w-full h-full relative">
                        <img 
                          src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop" 
                          alt="구석 버블 미세 세정" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}
                    {shortsPlayIndex === 2 && (
                      <div className="w-full h-full relative">
                        <img 
                          src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=400&auto=format&fit=crop" 
                          alt="안심 새집 피톤치드" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}
                  </div>

                  <div className="z-10 flex justify-between items-center w-full">
                    <span className="bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-black tracking-wider text-[#00A2FF] border border-white/10 uppercase">
                      SHORTS PREVIEW
                    </span>
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                  </div>

                  {/* 쇼츠 하단 핵심 자막 */}
                  <div className="z-10 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-white/10 text-left">
                    <p className="text-[10px] text-[#00A2FF] font-black uppercase">Core Step Process</p>
                    <h4 className="font-extrabold text-xs mt-0.5">
                      {shortsPlayIndex === 0 && "01. 120℃ 초강력 고온 고압 제균 스팀"}
                      {shortsPlayIndex === 1 && "02. 고착 찌든 흡착 기름때 버블 세정"}
                      {shortsPlayIndex === 2 && "03. 유해 잔류 새집 물질 전용 피톤치드"}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 📢 2. 큼직한 실시간 예약 현황 배너 */}
        <section id="live-banner" className="w-full bg-[#0A2540] text-white py-6 overflow-hidden border-y-2 border-[#1E4164]">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <span className="bg-red-500 text-xs font-black px-3 py-1 rounded animate-pulse tracking-widest text-[#FFF]">
                LIVE REGIST
              </span>
              <p className="text-sm md:text-base font-extrabold text-slate-100">
                실시간 전국 청소 예약 분산 접수 현황판
              </p>
            </div>

            <div className="h-8 relative w-full md:w-auto min-w-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRegIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex items-center justify-between gap-5 bg-white/5 border border-white/10 rounded-lg px-4"
                >
                  <span className="text-xs font-black text-emerald-400">
                    {LIVE_REGISTRATIONS[currentRegIndex].name}
                  </span>
                  <span className="text-slate-300 text-xs font-bold">
                    {LIVE_REGISTRATIONS[currentRegIndex].region}
                  </span>
                  <span className="text-[#00A2FF] text-xs font-black">
                    {LIVE_REGISTRATIONS[currentRegIndex].status}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* 8가지 핵심 단어 혜택 섹션 */}
        <section id="benefits-section" className="py-16 md:py-24 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="text-center space-y-2">
              <span className="text-[#0A2540] text-xs font-black tracking-widest uppercase">
                CLINIC COMPLETE BENEFIT 8
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                클린노트만의 거품 없는 8가지 팩트
              </h3>
            </div>

            {/* 자잘한 설명 배제한 직관적 키워드 카드 UI */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { no: "01", title: "당일 안심검수", badge: "A/S 5일보증" },
                { no: "02", title: "친환경 천연세제", badge: "유해물질 Zero" },
                { no: "03", title: "100% 직영 정예팀", badge: "정직원 책임제" },
                { no: "04", title: "투명 정찰가격", badge: "추가요금 사절" },
                { no: "05", title: "고온 스팀살균", badge: "배수구 완전분해" },
                { no: "06", title: "완전 정밀탈거", badge: "서랍·걸레받이속" },
                { no: "07", title: "실시간 세정보고", badge: "카톡 리포트" },
                { no: "08", title: "피톤치드 마감", badge: "새집증후군 타격" }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-6.5 rounded-2xl border-2 border-slate-200/60 shadow-sm relative hover:border-[#0A2540] transition-colors group"
                >
                  <span className="absolute top-4 right-4 text-xs font-mono font-black text-slate-300">
                    {item.no}
                  </span>
                  <div className="space-y-2 mt-4 text-left">
                    <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-400 font-bold text-[9px] rounded uppercase tracking-wider">
                      {item.badge}
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-[#0A2540] group-hover:text-black transition-colors leading-tight">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ❌ 와 ⭕ 극강의 혜택 대비 배너 */}
        <section id="truth-contrast-section" className="py-16 md:py-24 px-4 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-1">
              <span className="text-[#00A2FF] text-xs font-black tracking-widest uppercase">COMPARE FACT SHEET</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">당황스러운 악습과 직영팀의 명확한 차이</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* @ts-ignore */}
              <div className="bg-red-500/5 border-2 border-red-200 rounded-3xl p-6.5 text-center relative overflow-hidden">
                <span className="absolute -top-10 -right-10 text-9xl font-black text-red-500/10 pointer-events-none select-none">X</span>
                
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-black text-xl mx-auto mb-4">
                  ✕
                </div>
                
                <h4 className="text-lg font-black text-red-700">이런 가짜 청소에 당하셨나요?</h4>
                
                <ul className="mt-6 space-y-4 text-left text-slate-600 font-bold text-xs max-w-xs mx-auto">
                  <li className="flex items-center gap-2 text-red-700 bg-white/60 p-2.5 rounded border border-red-100">
                    <span>• 하청 업체 무작위 배정?</span> <span className="ml-auto font-black">[X]</span>
                  </li>
                  <li className="flex items-center gap-2 text-red-700 bg-white/60 p-2.5 rounded border border-red-100">
                    <span>• 현장에서 뜬금없는 추가비 독촉?</span> <span className="ml-auto font-black">[X]</span>
                  </li>
                  <li className="flex items-center gap-2 text-red-700 bg-white/60 p-2.5 rounded border border-red-100">
                    <span>• 고독한 유독성 락스 세정 남발?</span> <span className="ml-auto font-black">[X]</span>
                  </li>
                  <li className="flex items-center gap-2 text-red-700 bg-white/60 p-2.5 rounded border border-red-100">
                    <span>• 눈에 띄는 곳만 대충 헹굼?</span> <span className="ml-auto font-black">[X]</span>
                  </li>
                </ul>
              </div>

              {/* 오른쪽: 안심 클린노트 (해결 카드 [O]) */}
              <div className="bg-[#0A2540]/5 border-2 border-[#0A2540]/30 rounded-3xl p-6.5 text-center relative overflow-hidden">
                <span className="absolute -top-10 -right-10 text-9xl font-black text-[#0A2540]/10 pointer-events-none select-none">O</span>
                
                <div className="w-12 h-12 rounded-full bg-[#0A2540]/15 flex items-center justify-center text-[#0A2540] font-black text-xl mx-auto mb-4">
                  ✓
                </div>
                
                <h4 className="text-lg font-black text-[#0A2540]">클린노트의 100% 직영 안심 약속</h4>
                
                <ul className="mt-6 space-y-4 text-left text-slate-700 font-bold text-xs max-w-xs mx-auto">
                  <li className="flex items-center gap-2 text-[#0A2540] bg-white p-2.5 rounded border border-[#0A2540]/20">
                    <span>• 100% 정직원 전담조 직영 시공!</span> <span className="ml-auto font-black">[O]</span>
                  </li>
                  <li className="flex items-center gap-2 text-[#0A2540] bg-white p-2.5 rounded border border-[#0A2540]/20">
                    <span>• 사전 조율 완벽 확약 정찰 준수!</span> <span className="ml-auto font-black">[O]</span>
                  </li>
                  <li className="flex items-center gap-2 text-[#0A2540] bg-white p-2.5 rounded border border-[#0A2540]/20">
                    <span>• 안전 생분해 원제 친환경 세척!</span> <span className="ml-auto font-black">[O]</span>
                  </li>
                  <li className="flex items-center gap-2 text-[#0A2540] bg-white p-2.5 rounded border border-[#0A2540]/20">
                    <span>• 탈거식 하단 서랍 구석 먼지 박멸!</span> <span className="ml-auto font-black">[O]</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Before & After 비교 (설명 글자 배제, 극강의 비주얼 비교) */}
        <section id="before-after-section" className="py-16 md:py-24 px-4 bg-slate-100 border-t border-slate-200">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-1">
              <span className="text-[#0A2540] text-xs font-black tracking-widest uppercase">PRO 시공 비교</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">[청소 전] 과 [청소 후] 확실한 차이</h3>
              <p className="text-slate-400 text-xs font-bold">마우스 또는 터치를 끌어서 실제의 정밀도 차이를 비교해 보세요.</p>
            </div>

            {/* 비교 슬라이더 영역 */}
            <div 
              ref={containerRef}
              onMouseMove={handleMouse}
              onTouchMove={handleTouch}
              className="w-full aspect-[16/10] max-h-[480px] bg-slate-300 rounded-3xl overflow-hidden relative select-none cursor-ew-resize border-[#0A2540]/20 border-4 shadow-xl"
            >
              {/* BEFORE (왼쪽 밑에 깔림) */}
              <div className="absolute inset-0 bg-[#0B0F19] overflow-hidden">
                <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] md:text-xs font-black px-3 py-1 rounded-full z-20 shadow-md">
                  BEFORE 시공 전 (찌든때와 오염 발생)
                </span>
                <img 
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop" 
                  alt="찌든 싱크 오염 시공 전" 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-[1.2] sepia-[20%]" 
                />
                <div className="absolute inset-0 bg-black/35 z-10" />
                <div className="absolute bottom-6 left-6 z-20 text-left">
                  <span className="text-[10px] md:text-xs font-black tracking-wider bg-red-950/80 text-red-400 px-2.5 py-1 rounded border border-red-500/20 shadow-sm">
                    물때 및 고착 기름 찌꺼기 가득한 상태
                  </span>
                </div>
              </div>

              {/* AFTER (오른쪽 덮어씌움) */}
              <div 
                className="absolute inset-y-0 right-0 overflow-hidden"
                style={{ left: `${beforeAfterPos}%` }}
              >
                {/* 보정 너비 유지용 껍데기 */}
                <div 
                  className="absolute inset-y-0 right-0 w-full aspect-[16/10] max-h-[480px] overflow-hidden"
                  style={{ width: `${containerRef.current?.getBoundingClientRect().width || 800}px` }}
                >
                  <span className="absolute top-4 right-4 bg-blue-500 text-white text-[10px] md:text-xs font-black px-3 py-1 rounded-full z-20 shadow-md">
                    AFTER 시공 후 (완전 세분할 세정)
                  </span>
                  <img 
                    src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop" 
                    alt="유광 광택 복원 완료" 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-emerald-950/15 z-10 mix-blend-overlay" />
                  <div className="absolute bottom-6 right-6 z-20 text-right">
                    <span className="text-[10px] md:text-xs font-black tracking-wider bg-emerald-950/90 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/20 shadow-lg">
                      ✨ 120℃ 제균 스팀 및 피톤치드 코팅 완료
                    </span>
                  </div>
                </div>
              </div>

              {/* 중간 슬라이드 구분자 선 */}
              <div 
                className="absolute inset-y-0 w-1.5 bg-white shadow-[0_0_15px_rgba(255,255,255,1)] z-20 pointer-events-none"
                style={{ left: `${beforeAfterPos}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-slate-800 flex items-center justify-center font-black text-sm border-2 border-[#0A2540] shadow animate-bounce">
                  ↔
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 5. 복잡한 리스트 대신 핵심 단어만 나열 */}
        <section id="service-simple-ranges" className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-1">
              <span className="text-[#0A2540] text-xs font-black tracking-widest uppercase">CARE TARGET</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">핵심 청소 범위 직관 가이드</h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center text-sm">
              <div className="bg-slate-50 border-2 border-slate-200/50 p-6 rounded-2xl">
                <span className="text-3xl">🍳</span>
                <h4 className="font-extrabold text-[#0A2540] mt-2 text-base">주방 전체</h4>
                <p className="text-[10px] text-slate-400 font-bold mt-1">싱크 / 후드 / 가구탈거 / 고압소독</p>
              </div>

              <div className="bg-slate-50 border-2 border-slate-200/50 p-6 rounded-2xl">
                <span className="text-3xl">🛁</span>
                <h4 className="font-extrabold text-[#0A2540] mt-2 text-base">욕실 전체</h4>
                <p className="text-[10px] text-slate-400 font-bold mt-1">변기 / 세면 / 거울 유막 / 배출구 탈거</p>
              </div>

              <div className="bg-slate-50 border-2 border-slate-200/50 p-6 rounded-2xl">
                <span className="text-3xl">🛋️</span>
                <h4 className="font-extrabold text-[#0A2540] mt-2 text-base">방 / 거실</h4>
                <p className="text-[10px] text-slate-400 font-bold mt-1">실크벽 / 콘센트 / 조명안 / 틈새흡입</p>
              </div>

              <div className="bg-slate-50 border-2 border-slate-200/50 p-6 rounded-2xl">
                <span className="text-3xl">🚪</span>
                <h4 className="font-extrabold text-[#0A2540] mt-2 text-base">베란다 창틀</h4>
                <p className="text-[10px] text-slate-400 font-bold mt-1">구조홈 / 오염유막 / 배출트랩 세척</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. 최소화 3단계 프로세스 (화살표 레이아웃) */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-1">
              <span className="text-[#0A2540] text-xs font-black tracking-widest uppercase">SIMPLE PROCESS</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">당일 시공 3단계 약식 과정</h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative">
              <div className="flex-1 bg-white border border-slate-200 p-6.5 rounded-2xl text-center w-full shadow-xs">
                <span className="text-xs font-roboto font-black text-[#00A2FF]">STEP 01</span>
                <h4 className="text-lg font-black text-[#0A2540] mt-1">간편 무료 견적 예약</h4>
                <p className="text-[11px] text-slate-400 font-bold mt-1">온라인 예약 확인 후 안내 매니저 배정</p>
              </div>

              <span className="text-slate-300 font-black text-2xl hidden sm:inline">➜</span>

              <div className="flex-1 bg-white border-2 border-[#0A2540]/40 p-6.5 rounded-2xl text-center w-full shadow-xs">
                <span className="text-xs font-roboto font-black text-[#00A2FF]">STEP 02</span>
                <h4 className="text-lg font-black text-emerald-700 mt-1">100% 직영 스팀 시공</h4>
                <p className="text-[11px] text-[#0A2540] font-bold mt-1">안심 탈거식 청격 및 미세소독</p>
              </div>

              <span className="text-slate-300 font-black text-2xl hidden sm:inline">➜</span>

              <div className="flex-1 bg-white border border-slate-200 p-6.5 rounded-2xl text-center w-full shadow-xs">
                <span className="text-xs font-roboto font-black text-[#00A2FF]">STEP 03</span>
                <h4 className="text-lg font-black text-slate-950 mt-1">당일 즉각 전수검수</h4>
                <p className="text-[11px] text-slate-400 font-bold mt-1">고객 불만족 0% 달성 및 철저 완료</p>
              </div>
            </div>
          </div>
        </section>

        {/* 📝 직관적 문의 신청 폼 */}
        <section id="quote-form-section" className="py-20 px-4 bg-white border-t border-slate-200">
          <div className="max-w-xl mx-auto bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 md:p-10 shadow-2xl relative">
            
            <div className="text-center space-y-2 mb-8">
              <span className="bg-[#00A2FF] text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                FAST REGISTRATION
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-[#0A2540] tracking-tight">
                통화 유도 최소화, 직관 안심 견적
              </h3>
              <p className="text-xs text-slate-400 font-bold">
                상세 견적 안내와 맞춤 상담을 신속하게 지원해 드립니다.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">성합 / 이름</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="text"
                    name="name"
                    required
                    placeholder="성합을 정확히 적어주세요"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:border-[#0A2540] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">연락처 휴대전화</label>
                <input 
                  type="tel"
                  name="phone"
                  required
                  placeholder="예: 010-0000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-black placeholder:text-slate-300 focus:outline-none focus:border-[#0A2540] transition font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">시공 지역</label>
                  <select 
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700"
                  >
                    <option value="서울 전체">서울권 전체</option>
                    <option value="인천 송도·영종">인천 송도권</option>
                    <option value="수도권 남부">경기 분당·용인</option>
                    <option value="수도권 북부">경기 일산·하남</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">공간 평수</label>
                  <input 
                    type="number"
                    name="size"
                    required
                    placeholder="계약 평수 (예: 25)"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 text-white bg-gradient-to-r from-[#0A2540] to-[#00A2FF] rounded-xl text-sm font-black shadow-lg hover:shadow-xl hover:from-[#071F36] hover:to-[#0089D7] transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer transform active:scale-95"
              >
                <span>안심 무료 피톤치드 세정 확정하기</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </form>

          </div>
        </section>

      </main>

      {/* 푸터 */}
      <footer className="w-full bg-[#070F19] text-slate-400 py-10 px-6 text-center border-t border-blue-950">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-white font-extrabold tracking-widest text-sm">클린노트 프리미엄 홈시공</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            사업자등록번호: 000-00-00000 | 본사: 서울 강남구 도산대로 일원 | 고객상담: 1800-7763<br />
            © 2026 Cleannote Inc. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* 📱 8. 모바일 화면 고정 하단 액션 플로팅 바 */}
      <div id="mobile-floating-bar" className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 p-3 flex sm:flex gap-3 z-50 md:hidden shadow-lg">
        <a 
          href="tel:18007763" 
          className="flex-1 bg-[#10B981] hover:bg-emerald-600 text-white font-black py-4.5 rounded-2xl flex items-center justify-center gap-1.5 transition text-sm shadow-md cursor-pointer"
        >
          <Phone className="w-4.5 h-4.5 fill-white" />
          <span>전화 상담</span>
        </a>
        <a 
          href="#quote-form-section" 
          className="flex-1 bg-[#00A2FF] hover:bg-[#008AE6] text-white font-black py-4.5 rounded-2xl flex items-center justify-center gap-1.5 transition text-sm shadow-md cursor-pointer"
        >
          <span>30초 초고속 안심견적</span>
          <ArrowRight className="w-4.5 h-4.5" />
        </a>
      </div>

      {/* 안심 접수 완료 확인 모달 팝업 */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full border border-slate-200 shadow-2xl relative text-center space-y-5"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-2xl mx-auto font-black mb-1 animate-bounce">
                ✓
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-black text-slate-900">견적 상담 접수 완료</h4>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  무상 특별 사은 혜택(친환경 피톤치드 소독)과 상담 예약 신청이 완료되었습니다! 전문 직영 안내 매니저가 곧바로 연락드리겠습니다.
                </p>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full py-3 bg-[#0A2540] text-white font-black text-xs rounded-xl shadow hover:bg-slate-800 transition"
              >
                닫기
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 웰컴 기본형 샘플 사이트 안내 팝업 */}
      <AnimatePresence>
        {isWelcomePopupOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-[2px] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative text-center space-y-6"
            >
              <button 
                onClick={() => setIsWelcomePopupOpen(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mx-auto font-black mb-1">
                📢
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black text-[#0A2540] leading-snug tracking-tight">
                  This site is a basic type sample_4 website.
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                  본 포트폴리오는 청소업체 웹사이트의 기본형 샘플 디자인 시안입니다.<br />
                  전체 레이아웃 및 디테일을 참고용으로 자유롭게 살펴보실 수 있습니다.
                </p>
              </div>

              <button 
                onClick={() => setIsWelcomePopupOpen(false)}
                className="w-full py-4 bg-gradient-to-r from-[#0A2540] to-[#00A2FF] text-white font-black text-sm sm:text-base rounded-xl shadow-lg hover:from-[#071F36] hover:to-[#0089D7] transition duration-200 transform active:scale-95 cursor-pointer"
              >
                확인 및 계속 보기
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
