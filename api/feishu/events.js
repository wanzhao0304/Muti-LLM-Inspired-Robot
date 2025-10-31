// 最小可用的 Vercel Serverless Function：飞书事件订阅 challenge 验证与探活
// GET  /api/feishu/events  → 200 JSON（探活）
// POST /api/feishu/events  + {"challenge":"..."} → 原样返回 {"challenge":"..."}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      res.status(200).json({ ok: true, message: "feishu events endpoint is alive" });
      return;
    }
    if (req.method === "POST") {
      const body = req.body || {};
      const challenge = body && body.challenge;
      if (challenge) {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.status(200).send(JSON.stringify({ challenge }));
        return;
      }
      // 其它事件先简单 200，后续再做入队异步处理
      res.status(200).json({ ok: true });
      return;
    }
    res.setHeader("Allow", "GET, POST");
    res.status(405).json({ error: "Method Not Allowed" });
  } catch (e) {
    // 兜底，避免 500 影响飞书校验
    res.status(200).json({ ok: true });
  }
}
