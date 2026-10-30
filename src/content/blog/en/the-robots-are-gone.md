---
title: The robots are gone
description: 'For the first time, the HoldStrong prototype looks like HoldStrong: the Draugr and the Hrímthurs in 3D, the Einheri with a bow, a ballista on the tower, and new light over the snow. Plus an honest list of what is still a placeholder.'
date: 2026-10-30
---

![The GamePlay scene of HoldStrong in the work-in-progress build, late October 2026 — the tower of Rimehold from above in the snow, ringed by torches, the Einheri at its foot, enemies closing in from all sides, and the edge of the screen glowing red because the tower is being hit](/blog/the-robots-are-gone/hero.webp)

In the [bestiary post](/blog/what-the-ice-sends/) every enemy was still just a drawing, and I wrote that the Draugr and the Hrímthurs would be playable in the demo. So the question was which of them would make the jump to a real 3D model first. The honest answer turned out to be: two of them at once, and they brought company. In the last two weeks of September, every robot left the battlefield, and for the first time the prototype on my screen looks like the game I have been describing here.

So this post looks back at that change. It tells you what the prototype looked like until the end of September, what replaced it, and, just as importantly, what is still standing in for something better. The screenshots come from the current build of late October. That is why you will already see the pencil HUD and the outline from the [last post](/blog/drawn-in-pencil/) in them.

## The robot era

For months, the outpost Rimehold was defended by a modern soldier with an assault rifle. He was a demo character I had borrowed from an effects package, muzzle flash and ejected shells included. He was attacked by two kinds of robots, a weak one and a strong one, both built from a free sample robot that ships with the engine's starter content. On top of the tower stood a grenade launcher.

None of that was a mistake. A prototype is there to answer one question: is the loop fun? Robots answer that just as well as Draugr do, and they cost nothing. So I deliberately spent my time on what happens in the game rather than on what it looks like, and the placeholders did their job without complaint.

The downside is that you start to stop seeing them. After enough test runs, a robot with a little health bar *is* the Draugr in your head, and you no longer notice how far the screen is from the game you actually want to make. That is exactly why swapping them out felt like a bigger step than the number of commits suggests.

## The ice, now in 3D

![The Draugr and the Hrímthurs as 3D models in the work-in-progress build, late October 2026 — Draugr closing in on the tower from all sides in long ranks, with a Hrímthurs standing right at its wall](/blog/the-robots-are-gone/draugr-hrimthurs.webp)

The Draugr and the Hrímthurs are the two enemies the bestiary named for the demo, so they came first. The Draugr are Rimehold's own fallen defenders, raised again by the ice in the same mail they died in. The Hrímthurs is a rime giant who was asleep in the ice long before anyone lived in the north, and who only cares about tearing down the tower.

In the game, they simply took the place of the two robots. The weak robot became the Draugr and the strong robot became the Hrímthurs. All the behaviour underneath stayed the same, so the Draugr still attacks whatever is closest and the Hrímthurs still walks past you to get at the walls. Only now they finally look the part.

**How the models are made.** I want to be upfront about this. The models start in Tripo, a generative AI tool that produces a rough 3D model. As the only person working on HoldStrong, that gets me from a drawing to a usable figure far faster than I could manage on my own. What comes out of it is a starting point, not a finished model. I rework each one by hand in Blender and add my own textures. My concept art still decides what the creature is, and the AI only shortens the way from paper to screen.

The ragdolls did not survive the swap so gracefully. What went wrong there is a story of its own, and it will get its own post.

## The Einheri gets his bow

![The Einheri as a 3D model in the work-in-progress build, late October 2026 — a Viking in a horned helmet and fur mantle standing with his bow in the snow in front of the tower, the ballista on top of it, torches around and a night sky full of stars](/blog/the-robots-are-gone/einheri-bow.webp)

The soldier with the assault rifle is gone as well. In his place you now play the Einheri, the nameless dead warrior Odin sends back down to Rimehold every morning, as a Viking in the horned helmet from [his own post](/blog/the-man-without-a-name/).

There is one change I owe you an explanation for. In earlier posts he fought with an axe, and the concept art deliberately shows him empty-handed. In the game he now carries a bow, and the axe is gone. The reason is purely about gameplay. Combat in HoldStrong has been ranged since the start of the prototype, back when the rifle was still in his hands: you keep your distance, you pick targets around the tower, and you move to stay out of reach. A bow fits that far better than an axe. An axe would have meant either a completely different fight or a Viking who somehow hits things from across the snow. So the bow it is, and I think the game is better for it.

The tower got the same treatment. The grenade launcher is now a ballista, a giant crossbow mounted on a new walkway around the top of the tower. I gave that walkway a material that keeps snow on its upper surfaces, so it looks as if it has been standing out in the cold for a long time. It is a small detail, but I like it a great deal.

![The ballista on top of the tower in the work-in-progress build, late October 2026, seen from above — enemies closing in all around, and orange damage numbers from its hits piling up on the right](/blog/the-robots-are-gone/ballista.webp)

## Light and snow

New models in old light still look like a prototype, so the last step was the lighting. The main light is weaker now and casts hard shadows, and a second, softer fill light keeps the figures from disappearing into black on the side facing away from it. The torches on the tower burn noticeably brighter and further, which matters because they are the only warm colour in the whole picture. Above all of it there is now a proper night sky.

On top of that comes a layer of post-processing: a vignette that darkens the edges, a colour grading that treats shadows, midtones and highlights separately, and a very light colour fringing at the edge of the screen. None of it is dramatic on its own. Together, though, it makes the difference between "a level in an engine" and "a cold night at the edge of the world". You can see that most clearly in the picture of the Einheri in front of the tower further up.

## What is still placeholder

So that this post does not look like more progress than there is, here is what is still missing or provisional:

- **The Fenrir brood and the Icespearman** only existed as models when the robots left. Since 19 October both are in the prototype, and they came in together, as announced in the bestiary, because each only works with the other. By now they also run, bite and throw with animations of their own.
- **The Jötunn and the larva of Nidhöggr** have no model at all yet.
- **The lighting values** are a first pass and will change once more people have played it.

To sum it up: since the end of September, the two enemies of the [demo](/holdstrong/), the player character and the tower's weapon are real models, and the scene finally has a mood. The Fenrir brood and the Icespearman have joined them since, and the rest of the bestiary still lies ahead of me.

If one of the models looks wrong to you, or you have an opinion about the bow, tell me on <a href="https://discord.com/invite/RDk2UGcQ97" rel="noopener" data-analytics="outbound" data-analytics-id="discord" data-analytics-location="section">my Discord</a>. I would rather hear it now than after the next fifty test runs.
