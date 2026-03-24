import Anthropic from '@anthropic-ai/sdk';
const client=new Anthropic({apiKey:process.env.ANTHROPIC_API_KEY});
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).end();
  const{messages}=req.body;
  try{const r=await client.messages.create({model:'claude-sonnet-4-20250514',max_tokens:1024,system:'You are an intelligent AI assistant. Be helpful, direct, clear.',messages});
  res.status(200).json({reply:r.content.find(b=>b.type==='text')?.text??'No response.'});}
  catch(e){res.status(500).json({error:e.message});}
}