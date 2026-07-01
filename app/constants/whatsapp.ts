const PHONE = "2348112476891";

export function wa(msg: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}

export const WA = {
  engineer: wa(
    "Hi Precious 👋 I just visited the OP5 Technologies website and I'd like to chat with an engineer about what you can build for my business."
  ),
  strategyCall: wa(
    "Hi Precious 👋 I saw the OP5 Technologies landing page and I'm interested in booking a free strategy call. I want to understand how the AI Sales Engine can work for my business."
  ),
  tier1: wa(
    "Hi Precious 👋 I'm interested in The Foundation package. I visited your website and I'd like to discuss this setup and get pricing details."
  ),
  tier2: wa(
    "Hi Precious 👋 I want to build The Sales Machine (Tier 2). I visited your website and I'm ready to discuss how this works and what it costs for my business."
  ),
  tier3: wa(
    "Hi Precious 👋 I'm interested in The Growth System. I visited your website and I'd like to apply for the enterprise setup and get pricing."
  ),
  talkDirectly: wa(
    "Hi Precious 👋 I went through the OP5 Technologies website and I still have some questions. Can we talk directly so you can help me figure out the right setup for my business?"
  ),
  stickyBar: wa(
    "Hi Precious 👋 I was on the OP5 Technologies website and had a question. Can I ask you something quickly?"
  ),
};
