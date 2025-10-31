// /api/feishu/events.js
// 飞书 challenge 验证 & 卡片回调接收 —— 秒回版本（不做任何耗时处理）
module.exports = async function (req, res) {
  // 统一超时兜底：无论如何都尽快返回
  try {
    // 允许 GET/HEAD 探活，飞书可能先做可达性检查
    if (req.method === 'GET' || req.method === 'HEAD') {
      res.status(200).json({ ok: true });
      return;
    }

    if (req.method === 'POST') {
      // 有些平台会传 text/plain 或未解析的 body，这里做一次兼容解析
      let body = req.body;
      if (!body || typeof body === 'string') {
        try { body = JSON.parse(body || '{}'); } catch (_) { body = {}; }
      }

      // 1) URL 验证：原样返回 challenge（飞书会在保存时下发）
      if (body && body.challenge) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.status(200).send(JSON.stringify({ challenge: body.challenge }));
        return;
      }

      // 2) 普通事件：MVP 先立即 200，后续你再做入队异步处理
      res.status(200).json({ ok: true });
      return;
    }

    res.setHeader('Allow', 'GET, HEAD, POST');
    res.status(405).json({ error: 'Method Not Allowed' });
  } catch (e) {
    // 兜底，避免 500 造成飞书校验失败
    res.status(200).json({ ok: true });
  }
};


