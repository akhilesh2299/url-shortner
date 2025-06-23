import { Request, Response } from 'express';
import Url from '../models/url';
import { getNextSequence } from '../utils.ts/getNextSequence';
import { encodeBase62 } from '../utils.ts/base62';

export const urlShortner = async (req: Request, res: Response): Promise<any> => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: 'originalUrl is required' });
  
  try {
    const nextId = await getNextSequence('url_id');
    const shortCode = encodeBase62(nextId);

    const urlDoc = new Url({ originalUrl, shortCode });
    await urlDoc.save();

    res.status(201).json({
      shortUrl: `http://localhost:3000/url/${shortCode}`,
      shortCode,
      originalUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const resolveUrl = async (req: Request, res: Response) => {
  const { code } = req.params;
  const record = await Url.findOne({ shortCode: code });

  if (!record) return res.status(404).json({ error: 'URL not found' });

  // res.redirect(record.originalUrl); // if redirecting
  res.json({ originalUrl: record.originalUrl });
};
