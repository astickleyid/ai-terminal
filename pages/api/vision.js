import Anthropic from '@anthropic-ai/sdk';
const client=new Anthropic({apiKey:process.env.ANTHROPIC_API_KEY});
export const config={api:{bodyParser:{sizeLimit:'6mb'}}};
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).end();
  const{imageBase64,prompt}=req.body;
  try{const r=await client.messages.create({model:'claude-sonnet-4-20250514',max_tokens:1024,system:'You are an AI vision system. Analyze images clearly and concisely.',messages:[{role:'user',content:[{type:'image',source:{type:'base64',media_type:'image/jpeg',data:imageBase64}},{type:'text',text:prompt}]}]});
  res.status(200).json({reply:r.content.find(b=>b.type==='text')?.text??'Could not analyze.'});}
  catch(e){res.status(500).json({error:e.message});}
}