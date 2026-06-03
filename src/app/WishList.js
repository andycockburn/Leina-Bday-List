"use client";
import { useState, useEffect } from "react";

const gifts = [
  { id: 1, name: "A mini cam" },
  { id: 2, name: "A trip to Harry Potter World" },
  { id: 3, name: "LED lights" },
  { id: 4, name: "A SIX bottle" },
  { id: 5, name: "A crop top" },
  { id: 6, name: "Posters of every SIX character" },
  { id: 7, name: "Loom band refill" },
  { id: 8, name: "A mini claw machine" },
  { id: 9, name: "Perfume" },
  { id: 10, name: "Percy Jackson book series" },
  { id: 11, name: "A trip to a mall and some money to spend" },
  { id: 12, name: "Hand gel" },
  { id: 13, name: "A trip to Harry Potter and the Cursed Child with the cousins" },
  { id: 14, name: "Some stuff for Lettuce (her hamster)" },
  { id: 15, name: "A big pack of air dry clay" },
  { id: 16, name: "Harry Potter Yoto card – Book 4" },
  { id: 17, name: "Squishables / squish foods" },
  { id: 18, name: "Aqua bead refill" },
  { id: 19, name: "Hamster Bitzee" },
  { id: 20, name: "Barbie nail set" },
  { id: 21, name: "Glitter tattoos" },
  { id: 22, name: "Barbie – Babysitters Inc" },
  { id: 23, name: "Fluffy notebook with gems on the lock" },
  { id: 24, name: "Lego Friends hospital" },
  { id: 25, name: "A Raspberry Pi computer" },
  { id: 26, name: "Percy Jackson Yoto cards" },
];

export default function WishList() {
  const [claims, setClaims] = useState({});
  const [yourName, setYourName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [nameSet, setNameSet] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useState(null);
  const [pendingClaims, setPendingClaims] = useState({});

  useEffect(() => { loadClaims(); }, []);

  async function loadClaims() {
    setLoading(true);
    try {
      const res = await fetch("/api/claims");
      const data = await res.json();
      setClaims(data);
      setPendingClaims(data);
    } catch (e) {}
    setLoading(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pendingClaims),
      });
      setClaims(pendingClaims);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {}
    setSaving(false);
  }

  function handleSetName() {
    if (nameInput.trim()) {
      setYourName(nameInput.trim());
      setNameSet(true);
    }
  }

  function toggleGift(id) {
    if (!nameSet) return;
    const savedBy = claims[id];
    if (savedBy && savedBy !== yourName) return;
    const newPending = { ...pendingClaims };
    if (newPending[id] === yourName) {
      delete newPending[id];
    } else {
      newPending[id] = yourName;
      setFlash(id);
      setTimeout(() => setFlash(null), 800);
    }
    setPendingClaims(newPending);
  }

  const myPendingClaims = gifts.filter(g => pendingClaims[g.id] === yourName).length;
  const totalClaimed = Object.keys(pendingClaims).length;
  const hasUnsavedChanges = JSON.stringify(pendingClaims) !== JSON.stringify(claims);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fff5f2 0%, #fff0fa 50%, #f0f8ff 100%)",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      padding: "0 0 80px 0",
    }}>
      <div style={{
        background: "linear-gradient(135deg, #ff6b9d, #ff9a5c, #ffb347)",
        padding: "40px 20px 30px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 48, marginBottom: 4 }}>🎂✨🎁</div>
        <h1 style={{
          margin: 0,
          fontSize: "clamp(28px, 6vw, 48px)",
          fontWeight: 900,
          color: "white",
          textShadow: "0 2px 12px rgba(0,0,0,0.15)",
          letterSpacing: "-0.5px",
        }}>
          Leina's Birthday Wishlist
        </h1>
        <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.9)", fontSize: 16, fontWeight: 600 }}>
          She's turning 9! 🌟 Tap a gift to say you'll buy it, then hit Save
        </p>
        <div style={{
          marginTop: 14,
          display: "inline-block",
          background: "rgba(255,255,255,0.25)",
          borderRadius: 20,
          padding: "5px 16px",
          color: "white",
          fontSize: 14,
          fontWeight: 700,
        }}>
          {totalClaimed} of {gifts.length} gifts claimed
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px" }}>
        {!nameSet ? (
          <div style={{
            background: "white", borderRadius: 20, padding: "28px 24px",
            margin: "28px 0 20px", boxShadow: "0 4px 24px rgba(255,107,157,0.12)",
            textAlign: "center", border: "2px solid #ffe0ee",
          }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>👋</div>
            <p style={{ margin: "0 0 16px", fontWeight: 700, fontSize: 17, color: "#333" }}>
              Who are you? Enter your name to get started
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <input
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSetName()}
                placeholder="Your name..."
                style={{
                  padding: "12px 18px", borderRadius: 12, border: "2px solid #ffd0e8",
                  fontSize: 16, fontFamily: "inherit", outline: "none", width: 200, color: "#333",
                }}
              />
              <button onClick={handleSetName} style={{
                background: "linear-gradient(135deg, #ff6b9d, #ff9a5c)", color: "white",
                border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 16,
                fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>
                Let's go! 🎉
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            background: "white", borderRadius: 16, padding: "14px 20px", margin: "20px 0 16px",
            boxShadow: "0 2px 12px rgba(255,107,157,0.1)", display: "flex", alignItems: "center",
            justifyContent: "space-between", border: "2px solid #ffe0ee", flexWrap: "wrap", gap: 8,
          }}>
            <span style={{ fontWeight: 700, color: "#ff6b9d", fontSize: 15 }}>
              Hi {yourName}! 👋 You've claimed {myPendingClaims} gift{myPendingClaims !== 1 ? "s" : ""}
            </span>
            <button onClick={() => { setNameSet(false); setYourName(""); setNameInput(""); setPendingClaims(claims); }}
              style={{ background: "none", border: "1px solid #ffd0e8", borderRadius: 8, padding: "4px 12px", fontSize: 13, cursor: "pointer", color: "#999", fontFamily: "inherit" }}>
              Not you?
            </button>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: "#bbb", fontSize: 16 }}>Loading... 🎁</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {gifts.map(gift => {
              const claimedBy = pendingClaims[gift.id];
              const savedBy = claims[gift.id];
              const isMine = claimedBy === yourName;
              const isTaken = savedBy && savedBy !== yourName;
              const isFlashing = flash === gift.id;

              return (
                <div key={gift.id} onClick={() => toggleGift(gift.id)} style={{
                  background: isMine ? "linear-gradient(135deg, #fff0f6, #ffe8f5)" : isTaken ? "#f9f9f9" : "white",
                  border: isMine ? "2px solid #ff6b9d" : isTaken ? "2px solid #eee" : "2px solid #ffe0ee",
                  borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14,
                  cursor: nameSet && !isTaken ? "pointer" : "default",
                  transition: "all 0.15s ease",
                  transform: isFlashing ? "scale(1.02)" : "scale(1)",
                  boxShadow: isMine ? "0 4px 16px rgba(255,107,157,0.2)" : "0 2px 8px rgba(0,0,0,0.04)",
                  opacity: isTaken ? 0.72 : 1,
                }}>
                  <div style={{
                    minWidth: 30, height: 30, borderRadius: "50%",
                    background: isMine ? "#ff6b9d" : isTaken ? "#ddd" : "#ffe0ee",
                    color: isMine ? "white" : isTaken ? "#aaa" : "#ff6b9d",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 800,
                  }}>
                    {isMine ? "✓" : gift.id}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: isTaken ? "#aaa" : "#333", textDecoration: isTaken ? "line-through" : "none" }}>
                      {gift.name}
                    </span>
                  </div>
                  {claimedBy && (
                    <div style={{
                      background: isMine ? "#ff6b9d" : "#e0e0e0",
                      color: isMine ? "white" : "#777",
                      borderRadius: 20, padding: "4px 12px", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap",
                    }}>
                      {isMine ? `You 🎁` : `${claimedBy} 🎁`}
                    </div>
                  )}
                  {!claimedBy && nameSet && (
                    <div style={{ color: "#ffb0d0", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>
                      I'll get this →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {nameSet && (
          <div style={{ marginTop: 28, textAlign: "center" }}>
            <button onClick={handleSave} disabled={saving || !hasUnsavedChanges} style={{
              background: saved ? "linear-gradient(135deg, #4caf50, #66bb6a)" : hasUnsavedChanges ? "linear-gradient(135deg, #ff6b9d, #ff9a5c)" : "#e0e0e0",
              color: "white", border: "none", borderRadius: 16, padding: "16px 48px",
              fontSize: 18, fontWeight: 800, cursor: hasUnsavedChanges && !saving ? "pointer" : "default",
              fontFamily: "inherit", boxShadow: hasUnsavedChanges ? "0 6px 24px rgba(255,107,157,0.35)" : "none",
              transition: "all 0.2s ease",
            }}>
              {saving ? "Saving... ✨" : saved ? "Saved! 🎉" : hasUnsavedChanges ? "Save my choices 🎁" : "All saved ✓"}
            </button>
            {hasUnsavedChanges && (
              <p style={{ color: "#ff9a5c", fontSize: 13, fontWeight: 600, marginTop: 8 }}>
                Don't forget to save so others can see your picks!
              </p>
            )}
          </div>
        )}

        <p style={{ textAlign: "center", color: "#ccc", fontSize: 13, marginTop: 24 }}>
          Tap any unclaimed gift to say you'll buy it. Tap again to unclaim. Hit Save when done.
        </p>
      </div>
    </div>
  );
}
