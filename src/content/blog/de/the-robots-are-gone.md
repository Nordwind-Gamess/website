---
title: Die Roboter sind weg
description: 'Zum ersten Mal sieht der Prototyp von HoldStrong aus wie HoldStrong: Draugr und Hrímthurs in 3D, der Einheri mit Bogen, eine Balliste auf dem Turm und neues Licht über dem Schnee. Dazu eine ehrliche Liste dessen, was noch Platzhalter ist.'
date: 2026-10-30
---

![Die GamePlay-Szene von HoldStrong im Work-in-Progress-Build, Ende Oktober 2026 — der Turm von Rimehold von oben im Schnee, umringt von Fackeln, der Einheri an seinem Fuß, ringsum rücken Gegner heran, und der Bildrand glüht rot, weil der Turm getroffen wird](/blog/the-robots-are-gone/hero.webp)

Im [Bestiarium-Beitrag](/de/blog/what-the-ice-sends/) waren alle Gegner noch reine Zeichnungen, und ich habe geschrieben, dass Draugr und Hrímthurs in der Demo spielbar sein werden. Die Frage war also, wer als Erster den Sprung zum echten 3D-Modell schafft. Die ehrliche Antwort lautet: Es waren gleich zwei auf einmal, und sie haben Gesellschaft mitgebracht. In den letzten beiden Septemberwochen haben alle Roboter das Schlachtfeld verlassen, und zum ersten Mal sieht der Prototyp auf meinem Bildschirm aus wie das Spiel, das ich hier die ganze Zeit beschreibe.

Dieser Beitrag blickt deshalb auf diesen Wechsel zurück. Er erzählt, wie der Prototyp bis Ende September aussah, was an die Stelle der alten Figuren getreten ist und, mindestens genauso wichtig, was immer noch nur ein Platzhalter für etwas Besseres ist. Die Screenshots stammen aus dem aktuellen Build von Ende Oktober. Deshalb seht ihr darauf auch schon das Bleistift-HUD und die Outline aus dem [letzten Beitrag](/de/blog/drawn-in-pencil/).

## Die Zeit der Roboter

Monatelang wurde der Außenposten Rimehold von einem modernen Soldaten mit Sturmgewehr verteidigt. Er war eine Demo-Figur, die ich mir aus einem Effekt-Paket geliehen hatte, inklusive Mündungsfeuer und herausfliegender Patronenhülsen. Angegriffen wurde er von zwei Sorten Roboter, einem schwachen und einem starken, beide gebaut aus einem kostenlosen Beispiel-Roboter, der bei der Engine mitgeliefert wird. Oben auf dem Turm stand ein Granatwerfer.

Nichts davon war ein Fehler. Ein Prototyp soll genau eine Frage beantworten: Macht der Spielablauf Spaß? Das beantworten Roboter genauso gut wie Draugr, und sie kosten nichts. Deshalb habe ich meine Zeit bewusst darauf verwendet, was im Spiel passiert, und nicht darauf, wie es aussieht. Die Platzhalter haben dabei klaglos ihren Dienst getan.

Der Haken daran ist, dass man sie irgendwann nicht mehr sieht. Nach genügend Testläufen *ist* ein Roboter mit einem kleinen Lebensbalken in meinem Kopf der Draugr, und ich bemerke gar nicht mehr, wie weit das Bild auf dem Bildschirm von dem Spiel entfernt ist, das ich eigentlich machen will. Genau deshalb hat sich der Austausch nach einem größeren Schritt angefühlt, als die Zahl der Commits vermuten lässt.

## Das Eis, jetzt in 3D

![Draugr und Hrímthurs als 3D-Modelle im Work-in-Progress-Build, Ende Oktober 2026 — Draugr rücken in langen Reihen von allen Seiten auf den Turm zu, direkt an der Mauer steht ein Hrímthurs](/blog/the-robots-are-gone/draugr-hrimthurs.webp)

Draugr und Hrímthurs sind die beiden Gegner, die im Bestiarium für die Demo genannt wurden, also kamen sie zuerst dran. Die Draugr sind Rimeholds eigene gefallene Verteidiger, die das Eis in genau dem Kettenhemd wieder aufstehen lässt, in dem sie gestorben sind. Der Hrímthurs ist ein Frostriese, der schon im Eis schlief, lange bevor im Norden irgendjemand lebte, und den nur eines interessiert: den Turm einzureißen.

Im Spiel haben die beiden einfach den Platz der Roboter eingenommen. Aus dem schwachen Roboter wurde der Draugr, aus dem starken der Hrímthurs. Das Verhalten darunter ist gleich geblieben. Der Draugr greift also weiterhin an, was ihm am nächsten ist, und der Hrímthurs läuft weiterhin an dir vorbei zu den Mauern. Nur sehen sie jetzt endlich so aus, wie sie sollen.

**Wie die Modelle entstehen.** Das möchte ich offen sagen. Die Modelle beginnen in Tripo, einem Werkzeug, das mit generativer KI ein grobes 3D-Modell erzeugt. Da ich der einzige bin, der an HoldStrong arbeitet, komme ich so von einer Zeichnung deutlich schneller zu einer brauchbaren Figur, als ich es allein schaffen würde. Was dabei herauskommt, ist ein Ausgangspunkt und kein fertiges Modell. Ich überarbeite jedes davon von Hand in Blender und ergänze eigene Texturen. Mein Concept-Art entscheidet nach wie vor, was die Kreatur ist, die KI verkürzt nur den Weg vom Papier auf den Bildschirm.

Die Ragdolls haben den Austausch weniger elegant überstanden. Was dabei schiefging, ist eine eigene Geschichte und bekommt einen eigenen Beitrag.

## Der Einheri bekommt seinen Bogen

![Der Einheri als 3D-Modell im Work-in-Progress-Build, Ende Oktober 2026 — ein Wikinger mit Hörnerhelm und Fellumhang steht mit seinem Bogen vor dem Turm im Schnee, oben auf dem Turm die Balliste, ringsum Fackeln und ein Nachthimmel voller Sterne](/blog/the-robots-are-gone/einheri-bow.webp)

Auch der Soldat mit dem Sturmgewehr ist verschwunden. An seiner Stelle spielst du jetzt den Einheri, den namenlosen toten Krieger, den Odin jeden Morgen zurück nach Rimehold schickt, als Wikinger mit dem Hörnerhelm aus [seinem eigenen Beitrag](/de/blog/the-man-without-a-name/).

Eine Änderung bin ich euch allerdings schuldig zu erklären. In früheren Beiträgen hat er mit einer Axt gekämpft, und das Concept-Art zeigt ihn bewusst mit leeren Händen. Im Spiel trägt er jetzt einen Bogen, die Axt ist weg. Der Grund dafür ist rein spielerisch. Der Kampf in HoldStrong war seit Beginn des Prototyps ein Fernkampf, schon als er noch das Gewehr in der Hand hielt: Du hältst Abstand, suchst dir rund um den Turm deine Ziele und bewegst dich, um außer Reichweite zu bleiben. Dazu passt ein Bogen viel besser als eine Axt. Eine Axt hätte entweder einen komplett anderen Kampf bedeutet oder einen Wikinger, der irgendwie quer über den Schnee hinweg zuschlägt. Also ist es der Bogen geworden, und ich finde, das Spiel ist dadurch besser.

Der Turm hat dieselbe Behandlung bekommen. Aus dem Granatwerfer ist eine Balliste geworden, eine riesige Armbrust, die auf einem neuen Wehrgang rund um die Turmspitze montiert ist. Diesem Wehrgang habe ich ein Material gegeben, das auf allen Oberseiten Schnee liegen lässt, sodass er aussieht, als stünde er schon sehr lange draußen in der Kälte. Das ist ein kleines Detail, aber ich mag es sehr.

![Die Balliste auf der Turmspitze im Work-in-Progress-Build, Ende Oktober 2026, von oben gesehen — ringsum rücken Gegner heran, und rechts stapeln sich orange Schadenszahlen ihrer Treffer](/blog/the-robots-are-gone/ballista.webp)

## Licht und Schnee

Neue Modelle in altem Licht sehen immer noch nach Prototyp aus, deshalb war die Beleuchtung der letzte Schritt. Das Hauptlicht ist jetzt schwächer und wirft harte Schatten, und ein zweites, weicheres Fülllicht sorgt dafür, dass die Figuren auf der abgewandten Seite nicht im Schwarz verschwinden. Die Fackeln am Turm brennen deutlich heller und weiter. Das ist wichtig, denn sie sind die einzige warme Farbe im ganzen Bild. Über allem liegt jetzt ein richtiger Nachthimmel.

Dazu kommt eine Schicht Post-Processing: eine Vignette, die die Ränder abdunkelt, eine Farbkorrektur, die Schatten, Mitteltöne und Lichter getrennt behandelt, und ein ganz leichter Farbsaum am Bildrand. Für sich genommen ist nichts davon spektakulär. Zusammen macht es aber den Unterschied zwischen „einem Level in einer Engine“ und „einer kalten Nacht am Rand der Welt“. Am deutlichsten seht ihr das auf dem Bild vom Einheri vor dem Turm weiter oben.

## Was noch Platzhalter ist

Damit dieser Beitrag nicht nach mehr Fortschritt aussieht, als tatsächlich da ist, hier der Stand, was noch fehlt oder vorläufig ist:

- **Die Fenrir-Brut und der Icespearman** gab es beim Austausch nur als Modelle. Seit dem 19. Oktober sind beide im Prototyp, und zwar zusammen, so wie im Bestiarium angekündigt, weil jeder von beiden nur mit dem anderen funktioniert. Inzwischen laufen, beißen und werfen sie auch mit eigenen Animationen.
- **Der Jötunn und die Larve des Nidhöggr** haben noch gar kein Modell.
- **Die Lichtwerte** sind ein erster Durchgang und werden sich ändern, sobald mehr Leute gespielt haben.

Zusammenfassend: Seit Ende September sind die beiden Gegner der [Demo](/holdstrong/), die Spielfigur und die Waffe des Turms echte Modelle, und die Szene hat endlich eine Stimmung. Mit Fenrir-Brut und Icespearman sind inzwischen zwei weitere dazugekommen, und der Rest des Bestiariums liegt noch vor mir.

Wenn euch eines der Modelle falsch vorkommt oder ihr eine Meinung zum Bogen habt, sagt es mir auf <a href="https://discord.com/invite/RDk2UGcQ97" rel="noopener" data-analytics="outbound" data-analytics-id="discord" data-analytics-location="section">meinem Discord</a>. Ich höre es lieber jetzt als nach den nächsten fünfzig Testläufen.
