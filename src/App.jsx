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
  { name: "王伟", relation: "爸爸", phone: "138****8801", status: "未登录", avatar: "爸" },
];

const PRIZE_IMG = "/activity/prize-frame-sample.png";

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

function pillGhost(children, onClick) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: "none",
        borderRadius: 80,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 500,
        background: "rgba(0,0,0,0.06)",
        color: T.textSec,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function PageHeader({ onBack, onRules, onPrizes }) {
  return (
    <div
      style={{
        padding: "10px 12px 12px",
        background: T.card,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: 8,
        borderBottom: `0.5px solid ${T.border}`,
      }}
    >
      <button
        type="button"
        onClick={onBack}
        aria-label="返回"
        style={{
          justifySelf: "start",
          width: 36,
          height: 36,
          borderRadius: 8,
          border: "none",
          background: "rgba(0,0,0,0.05)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          lineHeight: 1,
          color: T.dark,
          padding: 0,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        ‹
      </button>
      <div
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: T.dark,
          lineHeight: 1.35,
          textAlign: "center",
          maxWidth: "56vw",
        }}
      >
        给即将到来的宝宝第一份礼物
      </div>
      <div style={{ justifySelf: "end", display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
        {pillGhost("我的奖品", onPrizes)}
        {pillGhost("活动规则", onRules)}
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
      <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 10, color: T.dark }}>邀请记录</div>
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
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #74b9ff, #0984e3)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            {r.avatar}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, color: T.text }}>
              {r.relation} {r.phone}
            </div>
            <div style={{ fontSize: 12, color: T.textSec, marginTop: 4 }}>
              {r.status === "未登录" ? "还未登录" : r.status === "老用户" ? "不计入邀请" : "邀请成功"}
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

/** 礼品模块：截图 + 邀请 + 邀请记录（同一卡片） */
function GiftHeroCard({ inviteRef, inviteSucceeded, records, onInvite }) {
  return (
    <div style={{ margin: "12px 16px 0" }}>
      <div
        ref={inviteRef}
        style={{
          borderRadius: 12,
          overflow: "hidden",
          background: T.card,
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          border: `0.5px solid ${T.border}`,
        }}
      >
        <div
          style={{
            padding: "14px 14px 10px",
            background: "linear-gradient(180deg, #fff5f8 0%, #ffffff 100%)",
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 500, color: T.dark, textAlign: "center", lineHeight: 1.35 }}>
            邀请准爸爸，免费得孕期定制相册
          </div>
        </div>
        <div style={{ padding: "0 14px 14px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                borderRadius: 8,
                overflow: "hidden",
                border: `0.5px solid ${T.border}`,
                width: "100%",
                maxWidth: 260,
                flexShrink: 0,
              }}
            >
              <img
                src={PRIZE_IMG}
                alt="孕期定制相册奖品示意"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "auto", maxHeight: 168, objectFit: "contain", display: "block" }}
              />
            </div>
          </div>
          <div style={{ marginTop: 12, textAlign: "center", fontSize: 15, fontWeight: 500, color: T.dark }}>
            孕期定制相册
            <span style={{ color: T.brand, marginLeft: 8 }}>价值¥39.9</span>
          </div>

          <div style={{ marginTop: 14 }}>
            {!inviteSucceeded ? (
              <BigInviteButton onClick={onInvite}>邀请准爸爸</BigInviteButton>
            ) : (
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: 8,
                  background: T.brandLight,
                  fontSize: 14,
                  fontWeight: 500,
                  color: T.brand,
                  textAlign: "center",
                  lineHeight: 1.47,
                }}
              >
                ✓ 已邀请成功 · 向下填写相册内容
              </div>
            )}
          </div>

          <div style={{ marginTop: 16, paddingTop: 14, borderTop: `0.5px solid ${T.border}` }}>
            <InviteRecordsList records={records} />
          </div>
        </div>
      </div>
    </div>
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
          你已解锁孕期定制相册填写资格，快去完善九宫格与爸爸妈妈留言吧～
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

function AlbumContentCard({
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
    <div style={{ margin: "12px 16px 0" }}>
      <div
        style={{
          borderRadius: 12,
          background: T.card,
          padding: 14,
          boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
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

      <div style={{ display: "flex", justifyContent: "center", marginTop: 16, paddingBottom: 4 }}>
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
          maxWidth: 480,
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
  const [records] = useState(MOCK_RECORDS);

  const handleInviteClick = () => {
    setShowCongrats(true);
  };

  const handleCongratsConfirm = () => {
    setShowCongrats(false);
    setInviteSucceeded(true);
    setDaddyJoined(true);
    setDadSaved(false);
    setDadWish("");
  };

  const handleRemindDad = () => {
    inviteAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        fontFamily: "'PingFang SC', -apple-system, sans-serif",
        maxWidth: 480,
        margin: "0 auto",
        paddingBottom: "calc(16px + env(safe-area-inset-bottom))",
      }}
    >
      <style>{`
        * { -webkit-tap-highlight-color: transparent; }
        textarea::placeholder { color: rgba(0,0,0,0.28); }
      `}</style>

      <PageHeader
        onBack={() => {
          if (window.history.length > 1) window.history.back();
        }}
        onRules={() => setShowRules(true)}
        onPrizes={() => setShowPrizes(true)}
      />

      <GiftHeroCard
        inviteRef={inviteAnchorRef}
        inviteSucceeded={inviteSucceeded}
        records={records}
        onInvite={handleInviteClick}
      />

      <CongratsModal show={showCongrats} onConfirm={handleCongratsConfirm} />

      {inviteSucceeded && (
        <AlbumContentCard
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

      <SheetModal show={showRules} onClose={() => setShowRules(false)} title="活动规则">
        {[
          ["玩法", "邀请准爸爸参加活动并加入亲友团；你与爸爸分别留言，同时填满九宫格孕期瞬间。"],
          ["奖品", "完成后包邮赠送孕期定制相册（示意见页面上方，价值¥39.9）。"],
          ["说明", "每位用户限一号参与；领奖细则以奖品页为准。"],
        ].map(([t, c]) => (
          <div key={t} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.brand, marginBottom: 4 }}>· {t}</div>
            <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.47 }}>{c}</div>
          </div>
        ))}
      </SheetModal>

      <SheetModal show={showPrizes} onClose={() => setShowPrizes(false)} title="我的奖品">
        <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.47, textAlign: "center", padding: "10px 0" }}>
          达标后在领奖入口兑换「孕期定制相册」并填写收货地址。
        </div>
      </SheetModal>
    </div>
  );
}
