// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {createClient} from '@sanity/client'

interface Data  {
  message: string,

}

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
}

const client = createClient(config)

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {_id, name, email, comment} = JSON.parse(req.body)

  try {
    await client.create({
      _type:'comment',
      post: {
        _type:'reference',
        _ref:_id
      },
      name,email,comment
    });

  } catch (err){
    res.status(500).json({message: 'Failure on submission'})
  }

  console.log(`Comment submitted`)
  res.status(200).json({message: 'Success on submission'})

}
