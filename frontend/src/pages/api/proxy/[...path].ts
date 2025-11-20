import type { NextApiRequest, NextApiResponse } from 'next'

const target = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { path = [] } = req.query
	const urlPath = Array.isArray(path) ? path.join('/') : String(path)
	const url = `${target.replace(/\/$/, '')}/${urlPath}`

	try {
		const upstream = await fetch(url, {
			method: req.method,
			headers: {
				'content-type': req.headers['content-type'] || 'application/json',
			},
			body: req.method && ['POST','PUT','PATCH','DELETE'].includes(req.method) ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body)) : undefined,
		})
		const contentType = upstream.headers.get('content-type') || 'application/json'
		res.status(upstream.status)
		res.setHeader('content-type', contentType)
		const buf = await upstream.arrayBuffer()
		res.send(Buffer.from(buf))
	} catch (e: any) {
		res.status(502).json({ error: 'Proxy failed', detail: e?.message || String(e) })
	}
}
