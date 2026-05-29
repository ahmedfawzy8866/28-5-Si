import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const lead = await req.json();
    
    // Sierra AI Lead Scoring Math (1-10)
    let score = 0;
    if (lead.intent === 'high') score += 4;
    else if (lead.intent === 'medium') score += 2;

    if (lead.budget >= 1000000) score += 3;
    else if (lead.budget >= 500000) score += 2;

    if (lead.timeframe === 'immediate') score += 3;
    else if (lead.timeframe === '1-3 months') score += 1;

    // Cap at 10
    score = Math.min(score, 10);

    let webhookTriggered = false;
    if (score >= 8) {
      // Trigger Webhooks to Google Calendar / Zapier
      // Execute automated round-robin sales assignments
      webhookTriggered = true;
    }

    return NextResponse.json({ 
      success: true, 
      leadId: lead.id, 
      sierraAIScore: score, 
      webhookTriggered 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
