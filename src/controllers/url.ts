import { Request, Response } from 'express';
import Url from '../models/url';
import { getNextSequence } from '../utils.ts/getNextSequence';
import { encodeBase62 } from '../utils.ts/base62';

export const urlShortner = async (req: Request, res: Response): Promise<any> => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: 'originalUrl is required' });

  try {
    const existing = await Url.findOne({ originalUrl }).lean();
    let shortenCode: string;
    if (existing) {
      shortenCode = existing.shortCode
    }
    else {
      const nextId = await getNextSequence('url_id');
      const shortCode = encodeBase62(nextId);
      const newUrl = new Url({ originalUrl, shortCode });
      await newUrl.save();
      shortenCode = newUrl.shortCode
    }
    const shortUrl = `${process.env.DOMAIN_URL}/shorten/${shortenCode}`
    res.render('form', { shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const resolveUrl = async (req: Request, res: Response): Promise<any> => {
  const code = req.params.id;
  const record = await Url.findOne({ shortCode: code });
  if (!record) return res.status(404).json({ error: 'URL not found' });
  return res.redirect(record.originalUrl);
};
