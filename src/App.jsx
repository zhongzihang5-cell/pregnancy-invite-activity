import { useRef, useState } from "react";

const T = {
  brand: "#ff4d88",
  brandLight: "#fff0f5",
  brandMid: "#ffb3ce",
  bg: "#f2f2f5",
  card: "#ffffff",
  dark: "rgba(0,0,0,0.8)",
  text: "rgba(0,0,0,0.8)",
  textSec: "rgba(0,0,0,0.6)",
  green: "#00cc99",
  border: "rgba(0,0,0,0.06)",
  coral: "#ff8f6b",
};

const MOCK_RECORDS = [
  { name: "王伟", relation: "准爸爸", phone: "138****8801", status: "未登录", avatar: "爸" },
];

function formatDateYMD(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** 活动期内展示用（示意） */
const ACTIVITY_RANGE = "2025.01.12 - 2025.02.26";

/** 四选一奖品（与头图活动一致） */
const PRIZE_OPTIONS = [
  {
    id: "album",
    label: "孕期纪念照片书",
    photo: `${import.meta.env.BASE_URL}activity/prize-photo-book.png`,
  },
  {
    id: "stand",
    label: "定制相册摆台",
    photo: `${import.meta.env.BASE_URL}activity/prize-album-stand.png`,
  },
  { id: "ecard", label: "易点生活卡", emoji: "💳" },
  { id: "vip", label: "美柚7天会员", emoji: "✨" },
];

const HERO_INVITE_IMG = `${import.meta.env.BASE_URL}activity/hero-baby-star.png`;

const NINE_SLOTS = [
  { id: "t1", label: "验孕留念" },
  { id: "u1", label: "产检①" },
  { id: "u2", label: "产检②" },
  { id: "u3", label: "产检③" },
  { id: "p1", label: "合影①" },
  { id: "p2", label: "合影②" },
  { id: "p3", label: "合影③" },
  { id: "x1", label: "瞬间⑧" },
  { id: "x2", label: "瞬间⑨" },
];

/** 留言字数上限（不在界面展示计数） */
const WISH_LIMIT = 120;

/** 头图区：星空宝宝插画 + 标题 + 右上角半透明入口 */
function InviteHero({ onBack, onRules, onPrizes }) {
  const pillOnHero = (label, onClick) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: "none",
        borderRadius: 80,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 500,
        background: "rgba(255,255,255,0.42)",
        color: "rgba(0,0,0,0.72)",
        cursor: "pointer",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "0 0 16px 16px",
        overflow: "hidden",
        minHeight: 224,
      }}
    >
      <img
        src={HERO_INVITE_IMG}
        alt="合体时光，好礼相伴"
        decoding="async"
        loading="eager"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 34%",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(35,24,48,0.42) 0%, rgba(35,24,48,0.12) 40%, rgba(22,14,28,0.62) 100%)",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1, padding: "12px 16px 0" }}>
        <button
          type="button"
          onClick={onBack}
          aria-label="返回"
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            border: "none",
            background: "rgba(255,255,255,0.38)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            lineHeight: 1,
            color: "#fff",
            padding: 0,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          ‹
        </button>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
          {pillOnHero("活动规则", onRules)}
          {pillOnHero("我的奖品", onPrizes)}
        </div>
      </div>

      <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "18px 20px 22px", marginTop: 8 }}>
        <div
          style={{
            fontSize: 21,
            fontWeight: 500,
            color: "#fff",
            lineHeight: 1.35,
            letterSpacing: 1,
            textShadow: "0 2px 14px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.35)",
          }}
        >
          合体时光，好礼相伴
        </div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", marginTop: 10, lineHeight: 1.47, textShadow: "0 1px 8px rgba(0,0,0,0.35)" }}>
          邀请准爸爸完成助力 · 好礼四选一
        </div>
      </div>
    </div>
  );
}

function BigInviteButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        height: 44,
        borderRadius: 80,
        border: "none",
        fontSize: 17,
        fontWeight: 500,
        color: "#fff",
        cursor: "pointer",
        background: `linear-gradient(90deg, ${T.coral}, ${T.brand})`,
        boxShadow: "0 8px 22px rgba(255,77,136,0.32)",
      }}
    >
      {children}
    </button>
  );
}

function InviteRecordsList({ records }) {
  if (!records.length) return null;
  return (
    <>
      {records.map((r, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 0",
            borderBottom: i < records.length - 1 ? `0.5px solid ${T.border}` : "none",
          }}
        >
          <div
            style={{
              width: 43,
              height: 43,
              borderRadius: "50%",
              background: r.status === "已登录" ? "linear-gradient(145deg, #e8f5ff, #d4eaff)" : "linear-gradient(135deg, #74b9ff, #0984e3)",
              color: r.status === "已登录" ? T.dark : "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: r.status === "已登录" ? 22 : 14,
              fontWeight: 500,
              flexShrink: 0,
              border: r.status === "已登录" ? `2px solid ${T.green}` : "none",
              boxSizing: "border-box",
            }}
          >
            {r.status === "已登录" ? "👨" : r.avatar}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, color: T.text }}>
              {r.relation} {r.phone}
            </div>
            <div style={{ fontSize: 12, color: T.textSec, marginTop: 4 }}>
              {r.status === "未登录"
                ? "还未登录"
                : r.status === "已登录"
                  ? "爸爸已登录 · 邀请成功"
                  : r.status === "老用户"
                    ? "不计入邀请"
                    : "邀请成功"}
            </div>
          </div>
          {r.status === "未登录" && (
            <button
              type="button"
              style={{
                border: `1px solid ${T.brandMid}`,
                borderRadius: 80,
                padding: "5px 10px",
                fontSize: 12,
                background: "#fff",
                color: T.brand,
              }}
            >
              提醒
            </button>
          )}
        </div>
      ))}
    </>
  );
}

function cardShell(children, extraStyle = {}) {
  return (
    <div
      style={{
        margin: "0 16px 12px",
        borderRadius: 16,
        background: T.card,
        padding: 14,
        boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
        border: `0.5px solid ${T.border}`,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

/** 邀请活动主体：四宫格奖品 + 单人名额 + 记录（对齐参考布局） */
function InviteMainFlow({ inviteRef, inviteSucceeded, records }) {
  return (
    <>
      {cardShell(
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 17, fontWeight: 500, color: T.dark, lineHeight: 1.35 }}>
              邀请准爸爸&nbsp;&nbsp;得定制好礼
            </div>
            <span
              style={{
                flexShrink: 0,
                fontSize: 11,
                fontWeight: 500,
                color: "#fff",
                background: T.brand,
                padding: "4px 8px",
                borderRadius: 4,
                lineHeight: 1,
              }}
            >
              4选1
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {PRIZE_OPTIONS.map((p) => (
              <div
                key={p.id}
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "#ffeef4",
                  border: `0.5px solid rgba(255,77,136,0.12)`,
                }}
              >
                <div
                  style={{
                    aspectRatio: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: p.photo ? 6 : 10,
                    background: "linear-gradient(180deg, #fff8fb 0%, #ffe8f0 100%)",
                    overflow: "hidden",
                  }}
                >
                  {p.photo ? (
                    <img
                      src={p.photo}
                      alt={p.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        borderRadius: 6,
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <span style={{ fontSize: 40, lineHeight: 1 }} aria-hidden>
                      {p.emoji}
                    </span>
                  )}
                </div>
                <div style={{ padding: "8px 6px 10px", textAlign: "center" }}>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "#fff",
                      background: T.brand,
                      padding: "5px 10px",
                      borderRadius: 4,
                      maxWidth: "100%",
                      lineHeight: 1.29,
                    }}
                  >
                    {p.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>,
        { marginTop: 12 },
      )}

      <div ref={inviteRef}>
        {cardShell(
          <>
            <div style={{ fontSize: 15, fontWeight: 500, color: T.dark, marginBottom: 12 }}>邀请进度</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    margin: "0 auto",
                    borderRadius: "50%",
                    border: inviteSucceeded ? `2px solid ${T.green}` : `2px dashed ${T.brandMid}`,
                    background: inviteSucceeded ? "linear-gradient(145deg, #e9fcf7, #f5fffb)" : T.brandLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: inviteSucceeded ? 30 : 28,
                    fontWeight: 500,
                    color: inviteSucceeded ? undefined : T.brand,
                  }}
                >
                  {inviteSucceeded ? "👨" : "+"}
                </div>
                <div style={{ fontSize: 13, color: T.text, marginTop: 10, fontWeight: 500 }}>准爸爸</div>
                {inviteSucceeded ? (
                  <div style={{ fontSize: 13, color: T.green, marginTop: 12, lineHeight: 1.47 }}>
                    ✓ 已成功邀请 · 前往「我的奖品」点击立即定制填写相册
                  </div>
                ) : null}
              </div>
            </div>
          </>,
        )}
      </div>

      {cardShell(
        <>
          <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6, color: T.dark }}>邀请记录</div>
          <div style={{ fontSize: 12, color: T.textSec, marginBottom: 10 }}>{ACTIVITY_RANGE}</div>
          {records.length ? (
            <InviteRecordsList records={records} />
          ) : (
            <div style={{ fontSize: 13, color: T.textSec, padding: "14px 0", textAlign: "center", lineHeight: 1.47 }}>
              暂无邀请记录
            </div>
          )}
        </>,
      )}
    </>
  );
}

/** 邀请成功祝贺弹窗 */
function CongratsModal({ show, onConfirm }) {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="congrats-title"
        style={{
          background: T.card,
          borderRadius: 12,
          padding: "28px 22px 22px",
          maxWidth: 320,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: 44, lineHeight: 1 }} aria-hidden>
          🎉
        </div>
        <div id="congrats-title" style={{ fontSize: 18, fontWeight: 500, color: T.dark, marginTop: 14 }}>
          恭喜获得奖品
        </div>
        <div style={{ fontSize: 14, color: T.textSec, marginTop: 12, lineHeight: 1.47 }}>
          你已解锁好礼领取资格，可在「我的奖品」进入「定制奖品」完善相册与爸爸妈妈留言～
        </div>
        <button
          type="button"
          onClick={onConfirm}
          style={{
            marginTop: 22,
            width: "100%",
            height: 40,
            borderRadius: 80,
            border: "none",
            fontSize: 17,
            fontWeight: 500,
            color: "#fff",
            cursor: "pointer",
            background: `linear-gradient(90deg, ${T.coral}, ${T.brand})`,
          }}
        >
          我知道了
        </button>
      </div>
    </div>
  );
}

/** 「小纸条」式精致留言卡片 */
function LittleNoteSheet({ tone, textValue, onTextChange, readOnly, placeholder, extraBelowTextarea }) {
  const isPink = tone === "pink";
  const lineCol = isPink ? "rgba(255,77,136,0.1)" : "rgba(79,124,174,0.12)";
  const borderTint = isPink ? "rgba(255,77,136,0.18)" : "rgba(79,124,174,0.2)";
  const bg = isPink ? "#fff6f9" : "#f2f8fc";

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 8,
        padding: "14px 12px 12px",
        backgroundColor: bg,
        backgroundImage: `repeating-linear-gradient(transparent, transparent 19px, ${lineCol} 19px, ${lineCol} 20px)`,
        border: `1px solid ${borderTint}`,
        boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: -4,
          left: 6,
          fontSize: 20,
          lineHeight: 1,
          transform: "rotate(-14deg)",
          opacity: 0.5,
          filter: "grayscale(1)",
        }}
      >
        📎
      </span>

      <div style={{ paddingLeft: 18 }}>
        <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontSize: 12, color: T.textSec }}>
          TO: <span style={{ fontStyle: "normal", fontWeight: 500, color: T.dark }}>宝宝</span>
        </div>
      </div>

      <textarea
        value={textValue}
        readOnly={readOnly}
        onChange={onTextChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          minHeight: 72,
          marginTop: 6,
          border: "none",
          padding: "2px 4px",
          fontSize: 13,
          lineHeight: "20px",
          resize: "none",
          outline: "none",
          fontFamily: "'PingFang SC', -apple-system, sans-serif",
          color: T.text,
          background: "transparent",
          boxSizing: "border-box",
        }}
      />

      {extraBelowTextarea ? <div style={{ marginTop: 10 }}>{extraBelowTextarea}</div> : null}
    </div>
  );
}

function NineGrid({ filledIds, toggleFill }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
      {NINE_SLOTS.map((slot) => {
        const ok = filledIds.has(slot.id);
        return (
          <button
            key={slot.id}
            type="button"
            onClick={() => toggleFill(slot.id)}
            style={{
              border: "none",
              padding: 0,
              margin: 0,
              background: "transparent",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <div
              style={{
                borderRadius: 12,
                background: T.card,
                border: `0.5px solid ${T.border}`,
                boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  aspectRatio: "1",
                  background: ok ? "linear-gradient(145deg, #e9fcf7, #f5fffb)" : "#f5f5f7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: ok ? 22 : 28,
                  color: ok ? T.green : T.textSec,
                }}
              >
                {ok ? "✓" : "+"}
              </div>
              <div style={{ fontSize: 11, color: T.text, padding: "8px 4px 10px", lineHeight: 1.29 }}>{slot.label}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function CustomizePrizePage({
  onBack,
  filledIds,
  toggleFill,
  momWish,
  setMomWish,
  momSaved,
  setMomSaved,
  daddyJoined,
  dadWish,
  setDadWish,
  dadSaved,
  setDadSaved,
  onRemindDad,
}) {
  const gridComplete = filledIds.size >= 9;

  const canSubmitMom = momWish.trim() && !momSaved;
  const canSubmitDad = daddyJoined && dadWish.trim() && !dadSaved;
  const customizeDisabled = !canSubmitMom && !canSubmitDad;

  const handleCustomizeClick = () => {
    if (canSubmitMom) setMomSaved(true);
    if (canSubmitDad) setDadSaved(true);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 275,
        background: "#f7f7f7",
        display: "flex",
        justifyContent: "center",
        fontFamily: "'PingFang SC', -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 402,
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f7f7f7",
        }}
      >
        <header
          style={{
            flexShrink: 0,
            background: "#fff",
            borderBottom: "0.5px solid rgba(0,0,0,0.08)",
            padding: "12px 12px calc(12px + env(safe-area-inset-top))",
            paddingTop: "max(12px, env(safe-area-inset-top))",
            display: "grid",
            gridTemplateColumns: "44px 1fr 44px",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={onBack}
            aria-label="返回"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "none",
              background: T.brandLight,
              cursor: "pointer",
              fontSize: 22,
              lineHeight: 1,
              color: T.dark,
              justifySelf: "start",
            }}
          >
            ‹
          </button>
          <div style={{ fontSize: 17, fontWeight: 500, color: T.dark, textAlign: "center" }}>定制奖品</div>
          <span aria-hidden style={{ width: 44 }} />
        </header>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            padding: "12px 16px calc(24px + env(safe-area-inset-bottom))",
            background: "linear-gradient(180deg, #fff8fb 0%, #f7f7f7 28%)",
          }}
        >
          <div
            style={{
              borderRadius: 16,
              background: T.card,
              padding: 14,
              boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
              border: `0.5px solid ${T.border}`,
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 500, color: T.dark, marginBottom: 12 }}>孕期定制相册内容</div>

            {!gridComplete && (
              <div style={{ fontSize: 13, color: T.textSec, marginBottom: 12, lineHeight: 1.47 }}>
                以下为相册占位示意：任选 9 张你最想珍藏的孕期照片填入即可；全部上传后将自动生成排版预览。
              </div>
            )}

            <NineGrid filledIds={filledIds} toggleFill={toggleFill} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
              <div>
                <LittleNoteSheet
                  tone="pink"
                  textValue={momWish}
                  readOnly={momSaved}
                  onTextChange={(e) => {
                    if (e.target.value.length <= WISH_LIMIT) setMomWish(e.target.value);
                  }}
                  placeholder="把想说的话，写成给宝宝的第一张小纸条…"
                />
              </div>

              <div>
                <LittleNoteSheet
                  tone="blue"
                  textValue={dadWish}
                  readOnly={dadSaved || !daddyJoined}
                  onTextChange={(e) => {
                    if (e.target.value.length <= WISH_LIMIT) setDadWish(e.target.value);
                  }}
                  placeholder={daddyJoined ? "爸爸的心里话，也写成一张小纸条吧…" : "成功邀请后，由爸爸在这里填写"}
                  extraBelowTextarea={
                    <button
                      type="button"
                      onClick={onRemindDad}
                      style={{
                        width: "100%",
                        height: 36,
                        borderRadius: 80,
                        border: `1px solid ${T.brandMid}`,
                        background: "#fff",
                        color: T.brand,
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      提醒爸爸填写
                    </button>
                  }
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
            <button
              type="button"
              disabled={customizeDisabled}
              onClick={handleCustomizeClick}
              style={{
                border: "none",
                borderRadius: 80,
                padding: "10px 36px",
                minWidth: 200,
                height: 40,
                fontSize: 17,
                fontWeight: 500,
                background: T.brand,
                color: "#fff",
                opacity: customizeDisabled ? 0.5 : 1,
                cursor: customizeDisabled ? "default" : "pointer",
                boxShadow: customizeDisabled ? "none" : "0 8px 22px rgba(255,77,136,0.28)",
              }}
            >
              立即定制
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 我的奖品：全屏列表（左图 · 文案 · 立即定制） */
function MyPrizesPage({ open, onClose, prizes, onCustomize }) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="my-prizes-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 260,
        background: "#f7f7f7",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 402,
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'PingFang SC', -apple-system, sans-serif",
        }}
      >
        <header
          style={{
            flexShrink: 0,
            background: "#fff",
            borderBottom: `0.5px solid rgba(0,0,0,0.08)`,
            padding: "12px 12px calc(12px + env(safe-area-inset-top))",
            paddingTop: "max(12px, env(safe-area-inset-top))",
            display: "grid",
            gridTemplateColumns: "44px 1fr 76px",
            alignItems: "center",
            gap: 4,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="返回"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "none",
              background: T.brandLight,
              cursor: "pointer",
              fontSize: 22,
              lineHeight: 1,
              color: T.dark,
              justifySelf: "start",
            }}
          >
            ‹
          </button>
          <div id="my-prizes-title" style={{ fontSize: 17, fontWeight: 500, color: T.dark, textAlign: "center" }}>
            我的奖品
          </div>
          <button
            type="button"
            onClick={() => {}}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 14,
              fontWeight: 500,
              color: "#4f7cae",
              cursor: "pointer",
              padding: "8px 0",
              justifySelf: "end",
              whiteSpace: "nowrap",
            }}
          >
            我的订单
          </button>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px calc(20px + env(safe-area-inset-bottom))" }}>
          {!prizes.length ? (
            <div style={{ textAlign: "center", padding: "48px 12px", fontSize: 14, color: T.textSec, lineHeight: 1.47 }}>
              暂无奖品记录
              <div style={{ marginTop: 8 }}>邀请准爸爸成功后，将在此处生成待发奖品～</div>
            </div>
          ) : (
            prizes.map((p) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "#fff",
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 12,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                  border: `0.5px solid ${T.border}`,
                }}
              >
                <img
                  src={p.thumb}
                  alt=""
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 8,
                    objectFit: "cover",
                    flexShrink: 0,
                    background: "#f5f5f7",
                  }}
                  loading="lazy"
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 500, color: T.dark }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: T.textSec, marginTop: 8, lineHeight: 1.45 }}>
                    <div>获得时间：{p.obtainedAt}</div>
                    <div>失效时间：{p.expiresAt}</div>
                    <div style={{ marginTop: 2 }}>奖品来源：{p.source}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onCustomize(p)}
                  style={{
                    flexShrink: 0,
                    border: "none",
                    borderRadius: 80,
                    padding: "10px 14px",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#fff",
                    background: T.brand,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  立即定制
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function SheetModal({ show, onClose, title, children }) {
  if (!show) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 200 }} onClick={onClose} role="presentation">
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: 440,
          margin: "0 auto",
          background: T.card,
          borderRadius: "12px 12px 0 0",
          padding: "14px 16px max(18px, env(safe-area-inset-bottom))",
          maxHeight: "78vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div style={{ width: 36, height: 4, background: "#e8e8e8", borderRadius: 2, margin: "0 auto 12px" }} />
        <div style={{ fontSize: 17, fontWeight: 500, textAlign: "center", marginBottom: 12 }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const inviteAnchorRef = useRef(null);
  const [inviteSucceeded, setInviteSucceeded] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [filledIds, setFilledIds] = useState(() => new Set());
  const [momWish, setMomWish] = useState("");
  const [momSaved, setMomSaved] = useState(false);
  const [daddyJoined, setDaddyJoined] = useState(false);
  const [dadWish, setDadWish] = useState("");
  const [dadSaved, setDadSaved] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showPrizes, setShowPrizes] = useState(false);
  const [page, setPage] = useState("activity");
  const [records, setRecords] = useState(MOCK_RECORDS);
  const [wonPrizes, setWonPrizes] = useState([]);

  const handleInviteClick = () => {
    setShowCongrats(true);
  };

  const handleCongratsConfirm = () => {
    setShowCongrats(false);
    setInviteSucceeded(true);
    setDaddyJoined(true);
    setDadSaved(false);
    setDadWish("");
    setRecords([{ name: "王伟", relation: "准爸爸", phone: "138****8801", status: "已登录", avatar: "爸" }]);
    setWonPrizes([
      {
        id: "prize-photo-book",
        title: "孕期纪念照片书",
        thumb: `${import.meta.env.BASE_URL}activity/prize-photo-book.png`,
        obtainedAt: formatDateYMD(),
        expiresAt: "2026-12-31",
        source: "合体时光邀请活动",
      },
    ]);
  };

  const handleRemindDad = () => {
    setPage("activity");
    window.setTimeout(() => {
      inviteAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const toggleFill = (id) => {
    setFilledIds((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  return (
    <>
      <style>{`
        * { -webkit-tap-highlight-color: transparent; }
        textarea::placeholder { color: rgba(0,0,0,0.28); }
      `}</style>

      {page === "activity" ? (
      <div
        style={{
          minHeight: "100vh",
          boxSizing: "border-box",
          padding: "clamp(12px, 2.8vw, 28px) clamp(10px, 2.5vw, 24px)",
          paddingBottom: "max(clamp(12px, 2.8vw, 28px), env(safe-area-inset-bottom))",
          background: "linear-gradient(165deg, #dcdee6 0%, #c5c8d4 42%, #d4d6dd 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          fontFamily: "'PingFang SC', -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 402,
            borderRadius: 46,
            padding: 11,
            boxSizing: "border-box",
            background: "linear-gradient(145deg, #f4f4f6, #e0e1e6)",
            boxShadow: "0 26px 64px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          <div
            style={{
              borderRadius: 38,
              overflow: "hidden",
              background: "#f7f7f7",
              boxShadow: "inset 0 2px 14px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              maxHeight: "calc(100vh - clamp(28px, 7vw, 64px))",
              minHeight: "min(calc(100vh - 24px), 820px)",
            }}
          >
            <div
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                overflowX: "hidden",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
                background: "linear-gradient(180deg, #fff8fb 0%, #f7f7f7 24%)",
              }}
            >
              <InviteHero
                onBack={() => {
                  if (window.history.length > 1) window.history.back();
                }}
                onRules={() => setShowRules(true)}
                onPrizes={() => setShowPrizes(true)}
              />

              <InviteMainFlow inviteRef={inviteAnchorRef} inviteSucceeded={inviteSucceeded} records={records} />

            </div>

            {!inviteSucceeded ? (
              <div
                style={{
                  flexShrink: 0,
                  padding: "10px 14px calc(12px + env(safe-area-inset-bottom))",
                  background: "linear-gradient(180deg, rgba(247,247,247,0) 0%, rgba(247,247,247,0.97) 28%)",
                  borderTop: "0.5px solid rgba(0,0,0,0.05)",
                }}
              >
                <BigInviteButton onClick={handleInviteClick}>立即邀请准爸爸</BigInviteButton>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      ) : (
        <CustomizePrizePage
          onBack={() => setPage("activity")}
          filledIds={filledIds}
          toggleFill={toggleFill}
          momWish={momWish}
          setMomWish={setMomWish}
          momSaved={momSaved}
          setMomSaved={setMomSaved}
          daddyJoined={daddyJoined}
          dadWish={dadWish}
          setDadWish={setDadWish}
          dadSaved={dadSaved}
          setDadSaved={setDadSaved}
          onRemindDad={handleRemindDad}
        />
      )}

      <CongratsModal show={showCongrats} onConfirm={handleCongratsConfirm} />

      <SheetModal show={showRules} onClose={() => setShowRules(false)} title="活动规则">
        {[
          ["玩法", "邀请 1 位准爸爸完成助力；在「我的奖品」进入「定制奖品」页，你与爸爸可分别留言并填满九宫格孕期瞬间。"],
          ["奖品", "达标后可从以下好礼中 4 选 1：孕期纪念照片书、定制相册摆台、易点生活卡、美柚 7 天会员（细则以领奖页为准）。"],
          ["说明", "每位用户限一号参与；实物奖品涉及收货地址填写。"],
        ].map(([t, c]) => (
          <div key={t} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.brand, marginBottom: 4 }}>· {t}</div>
            <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.47 }}>{c}</div>
          </div>
        ))}
      </SheetModal>

      <MyPrizesPage
        open={showPrizes}
        onClose={() => setShowPrizes(false)}
        prizes={wonPrizes}
        onCustomize={() => {
          setShowPrizes(false);
          setPage("customize");
        }}
      />

    </>
  );
}
