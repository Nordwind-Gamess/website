---
title: Vier Tage für einen Blitz
description: 'Wie Thor einen Blitzschlag vom Himmel bekommen hat: ein Ablauf aus Licht, Blitz, Einschlag und Ton, geschnitten auf die Schläge einer Donneraufnahme. Dazu, was ich gebaut und wieder weggeworfen habe, und vier Dinge, die die erste Version falsch gemacht hat.'
date: 2026-11-06
---

![Mjölnirs Fall im Work-in-Progress-Build, Ende Oktober 2026 — ein weißer Blitz mit dunkler Tusche-Outline schlägt neben dem Turm von Rimehold in den Wikinger ein, der Schnee um ihn hell erleuchtet, der Rest des Schlachtfelds dunkel unter dem Sturm](/blog/one-lightning-strike/hero.webp)

Im [Post über den neuen Bleistift-Look](/de/blog/drawn-in-pencil/) stand bei den Platzhaltern im Skill-Tree ein „Unbekanntes Geschenk“ für Thor. Dieser Platz ist jetzt besetzt. Thor, der Gott des Donners, hat eine zweite Fähigkeit, die nach seinem Hammer heißt: Mjölnirs Fall. Wenn du sie einsetzt, fährt ein Blitz vom Himmel in den Einheri, den namenlosen Wikinger, den du spielst, und eine Schockwelle läuft von ihm aus durch alle Gegner in der Nähe.

Auf dem Papier ist das ein Satz. Im Spiel hat es mich vier Tage gekostet, vom 24. bis zum 26. Oktober. Der Grund ist, dass ich keinen Effekt wollte, der abspielt, wenn man eine Taste drückt. Ich wollte ein Ereignis: Der Himmel wird dunkel, etwas kommt, und dann schlägt es ein. In diesem Post erzähle ich euch, wie ich das gebaut habe, was ich unterwegs weggeworfen habe und welche vier Dinge die erste Version falsch gemacht hat.

## Ein Blitz ist ein Ablauf, kein Effekt

Die nützlichste Entscheidung habe ich früh getroffen: Ich habe aufgehört, den Blitz als einen einzelnen Effekt zu denken. Er ist ein kurzes Stück Film mit fünf Phasen, und jeder Teil des Spiels, der daran beteiligt ist, folgt derselben Uhr.

1. **Verdunkeln.** Der Sturm schluckt das Licht. Das mache ich über die Sonne selbst, damit die ganze Szene dunkel wird und nicht nur ein Filter darüber liegt.
2. **Vorblitze.** Ein oder zwei Blitze aus wechselnden Richtungen am Himmel, und die Schatten der Wolken ziehen dabei über den Boden.
3. **Stille.** Für 0,3 Sekunden wird es noch dunkler. Das ist der Moment, in dem man den Atem anhält.
4. **Einschlag.** Ein weißer Blitz, der Blitzkanal, der Einschlag und danach die Rückschläge, bei denen der Kanal noch ein- oder zweimal aufleuchtet.
5. **Erholung.** In 1,2 Sekunden wird alles wieder normal.

Insgesamt schlägt der Blitz etwa zweieinhalb Sekunden nach dem Tastendruck ein, und rund vier Sekunden nach dem Tastendruck ist die Szene wieder normal. Für ein Actionspiel klingt das lang. Im Spiel sind genau diese zweieinhalb Sekunden das, was sich anfühlt, als würde ein Gott antworten. Deshalb habe ich sie behalten.

## Der Blitzkanal

Der Blitz selbst ist eine gezackte Linie mit Verästelungen. Ich baue ihn für jeden Einschlag neu: Ich nehme eine gerade Linie, schiebe ihren Mittelpunkt zur Seite und mache dann dasselbe mit beiden Hälften, immer wieder. Das ist ein alter und einfacher Trick, und er ergibt genau die Form, die das Auge von einem Blitz erwartet.

Er erscheint nicht auf einmal. Zuerst läuft eine dünne Vorentladung vom Himmel zum Boden. Erst wenn sie unten ankommt, flammt der Hauptkanal auf, und mit jedem Rückschlag flammt er noch einmal auf. In der ersten Version brauchte die Vorentladung 90 Millisekunden. Später, mit den finalen Sounds, brauchte sie genau so lange wie das Zischen am Anfang des Blitz-Sounds.

Damit er zum Look des Spiels passt, hat der Blitz einen weißen Kern, ein blaues Leuchten und eine schwarze Tusche-Outline, wie seit dem Bleistift-Update alles in der Welt. Die Outline hat meinen ersten kleinen Bug verursacht: Wo der Blitz in sich zurückknickte oder ein Ast auf ihn traf, verdeckte die Outline des einen Stücks den weißen Kern des anderen, und der Blitz sah zerschnitten aus. Jetzt werden alle Outlines vor allen Kernen gezeichnet, also liegt ein Kern immer oben. Außerdem wird der Blitz zum Boden hin dünner, bis auf 30 % seiner Breite am Einschlagspunkt. Dieses Detail mag ich sehr, denn dadurch sieht er aus, als käme er von irgendwo weit oben.

## Der Schlag

Der Moment des Einschlags muss sich wie ein Schlag anfühlen. Dafür passieren drei Dinge gleichzeitig.

![Das Impact-Frame von Mjölnirs Fall im Work-in-Progress-Build, Ende Oktober 2026 — links das Schlachtfeld für einen Sekundenbruchteil ins Negativ gekippt, rechts dasselbe Bild in reinem Schwarz-Weiß wie mit Tusche gezeichnet](/blog/one-lightning-strike/impact-frame.webp)

- **Ein Hit Stop.** Für eine Zehntelsekunde läuft das Spiel mit 2 % seiner normalen Geschwindigkeit, steht also fast still.
- **Ein Impact-Frame.** In diesem Moment kippt das Bild ins Negativ und dann in reines Schwarz-Weiß. Die Technik kommt aus dem Anime, wo die härtesten Treffer oft ein einzelnes solches Bild bekommen. Sie passt sehr gut zum gezeichneten Look von HoldStrong, und ich wollte sie schon lange einmal einsetzen.
- **Ein Kamera-Kick.** Die Kamera springt hoch und heran, das Sichtfeld zieht sich zusammen, und beides federt zurück. Dazu kommt ein kurzer Ausbruch von Farbsäumen an den Bildrändern.

Ich baue HoldStrong in Unity mit der Universal Render Pipeline. Für das Kamerawackeln nutze ich Feel, ein Toolkit von More Mountains, das genau für diese Art von „Game Feel“-Arbeit gemacht ist.

## Der Boden

Ein Blitz, der in Schnee einschlägt, sollte etwas hinterlassen. Der Boden ist deshalb in Schichten aufgebaut.

![Der Boden nach Mjölnirs Fall im Work-in-Progress-Build, Ende Oktober 2026 — ein Krater im Schnee um den Wikinger, in seiner Mitte ein schwarzer Brandfleck mit einer dünnen, verästelten, glühenden Figur und ein paar Funken, die zu Rot abkühlen](/blog/one-lightning-strike/ground.webp)

- **Ein Krater.** Der Einschlag drückt einen Krater in den Schnee. Die Technik dafür konnte ich von der Ballista auf dem Turm übernehmen, deren Bolzen seit dem 23. Oktober Krater hinterlassen.
- **Eine Schneefontäne.** Die schwere Version der Schneefontäne der Ballista, größer skaliert, zu Füßen des Wikingers.
- **Eine Schockwelle.** Sie läuft vom Wikinger aus. Gegner, die sie tötet, fliegen als Ragdolls davon, also als lose Körper, die wie Marionetten fallen und purzeln. Gegner, die überleben, werden zurückgestoßen und betäubt.
- **Ein Brandfleck.** Eine schwarze Stelle in der Mitte des Kraters mit Rußsprenkeln drumherum.
- **Eine Brandfigur.** Meine liebste Schicht. Am 25. Oktober habe ich zuerst ein paar glühende, gerade Risse im Brandfleck ausprobiert. Die sahen aus wie ein zerbrochener Teller, also habe ich sie noch am selben Tag durch eine Lichtenberg-Figur ersetzt: das verästelte Muster, das Strom in Holz brennt. Sie wird für jeden Einschlag neu erzeugt, ihre Front frisst sich in 0,35 Sekunden nach außen, und dann kühlt sie langsam ab, von Orange in der Mitte bis Dunkelrot an den Spitzen.
- **Funken.** Vierzig glühende Funken fliegen aus dem Einschlagspunkt. Sie fliegen in Bögen, prallen vom Kraterboden ab und verglühen.

## Im Takt einer Donneraufnahme

In den ersten zwei Tagen hatte der Blitz Platzhalter-Sounds in fünf Ebenen: ein fernes Grollen beim ersten Vorblitz, ein Knistern, wenn die Vorentladung den Himmel verlässt, und beim Einschlag ein scharfes Krachen, ein tiefer Schlag und ein langes Donnerrollen. Das klang in Ordnung, aber der Ton folgte dem Bild. Am 25. Oktober habe ich das umgedreht. Jetzt nutze ich zwei Donneraufnahmen und drei Blitz-Sounds, und der Donner entscheidet, wann etwas passiert.

![Der Ablauf des Blitzschlags über der Wellenform der Donneraufnahme, gemessen Ende Oktober 2026 — leises Grollen bei 0,62, 0,75 und 0,83 Sekunden wird zu Vorblitz 1, ein Grollen bei 1,93 Sekunden zu Vorblitz 2, der laute Donnerschlag bei 2,48 Sekunden ist der Einschlag, die Rückschläge liegen auf dem zweiten Schlag und dem Anschwellen danach](/blog/one-lightning-strike/timeline-de.svg)

Dafür habe ich die Wellenform des Donners in Schritten von zehn Millisekunden analysiert und notiert, wo jedes Grollen und jeder Schlag beginnt. Das Bild oben zeigt, was dabei herauskam. Die drei leisen Grollen bei 0,62, 0,75 und 0,83 Sekunden liegen so dicht beieinander, dass sie ein Vorblitz mit drei Pulsen werden. Das Grollen bei 1,93 Sekunden ist der zweite Vorblitz. Der Schlag, der bei 2,48 Sekunden losbricht, ist der Einschlag, und der zweite Schlag und das Anschwellen danach sind die Rückschläge.

Einen Haken gibt es, und das ist der Hit Stop. Während das Spiel eine Zehntelsekunde fast stillsteht, läuft die Aufnahme weiter. Deshalb laufen die Sounds auf Audiozeit und werden vom Hit Stop nicht aufgehalten, und die Rückschläge im Bild werden genau um die Zeit vorgezogen, die der Hit Stop schluckt. Sonst würde das Licht dem Donner hinterherlaufen.

Die Blitz-Sounds sind so eingeplant, dass auch ihr Treffer auf dem Einschlag landet. Ihr Zischen am Anfang ist die Vorentladung, und deshalb läuft der Blitz jetzt genau so lange herunter, wie er zischt. Die zweite Donneraufnahme rollt die ganze Zeit leise darunter, wie ein Gewitter in der Ferne. In diesem Moment hat sich der Blitz für mich zum ersten Mal richtig angefühlt: als Licht und Ton aus derselben Quelle kamen.

## Was ich gebaut und wieder weggeworfen habe

Nicht alles, was ich gebaut habe, ist geblieben. Zwei Dinge sind wieder rausgeflogen, beide am 24. Oktober.

**God Rays.** Meine erste Idee waren Lichtstrahlen, die durch Lücken in den Wolken in einen Sturmdunst fallen, und jeder Blitz sollte diese Strahlen kurz in die Luft zeichnen. Ich habe einen Dunst über dem Ziel gebaut und eine Wolkentextur mit scharfen Lücken, durch die die Sonne scheint. Nach einem zweiten Anlauf, die Strahlen wirklich sichtbar zu machen, habe ich Dunst, Wolkentextur und Vorschau-Werkzeug noch am selben Tag wieder entfernt. Weiche, realistische Lichtstrahlen haben einfach nicht zum gezeichneten Look des Spiels gepasst, also habe ich die Arbeit stattdessen in den Blitz selbst gesteckt.

**Glare-Flächen.** Der erste Blitz hatte am Einschlagspunkt ein Blenden und auf dem Boden ein Leuchten, beides als flache Flächen mit weichem Rand. In einem realistischen Spiel funktioniert das. In HoldStrong mit seinem Toon-Look und den Tusche-Outlines wirkten sie wie harte weiße Kleckse. Jetzt übernimmt ein Punktlicht diese Aufgabe, und es beleuchtet den Schnee um den Wikinger, statt ihn zu verdecken.

## Vier Dinge, die die erste Version falsch gemacht hat

**Eine Brandfigur, die man nicht sehen konnte.** Die Kamera hängt etwa 25 Meter über dem Schlachtfeld, und von dort ist ein Meter auf dem Bildschirm etwa 55 bis 60 Pixel groß. Meine erste Brandfigur hatte einen Radius von 0,9 Metern und 3 Zentimeter breite Linien. Auf dem Bildschirm waren das ein bis zwei Pixel. Ich hatte also eine detaillierte Figur gebaut, die niemand sehen konnte. Jetzt hat sie einen Radius von 1,5 Metern und 7 Zentimeter breite Linien, und ihr rotes Glühen ist viel schwächer, denn das war viel zu stark.

![Die Brandfigur im Work-in-Progress-Build, Ende Oktober 2026 — links die erste Version, ein blasser rötlicher Fleck im Krater, rechts die fertige Version, eine deutlich sichtbare, verästelte Figur, die in der Mitte orange glüht](/blog/one-lightning-strike/burn-compare.webp)

**Eine Brandfigur, die flackerte.** Damit der Krater offen bleibt, habe ich ihn alle 0,2 Sekunden neu in den Schnee gedrückt. Der Schnee füllt Krater aber wieder auf, und dazwischen wuchs der Boden ein paar Zentimeter nach. Die Brandfigur lag knapp darüber, also wurde sie fünfmal pro Sekunde zugedeckt und wieder freigelegt. Jetzt wird der Krater in jedem Frame neu eingedrückt, direkt nachdem der Schnee aufgefüllt hat, und die Brandfigur liegt etwas höher.

**Ragdolls, die zerrissen.** Die Schockwelle gab einem getöteten Gegner seinen ganzen Stoß auf den einen Knochen, der dem Einschlag am nächsten lag. Dieser Knochen flog davon und zog die Gelenke lang, sodass der Körper auf eine Weise zerrissen wurde, die ich nicht wollte. Jetzt gibt die Schockwelle jedem Knochen des Körpers dieselbe Geschwindigkeit, und er fliegt als Ganzes davon.

**Ein Blitz, der auf dem Skill-Tree einfror.** Der Blitz läuft auf Spielzeit. Wenn eine Runde mitten in einem Blitz endete, hat die Pause ihn eingefroren, und der Skill-Tree öffnete sich über einem schwarz-weißen Impact-Frame mit Farbsäumen. Jetzt wartet das Rundenende, bis jeder Blitz vollständig abgespielt und die Szene wieder normal ist.

## Was er im Spiel macht

Stand Ende Oktober macht Mjölnirs Fall Folgendes. Er ist ein Stern in Thors Zweig des Skill-Trees, auf dem Platz, an dem das „Unbekannte Geschenk“ stand. Wenn du ihn gekauft hast, ist er ein eigener Skill neben Thors [Kettenblitz](/de/blog/demo-moves-to-november/). Er hat 20 Sekunden Cooldown, und er verletzt den Wikinger nicht. Die Schockwelle trifft jeden Gegner im Umkreis von 5 Metern in der Mitte mit dem Dreifachen von Thors Blitzschaden, zum Rand hin fällt das auf 40 %.

In seiner allerersten Version hat er den Kettenblitz ersetzt. Noch am selben Tag habe ich das geändert, damit Thor zwei Skills hat statt einem. Das kam aus einem größeren Umbau daran, wie Skills funktionieren, und der bekommt einen eigenen Post.

Damit das hier ehrlich bleibt, das ist noch Platzhalter:

- **Das Icon.** Mjölnirs Fall hat noch kein Bleistift-Icon. Bis dahin steht im Slot sein Name.
- **Die Zahlen.** Schaden, Radius und Cooldown sind ein erster Wurf und sind noch nicht durch das Balancing gegangen.

<!-- CLIP: der komplette Blitzschlag, 3-4 s, vom Tastendruck bis zur Erholung. -->

Zusammenfassend: Ein Blitz hat vier Tage gedauert, weil er nicht eine Sache ist, sondern ein Dutzend kleiner Sachen, die alle derselben Uhr folgen müssen. Am deutlichsten habe ich dabei gelernt, dass diese Uhr vom Ton kommen sollte. Seit der Donner entscheidet, wann das Licht kommt, fühlt sich der Blitz nicht mehr wie ein Effekt an. Er fühlt sich an wie Wetter.

Wenn ihr mir sagen wollt, was ihr von dem Blitz haltet oder davon, wie lange es dauert, bis er einschlägt, kommt auf <a href="https://discord.com/invite/RDk2UGcQ97" rel="noopener" data-analytics="outbound" data-analytics-id="discord" data-analytics-location="section">meinen Discord</a>.
