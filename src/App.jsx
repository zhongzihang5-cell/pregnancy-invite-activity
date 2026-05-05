import { useState } from "react";

// ---- 设计 Token（美柚规范） ----
const T = {
  brand: "#ff4d88",
  brandLight: "#fff0f5",
  brandMid: "#ffb3ce",
  bg: "#f7f7f9",
  card: "#ffffff",
  dark: "#1a1a1a",
  text: "rgba(0,0,0,0.8)",
  textSec: "rgba(0,0,0,0.5)",
  green: "#00cc99",
  danger: "#ff4d4d",
  border: "rgba(0,0,0,0.06)",
  shadow: "0 2px 12px rgba(255,77,136,0.10)",
};

// ---- 数据 ----
const MOCK_RECORDS = [
  { name: "王伟", relation: "爸爸", phone: "138****8801", status: "未登录", avatar: "爸" },
  { name: "李强", relation: "爸爸", phone: "139****2233", status: "老用户", avatar: "爸" },
];

// ---- 子组件 ----

function TopBar({ onRule }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 16px 10px", background: "transparent", position: "relative", zIndex: 2,
    }}>
      <div style={{ fontSize: 17, fontWeight: 600, color: "#fff", letterSpacing: 0.5 }}>
        给宝宝的第一封信
      </div>
      <button type="button" onClick={onRule} style={{
        background: "rgba(255,255,255,0.22)", border: "none", borderRadius: 20,
        padding: "4px 12px", fontSize: 12, color: "#fff", cursor: "pointer",
      }}>规则</button>
    </div>
  );
}

function HeroBanner() {
  return (
    <div style={{
      margin: "0 16px 0", borderRadius: 16, overflow: "hidden",
      background: "linear-gradient(135deg, #ff6fa8 0%, #ff4d88 55%, #e8316e 100%)",
      padding: "24px 20px 20px", position: "relative",
    }}>
      {/* 装饰圆 */}
      <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
      <div style={{ position: "absolute", bottom: -30, left: -10, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginBottom: 6, letterSpacing: 1 }}>
          🌸 孕期限定活动
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.35, marginBottom: 6 }}>
          邀请准爸爸，一起写下<br />对宝宝的第一句话
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 16 }}>
          完成邀请，免费定制孕期纪念相框
        </div>

        {/* 奖品预览 */}
        <div style={{
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
          borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 10,
            background: "linear-gradient(135deg, #fff5f8, #ffd6e7)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0,
          }}>🖼️</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>孕期纪念相框</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>
              印有爸爸妈妈心愿 · 免费定制 · 包邮到家
            </div>
          </div>
          <div style={{
            marginLeft: "auto", background: "#fff", borderRadius: 20,
            padding: "4px 10px", fontSize: 12, color: T.brand, fontWeight: 600, flexShrink: 0,
          }}>查看详情</div>
        </div>
      </div>
    </div>
  );
}

function WishInput({ wish, setWish, submitted, onSubmit }) {
  const MAX = 30;
  return (
    <div style={{
      margin: "12px 16px 0", background: T.card, borderRadius: 16,
      padding: "16px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
    }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: T.dark, marginBottom: 4 }}>
        我对宝宝说…
      </div>
      <div style={{ fontSize: 12, color: T.textSec, marginBottom: 10 }}>写下你的期待，一起封存在这封信里</div>

      {submitted ? (
        <div style={{
          background: T.brandLight, borderRadius: 10, padding: "12px 14px",
          fontSize: 14, color: T.brand, lineHeight: 1.6, position: "relative",
        }}>
          <span style={{ position: "absolute", top: 8, right: 10, fontSize: 11, color: T.brandMid }}>已提交 ✓</span>
          {wish || "希望你健康快乐地来到这个世界～"}
        </div>
      ) : (
        <>
          <textarea
            value={wish}
            onChange={e => e.target.value.length <= MAX && setWish(e.target.value)}
            placeholder="告诉宝宝，你有多期待TA的到来…"
            style={{
              width: "100%", minHeight: 80, border: `1.5px solid ${wish ? T.brand : T.border}`,
              borderRadius: 10, padding: "10px 12px", fontSize: 14, color: T.text,
              resize: "none", outline: "none", fontFamily: "inherit", lineHeight: 1.6,
              background: wish ? T.brandLight : "#fafafa", boxSizing: "border-box",
              transition: "border-color 0.2s, background 0.2s",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <span style={{ fontSize: 12, color: T.textSec }}>{wish.length}/{MAX}</span>
            <button
              type="button"
              onClick={onSubmit}
              disabled={!wish.trim()}
              style={{
                background: wish.trim() ? T.brand : "#e0e0e0",
                color: "#fff", border: "none", borderRadius: 20,
                padding: "6px 18px", fontSize: 13, fontWeight: 600,
                cursor: wish.trim() ? "pointer" : "not-allowed", transition: "background 0.2s",
              }}
            >保存心愿</button>
          </div>
        </>
      )}
    </div>
  );
}

function InviteSlot({ daddyJoined }) {
  return (
    <div style={{
      margin: "12px 16px 0", background: T.card, borderRadius: 16,
      padding: "16px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
    }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: T.dark, marginBottom: 12 }}>邀请进度</div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* 妈妈 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "linear-gradient(135deg, #ffb3ce, #ff6fa8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, color: "#fff", fontWeight: 600, border: `2.5px solid ${T.brand}`,
          }}>妈</div>
          <div style={{ fontSize: 11, color: T.textSec }}>妈妈（你）</div>
          <div style={{ fontSize: 11, color: T.green, fontWeight: 600 }}>✓ 已参与</div>
        </div>

        {/* 连线 */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 4 }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: daddyJoined ? T.brand : (i < 2 ? T.brand : T.border),
              transition: "background 0.5s",
            }} />
          ))}
          <div style={{ fontSize: 16 }}>💌</div>
          {[0,1,2,3,4].map(i => (
            <div key={`r-${i}`} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: daddyJoined ? T.brand : T.border,
              transition: "background 0.5s",
            }} />
          ))}
        </div>

        {/* 爸爸 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: daddyJoined
              ? "linear-gradient(135deg, #74b9ff, #0984e3)"
              : "#f0f0f0",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: daddyJoined ? 20 : 22, color: daddyJoined ? "#fff" : "#ccc",
            fontWeight: 600,
            border: daddyJoined ? "2.5px solid #0984e3" : `2.5px dashed ${T.border}`,
            transition: "all 0.4s",
          }}>{daddyJoined ? "爸" : "＋"}</div>
          <div style={{ fontSize: 11, color: T.textSec }}>准爸爸</div>
          <div style={{ fontSize: 11, color: daddyJoined ? T.green : T.textSec, fontWeight: daddyJoined ? 600 : 400 }}>
            {daddyJoined ? "✓ 已加入" : "等待加入"}
          </div>
        </div>
      </div>

      {daddyJoined && (
        <div style={{
          marginTop: 14, background: "linear-gradient(135deg, #fff0f5, #ffe4ef)",
          borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontSize: 16 }}>🎉</span>
          <span style={{ fontSize: 13, color: T.brand, fontWeight: 600 }}>准爸爸已加入！快去看看你们的第一封信</span>
        </div>
      )}
    </div>
  );
}

function DaddyWish({ daddyJoined, daddyWish }) {
  if (!daddyJoined) return null;
  return (
    <div style={{
      margin: "12px 16px 0", background: T.card, borderRadius: 16,
      padding: "16px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
    }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: T.dark, marginBottom: 10 }}>
        准爸爸对宝宝说…
      </div>
      {daddyWish ? (
        <div style={{
          background: "#eff8ff", borderRadius: 10, padding: "12px 14px",
          fontSize: 14, color: "#0984e3", lineHeight: 1.6, position: "relative",
        }}>
          <span style={{ position: "absolute", top: 8, right: 10, fontSize: 11, color: "#74b9ff" }}>爸爸写好了 ✓</span>
          {daddyWish}
        </div>
      ) : (
        <div style={{
          background: "#fafafa", borderRadius: 10, padding: "14px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        }}>
          <span style={{ fontSize: 13, color: T.textSec }}>准爸爸还未写下心愿</span>
          <button type="button" style={{
            background: "none", border: `1px solid #74b9ff`, borderRadius: 20,
            padding: "5px 16px", fontSize: 12, color: "#0984e3", cursor: "pointer",
          }}>提醒TA写一写</button>
        </div>
      )}
    </div>
  );
}

function CardPreview({ wish, daddyWish, show, onClose }) {
  if (!show) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100,
    }} onClick={onClose} role="presentation">
      <div style={{
        background: T.card, borderRadius: "20px 20px 0 0", padding: "24px 20px 36px",
        width: "100%", maxWidth: 480,
        animation: "slideUp 0.25s ease",
      }} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="card-preview-title">
        <div id="card-preview-title" style={{ width: 36, height: 4, background: "#e0e0e0", borderRadius: 2, margin: "0 auto 20px" }} />

        {/* 卡片 */}
        <div style={{
          background: "linear-gradient(145deg, #fff9fb, #fff0f5)",
          border: `1.5px solid ${T.brandMid}`, borderRadius: 16, padding: "20px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -15, right: -15, fontSize: 60, opacity: 0.06 }}>💌</div>
          <div style={{ fontSize: 12, color: T.brandMid, letterSpacing: 2, marginBottom: 12, textAlign: "center" }}>
            — 给宝宝的第一封信 —
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: T.textSec, marginBottom: 4 }}>💗 妈妈说</div>
            <div style={{
              background: "#fff", borderRadius: 8, padding: "10px 12px",
              fontSize: 14, color: T.text, lineHeight: 1.7, borderLeft: `3px solid ${T.brand}`,
            }}>
              {wish || "希望你健康快乐地来到这个世界～"}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, color: T.textSec, marginBottom: 4 }}>💙 爸爸说</div>
            <div style={{
              background: "#fff", borderRadius: 8, padding: "10px 12px",
              fontSize: 14, color: daddyWish ? T.text : T.textSec, lineHeight: 1.7,
              borderLeft: "3px solid #74b9ff",
            }}>
              {daddyWish || "等待爸爸写下心愿…"}
            </div>
          </div>

          <div style={{ textAlign: "right", fontSize: 11, color: T.textSec, marginTop: 12 }}>
            小柚 · {new Date().toLocaleDateString('zh-CN')}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button type="button" style={{
            flex: 1, padding: "12px", borderRadius: 24, border: `1.5px solid ${T.brand}`,
            background: "#fff", color: T.brand, fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>保存图片</button>
          <button type="button" style={{
            flex: 1.5, padding: "12px", borderRadius: 24, border: "none",
            background: T.brand, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>去定制相框</button>
        </div>
      </div>
    </div>
  );
}

function InviteRecord({ records }) {
  if (!records.length) return null;
  return (
    <div style={{
      margin: "12px 16px 0", background: T.card, borderRadius: 16,
      padding: "16px", boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
    }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: T.dark, marginBottom: 12 }}>邀请记录</div>
      {records.map((r, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
          borderBottom: i < records.length - 1 ? `1px solid ${T.border}` : "none",
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "linear-gradient(135deg, #74b9ff, #0984e3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, color: "#fff", fontWeight: 600, flexShrink: 0,
          }}>{r.avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: T.text, fontWeight: 500 }}>{r.relation} {r.phone}</div>
            <div style={{
              fontSize: 12, marginTop: 2,
              color: r.status === "未登录" ? "#f39c12" : r.status === "老用户" ? T.textSec : T.green,
            }}>
              {r.status === "未登录" ? "还未登录" : r.status === "老用户" ? "美柚老用户不计" : "新用户邀请成功"}
            </div>
          </div>
          {r.status === "未登录" && (
            <button type="button" style={{
              background: "none", border: `1px solid ${T.brandMid}`, borderRadius: 20,
              padding: "4px 12px", fontSize: 12, color: T.brand, cursor: "pointer", flexShrink: 0,
            }}>提醒登录</button>
          )}
        </div>
      ))}
    </div>
  );
}

function RuleModal({ show, onClose }) {
  if (!show) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "flex-end", zIndex: 200,
    }} onClick={onClose} role="presentation">
      <div style={{
        background: T.card, borderRadius: "20px 20px 0 0", padding: "20px 20px 36px",
        width: "100%", maxWidth: 480, maxHeight: "75vh", overflowY: "auto",
      }} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="rule-modal-title">
        <div style={{ width: 36, height: 4, background: "#e0e0e0", borderRadius: 2, margin: "0 auto 16px" }} />
        <div id="rule-modal-title" style={{ fontSize: 16, fontWeight: 700, color: T.dark, marginBottom: 14, textAlign: "center" }}>活动规则</div>
        {[
          ["邀请规则", "怀孕用户成功邀请1位「爸爸」身份的新注册用户关注胎宝宝，即可获得孕期纪念相框定制资格。"],
          ["新用户定义", "活动期间首次注册并登录美柚App，且亲友关系设置为「爸爸」的用户。曾在美柚旗下应用注册均视为老用户，不计入邀请成功。"],
          ["奖品定制", "定制内容包含爸爸妈妈心愿文字及孕期照片。定制资格长期有效，无截止日期，随时可进入定制流程。"],
          ["其他", "每个用户仅可使用一个账号参与活动（同一设备同一手机号视为同一账号）。如有疑问请联系在线客服：我tab-设置-帮助与反馈-在线客服。"],
        ].map(([title, content]) => (
          <div key={title} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.brand, marginBottom: 4 }}>· {title}</div>
            <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7 }}>{content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- 主页面 ----
export default function App() {
  const [wish, setWish] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [daddyJoined, setDaddyJoined] = useState(false);
  const [daddyWish, setDaddyWish] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [showRule, setShowRule] = useState(false);
  const [records] = useState(MOCK_RECORDS);

  // 模拟准爸爸加入
  const handleDaddyJoin = () => {
    setDaddyJoined(true);
    setTimeout(() => setDaddyWish("宝贝，爸爸已经迫不及待想见到你了！"), 1500);
  };

  return (
    <div style={{
      minHeight: "100vh", background: T.bg,
      fontFamily: "'PingFang SC', -apple-system, 'Noto Sans SC', sans-serif",
      maxWidth: 480, margin: "0 auto", position: "relative", overflowX: "hidden",
    }}>
      <style>{`
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        * { -webkit-tap-highlight-color: transparent; }
        textarea::placeholder { color: rgba(0,0,0,0.3); }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* 顶部渐变背景 */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 200,
        background: "linear-gradient(180deg, #ff4d88 0%, #ff6fa8 60%, #f7f7f9 100%)",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, paddingBottom: 100 }}>
        <TopBar onRule={() => setShowRule(true)} />
        <HeroBanner />
        <WishInput wish={wish} setWish={setWish} submitted={submitted} onSubmit={() => setSubmitted(true)} />
        <InviteSlot daddyJoined={daddyJoined} />
        <DaddyWish daddyJoined={daddyJoined} daddyWish={daddyWish} />
        <InviteRecord records={records} />

        {/* 查看卡片（已完成时） */}
        {daddyJoined && (
          <div style={{ margin: "12px 16px 0" }}>
            <button type="button" onClick={() => setShowCard(true)} style={{
              width: "100%", padding: "14px", borderRadius: 12,
              background: "linear-gradient(90deg, #ff6fa8, #ff4d88)",
              border: "none", color: "#fff", fontSize: 15, fontWeight: 700,
              cursor: "pointer", boxShadow: "0 4px 16px rgba(255,77,136,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              💌 查看我们的第一封信
            </button>
          </div>
        )}

        {/* 调试按钮（演示用） */}
        {!daddyJoined && (
          <div style={{ margin: "16px 16px 0", textAlign: "center" }}>
            <button type="button" onClick={handleDaddyJoin} style={{
              background: "none", border: `1px dashed ${T.brandMid}`, borderRadius: 20,
              padding: "6px 18px", fontSize: 12, color: T.textSec, cursor: "pointer",
            }}>[ 演示：模拟准爸爸加入 ]</button>
          </div>
        )}
      </div>

      {/* 底部吸底按钮 */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480, padding: "12px 16px 24px",
        background: "linear-gradient(transparent, rgba(247,247,249,0.98) 30%)",
        zIndex: 50,
      }}>
        {!daddyJoined ? (
          <button type="button" style={{
            width: "100%", padding: "15px", borderRadius: 40,
            background: `linear-gradient(90deg, #ff6fa8, ${T.brand})`,
            border: "none", color: "#fff", fontSize: 16, fontWeight: 700,
            cursor: "pointer", boxShadow: "0 6px 20px rgba(255,77,136,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <span style={{ fontSize: 18 }}>💬</span> 立即邀请准爸爸
          </button>
        ) : (
          <button type="button" style={{
            width: "100%", padding: "15px", borderRadius: 40,
            background: `linear-gradient(90deg, #ff6fa8, ${T.brand})`,
            border: "none", color: "#fff", fontSize: 16, fontWeight: 700,
            cursor: "pointer", boxShadow: "0 6px 20px rgba(255,77,136,0.4)",
          }}>
            🎁 免费定制相框
          </button>
        )}
      </div>

      <CardPreview wish={wish} daddyWish={daddyWish} show={showCard} onClose={() => setShowCard(false)} />
      <RuleModal show={showRule} onClose={() => setShowRule(false)} />
    </div>
  );
}
