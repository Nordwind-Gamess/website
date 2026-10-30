---
title: Four days for one lightning strike
description: 'How Thor got a lightning strike from the sky: a timeline of light, bolt, impact and sound, cut to the beats of a thunder recording. Plus what I built and threw out again, and four things the first version got wrong.'
date: 2026-11-06
---

![Mjölnir's Fall in the work-in-progress build, late October 2026 — a white lightning bolt with a dark ink outline strikes the Viking beside the tower of Rimehold, the snow around him lit up bright, the rest of the battlefield dark under the storm](/blog/one-lightning-strike/hero.webp)

In the [post about the new pencil look](/blog/drawn-in-pencil/) I listed an "Unknown Gift" for Thor as one of the placeholders in the skill tree. That slot is filled now. Thor, the god of thunder, has a second ability called Mjölnir's Fall, named after his hammer. When you use it, a lightning bolt comes down out of the sky into the Einheri, the nameless Viking you play, and a shockwave runs out from him through every enemy close by.

On paper that is one sentence. In the game it took me four days, from 24 to 26 October. The reason is that I did not want an effect that plays when you press a key. I wanted an event: the sky goes dark, something is coming, and then it hits. This post is about how I built that, what I threw away on the way, and the four things the first version got wrong.

## A strike is a timeline, not an effect

The most useful decision I made early on was to stop thinking of the strike as one effect. It is a short piece of film with five phases, and every part of the game that takes part in it follows the same clock.

1. **Darkening.** The storm swallows the light. I do that through the sun itself, so the whole scene goes dark and not just a filter on top of it.
2. **Pre-flashes.** One or two flashes from changing directions in the sky, with the shadows of the clouds sweeping across the ground.
3. **Hush.** For 0.3 seconds it gets even darker. It is the moment you hold your breath.
4. **Strike.** A white flash, the bolt, the impact, and then the return strokes, when the channel lights up once or twice more.
5. **Recovery.** Over 1.2 seconds everything fades back to normal.

All in all, the strike lands about two and a half seconds after you press the key, and about four seconds after the key press the scene is back to normal. That sounds long for an action game. In practice those two and a half seconds are what make it feel like a god is answering, so I kept them.

## The bolt

The bolt itself is a jagged line with branches. I build it fresh for every strike by taking a straight line, pushing its midpoint sideways, and then doing the same for both halves, again and again. That is an old and simple trick, and it gives exactly the shape your eye expects from lightning.

It does not appear all at once. First a thin leader runs down from the sky to the ground. Only when it arrives does the main stroke flare up, and it flares again with every return stroke. In the first version the leader took 90 milliseconds. Later, once I had the final sounds, it took exactly as long as the sizzle at the start of the bolt sound.

To fit the game's look, the bolt has a white core, a blue glow and a black ink outline, like everything else in the world since the pencil update. The outline caused my first small bug: where the bolt folded back on itself or a branch met it, the outline of one piece covered the white core of another, and the bolt looked cut into pieces. Now every outline is drawn before every core, so a core is always on top. The bolt also gets thinner towards the ground, down to 30 % of its width at the point where it hits. I like that detail a lot, because it makes the bolt look like it is coming from somewhere far above.

## The punch

The moment of the hit has to feel like a hit. Three things happen at once.

![The impact frame of Mjölnir's Fall in the work-in-progress build, late October 2026 — on the left the battlefield flipped to a negative for a split second, on the right the same frame in pure black and white ink](/blog/one-lightning-strike/impact-frame.webp)

- **A hit stop.** For a tenth of a second the game runs at 2 % of its normal speed, so it almost stands still.
- **An impact frame.** For that moment the picture flips to a negative and then to pure black and white ink. That is a technique from anime, where the hardest hits often get a single frame like this. It fits the drawn look of HoldStrong very well, and I had wanted to use it for a long time.
- **A camera kick.** The camera jumps up and in, the field of view punches in, and both spring back. On top of that comes a short burst of colour fringing at the edges of the picture.

I build HoldStrong in Unity with its Universal Render Pipeline. For the camera shake I use Feel, a toolkit by More Mountains made for exactly this kind of "game feel" work.

## The ground

A bolt that hits snow should leave something behind. The ground part is built in layers.

![The ground after Mjölnir's Fall in the work-in-progress build, late October 2026 — a crater in the snow around the Viking, a black scorch in its centre with a thin, branching glowing figure burnt into it, and a few sparks cooling to red](/blog/one-lightning-strike/ground.webp)

- **A crater.** The strike presses a crater into the snow. I could reuse the technique for that from the ballista on the tower, whose bolts have been leaving craters since 23 October.
- **A snow burst.** The heavy version of the ballista's snow burst, scaled up and played at the Viking's feet.
- **A shockwave.** It runs out from the Viking. Enemies it kills are thrown away as ragdolls, the loose bodies that fall and tumble like puppets. Enemies that survive are pushed back and stunned.
- **A scorch.** A black mark in the middle of the crater, with soot specks around it.
- **A burn figure.** My favourite layer. On 25 October I first tried a few glowing straight cracks in the scorch. They looked like a broken plate, so I replaced them the same day with a Lichtenberg figure, the branching pattern electricity burns into wood. It is generated new for every strike, its front eats its way outwards in 0.35 seconds, and then it slowly cools from orange in the centre to deep red at the tips.
- **Sparks.** Forty glowing sparks are thrown out of the point of impact. They fly in arcs, bounce off the crater floor and go out.

## Timing it to a thunder recording

For the first two days the strike had placeholder sounds in five layers: a distant rumble with the first pre-flash, a crackle when the leader leaves the sky, and at the strike a sharp crack, a low boom and a long roll of thunder. It sounded fine, but the sound followed the picture. On 25 October I turned that around. I now use two thunder recordings and three bolt sounds, and the thunder decides when things happen.

![The strike timeline over the waveform of the thunder recording, measured late October 2026 — quiet rumbles at 0.62, 0.75 and 0.83 seconds become pre-flash 1, a rumble at 1.93 seconds becomes pre-flash 2, the loud clap at 2.48 seconds is the strike, with return strokes at the second clap and the swell after it](/blog/one-lightning-strike/timeline-en.svg)

To get there I analysed the waveform of the thunder in steps of ten milliseconds and wrote down where every rumble and every clap begins. The picture above shows what came out. The three quiet rumbles at 0.62, 0.75 and 0.83 seconds are so close together that they become one pre-flash with three pulses. The rumble at 1.93 seconds is the second pre-flash. The clap that breaks at 2.48 seconds is the strike, and the second clap and the swell after it are the return strokes.

There is one catch, and it is the hit stop. While the game nearly stands still for a tenth of a second, the recording keeps playing. So the sounds run on audio time and are not held back by the hit stop, and the return strokes in the picture are pulled forward by exactly the time the hit stop swallows. Otherwise the light would lag behind the thunder.

The bolt sounds are scheduled so that their hit lands on the strike as well. Their sizzle at the start is the leader, which is why the bolt now runs down for exactly as long as it sizzles. The second thunder recording rolls quietly underneath the whole time, like a storm far away. That was the moment the strike started to feel right to me: when the light and the sound came from the same source.

## What I built and threw away

Not everything I built stayed in. Two things went out again, both on 24 October.

**God rays.** My first idea was shafts of light falling through gaps in the clouds into a storm haze, with every flash briefly drawing those shafts into the air. I built a haze above the target and a cloud texture with sharp gaps for the sun to shine through. After a second attempt to make the shafts actually visible, I took the haze, the cloud texture and the preview tool out again that same day. Soft, realistic shafts of light simply did not fit the drawn look of the game, so I put the work into the bolt itself instead.

**Glare quads.** The first bolt had a glare at its point of impact and a glow on the ground, both drawn as flat soft-edged shapes. In a realistic game that works. In HoldStrong, with its toon look and ink outlines, they read as hard white blobs. Now a point light does that job, and it lights the snow around the Viking instead of covering it.

## Four things the first version got wrong

**A burn you could not see.** The camera hangs about 25 metres above the battlefield, and from there one metre is about 55 to 60 pixels on screen. My first burn figure had a radius of 0.9 metres and lines 3 centimetres wide. On screen that was one to two pixels. I had built a detailed figure that nobody could see. Now it has a radius of 1.5 metres and lines 7 centimetres wide, and its red glow is much weaker, because that was far too strong.

![The burn figure in the work-in-progress build, late October 2026 — on the left the first version, a faint reddish smudge in the crater, on the right the final version, a clearly visible branching figure glowing orange in the centre](/blog/one-lightning-strike/burn-compare.webp)

**A burn that flickered.** To keep the crater open, I pressed it into the snow again every 0.2 seconds. But the snow fills craters back in, and in between the floor grew back a few centimetres. The burn lay just above it, so it was covered and uncovered five times a second. Now the crater is pressed in every frame, right after the snow has filled in, and the burn lies a little higher.

**Ragdolls that came apart.** The shockwave gave a killed enemy its whole push on the one bone closest to the impact. That bone flew off and stretched the joints, so the body was torn apart in a way I had not intended. Now the shockwave gives every bone of the body the same speed, so it flies away as a whole.

**A strike frozen onto the skill tree.** The strike runs on game time. When a round ended in the middle of a strike, the pause froze it, and the skill tree opened on top of a black-and-white impact frame with colour fringing. Now the end of a round waits until every strike has fully played and the scene is back to normal.

## What it does in the game

As of late October, this is what Mjölnir's Fall does. It is a star in Thor's branch of the skill tree, in the slot that was the "Unknown Gift". Once bought, it is its own skill next to Thor's [chain lightning](/blog/demo-moves-to-november/). It has a cooldown of 20 seconds, and it does not hurt the Viking. The shockwave hits every enemy within 5 metres for three times Thor's lightning damage in the centre, falling to 40 % at the edge.

In its very first version it replaced the chain lightning. The same day I changed that, so that Thor has two skills instead of one. That came out of a bigger change to how skills work, which will get its own post.

To keep this honest, here is what is still a placeholder:

- **The icon.** Mjölnir's Fall has no pencil icon yet. Until it has one, its slot shows its name.
- **The numbers.** Damage, radius and cooldown are a first pass and have not been through balancing.

<!-- CLIP: the full strike, 3-4 s, from the press of the key to the recovery. -->

To sum it up: one lightning strike took four days, because it is not one thing but a dozen small ones that all have to follow the same clock. The thing I learned most clearly is that the clock should come from the sound. Since the thunder decides when the light comes, the strike no longer feels like an effect. It feels like weather.

If you want to tell me what you think of the strike, or of how long it takes before it lands, come over to <a href="https://discord.com/invite/RDk2UGcQ97" rel="noopener" data-analytics="outbound" data-analytics-id="discord" data-analytics-location="section">my Discord</a>.
