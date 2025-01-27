import type { NextApiRequest, NextApiResponse } from 'next'
import { getMDXBundle } from 'server/bundler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { gid } = req.query;

		const result = await getMDXBundle(gid as string);
		if (!result) {
			return res.status(400);
		}
		const {code, frontmatter} = result;
		res.status(200).json({code, frontmatter});			
	} catch (err) {
		res.status(400);
	}
}