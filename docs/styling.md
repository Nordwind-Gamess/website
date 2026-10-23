# Styling und Responsive

Die Seite hat kein CSS-Framework und keine globale Stylesheet-Datei. Jedes Styling steht in einem
von Astro gescopten `<style>`-Block, und es gibt genau drei davon, weil es genau drei
Dokument-Shells gibt:

| Shell                      | Datei                                                             |
| :------------------------- | :---------------------------------------------------------------- |
| Startseite                 | [`src/pages/index.astro`](../src/pages/index.astro)               |
| HoldStrong                 | [`src/pages/holdstrong.astro`](../src/pages/holdstrong.astro)     |
| Alles andere (Devlog, 404) | [`src/layouts/BlogLayout.astro`](../src/layouts/BlogLayout.astro) |

Reset (`margin: 0`, `box-sizing: border-box`) und die Farbvariablen sind in allen drei dupliziert.
Das ist bekannt und bewusst nicht aufgelöst — der Umbau gehört zur geplanten Tailwind-Einführung,
nicht in einen CSS-Patch.

## Breakpoints

Zwei Stufen, beide `max-width`:

| Query                        | Bedeutung                                                                                                        |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `@media (max-width: 1023px)` | „nicht Desktop": fluide Gutter, Grids geben Spalten ab, Schriftgrößen bekommen `clamp()`, Touch-Targets auf 44px |
| `@media (max-width: 639px)`  | „Handy": Karussells greifen, Countdown wird 2×2, Sprungmarken verschwinden, CTA bricht um                        |

Die Werte sind nicht frei gewählt: sie sind deckungsgleich mit `viewportBucket()` in
[`src/lib/analytics/auto.ts`](../src/lib/analytics/auto.ts) (`< 640` = mobile, `< 1024` = tablet).
Layout und Reporting teilen sich damit dieselben Grenzen — ein GA4-Segment „mobile" ist exakt die
Menge der Besucher, die den Handy-Block gesehen haben.

## Die Regel

**Mobile Regeln kommen als `max-width`-Block ans Ende des Style-Blocks. Der Desktop-Pfad darüber
wird nicht angefasst.**

Das ist keine Stilfrage, sondern die einzige Garantie, dass eine Mobile-Änderung den Desktop nicht
verschiebt: ab 1024px greift keine einzige Regel aus diesen Blöcken. Wer eine Desktop-Änderung
will, ändert die Regel oben — sichtbar und absichtlich.

Wird ein Wert responsiv, dann bevorzugt per `clamp()` in der bestehenden Regel statt per
Breakpoint-Sprung. Sprünge sind für Dinge, die ihre Form ändern (Grid → Karussell), nicht für
Zahlen, die kleiner werden sollen.

## Farben und Keyart auf /holdstrong/

Die Palette folgt dem Keyart. Das ist eine eisblaue Nachtszene, deren einzige warme Stelle das
Runenleuchten am Turm ist. Die Seite hat deshalb genau eine warme Akzentfamilie, nämlich
Bernstein: `#f2a33a` (Akzent, Fokusrand, Glows), `#ffbb5c` (Thor, Countdown, WIP-Flagge),
`#ffcf85` (heller Akzenttext) und den CTA-Verlauf `#f9b24e → #d4831c`. Daneben stehen Eisblau
`#7fd4ff`, Violett `#a271ff`/`#c3a6ff` als Blitzfarbe und Blauschwarz `#070a11` als Grund. Das
Fehlerrot `#ff7a6b` gehört bewusst nicht zur Bernsteinfamilie. Wechselt das Keyart, wird diese
Akzentfamilie als Ganzes neu abgeleitet, nicht einzelne Werte.

Der Hero lädt `public/holdstrong/keyart.webp` (1232×706, ~50 KB). `keyart.png` daneben ist der
verlustfreie Master für [`scripts/make-og-images.mjs`](../scripts/make-og-images.mjs). Es liegt
zwar unter `public/`, aber keine Seite referenziert es. Das WebP entsteht aus dem PNG per `sharp` mit `quality: 82`. Der Turm steht
rechts der Bildmitte, daher setzt der Handy-Block `object-position: 78% 35%`, sonst zeigt der
Hochformat-Ausschnitt nur Himmel.

## Die beiden Karussells auf /holdstrong/

Unterhalb von 640px werden Götter und Galerie horizontal wischbar. Sie sehen **absichtlich
unterschiedlich** aus, damit zwei Wisch-Bereiche auf derselben Seite nicht zum Rätsel werden:

- **Götter** — gerahmte Karten mit `flex: 0 0 82%`. Die angeschnittene nächste Karte ist die
  Affordanz; deshalb brauchen sie keinen Indikator.
- **Galerie** — randlos über die volle Viewport-Breite, eine Kachel pro Bildschirm. Weil hier nichts
  angeschnitten ist, übernimmt ein Punkte-Indikator die Affordanz.

Der Indikator ist **reine Anzeige**: `aria-hidden`, keine Buttons, nicht anklickbar. Auf einem
Touchgerät wischt man, man zielt nicht auf 7px-Punkte. Gesetzt wird er von `bindGalleryCarousel()`
in [`src/scripts/holdstrong.ts`](../src/scripts/holdstrong.ts) über einen `IntersectionObserver`,
der per `matchMedia('(max-width: 639px)')` an- und abgehängt wird — oberhalb des Breakpoints gibt
es kein Karussell und läuft entsprechend auch kein Observer. Die Zahl der Punkte in
`.hs-gallery-dots` muss zur Zahl der `.hs-gallery-slot` passen, sonst hängt sich der Observer gar
nicht erst an.

## Die Galerie auf /holdstrong/

Sechs Gameplay-Screenshots aus `src/assets/gameplay/`, danach vier Gegner-Turnarounds aus
`src/assets/concept/`, alle eingebunden über `<Image>` aus `astro:assets` — die Originale sind bis
zu 2752px breit und würden sonst für eine 500px-Kachel komplett ausgeliefert.

Die Daten stehen als `GALLERY` im Frontmatter von `holdstrong.astro`. Jeder Eintrag trägt eine
**Flagge** (`flag`/`flagLabel`), die als Badge oben links auf dem Bild steht: `Concept art` (blau)
oder `Work in progress · October 2026` (bernstein). Ein Screenshot nennt immer den Monat, in dem er
entstanden ist — Builds ändern sich, und ein undatierter Screenshot liest sich später als Aussage
über den aktuellen Stand. Neue Screenshots bekommen also ein neues Label, alte behalten ihres.

Die Punkte unter dem Karussell werden aus `GALLERY` erzeugt, die Zahl passt also automatisch.

Ein Knoten trägt beide Rollen: `.hs-gallery-body` ist oberhalb 1024px ein zweispaltiges Grid,
zwischen 640px und 1023px einspaltig (zwei Spalten würden eine ganze Spielszene in eine
~290px-Kachel quetschen) und unterhalb 640px derselbe Knoten als Flex-Scroller.

**Die Kacheln sind 2:1, die Bilder 16:9** — auf allen Breiten gleich. Die Figuren stehen in einem
waagerechten Band in der Bildmitte, oben und unten ist Leerraum; `object-fit: cover` schneidet also
genau den Leerraum weg und nicht die Kunst. Das gilt auf dem Handy genauso: die Figuren werden vom
flacheren Zuschnitt nicht kleiner (bei `cover` bestimmt die Kachelbreite die Skalierung), es
verschwindet nur toter Raum.

Bei den Screenshots schneidet derselbe Zuschnitt oben und unten je etwa 5 % weg, also einen
schmalen Rand der HUD-Leisten.

`object-position` kommt pro Bild aus `GALLERY` (`position`) als Inline-Style. Die Turnarounds
stehen auf `center 30%`, nicht auf `center`: Die Figuren sitzen auf jedem Blatt oberhalb der
Bildmitte, und ein mittiger Zuschnitt ließe eine Lücke unter ihren Füßen. Die Screenshots stehen
auf `center`.

`.hs-gallery-img` braucht zwingend `height: auto`. Astro rendert `width`/`height` als Attribute,
und ohne das Zurücksetzen gewinnt die intrinsische Höhe — `aspect-ratio` greift dann nie und die
Kachel wird 1548px hoch.

Die Turnarounds (nicht die Screenshots) sind **freigestellt** (Alphakanal, 66–90 % transparent). Der Kachelhintergrund
scheint also durch und die Figuren stehen auf der Seite selbst — deshalb ist der 2:1-Zuschnitt hier
nicht nur Kosmetik: transparenter Leerraum liest sich als Loch, wo eine Hintergrundfläche bloß wie
eine Hintergrundfläche ausgesehen hätte. Wer die Assets je gegen Fassungen mit Hintergrund
tauscht, sollte diesen Abschnitt neu bewerten.

## Animationskanäle, keine Theme-Tokens

`--fg`, `--line`, `--gamebg`, `--gamelift` und `--gameshadow` auf `.site` in `index.astro` sehen wie
Design-Tokens aus, sind aber keine: [`src/scripts/storm-cloud.ts`](../src/scripts/storm-cloud.ts)
schreibt sie pro Animationsframe per `setProperty()`. Wer sie umbenennt oder durch feste Werte
ersetzt, hängt die Storm-Animation von der Oberfläche ab, ohne dass etwas bricht oder warnt.

Die Canvas-Animation respektiert `prefers-reduced-motion: reduce` — dann wird ein einzelner Frame
gezeichnet und die rAF-Schleife gar nicht erst gestartet. Ein dauerlaufender Canvas ist auf dem
Handy Akku und Jank.

## Hover auf Touchgeräten

Jeder Hover-Effekt, der mehr tut als eine Farbe zu wechseln, gehört in
`@media (hover: hover)`. Auf einem Touchscreen feuert `pointerenter` beim Tap, `pointerleave` oft
nie — der Effekt bleibt dann für den Rest des Besuchs hängen. Aus demselben Grund ignoriert der
CTA-Handler in `storm-cloud.ts` `pointerType === 'touch'` und behandelt `pointercancel`.

## Touch-Targets

Interaktive Elemente sind unterhalb 1024px mindestens 44px hoch. Eine Ausnahme, bewusst:
**Inline-Links im Fließtext** eines Devlog-Posts bekommen kein Padding — das würde die Zeilenbox
aufreißen. Sie bleiben bei ihrer Zeilenhöhe.

## Bekannte offene Punkte

- **CLS bei Markdown-Bildern.** Markdown erzeugt `<img>` ohne `width`/`height`, es wird also kein
  Platz reserviert. Ehrlich lösbar nur per Rehype-Plugin oder `astro:assets`; ein CSS-`aspect-ratio`
  würde Bilder mit abweichendem Seitenverhältnis verzerren.
- **Das Keyart läuft an der `astro:assets`-Pipeline vorbei.** Das WebP (~50 KB) ist von Hand
  erzeugt, und jedes Gerät bekommt dieselben 1232px, weil es kein `srcset` gibt. `sharp` liegt
  bereits in `node_modules` (Astro bringt es mit), `astro:assets` wäre also ohne neue Dependency
  machbar. Das Bild müsste dafür nur nach `src/assets/` wandern.
- **Kein `:focus-visible`.** Der einzige Fokus-Stil der Seite ist `.hs-input:focus`, während
  `a { text-decoration: none }` global die Standard-Affordanz entfernt. Tastaturnutzer bekommen
  nirgends eine Fokusanzeige.
- **Render-blockierende Google Fonts.** `/holdstrong/` lädt drei Familien in sieben Schnitten, der
  Devlog zwei weitere. Auf Mobilfunk der größte verbliebene Ladekostenpunkt.
- **Synthetisches Fett bei Metamorphous.** Die Überschriften-Schrift von `/holdstrong/` gibt es nur
  in 400; die `font-weight: 600/800`-Angaben bleiben bewusst stehen und werden vom Browser
  künstlich gefettet.
