import React, { useState, useEffect } from 'react';
import { Check, X, Settings, TrendingUp, Play, BarChart3, Award, AlertCircle, Calendar, Target, Volume2 } from 'lucide-react';

// Dutch verb conjugation engine with grammatical accuracy
const DutchVerbs = {
  // Irregular verbs with correct conjugations, auxiliary usage, and CEFR levels
  irregular: {
    zijn: {
      infinitive: 'zijn',
      ott: ['ben', 'bent', 'is', 'zijn', 'zijn', 'zijn'],
      ovt: ['was', 'was', 'was', 'waren', 'waren', 'waren'],
      vtt_part: 'geweest',
      auxiliary: 'zijn',
      imperative: 'wees',
      level: 'A1'
    },
    hebben: {
      infinitive: 'hebben',
      ott: ['heb', 'hebt', 'heeft', 'hebben', 'hebben', 'hebben'],
      ovt: ['had', 'had', 'had', 'hadden', 'hadden', 'hadden'],
      vtt_part: 'gehad',
      auxiliary: 'hebben',
      imperative: 'heb',
      level: 'A1'
    },
    gaan: {
      infinitive: 'gaan',
      ott: ['ga', 'gaat', 'gaat', 'gaan', 'gaan', 'gaan'],
      ovt: ['ging', 'ging', 'ging', 'gingen', 'gingen', 'gingen'],
      vtt_part: 'gegaan',
      auxiliary: 'zijn',
      imperative: 'ga',
      level: 'A1'
    },
    komen: {
      infinitive: 'komen',
      ott: ['kom', 'komt', 'komt', 'komen', 'komen', 'komen'],
      ovt: ['kwam', 'kwam', 'kwam', 'kwamen', 'kwamen', 'kwamen'],
      vtt_part: 'gekomen',
      auxiliary: 'zijn',
      imperative: 'kom',
      level: 'A1',
      strongClass: 4,
      ablaut: 'o → a → o'
    },
    doen: {
      infinitive: 'doen',
      ott: ['doe', 'doet', 'doet', 'doen', 'doen', 'doen'],
      ovt: ['deed', 'deed', 'deed', 'deden', 'deden', 'deden'],
      vtt_part: 'gedaan',
      auxiliary: 'hebben',
      imperative: 'doe',
      level: 'A1'
    },
    zien: {
      infinitive: 'zien',
      ott: ['zie', 'ziet', 'ziet', 'zien', 'zien', 'zien'],
      ovt: ['zag', 'zag', 'zag', 'zagen', 'zagen', 'zagen'],
      vtt_part: 'gezien',
      auxiliary: 'hebben',
      imperative: 'zie',
      level: 'A1'
    },
    kunnen: {
      infinitive: 'kunnen',
      ott: ['kan', 'kunt', 'kan', 'kunnen', 'kunnen', 'kunnen'],
      ovt: ['kon', 'kon', 'kon', 'konden', 'konden', 'konden'],
      vtt_part: 'gekund',
      auxiliary: 'hebben',
      imperative: 'kun',
      level: 'A1'
    },
    willen: {
      infinitive: 'willen',
      ott: ['wil', 'wilt', 'wil', 'willen', 'willen', 'willen'],
      ovt: ['wilde', 'wilde', 'wilde', 'wilden', 'wilden', 'wilden'],
      vtt_part: 'gewild',
      auxiliary: 'hebben',
      imperative: 'wil',
      level: 'A1'
    },
    moeten: {
      infinitive: 'moeten',
      ott: ['moet', 'moet', 'moet', 'moeten', 'moeten', 'moeten'],
      ovt: ['moest', 'moest', 'moest', 'moesten', 'moesten', 'moesten'],
      vtt_part: 'gemoeten',
      auxiliary: 'hebben',
      imperative: 'moet',
      level: 'A1'
    },
    lopen: {
      infinitive: 'lopen',
      ott: ['loop', 'loopt', 'loopt', 'lopen', 'lopen', 'lopen'],
      ovt: ['liep', 'liep', 'liep', 'liepen', 'liepen', 'liepen'],
      vtt_part: 'gelopen',
      auxiliary: 'zijn',
      imperative: 'loop',
      level: 'A1',
      strongClass: 7,
      ablaut: 'o → ie → o'
    },
    geven: {
      infinitive: 'geven',
      ott: ['geef', 'geeft', 'geeft', 'geven', 'geven', 'geven'],
      ovt: ['gaf', 'gaf', 'gaf', 'gaven', 'gaven', 'gaven'],
      vtt_part: 'gegeven',
      auxiliary: 'hebben',
      imperative: 'geef',
      level: 'A2',
      strongClass: 5,
      ablaut: 'e → a → e'
    },
    nemen: {
      infinitive: 'nemen',
      ott: ['neem', 'neemt', 'neemt', 'nemen', 'nemen', 'nemen'],
      ovt: ['nam', 'nam', 'nam', 'namen', 'namen', 'namen'],
      vtt_part: 'genomen',
      auxiliary: 'hebben',
      imperative: 'neem',
      level: 'A2',
      strongClass: 4,
      ablaut: 'e → a → o'
    },
    vinden: {
      infinitive: 'vinden',
      ott: ['vind', 'vindt', 'vindt', 'vinden', 'vinden', 'vinden'],
      ovt: ['vond', 'vond', 'vond', 'vonden', 'vonden', 'vonden'],
      vtt_part: 'gevonden',
      auxiliary: 'hebben',
      imperative: 'vind',
      level: 'A2',
      strongClass: 3,
      ablaut: 'i → o → o'
    },
    maken: {
      infinitive: 'maken',
      ott: ['maak', 'maakt', 'maakt', 'maken', 'maken', 'maken'],
      ovt: ['maakte', 'maakte', 'maakte', 'maakten', 'maakten', 'maakten'],
      vtt_part: 'gemaakt',
      auxiliary: 'hebben',
      imperative: 'maak',
      level: 'A1'
    },
    werken: {
      infinitive: 'werken',
      ott: ['werk', 'werkt', 'werkt', 'werken', 'werken', 'werken'],
      ovt: ['werkte', 'werkte', 'werkte', 'werkten', 'werkten', 'werkten'],
      vtt_part: 'gewerkt',
      auxiliary: 'hebben',
      imperative: 'werk',
      level: 'A1'
    },
    wonen: {
      infinitive: 'wonen',
      ott: ['woon', 'woont', 'woont', 'wonen', 'wonen', 'wonen'],
      ovt: ['woonde', 'woonde', 'woonde', 'woonden', 'woonden', 'woonden'],
      vtt_part: 'gewoond',
      auxiliary: 'hebben',
      imperative: 'woon',
      level: 'A1'
    },
    kijken: {
      infinitive: 'kijken',
      ott: ['kijk', 'kijkt', 'kijkt', 'kijken', 'kijken', 'kijken'],
      ovt: ['keek', 'keek', 'keek', 'keken', 'keken', 'keken'],
      vtt_part: 'gekeken',
      auxiliary: 'hebben',
      imperative: 'kijk',
      level: 'A1',
      strongClass: 1,
      ablaut: 'ij → ee → e'
    },
    schrijven: {
      infinitive: 'schrijven',
      ott: ['schrijf', 'schrijft', 'schrijft', 'schrijven', 'schrijven', 'schrijven'],
      ovt: ['schreef', 'schreef', 'schreef', 'schreven', 'schreven', 'schreven'],
      vtt_part: 'geschreven',
      auxiliary: 'hebben',
      imperative: 'schrijf',
      level: 'A2',
      strongClass: 1,
      ablaut: 'ij → ee → e'
    },
    lezen: {
      infinitive: 'lezen',
      ott: ['lees', 'leest', 'leest', 'lezen', 'lezen', 'lezen'],
      ovt: ['las', 'las', 'las', 'lazen', 'lazen', 'lazen'],
      vtt_part: 'gelezen',
      auxiliary: 'hebben',
      imperative: 'lees',
      level: 'A1',
      strongClass: 5,
      ablaut: 'e → a → e'
    },
    eten: {
      infinitive: 'eten',
      ott: ['eet', 'eet', 'eet', 'eten', 'eten', 'eten'],
      ovt: ['at', 'at', 'at', 'aten', 'aten', 'aten'],
      vtt_part: 'gegeten',
      auxiliary: 'hebben',
      imperative: 'eet',
      level: 'A1',
      strongClass: 5,
      ablaut: 'e → a → e'
    },
    worden: {
      infinitive: 'worden',
      ott: ['word', 'wordt', 'wordt', 'worden', 'worden', 'worden'],
      ovt: ['werd', 'werd', 'werd', 'werden', 'werden', 'werden'],
      vtt_part: 'geworden',
      auxiliary: 'zijn',
      imperative: 'word',
      level: 'A2'
    },
    blijven: {
      infinitive: 'blijven',
      ott: ['blijf', 'blijft', 'blijft', 'blijven', 'blijven', 'blijven'],
      ovt: ['bleef', 'bleef', 'bleef', 'bleven', 'bleven', 'bleven'],
      vtt_part: 'gebleven',
      auxiliary: 'zijn',
      imperative: 'blijf',
      level: 'A2'
    },
    // B1 Level verbs
    beginnen: {
      infinitive: 'beginnen',
      ott: ['begin', 'begint', 'begint', 'beginnen', 'beginnen', 'beginnen'],
      ovt: ['begon', 'begon', 'begon', 'begonnen', 'begonnen', 'begonnen'],
      vtt_part: 'begonnen',
      auxiliary: 'zijn',
      imperative: 'begin',
      level: 'B1'
    },
    denken: {
      infinitive: 'denken',
      ott: ['denk', 'denkt', 'denkt', 'denken', 'denken', 'denken'],
      ovt: ['dacht', 'dacht', 'dacht', 'dachten', 'dachten', 'dachten'],
      vtt_part: 'gedacht',
      auxiliary: 'hebben',
      imperative: 'denk',
      level: 'B1'
    },
    brengen: {
      infinitive: 'brengen',
      ott: ['breng', 'brengt', 'brengt', 'brengen', 'brengen', 'brengen'],
      ovt: ['bracht', 'bracht', 'bracht', 'brachten', 'brachten', 'brachten'],
      vtt_part: 'gebracht',
      auxiliary: 'hebben',
      imperative: 'breng',
      level: 'B1'
    },
    krijgen: {
      infinitive: 'krijgen',
      ott: ['krijg', 'krijgt', 'krijgt', 'krijgen', 'krijgen', 'krijgen'],
      ovt: ['kreeg', 'kreeg', 'kreeg', 'kregen', 'kregen', 'kregen'],
      vtt_part: 'gekregen',
      auxiliary: 'hebben',
      imperative: 'krijg',
      level: 'B1'
    },
    houden: {
      infinitive: 'houden',
      ott: ['houd', 'houdt', 'houdt', 'houden', 'houden', 'houden'],
      ovt: ['hield', 'hield', 'hield', 'hielden', 'hielden', 'hielden'],
      vtt_part: 'gehouden',
      auxiliary: 'hebben',
      imperative: 'houd',
      level: 'B1'
    },
    // B2 Level verbs
    bereiken: {
      infinitive: 'bereiken',
      ott: ['bereik', 'bereikt', 'bereikt', 'bereiken', 'bereiken', 'bereiken'],
      ovt: ['bereikte', 'bereikte', 'bereikte', 'bereikten', 'bereikten', 'bereikten'],
      vtt_part: 'bereikt',
      auxiliary: 'hebben',
      imperative: 'bereik',
      level: 'B2'
    },
    beseffen: {
      infinitive: 'beseffen',
      ott: ['besef', 'beseft', 'beseft', 'beseffen', 'beseffen', 'beseffen'],
      ovt: ['besefte', 'besefte', 'besefte', 'beseften', 'beseften', 'beseften'],
      vtt_part: 'beseft',
      auxiliary: 'hebben',
      imperative: 'besef',
      level: 'B2'
    },
    verwerken: {
      infinitive: 'verwerken',
      ott: ['verwerk', 'verwerkt', 'verwerkt', 'verwerken', 'verwerken', 'verwerken'],
      ovt: ['verwerkte', 'verwerkte', 'verwerkte', 'verwerkten', 'verwerkten', 'verwerkten'],
      vtt_part: 'verwerkt',
      auxiliary: 'hebben',
      imperative: 'verwerk',
      level: 'B2'
    },
    // C1 Level verbs
    ondernemen: {
      infinitive: 'ondernemen',
      ott: ['onderneem', 'onderneemt', 'onderneemt', 'ondernemen', 'ondernemen', 'ondernemen'],
      ovt: ['ondernam', 'ondernam', 'ondernam', 'ondernamen', 'ondernamen', 'ondernamen'],
      vtt_part: 'ondernomen',
      auxiliary: 'hebben',
      imperative: 'onderneem',
      level: 'C1'
    },
    handhaven: {
      infinitive: 'handhaven',
      ott: ['handhaaf', 'handhaaft', 'handhaaft', 'handhaven', 'handhaven', 'handhaven'],
      ovt: ['handhaafde', 'handhaafde', 'handhaafde', 'handhaafden', 'handhaafden', 'handhaafden'],
      vtt_part: 'gehandhaafd',
      auxiliary: 'hebben',
      imperative: 'handhaaf',
      level: 'C1'
    },
    // C2 Level verbs
    bewerkstelligen: {
      infinitive: 'bewerkstelligen',
      ott: ['bewerkstellig', 'bewerkstelligt', 'bewerkstelligt', 'bewerkstelligen', 'bewerkstelligen', 'bewerkstelligen'],
      ovt: ['bewerkstelligde', 'bewerkstelligde', 'bewerkstelligde', 'bewerkstelligden', 'bewerkstelligden', 'bewerkstelligden'],
      vtt_part: 'bewerkstelligd',
      auxiliary: 'hebben',
      imperative: 'bewerkstellig',
      level: 'C2'
    },
    // Additional A1 verbs
    drinken: { infinitive: 'drinken', ott: ['drink', 'drinkt', 'drinkt', 'drinken', 'drinken', 'drinken'], ovt: ['dronk', 'dronk', 'dronk', 'dronken', 'dronken', 'dronken'], vtt_part: 'gedronken', auxiliary: 'hebben', imperative: 'drink', level: 'A1' },
    slapen: { infinitive: 'slapen', ott: ['slaap', 'slaapt', 'slaapt', 'slapen', 'slapen', 'slapen'], ovt: ['sliep', 'sliep', 'sliep', 'sliepen', 'sliepen', 'sliepen'], vtt_part: 'geslapen', auxiliary: 'hebben', imperative: 'slaap', level: 'A1' },
    spelen: { infinitive: 'spelen', ott: ['speel', 'speelt', 'speelt', 'spelen', 'spelen', 'spelen'], ovt: ['speelde', 'speelde', 'speelde', 'speelden', 'speelden', 'speelden'], vtt_part: 'gespeeld', auxiliary: 'hebben', imperative: 'speel', level: 'A1' },
    praten: { infinitive: 'praten', ott: ['praat', 'praat', 'praat', 'praten', 'praten', 'praten'], ovt: ['praatte', 'praatte', 'praatte', 'praatten', 'praatten', 'praatten'], vtt_part: 'gepraat', auxiliary: 'hebben', imperative: 'praat', level: 'A1' },
    horen: { infinitive: 'horen', ott: ['hoor', 'hoort', 'hoort', 'horen', 'horen', 'horen'], ovt: ['hoorde', 'hoorde', 'hoorde', 'hoorden', 'hoorden', 'hoorden'], vtt_part: 'gehoord', auxiliary: 'hebben', imperative: 'hoor', level: 'A1' },
    zeggen: { infinitive: 'zeggen', ott: ['zeg', 'zegt', 'zegt', 'zeggen', 'zeggen', 'zeggen'], ovt: ['zei', 'zei', 'zei', 'zeiden', 'zeiden', 'zeiden'], vtt_part: 'gezegd', auxiliary: 'hebben', imperative: 'zeg', level: 'A1' },
    vragen: { infinitive: 'vragen', ott: ['vraag', 'vraagt', 'vraagt', 'vragen', 'vragen', 'vragen'], ovt: ['vroeg', 'vroeg', 'vroeg', 'vroegen', 'vroegen', 'vroegen'], vtt_part: 'gevraagd', auxiliary: 'hebben', imperative: 'vraag', level: 'A1' },
    antwoorden: { infinitive: 'antwoorden', ott: ['antwoord', 'antwoordt', 'antwoordt', 'antwoorden', 'antwoorden', 'antwoorden'], ovt: ['antwoordde', 'antwoordde', 'antwoordde', 'antwoordden', 'antwoordden', 'antwoordden'], vtt_part: 'geantwoord', auxiliary: 'hebben', imperative: 'antwoord', level: 'A1' },
    kopen: { infinitive: 'kopen', ott: ['koop', 'koopt', 'koopt', 'kopen', 'kopen', 'kopen'], ovt: ['kocht', 'kocht', 'kocht', 'kochten', 'kochten', 'kochten'], vtt_part: 'gekocht', auxiliary: 'hebben', imperative: 'koop', level: 'A1' },
    verkopen: { infinitive: 'verkopen', ott: ['verkoop', 'verkoopt', 'verkoopt', 'verkopen', 'verkopen', 'verkopen'], ovt: ['verkocht', 'verkocht', 'verkocht', 'verkochten', 'verkochten', 'verkochten'], vtt_part: 'verkocht', auxiliary: 'hebben', imperative: 'verkoop', level: 'A1' },
    betalen: { infinitive: 'betalen', ott: ['betaal', 'betaalt', 'betaalt', 'betalen', 'betalen', 'betalen'], ovt: ['betaalde', 'betaalde', 'betaalde', 'betaalden', 'betaalden', 'betaalden'], vtt_part: 'betaald', auxiliary: 'hebben', imperative: 'betaal', level: 'A1' },
    heten: { infinitive: 'heten', ott: ['heet', 'heet', 'heet', 'heten', 'heten', 'heten'], ovt: ['heette', 'heette', 'heette', 'heetten', 'heetten', 'heetten'], vtt_part: 'geheten', auxiliary: 'hebben', imperative: 'heet', level: 'A1' },
    weten: { infinitive: 'weten', ott: ['weet', 'weet', 'weet', 'weten', 'weten', 'weten'], ovt: ['wist', 'wist', 'wist', 'wisten', 'wisten', 'wisten'], vtt_part: 'geweten', auxiliary: 'hebben', imperative: 'weet', level: 'A1' },
    kennen: { infinitive: 'kennen', ott: ['ken', 'kent', 'kent', 'kennen', 'kennen', 'kennen'], ovt: ['kende', 'kende', 'kende', 'kenden', 'kenden', 'kenden'], vtt_part: 'gekend', auxiliary: 'hebben', imperative: 'ken', level: 'A1' },
    leren: { infinitive: 'leren', ott: ['leer', 'leert', 'leert', 'leren', 'leren', 'leren'], ovt: ['leerde', 'leerde', 'leerde', 'leerden', 'leerden', 'leerden'], vtt_part: 'geleerd', auxiliary: 'hebben', imperative: 'leer', level: 'A1' },
    stoppen: { infinitive: 'stoppen', ott: ['stop', 'stopt', 'stopt', 'stoppen', 'stoppen', 'stoppen'], ovt: ['stopte', 'stopte', 'stopte', 'stopten', 'stopten', 'stopten'], vtt_part: 'gestopt', auxiliary: 'hebben', imperative: 'stop', level: 'A1' },
    helpen: { infinitive: 'helpen', ott: ['help', 'helpt', 'helpt', 'helpen', 'helpen', 'helpen'], ovt: ['hielp', 'hielp', 'hielp', 'hielpen', 'hielpen', 'hielpen'], vtt_part: 'geholpen', auxiliary: 'hebben', imperative: 'help', level: 'A1' },
    zoeken: { infinitive: 'zoeken', ott: ['zoek', 'zoekt', 'zoekt', 'zoeken', 'zoeken', 'zoeken'], ovt: ['zocht', 'zocht', 'zocht', 'zochten', 'zochten', 'zochten'], vtt_part: 'gezocht', auxiliary: 'hebben', imperative: 'zoek', level: 'A1' },
    // A2 verbs
    zitten: { infinitive: 'zitten', ott: ['zit', 'zit', 'zit', 'zitten', 'zitten', 'zitten'], ovt: ['zat', 'zat', 'zat', 'zaten', 'zaten', 'zaten'], vtt_part: 'gezeten', auxiliary: 'hebben', imperative: 'zit', level: 'A2' },
    staan: { infinitive: 'staan', ott: ['sta', 'staat', 'staat', 'staan', 'staan', 'staan'], ovt: ['stond', 'stond', 'stond', 'stonden', 'stonden', 'stonden'], vtt_part: 'gestaan', auxiliary: 'hebben', imperative: 'sta', level: 'A2' },
    liggen: { infinitive: 'liggen', ott: ['lig', 'ligt', 'ligt', 'liggen', 'liggen', 'liggen'], ovt: ['lag', 'lag', 'lag', 'lagen', 'lagen', 'lagen'], vtt_part: 'gelegen', auxiliary: 'hebben', imperative: 'lig', level: 'A2' },
    leven: { infinitive: 'leven', ott: ['leef', 'leeft', 'leeft', 'leven', 'leven', 'leven'], ovt: ['leefde', 'leefde', 'leefde', 'leefden', 'leefden', 'leefden'], vtt_part: 'geleefd', auxiliary: 'hebben', imperative: 'leef', level: 'A2' },
    reizen: { infinitive: 'reizen', ott: ['reis', 'reist', 'reist', 'reizen', 'reizen', 'reizen'], ovt: ['reisde', 'reisde', 'reisde', 'reisden', 'reisden', 'reisden'], vtt_part: 'gereisd', auxiliary: 'hebben', imperative: 'reis', level: 'A2' },
    rijden: { infinitive: 'rijden', ott: ['rijd', 'rijdt', 'rijdt', 'rijden', 'rijden', 'rijden'], ovt: ['reed', 'reed', 'reed', 'reden', 'reden', 'reden'], vtt_part: 'gereden', auxiliary: 'hebben', imperative: 'rijd', level: 'A2' },
    fietsen: { infinitive: 'fietsen', ott: ['fiets', 'fietst', 'fietst', 'fietsen', 'fietsen', 'fietsen'], ovt: ['fietste', 'fietste', 'fietste', 'fietsten', 'fietsten', 'fietsten'], vtt_part: 'gefietst', auxiliary: 'hebben', imperative: 'fiets', level: 'A2' },
    wandelen: { infinitive: 'wandelen', ott: ['wandel', 'wandelt', 'wandelt', 'wandelen', 'wandelen', 'wandelen'], ovt: ['wandelde', 'wandelde', 'wandelde', 'wandelden', 'wandelden', 'wandelden'], vtt_part: 'gewandeld', auxiliary: 'hebben', imperative: 'wandel', level: 'A2' },
    zwemmen: { infinitive: 'zwemmen', ott: ['zwem', 'zwemt', 'zwemt', 'zwemmen', 'zwemmen', 'zwemmen'], ovt: ['zwom', 'zwom', 'zwom', 'zwommen', 'zwommen', 'zwommen'], vtt_part: 'gezwommen', auxiliary: 'hebben', imperative: 'zwem', level: 'A2' },
    koken: { infinitive: 'koken', ott: ['kook', 'kookt', 'kookt', 'koken', 'koken', 'koken'], ovt: ['kookte', 'kookte', 'kookte', 'kookten', 'kookten', 'kookten'], vtt_part: 'gekookt', auxiliary: 'hebben', imperative: 'kook', level: 'A2' },
    bakken: { infinitive: 'bakken', ott: ['bak', 'bakt', 'bakt', 'bakken', 'bakken', 'bakken'], ovt: ['bakte', 'bakte', 'bakte', 'bakten', 'bakten', 'bakten'], vtt_part: 'gebakken', auxiliary: 'hebben', imperative: 'bak', level: 'A2' },
    wassen: { infinitive: 'wassen', ott: ['was', 'wast', 'wast', 'wassen', 'wassen', 'wassen'], ovt: ['waste', 'waste', 'waste', 'wasten', 'wasten', 'wasten'], vtt_part: 'gewassen', auxiliary: 'hebben', imperative: 'was', level: 'A2' },
    openen: { infinitive: 'openen', ott: ['open', 'opent', 'opent', 'openen', 'openen', 'openen'], ovt: ['opende', 'opende', 'opende', 'openden', 'openden', 'openden'], vtt_part: 'geopend', auxiliary: 'hebben', imperative: 'open', level: 'A2' },
    sluiten: { infinitive: 'sluiten', ott: ['sluit', 'sluit', 'sluit', 'sluiten', 'sluiten', 'sluiten'], ovt: ['sloot', 'sloot', 'sloot', 'sloten', 'sloten', 'sloten'], vtt_part: 'gesloten', auxiliary: 'hebben', imperative: 'sluit', level: 'A2' },
    draaien: { infinitive: 'draaien', ott: ['draai', 'draait', 'draait', 'draaien', 'draaien', 'draaien'], ovt: ['draaide', 'draaide', 'draaide', 'draaiden', 'draaiden', 'draaiden'], vtt_part: 'gedraaid', auxiliary: 'hebben', imperative: 'draai', level: 'A2' },
    trekken: { infinitive: 'trekken', ott: ['trek', 'trekt', 'trekt', 'trekken', 'trekken', 'trekken'], ovt: ['trok', 'trok', 'trok', 'trokken', 'trokken', 'trokken'], vtt_part: 'getrokken', auxiliary: 'hebben', imperative: 'trek', level: 'A2' },
    duwen: { infinitive: 'duwen', ott: ['duw', 'duwt', 'duwt', 'duwen', 'duwen', 'duwen'], ovt: ['duwde', 'duwde', 'duwde', 'duwden', 'duwden', 'duwden'], vtt_part: 'geduwd', auxiliary: 'hebben', imperative: 'duw', level: 'A2' },
    voelen: { infinitive: 'voelen', ott: ['voel', 'voelt', 'voelt', 'voelen', 'voelen', 'voelen'], ovt: ['voelde', 'voelde', 'voelde', 'voelden', 'voelden', 'voelden'], vtt_part: 'gevoeld', auxiliary: 'hebben', imperative: 'voel', level: 'A2' },
    ruiken: { infinitive: 'ruiken', ott: ['ruik', 'ruikt', 'ruikt', 'ruiken', 'ruiken', 'ruiken'], ovt: ['rook', 'rook', 'rook', 'roken', 'roken', 'roken'], vtt_part: 'geroken', auxiliary: 'hebben', imperative: 'ruik', level: 'A2' },
    proeven: { infinitive: 'proeven', ott: ['proef', 'proeft', 'proeft', 'proeven', 'proeven', 'proeven'], ovt: ['proefde', 'proefde', 'proefde', 'proefden', 'proefden', 'proefden'], vtt_part: 'geproefd', auxiliary: 'hebben', imperative: 'proef', level: 'A2' },
    hopen: { infinitive: 'hopen', ott: ['hoop', 'hoopt', 'hoopt', 'hopen', 'hopen', 'hopen'], ovt: ['hoopte', 'hoopte', 'hoopte', 'hoopten', 'hoopten', 'hoopten'], vtt_part: 'gehoopt', auxiliary: 'hebben', imperative: 'hoop', level: 'A2' },
    mogen: { infinitive: 'mogen', ott: ['mag', 'mag', 'mag', 'mogen', 'mogen', 'mogen'], ovt: ['mocht', 'mocht', 'mocht', 'mochten', 'mochten', 'mochten'], vtt_part: 'gemogen', auxiliary: 'hebben', imperative: 'mag', level: 'A2' },
    hoeven: { infinitive: 'hoeven', ott: ['hoef', 'hoeft', 'hoeft', 'hoeven', 'hoeven', 'hoeven'], ovt: ['hoefde', 'hoefde', 'hoefde', 'hoefden', 'hoefden', 'hoefden'], vtt_part: 'gehoefd', auxiliary: 'hebben', imperative: 'hoef', level: 'A2' },
    gebruiken: { infinitive: 'gebruiken', ott: ['gebruik', 'gebruikt', 'gebruikt', 'gebruiken', 'gebruiken', 'gebruiken'], ovt: ['gebruikte', 'gebruikte', 'gebruikte', 'gebruikten', 'gebruikten', 'gebruikten'], vtt_part: 'gebruikt', auxiliary: 'hebben', imperative: 'gebruik', level: 'A2' },
    noemen: { infinitive: 'noemen', ott: ['noem', 'noemt', 'noemt', 'noemen', 'noemen', 'noemen'], ovt: ['noemde', 'noemde', 'noemde', 'noemden', 'noemden', 'noemden'], vtt_part: 'genoemd', auxiliary: 'hebben', imperative: 'noem', level: 'A2' },
    tonen: { infinitive: 'tonen', ott: ['toon', 'toont', 'toont', 'tonen', 'tonen', 'tonen'], ovt: ['toonde', 'toonde', 'toonde', 'toonden', 'toonden', 'toonden'], vtt_part: 'getoond', auxiliary: 'hebben', imperative: 'toon', level: 'A2' },
    vertellen: { infinitive: 'vertellen', ott: ['vertel', 'vertelt', 'vertelt', 'vertellen', 'vertellen', 'vertellen'], ovt: ['vertelde', 'vertelde', 'vertelde', 'vertelden', 'vertelden', 'vertelden'], vtt_part: 'verteld', auxiliary: 'hebben', imperative: 'vertel', level: 'A2' },
    luisteren: { infinitive: 'luisteren', ott: ['luister', 'luistert', 'luistert', 'luisteren', 'luisteren', 'luisteren'], ovt: ['luisterde', 'luisterde', 'luisterde', 'luisterden', 'luisterden', 'luisterden'], vtt_part: 'geluisterd', auxiliary: 'hebben', imperative: 'luister', level: 'A2' },
    proberen: { infinitive: 'proberen', ott: ['probeer', 'probeert', 'probeert', 'proberen', 'proberen', 'proberen'], ovt: ['probeerde', 'probeerde', 'probeerde', 'probeerden', 'probeerden', 'probeerden'], vtt_part: 'geprobeerd', auxiliary: 'hebben', imperative: 'probeer', level: 'A2' },
    veranderen: { infinitive: 'veranderen', ott: ['verander', 'verandert', 'verandert', 'veranderen', 'veranderen', 'veranderen'], ovt: ['veranderde', 'veranderde', 'veranderde', 'veranderden', 'veranderden', 'veranderden'], vtt_part: 'veranderd', auxiliary: 'zijn', imperative: 'verander', level: 'A2' },
    // B1 verbs
    verliezen: { infinitive: 'verliezen', ott: ['verlies', 'verliest', 'verliest', 'verliezen', 'verliezen', 'verliezen'], ovt: ['verloor', 'verloor', 'verloor', 'verloren', 'verloren', 'verloren'], vtt_part: 'verloren', auxiliary: 'hebben', imperative: 'verlies', level: 'B1' },
    winnen: { infinitive: 'winnen', ott: ['win', 'wint', 'wint', 'winnen', 'winnen', 'winnen'], ovt: ['won', 'won', 'won', 'wonnen', 'wonnen', 'wonnen'], vtt_part: 'gewonnen', auxiliary: 'hebben', imperative: 'win', level: 'B1' },
    groeten: { infinitive: 'groeten', ott: ['groet', 'groet', 'groet', 'groeten', 'groeten', 'groeten'], ovt: ['groette', 'groette', 'groette', 'groetten', 'groetten', 'groetten'], vtt_part: 'gegroet', auxiliary: 'hebben', imperative: 'groet', level: 'B1' },
    bedanken: { infinitive: 'bedanken', ott: ['bedank', 'bedankt', 'bedankt', 'bedanken', 'bedanken', 'bedanken'], ovt: ['bedankte', 'bedankte', 'bedankte', 'bedankten', 'bedankten', 'bedankten'], vtt_part: 'bedankt', auxiliary: 'hebben', imperative: 'bedank', level: 'B1' },
    vergeten: { infinitive: 'vergeten', ott: ['vergeet', 'vergeet', 'vergeet', 'vergeten', 'vergeten', 'vergeten'], ovt: ['vergat', 'vergat', 'vergat', 'vergaten', 'vergaten', 'vergaten'], vtt_part: 'vergeten', auxiliary: 'zijn', imperative: 'vergeet', level: 'B1' },
    herinneren: { infinitive: 'herinneren', ott: ['herinner', 'herinnert', 'herinnert', 'herinneren', 'herinneren', 'herinneren'], ovt: ['herinnerde', 'herinnerde', 'herinnerde', 'herinnerden', 'herinnerden', 'herinnerden'], vtt_part: 'herinnerd', auxiliary: 'hebben', imperative: 'herinner', level: 'B1' },
    geloven: { infinitive: 'geloven', ott: ['geloof', 'gelooft', 'gelooft', 'geloven', 'geloven', 'geloven'], ovt: ['geloofde', 'geloofde', 'geloofde', 'geloofden', 'geloofden', 'geloofden'], vtt_part: 'geloofd', auxiliary: 'hebben', imperative: 'geloof', level: 'B1' },
    betekenen: { infinitive: 'betekenen', ott: ['beteken', 'betekent', 'betekent', 'betekenen', 'betekenen', 'betekenen'], ovt: ['betekende', 'betekende', 'betekende', 'betekenden', 'betekenden', 'betekenden'], vtt_part: 'betekend', auxiliary: 'hebben', imperative: 'beteken', level: 'B1' },
    verklaren: { infinitive: 'verklaren', ott: ['verklaar', 'verklaart', 'verklaart', 'verklaren', 'verklaren', 'verklaren'], ovt: ['verklaarde', 'verklaarde', 'verklaarde', 'verklaarden', 'verklaarden', 'verklaarden'], vtt_part: 'verklaard', auxiliary: 'hebben', imperative: 'verklaar', level: 'B1' },
    beschrijven: { infinitive: 'beschrijven', ott: ['beschrijf', 'beschrijft', 'beschrijft', 'beschrijven', 'beschrijven', 'beschrijven'], ovt: ['beschreef', 'beschreef', 'beschreef', 'beschreven', 'beschreven', 'beschreven'], vtt_part: 'beschreven', auxiliary: 'hebben', imperative: 'beschrijf', level: 'B1' },
    tekenen: { infinitive: 'tekenen', ott: ['teken', 'tekent', 'tekent', 'tekenen', 'tekenen', 'tekenen'], ovt: ['tekende', 'tekende', 'tekende', 'tekenden', 'tekenden', 'tekenden'], vtt_part: 'getekend', auxiliary: 'hebben', imperative: 'teken', level: 'B1' },
    zingen: { infinitive: 'zingen', ott: ['zing', 'zingt', 'zingt', 'zingen', 'zingen', 'zingen'], ovt: ['zong', 'zong', 'zong', 'zongen', 'zongen', 'zongen'], vtt_part: 'gezongen', auxiliary: 'hebben', imperative: 'zing', level: 'B1' },
    dansen: { infinitive: 'dansen', ott: ['dans', 'danst', 'danst', 'dansen', 'dansen', 'dansen'], ovt: ['danste', 'danste', 'danste', 'dansten', 'dansten', 'dansten'], vtt_part: 'gedanst', auxiliary: 'hebben', imperative: 'dans', level: 'B1' },
    sporten: { infinitive: 'sporten', ott: ['sport', 'sport', 'sport', 'sporten', 'sporten', 'sporten'], ovt: ['sportte', 'sportte', 'sportte', 'sportten', 'sportten', 'sportten'], vtt_part: 'gesport', auxiliary: 'hebben', imperative: 'sport', level: 'B1' },
    studeren: { infinitive: 'studeren', ott: ['studeer', 'studeert', 'studeert', 'studeren', 'studeren', 'studeren'], ovt: ['studeerde', 'studeerde', 'studeerde', 'studeerden', 'studeerden', 'studeerden'], vtt_part: 'gestudeerd', auxiliary: 'hebben', imperative: 'studeer', level: 'B1' },
    onderzoeken: { infinitive: 'onderzoeken', ott: ['onderzoek', 'onderzoekt', 'onderzoekt', 'onderzoeken', 'onderzoeken', 'onderzoeken'], ovt: ['onderzocht', 'onderzocht', 'onderzocht', 'onderzochten', 'onderzochten', 'onderzochten'], vtt_part: 'onderzocht', auxiliary: 'hebben', imperative: 'onderzoek', level: 'B1' },
    ontdekken: { infinitive: 'ontdekken', ott: ['ontdek', 'ontdekt', 'ontdekt', 'ontdekken', 'ontdekken', 'ontdekken'], ovt: ['ontdekte', 'ontdekte', 'ontdekte', 'ontdekten', 'ontdekten', 'ontdekten'], vtt_part: 'ontdekt', auxiliary: 'hebben', imperative: 'ontdek', level: 'B1' },
    verzamelen: { infinitive: 'verzamelen', ott: ['verzamel', 'verzamelt', 'verzamelt', 'verzamelen', 'verzamelen', 'verzamelen'], ovt: ['verzamelde', 'verzamelde', 'verzamelde', 'verzamelden', 'verzamelden', 'verzamelden'], vtt_part: 'verzameld', auxiliary: 'hebben', imperative: 'verzamel', level: 'B1' },
    bouwen: { infinitive: 'bouwen', ott: ['bouw', 'bouwt', 'bouwt', 'bouwen', 'bouwen', 'bouwen'], ovt: ['bouwde', 'bouwde', 'bouwde', 'bouwden', 'bouwden', 'bouwden'], vtt_part: 'gebouwd', auxiliary: 'hebben', imperative: 'bouw', level: 'B1' },
    breken: { infinitive: 'breken', ott: ['breek', 'breekt', 'breekt', 'breken', 'breken', 'breken'], ovt: ['brak', 'brak', 'brak', 'braken', 'braken', 'braken'], vtt_part: 'gebroken', auxiliary: 'hebben', imperative: 'breek', level: 'B1' },
    repareren: { infinitive: 'repareren', ott: ['repareer', 'repareert', 'repareert', 'repareren', 'repareren', 'repareren'], ovt: ['repareerde', 'repareerde', 'repareerde', 'repareerden', 'repareerden', 'repareerden'], vtt_part: 'gerepareerd', auxiliary: 'hebben', imperative: 'repareer', level: 'B1' },
    verbeteren: { infinitive: 'verbeteren', ott: ['verbeter', 'verbetert', 'verbetert', 'verbeteren', 'verbeteren', 'verbeteren'], ovt: ['verbeterde', 'verbeterde', 'verbeterde', 'verbeterden', 'verbeterden', 'verbeterden'], vtt_part: 'verbeterd', auxiliary: 'hebben', imperative: 'verbeter', level: 'B1' },
    organiseren: { infinitive: 'organiseren', ott: ['organiseer', 'organiseert', 'organiseert', 'organiseren', 'organiseren', 'organiseren'], ovt: ['organiseerde', 'organiseerde', 'organiseerde', 'organiseerden', 'organiseerden', 'organiseerden'], vtt_part: 'georganiseerd', auxiliary: 'hebben', imperative: 'organiseer', level: 'B1' },
    plannen: { infinitive: 'plannen', ott: ['plan', 'plant', 'plant', 'plannen', 'plannen', 'plannen'], ovt: ['plande', 'plande', 'plande', 'planden', 'planden', 'planden'], vtt_part: 'gepland', auxiliary: 'hebben', imperative: 'plan', level: 'B1' },
    bespreken: { infinitive: 'bespreken', ott: ['bespreek', 'bespreekt', 'bespreekt', 'bespreken', 'bespreken', 'bespreken'], ovt: ['besprak', 'besprak', 'besprak', 'bespraken', 'bespraken', 'bespraken'], vtt_part: 'besproken', auxiliary: 'hebben', imperative: 'bespreek', level: 'B1' },
    overleggen: { infinitive: 'overleggen', ott: ['overleg', 'overlegt', 'overlegt', 'overleggen', 'overleggen', 'overleggen'], ovt: ['overlegde', 'overlegde', 'overlegde', 'overlegden', 'overlegden', 'overlegden'], vtt_part: 'overlegd', auxiliary: 'hebben', imperative: 'overleg', level: 'B1' },
    beslissen: { infinitive: 'beslissen', ott: ['beslis', 'beslist', 'beslist', 'beslissen', 'beslissen', 'beslissen'], ovt: ['besliste', 'besliste', 'besliste', 'beslisten', 'beslisten', 'beslisten'], vtt_part: 'beslissen', auxiliary: 'hebben', imperative: 'beslis', level: 'B1' },
    kiezen: { infinitive: 'kiezen', ott: ['kies', 'kiest', 'kiest', 'kiezen', 'kiezen', 'kiezen'], ovt: ['koos', 'koos', 'koos', 'kozen', 'kozen', 'kozen'], vtt_part: 'gekozen', auxiliary: 'hebben', imperative: 'kies', level: 'B1' },
    stemmen: { infinitive: 'stemmen', ott: ['stem', 'stemt', 'stemt', 'stemmen', 'stemmen', 'stemmen'], ovt: ['stemde', 'stemde', 'stemde', 'stemden', 'stemden', 'stemden'], vtt_part: 'gestemd', auxiliary: 'hebben', imperative: 'stem', level: 'B1' },
    regelen: { infinitive: 'regelen', ott: ['regel', 'regelt', 'regelt', 'regelen', 'regelen', 'regelen'], ovt: ['regelde', 'regelde', 'regelde', 'regelden', 'regelden', 'regelden'], vtt_part: 'geregeld', auxiliary: 'hebben', imperative: 'regel', level: 'B1' },
    // B2 verbs
    ontwikkelen: { infinitive: 'ontwikkelen', ott: ['ontwikkel', 'ontwikkelt', 'ontwikkelt', 'ontwikkelen', 'ontwikkelen', 'ontwikkelen'], ovt: ['ontwikkelde', 'ontwikkelde', 'ontwikkelde', 'ontwikkelden', 'ontwikkelden', 'ontwikkelden'], vtt_part: 'ontwikkeld', auxiliary: 'hebben', imperative: 'ontwikkel', level: 'B2' },
    ontwerpen: { infinitive: 'ontwerpen', ott: ['ontwerp', 'ontwerpt', 'ontwerpt', 'ontwerpen', 'ontwerpen', 'ontwerpen'], ovt: ['ontwierp', 'ontwierp', 'ontwierp', 'ontwierpen', 'ontwierpen', 'ontwierpen'], vtt_part: 'ontworpen', auxiliary: 'hebben', imperative: 'ontwerp', level: 'B2' },
    creëren: { infinitive: 'creëren', ott: ['creëer', 'creëert', 'creëert', 'creëren', 'creëren', 'creëren'], ovt: ['creëerde', 'creëerde', 'creëerde', 'creëerden', 'creëerden', 'creëerden'], vtt_part: 'gecreëerd', auxiliary: 'hebben', imperative: 'creëer', level: 'B2' },
    produceren: { infinitive: 'produceren', ott: ['produceer', 'produceert', 'produceert', 'produceren', 'produceren', 'produceren'], ovt: ['produceerde', 'produceerde', 'produceerde', 'produceerden', 'produceerden', 'produceerden'], vtt_part: 'geproduceerd', auxiliary: 'hebben', imperative: 'produceer', level: 'B2' },
    presenteren: { infinitive: 'presenteren', ott: ['presenteer', 'presenteert', 'presenteert', 'presenteren', 'presenteren', 'presenteren'], ovt: ['presenteerde', 'presenteerde', 'presenteerde', 'presenteerden', 'presenteerden', 'presenteerden'], vtt_part: 'gepresenteerd', auxiliary: 'hebben', imperative: 'presenteer', level: 'B2' },
    communiceren: { infinitive: 'communiceren', ott: ['communiceer', 'communiceert', 'communiceert', 'communiceren', 'communiceren', 'communiceren'], ovt: ['communiceerde', 'communiceerde', 'communiceerde', 'communiceerden', 'communiceerden', 'communiceerden'], vtt_part: 'gecommuniceerd', auxiliary: 'hebben', imperative: 'communiceer', level: 'B2' },
    discussiëren: { infinitive: 'discussiëren', ott: ['discussieer', 'discussieert', 'discussieert', 'discussiëren', 'discussiëren', 'discussiëren'], ovt: ['discussieerde', 'discussieerde', 'discussieerde', 'discussieerden', 'discussieerden', 'discussieerden'], vtt_part: 'gediscussieerd', auxiliary: 'hebben', imperative: 'discussieer', level: 'B2' },
    argumenteren: { infinitive: 'argumenteren', ott: ['argumenteer', 'argumenteert', 'argumenteert', 'argumenteren', 'argumenteren', 'argumenteren'], ovt: ['argumenteerde', 'argumenteerde', 'argumenteerde', 'argumenteerden', 'argumenteerden', 'argumenteerden'], vtt_part: 'geargumenteerd', auxiliary: 'hebben', imperative: 'argumenteer', level: 'B2' },
    analyseren: { infinitive: 'analyseren', ott: ['analyseer', 'analyseert', 'analyseert', 'analyseren', 'analyseren', 'analyseren'], ovt: ['analyseerde', 'analyseerde', 'analyseerde', 'analyseerden', 'analyseerden', 'analyseerden'], vtt_part: 'geanalyseerd', auxiliary: 'hebben', imperative: 'analyseer', level: 'B2' },
    evalueren: { infinitive: 'evalueren', ott: ['evalueer', 'evalueert', 'evalueert', 'evalueren', 'evalueren', 'evalueren'], ovt: ['evalueerde', 'evalueerde', 'evalueerde', 'evalueerden', 'evalueerden', 'evalueerden'], vtt_part: 'geëvalueerd', auxiliary: 'hebben', imperative: 'evalueer', level: 'B2' },
    vergelijken: { infinitive: 'vergelijken', ott: ['vergelijk', 'vergelijkt', 'vergelijkt', 'vergelijken', 'vergelijken', 'vergelijken'], ovt: ['vergeleek', 'vergeleek', 'vergeleek', 'vergeleken', 'vergeleken', 'vergeleken'], vtt_part: 'vergeleken', auxiliary: 'hebben', imperative: 'vergelijk', level: 'B2' },
    onderscheiden: { infinitive: 'onderscheiden', ott: ['onderscheid', 'onderscheidt', 'onderscheidt', 'onderscheiden', 'onderscheiden', 'onderscheiden'], ovt: ['onderscheidde', 'onderscheidde', 'onderscheidde', 'onderscheidden', 'onderscheidden', 'onderscheidden'], vtt_part: 'onderscheiden', auxiliary: 'hebben', imperative: 'onderscheid', level: 'B2' },
    interpreteren: { infinitive: 'interpreteren', ott: ['interpreteer', 'interpreteert', 'interpreteert', 'interpreteren', 'interpreteren', 'interpreteren'], ovt: ['interpreteerde', 'interpreteerde', 'interpreteerde', 'interpreteerden', 'interpreteerden', 'interpreteerden'], vtt_part: 'geïnterpreteerd', auxiliary: 'hebben', imperative: 'interpreteer', level: 'B2' },
    concluderen: { infinitive: 'concluderen', ott: ['concludeer', 'concludeert', 'concludeert', 'concluderen', 'concluderen', 'concluderen'], ovt: ['concludeerde', 'concludeerde', 'concludeerde', 'concludeerden', 'concludeerden', 'concludeerden'], vtt_part: 'geconcludeerd', auxiliary: 'hebben', imperative: 'concludeer', level: 'B2' },
    motiveren: { infinitive: 'motiveren', ott: ['motiveer', 'motiveert', 'motiveert', 'motiveren', 'motiveren', 'motiveren'], ovt: ['motiveerde', 'motiveerde', 'motiveerde', 'motiveerden', 'motiveerden', 'motiveerden'], vtt_part: 'gemotiveerd', auxiliary: 'hebben', imperative: 'motiveer', level: 'B2' },
    inspireren: { infinitive: 'inspireren', ott: ['inspireer', 'inspireert', 'inspireert', 'inspireren', 'inspireren', 'inspireren'], ovt: ['inspireerde', 'inspireerde', 'inspireerde', 'inspireerden', 'inspireerden', 'inspireerden'], vtt_part: 'geïnspireerd', auxiliary: 'hebben', imperative: 'inspireer', level: 'B2' },
    beïnvloeden: { infinitive: 'beïnvloeden', ott: ['beïnvloed', 'beïnvloedt', 'beïnvloedt', 'beïnvloeden', 'beïnvloeden', 'beïnvloeden'], ovt: ['beïnvloedde', 'beïnvloedde', 'beïnvloedde', 'beïnvloedden', 'beïnvloedden', 'beïnvloedden'], vtt_part: 'beïnvloed', auxiliary: 'hebben', imperative: 'beïnvloed', level: 'B2' },
    overtuigen: { infinitive: 'overtuigen', ott: ['overtuig', 'overtuigt', 'overtuigt', 'overtuigen', 'overtuigen', 'overtuigen'], ovt: ['overtuigde', 'overtuigde', 'overtuigde', 'overtuigden', 'overtuigden', 'overtuigden'], vtt_part: 'overtuigd', auxiliary: 'hebben', imperative: 'overtuig', level: 'B2' },
    adviseren: { infinitive: 'adviseren', ott: ['adviseer', 'adviseert', 'adviseert', 'adviseren', 'adviseren', 'adviseren'], ovt: ['adviseerde', 'adviseerde', 'adviseerde', 'adviseerden', 'adviseerden', 'adviseerden'], vtt_part: 'geadviseerd', auxiliary: 'hebben', imperative: 'adviseer', level: 'B2' },
    // C1 verbs
    waarborgen: { infinitive: 'waarborgen', ott: ['waarborg', 'waarborgt', 'waarborgt', 'waarborgen', 'waarborgen', 'waarborgen'], ovt: ['waarborgde', 'waarborgde', 'waarborgde', 'waarborgden', 'waarborgden', 'waarborgden'], vtt_part: 'gewaarborgd', auxiliary: 'hebben', imperative: 'waarborg', level: 'C1' },
    implementeren: { infinitive: 'implementeren', ott: ['implementeer', 'implementeert', 'implementeert', 'implementeren', 'implementeren', 'implementeren'], ovt: ['implementeerde', 'implementeerde', 'implementeerde', 'implementeerden', 'implementeerden', 'implementeerden'], vtt_part: 'geïmplementeerd', auxiliary: 'hebben', imperative: 'implementeer', level: 'C1' },
    realiseren: { infinitive: 'realiseren', ott: ['realiseer', 'realiseert', 'realiseert', 'realiseren', 'realiseren', 'realiseren'], ovt: ['realiseerde', 'realiseerde', 'realiseerde', 'realiseerden', 'realiseerden', 'realiseerden'], vtt_part: 'gerealiseerd', auxiliary: 'hebben', imperative: 'realiseer', level: 'C1' },
    optimaliseren: { infinitive: 'optimaliseren', ott: ['optimaliseer', 'optimaliseert', 'optimaliseert', 'optimaliseren', 'optimaliseren', 'optimaliseren'], ovt: ['optimaliseerde', 'optimaliseerde', 'optimaliseerde', 'optimaliseerden', 'optimaliseerden', 'optimaliseerden'], vtt_part: 'geoptimaliseerd', auxiliary: 'hebben', imperative: 'optimaliseer', level: 'C1' },
    faciliteren: { infinitive: 'faciliteren', ott: ['faciliteer', 'faciliteert', 'faciliteert', 'faciliteren', 'faciliteren', 'faciliteren'], ovt: ['faciliteerde', 'faciliteerde', 'faciliteerde', 'faciliteerden', 'faciliteerden', 'faciliteerden'], vtt_part: 'gefaciliteerd', auxiliary: 'hebben', imperative: 'faciliteer', level: 'C1' },
    coördineren: { infinitive: 'coördineren', ott: ['coördineer', 'coördineert', 'coördineert', 'coördineren', 'coördineren', 'coördineren'], ovt: ['coördineerde', 'coördineerde', 'coördineerde', 'coördineerden', 'coördineerden', 'coördineerden'], vtt_part: 'gecoördineerd', auxiliary: 'hebben', imperative: 'coördineer', level: 'C1' },
    integreren: { infinitive: 'integreren', ott: ['integreer', 'integreert', 'integreert', 'integreren', 'integreren', 'integreren'], ovt: ['integreerde', 'integreerde', 'integreerde', 'integreerden', 'integreerden', 'integreerden'], vtt_part: 'geïntegreerd', auxiliary: 'hebben', imperative: 'integreer', level: 'C1' },
    harmoniseren: { infinitive: 'harmoniseren', ott: ['harmoniseer', 'harmoniseert', 'harmoniseert', 'harmoniseren', 'harmoniseren', 'harmoniseren'], ovt: ['harmoniseerde', 'harmoniseerde', 'harmoniseerde', 'harmoniseerden', 'harmoniseerden', 'harmoniseerden'], vtt_part: 'geharmoniseerd', auxiliary: 'hebben', imperative: 'harmoniseer', level: 'C1' },
    consolideren: { infinitive: 'consolideren', ott: ['consolideer', 'consolideert', 'consolideert', 'consolideren', 'consolideren', 'consolideren'], ovt: ['consolideerde', 'consolideerde', 'consolideerde', 'consolideerden', 'consolideerden', 'consolideerden'], vtt_part: 'geconsolideerd', auxiliary: 'hebben', imperative: 'consolideer', level: 'C1' },
    diversificeren: { infinitive: 'diversificeren', ott: ['diversificeer', 'diversificeert', 'diversificeert', 'diversificeren', 'diversificeren', 'diversificeren'], ovt: ['diversificeerde', 'diversificeerde', 'diversificeerde', 'diversificeerden', 'diversificeerden', 'diversificeerden'], vtt_part: 'gediversificeerd', auxiliary: 'hebben', imperative: 'diversificeer', level: 'C1' },
    // C2 verbs
    verwezenlijken: { infinitive: 'verwezenlijken', ott: ['verwezenlijk', 'verwezenlijkt', 'verwezenlijkt', 'verwezenlijken', 'verwezenlijken', 'verwezenlijken'], ovt: ['verwezenlijkte', 'verwezenlijkte', 'verwezenlijkte', 'verwezenlijkten', 'verwezenlijkten', 'verwezenlijkten'], vtt_part: 'verwezenlijkt', auxiliary: 'hebben', imperative: 'verwezenlijk', level: 'C2' },
    conceptualiseren: { infinitive: 'conceptualiseren', ott: ['conceptualiseer', 'conceptualiseert', 'conceptualiseert', 'conceptualiseren', 'conceptualiseren', 'conceptualiseren'], ovt: ['conceptualiseerde', 'conceptualiseerde', 'conceptualiseerde', 'conceptualiseerden', 'conceptualiseerden', 'conceptualiseerden'], vtt_part: 'geconceptualiseerd', auxiliary: 'hebben', imperative: 'conceptualiseer', level: 'C2' },
    contextualiseren: { infinitive: 'contextualiseren', ott: ['contextualiseer', 'contextualiseert', 'contextualiseert', 'contextualiseren', 'contextualiseren', 'contextualiseren'], ovt: ['contextualiseerde', 'contextualiseerde', 'contextualiseerde', 'contextualiseerden', 'contextualiseerden', 'contextualiseerden'], vtt_part: 'gecontextualiseerd', auxiliary: 'hebben', imperative: 'contextualiseer', level: 'C2' },
    problematiseren: { infinitive: 'problematiseren', ott: ['problematiseer', 'problematiseert', 'problematiseert', 'problematiseren', 'problematiseren', 'problematiseren'], ovt: ['problematiseerde', 'problematiseerde', 'problematiseerde', 'problematiseerden', 'problematiseerden', 'problematiseerden'], vtt_part: 'geproblematiseerd', auxiliary: 'hebben', imperative: 'problematiseer', level: 'C2' },
    theoretiseren: { infinitive: 'theoretiseren', ott: ['theoretiseer', 'theoretiseert', 'theoretiseert', 'theoretiseren', 'theoretiseren', 'theoretiseren'], ovt: ['theoretiseerde', 'theoretiseerde', 'theoretiseerde', 'theoretiseerden', 'theoretiseerden', 'theoretiseerden'], vtt_part: 'getheoretiseerd', auxiliary: 'hebben', imperative: 'theoretiseer', level: 'C2' },
    filosoferen: { infinitive: 'filosoferen', ott: ['filosofeer', 'filosofeert', 'filosofeert', 'filosoferen', 'filosoferen', 'filosoferen'], ovt: ['filosofeerde', 'filosofeerde', 'filosofeerde', 'filosofeerden', 'filosofeerden', 'filosofeerden'], vtt_part: 'gefilosofeerd', auxiliary: 'hebben', imperative: 'filosofeer', level: 'C2' },
    operationaliseren: { infinitive: 'operationaliseren', ott: ['operationaliseer', 'operationaliseert', 'operationaliseert', 'operationaliseren', 'operationaliseren', 'operationaliseren'], ovt: ['operationaliseerde', 'operationaliseerde', 'operationaliseerde', 'operationaliseerden', 'operationaliseerden', 'operationaliseerden'], vtt_part: 'geoperationaliseerd', auxiliary: 'hebben', imperative: 'operationaliseer', level: 'C2' },
    institutionaliseren: { infinitive: 'institutionaliseren', ott: ['institutionaliseer', 'institutionaliseert', 'institutionaliseert', 'institutionaliseren', 'institutionaliseren', 'institutionaliseren'], ovt: ['institutionaliseerde', 'institutionaliseerde', 'institutionaliseerde', 'institutionaliseerden', 'institutionaliseerden', 'institutionaliseerden'], vtt_part: 'geïnstitutionaliseerd', auxiliary: 'hebben', imperative: 'institutionaliseer', level: 'C2' },
    // Additional A1 verbs (everyday activities)
    wachten: { infinitive: 'wachten', ott: ['wacht', 'wacht', 'wacht', 'wachten', 'wachten', 'wachten'], ovt: ['wachtte', 'wachtte', 'wachtte', 'wachtten', 'wachtten', 'wachtten'], vtt_part: 'gewacht', auxiliary: 'hebben', imperative: 'wacht', level: 'A1' },
    sturen: { infinitive: 'sturen', ott: ['stuur', 'stuurt', 'stuurt', 'sturen', 'sturen', 'sturen'], ovt: ['stuurde', 'stuurde', 'stuurde', 'stuurden', 'stuurden', 'stuurden'], vtt_part: 'gestuurd', auxiliary: 'hebben', imperative: 'stuur', level: 'A1' },
    pakken: { infinitive: 'pakken', ott: ['pak', 'pakt', 'pakt', 'pakken', 'pakken', 'pakken'], ovt: ['pakte', 'pakte', 'pakte', 'pakten', 'pakten', 'pakten'], vtt_part: 'gepakt', auxiliary: 'hebben', imperative: 'pak', level: 'A1' },
    leggen: { infinitive: 'leggen', ott: ['leg', 'legt', 'legt', 'leggen', 'leggen', 'leggen'], ovt: ['legde', 'legde', 'legde', 'legden', 'legden', 'legden'], vtt_part: 'gelegd', auxiliary: 'hebben', imperative: 'leg', level: 'A1' },
    zetten: { infinitive: 'zetten', ott: ['zet', 'zet', 'zet', 'zetten', 'zetten', 'zetten'], ovt: ['zette', 'zette', 'zette', 'zetten', 'zetten', 'zetten'], vtt_part: 'gezet', auxiliary: 'hebben', imperative: 'zet', level: 'A1' },
    halen: { infinitive: 'halen', ott: ['haal', 'haalt', 'haalt', 'halen', 'halen', 'halen'], ovt: ['haalde', 'haalde', 'haalde', 'haalden', 'haalden', 'haalden'], vtt_part: 'gehaald', auxiliary: 'hebben', imperative: 'haal', level: 'A1' },
    wonen: { infinitive: 'wonen', ott: ['woon', 'woont', 'woont', 'wonen', 'wonen', 'wonen'], ovt: ['woonde', 'woonde', 'woonde', 'woonden', 'woonden', 'woonden'], vtt_part: 'gewoond', auxiliary: 'hebben', imperative: 'woon', level: 'A1' },
    bellen: { infinitive: 'bellen', ott: ['bel', 'belt', 'belt', 'bellen', 'bellen', 'bellen'], ovt: ['belde', 'belde', 'belde', 'belden', 'belden', 'belden'], vtt_part: 'gebeld', auxiliary: 'hebben', imperative: 'bel', level: 'A1' },
    voelen: { infinitive: 'voelen', ott: ['voel', 'voelt', 'voelt', 'voelen', 'voelen', 'voelen'], ovt: ['voelde', 'voelde', 'voelde', 'voelden', 'voelden', 'voelden'], vtt_part: 'gevoeld', auxiliary: 'hebben', imperative: 'voel', level: 'A1' },
    snijden: { infinitive: 'snijden', ott: ['snijd', 'snijdt', 'snijdt', 'snijden', 'snijden', 'snijden'], ovt: ['sneed', 'sneed', 'sneed', 'sneden', 'sneden', 'sneden'], vtt_part: 'gesneden', auxiliary: 'hebben', imperative: 'snijd', level: 'A1' },
    vallen: { infinitive: 'vallen', ott: ['val', 'valt', 'valt', 'vallen', 'vallen', 'vallen'], ovt: ['viel', 'viel', 'viel', 'vielen', 'vielen', 'vielen'], vtt_part: 'gevallen', auxiliary: 'zijn', imperative: 'val', level: 'A1' },
    rennen: { infinitive: 'rennen', ott: ['ren', 'rent', 'rent', 'rennen', 'rennen', 'rennen'], ovt: ['rende', 'rende', 'rende', 'renden', 'renden', 'renden'], vtt_part: 'gerend', auxiliary: 'hebben', imperative: 'ren', level: 'A1' },
    stappen: { infinitive: 'stappen', ott: ['stap', 'stapt', 'stapt', 'stappen', 'stappen', 'stappen'], ovt: ['stapte', 'stapte', 'stapte', 'stapten', 'stapten', 'stapten'], vtt_part: 'gestapt', auxiliary: 'zijn', imperative: 'stap', level: 'A1' },
    bouwen: { infinitive: 'bouwen', ott: ['bouw', 'bouwt', 'bouwt', 'bouwen', 'bouwen', 'bouwen'], ovt: ['bouwde', 'bouwde', 'bouwde', 'bouwden', 'bouwden', 'bouwden'], vtt_part: 'gebouwd', auxiliary: 'hebben', imperative: 'bouw', level: 'A1' },
    rusten: { infinitive: 'rusten', ott: ['rust', 'rust', 'rust', 'rusten', 'rusten', 'rusten'], ovt: ['rustte', 'rustte', 'rustte', 'rustten', 'rustten', 'rustten'], vtt_part: 'gerust', auxiliary: 'hebben', imperative: 'rust', level: 'A1' },
    lachen: { infinitive: 'lachen', ott: ['lach', 'lacht', 'lacht', 'lachen', 'lachen', 'lachen'], ovt: ['lachte', 'lachte', 'lachte', 'lachten', 'lachten', 'lachten'], vtt_part: 'gelachen', auxiliary: 'hebben', imperative: 'lach', level: 'A1' },
    huilen: { infinitive: 'huilen', ott: ['huil', 'huilt', 'huilt', 'huilen', 'huilen', 'huilen'], ovt: ['huilde', 'huilde', 'huilde', 'huilden', 'huilden', 'huilden'], vtt_part: 'gehuild', auxiliary: 'hebben', imperative: 'huil', level: 'A1' },
    schreeuwen: { infinitive: 'schreeuwen', ott: ['schreeuw', 'schreeuwt', 'schreeuwt', 'schreeuwen', 'schreeuwen', 'schreeuwen'], ovt: ['schreeuwde', 'schreeuwde', 'schreeuwde', 'schreeuwden', 'schreeuwden', 'schreeuwden'], vtt_part: 'geschreeuwd', auxiliary: 'hebben', imperative: 'schreeuw', level: 'A1' },
    lopen: { infinitive: 'lopen', ott: ['loop', 'loopt', 'loopt', 'lopen', 'lopen', 'lopen'], ovt: ['liep', 'liep', 'liep', 'liepen', 'liepen', 'liepen'], vtt_part: 'gelopen', auxiliary: 'zijn', imperative: 'loop', level: 'A1' },
    springen: { infinitive: 'springen', ott: ['spring', 'springt', 'springt', 'springen', 'springen', 'springen'], ovt: ['sprong', 'sprong', 'sprong', 'sprongen', 'sprongen', 'sprongen'], vtt_part: 'gesprongen', auxiliary: 'zijn', imperative: 'spring', level: 'A1' },
    dragen: { infinitive: 'dragen', ott: ['draag', 'draagt', 'draagt', 'dragen', 'dragen', 'dragen'], ovt: ['droeg', 'droeg', 'droeg', 'droegen', 'droegen', 'droegen'], vtt_part: 'gedragen', auxiliary: 'hebben', imperative: 'draag', level: 'A1' },
    sterven: { infinitive: 'sterven', ott: ['sterf', 'sterft', 'sterft', 'sterven', 'sterven', 'sterven'], ovt: ['stierf', 'stierf', 'stierf', 'stierven', 'stierven', 'stierven'], vtt_part: 'gestorven', auxiliary: 'zijn', imperative: 'sterf', level: 'A1' },
    groeien: { infinitive: 'groeien', ott: ['groei', 'groeit', 'groeit', 'groeien', 'groeien', 'groeien'], ovt: ['groeide', 'groeide', 'groeide', 'groeiden', 'groeiden', 'groeiden'], vtt_part: 'gegroeid', auxiliary: 'zijn', imperative: 'groei', level: 'A1' },
    // Additional A2 verbs
    winnen: { infinitive: 'winnen', ott: ['win', 'wint', 'wint', 'winnen', 'winnen', 'winnen'], ovt: ['won', 'won', 'won', 'wonnen', 'wonnen', 'wonnen'], vtt_part: 'gewonnen', auxiliary: 'hebben', imperative: 'win', level: 'A2' },
    verliezen: { infinitive: 'verliezen', ott: ['verlies', 'verliest', 'verliest', 'verliezen', 'verliezen', 'verliezen'], ovt: ['verloor', 'verloor', 'verloor', 'verloren', 'verloren', 'verloren'], vtt_part: 'verloren', auxiliary: 'hebben', imperative: 'verlies', level: 'A2' },
    strijken: { infinitive: 'strijken', ott: ['strijk', 'strijkt', 'strijkt', 'strijken', 'strijken', 'strijken'], ovt: ['streek', 'streek', 'streek', 'streken', 'streken', 'streken'], vtt_part: 'gestreken', auxiliary: 'hebben', imperative: 'strijk', level: 'A2' },
    poetsen: { infinitive: 'poetsen', ott: ['poets', 'poetst', 'poetst', 'poetsen', 'poetsen', 'poetsen'], ovt: ['poetste', 'poetste', 'poetste', 'poetsten', 'poetsten', 'poetsten'], vtt_part: 'gepoetst', auxiliary: 'hebben', imperative: 'poets', level: 'A2' },
    vouwen: { infinitive: 'vouwen', ott: ['vouw', 'vouwt', 'vouwt', 'vouwen', 'vouwen', 'vouwen'], ovt: ['vouwde', 'vouwde', 'vouwde', 'vouwden', 'vouwden', 'vouwden'], vtt_part: 'gevouwen', auxiliary: 'hebben', imperative: 'vouw', level: 'A2' },
    gieten: { infinitive: 'gieten', ott: ['giet', 'giet', 'giet', 'gieten', 'gieten', 'gieten'], ovt: ['goot', 'goot', 'goot', 'goten', 'goten', 'goten'], vtt_part: 'gegoten', auxiliary: 'hebben', imperative: 'giet', level: 'A2' },
    planten: { infinitive: 'planten', ott: ['plant', 'plant', 'plant', 'planten', 'planten', 'planten'], ovt: ['plantte', 'plantte', 'plantte', 'plantten', 'plantten', 'plantten'], vtt_part: 'geplant', auxiliary: 'hebben', imperative: 'plant', level: 'A2' },
    verven: { infinitive: 'verven', ott: ['verf', 'verft', 'verft', 'verven', 'verven', 'verven'], ovt: ['verfde', 'verfde', 'verfde', 'verfden', 'verfden', 'verfden'], vtt_part: 'geverfd', auxiliary: 'hebben', imperative: 'verf', level: 'A2' },
    vegen: { infinitive: 'vegen', ott: ['veeg', 'veegt', 'veegt', 'vegen', 'vegen', 'vegen'], ovt: ['veegde', 'veegde', 'veegde', 'veegden', 'veegden', 'veegden'], vtt_part: 'geveegd', auxiliary: 'hebben', imperative: 'veeg', level: 'A2' },
    hangen: { infinitive: 'hangen', ott: ['hang', 'hangt', 'hangt', 'hangen', 'hangen', 'hangen'], ovt: ['hing', 'hing', 'hing', 'hingen', 'hingen', 'hingen'], vtt_part: 'gehangen', auxiliary: 'hebben', imperative: 'hang', level: 'A2' },
    klimmen: { infinitive: 'klimmen', ott: ['klim', 'klimt', 'klimt', 'klimmen', 'klimmen', 'klimmen'], ovt: ['klom', 'klom', 'klom', 'klommen', 'klommen', 'klommen'], vtt_part: 'geklommen', auxiliary: 'zijn', imperative: 'klim', level: 'A2' },
    zakken: { infinitive: 'zakken', ott: ['zak', 'zakt', 'zakt', 'zakken', 'zakken', 'zakken'], ovt: ['zakte', 'zakte', 'zakte', 'zakten', 'zakten', 'zakten'], vtt_part: 'gezakt', auxiliary: 'zijn', imperative: 'zak', level: 'A2' },
    stijgen: { infinitive: 'stijgen', ott: ['stijg', 'stijgt', 'stijgt', 'stijgen', 'stijgen', 'stijgen'], ovt: ['steeg', 'steeg', 'steeg', 'stegen', 'stegen', 'stegen'], vtt_part: 'gestegen', auxiliary: 'zijn', imperative: 'stijg', level: 'A2' },
    dalen: { infinitive: 'dalen', ott: ['daal', 'daalt', 'daalt', 'dalen', 'dalen', 'dalen'], ovt: ['daalde', 'daalde', 'daalde', 'daalden', 'daalden', 'daalden'], vtt_part: 'gedaald', auxiliary: 'zijn', imperative: 'daal', level: 'A2' },
    knallen: { infinitive: 'knallen', ott: ['knal', 'knalt', 'knalt', 'knallen', 'knallen', 'knallen'], ovt: ['knalde', 'knalde', 'knalde', 'knalden', 'knalden', 'knalden'], vtt_part: 'geknald', auxiliary: 'hebben', imperative: 'knal', level: 'A2' },
    fluiten: { infinitive: 'fluiten', ott: ['fluit', 'fluit', 'fluit', 'fluiten', 'fluiten', 'fluiten'], ovt: ['floot', 'floot', 'floot', 'floten', 'floten', 'floten'], vtt_part: 'gefloten', auxiliary: 'hebben', imperative: 'fluit', level: 'A2' },
    schrikken: { infinitive: 'schrikken', ott: ['schrik', 'schrikt', 'schrikt', 'schrikken', 'schrikken', 'schrikken'], ovt: ['schrok', 'schrok', 'schrok', 'schrokken', 'schrokken', 'schrokken'], vtt_part: 'geschrokken', auxiliary: 'zijn', imperative: 'schrik', level: 'A2' },
    leunen: { infinitive: 'leunen', ott: ['leun', 'leunt', 'leunt', 'leunen', 'leunen', 'leunen'], ovt: ['leunde', 'leunde', 'leunde', 'leunden', 'leunden', 'leunden'], vtt_part: 'geleund', auxiliary: 'hebben', imperative: 'leun', level: 'A2' },
    smijten: { infinitive: 'smijten', ott: ['smijt', 'smijt', 'smijt', 'smijten', 'smijten', 'smijten'], ovt: ['smeet', 'smeet', 'smeet', 'smeten', 'smeten', 'smeten'], vtt_part: 'gesmeten', auxiliary: 'hebben', imperative: 'smijt', level: 'A2' },
    gooien: { infinitive: 'gooien', ott: ['gooi', 'gooit', 'gooit', 'gooien', 'gooien', 'gooien'], ovt: ['gooide', 'gooide', 'gooide', 'gooiden', 'gooiden', 'gooiden'], vtt_part: 'gegooid', auxiliary: 'hebben', imperative: 'gooi', level: 'A2' },
    vangen: { infinitive: 'vangen', ott: ['vang', 'vangt', 'vangt', 'vangen', 'vangen', 'vangen'], ovt: ['ving', 'ving', 'ving', 'vingen', 'vingen', 'vingen'], vtt_part: 'gevangen', auxiliary: 'hebben', imperative: 'vang', level: 'A2' },
    knopen: { infinitive: 'knopen', ott: ['knoop', 'knoopt', 'knoopt', 'knopen', 'knopen', 'knopen'], ovt: ['knoopte', 'knoopte', 'knoopte', 'knoopten', 'knoopten', 'knoopten'], vtt_part: 'geknoopt', auxiliary: 'hebben', imperative: 'knoop', level: 'A2' },
    binden: { infinitive: 'binden', ott: ['bind', 'bindt', 'bindt', 'binden', 'binden', 'binden'], ovt: ['bond', 'bond', 'bond', 'bonden', 'bonden', 'bonden'], vtt_part: 'gebonden', auxiliary: 'hebben', imperative: 'bind', level: 'A2' },
    // Additional B1 verbs
    ontmoeten: { infinitive: 'ontmoeten', ott: ['ontmoet', 'ontmoet', 'ontmoet', 'ontmoeten', 'ontmoeten', 'ontmoeten'], ovt: ['ontmoette', 'ontmoette', 'ontmoette', 'ontmoetten', 'ontmoetten', 'ontmoetten'], vtt_part: 'ontmoet', auxiliary: 'hebben', imperative: 'ontmoet', level: 'B1' },
    bezoeken: { infinitive: 'bezoeken', ott: ['bezoek', 'bezoekt', 'bezoekt', 'bezoeken', 'bezoeken', 'bezoeken'], ovt: ['bezocht', 'bezocht', 'bezocht', 'bezochten', 'bezochten', 'bezochten'], vtt_part: 'bezocht', auxiliary: 'hebben', imperative: 'bezoek', level: 'B1' },
    uitnodigen: { infinitive: 'uitnodigen', ott: ['nodig uit', 'nodigt uit', 'nodigt uit', 'nodigen uit', 'nodigen uit', 'nodigen uit'], ovt: ['nodigde uit', 'nodigde uit', 'nodigde uit', 'nodigden uit', 'nodigden uit', 'nodigden uit'], vtt_part: 'uitgenodigd', auxiliary: 'hebben', imperative: 'nodig uit', level: 'B1' },
    weigeren: { infinitive: 'weigeren', ott: ['weiger', 'weigert', 'weigert', 'weigeren', 'weigeren', 'weigeren'], ovt: ['weigerde', 'weigerde', 'weigerde', 'weigerden', 'weigerden', 'weigerden'], vtt_part: 'geweigerd', auxiliary: 'hebben', imperative: 'weiger', level: 'B1' },
    aanvaarden: { infinitive: 'aanvaarden', ott: ['aanvaard', 'aanvaardt', 'aanvaardt', 'aanvaarden', 'aanvaarden', 'aanvaarden'], ovt: ['aanvaardde', 'aanvaardde', 'aanvaardde', 'aanvaardden', 'aanvaardden', 'aanvaardden'], vtt_part: 'aanvaard', auxiliary: 'hebben', imperative: 'aanvaard', level: 'B1' },
    waarschuwen: { infinitive: 'waarschuwen', ott: ['waarschuw', 'waarschuwt', 'waarschuwt', 'waarschuwen', 'waarschuwen', 'waarschuwen'], ovt: ['waarschuwde', 'waarschuwde', 'waarschuwde', 'waarschuwden', 'waarschuwden', 'waarschuwden'], vtt_part: 'gewaarschuwd', auxiliary: 'hebben', imperative: 'waarschuw', level: 'B1' },
    voorstellen: { infinitive: 'voorstellen', ott: ['stel voor', 'stelt voor', 'stelt voor', 'stellen voor', 'stellen voor', 'stellen voor'], ovt: ['stelde voor', 'stelde voor', 'stelde voor', 'stelden voor', 'stelden voor', 'stelden voor'], vtt_part: 'voorgesteld', auxiliary: 'hebben', imperative: 'stel voor', level: 'B1' },
    aanbieden: { infinitive: 'aanbieden', ott: ['bied aan', 'biedt aan', 'biedt aan', 'bieden aan', 'bieden aan', 'bieden aan'], ovt: ['bood aan', 'bood aan', 'bood aan', 'boden aan', 'boden aan', 'boden aan'], vtt_part: 'aangeboden', auxiliary: 'hebben', imperative: 'bied aan', level: 'B1' },
    toestaan: { infinitive: 'toestaan', ott: ['sta toe', 'staat toe', 'staat toe', 'staan toe', 'staan toe', 'staan toe'], ovt: ['stond toe', 'stond toe', 'stond toe', 'stonden toe', 'stonden toe', 'stonden toe'], vtt_part: 'toegestaan', auxiliary: 'hebben', imperative: 'sta toe', level: 'B1' },
    verbieden: { infinitive: 'verbieden', ott: ['verbied', 'verbiedt', 'verbiedt', 'verbieden', 'verbieden', 'verbieden'], ovt: ['verbood', 'verbood', 'verbood', 'verboden', 'verboden', 'verboden'], vtt_part: 'verboden', auxiliary: 'hebben', imperative: 'verbied', level: 'B1' },
    dwingen: { infinitive: 'dwingen', ott: ['dwing', 'dwingt', 'dwingt', 'dwingen', 'dwingen', 'dwingen'], ovt: ['dwong', 'dwong', 'dwong', 'dwongen', 'dwongen', 'dwongen'], vtt_part: 'gedwongen', auxiliary: 'hebben', imperative: 'dwing', level: 'B1' },
    verhinderen: { infinitive: 'verhinderen', ott: ['verhinder', 'verhindert', 'verhindert', 'verhinderen', 'verhinderen', 'verhinderen'], ovt: ['verhinderde', 'verhinderde', 'verhinderde', 'verhinderden', 'verhinderden', 'verhinderden'], vtt_part: 'verhinderd', auxiliary: 'hebben', imperative: 'verhinder', level: 'B1' },
    beloven: { infinitive: 'beloven', ott: ['beloof', 'belooft', 'belooft', 'beloven', 'beloven', 'beloven'], ovt: ['beloofde', 'beloofde', 'beloofde', 'beloofden', 'beloofden', 'beloofden'], vtt_part: 'beloofd', auxiliary: 'hebben', imperative: 'beloof', level: 'B1' },
    dreigen: { infinitive: 'dreigen', ott: ['dreig', 'dreigt', 'dreigt', 'dreigen', 'dreigen', 'dreigen'], ovt: ['dreigde', 'dreigde', 'dreigde', 'dreigden', 'dreigden', 'dreigden'], vtt_part: 'gedreigd', auxiliary: 'hebben', imperative: 'dreig', level: 'B1' },
    betwijfelen: { infinitive: 'betwijfelen', ott: ['betwijfel', 'betwijfelt', 'betwijfelt', 'betwijfelen', 'betwijfelen', 'betwijfelen'], ovt: ['betwijfelde', 'betwijfelde', 'betwijfelde', 'betwijfelden', 'betwijfelden', 'betwijfelden'], vtt_part: 'betwijfeld', auxiliary: 'hebben', imperative: 'betwijfel', level: 'B1' },
    veronderstellen: { infinitive: 'veronderstellen', ott: ['veronderstel', 'veronderstelt', 'veronderstelt', 'veronderstellen', 'veronderstellen', 'veronderstellen'], ovt: ['veronderstelde', 'veronderstelde', 'veronderstelde', 'veronderstelden', 'veronderstelden', 'veronderstelden'], vtt_part: 'verondersteld', auxiliary: 'hebben', imperative: 'veronderstel', level: 'B1' },
    bewijzen: { infinitive: 'bewijzen', ott: ['bewijs', 'bewijst', 'bewijst', 'bewijzen', 'bewijzen', 'bewijzen'], ovt: ['bewees', 'bewees', 'bewees', 'bewezen', 'bewezen', 'bewezen'], vtt_part: 'bewezen', auxiliary: 'hebben', imperative: 'bewijs', level: 'B1' },
    ontkennen: { infinitive: 'ontkennen', ott: ['ontken', 'ontkent', 'ontkent', 'ontkennen', 'ontkennen', 'ontkennen'], ovt: ['ontkende', 'ontkende', 'ontkende', 'ontkenden', 'ontkenden', 'ontkenden'], vtt_part: 'ontkend', auxiliary: 'hebben', imperative: 'ontken', level: 'B1' },
    bevestigen: { infinitive: 'bevestigen', ott: ['bevestig', 'bevestigt', 'bevestigt', 'bevestigen', 'bevestigen', 'bevestigen'], ovt: ['bevestigde', 'bevestigde', 'bevestigde', 'bevestigden', 'bevestigden', 'bevestigden'], vtt_part: 'bevestigd', auxiliary: 'hebben', imperative: 'bevestig', level: 'B1' },
    erkennen: { infinitive: 'erkennen', ott: ['erken', 'erkent', 'erkent', 'erkennen', 'erkennen', 'erkennen'], ovt: ['erkende', 'erkende', 'erkende', 'erkenden', 'erkenden', 'erkenden'], vtt_part: 'erkend', auxiliary: 'hebben', imperative: 'erken', level: 'B1' },
    twijfelen: { infinitive: 'twijfelen', ott: ['twijfel', 'twijfelt', 'twijfelt', 'twijfelen', 'twijfelen', 'twijfelen'], ovt: ['twijfelde', 'twijfelde', 'twijfelde', 'twijfelden', 'twijfelden', 'twijfelden'], vtt_part: 'getwijfeld', auxiliary: 'hebben', imperative: 'twijfel', level: 'B1' },
    // Additional B2 verbs
    benadrukken: { infinitive: 'benadrukken', ott: ['benadruk', 'benadrukt', 'benadrukt', 'benadrukken', 'benadrukken', 'benadrukken'], ovt: ['benadrukte', 'benadrukte', 'benadrukte', 'benadrukten', 'benadrukten', 'benadrukten'], vtt_part: 'benadrukt', auxiliary: 'hebben', imperative: 'benadruk', level: 'B2' },
    rechtvaardigen: { infinitive: 'rechtvaardigen', ott: ['rechtvaardig', 'rechtvaardigt', 'rechtvaardigt', 'rechtvaardigen', 'rechtvaardigen', 'rechtvaardigen'], ovt: ['rechtvaardigde', 'rechtvaardigde', 'rechtvaardigde', 'rechtvaardigden', 'rechtvaardigden', 'rechtvaardigden'], vtt_part: 'gerechtvaardigd', auxiliary: 'hebben', imperative: 'rechtvaardig', level: 'B2' },
    kritiseren: { infinitive: 'kritiseren', ott: ['kritiseer', 'kritiseert', 'kritiseert', 'kritiseren', 'kritiseren', 'kritiseren'], ovt: ['kritiseerde', 'kritiseerde', 'kritiseerde', 'kritiseerden', 'kritiseerden', 'kritiseerden'], vtt_part: 'gekritiseerd', auxiliary: 'hebben', imperative: 'kritiseer', level: 'B2' },
    beoordelen: { infinitive: 'beoordelen', ott: ['beoordeel', 'beoordeelt', 'beoordeelt', 'beoordelen', 'beoordelen', 'beoordelen'], ovt: ['beoordeelde', 'beoordeelde', 'beoordeelde', 'beoordeelden', 'beoordeelden', 'beoordeelden'], vtt_part: 'beoordeeld', auxiliary: 'hebben', imperative: 'beoordeel', level: 'B2' },
    weerleggen: { infinitive: 'weerleggen', ott: ['weerleg', 'weerlegt', 'weerlegt', 'weerleggen', 'weerleggen', 'weerleggen'], ovt: ['weerlegde', 'weerlegde', 'weerlegde', 'weerlegden', 'weerlegden', 'weerlegden'], vtt_part: 'weerlegd', auxiliary: 'hebben', imperative: 'weerleg', level: 'B2' },
    onderbouwen: { infinitive: 'onderbouwen', ott: ['onderbouw', 'onderbouwt', 'onderbouwt', 'onderbouwen', 'onderbouwen', 'onderbouwen'], ovt: ['onderbouwde', 'onderbouwde', 'onderbouwde', 'onderbouwden', 'onderbouwden', 'onderbouwden'], vtt_part: 'onderbouwd', auxiliary: 'hebben', imperative: 'onderbouw', level: 'B2' },
    nuanceren: { infinitive: 'nuanceren', ott: ['nuanceer', 'nuanceert', 'nuanceert', 'nuanceren', 'nuanceren', 'nuanceren'], ovt: ['nuanceerde', 'nuanceerde', 'nuanceerde', 'nuanceerden', 'nuanceerden', 'nuanceerden'], vtt_part: 'genuanceerd', auxiliary: 'hebben', imperative: 'nuanceer', level: 'B2' },
    relativeren: { infinitive: 'relativeren', ott: ['relativeer', 'relativeert', 'relativeert', 'relativeren', 'relativeren', 'relativeren'], ovt: ['relativeerde', 'relativeerde', 'relativeerde', 'relativeerden', 'relativeerden', 'relativeerden'], vtt_part: 'gerelativeerd', auxiliary: 'hebben', imperative: 'relativeer', level: 'B2' },
    bediscussiëren: { infinitive: 'bediscussiëren', ott: ['bediscussieer', 'bediscussieert', 'bediscussieert', 'bediscussiëren', 'bediscussiëren', 'bediscussiëren'], ovt: ['bediscussieerde', 'bediscussieerde', 'bediscussieerde', 'bediscussieerden', 'bediscussieerden', 'bediscussieerden'], vtt_part: 'bediscussieerd', auxiliary: 'hebben', imperative: 'bediscussieer', level: 'B2' },
    toelichten: { infinitive: 'toelichten', ott: ['licht toe', 'licht toe', 'licht toe', 'lichten toe', 'lichten toe', 'lichten toe'], ovt: ['lichtte toe', 'lichtte toe', 'lichtte toe', 'lichtten toe', 'lichtten toe', 'lichtten toe'], vtt_part: 'toegelicht', auxiliary: 'hebben', imperative: 'licht toe', level: 'B2' },
    specificeren: { infinitive: 'specificeren', ott: ['specificeer', 'specificeert', 'specificeert', 'specificeren', 'specificeren', 'specificeren'], ovt: ['specificeerde', 'specificeerde', 'specificeerde', 'specificeerden', 'specificeerden', 'specificeerden'], vtt_part: 'gespecificeerd', auxiliary: 'hebben', imperative: 'specificeer', level: 'B2' },
    generaliseren: { infinitive: 'generaliseren', ott: ['generaliseer', 'generaliseert', 'generaliseert', 'generaliseren', 'generaliseren', 'generaliseren'], ovt: ['generaliseerde', 'generaliseerde', 'generaliseerde', 'generaliseerden', 'generaliseerden', 'generaliseerden'], vtt_part: 'gegeneraliseerd', auxiliary: 'hebben', imperative: 'generaliseer', level: 'B2' },
    extrapoleren: { infinitive: 'extrapoleren', ott: ['extrapoleer', 'extrapoleert', 'extrapoleert', 'extrapoleren', 'extrapoleren', 'extrapoleren'], ovt: ['extrapoleerde', 'extrapoleerde', 'extrapoleerde', 'extrapoleerden', 'extrapoleerden', 'extrapoleerden'], vtt_part: 'geëxtrapoleerd', auxiliary: 'hebben', imperative: 'extrapoleer', level: 'B2' },
    verifiëren: { infinitive: 'verifiëren', ott: ['verifieer', 'verifieert', 'verifieert', 'verifiëren', 'verifiëren', 'verifiëren'], ovt: ['verifieerde', 'verifieerde', 'verifieerde', 'verifieerden', 'verifieerden', 'verifieerden'], vtt_part: 'geverifieerd', auxiliary: 'hebben', imperative: 'verifieer', level: 'B2' },
    falsificeren: { infinitive: 'falsificeren', ott: ['falsificeer', 'falsificeert', 'falsificeert', 'falsificeren', 'falsificeren', 'falsificeren'], ovt: ['falsificeerde', 'falsificeerde', 'falsificeerde', 'falsificeerden', 'falsificeerden', 'falsificeerden'], vtt_part: 'gefalsificeerd', auxiliary: 'hebben', imperative: 'falsificeer', level: 'B2' },
    synthetiseren: { infinitive: 'synthetiseren', ott: ['synthetiseer', 'synthetiseert', 'synthetiseert', 'synthetiseren', 'synthetiseren', 'synthetiseren'], ovt: ['synthetiseerde', 'synthetiseerde', 'synthetiseerde', 'synthetiseerden', 'synthetiseerden', 'synthetiseerden'], vtt_part: 'gesynthetiseerd', auxiliary: 'hebben', imperative: 'synthetiseer', level: 'B2' },
    formuleren: { infinitive: 'formuleren', ott: ['formuleer', 'formuleert', 'formuleert', 'formuleren', 'formuleren', 'formuleren'], ovt: ['formuleerde', 'formuleerde', 'formuleerde', 'formuleerden', 'formuleerden', 'formuleerden'], vtt_part: 'geformuleerd', auxiliary: 'hebben', imperative: 'formuleer', level: 'B2' },
    articuleren: { infinitive: 'articuleren', ott: ['articuleer', 'articuleert', 'articuleert', 'articuleren', 'articuleren', 'articuleren'], ovt: ['articuleerde', 'articuleerde', 'articuleerde', 'articuleerden', 'articuleerden', 'articuleerden'], vtt_part: 'gearticuleerd', auxiliary: 'hebben', imperative: 'articuleer', level: 'B2' },
    definiëren: { infinitive: 'definiëren', ott: ['definieer', 'definieert', 'definieert', 'definiëren', 'definiëren', 'definiëren'], ovt: ['definieerde', 'definieerde', 'definieerde', 'definieerden', 'definieerden', 'definieerden'], vtt_part: 'gedefinieerd', auxiliary: 'hebben', imperative: 'definieer', level: 'B2' },
    demonstreren: { infinitive: 'demonstreren', ott: ['demonstreer', 'demonstreert', 'demonstreert', 'demonstreren', 'demonstreren', 'demonstreren'], ovt: ['demonstreerde', 'demonstreerde', 'demonstreerde', 'demonstreerden', 'demonstreerden', 'demonstreerden'], vtt_part: 'gedemonstreerd', auxiliary: 'hebben', imperative: 'demonstreer', level: 'B2' },
    illustreren: { infinitive: 'illustreren', ott: ['illustreer', 'illustreert', 'illustreert', 'illustreren', 'illustreren', 'illustreren'], ovt: ['illustreerde', 'illustreerde', 'illustreerde', 'illustreerden', 'illustreerden', 'illustreerden'], vtt_part: 'geïllustreerd', auxiliary: 'hebben', imperative: 'illustreer', level: 'B2' },
    // Additional C1 verbs
    normaliseren: { infinitive: 'normaliseren', ott: ['normaliseer', 'normaliseert', 'normaliseert', 'normaliseren', 'normaliseren', 'normaliseren'], ovt: ['normaliseerde', 'normaliseerde', 'normaliseerde', 'normaliseerden', 'normaliseerden', 'normaliseerden'], vtt_part: 'genormaliseerd', auxiliary: 'hebben', imperative: 'normaliseer', level: 'C1' },
    standaardiseren: { infinitive: 'standaardiseren', ott: ['standaardiseer', 'standaardiseert', 'standaardiseert', 'standaardiseren', 'standaardiseren', 'standaardiseren'], ovt: ['standaardiseerde', 'standaardiseerde', 'standaardiseerde', 'standaardiseerden', 'standaardiseerden', 'standaardiseerden'], vtt_part: 'gestandaardiseerd', auxiliary: 'hebben', imperative: 'standaardiseer', level: 'C1' },
    uniformeren: { infinitive: 'uniformeren', ott: ['uniformeer', 'uniformeert', 'uniformeert', 'uniformeren', 'uniformeren', 'uniformeren'], ovt: ['uniformeerde', 'uniformeerde', 'uniformeerde', 'uniformeerden', 'uniformeerden', 'uniformeerden'], vtt_part: 'geüniformeerd', auxiliary: 'hebben', imperative: 'uniformeer', level: 'C1' },
    homogeniseren: { infinitive: 'homogeniseren', ott: ['homogeniseer', 'homogeniseert', 'homogeniseert', 'homogeniseren', 'homogeniseren', 'homogeniseren'], ovt: ['homogeniseerde', 'homogeniseerde', 'homogeniseerde', 'homogeniseerden', 'homogeniseerden', 'homogeniseerden'], vtt_part: 'gehomogeniseerd', auxiliary: 'hebben', imperative: 'homogeniseer', level: 'C1' },
    categoriseren: { infinitive: 'categoriseren', ott: ['categoriseer', 'categoriseert', 'categoriseert', 'categoriseren', 'categoriseren', 'categoriseren'], ovt: ['categoriseerde', 'categoriseerde', 'categoriseerde', 'categoriseerden', 'categoriseerden', 'categoriseerden'], vtt_part: 'gecategoriseerd', auxiliary: 'hebben', imperative: 'categoriseer', level: 'C1' },
    systematiseren: { infinitive: 'systematiseren', ott: ['systematiseer', 'systematiseert', 'systematiseert', 'systematiseren', 'systematiseren', 'systematiseren'], ovt: ['systematiseerde', 'systematiseerde', 'systematiseerde', 'systematiseerden', 'systematiseerden', 'systematiseerden'], vtt_part: 'gesystematiseerd', auxiliary: 'hebben', imperative: 'systematiseer', level: 'C1' },
    structureren: { infinitive: 'structureren', ott: ['structureer', 'structureert', 'structureert', 'structureren', 'structureren', 'structureren'], ovt: ['structureerde', 'structureerde', 'structureerde', 'structureerden', 'structureerden', 'structureerden'], vtt_part: 'gestructureerd', auxiliary: 'hebben', imperative: 'structureer', level: 'C1' },
    decentraliseren: { infinitive: 'decentraliseren', ott: ['decentraliseer', 'decentraliseert', 'decentraliseert', 'decentraliseren', 'decentraliseren', 'decentraliseren'], ovt: ['decentraliseerde', 'decentraliseerde', 'decentraliseerde', 'decentraliseerden', 'decentraliseerden', 'decentraliseerden'], vtt_part: 'gedecentraliseerd', auxiliary: 'hebben', imperative: 'decentraliseer', level: 'C1' },
    centraliseren: { infinitive: 'centraliseren', ott: ['centraliseer', 'centraliseert', 'centraliseert', 'centraliseren', 'centraliseren', 'centraliseren'], ovt: ['centraliseerde', 'centraliseerde', 'centraliseerde', 'centraliseerden', 'centraliseerden', 'centraliseerden'], vtt_part: 'gecentraliseerd', auxiliary: 'hebben', imperative: 'centraliseer', level: 'C1' },
    delegeren: { infinitive: 'delegeren', ott: ['delegeer', 'delegeert', 'delegeert', 'delegeren', 'delegeren', 'delegeren'], ovt: ['delegeerde', 'delegeerde', 'delegeerde', 'delegeerden', 'delegeerden', 'delegeerden'], vtt_part: 'gedelegeerd', auxiliary: 'hebben', imperative: 'delegeer', level: 'C1' },
    autoriseren: { infinitive: 'autoriseren', ott: ['autoriseer', 'autoriseert', 'autoriseert', 'autoriseren', 'autoriseren', 'autoriseren'], ovt: ['autoriseerde', 'autoriseerde', 'autoriseerde', 'autoriseerden', 'autoriseerden', 'autoriseerden'], vtt_part: 'geautoriseerd', auxiliary: 'hebben', imperative: 'autoriseer', level: 'C1' },
    legitimeren: { infinitive: 'legitimeren', ott: ['legitimeer', 'legitimeert', 'legitimeert', 'legitimeren', 'legitimeren', 'legitimeren'], ovt: ['legitimeerde', 'legitimeerde', 'legitimeerde', 'legitimeerden', 'legitimeerden', 'legitimeerden'], vtt_part: 'gelegitimeerd', auxiliary: 'hebben', imperative: 'legitimeer', level: 'C1' },
    sanctioneren: { infinitive: 'sanctioneren', ott: ['sanctioneer', 'sanctioneert', 'sanctioneert', 'sanctioneren', 'sanctioneren', 'sanctioneren'], ovt: ['sanctioneerde', 'sanctioneerde', 'sanctioneerde', 'sanctioneerden', 'sanctioneerden', 'sanctioneerden'], vtt_part: 'gesanctioneerd', auxiliary: 'hebben', imperative: 'sanctioneer', level: 'C1' },
    ratificeren: { infinitive: 'ratificeren', ott: ['ratificeer', 'ratificeert', 'ratificeert', 'ratificeren', 'ratificeren', 'ratificeren'], ovt: ['ratificeerde', 'ratificeerde', 'ratificeerde', 'ratificeerden', 'ratificeerden', 'ratificeerden'], vtt_part: 'geratificeerd', auxiliary: 'hebben', imperative: 'ratificeer', level: 'C1' },
    codificeren: { infinitive: 'codificeren', ott: ['codificeer', 'codificeert', 'codificeert', 'codificeren', 'codificeren', 'codificeren'], ovt: ['codificeerde', 'codificeerde', 'codificeerde', 'codificeerden', 'codificeerden', 'codificeerden'], vtt_part: 'gecodificeerd', auxiliary: 'hebben', imperative: 'codificeer', level: 'C1' },
    // Additional C2 verbs
    dialectiseren: { infinitive: 'dialectiseren', ott: ['dialectiseer', 'dialectiseert', 'dialectiseert', 'dialectiseren', 'dialectiseren', 'dialectiseren'], ovt: ['dialectiseerde', 'dialectiseerde', 'dialectiseerde', 'dialectiseerden', 'dialectiseerden', 'dialectiseerden'], vtt_part: 'gedialectiseerd', auxiliary: 'hebben', imperative: 'dialectiseer', level: 'C2' },
    objectiveren: { infinitive: 'objectiveren', ott: ['objectiveer', 'objectiveert', 'objectiveert', 'objectiveren', 'objectiveren', 'objectiveren'], ovt: ['objectiveerde', 'objectiveerde', 'objectiveerde', 'objectiveerden', 'objectiveerden', 'objectiveerden'], vtt_part: 'geobjectiveerd', auxiliary: 'hebben', imperative: 'objectiveer', level: 'C2' },
    subjectiveren: { infinitive: 'subjectiveren', ott: ['subjectiveer', 'subjectiveert', 'subjectiveert', 'subjectiveren', 'subjectiveren', 'subjectiveren'], ovt: ['subjectiveerde', 'subjectiveerde', 'subjectiveerde', 'subjectiveerden', 'subjectiveerden', 'subjectiveerden'], vtt_part: 'gesubjectiveerd', auxiliary: 'hebben', imperative: 'subjectiveer', level: 'C2' },
    abstraheren: { infinitive: 'abstraheren', ott: ['abstraheer', 'abstraheert', 'abstraheert', 'abstraheren', 'abstraheren', 'abstraheren'], ovt: ['abstraheerde', 'abstraheerde', 'abstraheerde', 'abstraheerden', 'abstraheerden', 'abstraheerden'], vtt_part: 'geabstraheerd', auxiliary: 'hebben', imperative: 'abstraheer', level: 'C2' },
    concretiseren: { infinitive: 'concretiseren', ott: ['concretiseer', 'concretiseert', 'concretiseert', 'concretiseren', 'concretiseren', 'concretiseren'], ovt: ['concretiseerde', 'concretiseerde', 'concretiseerde', 'concretiseerden', 'concretiseerden', 'concretiseerden'], vtt_part: 'geconcretiseerd', auxiliary: 'hebben', imperative: 'concretiseer', level: 'C2' },
    transcenderen: { infinitive: 'transcenderen', ott: ['transcendeer', 'transcendeert', 'transcendeert', 'transcenderen', 'transcenderen', 'transcenderen'], ovt: ['transcendeerde', 'transcendeerde', 'transcendeerde', 'transcendeerden', 'transcendeerden', 'transcendeerden'], vtt_part: 'getranscendeerd', auxiliary: 'hebben', imperative: 'transcendeer', level: 'C2' },
    immanentiseren: { infinitive: 'immanentiseren', ott: ['immanentiseer', 'immanentiseert', 'immanentiseert', 'immanentiseren', 'immanentiseren', 'immanentiseren'], ovt: ['immanentiseerde', 'immanentiseerde', 'immanentiseerde', 'immanentiseerden', 'immanentiseerden', 'immanentiseerden'], vtt_part: 'geïmmanentiseerd', auxiliary: 'hebben', imperative: 'immanentiseer', level: 'C2' },
    deconstructeren: { infinitive: 'deconstructeren', ott: ['deconstrueer', 'deconstrueert', 'deconstrueert', 'deconstructeren', 'deconstructeren', 'deconstructeren'], ovt: ['deconstrueerde', 'deconstrueerde', 'deconstrueerde', 'deconstrueerden', 'deconstrueerden', 'deconstrueerden'], vtt_part: 'gedeconstrueerd', auxiliary: 'hebben', imperative: 'deconstrueer', level: 'C2' },
    reconstrueren: { infinitive: 'reconstrueren', ott: ['reconstrueer', 'reconstrueert', 'reconstrueert', 'reconstrueren', 'reconstrueren', 'reconstrueren'], ovt: ['reconstrueerde', 'reconstrueerde', 'reconstrueerde', 'reconstrueerden', 'reconstrueerden', 'reconstrueerden'], vtt_part: 'gereconstrueerd', auxiliary: 'hebben', imperative: 'reconstrueer', level: 'C2' },
    hermeneutiseren: { infinitive: 'hermeneutiseren', ott: ['hermeneutiseer', 'hermeneutiseert', 'hermeneutiseert', 'hermeneutiseren', 'hermeneutiseren', 'hermeneutiseren'], ovt: ['hermeneutiseerde', 'hermeneutiseerde', 'hermeneutiseerde', 'hermeneutiseerden', 'hermeneutiseerden', 'hermeneutiseerden'], vtt_part: 'gehermeneutiseerd', auxiliary: 'hebben', imperative: 'hermeneutiseer', level: 'C2' },
    epistemologiseren: { infinitive: 'epistemologiseren', ott: ['epistemologiseer', 'epistemologiseert', 'epistemologiseert', 'epistemologiseren', 'epistemologiseren', 'epistemologiseren'], ovt: ['epistemologiseerde', 'epistemologiseerde', 'epistemologiseerde', 'epistemologiseerden', 'epistemologiseerden', 'epistemologiseerden'], vtt_part: 'geepistemologiseerd', auxiliary: 'hebben', imperative: 'epistemologiseer', level: 'C2' },
    ontologiseren: { infinitive: 'ontologiseren', ott: ['ontologiseer', 'ontologiseert', 'ontologiseert', 'ontologiseren', 'ontologiseren', 'ontologiseren'], ovt: ['ontologiseerde', 'ontologiseerde', 'ontologiseerde', 'ontologiseerden', 'ontologiseerden', 'ontologiseerden'], vtt_part: 'geontologiseerd', auxiliary: 'hebben', imperative: 'ontologiseer', level: 'C2' },
    fenomenologiseren: { infinitive: 'fenomenologiseren', ott: ['fenomenologiseer', 'fenomenologiseert', 'fenomenologiseert', 'fenomenologiseren', 'fenomenologiseren', 'fenomenologiseren'], ovt: ['fenomenologiseerde', 'fenomenologiseerde', 'fenomenologiseerde', 'fenomenologiseerden', 'fenomenologiseerden', 'fenomenologiseerden'], vtt_part: 'gefenomenologiseerd', auxiliary: 'hebben', imperative: 'fenomenologiseer', level: 'C2' },
    teleologiseren: { infinitive: 'teleologiseren', ott: ['teleologiseer', 'teleologiseert', 'teleologiseert', 'teleologiseren', 'teleologiseren', 'teleologiseren'], ovt: ['teleologiseerde', 'teleologiseerde', 'teleologiseerde', 'teleologiseerden', 'teleologiseerden', 'teleologiseerden'], vtt_part: 'geteleologiseerd', auxiliary: 'hebben', imperative: 'teleologiseer', level: 'C2' },
    axiomatiseren: { infinitive: 'axiomatiseren', ott: ['axiomatiseer', 'axiomatiseert', 'axiomatiseert', 'axiomatiseren', 'axiomatiseren', 'axiomatiseren'], ovt: ['axiomatiseerde', 'axiomatiseerde', 'axiomatiseerde', 'axiomatiseerden', 'axiomatiseerden', 'axiomatiseerden'], vtt_part: 'geaxiomatiseerd', auxiliary: 'hebben', imperative: 'axiomatiseer', level: 'C2' },
    // Final additions across all levels
    kussen: { infinitive: 'kussen', ott: ['kus', 'kust', 'kust', 'kussen', 'kussen', 'kussen'], ovt: ['kuste', 'kuste', 'kuste', 'kusten', 'kusten', 'kusten'], vtt_part: 'gekust', auxiliary: 'hebben', imperative: 'kus', level: 'A1' },
    knuffelen: { infinitive: 'knuffelen', ott: ['knuffel', 'knuffelt', 'knuffelt', 'knuffelen', 'knuffelen', 'knuffelen'], ovt: ['knuffelde', 'knuffelde', 'knuffelde', 'knuffelden', 'knuffelden', 'knuffelden'], vtt_part: 'geknuffeld', auxiliary: 'hebben', imperative: 'knuffel', level: 'A1' },
    roken: { infinitive: 'roken', ott: ['rook', 'rookt', 'rookt', 'roken', 'roken', 'roken'], ovt: ['rookte', 'rookte', 'rookte', 'rookten', 'rookten', 'rookten'], vtt_part: 'gerookt', auxiliary: 'hebben', imperative: 'rook', level: 'A1' },
    ademen: { infinitive: 'ademen', ott: ['adem', 'ademt', 'ademt', 'ademen', 'ademen', 'ademen'], ovt: ['ademde', 'ademde', 'ademde', 'ademden', 'ademden', 'ademden'], vtt_part: 'geademd', auxiliary: 'hebben', imperative: 'adem', level: 'A1' },
    zwaaien: { infinitive: 'zwaaien', ott: ['zwaai', 'zwaait', 'zwaait', 'zwaaien', 'zwaaien', 'zwaaien'], ovt: ['zwaaide', 'zwaaide', 'zwaaide', 'zwaaiden', 'zwaaiden', 'zwaaiden'], vtt_part: 'gezwaaid', auxiliary: 'hebben', imperative: 'zwaai', level: 'A1' },
    wijzen: { infinitive: 'wijzen', ott: ['wijs', 'wijst', 'wijst', 'wijzen', 'wijzen', 'wijzen'], ovt: ['wees', 'wees', 'wees', 'wezen', 'wezen', 'wezen'], vtt_part: 'gewezen', auxiliary: 'hebben', imperative: 'wijs', level: 'A1' },
    wijzen: { infinitive: 'wijzen', ott: ['wijs', 'wijst', 'wijst', 'wijzen', 'wijzen', 'wijzen'], ovt: ['wees', 'wees', 'wees', 'wezen', 'wezen', 'wezen'], vtt_part: 'gewezen', auxiliary: 'hebben', imperative: 'wijs', level: 'A1' },
    tellen: { infinitive: 'tellen', ott: ['tel', 'telt', 'telt', 'tellen', 'tellen', 'tellen'], ovt: ['telde', 'telde', 'telde', 'telden', 'telden', 'telden'], vtt_part: 'geteld', auxiliary: 'hebben', imperative: 'tel', level: 'A1' },
    rekenen: { infinitive: 'rekenen', ott: ['reken', 'rekent', 'rekent', 'rekenen', 'rekenen', 'rekenen'], ovt: ['rekende', 'rekende', 'rekende', 'rekenden', 'rekenden', 'rekenden'], vtt_part: 'gerekend', auxiliary: 'hebben', imperative: 'reken', level: 'A1' },
    meten: { infinitive: 'meten', ott: ['meet', 'meet', 'meet', 'meten', 'meten', 'meten'], ovt: ['mat', 'mat', 'mat', 'maten', 'maten', 'maten'], vtt_part: 'gemeten', auxiliary: 'hebben', imperative: 'meet', level: 'A1' },
    wegen: { infinitive: 'wegen', ott: ['weeg', 'weegt', 'weegt', 'wegen', 'wegen', 'wegen'], ovt: ['woog', 'woog', 'woog', 'wogen', 'wogen', 'wogen'], vtt_part: 'gewogen', auxiliary: 'hebben', imperative: 'weeg', level: 'A1' },
    passen: { infinitive: 'passen', ott: ['pas', 'past', 'past', 'passen', 'passen', 'passen'], ovt: ['paste', 'paste', 'paste', 'pasten', 'pasten', 'pasten'], vtt_part: 'gepast', auxiliary: 'hebben', imperative: 'pas', level: 'A1' },
    proberen: { infinitive: 'proberen', ott: ['probeer', 'probeert', 'probeert', 'proberen', 'proberen', 'proberen'], ovt: ['probeerde', 'probeerde', 'probeerde', 'probeerden', 'probeerden', 'probeerden'], vtt_part: 'geprobeerd', auxiliary: 'hebben', imperative: 'probeer', level: 'A1' },
    missen: { infinitive: 'missen', ott: ['mis', 'mist', 'mist', 'missen', 'missen', 'missen'], ovt: ['miste', 'miste', 'miste', 'misten', 'misten', 'misten'], vtt_part: 'gemist', auxiliary: 'hebben', imperative: 'mis', level: 'A2' },
    raden: { infinitive: 'raden', ott: ['raad', 'raadt', 'raadt', 'raden', 'raden', 'raden'], ovt: ['raadde', 'raadde', 'raadde', 'raadden', 'raadden', 'raadden'], vtt_part: 'geraden', auxiliary: 'hebben', imperative: 'raad', level: 'A2' },
    verhuizen: { infinitive: 'verhuizen', ott: ['verhuis', 'verhuist', 'verhuist', 'verhuizen', 'verhuizen', 'verhuizen'], ovt: ['verhuisde', 'verhuisde', 'verhuisde', 'verhuisden', 'verhuisden', 'verhuisden'], vtt_part: 'verhuisd', auxiliary: 'zijn', imperative: 'verhuis', level: 'A2' },
    verklaren: { infinitive: 'verklaren', ott: ['verklaar', 'verklaart', 'verklaart', 'verklaren', 'verklaren', 'verklaren'], ovt: ['verklaarde', 'verklaarde', 'verklaarde', 'verklaarden', 'verklaarden', 'verklaarden'], vtt_part: 'verklaard', auxiliary: 'hebben', imperative: 'verklaar', level: 'A2' },
    besturen: { infinitive: 'besturen', ott: ['bestuur', 'bestuurt', 'bestuurt', 'besturen', 'besturen', 'besturen'], ovt: ['bestuurde', 'bestuurde', 'bestuurde', 'bestuurden', 'bestuurden', 'bestuurden'], vtt_part: 'bestuurd', auxiliary: 'hebben', imperative: 'bestuur', level: 'A2' },
    parkeren: { infinitive: 'parkeren', ott: ['parkeer', 'parkeert', 'parkeert', 'parkeren', 'parkeren', 'parkeren'], ovt: ['parkeerde', 'parkeerde', 'parkeerde', 'parkeerden', 'parkeerden', 'parkeerden'], vtt_part: 'geparkeerd', auxiliary: 'hebben', imperative: 'parkeer', level: 'A2' },
    reserveren: { infinitive: 'reserveren', ott: ['reserveer', 'reserveert', 'reserveert', 'reserveren', 'reserveren', 'reserveren'], ovt: ['reserveerde', 'reserveerde', 'reserveerde', 'reserveerden', 'reserveerden', 'reserveerden'], vtt_part: 'gereserveerd', auxiliary: 'hebben', imperative: 'reserveer', level: 'A2' },
    annuleren: { infinitive: 'annuleren', ott: ['annuleer', 'annuleert', 'annuleert', 'annuleren', 'annuleren', 'annuleren'], ovt: ['annuleerde', 'annuleerde', 'annuleerde', 'annuleerden', 'annuleerden', 'annuleerden'], vtt_part: 'geannuleerd', auxiliary: 'hebben', imperative: 'annuleer', level: 'B1' },
    bevestigen: { infinitive: 'bevestigen', ott: ['bevestig', 'bevestigt', 'bevestigt', 'bevestigen', 'bevestigen', 'bevestigen'], ovt: ['bevestigde', 'bevestigde', 'bevestigde', 'bevestigden', 'bevestigden', 'bevestigden'], vtt_part: 'bevestigd', auxiliary: 'hebben', imperative: 'bevestig', level: 'B1' },
    verzenden: { infinitive: 'verzenden', ott: ['verzend', 'verzendt', 'verzendt', 'verzenden', 'verzenden', 'verzenden'], ovt: ['verzond', 'verzond', 'verzond', 'verzonden', 'verzonden', 'verzonden'], vtt_part: 'verzonden', auxiliary: 'hebben', imperative: 'verzend', level: 'B1' },
    ontvangen: { infinitive: 'ontvangen', ott: ['ontvang', 'ontvangt', 'ontvangt', 'ontvangen', 'ontvangen', 'ontvangen'], ovt: ['ontving', 'ontving', 'ontving', 'ontvingen', 'ontvingen', 'ontvingen'], vtt_part: 'ontvangen', auxiliary: 'hebben', imperative: 'ontvang', level: 'B1' },
    verzorgen: { infinitive: 'verzorgen', ott: ['verzorg', 'verzorgt', 'verzorgt', 'verzorgen', 'verzorgen', 'verzorgen'], ovt: ['verzorgde', 'verzorgde', 'verzorgde', 'verzorgden', 'verzorgden', 'verzorgden'], vtt_part: 'verzorgd', auxiliary: 'hebben', imperative: 'verzorg', level: 'B1' },
    behandelen: { infinitive: 'behandelen', ott: ['behandel', 'behandelt', 'behandelt', 'behandelen', 'behandelen', 'behandelen'], ovt: ['behandelde', 'behandelde', 'behandelde', 'behandelden', 'behandelden', 'behandelden'], vtt_part: 'behandeld', auxiliary: 'hebben', imperative: 'behandel', level: 'B1' },
    genezen: { infinitive: 'genezen', ott: ['genees', 'geneest', 'geneest', 'genezen', 'genezen', 'genezen'], ovt: ['genas', 'genas', 'genas', 'genazen', 'genazen', 'genazen'], vtt_part: 'genezen', auxiliary: 'zijn', imperative: 'genees', level: 'B1' },
    lijden: { infinitive: 'lijden', ott: ['lijd', 'lijdt', 'lijdt', 'lijden', 'lijden', 'lijden'], ovt: ['leed', 'leed', 'leed', 'leden', 'leden', 'leden'], vtt_part: 'geleden', auxiliary: 'hebben', imperative: 'lijd', level: 'B1' },
    streven: { infinitive: 'streven', ott: ['streef', 'streeft', 'streeft', 'streven', 'streven', 'streven'], ovt: ['streefde', 'streefde', 'streefde', 'streefden', 'streefden', 'streefden'], vtt_part: 'gestreefd', auxiliary: 'hebben', imperative: 'streef', level: 'B2' },
    nastreven: { infinitive: 'nastreven', ott: ['streef na', 'streeft na', 'streeft na', 'streven na', 'streven na', 'streven na'], ovt: ['streefde na', 'streefde na', 'streefde na', 'streefden na', 'streefden na', 'streefden na'], vtt_part: 'nagestreefd', auxiliary: 'hebben', imperative: 'streef na', level: 'B2' },
    beogen: { infinitive: 'beogen', ott: ['beoog', 'beoogt', 'beoogt', 'beogen', 'beogen', 'beogen'], ovt: ['beoogde', 'beoogde', 'beoogde', 'beoogden', 'beoogden', 'beoogden'], vtt_part: 'beoogd', auxiliary: 'hebben', imperative: 'beoog', level: 'B2' },
    mikken: { infinitive: 'mikken', ott: ['mik', 'mikt', 'mikt', 'mikken', 'mikken', 'mikken'], ovt: ['mikte', 'mikte', 'mikte', 'mikten', 'mikten', 'mikten'], vtt_part: 'gemikt', auxiliary: 'hebben', imperative: 'mik', level: 'B2' },
    richten: { infinitive: 'richten', ott: ['richt', 'richt', 'richt', 'richten', 'richten', 'richten'], ovt: ['richtte', 'richtte', 'richtte', 'richtten', 'richtten', 'richtten'], vtt_part: 'gericht', auxiliary: 'hebben', imperative: 'richt', level: 'B2' },
    prioriteren: { infinitive: 'prioriteren', ott: ['prioriteer', 'prioriteert', 'prioriteert', 'prioriteren', 'prioriteren', 'prioriteren'], ovt: ['prioriteerde', 'prioriteerde', 'prioriteerde', 'prioriteerden', 'prioriteerden', 'prioriteerden'], vtt_part: 'geprioriteerd', auxiliary: 'hebben', imperative: 'prioriteer', level: 'C1' },
    cultiveren: { infinitive: 'cultiveren', ott: ['cultiveer', 'cultiveert', 'cultiveert', 'cultiveren', 'cultiveren', 'cultiveren'], ovt: ['cultiveerde', 'cultiveerde', 'cultiveerde', 'cultiveerden', 'cultiveerden', 'cultiveerden'], vtt_part: 'gecultiveerd', auxiliary: 'hebben', imperative: 'cultiveer', level: 'C1' },
    propageren: { infinitive: 'propageren', ott: ['propageer', 'propageert', 'propageert', 'propageren', 'propageren', 'propageren'], ovt: ['propageerde', 'propageerde', 'propageerde', 'propageerden', 'propageerden', 'propageerden'], vtt_part: 'gepropageerd', auxiliary: 'hebben', imperative: 'propageer', level: 'C1' },
    promulgeren: { infinitive: 'promulgeren', ott: ['promulgeer', 'promulgeert', 'promulgeert', 'promulgeren', 'promulgeren', 'promulgeren'], ovt: ['promulgeerde', 'promulgeerde', 'promulgeerde', 'promulgeerden', 'promulgeerden', 'promulgeerden'], vtt_part: 'gepromulgeerd', auxiliary: 'hebben', imperative: 'promulgeer', level: 'C1' },
    proclameren: { infinitive: 'proclameren', ott: ['proclameer', 'proclameert', 'proclameert', 'proclameren', 'proclameren', 'proclameren'], ovt: ['proclameerde', 'proclameerde', 'proclameerde', 'proclameerden', 'proclameerden', 'proclameerden'], vtt_part: 'geproclameerd', auxiliary: 'hebben', imperative: 'proclameer', level: 'C1' },
    postuleren: { infinitive: 'postuleren', ott: ['postuleer', 'postuleert', 'postuleert', 'postuleren', 'postuleren', 'postuleren'], ovt: ['postuleerde', 'postuleerde', 'postuleerde', 'postuleerden', 'postuleerden', 'postuleerden'], vtt_part: 'gepostuleerd', auxiliary: 'hebben', imperative: 'postuleer', level: 'C2' },
    prediceren: { infinitive: 'prediceren', ott: ['prediceer', 'prediceert', 'prediceert', 'prediceren', 'prediceren', 'prediceren'], ovt: ['prediceerde', 'prediceerde', 'prediceerde', 'prediceerden', 'prediceerden', 'prediceerden'], vtt_part: 'geprediceerd', auxiliary: 'hebben', imperative: 'prediceer', level: 'C2' },
    
    // Additional common verbs (A1-A2 level) - 50 verbs
    werken: { infinitive: 'werken', ott: ['werk', 'werkt', 'werkt', 'werken', 'werken', 'werken'], ovt: ['werkte', 'werkte', 'werkte', 'werkten', 'werkten', 'werkten'], vtt_part: 'gewerkt', auxiliary: 'hebben', imperative: 'werk', level: 'A1' },
    praten: { infinitive: 'praten', ott: ['praat', 'praat', 'praat', 'praten', 'praten', 'praten'], ovt: ['praatte', 'praatte', 'praatte', 'praatten', 'praatten', 'praatten'], vtt_part: 'gepraat', auxiliary: 'hebben', imperative: 'praat', level: 'A1' },
    horen: { infinitive: 'horen', ott: ['hoor', 'hoort', 'hoort', 'horen', 'horen', 'horen'], ovt: ['hoorde', 'hoorde', 'hoorde', 'hoorden', 'hoorden', 'hoorden'], vtt_part: 'gehoord', auxiliary: 'hebben', imperative: 'hoor', level: 'A1' },
    kopen: { infinitive: 'kopen', ott: ['koop', 'koopt', 'koopt', 'kopen', 'kopen', 'kopen'], ovt: ['kocht', 'kocht', 'kocht', 'kochten', 'kochten', 'kochten'], vtt_part: 'gekocht', auxiliary: 'hebben', imperative: 'koop', level: 'A1', strongClass: 3, ablaut: 'o → och → och' },
    denken: { infinitive: 'denken', ott: ['denk', 'denkt', 'denkt', 'denken', 'denken', 'denken'], ovt: ['dacht', 'dacht', 'dacht', 'dachten', 'dachten', 'dachten'], vtt_part: 'gedacht', auxiliary: 'hebben', imperative: 'denk', level: 'A1', strongClass: 3, ablaut: 'e → ach → ach' },
    brengen: { infinitive: 'brengen', ott: ['breng', 'brengt', 'brengt', 'brengen', 'brengen', 'brengen'], ovt: ['bracht', 'bracht', 'bracht', 'brachten', 'brachten', 'brachten'], vtt_part: 'gebracht', auxiliary: 'hebben', imperative: 'breng', level: 'A1', strongClass: 3, ablaut: 'e → ach → ach' },
    
    // Separable verbs (A1-A2) - 40 verbs
    aankomen: { infinitive: 'aankomen', ott: ['kom aan', 'komt aan', 'komt aan', 'komen aan', 'komen aan', 'komen aan'], ovt: ['kwam aan', 'kwam aan', 'kwam aan', 'kwamen aan', 'kwamen aan', 'kwamen aan'], vtt_part: 'aangekomen', auxiliary: 'zijn', imperative: 'kom aan', level: 'A1', separable: true, prefix: 'aan', strongClass: 4, ablaut: 'o → a → o' },
    meekomen: { infinitive: 'meekomen', ott: ['kom mee', 'komt mee', 'komt mee', 'komen mee', 'komen mee', 'komen mee'], ovt: ['kwam mee', 'kwam mee', 'kwam mee', 'kwamen mee', 'kwamen mee', 'kwamen mee'], vtt_part: 'meegekomen', auxiliary: 'zijn', imperative: 'kom mee', level: 'A1', separable: true, prefix: 'mee', strongClass: 4, ablaut: 'o → a → o' },
    opgaan: { infinitive: 'opgaan', ott: ['ga op', 'gaat op', 'gaat op', 'gaan op', 'gaan op', 'gaan op'], ovt: ['ging op', 'ging op', 'ging op', 'gingen op', 'gingen op', 'gingen op'], vtt_part: 'opgegaan', auxiliary: 'zijn', imperative: 'ga op', level: 'A1', separable: true, prefix: 'op' },
    uitgaan: { infinitive: 'uitgaan', ott: ['ga uit', 'gaat uit', 'gaat uit', 'gaan uit', 'gaan uit', 'gaan uit'], ovt: ['ging uit', 'ging uit', 'ging uit', 'gingen uit', 'gingen uit', 'gingen uit'], vtt_part: 'uitgegaan', auxiliary: 'zijn', imperative: 'ga uit', level: 'A1', separable: true, prefix: 'uit' },
    weggaan: { infinitive: 'weggaan', ott: ['ga weg', 'gaat weg', 'gaat weg', 'gaan weg', 'gaan weg', 'gaan weg'], ovt: ['ging weg', 'ging weg', 'ging weg', 'gingen weg', 'gingen weg', 'gingen weg'], vtt_part: 'weggegaan', auxiliary: 'zijn', imperative: 'ga weg', level: 'A1', separable: true, prefix: 'weg' },
    opkomen: { infinitive: 'opkomen', ott: ['kom op', 'komt op', 'komt op', 'komen op', 'komen op', 'komen op'], ovt: ['kwam op', 'kwam op', 'kwam op', 'kwamen op', 'kwamen op', 'kwamen op'], vtt_part: 'opgekomen', auxiliary: 'zijn', imperative: 'kom op', level: 'A2', separable: true, prefix: 'op', strongClass: 4 },
    teruggaan: { infinitive: 'teruggaan', ott: ['ga terug', 'gaat terug', 'gaat terug', 'gaan terug', 'gaan terug', 'gaan terug'], ovt: ['ging terug', 'ging terug', 'ging terug', 'gingen terug', 'gingen terug', 'gingen terug'], vtt_part: 'teruggegaan', auxiliary: 'zijn', imperative: 'ga terug', level: 'A2', separable: true, prefix: 'terug' },
    binnenkomen: { infinitive: 'binnenkomen', ott: ['kom binnen', 'komt binnen', 'komt binnen', 'komen binnen', 'komen binnen', 'komen binnen'], ovt: ['kwam binnen', 'kwam binnen', 'kwam binnen', 'kwamen binnen', 'kwamen binnen', 'kwamen binnen'], vtt_part: 'binnengekomen', auxiliary: 'zijn', imperative: 'kom binnen', level: 'A2', separable: true, prefix: 'binnen', strongClass: 4 },
    uitkomen: { infinitive: 'uitkomen', ott: ['kom uit', 'komt uit', 'komt uit', 'komen uit', 'komen uit', 'komen uit'], ovt: ['kwam uit', 'kwam uit', 'kwam uit', 'kwamen uit', 'kwamen uit', 'kwamen uit'], vtt_part: 'uitgekomen', auxiliary: 'zijn', imperative: 'kom uit', level: 'A2', separable: true, prefix: 'uit', strongClass: 4 },
    omkomen: { infinitive: 'omkomen', ott: ['kom om', 'komt om', 'komt om', 'komen om', 'komen om', 'komen om'], ovt: ['kwam om', 'kwam om', 'kwam om', 'kwamen om', 'kwamen om', 'kwamen om'], vtt_part: 'omgekomen', auxiliary: 'zijn', imperative: 'kom om', level: 'B1', separable: true, prefix: 'om', strongClass: 4 },
    meenemen: { infinitive: 'meenemen', ott: ['neem mee', 'neemt mee', 'neemt mee', 'nemen mee', 'nemen mee', 'nemen mee'], ovt: ['nam mee', 'nam mee', 'nam mee', 'namen mee', 'namen mee', 'namen mee'], vtt_part: 'meegenomen', auxiliary: 'hebben', imperative: 'neem mee', level: 'A1', separable: true, prefix: 'mee', strongClass: 4, ablaut: 'e → a → o' },
    aannemen: { infinitive: 'aannemen', ott: ['neem aan', 'neemt aan', 'neemt aan', 'nemen aan', 'nemen aan', 'nemen aan'], ovt: ['nam aan', 'nam aan', 'nam aan', 'namen aan', 'namen aan', 'namen aan'], vtt_part: 'aangenomen', auxiliary: 'hebben', imperative: 'neem aan', level: 'A2', separable: true, prefix: 'aan', strongClass: 4 },
    opnemen: { infinitive: 'opnemen', ott: ['neem op', 'neemt op', 'neemt op', 'nemen op', 'nemen op', 'nemen op'], ovt: ['nam op', 'nam op', 'nam op', 'namen op', 'namen op', 'namen op'], vtt_part: 'opgenomen', auxiliary: 'hebben', imperative: 'neem op', level: 'A2', separable: true, prefix: 'op', strongClass: 4 },
    overnemen: { infinitive: 'overnemen', ott: ['neem over', 'neemt over', 'neemt over', 'nemen over', 'nemen over', 'nemen over'], ovt: ['nam over', 'nam over', 'nam over', 'namen over', 'namen over', 'namen over'], vtt_part: 'overgenomen', auxiliary: 'hebben', imperative: 'neem over', level: 'B1', separable: true, prefix: 'over', strongClass: 4 },
    innemen: { infinitive: 'innemen', ott: ['neem in', 'neemt in', 'neemt in', 'nemen in', 'nemen in', 'nemen in'], ovt: ['nam in', 'nam in', 'nam in', 'namen in', 'namen in', 'namen in'], vtt_part: 'ingenomen', auxiliary: 'hebben', imperative: 'neem in', level: 'B1', separable: true, prefix: 'in', strongClass: 4 },
    aangeven: { infinitive: 'aangeven', ott: ['geef aan', 'geeft aan', 'geeft aan', 'geven aan', 'geven aan', 'geven aan'], ovt: ['gaf aan', 'gaf aan', 'gaf aan', 'gaven aan', 'gaven aan', 'gaven aan'], vtt_part: 'aangegeven', auxiliary: 'hebben', imperative: 'geef aan', level: 'A2', separable: true, prefix: 'aan', strongClass: 5 },
    opgeven: { infinitive: 'opgeven', ott: ['geef op', 'geeft op', 'geeft op', 'geven op', 'geven op', 'geven op'], ovt: ['gaf op', 'gaf op', 'gaf op', 'gaven op', 'gaven op', 'gaven op'], vtt_part: 'opgegeven', auxiliary: 'hebben', imperative: 'geef op', level: 'A2', separable: true, prefix: 'op', strongClass: 5 },
    uitgeven: { infinitive: 'uitgeven', ott: ['geef uit', 'geeft uit', 'geeft uit', 'geven uit', 'geven uit', 'geven uit'], ovt: ['gaf uit', 'gaf uit', 'gaf uit', 'gaven uit', 'gaven uit', 'gaven uit'], vtt_part: 'uitgegeven', auxiliary: 'hebben', imperative: 'geef uit', level: 'A2', separable: true, prefix: 'uit', strongClass: 5 },
    meegeven: { infinitive: 'meegeven', ott: ['geef mee', 'geeft mee', 'geeft mee', 'geven mee', 'geven mee', 'geven mee'], ovt: ['gaf mee', 'gaf mee', 'gaf mee', 'gaven mee', 'gaven mee', 'gaven mee'], vtt_part: 'meegegeven', auxiliary: 'hebben', imperative: 'geef mee', level: 'A2', separable: true, prefix: 'mee', strongClass: 5 },
    doorgeven: { infinitive: 'doorgeven', ott: ['geef door', 'geeft door', 'geeft door', 'geven door', 'geven door', 'geven door'], ovt: ['gaf door', 'gaf door', 'gaf door', 'gaven door', 'gaven door', 'gaven door'], vtt_part: 'doorgegeven', auxiliary: 'hebben', imperative: 'geef door', level: 'B1', separable: true, prefix: 'door', strongClass: 5 },
    teruggeven: { infinitive: 'teruggeven', ott: ['geef terug', 'geeft terug', 'geeft terug', 'geven terug', 'geven terug', 'geven terug'], ovt: ['gaf terug', 'gaf terug', 'gaf terug', 'gaven terug', 'gaven terug', 'gaven terug'], vtt_part: 'teruggegeven', auxiliary: 'hebben', imperative: 'geef terug', level: 'A2', separable: true, prefix: 'terug', strongClass: 5 },
    afkijken: { infinitive: 'afkijken', ott: ['kijk af', 'kijkt af', 'kijkt af', 'kijken af', 'kijken af', 'kijken af'], ovt: ['keek af', 'keek af', 'keek af', 'keken af', 'keken af', 'keken af'], vtt_part: 'afgekeken', auxiliary: 'hebben', imperative: 'kijk af', level: 'A2', separable: true, prefix: 'af', strongClass: 1 },
    opkijken: { infinitive: 'opkijken', ott: ['kijk op', 'kijkt op', 'kijkt op', 'kijken op', 'kijken op', 'kijken op'], ovt: ['keek op', 'keek op', 'keek op', 'keken op', 'keken op', 'keken op'], vtt_part: 'opgekeken', auxiliary: 'hebben', imperative: 'kijk op', level: 'A2', separable: true, prefix: 'op', strongClass: 1 },
    omkijken: { infinitive: 'omkijken', ott: ['kijk om', 'kijkt om', 'kijkt om', 'kijken om', 'kijken om', 'kijken om'], ovt: ['keek om', 'keek om', 'keek om', 'keken om', 'keken om', 'keken om'], vtt_part: 'omgekeken', auxiliary: 'hebben', imperative: 'kijk om', level: 'A2', separable: true, prefix: 'om', strongClass: 1 },
    uitkijken: { infinitive: 'uitkijken', ott: ['kijk uit', 'kijkt uit', 'kijkt uit', 'kijken uit', 'kijken uit', 'kijken uit'], ovt: ['keek uit', 'keek uit', 'keek uit', 'keken uit', 'keken uit', 'keken uit'], vtt_part: 'uitgekeken', auxiliary: 'hebben', imperative: 'kijk uit', level: 'A1', separable: true, prefix: 'uit', strongClass: 1 },
    toekijken: { infinitive: 'toekijken', ott: ['kijk toe', 'kijkt toe', 'kijkt toe', 'kijken toe', 'kijken toe', 'kijken toe'], ovt: ['keek toe', 'keek toe', 'keek toe', 'keken toe', 'keken toe', 'keken toe'], vtt_part: 'toegekeken', auxiliary: 'hebben', imperative: 'kijk toe', level: 'B1', separable: true, prefix: 'toe', strongClass: 1 },
    terugkijken: { infinitive: 'terugkijken', ott: ['kijk terug', 'kijkt terug', 'kijkt terug', 'kijken terug', 'kijken terug', 'kijken terug'], ovt: ['keek terug', 'keek terug', 'keek terug', 'keken terug', 'keken terug', 'keken terug'], vtt_part: 'teruggekeken', auxiliary: 'hebben', imperative: 'kijk terug', level: 'B1', separable: true, prefix: 'terug', strongClass: 1 },
    opeten: { infinitive: 'opeten', ott: ['eet op', 'eet op', 'eet op', 'eten op', 'eten op', 'eten op'], ovt: ['at op', 'at op', 'at op', 'aten op', 'aten op', 'aten op'], vtt_part: 'opgegeten', auxiliary: 'hebben', imperative: 'eet op', level: 'A1', separable: true, prefix: 'op', strongClass: 5 },
    uiteten: { infinitive: 'uiteten', ott: ['eet uit', 'eet uit', 'eet uit', 'eten uit', 'eten uit', 'eten uit'], ovt: ['at uit', 'at uit', 'at uit', 'aten uit', 'aten uit', 'aten uit'], vtt_part: 'uitgegeten', auxiliary: 'hebben', imperative: 'eet uit', level: 'A2', separable: true, prefix: 'uit', strongClass: 5 },
    meeeten: { infinitive: 'mee-eten', ott: ['eet mee', 'eet mee', 'eet mee', 'eten mee', 'eten mee', 'eten mee'], ovt: ['at mee', 'at mee', 'at mee', 'aten mee', 'aten mee', 'aten mee'], vtt_part: 'meegegeten', auxiliary: 'hebben', imperative: 'eet mee', level: 'A1', separable: true, prefix: 'mee', strongClass: 5 },
    voorlezen: { infinitive: 'voorlezen', ott: ['lees voor', 'leest voor', 'leest voor', 'lezen voor', 'lezen voor', 'lezen voor'], ovt: ['las voor', 'las voor', 'las voor', 'lazen voor', 'lazen voor', 'lazen voor'], vtt_part: 'voorgelezen', auxiliary: 'hebben', imperative: 'lees voor', level: 'A2', separable: true, prefix: 'voor', strongClass: 5 },
    oplezen: { infinitive: 'oplezen', ott: ['lees op', 'leest op', 'leest op', 'lezen op', 'lezen op', 'lezen op'], ovt: ['las op', 'las op', 'las op', 'lazen op', 'lazen op', 'lazen op'], vtt_part: 'opgelezen', auxiliary: 'hebben', imperative: 'lees op', level: 'A2', separable: true, prefix: 'op', strongClass: 5 },
    doorlezen: { infinitive: 'doorlezen', ott: ['lees door', 'leest door', 'leest door', 'lezen door', 'lezen door', 'lezen door'], ovt: ['las door', 'las door', 'las door', 'lazen door', 'lazen door', 'lazen door'], vtt_part: 'doorgelezen', auxiliary: 'hebben', imperative: 'lees door', level: 'B1', separable: true, prefix: 'door', strongClass: 5 },
    nalezen: { infinitive: 'nalezen', ott: ['lees na', 'leest na', 'leest na', 'lezen na', 'lezen na', 'lezen na'], ovt: ['las na', 'las na', 'las na', 'lazen na', 'lazen na', 'lazen na'], vtt_part: 'nagelezen', auxiliary: 'hebben', imperative: 'lees na', level: 'B1', separable: true, prefix: 'na', strongClass: 5 },
    uitschrijven: { infinitive: 'uitschrijven', ott: ['schrijf uit', 'schrijft uit', 'schrijft uit', 'schrijven uit', 'schrijven uit', 'schrijven uit'], ovt: ['schreef uit', 'schreef uit', 'schreef uit', 'schreven uit', 'schreven uit', 'schreven uit'], vtt_part: 'uitgeschreven', auxiliary: 'hebben', imperative: 'schrijf uit', level: 'B1', separable: true, prefix: 'uit', strongClass: 1 },
    opschrijven: { infinitive: 'opschrijven', ott: ['schrijf op', 'schrijft op', 'schrijft op', 'schrijven op', 'schrijven op', 'schrijven op'], ovt: ['schreef op', 'schreef op', 'schreef op', 'schreven op', 'schreven op', 'schreven op'], vtt_part: 'opgeschreven', auxiliary: 'hebben', imperative: 'schrijf op', level: 'A2', separable: true, prefix: 'op', strongClass: 1 },
    aanschrijven: { infinitive: 'aanschrijven', ott: ['schrijf aan', 'schrijft aan', 'schrijft aan', 'schrijven aan', 'schrijven aan', 'schrijven aan'], ovt: ['schreef aan', 'schreef aan', 'schreef aan', 'schreven aan', 'schreven aan', 'schreven aan'], vtt_part: 'aangeschreven', auxiliary: 'hebben', imperative: 'schrijf aan', level: 'B1', separable: true, prefix: 'aan', strongClass: 1 },
    overschrijven: { infinitive: 'overschrijven', ott: ['schrijf over', 'schrijft over', 'schrijft over', 'schrijven over', 'schrijven over', 'schrijven over'], ovt: ['schreef over', 'schreef over', 'schreef over', 'schreven over', 'schreven over', 'schreven over'], vtt_part: 'overgeschreven', auxiliary: 'hebben', imperative: 'schrijf over', level: 'B1', separable: true, prefix: 'over', strongClass: 1 },
    aflopen: { infinitive: 'aflopen', ott: ['loop af', 'loopt af', 'loopt af', 'lopen af', 'lopen af', 'lopen af'], ovt: ['liep af', 'liep af', 'liep af', 'liepen af', 'liepen af', 'liepen af'], vtt_part: 'afgelopen', auxiliary: 'zijn', imperative: 'loop af', level: 'A2', separable: true, prefix: 'af', strongClass: 7 },
    oplopen: { infinitive: 'oplopen', ott: ['loop op', 'loopt op', 'loopt op', 'lopen op', 'lopen op', 'lopen op'], ovt: ['liep op', 'liep op', 'liep op', 'liepen op', 'liepen op', 'liepen op'], vtt_part: 'opgelopen', auxiliary: 'zijn', imperative: 'loop op', level: 'A2', separable: true, prefix: 'op', strongClass: 7 },
    weglopen: { infinitive: 'weglopen', ott: ['loop weg', 'loopt weg', 'loopt weg', 'lopen weg', 'lopen weg', 'lopen weg'], ovt: ['liep weg', 'liep weg', 'liep weg', 'liepen weg', 'liepen weg', 'liepen weg'], vtt_part: 'weggelopen', auxiliary: 'zijn', imperative: 'loop weg', level: 'A1', separable: true, prefix: 'weg', strongClass: 7 }
  },

  getStem(infinitive) {
    if (infinitive.endsWith('en')) {
      let stem = infinitive.slice(0, -2);
      if (stem.length >= 2) {
        const lastTwo = stem.slice(-2);
        if (lastTwo[0] === lastTwo[1] && !'aeiou'.includes(lastTwo[0])) {
          stem = stem.slice(0, -1);
        }
      }
      return stem;
    }
    return infinitive;
  },

  usesT(stem) {
    const lastChar = stem[stem.length - 1];
    const lastTwo = stem.slice(-2);
    return ['t', 'k', 'f', 's', 'p'].includes(lastChar) || lastTwo === 'ch';
  },

  conjugateRegular(infinitive) {
    // Check if separable verb (has prefix like aan-, op-, mee-, etc.)
    const separablePrefixes = ['aan', 'af', 'bij', 'in', 'mee', 'na', 'neer', 'om', 'op', 'over', 'toe', 'uit', 'onder', 'door', 'terug', 'weg', 'voort', 'binnen', 'buiten', 'achter', 'voor'];
    let baseVerb = infinitive;
    let prefix = null;
    let isSeparable = false;
    
    for (const pre of separablePrefixes) {
      if (infinitive.startsWith(pre)) {
        prefix = pre;
        baseVerb = infinitive.slice(pre.length);
        isSeparable = true;
        break;
      }
    }
    
    const stem = this.getStem(baseVerb);
    const ott = [stem, stem + 't', stem + 't', baseVerb, baseVerb, baseVerb];
    const usesT = this.usesT(stem);
    const ending = usesT ? 'te' : 'de';
    const pluralEnding = usesT ? 'ten' : 'den';
    let pastStem = stem;
    const ovt = [
      pastStem + ending, pastStem + ending, pastStem + ending,
      pastStem + pluralEnding, pastStem + pluralEnding, pastStem + pluralEnding
    ];
    const participleEnding = usesT ? 't' : 'd';
    
    // For separable verbs: prefix + ge + stem + d/t
    // e.g., meekomen → meeGEkomen, uitleggen → uitGElegd
    const vtt_part = isSeparable 
      ? `${prefix}ge${stem}${participleEnding}`
      : `ge${stem}${participleEnding}`;
    
    return { 
      infinitive, 
      ott, 
      ovt, 
      vtt_part, 
      auxiliary: 'hebben', 
      imperative: stem, 
      level: 'A2',
      separable: isSeparable,
      prefix: prefix,
      baseVerb: baseVerb
    };
  },

  conjugate(verb) {
    const cleaned = verb.toLowerCase().trim();
    if (this.irregular[cleaned]) return this.irregular[cleaned];
    return this.conjugateRegular(cleaned);
  },

  getLevel(verb) {
    const conj = this.conjugate(verb);
    return conj.level || 'A2';
  },

  getAllVerbs() {
    return Object.keys(this.irregular);
  },

  getVerbsByLevel(minLevel, maxLevel) {
    const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const minIndex = levelOrder.indexOf(minLevel);
    const maxIndex = levelOrder.indexOf(maxLevel);
    
    return this.getAllVerbs().filter(verb => {
      const verbLevel = this.getLevel(verb);
      const verbIndex = levelOrder.indexOf(verbLevel);
      return verbIndex >= minIndex && verbIndex <= maxIndex;
    });
  },

  getAuxiliary(verb) {
    const conj = this.conjugate(verb);
    return conj.auxiliary || 'hebben';
  },

  getConjugation(verb, tense, pronounIndex) {
    const conj = this.conjugate(verb);
    const auxiliary = this.getAuxiliary(verb);
    const auxVerb = this.conjugate(auxiliary);
    const zullen = ['zal', 'zult', 'zal', 'zullen', 'zullen', 'zullen'];
    const zou = ['zou', 'zou', 'zou', 'zouden', 'zouden', 'zouden'];
    
    // Check if this is a separable verb
    const verbData = this.irregular[verb] || this.conjugateRegular(verb);
    const isSeparable = verbData.separable;
    const prefix = verbData.prefix;
    
    switch(tense) {
      case 'ott': 
        if (isSeparable) {
          // For separable verbs in present tense: conjugated verb + prefix separated
          // e.g., "meekomen" → "kom mee" (ik kom mee)
          return `${conj.ott[pronounIndex]} ${prefix}`;
        }
        return conj.ott[pronounIndex];
      case 'ovt': 
        if (isSeparable) {
          return `${conj.ovt[pronounIndex]} ${prefix}`;
        }
        return conj.ovt[pronounIndex];
      case 'vtt': 
        // For separable verbs, prefix goes before ge-: meekomen → meeGEkomen
        return `${auxVerb.ott[pronounIndex]} ${conj.vtt_part}`;
      case 'pqp': 
        return `${auxVerb.ovt[pronounIndex]} ${conj.vtt_part}`;
      case 'future': 
        // Future keeps verb together: "zal meekomen" (infinitive form)
        return `${zullen[pronounIndex]} ${conj.infinitive}`;
      case 'conditional':
        return `${zou[pronounIndex]} ${conj.infinitive}`;
      case 'conditional_perfect':
        return `${zou[pronounIndex]} ${auxVerb.vtt_part} ${conj.vtt_part}`;
      case 'future_perfect':
        return `${zullen[pronounIndex]} ${auxVerb.vtt_part} ${conj.vtt_part}`;
      case 'subjunctive':
        if (isSeparable) {
          return `${conj.ott[pronounIndex]} ${prefix}`;
        }
        return conj.ott[pronounIndex];
      case 'imperative':
        if (pronounIndex === 1) {
          return isSeparable ? `${conj.imperative} ${prefix}` : conj.imperative;
        }
        if (pronounIndex === 2) {
          return isSeparable ? `${conj.imperative} ${prefix}` : conj.imperative;
        }
        if (pronounIndex === 4) {
          return isSeparable ? `${conj.ott[4]} ${prefix}` : conj.ott[4];
        }
        return '-';
      default: 
        return '';
    }
  }
};

// Strong Verb (Sterke Werkwoorden) Classes - Ablaut Patterns
const StrongVerbClasses = {
  1: {
    name: 'Class I',
    pattern: 'ij → ee → e',
    description: 'Verbs with -ij- in infinitive change to -ee- in past tense and -e- in past participle',
    examples: ['kijken (keek, gekeken)', 'schrijven (schreef, geschreven)', 'blijven (bleef, gebleven)', 'rijden (reed, gereden)']
  },
  2: {
    name: 'Class II', 
    pattern: 'ie → oo → o',
    description: 'Verbs with -ie- in infinitive change to -oo- in past tense and -o- in past participle',
    examples: ['sluiten (sloot, gesloten)', 'vliegen (vloog, gevlogen)', 'gieten (goot, gegoten)', 'verliezen (verloor, verloren)']
  },
  3: {
    name: 'Class III',
    pattern: 'i → o → o',
    description: 'Verbs with -i- in infinitive change to -o- in both past tense and past participle',
    examples: ['binden (bond, gebonden)', 'vinden (vond, gevonden)', 'winnen (won, gewonnen)', 'zwemmen (zwom, gezwommen)']
  },
  4: {
    name: 'Class IV',
    pattern: 'e → a → o',
    description: 'Verbs with -e- in infinitive change to -a- in past tense and -o- in past participle',
    examples: ['nemen (nam, genomen)', 'komen (kwam, gekomen)', 'breken (brak, gebroken)']
  },
  5: {
    name: 'Class V',
    pattern: 'e → a → e',
    description: 'Verbs with -e- in infinitive change to -a- in past tense and return to -e- in past participle',
    examples: ['geven (gaf, gegeven)', 'lezen (las, gelezen)', 'eten (at, gegeten)', 'vergeten (vergat, vergeten)']
  },
  6: {
    name: 'Class VI',
    pattern: 'a → oe → a',
    description: 'Verbs with -a- in infinitive change to -oe- in past tense and return to -a- in past participle',
    examples: ['dragen (droeg, gedragen)', 'varen (voer, gevaren)']
  },
  7: {
    name: 'Class VII',
    pattern: 'Various (Mixed)',
    description: 'Mixed patterns - historical reduplication verbs with various vowel changes',
    examples: ['lopen (liep, gelopen)', 'heten (heette, geheten)', 'houden (hield, gehouden)', 'vallen (viel, gevallen)']
  }
};

const pronouns = ['ik', 'jij/je', 'u/hij/zij/het', 'wij/we', 'jullie', 'zij'];
const pronounLabels = ['ik', 'jij', 'hij/zij', 'wij', 'jullie', 'zij (plural)'];

// Example sentences with grammatically correct pronoun-verb-tense matching
const exampleSentences = {
  zijn: [
    { nl: 'Ik ___ blij vandaag.', en: 'I am happy today.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ altijd vriendelijk.', en: 'You are always friendly.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ thuis gisteren.', en: 'He was home yesterday.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ in Amsterdam.', en: 'We are in Amsterdam.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ te laat.', en: 'You (all) are late.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ daar geweest.', en: 'They have been there.', tense: 'vtt', pronoun: 5 }
  ],
  hebben: [
    { nl: 'Ik ___ een hond.', en: 'I have a dog.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ gelijk.', en: 'You are right.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ geld nodig.', en: 'He needs money.', tense: 'ott', pronoun: 2 },
    { nl: 'Wij ___ tijd gehad.', en: 'We have had time.', tense: 'vtt', pronoun: 3 },
    { nl: 'Jullie ___ geluk.', en: 'You (all) are lucky.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ honger.', en: 'They are hungry.', tense: 'ott', pronoun: 5 }
  ],
  gaan: [
    { nl: 'Ik ___ naar school.', en: 'I go to school.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ naar huis.', en: 'You go home.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ naar de winkel.', en: 'He went to the store.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ naar huis.', en: 'We went home.', tense: 'ovt', pronoun: 3 },
    { nl: 'Jullie ___ naar het park.', en: 'You (all) go to the park.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ morgen naar Parijs.', en: 'They will go to Paris tomorrow.', tense: 'future', pronoun: 5 }
  ],
  komen: [
    { nl: 'Ik ___ uit Nederland.', en: 'I come from the Netherlands.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ morgen.', en: 'You come tomorrow.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ uit België.', en: 'He comes from Belgium.', tense: 'ott', pronoun: 2 },
    { nl: 'Wij ___ te laat.', en: 'We came too late.', tense: 'ovt', pronoun: 3 },
    { nl: 'Jullie ___ te laat.', en: 'You (all) came too late.', tense: 'ovt', pronoun: 4 },
    { nl: 'Zij ___ vanavond.', en: 'They are coming tonight.', tense: 'ott', pronoun: 5 }
  ],
  doen: [
    { nl: 'Ik ___ mijn best.', en: 'I do my best.', tense: 'ott', pronoun: 0 },
    { nl: 'Wat ___ jij vandaag?', en: 'What are you doing today?', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ het goed.', en: 'He is doing well.', tense: 'ott', pronoun: 2 },
    { nl: 'Wij ___ ons best.', en: 'We are doing our best.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ de afwas.', en: 'You (all) did the dishes.', tense: 'ovt', pronoun: 4 },
    { nl: 'Zij ___ hun huiswerk.', en: 'They did their homework.', tense: 'ovt', pronoun: 5 }
  ],
  zien: [
    { nl: 'Ik ___ een vogel.', en: 'I see a bird.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ de film gisteren.', en: 'You saw the movie yesterday.', tense: 'ovt', pronoun: 1 },
    { nl: 'Hij ___ de film gisteren.', en: 'He saw the movie yesterday.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ elkaar morgen.', en: 'We will see each other tomorrow.', tense: 'future', pronoun: 3 },
    { nl: 'Jullie ___ de ster.', en: 'You (all) see the star.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ niks.', en: 'They see nothing.', tense: 'ott', pronoun: 5 }
  ],
  lopen: [
    { nl: 'Ik ___ elke dag.', en: 'I walk every day.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ te snel.', en: 'You walk too fast.', tense: 'ott', pronoun: 1 },
    { nl: 'Zij ___ naar het park.', en: 'She walked to the park.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ samen.', en: 'We walk together.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ naar school.', en: 'You (all) walk to school.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ naar huis.', en: 'They walked home.', tense: 'ovt', pronoun: 5 }
  ],
  maken: [
    { nl: 'Ik ___ een taart.', en: 'I make a cake.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ een fout.', en: 'You make a mistake.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ een fout.', en: 'He made a mistake.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ eten.', en: 'We make food.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ huiswerk.', en: 'You (all) make homework.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ hun bed.', en: 'They make their bed.', tense: 'ott', pronoun: 5 }
  ],
  werken: [
    { nl: 'Ik ___ hard.', en: 'I work hard.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ hier.', en: 'You work here.', tense: 'ott', pronoun: 1 },
    { nl: 'Zij ___ in een restaurant.', en: 'She worked in a restaurant.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ samen.', en: 'We work together.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ morgen.', en: 'You (all) work tomorrow.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ thuis.', en: 'They work at home.', tense: 'ott', pronoun: 5 }
  ],
  eten: [
    { nl: 'Ik ___ brood.', en: 'I eat bread.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ pizza.', en: 'You eat pizza.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ pizza gisteren.', en: 'He ate pizza yesterday.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ gezond.', en: 'We eat healthy.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ te veel.', en: 'You (all) eat too much.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ groenten.', en: 'They eat vegetables.', tense: 'ott', pronoun: 5 }
  ],
  geven: [
    { nl: 'Ik ___ een cadeau.', en: 'I give a present.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ les.', en: 'You give lessons.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ advies.', en: 'He gave advice.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ geld.', en: 'We give money.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ bloemen.', en: 'You (all) give flowers.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ antwoord.', en: 'They give an answer.', tense: 'ott', pronoun: 5 }
  ],
  nemen: [
    { nl: 'Ik ___ de bus.', en: 'I take the bus.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ de trein.', en: 'You take the train.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ een taxi.', en: 'He took a taxi.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ tijd.', en: 'We take time.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ een pauze.', en: 'You (all) take a break.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ afscheid.', en: 'They took farewell.', tense: 'ovt', pronoun: 5 }
  ],
  vinden: [
    { nl: 'Ik ___ het mooi.', en: 'I find it beautiful.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ het leuk.', en: 'You find it fun.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ een oplossing.', en: 'He found a solution.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ het goed.', en: 'We find it good.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ het interessant.', en: 'You (all) find it interesting.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ de sleutel.', en: 'They found the key.', tense: 'ovt', pronoun: 5 }
  ],
  kijken: [
    { nl: 'Ik ___ televisie.', en: 'I watch television.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ naar de film.', en: 'You watch the movie.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ naar buiten.', en: 'He looked outside.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ samen.', en: 'We watch together.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ naar de sterren.', en: 'You (all) look at the stars.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ naar het nieuws.', en: 'They watch the news.', tense: 'ott', pronoun: 5 }
  ],
  schrijven: [
    { nl: 'Ik ___ een brief.', en: 'I write a letter.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ een boek.', en: 'You write a book.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ een e-mail.', en: 'He wrote an email.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ samen.', en: 'We write together.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ gedichten.', en: 'You (all) write poems.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ verhalen.', en: 'They write stories.', tense: 'ott', pronoun: 5 }
  ],
  lezen: [
    { nl: 'Ik ___ een boek.', en: 'I read a book.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ de krant.', en: 'You read the newspaper.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ een artikel.', en: 'He read an article.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ graag.', en: 'We like to read.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ snel.', en: 'You (all) read fast.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ veel.', en: 'They read a lot.', tense: 'ott', pronoun: 5 }
  ],
  worden: [
    { nl: 'Ik ___ dokter.', en: 'I become a doctor.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ beter.', en: 'You get better.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ moe.', en: 'He became tired.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ vrienden.', en: 'We become friends.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ ouder.', en: 'You (all) get older.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ boos.', en: 'They became angry.', tense: 'ovt', pronoun: 5 }
  ],
  blijven: [
    { nl: 'Ik ___ thuis.', en: 'I stay home.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ hier.', en: 'You stay here.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ kalm.', en: 'He remained calm.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ samen.', en: 'We stay together.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ binnen.', en: 'You (all) stay inside.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ staan.', en: 'They remained standing.', tense: 'ovt', pronoun: 5 }
  ],
  wonen: [
    { nl: 'Ik ___ in Amsterdam.', en: 'I live in Amsterdam.', tense: 'ott', pronoun: 0 },
    { nl: 'Jij ___ in Utrecht.', en: 'You live in Utrecht.', tense: 'ott', pronoun: 1 },
    { nl: 'Hij ___ in Rotterdam.', en: 'He lived in Rotterdam.', tense: 'ovt', pronoun: 2 },
    { nl: 'Wij ___ hier.', en: 'We live here.', tense: 'ott', pronoun: 3 },
    { nl: 'Jullie ___ daar.', en: 'You (all) live there.', tense: 'ott', pronoun: 4 },
    { nl: 'Zij ___ in het buitenland.', en: 'They live abroad.', tense: 'ott', pronoun: 5 }
  ]
};

// Enhanced Spaced Repetition System with LocalStorage persistence
class SpacedRepetitionSystem {
  constructor() {
    this.exercises = [];
    this.history = [];
    this.problemAreas = {};
    this.lastSeen = {};
    this.verbFrequency = {};
    this.streakData = { current: 0, best: 0, lastStudyDate: null };
    this.sessionStats = { correct: 0, incorrect: 0, startTime: Date.now() };
    this.lastVerbs = []; // Track last 3 verbs to prevent repeats
    this.loadFromStorage();
  }

  // Save to localStorage
  saveToStorage() {
    const data = {
      exercises: this.exercises,
      history: this.history,
      problemAreas: this.problemAreas,
      lastSeen: this.lastSeen,
      verbFrequency: this.verbFrequency,
      streakData: this.streakData,
      version: 1
    };
    localStorage.setItem('dutchVerbTrainer', JSON.stringify(data));
  }

  // Load from localStorage
  loadFromStorage() {
    const saved = localStorage.getItem('dutchVerbTrainer');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.exercises = data.exercises || [];
        this.history = data.history || [];
        this.problemAreas = data.problemAreas || {};
        this.lastSeen = data.lastSeen || {};
        this.verbFrequency = data.verbFrequency || {};
        this.streakData = data.streakData || { current: 0, best: 0, lastStudyDate: null };
        
        // Update streak
        this.updateStreak();
      } catch (e) {
        console.error('Failed to load saved data:', e);
      }
    }
  }

  // Update study streak
  updateStreak() {
    const today = new Date().toDateString();
    const lastStudy = this.streakData.lastStudyDate;
    
    if (!lastStudy) {
      this.streakData.current = 1;
      this.streakData.lastStudyDate = today;
    } else if (lastStudy !== today) {
      const lastDate = new Date(lastStudy);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive day
        this.streakData.current++;
        this.streakData.best = Math.max(this.streakData.best, this.streakData.current);
      } else if (diffDays > 1) {
        // Streak broken
        this.streakData.current = 1;
      }
      
      this.streakData.lastStudyDate = today;
    }
    
    this.saveToStorage();
  }

  addExercise(verb, tense, pronounIndex) {
    const key = `${verb}-${tense}-${pronounIndex}`;
    const existing = this.exercises.find(ex => ex.key === key);
    
    if (!existing) {
      this.exercises.push({
        verb,
        tense,
        pronounIndex,
        key,
        lastReview: this.lastSeen[key] || 0,
        attempts: 0,
        successes: 0,
        failures: 0,
        nextReview: 0,
        interval: 0,
        difficulty: 0,
        consecutiveCorrect: 0
      });
    }
  }

  recordResult(exercise, correct, timeTaken) {
    const key = exercise.key;
    const now = Date.now();
    
    // Update session stats
    if (correct) {
      this.sessionStats.correct++;
    } else {
      this.sessionStats.incorrect++;
    }
    
    // Update exercise stats
    exercise.attempts++;
    exercise.lastReview = now;
    
    if (correct) {
      exercise.successes++;
      exercise.consecutiveCorrect++;
      
      // Spaced repetition intervals: 1min → 5min → 15min → 1hr → 1day → 3days → 1week
      const intervals = [60000, 300000, 900000, 3600000, 86400000, 259200000, 604800000];
      const level = Math.min(exercise.consecutiveCorrect, intervals.length - 1);
      exercise.interval = intervals[level];
      exercise.nextReview = now + exercise.interval;
      exercise.difficulty = Math.max(0, exercise.difficulty - 0.1);
    } else {
      exercise.failures++;
      exercise.consecutiveCorrect = 0;
      exercise.interval = 120000; // 2 minutes
      exercise.nextReview = now + exercise.interval;
      exercise.difficulty = Math.min(1, exercise.difficulty + 0.2);
      
      // Mark as problem area
      const problemKey = `${exercise.verb}-${exercise.tense}`;
      this.problemAreas[problemKey] = (this.problemAreas[problemKey] || 0) + 1;
      
      // Affect similar forms
      this.affectSimilarForms(exercise.verb, exercise.tense, exercise.pronounIndex);
    }
    
    this.lastSeen[key] = now;
    this.verbFrequency[exercise.verb] = (this.verbFrequency[exercise.verb] || 0) + 1;
    
    // Record in history
    this.history.push({
      exercise: key,
      verb: exercise.verb,
      tense: exercise.tense,
      pronoun: exercise.pronounIndex,
      correct,
      timeTaken,
      timestamp: now
    });
    
    // Update streak
    this.updateStreak();
    
    // Save to storage
    this.saveToStorage();
  }

  affectSimilarForms(verb, tense, pronounIndex) {
    this.exercises.forEach(ex => {
      if (ex.verb === verb && ex.tense === tense && ex.pronounIndex !== pronounIndex) {
        ex.difficulty = Math.min(1, ex.difficulty + 0.05);
      }
    });
  }

  selectNextExercise(enabledTenses) {
    const now = Date.now();
    const eligible = this.exercises.filter(ex => 
      enabledTenses.includes(ex.tense) && ex.nextReview <= now
    );
    
    if (eligible.length === 0) return null;
    
    const scored = eligible.map(ex => {
      const problemAreaKey = `${ex.verb}-${ex.tense}`;
      const isProblemArea = this.problemAreas[problemAreaKey] > 2;
      const verbOveruse = this.verbFrequency[ex.verb] || 0;
      
      const sentences = exampleSentences[ex.verb];
      const hasExactContext = sentences ? sentences.some(s => 
        s.tense === ex.tense && s.pronoun === ex.pronounIndex
      ) : false;
      
      let score = 0;
      
      const overdueTime = now - ex.nextReview;
      if (overdueTime > 0) {
        score += Math.min(overdueTime / 60000, 10);
      }
      
      if (isProblemArea) score += 5;
      score += ex.difficulty * 3;
      if (hasExactContext) score += 4;
      score -= Math.min(verbOveruse / 10, 3);
      
      // STRONG penalty for recently shown verbs
      if (this.lastVerbs.includes(ex.verb)) {
        const recencyIndex = this.lastVerbs.indexOf(ex.verb);
        // Most recent = index 0, penalize heavily
        // Score penalties: -100 (just shown), -50 (2 ago), -25 (3 ago)
        score -= (100 / Math.pow(2, recencyIndex));
      }
      
      // Add randomization at the end (smaller range to not override penalties)
      score += Math.random() * 5;
      
      return { exercise: ex, score };
    });
    
    scored.sort((a, b) => b.score - a.score);
    
    // Update last verbs tracker
    const selected = scored[0].exercise;
    this.lastVerbs.unshift(selected.verb); // Add to front
    if (this.lastVerbs.length > 3) {
      this.lastVerbs.pop(); // Keep only last 3
    }
    
    return selected;
  }

  // Special method for participle practice - ensures verb variety
  selectNextParticiple() {
    const now = Date.now();
    
    // Get all unique verbs from exercises
    const uniqueVerbs = [...new Set(this.exercises.map(ex => ex.verb))];
    
    // Score each verb (not individual exercises)
    const verbScores = uniqueVerbs.map(verb => {
      const verbExercises = this.exercises.filter(ex => ex.verb === verb);
      
      // Calculate aggregate scores
      const avgDifficulty = verbExercises.reduce((sum, ex) => sum + ex.difficulty, 0) / verbExercises.length;
      const totalAttempts = verbExercises.reduce((sum, ex) => sum + ex.attempts, 0);
      const verbOveruse = this.verbFrequency[verb] || 0;
      
      let score = 0;
      
      // Prioritize less-practiced verbs
      if (totalAttempts < 3) score += 10;
      
      // Add difficulty factor
      score += avgDifficulty * 2;
      
      // Penalize recent usage
      score -= Math.min(verbOveruse / 5, 5);
      
      // VERY STRONG penalty for recently shown verbs in participle mode
      if (this.lastVerbs.includes(verb)) {
        const recencyIndex = this.lastVerbs.indexOf(verb);
        // Much stronger penalties: -200, -100, -50, -25, -12
        score -= (200 / Math.pow(2, recencyIndex));
      }
      
      // Strong randomization to ensure variety
      score += Math.random() * 15;
      
      return { verb, score };
    });
    
    // Sort and select top verb
    verbScores.sort((a, b) => b.score - a.score);
    const selectedVerb = verbScores[0].verb;
    
    // Update tracking (track more verbs for participle mode)
    this.lastVerbs.unshift(selectedVerb);
    if (this.lastVerbs.length > 5) { // Track last 5 instead of 3
      this.lastVerbs.pop();
    }
    
    // Return a simple exercise object with just the verb
    return {
      verb: selectedVerb,
      tense: 'vtt', // Dummy tense for participle practice
      pronounIndex: 0 // Dummy pronoun
    };
  }

  getProblemAreas() {
    return Object.entries(this.problemAreas)
      .filter(([_, count]) => count > 2)
      .map(([key, count]) => {
        const [verb, tense] = key.split('-');
        return { verb, tense, count };
      })
      .sort((a, b) => b.count - a.count);
  }

  getStrengths() {
    // Find exercises with high success rates (>80%) and multiple attempts
    const strengths = this.exercises
      .filter(ex => ex.attempts >= 5 && (ex.successes / ex.attempts) > 0.8)
      .map(ex => ({
        verb: ex.verb,
        tense: ex.tense,
        pronoun: ex.pronounIndex,
        accuracy: ((ex.successes / ex.attempts) * 100).toFixed(0)
      }))
      .sort((a, b) => b.accuracy - a.accuracy);
    
    return strengths.slice(0, 5);
  }

  getStats() {
    const total = this.history.length;
    const correct = this.history.filter(h => h.correct).length;
    const accuracy = total > 0 ? (correct / total * 100).toFixed(1) : 0;
    
    // Calculate average response time
    const avgTime = total > 0 
      ? (this.history.reduce((sum, h) => sum + h.timeTaken, 0) / total / 1000).toFixed(1)
      : 0;
    
    // Recent performance (last 10)
    const recent = this.history.slice(-10);
    const recentCorrect = recent.filter(h => h.correct).length;
    const recentAccuracy = recent.length > 0 ? (recentCorrect / recent.length * 100).toFixed(0) : 0;
    
    return {
      totalAttempts: total,
      correctAnswers: correct,
      accuracy,
      problemAreas: this.getProblemAreas().length,
      avgResponseTime: avgTime,
      recentAccuracy,
      streak: this.streakData.current,
      bestStreak: this.streakData.best,
      sessionCorrect: this.sessionStats.correct,
      sessionIncorrect: this.sessionStats.incorrect
    };
  }

  getTenseBreakdown() {
    const breakdown = {};
    this.history.forEach(h => {
      if (!breakdown[h.tense]) {
        breakdown[h.tense] = { correct: 0, total: 0 };
      }
      breakdown[h.tense].total++;
      if (h.correct) breakdown[h.tense].correct++;
    });
    
    return Object.entries(breakdown).map(([tense, data]) => ({
      tense,
      accuracy: ((data.correct / data.total) * 100).toFixed(0),
      total: data.total
    }));
  }

  resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem('dutchVerbTrainer');
      this.exercises = [];
      this.history = [];
      this.problemAreas = {};
      this.lastSeen = {};
      this.verbFrequency = {};
      this.streakData = { current: 0, best: 0, lastStudyDate: null };
      return true;
    }
    return false;
  }
}


export default function DutchVerbApp() {
  const [srs] = useState(() => new SpacedRepetitionSystem());
  const [enabledTenses, setEnabledTenses] = useState(['ott', 'ovt', 'vtt']);
  const [levelRange, setLevelRange] = useState({ min: 'A1', max: 'B1' });
  const [currentExercise, setCurrentExercise] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [stats, setStats] = useState(srs.getStats());
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [contextSentence, setContextSentence] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // New batch mode states
  const [batchSize, setBatchSize] = useState(null); // null = infinite, or number
  const [batchProgress, setBatchProgress] = useState([]);
  const [showBatchSummary, setShowBatchSummary] = useState(false);
  const [includeIrregular, setIncludeIrregular] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [reviewItems, setReviewItems] = useState([]);
  
  // App mode and start screen
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [practiceMode, setPracticeMode] = useState('single'); // 'single' or 'table'
  const [tableAnswers, setTableAnswers] = useState({});
  const [showVerbLibrary, setShowVerbLibrary] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved preference, default to false
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  // Save dark mode preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initialize exercises on mount with level filtering
  useEffect(() => {
    if (!isInitialized) {
      initializeExercises();
      setIsInitialized(true);
      loadNextExercise();
    }
  }, [isInitialized]);

  // Reinitialize when level range changes
  useEffect(() => {
    if (isInitialized) {
      initializeExercises();
      loadNextExercise();
    }
  }, [levelRange, includeIrregular]);

  // Handle Enter key for advancing to next exercise when results are shown
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && showResult && currentExercise) {
        loadNextExercise();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [showResult, currentExercise]);

  const initializeExercises = () => {
    let verbs = DutchVerbs.getVerbsByLevel(levelRange.min, levelRange.max);
    
    // Filter out regular verbs if irregular-only mode is enabled
    if (!includeIrregular) {
      // Only include verbs that are in the irregular list (not generated by conjugateRegular)
      verbs = verbs.filter(verb => DutchVerbs.irregular[verb]);
    }
    
    const tenses = ['ott', 'ovt', 'vtt', 'pqp', 'future', 'conditional', 'conditional_perfect', 'future_perfect', 'subjunctive', 'imperative'];
    
    // Clear existing exercises
    srs.exercises = [];
    
    verbs.forEach(verb => {
      tenses.forEach(tense => {
        pronouns.forEach((_, idx) => {
          srs.addExercise(verb, tense, idx);
        });
      });
    });
  };

  const loadNextExercise = () => {
    let exercise;
    
    // Use different selection logic for participle mode
    if (practiceMode === 'participle') {
      exercise = srs.selectNextParticiple();
    } else {
      exercise = srs.selectNextExercise(enabledTenses);
    }
    
    if (exercise) {
      setCurrentExercise(exercise);
      setUserAnswer('');
      setShowResult(false);
      setStartTime(Date.now());
      
      // Only set context sentences for non-participle modes
      if (practiceMode !== 'participle') {
        // Find EXACT matching context sentence: same verb, tense, AND pronoun
        const sentences = exampleSentences[exercise.verb];
        if (sentences) {
          const exactMatch = sentences.find(s => 
            s.tense === exercise.tense && s.pronoun === exercise.pronounIndex
          );
          setContextSentence(exactMatch || null);
        } else {
          setContextSentence(null);
        }
      }
    } else {
      setCurrentExercise(null);
    }
  };

  const handleSubmit = () => {
    if (!currentExercise || !userAnswer.trim()) return;
    
    const correctAnswer = DutchVerbs.getConjugation(
      currentExercise.verb,
      currentExercise.tense,
      currentExercise.pronounIndex
    );
    
    const timeTaken = Date.now() - startTime;
    const correct = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
    
    // Play sound effect
    if (correct) {
      playSuccessSound();
    } else {
      playErrorSound();
    }
    
    srs.recordResult(currentExercise, correct, timeTaken);
    setIsCorrect(correct);
    setShowResult(true);
    setStats(srs.getStats());
    
    // Track batch progress
    const result = {
      verb: currentExercise.verb,
      tense: currentExercise.tense,
      pronounIndex: currentExercise.pronounIndex,
      userAnswer: userAnswer.trim(),
      correctAnswer,
      correct,
      timeTaken
    };
    
    const newBatchProgress = [...batchProgress, result];
    setBatchProgress(newBatchProgress);
    
    // Check if batch is complete
    if (batchSize && newBatchProgress.length >= batchSize) {
      setShowBatchSummary(true);
    }
    
    // Add to review items if incorrect
    if (!correct) {
      setReviewItems(prev => [...prev, result]);
    }
  };

  const handleNext = () => {
    loadNextExercise();
  };

  const handleContinueAfterBatch = () => {
    setBatchProgress([]);
    setShowBatchSummary(false);
    loadNextExercise();
  };

  const fillContextSentence = (sentence, answer, tense) => {
    // For compound tenses (vtt, pqp), the answer contains both auxiliary and participle
    // e.g., "heb gehad" but the sentence structure is "Ik ___ tijd gehad"
    // We need to only put the auxiliary in the blank, the participle is already in the sentence
    if (tense === 'vtt' || tense === 'pqp') {
      const parts = answer.split(' ');
      if (parts.length === 2) {
        // Only fill in the auxiliary verb (first part)
        return sentence.replace('___', parts[0]);
      }
    }
    // For simple tenses and future, just replace normally
    return sentence.replace('___', answer);
  };

  const speakDutch = (text) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'nl-NL'; // Dutch (Netherlands)
    utterance.rate = 0.85; // Slightly slower for clarity
    utterance.pitch = 1.0;
    
    // Try to find a Dutch voice, fallback to default
    const voices = window.speechSynthesis.getVoices();
    const dutchVoice = voices.find(voice => voice.lang.startsWith('nl'));
    if (dutchVoice) {
      utterance.voice = dutchVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  };

  // Play success sound
  const playSuccessSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create a pleasant "ding" sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Success: pleasant ascending tones
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  // Play error sound
  const playErrorSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create a gentle "buzz" sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Error: descending tone
    oscillator.frequency.setValueAtTime(329.63, audioContext.currentTime); // E4
    oscillator.frequency.setValueAtTime(261.63, audioContext.currentTime + 0.15); // C4
    
    oscillator.type = 'triangle';
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  // Load voices when they become available
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const getEnglishTranslation = (verb) => {
    const verbData = DutchVerbs.irregular[verb];
    if (verbData?.english) return verbData.english;
    
    // Common translations for verbs without explicit english field
    const commonTranslations = {
      // A1 verbs
      'maken': 'to make', 'werken': 'to work', 'wonen': 'to live', 'kijken': 'to look/watch',
      'lezen': 'to read', 'eten': 'to eat', 'drinken': 'to drink', 'slapen': 'to sleep',
      'spelen': 'to play', 'praten': 'to talk', 'horen': 'to hear', 'zeggen': 'to say',
      'vragen': 'to ask', 'antwoorden': 'to answer', 'kopen': 'to buy', 'verkopen': 'to sell',
      'betalen': 'to pay', 'heten': 'to be called', 'weten': 'to know', 'kennen': 'to know/be familiar with',
      'leren': 'to learn', 'stoppen': 'to stop', 'helpen': 'to help', 'zoeken': 'to search',
      'wachten': 'to wait', 'sturen': 'to send', 'pakken': 'to grab', 'leggen': 'to lay',
      'zetten': 'to put/set', 'halen': 'to get/fetch', 'bellen': 'to call', 'snijden': 'to cut',
      'vallen': 'to fall', 'rennen': 'to run', 'stappen': 'to step', 'rusten': 'to rest',
      'lachen': 'to laugh', 'huilen': 'to cry', 'schreeuwen': 'to shout', 'springen': 'to jump',
      'dragen': 'to carry/wear', 'sterven': 'to die', 'groeien': 'to grow', 'roken': 'to smoke',
      'ademen': 'to breathe', 'zwaaien': 'to wave', 'wijzen': 'to point', 'tellen': 'to count',
      'rekenen': 'to calculate', 'meten': 'to measure', 'wegen': 'to weigh', 'passen': 'to fit',
      'kussen': 'to kiss', 'knuffelen': 'to hug', 'bouwen': 'to build', 'ruiken': 'to smell',
      'voelen': 'to feel', 'proberen': 'to try', 'missen': 'to miss',
      // A2 verbs
      'geven': 'to give', 'nemen': 'to take', 'vinden': 'to find', 'schrijven': 'to write',
      'worden': 'to become', 'blijven': 'to stay', 'zitten': 'to sit', 'staan': 'to stand',
      'liggen': 'to lie', 'leven': 'to live', 'reizen': 'to travel', 'rijden': 'to drive',
      'fietsen': 'to cycle', 'wandelen': 'to walk', 'zwemmen': 'to swim', 'koken': 'to cook',
      'bakken': 'to bake', 'wassen': 'to wash', 'openen': 'to open', 'sluiten': 'to close',
      'draaien': 'to turn', 'trekken': 'to pull', 'duwen': 'to push', 'proeven': 'to taste',
      'hopen': 'to hope', 'mogen': 'to be allowed', 'hoeven': 'to need to', 'gebruiken': 'to use',
      'noemen': 'to call/name', 'tonen': 'to show', 'vertellen': 'to tell', 'luisteren': 'to listen',
      'veranderen': 'to change', 'winnen': 'to win', 'verliezen': 'to lose',
      // B1+ verbs
      'beginnen': 'to begin', 'denken': 'to think', 'brengen': 'to bring', 'krijgen': 'to get',
      'houden': 'to hold/keep', 'groeten': 'to greet', 'bedanken': 'to thank', 'vergeten': 'to forget',
      'herinneren': 'to remember', 'geloven': 'to believe', 'betekenen': 'to mean', 'verklaren': 'to explain',
      'beschrijven': 'to describe', 'tekenen': 'to draw', 'zingen': 'to sing', 'dansen': 'to dance',
      'sporten': 'to do sports', 'studeren': 'to study', 'onderzoeken': 'to investigate', 'ontdekken': 'to discover',
      'verzamelen': 'to collect', 'breken': 'to break', 'repareren': 'to repair', 'verbeteren': 'to improve'
    };
    
    return commonTranslations[verb] || '';
  };

  const getVerbMastery = (verb) => {
    // Get all exercises for this verb
    const verbExercises = srs.exercises.filter(ex => ex.verb === verb);
    
    if (verbExercises.length === 0) {
      return { level: 'Not Practiced', percentage: 0, color: 'gray', attempts: 0, accuracy: 0 };
    }
    
    const totalAttempts = verbExercises.reduce((sum, ex) => sum + ex.attempts, 0);
    const totalSuccesses = verbExercises.reduce((sum, ex) => sum + ex.successes, 0);
    
    if (totalAttempts === 0) {
      return { level: 'Not Practiced', percentage: 0, color: 'gray', attempts: 0, accuracy: 0 };
    }
    
    const accuracy = (totalSuccesses / totalAttempts) * 100;
    
    // Mastery levels based on attempts and accuracy
    let level, color, percentage;
    
    if (totalAttempts >= 20 && accuracy >= 90) {
      level = 'Mastered';
      color = 'emerald';
      percentage = 100;
    } else if (totalAttempts >= 15 && accuracy >= 80) {
      level = 'Proficient';
      color = 'blue';
      percentage = 80;
    } else if (totalAttempts >= 10 && accuracy >= 70) {
      level = 'Familiar';
      color = 'cyan';
      percentage = 60;
    } else if (totalAttempts >= 5 && accuracy >= 60) {
      level = 'Learning';
      color = 'amber';
      percentage = 40;
    } else if (totalAttempts >= 1) {
      level = 'Beginner';
      color = 'orange';
      percentage = 20;
    } else {
      level = 'Not Practiced';
      color: 'gray';
      percentage = 0;
    }
    
    return { level, percentage, color, attempts: totalAttempts, accuracy: Math.round(accuracy) };
  };

  const getGrammarExplanation = (verb, tense, pronounIndex) => {
    const verbData = DutchVerbs.irregular[verb] || DutchVerbs.conjugateRegular(verb);
    const isIrregular = !!DutchVerbs.irregular[verb];
    const pronoun = pronouns[pronounIndex];
    const pronounLabel = pronounLabels[pronounIndex];
    const conjugation = DutchVerbs.getConjugation(verb, tense, pronounIndex);
    const strongClass = verbData.strongClass;
    const ablaut = verbData.ablaut;
    const isSeparable = verbData.separable;
    const prefix = verbData.prefix;

    let explanation = '';
    
    // Separable verb note for present and simple past
    const separableNote = isSeparable && (tense === 'ott' || tense === 'ovt') 
      ? ` <span class="text-purple-700">⚡ Separable verb: prefix "<strong>${prefix}</strong>" moves to end in main clauses.</span>` 
      : '';

    switch(tense) {
      case 'ott': // Present tense
        if (isIrregular) {
          if (strongClass) {
            explanation = `<strong>${verb}</strong> is a <strong>strong verb (Class ${strongClass})</strong>${isSeparable ? ' and <strong>separable</strong>' : ''}. For <strong>${pronounLabel}</strong>, the present tense form is <strong>${conjugation}</strong>.${separableNote}`;
          } else {
            explanation = `<strong>${verb}</strong> is an <strong>irregular verb</strong>${isSeparable ? ' and <strong>separable</strong>' : ''} in present tense. For <strong>${pronounLabel}</strong>, the form is <strong>${conjugation}</strong>.${separableNote}`;
          }
        } else {
          const stem = DutchVerbs.getStem(verbData.baseVerb || verb);
          if (pronounIndex === 0) { // ik
            explanation = `For <strong>${pronounLabel}</strong>: Take the stem "<strong>${stem}</strong>" (remove -en from ${verbData.baseVerb || verb}). The form is <strong>${conjugation}</strong>.${separableNote}`;
          } else if (pronounIndex === 1) { // jij/je
            explanation = `For <strong>${pronounLabel}</strong>: Take the stem "<strong>${stem}</strong>" and add <strong>-t</strong> → <strong>${conjugation}</strong>.${separableNote}`;
          } else if (pronounIndex === 2) { // u/hij/zij/het
            explanation = `For <strong>${pronounLabel}</strong>: Take the stem "<strong>${stem}</strong>" and add <strong>-t</strong> → <strong>${conjugation}</strong>.${separableNote}`;
          } else { // wij, jullie, zij (plural)
            explanation = `For <strong>${pronounLabel}</strong>: Use the infinitive form → <strong>${conjugation}</strong>.${separableNote}`;
          }
        }
        break;

      case 'ovt': // Simple past
        if (isIrregular) {
          if (strongClass && ablaut) {
            const classInfo = StrongVerbClasses[strongClass];
            explanation = `<strong>${verb}</strong> is a <strong>strong verb (${classInfo.name})</strong>${isSeparable ? ' and <strong>separable</strong>' : ''} following the <strong>${classInfo.pattern}</strong> pattern. For <strong>${pronounLabel}</strong>, the simple past is <strong>${conjugation}</strong>.${separableNote}`;
          } else {
            explanation = `<strong>${verb}</strong> is an <strong>irregular verb</strong>${isSeparable ? ' and <strong>separable</strong>' : ''} in simple past. For <strong>${pronounLabel}</strong>, the form is <strong>${conjugation}</strong>.${separableNote}`;
          }
        } else {
          const stem = DutchVerbs.getStem(verbData.baseVerb || verb);
          const usesT = DutchVerbs.usesT(stem);
          const ending = usesT ? 'te' : 'de';
          const pluralEnding = usesT ? 'ten' : 'den';
          const rule = usesT ? "'t kofschip rule" : "soft consonant";
          
          if (pronounIndex <= 2) { // singular
            explanation = `<strong>Weak verb</strong>${isSeparable ? ' (separable)' : ''}: Stem "<strong>${stem}</strong>" ends with ${rule}, so add <strong>-${ending}</strong> → <strong>${conjugation}</strong>.${separableNote}`;
          } else { // plural
            explanation = `<strong>Weak verb</strong>${isSeparable ? ' (separable)' : ''}: Stem "<strong>${stem}</strong>" ends with ${rule}, so add <strong>-${pluralEnding}</strong> → <strong>${conjugation}</strong>.${separableNote}`;
          }
        }
        break;

      case 'vtt': // Present perfect
        const vttAux = verbData.auxiliary;
        const participle = verbData.vtt_part;
        const parts = conjugation.split(' ');
        const separableParticiple = isSeparable ? ` For separable verbs, prefix "${prefix}" + ge + stem: <strong>${participle}</strong>` : '';
        
        if (isIrregular) {
          explanation = `<strong>Present Perfect</strong> uses <strong>${vttAux}</strong> (because ${verb} indicates ${vttAux === 'zijn' ? 'movement/change of state' : 'action/possession'}) + past participle. For <strong>${pronounLabel}</strong>: <strong>${parts[0]}</strong> (${vttAux} conjugated) + <strong>${participle}</strong>${strongClass ? ' (strong verb participle)' : ' (irregular participle)'}.${separableParticiple}`;
        } else {
          const stem = DutchVerbs.getStem(verbData.baseVerb || verb);
          const usesT = DutchVerbs.usesT(stem);
          const participleEnding = usesT ? 't' : 'd';
          explanation = `<strong>Present Perfect</strong> uses <strong>${vttAux}</strong> + past participle. For <strong>${pronounLabel}</strong>: <strong>${parts[0]}</strong> (${vttAux} conjugated) + <strong>${participle}</strong> (${isSeparable ? 'prefix + ge + stem' : 'ge + stem'} + ${participleEnding}).${separableParticiple}`;
        }
        break;

      case 'pqp': // Past perfect
        const pqpAux = verbData.auxiliary;
        const pqpParticiple = verbData.vtt_part;
        const pqpParts = conjugation.split(' ');
        
        explanation = `<strong>Past Perfect</strong> uses past tense of <strong>${pqpAux}</strong> + past participle. For <strong>${pronounLabel}</strong>: <strong>${pqpParts[0]}</strong> (${pqpAux} in simple past) + <strong>${pqpParticiple}</strong>.`;
        break;

      case 'future': // Future
        const futureParts = conjugation.split(' ');
        explanation = `<strong>Future tense</strong> uses <strong>zullen</strong> + infinitive. For <strong>${pronounLabel}</strong>: <strong>${futureParts[0]}</strong> (zullen conjugated) + <strong>${verb}</strong> (infinitive).`;
        break;

      case 'conditional': // Conditional
        const condParts = conjugation.split(' ');
        explanation = `<strong>Conditional mood</strong> uses <strong>zou/zouden</strong> + infinitive. For <strong>${pronounLabel}</strong>: <strong>${condParts[0]}</strong> (zou conjugated) + <strong>${verb}</strong> (infinitive). Expresses hypothetical or polite requests.`;
        break;

      case 'conditional_perfect': // Conditional perfect
        const condPerfParts = conjugation.split(' ');
        explanation = `<strong>Conditional Perfect</strong> uses <strong>zou/zouden</strong> + past participle of auxiliary + past participle. For <strong>${pronounLabel}</strong>: <strong>${condPerfParts[0]}</strong> + <strong>${condPerfParts[1]}</strong> + <strong>${condPerfParts[2]}</strong>. Expresses hypothetical past actions.`;
        break;

      case 'future_perfect': // Future perfect
        const futPerfParts = conjugation.split(' ');
        explanation = `<strong>Future Perfect</strong> uses <strong>zullen</strong> + past participle of auxiliary + past participle. For <strong>${pronounLabel}</strong>: <strong>${futPerfParts[0]}</strong> + <strong>${futPerfParts[1]}</strong> + <strong>${futPerfParts[2]}</strong>. Describes completed future actions.`;
        break;

      case 'subjunctive': // Subjunctive
        explanation = `<strong>Subjunctive mood</strong> in modern Dutch is rare and archaic. It typically follows present tense forms. For <strong>${pronounLabel}</strong>: <strong>${conjugation}</strong>. Used in formal contexts, wishes, or hypotheticals.`;
        break;

      case 'imperative': // Imperative
        if (conjugation === '-') {
          explanation = `<strong>Imperative mood</strong> is only used for commands to 2nd person (jij, jullie, u). Not applicable for <strong>${pronounLabel}</strong>.`;
        } else {
          explanation = `<strong>Imperative mood</strong> gives commands. For <strong>${pronounLabel}</strong>: <strong>${conjugation}</strong>. Use the stem${pronounIndex === 4 ? ' or infinitive form' : ''} for direct commands.`;
        }
        break;
    }

    return explanation;
  };

  const tenseLabels = {
    ott: 'Present',
    ovt: 'Simple Past',
    vtt: 'Present Perfect',
    pqp: 'Past Perfect',
    future: 'Future',
    conditional: 'Conditional',
    conditional_perfect: 'Conditional Perfect',
    future_perfect: 'Future Perfect',
    subjunctive: 'Subjunctive',
    imperative: 'Imperative'
  };

  const tenseColors = {
    ott: {
      bg: 'bg-blue-100',
      border: 'border-blue-300',
      text: 'text-blue-800',
      gradient: 'from-blue-50 to-blue-100'
    },
    ovt: {
      bg: 'bg-purple-100',
      border: 'border-purple-300',
      text: 'text-purple-800',
      gradient: 'from-purple-50 to-purple-100'
    },
    vtt: {
      bg: 'bg-emerald-100',
      border: 'border-emerald-300',
      text: 'text-emerald-800',
      gradient: 'from-emerald-50 to-emerald-100'
    },
    pqp: {
      bg: 'bg-rose-100',
      border: 'border-rose-300',
      text: 'text-rose-800',
      gradient: 'from-rose-50 to-rose-100'
    },
    future: {
      bg: 'bg-amber-100',
      border: 'border-amber-300',
      text: 'text-amber-800',
      gradient: 'from-amber-50 to-amber-100'
    },
    conditional: {
      bg: 'bg-cyan-100',
      border: 'border-cyan-300',
      text: 'text-cyan-800',
      gradient: 'from-cyan-50 to-cyan-100'
    },
    conditional_perfect: {
      bg: 'bg-teal-100',
      border: 'border-teal-300',
      text: 'text-teal-800',
      gradient: 'from-teal-50 to-teal-100'
    },
    future_perfect: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-300',
      text: 'text-yellow-800',
      gradient: 'from-yellow-50 to-yellow-100'
    },
    subjunctive: {
      bg: 'bg-indigo-100',
      border: 'border-indigo-300',
      text: 'text-indigo-800',
      gradient: 'from-indigo-50 to-indigo-100'
    },
    imperative: {
      bg: 'bg-red-100',
      border: 'border-red-300',
      text: 'text-red-800',
      gradient: 'from-red-50 to-red-100'
    }
  };

  if (!isInitialized || !currentExercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-stone-600 dark:text-stone-400">Loading exercises...</p>
        </div>
      </div>
    );
  }

  const correctAnswer = DutchVerbs.getConjugation(
    currentExercise.verb,
    currentExercise.tense,
    currentExercise.pronounIndex
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Start Screen */}
      {showStartScreen && (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-6xl w-full">
            
            {/* Dark Mode Toggle - Start Screen */}
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all border border-stone-200 dark:border-gray-700"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? (
                  <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Hero Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl transform -rotate-6">
                  <span className="text-4xl font-bold text-white">NL</span>
                </div>
              </div>
              <h1 className="text-6xl font-bold text-stone-900 dark:text-stone-100 mb-4 leading-tight">
                Master Dutch Verbs
              </h1>
              <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
                Learn 300+ conjugations across 10 tenses with spaced repetition, grammar insights, and native pronunciation
              </p>
            </div>

            {/* Mode Selection Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              
              {/* Single Question Mode */}
              <button
                onClick={() => {
                  setPracticeMode('single');
                  setShowStartScreen(false);
                  if (!isInitialized) {
                    initializeExercises();
                    setIsInitialized(true);
                    loadNextExercise();
                  }
                }}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-transparent hover:border-orange-500 dark:hover:border-orange-400 transition-all transform hover:scale-105 hover:shadow-2xl text-left"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3">Single Question</h3>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                  Practice one conjugation at a time with instant feedback, context sentences, and detailed grammar explanations
                </p>
                <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold">
                  Start practicing 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>

              {/* Table Mode */}
              <button
                onClick={() => {
                  setPracticeMode('table');
                  setShowStartScreen(false);
                  if (!isInitialized) {
                    initializeExercises();
                    setIsInitialized(true);
                    loadNextExercise();
                  }
                }}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 transition-all transform hover:scale-105 hover:shadow-2xl text-left"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3">Full Table Mode</h3>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                  Fill complete conjugation tables for all 6 persons in one go. Perfect for comprehensive practice
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold">
                  Start practicing 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>

              {/* Participle Mode */}
              <button
                onClick={() => {
                  setPracticeMode('participle');
                  setShowStartScreen(false);
                  if (!isInitialized) {
                    initializeExercises();
                    setIsInitialized(true);
                    loadNextExercise();
                  }
                }}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-transparent hover:border-purple-500 dark:hover:border-purple-400 transition-all transform hover:scale-105 hover:shadow-2xl text-left"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3">Participle Practice</h3>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                  Master past participles and auxiliary verb selection with focused drills across all 300+ verbs
                </p>
                <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold">
                  Start practicing 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-stone-200 dark:border-gray-700">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-1">Smart Learning</h4>
                  <p className="text-sm text-stone-600 dark:text-stone-400">Spaced repetition focuses on weak areas</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Volume2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-1">Native Audio</h4>
                  <p className="text-sm text-stone-600 dark:text-stone-400">AI Dutch pronunciation for every verb</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-1">Track Progress</h4>
                  <p className="text-sm text-stone-600 dark:text-stone-400">Detailed stats and streak tracking</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-1">Grammar Rules</h4>
                  <p className="text-sm text-stone-600 dark:text-stone-400">Learn strong verb patterns, not memorization</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-600">306</div>
                  <div className="text-xs text-stone-600 mt-1">Verbs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">10</div>
                  <div className="text-xs text-stone-600 mt-1">Tenses & Moods</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">A1–C2</div>
                  <div className="text-xs text-stone-600 mt-1">CEFR Levels</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Main App - Only shown after start screen */}
      {!showStartScreen && (
        <>
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowStartScreen(true)}
                className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-lg font-bold text-white">NL</span>
              </button>
              <div>
                <h1 className="text-xl font-bold text-stone-800 dark:text-stone-100">Dutch Verb Practice</h1>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {practiceMode === 'single' ? 'Single Question Mode' : 
                   practiceMode === 'table' ? 'Full Table Mode' : 
                   'Participle Practice Mode'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {stats.streak > 0 && (
                <div className="flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                  <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">{stats.streak} day streak</span>
                </div>
              )}
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.accuracy}%</div>
                <div className="text-xs text-stone-500 dark:text-stone-400">{stats.correctAnswers}/{stats.totalAttempts}</div>
              </div>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-stone-100 dark:hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              
              {reviewItems.length > 0 && (
                <button
                  onClick={() => setShowReview(!showReview)}
                  className="relative p-2 hover:bg-stone-100 dark:hover:bg-gray-700 dark:bg-gray-700 rounded-lg transition-colors"
                  title="Review incorrect answers"
                >
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  <span className="absolute -top-1 -right-1 bg-rose-50 dark:bg-rose-900/200 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {reviewItems.length}
                  </span>
                </button>
              )}
              <button
                onClick={() => setShowVerbLibrary(!showVerbLibrary)}
                className="p-2 hover:bg-stone-100 dark:hover:bg-gray-700 dark:bg-gray-700 rounded-lg transition-colors"
                title="Verb Library"
              >
                <svg className="w-5 h-5 text-stone-600 dark:text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </button>
              <button
                onClick={() => setShowStats(!showStats)}
                className="p-2 hover:bg-stone-100 dark:hover:bg-gray-700 dark:bg-gray-700 rounded-lg transition-colors"
              >
                <BarChart3 className="w-5 h-5 text-stone-600 dark:text-stone-400" />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-stone-100 dark:hover:bg-gray-700 dark:bg-gray-700 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-stone-600 dark:text-stone-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      {showStats && (
        <div className="border-b border-stone-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100">Your Progress</h3>
              <button
                onClick={() => {
                  if (srs.resetProgress()) {
                    setStats(srs.getStats());
                    loadNextExercise();
                  }
                }}
                className="text-sm text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300"
              >
                Reset Progress
              </button>
            </div>
            
            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                <div className="text-sm text-stone-600 mb-1">Overall Accuracy</div>
                <div className="text-3xl font-bold text-orange-600">{stats.accuracy}%</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                <div className="text-sm text-stone-600 mb-1">Recent (Last 10)</div>
                <div className="text-3xl font-bold text-emerald-600">{stats.recentAccuracy}%</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="text-sm text-stone-600 mb-1">Current Streak</div>
                <div className="text-3xl font-bold text-blue-600 flex items-center gap-1">
                  <Calendar className="w-6 h-6" />
                  {stats.streak}
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="text-sm text-stone-600 mb-1">Avg Response</div>
                <div className="text-3xl font-bold text-purple-600">{stats.avgResponseTime}s</div>
              </div>
            </div>

            {/* Session Stats */}
            {(stats.sessionCorrect + stats.sessionIncorrect) > 0 && (
              <div className="mb-6 p-4 bg-stone-50 dark:bg-gray-900 rounded-lg border border-stone-200 dark:border-gray-700">
                <div className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">This Session</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">{stats.sessionCorrect} correct</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600" />
                    <span className="text-rose-700 font-semibold">{stats.sessionIncorrect} incorrect</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tense Breakdown */}
            {srs.getTenseBreakdown().length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-stone-800 mb-3">Performance by Tense</h4>
                <div className="space-y-2">
                  {srs.getTenseBreakdown().map(({ tense, accuracy, total }) => (
                    <div key={tense} className="flex items-center gap-3">
                      <div className="w-32 text-sm text-stone-700 font-medium">
                        {tenseLabels[tense]}
                      </div>
                      <div className="flex-1 h-8 bg-stone-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-end pr-3"
                          style={{ width: `${accuracy}%` }}
                        >
                          <span className="text-xs font-semibold text-white">{accuracy}%</span>
                        </div>
                      </div>
                      <div className="text-sm text-stone-500 w-16 text-right">{total} tries</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths */}
            {srs.getStrengths().length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Your Strengths
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {srs.getStrengths().map(({ verb, tense, pronoun, accuracy }, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded border border-emerald-200">
                      <Target className="w-4 h-4 text-emerald-600" />
                      <span className="font-serif font-semibold text-emerald-800">{verb}</span>
                      <span className="text-xs text-stone-600 dark:text-stone-400">
                        {tenseLabels[tense]} • {pronounLabels[pronoun]}
                      </span>
                      <span className="ml-auto text-emerald-700 font-semibold text-sm">{accuracy}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Problem Areas */}
            {srs.getProblemAreas().length > 0 && (
              <div>
                <h4 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  Areas to Improve
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {srs.getProblemAreas().slice(0, 6).map(({ verb, tense, count }, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-rose-50 dark:bg-rose-900/20 rounded border border-rose-200">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span className="font-serif font-semibold text-rose-800">{verb}</span>
                      <span className="text-xs text-stone-600 dark:text-stone-400">{tenseLabels[tense]}</span>
                      <span className="ml-auto text-rose-700 font-semibold text-sm">{count} errors</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {stats.totalAttempts === 0 && (
              <div className="text-center py-8 text-stone-500 dark:text-stone-400">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Complete some exercises to see your progress here</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-b border-stone-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-4">Practice Settings</h3>
            
            {/* CEFR Level Range */}
            <div className="mb-6 p-4 bg-stone-50 dark:bg-gray-900 rounded-lg border border-stone-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-stone-700">Vocabulary Level (CEFR)</label>
                <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-800 rounded border border-stone-300 dark:border-gray-600">
                  <span className="text-sm font-bold text-orange-600">{levelRange.min}</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">to</span>
                  <span className="text-sm font-bold text-orange-600">{levelRange.max}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Min Level */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-stone-600 dark:text-stone-400">Minimum Level</span>
                    <span className="text-xs font-semibold text-stone-700">{levelRange.min}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(levelRange.min)}
                    onChange={(e) => {
                      const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
                      const newMin = levels[parseInt(e.target.value)];
                      const maxIndex = levels.indexOf(levelRange.max);
                      const newMinIndex = parseInt(e.target.value);
                      setLevelRange({
                        min: newMin,
                        max: newMinIndex > maxIndex ? newMin : levelRange.max
                      });
                    }}
                    className="w-full h-2 bg-gradient-to-r from-emerald-200 via-amber-200 to-rose-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      accentColor: '#f97316'
                    }}
                  />
                  <div className="flex justify-between mt-1">
                    {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => (
                      <span key={level} className="text-xs text-stone-400">{level}</span>
                    ))}
                  </div>
                </div>
                
                {/* Max Level */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-stone-600 dark:text-stone-400">Maximum Level</span>
                    <span className="text-xs font-semibold text-stone-700">{levelRange.max}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(levelRange.max)}
                    onChange={(e) => {
                      const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
                      const newMax = levels[parseInt(e.target.value)];
                      const minIndex = levels.indexOf(levelRange.min);
                      const newMaxIndex = parseInt(e.target.value);
                      setLevelRange({
                        min: newMaxIndex < minIndex ? newMax : levelRange.min,
                        max: newMax
                      });
                    }}
                    className="w-full h-2 bg-gradient-to-r from-emerald-200 via-amber-200 to-rose-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      accentColor: '#f97316'
                    }}
                  />
                  <div className="flex justify-between mt-1">
                    {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => (
                      <span key={level} className="text-xs text-stone-400">{level}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{DutchVerbs.getVerbsByLevel(levelRange.min, levelRange.max).length}</span>
                  <span>verbs available in this range</span>
                </div>
              </div>
            </div>

            {/* Batch Mode */}
            <div className="mb-6 p-4 bg-stone-50 dark:bg-gray-900 rounded-lg border border-stone-200 dark:border-gray-700">
              <label className="text-sm font-semibold text-stone-700 mb-3 block">Batch Mode</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setBatchSize(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    batchSize === null 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white text-stone-600 border border-stone-300 hover:bg-stone-50 dark:bg-gray-900'
                  }`}
                >
                  Continuous
                </button>
                <button
                  onClick={() => setBatchSize(5)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    batchSize === 5 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white text-stone-600 border border-stone-300 hover:bg-stone-50 dark:bg-gray-900'
                  }`}
                >
                  5 Questions
                </button>
                <button
                  onClick={() => setBatchSize(10)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    batchSize === 10 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white text-stone-600 border border-stone-300 hover:bg-stone-50 dark:bg-gray-900'
                  }`}
                >
                  10 Questions
                </button>
                <button
                  onClick={() => setBatchSize(20)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    batchSize === 20 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white text-stone-600 border border-stone-300 hover:bg-stone-50 dark:bg-gray-900'
                  }`}
                >
                  20 Questions
                </button>
              </div>
              {batchSize && (
                <div className="mt-3 text-xs text-stone-600 dark:text-stone-400">
                  Progress: {batchProgress.length} / {batchSize}
                </div>
              )}
            </div>

            {/* Irregular Verbs Toggle */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeIrregular}
                  onChange={(e) => setIncludeIrregular(e.target.checked)}
                  className="w-5 h-5 rounded border-stone-300 text-orange-500 focus:ring-orange-500"
                />
                <div>
                  <span className="text-sm font-semibold text-stone-700">Include Irregular Verbs</span>
                  <p className="text-xs text-stone-500 dark:text-stone-400">When off, only tests irregular/strong verbs</p>
                </div>
              </label>
            </div>

            {/* Active Tenses */}
            <h3 className="font-semibold text-stone-800 mb-4">Active Tenses</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(tenseLabels).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabledTenses.includes(key)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setEnabledTenses([...enabledTenses, key]);
                      } else {
                        setEnabledTenses(enabledTenses.filter(t => t !== key));
                      }
                    }}
                    className="w-4 h-4 rounded border-stone-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-stone-700">{label}</span>
                </label>
              ))}
            </div>
            
            {srs.getProblemAreas().length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Problem Areas
                </h3>
                <div className="space-y-2">
                  {srs.getProblemAreas().slice(0, 5).map(({ verb, tense, count }, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-stone-700">
                        <span className="font-serif font-semibold">{verb}</span> - {tenseLabels[tense]}
                      </span>
                      <span className="text-rose-600 font-medium">{count} errors</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Batch Summary */}
      {showBatchSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-stone-800 mb-4">Batch Complete!</h2>
              
              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-emerald-600">
                    {batchProgress.filter(r => r.correct).length}
                  </div>
                  <div className="text-sm text-stone-600 dark:text-stone-400">Correct</div>
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-rose-600">
                    {batchProgress.filter(r => !r.correct).length}
                  </div>
                  <div className="text-sm text-stone-600 dark:text-stone-400">Incorrect</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {Math.round((batchProgress.filter(r => r.correct).length / batchProgress.length) * 100)}%
                  </div>
                  <div className="text-sm text-stone-600 dark:text-stone-400">Accuracy</div>
                </div>
              </div>

              {/* Incorrect Answers Review */}
              {batchProgress.filter(r => !r.correct).length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    Review Mistakes
                  </h3>
                  <div className="space-y-3">
                    {batchProgress.filter(r => !r.correct).map((result, idx) => (
                      <div key={idx} className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif font-semibold text-stone-800 dark:text-stone-100">{result.verb}</span>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${tenseColors[result.tense].bg} ${tenseColors[result.tense].text}`}>
                            {tenseLabels[result.tense]}
                          </span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-stone-600 dark:text-stone-400">Person:</span>
                            <span className="text-stone-800 dark:text-stone-100">{pronounLabels[result.pronounIndex]}</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-stone-600 dark:text-stone-400">Your answer:</span>
                            <span className="text-rose-700 line-through">{result.userAnswer}</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-stone-600 dark:text-stone-400">Correct:</span>
                            <span className="text-emerald-700 font-semibold">{result.correctAnswer}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Continue Button */}
              <button
                onClick={handleContinueAfterBatch}
                className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Continue Practicing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Panel */}
      {showReview && (
        <div className="border-b border-stone-200 bg-white">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-stone-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                Recent Mistakes ({reviewItems.length})
              </h3>
              <button
                onClick={() => setReviewItems([])}
                className="text-sm text-stone-600 hover:text-stone-800 dark:text-stone-100"
              >
                Clear All
              </button>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {reviewItems.slice().reverse().map((result, idx) => (
                <div key={idx} className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-semibold text-stone-800 dark:text-stone-100">{result.verb}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${tenseColors[result.tense].bg} ${tenseColors[result.tense].text}`}>
                      {tenseLabels[result.tense]}
                    </span>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-stone-600 dark:text-stone-400">Person:</span>
                      <span className="text-stone-800 dark:text-stone-100">{pronounLabels[result.pronounIndex]}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-stone-600 dark:text-stone-400">Your answer:</span>
                      <span className="text-rose-700 line-through">{result.userAnswer}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-stone-600 dark:text-stone-400">Correct:</span>
                      <span className="text-emerald-700 font-semibold">{result.correctAnswer}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Verb Library */}
      {showVerbLibrary && (
        <div className="border-b border-stone-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-1">Verb Library</h2>
                <p className="text-sm text-stone-600 dark:text-stone-400">All {DutchVerbs.getAllVerbs().length} verbs with mastery tracking</p>
              </div>
              <button
                onClick={() => setShowVerbLibrary(false)}
                className="p-2 hover:bg-stone-100 dark:hover:bg-gray-700 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5 text-stone-600 dark:text-stone-400" />
              </button>
            </div>

            {/* Mastery Legend */}
            <div className="flex flex-wrap gap-3 mb-6 p-4 bg-stone-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-xs text-stone-700 dark:text-stone-300 dark:text-stone-300">Mastered (20+ attempts, 90%+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-50 dark:bg-blue-900/200 rounded-full"></div>
                <span className="text-xs text-stone-700 dark:text-stone-300">Proficient (15+ attempts, 80%+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span className="text-xs text-stone-700 dark:text-stone-300">Familiar (10+ attempts, 70%+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-50 dark:bg-amber-900/200 rounded-full"></div>
                <span className="text-xs text-stone-700 dark:text-stone-300">Learning (5+ attempts, 60%+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-stone-700 dark:text-stone-300">Beginner (1+ attempts)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-xs text-stone-700 dark:text-stone-300">Not Practiced</span>
              </div>
            </div>

            {/* Verb Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto">
              {DutchVerbs.getAllVerbs()
                .map(verb => ({
                  verb,
                  mastery: getVerbMastery(verb)
                }))
                .sort((a, b) => {
                  // Sort by mastery: Mastered > Proficient > Familiar > Learning > Beginner > Not Practiced
                  const masteryOrder = {
                    'Mastered': 6,
                    'Proficient': 5,
                    'Familiar': 4,
                    'Learning': 3,
                    'Beginner': 2,
                    'Not Practiced': 1
                  };
                  const orderDiff = masteryOrder[b.mastery.level] - masteryOrder[a.mastery.level];
                  if (orderDiff !== 0) return orderDiff;
                  
                  // Within same mastery level, sort by attempts (more practiced first)
                  if (b.mastery.attempts !== a.mastery.attempts) {
                    return b.mastery.attempts - a.mastery.attempts;
                  }
                  
                  // Finally, alphabetically
                  return a.verb.localeCompare(b.verb);
                })
                .map(({ verb, mastery }) => {
                const verbData = DutchVerbs.irregular[verb] || DutchVerbs.conjugateRegular(verb);
                const english = getEnglishTranslation(verb);
                
                return (
                  <div key={verb} className="bg-white border border-stone-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    {/* Header with mastery indicator */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-serif font-bold text-lg text-stone-900">{verb}</h3>
                          <div className={`w-2 h-2 rounded-full bg-${mastery.color}-500`}></div>
                        </div>
                        {english && (
                          <p className="text-xs text-stone-500 italic">{english}</p>
                        )}
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${
                        verbData.level === 'A1' ? 'bg-emerald-100 text-emerald-700' :
                        verbData.level === 'A2' ? 'bg-blue-100 text-blue-700' :
                        verbData.level === 'B1' ? 'bg-purple-100 text-purple-700' :
                        verbData.level === 'B2' ? 'bg-rose-100 text-rose-700' :
                        verbData.level === 'C1' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {verbData.level}
                      </div>
                    </div>

                    {/* Mastery Stats */}
                    <div className="space-y-2 text-xs mb-3">
                      <div className="flex justify-between">
                        <span className="text-stone-600 dark:text-stone-400">Mastery:</span>
                        <span className={`font-semibold text-${mastery.color}-700`}>{mastery.level}</span>
                      </div>
                      {mastery.attempts > 0 && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-stone-600 dark:text-stone-400">Attempts:</span>
                            <span className="text-stone-800 dark:text-stone-100">{mastery.attempts}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-600 dark:text-stone-400">Accuracy:</span>
                            <span className="text-stone-800 dark:text-stone-100">{mastery.accuracy}%</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Conjugations - Full Tables */}
                    <details className="text-xs">
                      <summary className="cursor-pointer text-orange-600 font-semibold hover:text-orange-700 mb-2">
                        View all conjugations
                      </summary>
                      <div className="space-y-3 mt-2 pt-2 border-t border-stone-200 max-h-96 overflow-y-auto">
                        
                        {/* Present Tense */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2">
                          <div className="font-semibold text-blue-800 mb-2">Present (OTT)</div>
                          <div className="space-y-1">
                            {pronounLabels.map((pronoun, idx) => (
                              <div key={idx} className="grid grid-cols-2 gap-1 text-xs">
                                <span className="text-stone-600 dark:text-stone-400">{pronoun}:</span>
                                <span className="text-stone-900 font-mono">{verbData.ott[idx]}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Simple Past */}
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-2">
                          <div className="font-semibold text-purple-800 mb-2">Simple Past (OVT)</div>
                          <div className="space-y-1">
                            {pronounLabels.map((pronoun, idx) => (
                              <div key={idx} className="grid grid-cols-2 gap-1 text-xs">
                                <span className="text-stone-600 dark:text-stone-400">{pronoun}:</span>
                                <span className="text-stone-900 font-mono">{verbData.ovt[idx]}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Present Perfect */}
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded p-2">
                          <div className="font-semibold text-emerald-800 mb-2">Present Perfect (VTT)</div>
                          <div className="space-y-1">
                            {pronounLabels.map((pronoun, idx) => (
                              <div key={idx} className="grid grid-cols-2 gap-1 text-xs">
                                <span className="text-stone-600 dark:text-stone-400">{pronoun}:</span>
                                <span className="text-stone-900 font-mono">{DutchVerbs.getConjugation(verb, 'vtt', idx)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Past Perfect */}
                        <div className="bg-rose-50 dark:bg-rose-900/20 rounded p-2">
                          <div className="font-semibold text-rose-800 mb-2">Past Perfect (PQP)</div>
                          <div className="space-y-1">
                            {pronounLabels.map((pronoun, idx) => (
                              <div key={idx} className="grid grid-cols-2 gap-1 text-xs">
                                <span className="text-stone-600 dark:text-stone-400">{pronoun}:</span>
                                <span className="text-stone-900 font-mono">{DutchVerbs.getConjugation(verb, 'pqp', idx)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Future */}
                        <div className="bg-amber-50 dark:bg-amber-900/20 rounded p-2">
                          <div className="font-semibold text-amber-800 mb-2">Future</div>
                          <div className="space-y-1">
                            {pronounLabels.map((pronoun, idx) => (
                              <div key={idx} className="grid grid-cols-2 gap-1 text-xs">
                                <span className="text-stone-600 dark:text-stone-400">{pronoun}:</span>
                                <span className="text-stone-900 font-mono">{DutchVerbs.getConjugation(verb, 'future', idx)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-stone-50 dark:bg-gray-900 rounded p-2">
                          <div className="font-semibold text-stone-800 mb-2">Additional Info</div>
                          <div className="space-y-1">
                            <div className="grid grid-cols-2 gap-1 text-xs">
                              <span className="text-stone-600 dark:text-stone-400">Auxiliary:</span>
                              <span className="text-stone-900 font-mono">{verbData.auxiliary}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 text-xs">
                              <span className="text-stone-600 dark:text-stone-400">Imperative:</span>
                              <span className="text-stone-900 font-mono">{verbData.imperative}</span>
                            </div>
                            {verbData.strongClass && (
                              <div className="grid grid-cols-2 gap-1 text-xs">
                                <span className="text-stone-600 dark:text-stone-400">Strong Class:</span>
                                <span className="text-purple-700 font-semibold">{verbData.strongClass} ({verbData.ablaut})</span>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </details>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Exercise */}
      <div className="max-w-4xl mx-auto px-6 py-12 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-stone-200 dark:border-gray-700 p-8 shadow-lg">
          
          {practiceMode === 'participle' ? (
            /* PARTICIPLE MODE - Learn past participles and auxiliary verbs */
            <div>
              <div className="text-center mb-8">
                <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl mb-4">
                  <h3 className="text-lg font-bold">Past Participle Practice</h3>
                </div>
                <h2 className="text-5xl font-bold text-stone-800 mb-2 font-serif">{currentExercise.verb}</h2>
                {getEnglishTranslation(currentExercise.verb) && (
                  <p className="text-lg text-stone-500 italic mb-4">({getEnglishTranslation(currentExercise.verb)})</p>
                )}
                <p className="text-stone-600 dark:text-stone-400">What is the past participle and which auxiliary verb does it use?</p>
              </div>

              {!showResult ? (
                <div className="space-y-6 max-w-xl mx-auto">
                  {/* Participle Input */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      Past Participle (Voltooid Deelwoord)
                    </label>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.stopPropagation();
                          if (userAnswer.trim()) {
                            const verbData = DutchVerbs.irregular[currentExercise.verb] || DutchVerbs.conjugateRegular(currentExercise.verb);
                            const correctPart = verbData.vtt_part;
                            const correctAux = verbData.auxiliary;
                            const isCorrect = userAnswer.trim().toLowerCase() === correctPart.toLowerCase() && 
                                            (tableAnswers.auxiliary || '').toLowerCase() === correctAux.toLowerCase();
                            setIsCorrect(isCorrect);
                            setShowResult(true);
                          }
                        }
                      }}
                      className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg focus:outline-none focus:border-purple-500 text-lg"
                      placeholder="e.g., gelopen, gemaakt..."
                      autoFocus
                    />
                  </div>

                  {/* Auxiliary Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      Auxiliary Verb (Hulpwerkwoord)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setTableAnswers({...tableAnswers, auxiliary: 'hebben'})}
                        className={`py-4 rounded-lg font-semibold transition-all border-2 ${
                          tableAnswers.auxiliary === 'hebben'
                            ? 'bg-purple-50 dark:bg-purple-900/200 text-white border-purple-600'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-purple-400'
                        }`}
                      >
                        hebben
                      </button>
                      <button
                        onClick={() => setTableAnswers({...tableAnswers, auxiliary: 'zijn'})}
                        className={`py-4 rounded-lg font-semibold transition-all border-2 ${
                          tableAnswers.auxiliary === 'zijn'
                            ? 'bg-purple-50 dark:bg-purple-900/200 text-white border-purple-600'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-purple-400'
                        }`}
                      >
                        zijn
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const verbData = DutchVerbs.irregular[currentExercise.verb] || DutchVerbs.conjugateRegular(currentExercise.verb);
                      const correctPart = verbData.vtt_part;
                      const correctAux = verbData.auxiliary;
                      const isCorrect = userAnswer.trim().toLowerCase() === correctPart.toLowerCase() && 
                                      (tableAnswers.auxiliary || '').toLowerCase() === correctAux.toLowerCase();
                      
                      // Play sound effect
                      if (isCorrect) {
                        playSuccessSound();
                      } else {
                        playErrorSound();
                      }
                      
                      setIsCorrect(isCorrect);
                      setShowResult(true);
                    }}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-colors"
                  >
                    Check Answer
                  </button>
                </div>
              ) : (
                <div className={`p-6 rounded-xl max-w-xl mx-auto ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-300' : 'bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-300'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    {isCorrect ? (
                      <>
                        <Check className="w-7 h-7 text-emerald-600" />
                        <span className="text-xl font-bold text-emerald-800">Perfect!</span>
                      </>
                    ) : (
                      <>
                        <X className="w-7 h-7 text-rose-600" />
                        <span className="text-xl font-bold text-rose-800">Not Quite</span>
                      </>
                    )}
                  </div>

                  {/* Show Results */}
                  <div className="space-y-3 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-stone-200 dark:border-gray-700">
                      <div className="text-xs text-stone-600 mb-1">Past Participle</div>
                      {!isCorrect && userAnswer.trim() && (
                        <div className="text-rose-600 line-through mb-1">{userAnswer.trim()}</div>
                      )}
                      <div className="text-2xl font-bold text-stone-900 font-serif">
                        {(() => {
                          const verbData = DutchVerbs.irregular[currentExercise.verb] || DutchVerbs.conjugateRegular(currentExercise.verb);
                          return verbData.vtt_part;
                        })()}
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-stone-200 dark:border-gray-700">
                      <div className="text-xs text-stone-600 mb-1">Auxiliary Verb</div>
                      <div className="text-2xl font-bold text-stone-900">
                        {(() => {
                          const verbData = DutchVerbs.irregular[currentExercise.verb] || DutchVerbs.conjugateRegular(currentExercise.verb);
                          return verbData.auxiliary;
                        })()}
                      </div>
                      <div className="text-sm text-stone-600 mt-2">
                        {(() => {
                          const verbData = DutchVerbs.irregular[currentExercise.verb] || DutchVerbs.conjugateRegular(currentExercise.verb);
                          return verbData.auxiliary === 'zijn' 
                            ? '(movement/change of state)' 
                            : '(action/possession)';
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Grammar Explanation */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-lg p-4 mb-4">
                    <h5 className="text-xs font-bold text-blue-800 mb-2">Formation Rule</h5>
                    <p 
                      className="text-sm text-blue-900"
                      dangerouslySetInnerHTML={{
                        __html: (() => {
                          const verbData = DutchVerbs.irregular[currentExercise.verb] || DutchVerbs.conjugateRegular(currentExercise.verb);
                          const strongClass = verbData.strongClass;
                          
                          if (strongClass) {
                            const classInfo = StrongVerbClasses[strongClass];
                            return `<strong>Strong verb (${classInfo.name})</strong>: ${classInfo.pattern}. The participle follows this predictable Ablaut pattern.`;
                          } else if (DutchVerbs.irregular[currentExercise.verb]) {
                            return `<strong>Irregular verb</strong>: The participle <strong>${verbData.vtt_part}</strong> must be memorized.`;
                          } else {
                            const stem = DutchVerbs.getStem(currentExercise.verb);
                            const usesT = DutchVerbs.usesT(stem);
                            return `<strong>Regular verb</strong>: ge- + stem + ${usesT ? 't' : 'd'} ('t kofschip rule). → <strong>${verbData.vtt_part}</strong>`;
                          }
                        })()
                      }}
                    />
                  </div>

                  <button
                    onClick={() => {
                      setUserAnswer('');
                      setTableAnswers({});
                      setShowResult(false);
                      loadNextExercise();
                    }}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-700"
                  >
                    Next Verb
                  </button>
                </div>
              )}
            </div>
          ) : practiceMode === 'table' ? (
            /* TABLE MODE - Fill complete conjugation */
            <div>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-stone-800 mb-2 font-serif">{currentExercise.verb}</h2>
                {getEnglishTranslation(currentExercise.verb) && (
                  <p className="text-lg text-stone-500 italic mb-3">({getEnglishTranslation(currentExercise.verb)})</p>
                )}
                <div className={`inline-block px-6 py-2 rounded-xl ${tenseColors[currentExercise.tense].bg} ${tenseColors[currentExercise.tense].text}`}>
                  {tenseLabels[currentExercise.tense]}
                </div>
              </div>

              <p className="text-center text-stone-600 mb-8">Fill in the conjugations for this verb</p>

              <div className="grid grid-cols-1 gap-3 max-w-xl mx-auto">
                {/* Singular forms: ik, jij, hij/zij */}
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-gray-900 rounded-lg border border-stone-200 dark:border-gray-700">
                    <span className="text-sm font-medium text-stone-600 w-32">{pronounLabels[idx]}</span>
                    <input
                      type="text"
                      value={tableAnswers[idx] || ''}
                      onChange={(e) => setTableAnswers({...tableAnswers, [idx]: e.target.value})}
                      className="flex-1 px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-orange-400"
                      placeholder="Enter conjugation..."
                      autoFocus={idx === 0}
                    />
                  </div>
                ))}
                
                {/* Plural form - all plural pronouns use the same conjugation */}
                <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-300">
                  <span className="text-sm font-medium text-stone-600 w-32">
                    wij/jullie/zij
                    <div className="text-xs text-stone-500 mt-0.5">(plural)</div>
                  </span>
                  <input
                    type="text"
                    value={tableAnswers[3] || ''}
                    onChange={(e) => {
                      // Set all plural forms (indices 3, 4, 5) to the same value
                      setTableAnswers({
                        ...tableAnswers, 
                        3: e.target.value,
                        4: e.target.value,
                        5: e.target.value
                      });
                    }}
                    className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Same for all plural..."
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  // Check all answers (singular + plural)
                  let allCorrect = true;
                  
                  // Check singular forms (0, 1, 2)
                  [0, 1, 2].forEach((idx) => {
                    const correct = DutchVerbs.getConjugation(currentExercise.verb, currentExercise.tense, idx);
                    if ((tableAnswers[idx] || '').trim().toLowerCase() !== correct.toLowerCase()) {
                      allCorrect = false;
                    }
                  });
                  
                  // Check plural form (just check index 3, since they're all the same)
                  const correctPlural = DutchVerbs.getConjugation(currentExercise.verb, currentExercise.tense, 3);
                  if ((tableAnswers[3] || '').trim().toLowerCase() !== correctPlural.toLowerCase()) {
                    allCorrect = false;
                  }
                  
                  // Play sound effect
                  if (allCorrect) {
                    playSuccessSound();
                  } else {
                    playErrorSound();
                  }
                  
                  setIsCorrect(allCorrect);
                  setShowResult(true);
                }}
                className="w-full mt-6 py-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Check Answers
              </button>

              {showResult && (
                <div className={`mt-6 p-6 rounded-lg ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-rose-50 dark:bg-rose-900/20'}`}>
                  <h3 className="font-bold text-lg mb-4">{isCorrect ? '✓ Perfect!' : '✗ Some Mistakes'}</h3>
                  
                  {/* Show singular results */}
                  {[0, 1, 2].map((idx) => {
                    const correct = DutchVerbs.getConjugation(currentExercise.verb, currentExercise.tense, idx);
                    const userAns = (tableAnswers[idx] || '').trim();
                    const isRowCorrect = userAns.toLowerCase() === correct.toLowerCase();
                    return (
                      <div key={idx} className={`flex items-center justify-between p-3 rounded mb-2 ${isRowCorrect ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                        <span className="text-sm font-medium">{pronounLabels[idx]}</span>
                        <div className="flex items-center gap-3">
                          {!isRowCorrect && <span className="text-sm text-rose-700 line-through">{userAns}</span>}
                          <span className="text-sm font-bold">{correct}</span>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Show plural result */}
                  {(() => {
                    const correctPlural = DutchVerbs.getConjugation(currentExercise.verb, currentExercise.tense, 3);
                    const userAns = (tableAnswers[3] || '').trim();
                    const isRowCorrect = userAns.toLowerCase() === correctPlural.toLowerCase();
                    return (
                      <div className={`flex items-center justify-between p-3 rounded mb-2 ${isRowCorrect ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                        <span className="text-sm font-medium">wij/jullie/zij (plural)</span>
                        <div className="flex items-center gap-3">
                          {!isRowCorrect && <span className="text-sm text-rose-700 line-through">{userAns}</span>}
                          <span className="text-sm font-bold">{correctPlural}</span>
                        </div>
                      </div>
                    );
                  })()}
                  
                  <button
                    onClick={() => {
                      setTableAnswers({});
                      setShowResult(false);
                      loadNextExercise();
                    }}
                    className="w-full mt-4 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
                  >
                    Next Verb
                  </button>
                </div>
              )}
            </div>
          ) : (
          /* SINGLE QUESTION MODE */
          <>
          {/* Exercise Header with Color-Coded Tense */}
          <div className="text-center mb-8">
            {/* Large Tense Badge */}
            <div className={`inline-block px-8 py-4 rounded-xl border-2 mb-6 ${tenseColors[currentExercise.tense].bg} ${tenseColors[currentExercise.tense].border}`}>
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Tense
              </div>
              <div className={`text-2xl font-bold ${tenseColors[currentExercise.tense].text}`}>
                {tenseLabels[currentExercise.tense]}
              </div>
            </div>

            {/* Pronoun Badge */}
            <div className="inline-block px-6 py-3 bg-stone-100 dark:bg-gray-700 border-2 border-stone-300 rounded-xl ml-4 mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Person
              </div>
              <div className="text-xl font-bold text-stone-800 dark:text-stone-100">
                {pronounLabels[currentExercise.pronounIndex]}
              </div>
            </div>

            {/* Verb */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <h2 className="text-5xl font-bold text-stone-800 mb-3 font-serif">
                {currentExercise.verb}
              </h2>
              <button
                onClick={() => speakDutch(currentExercise.verb)}
                className="p-2 hover:bg-stone-100 dark:hover:bg-gray-700 dark:bg-gray-700 rounded-full transition-colors"
                title="Pronounce verb"
              >
                <Volume2 className="w-6 h-6 text-orange-600" />
              </button>
            </div>
            {getEnglishTranslation(currentExercise.verb) && (
              <p className="text-lg text-stone-500 italic mb-2">({getEnglishTranslation(currentExercise.verb)})</p>
            )}
            <p className="text-stone-500 text-lg">Conjugate this verb</p>
          </div>

          {/* Context Sentence */}
          {contextSentence && (
            <div className={`mb-8 p-6 rounded-lg border-2 bg-gradient-to-br ${tenseColors[currentExercise.tense].gradient} ${tenseColors[currentExercise.tense].border}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-lg text-stone-700 dark:text-stone-300 mb-2 font-semibold">
                    {contextSentence.nl.replace('___', '______')}
                  </p>
                  <p className="text-sm text-stone-600 italic">
                    {contextSentence.en}
                  </p>
                </div>
                <button
                  onClick={() => speakDutch(contextSentence.nl.replace('___', correctAnswer))}
                  className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors flex-shrink-0"
                  title="Pronounce sentence"
                >
                  <Volume2 className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                </button>
              </div>
            </div>
          )}

          {/* Answer Input */}
          {!showResult ? (
            <div className="space-y-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.stopPropagation();
                    handleSubmit();
                  }
                }}
                placeholder="Type your answer..."
                className="w-full px-6 py-4 text-xl text-center border-2 border-stone-200 rounded-lg
                  focus:outline-none focus:border-orange-400 transition-colors bg-white font-serif"
                autoFocus
              />
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="w-full py-4 bg-orange-500 text-white rounded-lg font-semibold
                  hover:bg-orange-600 disabled:bg-stone-200 disabled:text-stone-400 
                  transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Check Answer
              </button>
            </div>
          ) : (
            <div>
              {/* Result */}
              <div className={`p-6 rounded-lg mb-6 ${
                isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200' : 'bg-rose-50 dark:bg-rose-900/20 border border-rose-200'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  {isCorrect ? (
                    <>
                      <Check className="w-6 h-6 text-emerald-600" />
                      <span className="text-lg font-semibold text-emerald-800">Correct!</span>
                    </>
                  ) : (
                    <>
                      <X className="w-6 h-6 text-rose-600" />
                      <span className="text-lg font-semibold text-rose-800">Not quite</span>
                    </>
                  )}
                  <div className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${tenseColors[currentExercise.tense].bg} ${tenseColors[currentExercise.tense].text}`}>
                    {tenseLabels[currentExercise.tense]}
                  </div>
                </div>
                
                {!isCorrect && (
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-stone-600 dark:text-stone-400">Your answer:</span>
                      <span className="font-serif text-lg text-rose-700 line-through">{userAnswer}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-stone-600 dark:text-stone-400">Correct answer:</span>
                      <span className="font-serif text-lg text-emerald-700 font-semibold">{correctAnswer}</span>
                    </div>
                  </div>
                )}

                {isCorrect && contextSentence && (
                  <div className="mt-4 pt-4 border-t border-emerald-200">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-stone-700 font-serif">
                          {fillContextSentence(contextSentence.nl, correctAnswer, currentExercise.tense)}
                        </p>
                        <p className="text-sm text-stone-500 italic mt-1">
                          {contextSentence.en}
                        </p>
                      </div>
                      <button
                        onClick={() => speakDutch(fillContextSentence(contextSentence.nl, correctAnswer, currentExercise.tense))}
                        className="p-2 hover:bg-emerald-100 rounded-full transition-colors flex-shrink-0"
                        title="Pronounce sentence"
                      >
                        <Volume2 className="w-5 h-5 text-emerald-600" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Full Conjugation Table */}
              <div className="mt-6 p-5 bg-stone-50 dark:bg-gray-900 rounded-lg border border-stone-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
                  <span>Full Conjugation:</span>
                  <span className="font-serif text-stone-800 dark:text-stone-100">{currentExercise.verb}</span>
                  <span className={`px-2 py-1 rounded text-xs ${tenseColors[currentExercise.tense].bg} ${tenseColors[currentExercise.tense].text}`}>
                    {tenseLabels[currentExercise.tense]}
                  </span>
                </h4>

                {/* Grammar Explanation */}
                <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-50 dark:bg-blue-900/200 text-white rounded-full p-1 mt-0.5">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-xs font-bold text-blue-800 mb-1">Grammar Rule</h5>
                      <p 
                        className="text-sm text-blue-900 leading-relaxed"
                        dangerouslySetInnerHTML={{ 
                          __html: getGrammarExplanation(currentExercise.verb, currentExercise.tense, currentExercise.pronounIndex) 
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Strong Verb Class Card - Only show for strong verbs */}
                {(() => {
                  const verbData = DutchVerbs.irregular[currentExercise.verb];
                  if (verbData?.strongClass) {
                    const classInfo = StrongVerbClasses[verbData.strongClass];
                    return (
                      <div className="mb-4 p-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-300 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-50 dark:bg-purple-900/200 text-white rounded-lg px-3 py-2 font-bold text-lg">
                            {verbData.strongClass}
                          </div>
                          <div className="flex-1">
                            <h5 className="text-sm font-bold text-purple-900 mb-1">
                              {classInfo.name}: Strong Verb Pattern
                            </h5>
                            <div className="bg-white dark:bg-gray-800 rounded px-3 py-2 mb-2 border border-purple-200">
                              <div className="text-lg font-bold text-purple-700 font-mono">
                                {classInfo.pattern}
                              </div>
                            </div>
                            <p className="text-xs text-purple-800 mb-2">{classInfo.description}</p>
                            <details className="text-xs">
                              <summary className="cursor-pointer text-purple-700 font-semibold hover:text-purple-900">
                                More examples in this class
                              </summary>
                              <ul className="mt-2 space-y-1 pl-4">
                                {classInfo.examples.map((ex, idx) => (
                                  <li key={idx} className="text-purple-800">• {ex}</li>
                                ))}
                              </ul>
                            </details>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}

                <div className="grid grid-cols-2 gap-3">
                  {pronouns.map((pronoun, idx) => {
                    const conjugation = DutchVerbs.getConjugation(currentExercise.verb, currentExercise.tense, idx);
                    const isCurrentPronoun = idx === currentExercise.pronounIndex;
                    const fullPhrase = `${pronoun} ${conjugation}`;
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          isCurrentPronoun 
                            ? `${tenseColors[currentExercise.tense].bg} ${tenseColors[currentExercise.tense].border} border-2` 
                            : 'bg-white border-stone-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <span className={`text-sm ${isCurrentPronoun ? 'font-bold' : 'font-medium'} text-stone-600`}>
                            {pronounLabels[idx]}
                          </span>
                          <span className={`font-serif text-base ${isCurrentPronoun ? 'font-bold text-stone-900' : 'text-stone-700'}`}>
                            {conjugation}
                          </span>
                        </div>
                        <button
                          onClick={() => speakDutch(fullPhrase)}
                          className="p-1.5 hover:bg-stone-100 dark:hover:bg-gray-700 dark:bg-gray-700 rounded-full transition-colors flex-shrink-0"
                          title={`Pronounce: ${fullPhrase}`}
                        >
                          <Volume2 className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleNext}
                className={`w-full py-4 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${tenseColors[currentExercise.tense].bg} ${tenseColors[currentExercise.tense].text} border-2 ${tenseColors[currentExercise.tense].border} hover:opacity-90`}
              >
                <Play className="w-5 h-5" />
                Next Exercise
                <span className="ml-2 text-xs opacity-70">(Press Enter)</span>
              </button>
            </div>
          )}
          </>
          )}
        </div>
      </div>
      </>
      )}
    </div>
  );
}
