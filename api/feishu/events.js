// 飞书事件订阅 challenge 验证与探活
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
      res.status(200).json({ ok: true });
      return;
    }
    res.setHeader("Allow", "GET, POST");
    res.status(405).json({ error: "Method Not Allowed" });
  } catch (e) {
    res.status(200).json({ ok: true });
  }
}

