---
title: HoldStrong greift zum Bleistift
description: 'In einer Woche hat das ganze Spiel sein Gesicht gewechselt: ein HUD und Menüs, von Hand mit Bleistift gezeichnet, ein Sternenhimmel im gleichen Stil und eine dünne Toon-Outline um die 3D-Welt, die sie ein wenig wie einen gezeichneten Comic aussehen lässt. Dazu der Umweg, den ich unterwegs genommen habe, drei Bugs, die der neue Look mitgebracht hat, und was noch Platzhalter ist.'
date: 2026-10-29
---

![HoldStrong im Work-in-Progress-Build, Ende Oktober 2026 — der Turm von Rimehold aus der neuen, höheren Kamera, jede Figur und jeder Baum mit einer dünnen dunklen Outline, rundherum am Bildrand das handgezeichnete Bleistift-HUD](/blog/drawn-in-pencil/hero.webp)

Wenn ihr die Screenshots aus dem [Beitrag zum Demo-Termin](/de/blog/demo-moves-to-november/) gesehen habt, werdet ihr das Spiel auf dem Bild oben kaum wiedererkennen. Das liegt nicht daran, dass am Gameplay etwas Großes passiert wäre. Es liegt daran, dass zwischen dem 20. und dem 22. Oktober fast alles, was man beim Spielen ansieht, ein neues Gesicht bekommen hat. HUD und Menüs sind jetzt von Hand mit Bleistift gezeichnet, der Skilltree im Nachthimmel nutzt dieselben Zeichnungen, und die 3D-Welt selbst hat eine dünne Outline um jede Figur, jeden Felsen und jeden Baum.

In diesem Beitrag geht es um genau diesen Wechsel. Ich zeige euch, wie das Spiel vor einer Woche aussah, was an seine Stelle getreten ist, welchen Weg ich zuerst gegangen und dann wieder umgekehrt bin, und welche kleinen Bugs ein neuer Look offenbar immer mit sich schleppt. Und wie immer gibt es am Ende eine Liste dessen, was noch Platzhalter ist.

## Wie es vor einer Woche aussah

![HoldStrong im Work-in-Progress-Build von Mitte Oktober 2026, vor dem neuen Look — oben links ein Info-Panel zur Runde mit orangem Fortschrittsbalken, ein schwarzer Währungskreis, unten links farbige Balken und drei eckige Ability-Kästen](/blog/drawn-in-pencil/before-hud.webp)

Das hier ist dasselbe Spiel Mitte Oktober. Alles, was man braucht, ist da: die Währung in einem schwarzen Kreis oben links, daneben ein Panel mit Runde und Tag, unten links zwei farbige Balken und drei eckige Kästen für die Fähigkeiten der Götter.

Falsch war daran nichts, und alles hat seinen Zweck erfüllt. Aber jedes Element war zu einer anderen Zeit aus einem anderen Grund entstanden, und das sah man. Kreis, Panel, Balken und Kästen hatten weder eine gemeinsame Form noch eine gemeinsame Linie oder Farbe. Das Ergebnis war ein HUD, das nach Prototyp aussah, über einer Szene, die langsam anfing, nach Spiel auszusehen.

Ich liebe es mit Bleistift zu zeichnen. Als Kind habe ich meine Leidschaft zum Zeichnen mit dem Bleistift in meiner Hand entdeckt und bevorzuge ihn noch bis heute. Daher lag es nicht fern, diesen Look auch auf mein erstes Spiel zu übertragen.

## Eine Form für alles

![Nahaufnahmen des neuen Bleistift-HUDs im Work-in-Progress-Build, Ende Oktober 2026 — das Wikinger-Porträt in einer Raute mit der Runen-Währungstafel, die Rundenleiste aus Rauten und Punkten, der Lebensbalken des Turms mit Turmemblem und die drei Ability-Slots](/blog/drawn-in-pencil/hud-closeup.webp)

Das neue HUD ist aus einer einzigen Form gebaut: einer Raute mit doppelter Bleistiftlinie. Als ich diese Form einmal hatte, konnte jedes andere Element aus ihr herauswachsen.

- **Das Porträt.** Oben links sitzt jetzt der Helm des Einheri, des namenlosen Wikingers, den du spielst, in einer Raute. Daneben hängt eine kleine gezeichnete Tafel mit deiner Währung, und die Währung hat zum ersten Mal ein Symbol: die Rune ᚢ, Uruz. Wenn du einen Gegner tötest, steigt die Belohnung jetzt als „+1 ᚢ“ in kleiner schwarzer Schrift auf und konkurriert dadurch nicht mehr mit den Schadenszahlen.
- **Die Rundenleiste.** Der alte Text „Runde 5/5, Tag 7“ ist weg. Stattdessen läuft oben eine Reihe aus Rauten und Punkten über den Bildschirm. Jede Raute ist der Beginn einer Runde, der erste Punkt füllt sich bei der Hälfte der Welle und der zweite, wenn die Runde geschafft ist. Kommende Runden sind blasse Umrisse, die aktuelle pulsiert leicht, und abgeschlossene werden zu Graphit.
- **Das Leben des Turms.** Unten in der Mitte ist der Lebensbalken des Turms jetzt ein gezeichneter Balken mit einem kleinen Turmemblem an der Spitze. Wenn der Turm getroffen wird, hüpft und wackelt das Emblem kurz, und wenn du Währung bekommst, ploppt die Runen-Raute oben auf dieselbe Weise auf.
- **Die Ability-Slots.** Die drei Götter sitzen unten links in je einer Raute mit einem Quadrat für das Icon darin. Wenn du eine Taste drückst, staucht sich nur das innere Quadrat, während der gezeichnete Rahmen drumherum stillhält. Da die Götter jetzt mit Cooldowns statt mit einem gemeinsamen Energievorrat arbeiten, zeigen die Slots außerdem an, wie viele Sekunden noch fehlen.

Dieses letzte Detail mag ich sehr: Weil sich nur das Innere bewegt, fühlt sich der Rahmen wie Papier an und das Icon wie etwas, das man wirklich drückt.

## Der Himmel bekommt denselben Bleistift

![Der Skilltree im Nachthimmel im Work-in-Progress-Build, Ende Oktober 2026 — Sterne als Bleistift-Rauten, verbunden durch leicht gewellte Bleistiftlinien mit kleinen Rautenenden, und ein handgezeichneter Popup-Rahmen um die Beschreibung eines Sterns](/blog/drawn-in-pencil/star-sky.webp)

Wenn du in HoldStrong ein Upgrade kaufst, kippt die Kamera vom Schlachtfeld nach oben in den Nachthimmel, wo jedes Upgrade ein Stern ist. Bis letzte Woche waren diese Sterne leuchtende Runenkreise, verbunden durch dünne gerade Linien. Diese Fassung könnt ihr noch im [Demo-Beitrag](/de/blog/demo-moves-to-november/) sehen.

Jetzt nutzen die Sterne dieselben Rauten wie das HUD. Ein normales Upgrade ist eine kleine Raute, eine Fähigkeit oder ein Geschenk eines Gottes ist eine größere mit dem Quadrat darin, genau wie die Slots unten am Bildschirm. Die Farbe verrät, welche Art Stern es ist: Eisblau für eine einfache Verbesserung, Grün für eine Fähigkeit und Gold für einen Gott. Auch die Linien dazwischen sind nicht mehr gerade. Jede ist ein Bleistiftstrich mit leicht gewellter Mitte, einer Breite, die sich unterwegs ändert, und ausgefransten Rändern, und keine Linie gleicht genau der nächsten.

Die Beschreibung eines Sterns öffnet sich jetzt in einem gezeichneten Rahmen mit Eckrauten und einem kleinen Ornament obendrauf, und bei Upgrades, die eine Zahl verändern, steht dort der Wert vor und nach dem Kauf. Der Aufbau des Baums selbst hat sich in derselben Woche ebenfalls geändert, aber das ist eine Geschichte für einen eigenen Beitrag.

![Der Skilltree im Work-in-Progress-Build von Mitte Oktober 2026, vor dem neuen Look — leuchtende Runenkreise, verbunden durch dünne gerade Linien in einem Sternenhimmel, mit einer dunkelblauen Tooltip-Box](/blog/drawn-in-pencil/before-sky.webp)

## Ein Umweg über Papier

![Der Skilltree im Work-in-Progress-Build vom 21. Oktober 2026 in der Papier-Fassung, die ich später verworfen habe — Sterne als Rauten mit weißer Papierfüllung und Graphit-Runen, dazu ein weißes Popup mit dunkelgrauer Schrift](/blog/drawn-in-pencil/paper-sky.webp)

Der nachtblaue Himmel von oben war nicht mein erster Versuch. Als ich die Zeichnungen in den Himmel geholt habe, habe ich sie zuerst wörtlich genommen. Die Rauten hatten eine weiße Papierfüllung, die Runen waren mit Graphit gezeichnet, und das Popup wurde zu einem weißen Blatt Papier mit dunkelgrauer Schrift. Es sollte aussehen wie ein Skizzenbuch, das über den Sternen liegt.

Zwei Tage später habe ich das alles wieder herausgenommen.

Ein weißes Blatt mitten in einem dunklen Himmel war schlicht lauter als alles andere auf dem Bildschirm, und die Sterne haben genau das verloren, was sie zu Sternen gemacht hat. Deshalb sind die Füllungen jetzt nachtblau, Linien und Schrift sind hell, und der Bleistift zeigt sich nur noch in den Strichen selbst. Im Nachhinein war die Papier-Fassung ein nützlicher Fehler, denn sie hat mir gezeigt, dass der Bleistift-Look in den Linien steckt und nicht im Hintergrund.

## Die Menüs ziehen nach

![Das Einstellungsmenü im Work-in-Progress-Build, Ende Oktober 2026 — ein gezeichneter Rahmen mit Eckrauten auf nachtblauem Grund, handgezeichnete Buttons mit spitzen Enden und ein Bleistift-Trennstrich unter dem Titel](/blog/drawn-in-pencil/menus.webp)

Sobald HUD und Himmel gezeichnet waren, wirkten die Menüs fehl am Platz, also sind sie nachgezogen. Die Einstellungen, der Pausebildschirm, das Ende eines Runs und der Kriegsrat, also die Übersicht, die du mit Tab öffnest, teilen sich jetzt die Himmelsfarben und denselben gezeichneten Rahmen. Jeder Button ist eine handgezeichnete Form mit spitzen Enden, die beim Drüberfahren ihre Zeichnung wechselt und beim Klicken ein kleines Stück einsinkt. Gerade Trennlinien sind zu Bleistiftstrichen mit einer Raute an jedem Ende geworden, und ein geöffnetes Dropdown markiert deine Auswahl mit einer kleinen Raute aus der Rundenleiste statt mit einem Häkchen.

Nichts davon ändert, wie sich das Spiel spielt. Aber es ist das erste Mal, dass sich jeder Bildschirm, vom Hauptmenü bis zur letzten Runde eines Tages, so anfühlt, als gehöre er zum selben Spiel.

## Die Welt bekommt eine Outline

![Dieselbe Ansicht des Schlachtfelds im Work-in-Progress-Build, Oktober 2026, nebeneinander — links ohne Outline, rechts mit einer dünnen dunklen Linie um Turm, Figuren, Felsen und Bäume](/blog/drawn-in-pencil/outline-compare.webp)

Ein gezeichnetes HUD über einer 3D-Welt, die vollkommen glatt aussieht, reißt eine seltsame Lücke auf. Deshalb habe ich dem Spiel in dieser Woche auch einen Toon-Shader gegeben. Praktisch zieht er überall dort eine dünne dunkle Linie, wo sich eine Fläche von der Kamera wegdreht. Dadurch bekommt jede Figur, jeder Felsen und jeder Baum einen Umriss, und die ganze Szene sieht ein wenig aus wie ein gezeichnetes Comic-Panel, ohne ihre 3D-Tiefe zu verlieren. Die Linie habe ich bewusst dünn gehalten, denn sie soll das Bild zusammenhalten und keinen Zeichentrickfilm daraus machen.

Am selben Tag habe ich versucht, noch einen Schritt weiterzugehen, und den verschneiten Bäumen auch die flache Schattierung des Toon-Shaders gegeben. Das habe ich noch am selben Tag zurückgenommen, da die Bäume aus dem Design herausfielen und nicht mehr ins Bild passten. Somit behalten resultierend die Bäume ihr eigenes Schneematerial und erhalten die gleichen Outlines wie alles andere.

Im selben Zug habe ich die Spielkamera auf fast die dreifache Höhe angehoben, sodass ihr jetzt deutlich mehr vom Schlachtfeld rund um den Turm seht. Damit diese größere Ansicht nicht leer wirkt, hat der Wald über hundert neue Bäume und ein paar zusätzliche Felsen bekommen, und die Schneeflocken sind größer geworden und fallen näher an der Kamera. All das seht ihr auf dem Bild ganz oben in diesem Beitrag.

## Bleistift in die Engine bringen

![Eine der originalen Bleistiftzeichnungen für das HUD aus dem Work-in-Progress-Material, Oktober 2026 — ein Ability-Slot mit seiner doppelten Umrisslinie, gezeichnet in doppelter Größe gegenüber dem Spiel](/blog/drawn-in-pencil/raw-sketch.webp)

Die Zeichnungen entstehen in Procreate auf dem iPad. Ich nutze es, weil ich dort über die Ebenen von Anfang an Umriss, Füllung und Hintergrund getrennt halten kann, und genau diese Teile braucht das Spiel einzeln. Danach wandern sie in Unity, die Engine, in der HoldStrong entsteht. Damit ein Bleistiftstrich auf diesem Weg nicht matschig wird, waren drei kleine Entscheidungen nötig.

Erstens wird alles in doppelter Größe gezeichnet. Ein Bleistiftstrich hat feine Körnung und unruhige Ränder, und in Originalgröße verschwinden genau diese Details als Erstes. Deshalb prüft die Engine die Importeinstellungen jeder Zeichnung automatisch, sodass ich sie bei keiner einzelnen Datei vergessen kann.

Zweitens die Farben. Der Teil von Unity, der meine Menüs zeichnet, kann ein Bild nur mit einer Farbe abdunkeln, aber keine weiße Linie auf dunklem Grund hellblau einfärben. Deshalb backt für die Menüs ein kleines Skript die Farben direkt in die Zeichnungen ein. Wenn ich eine Farbe ändere, lasse ich das Skript neu laufen, statt irgendetwas doppelt zu zeichnen.

Drittens müssen sich die Buttons auf unterschiedliche Breiten dehnen lassen, ohne dass ihre spitzen Enden mitgedehnt werden. Dafür wird jede Zeichnung in neun Stücke geschnitten, die Ecken bleiben fest, und nur die Mitte wächst.

## Drei Bugs, die der neue Look mitgebracht hat

Ein neuer Look kommt selten allein, und diese drei haben auf mich gewartet.

**Ein grauer Kasten hinter jedem Button.** Nach der Umstellung tauchte hinter jedem gezeichneten Button ein grauer Kasten auf, sobald man mit der Maus darüberfuhr. Der Grund war der Standard-Menüstil der Engine, der Buttons beim Drüberfahren mit spezifischeren Regeln einfärbt als meine. Mein „Hintergrund bleibt durchsichtig“ hat deshalb jedes Mal gegen den Standard verloren. Die Lösung war, meine Regeln genauso spezifisch zu schreiben.

**Ein Lebensbalken, der wegwandert.** Beim ersten Treffer auf den Turm ist sein Lebensbalken ein Stück nach links gesprungen und dort geblieben. Die Plopp-Animation hatte sich die Ruheposition des Balkens beim Spielstart gemerkt, aber in diesem Moment war das Bildschirm-Layout noch nicht fertig, also hat sie sich die falsche Stelle gemerkt. Jetzt merkt sie sich die Ruheposition stattdessen zu Beginn jedes Plopps.

**Gekaufte Sterne, die ungekauft aussahen.** Im Himmel sah ein Stern, den du schon gekauft hattest, nach dem Schließen und erneuten Öffnen des Baums genauso aus wie einer, den du kaufen kannst. Das Gold eines gekauften Sterns kam nur von seinem Leuchten, und das zeigt sich nur, solange man mit der Maus darüber ist oder direkt nach dem Kauf. Jetzt trägt die Raute eines gekauften Sterns das Gold selbst.

## Was noch Platzhalter ist

Damit dieser Beitrag nicht mehr verspricht, als er zeigt, hier der Stand dessen, was heute noch vorläufig ist:

- **Die Maus-Icons im Himmel.** Die Hinweise „Ziehen zum Verschieben“ und „Scrollen zum Zoomen“ nutzen zwei schnell gemachte Icons im Bleistift-Stil, bis handgezeichnete sie ersetzen.
- **Das „Unbekannte Geschenk“.** Thor und Týr haben im Baum je einen leeren Platz für ein Geschenk, das es noch nicht gibt.
- **Icons für die Sterne.** Im Moment zeigen die meisten Sterne nur eine Rune. Das sieht gut aus, aber man muss einen Stern öffnen, um zu wissen, was er tut. Deshalb werden die Sterne im Himmel sehr wahrscheinlich ebenfalls kleine Icons bekommen, damit der Baum auf einen Blick verständlicher wird.
- **Die Werte.** Farben, Größen und Abstände sind ein erster Wurf, und einige davon werden sich ändern, sobald mehr Leute damit gespielt haben.

Zusammenfassend: Stand Ende Oktober ist alles, was ihr beim Spielen von HoldStrong anseht, von derselben Hand gezeichnet, vom HUD über den Himmel bis zu den Menüs, und die 3D-Welt hat die passende Outline dazu. So wird auch die [Demo am 15. November](/holdstrong/) aussehen.

Wenn euch am neuen Look etwas nicht gefällt oder ihr die leuchtenden Runen lieber mochtet, sagt es mir auf <a href="https://discord.com/invite/RDk2UGcQ97" rel="noopener" data-analytics="outbound" data-analytics-id="discord" data-analytics-location="section">meinem Discord</a>. Ich höre es lieber jetzt als nach der Demo.
