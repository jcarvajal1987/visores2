import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, d as renderHead, e as renderSlot, m as maybeRenderHead, f as renderComponent, u as unescapeHTML } from '../astro_4f41e93e.mjs';
/* empty css                          */
const $$Astro$3 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" href="img/icon.svg" type="image/svg+xml"><link rel="preload" as="image" href="img/izimedia2.svg" type="image/svg+xml"><link rel="preload" href="assets/w10.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVsEpbCIPrE.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="https://fonts.gstatic.com/s/opensans/v35/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjr0B4gaVI.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="https://fonts.gstatic.com/s/nunitosans/v15/pe0TMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfUVwoNnq4CLz0_upHZPYsZ51Q42ptCprt1R-s.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w5aXo.woff2" as="font" type="font/woff2" crossorigin><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head><body>${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "C:/Users/kyo/Desktop/git/izimedia_visores/visores2/src/layouts/Layout.astro", void 0);

const $$Astro$2 = createAstro();
const $$Audio2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Audio2;
  const { src } = Astro2.props;
  return renderTemplate`<template><style>
        button {
            padding: 0;
            border: 0;
            background: transparent;
            cursor: pointer;
            outline: none;
        }
        #audio-player-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: auto;
            padding: 15px 10px;
            width: 100%;
            border-radius: 4px;
            background: #191919;
            --seek-before-width: 0%;
            --volume-before-width: 100%;
            --buffered-width: 0%;
        }

        p {
            position: absolute;
            top: -18px;
            right: 5%;
            padding: 0 5px;
            margin: 0;
            font-size: 28px;
            background: #fff;
        }
        #play-icon {
            height: 34px;
            place-self: center;
            grid-column-start: 2;
            grid-column-end: 3;
        }
        /* path {
            stroke: #EB6708;
        } */
        .time {
            color: #a9a9a9;
            grid-column-start: 1;
            grid-column-end: 2;
            font-size: 16px;
        }
        .time2 {
            color: #a9a9a9;
            grid-column-start: 3;
            grid-column-end: 4;
            font-size: 16px;
            justify-self: right;
        }
        .sonido {
            color: #a9a9a9;
            grid-column-start: 3;
            grid-column-end: 4;
            display: flex;
            justify-self: right;
            align-items: center;
        }
        output {
            font-size: 10px;
        }
        #volume-output {
            color: #a9a9a9;
            padding-bottom: 2px;
            padding-right:5px
        }
        #volume-slider {
            margin: 0px 2.5%;
            width: 58%;
            
        }
        #volume-slider::-webkit-slider-runnable-track {
            background: #3e3d3c;
            height:5px;
        }
        #volume-slider::-moz-range-track {
            background: #3e3d3c;
            height:5px;
        }
        #volume-slider::-ms-fill-upper {
            background: #3e3d3c;
            height:5px;
        }
        #volume-slider::before {
            width: var(--volume-before-width);
            height: 5px;
            overflow:hidden;
        }
        #mute-icon {
            margin: 0 2.5%;
            display: flex;
            align-items: center;
            width:24px;
        }
        .grid-item {
            grid-column-start: 1;
            grid-column-end: 4;
        }
        .grid-volumen {
        }
        input[type="range"] {
            position: relative;
            -webkit-appearance: none;
            width: 100%;
            margin: 0;
            padding: 0;
            outline: none;
            padding: 10px 0;
            background: #191919;
        }
        input #volume-slider::-webkit-slider-runnable-track {

            background: red;
        }
        input[type="range"]::-webkit-slider-runnable-track {
            width: 100%;
            height: 10px;
            cursor: pointer;
            background: linear-gradient(
                to right,
                #a6a6a6 var(--buffered-width),
                #3e3d3c var(--buffered-width)
            );
        }
        input[type="range"]::before {
            position: absolute;
            content: "";
            left: 0;
            width: var(--seek-before-width);
            height: 10px;
            background-color: #eb6708;
            cursor: pointer;
        }
        
        input[type="range"]::-webkit-slider-thumb {
            position: relative;
            -webkit-appearance: none;
            box-sizing: content-box;
            box-shadow:
                0 0 0 2px white;
            height: 14px;
            width: 14px;
            border-radius: 50%;
            background-color: #fff;
            cursor: pointer;
            margin: -2.5px 0 0 0;
        }
        .sonido input[type="range"]::-webkit-slider-thumb {
            background-color: transparent;
            box-shadow: none;
        }
        .sonido input[type="range"]:active::-webkit-slider-thumb {
            background-color: transparent;
            box-shadow: none;
        }
        input[type="range"]:active::-webkit-slider-thumb {
            transform: scale(1.2);
        }
        input[type="range"]::-moz-range-track {
            width: 100%;
            height: 3px;
            cursor: pointer;
            background: linear-gradient(
                to right,
                #a6a6a6 var(--buffered-width),
                #3e3d3c var(--buffered-width)
            );
        }
        input[type="range"]::-moz-range-progress {
            background-color: #eb6708;
        }
        input[type="range"]::-moz-focus-outer {
            border: 0;
        }
        input[type="range"]::-moz-range-thumb {
            box-sizing: content-box;
            border: 1px solid #eb6708;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            background-color: #fff;
            cursor: pointer;
        }
        input[type="range"]:active::-moz-range-thumb {
            transform: scale(1.2);
        }
        input[type="range"]::-ms-track {
            width: 100%;
            height: 3px;
            cursor: pointer;
            background: transparent;
            border: solid transparent;
            color: transparent;
        }
        input[type="range"]::-ms-fill-lower {
            background-color: red;
        }
        input[type="range"]::-ms-fill-upper {
            border-radius: 10px;
            overflow: hidden;
            background: linear-gradient(
                to right,
                #a6a6a6 var(--buffered-width),
                #3e3d3c var(--buffered-width)
            );
        }
        input[type="range"]::-ms-thumb {
            box-sizing: content-box;
            border: 1px solid #eb6708;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            background-color: #fff;
            cursor: pointer;
        }
        input[type="range"]:active::-ms-thumb {
            transform: scale(1.2);
        }
        .audio-player {
            width: 100%;
            display: flex;
        }
        @media (min-width: 1px) and (max-width: 960px) {
            #volume-output {
                display: none;
            }
            #volume-slider {
                display: none;
            }
        }
    </style>${maybeRenderHead()}<div id="audio-player-container"><audio src="" preload="metadata" loop></audio><span id="current-time" class="time">0:00</span><span id="duration" class="time2">0:00</span><span class="grid-item"><input type="range" id="seek-slider" max="100" value="0"></span><button id="play-icon"></button><div class="sonido"><output id="volume-output">100</output><input type="range" id="volume-slider" max="100" value="100"><button id="mute-icon"></button></div></div></template>${renderComponent($$result, "audio-player", "audio-player", { "data-src": src, "style": "display:flex" })}`;
}, "C:/Users/kyo/Desktop/git/izimedia_visores/visores2/src/components/Audio2.astro", void 0);

const $$Astro$1 = createAstro();
const $$Noticia = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Noticia;
  const { post, fecha, fechap } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<main id="main"><div class="columna"><div class="start1"><div class="navbar"><div class="izibrand flex align-center"><img class="logo" src="img/izimedia2.svg" alt="" width="114" height="57"><div class="izipress">
IZI PRESS # ${post.extra.numwords}</div></div></div><div id="pdf"${addAttribute(`papel ${post.tipo === 3 && "strech"}`, "class")}><div class="printdetails"><div class="medio"><img class="company" src="img/latercera.png" alt=""><span>24horas.cl</span><span class="type">-</span><span class="type">Internet</span></div><div class="fecha"><img class="date" src="img/calendar.svg" alt=""><span>${fecha}</span></div><div class="fecha2"><img class="upload" src="img/up.svg" alt=""><span>${fechap} Hrs</span></div><div class="seccion"><img class="section" src="img/section3.svg" alt=""><span>Sección Nacional</span></div>${post.tono === 0 && renderTemplate`<div class="denotacion denotation0 positiva">
Connotación Positiva
</div>`}${post.tono === 1 && renderTemplate`<div class="denotacion denotation1 negativa ">
Connotación Negativa
</div>`}${post.tono === 2 && renderTemplate`<div class="denotacion denotation2 neutra">
Connotación Neutral
</div>`}</div>${post.tipo === 3 && renderTemplate`<div class="container grid"><video id="2" class="video start1 invisibility print-visibility "${addAttribute(post.url_img, "src")}></video><video controls autoplay id="2" class="video start1 print-block print-invisibility"${addAttribute(post.url_img, "src")} webkit-playsinline playsinline></video></div>`}${post.tipo === 1 && renderTemplate`<div class="title-papel">${post.titulo}</div>`}${post.tipo === 2 && renderTemplate`<div class="title">${post.titulo}</div>`}${[3, 4].indexOf(post.tipo) > -1 && renderTemplate`<div class="title-video">${unescapeHTML(post.titulo)}</div>`}${post.tipo === 1 && renderTemplate`<div class="cachetxt-papel">${unescapeHTML(post.cachetxt)}</div>`}${post.tipo == 4 && renderTemplate`<div class=" grid" style="gap:20px;display:grid;margin-bottom:30px;">${renderComponent($$result, "Audio2", $$Audio2, { "src": post.url_img })}</div>`}${(post.tipo === 2 || 4) && renderTemplate`<div class="cachetxt">${unescapeHTML(post.cachetxt)}</div>`}</div></div><div class="hidden-pdf xs pointer detail-layout"><div id="SidebarToggle" class="abrir flex">
Detalles<img style="padding-top: 5px;" width="22" height="21.33" alt="options" src="img/right.svg"></div></div></div><div id="Sidebar" class="columnb"><div class="detalles"><div class="items"><span class="hidden-details block"><div class="medio"><img class="company" src="img/latercera.png" alt=""><span>24horas.cl</span><span class="type">-</span><span class="type">Internet</span></div><div class="fecha"><!-- <Image src={myImage} alt="A description of my image." /> --><img class="date" src="img/calendar.svg" alt=""><span>${fecha}</span></div>${post.tono === 0 && renderTemplate`<div class="denotacion denotation0 positiva">
Connotación Positiva
</div>`}${post.tono === 1 && renderTemplate`<div class="denotacion denotation1 negativa ">
Connotación Negativa
</div>`}${post.tono === 2 && renderTemplate`<div class="denotacion denotation2 neutra">
Connotación Neutral
</div>`}<div class="seccion"><img class="section" src="img/section3.svg" alt="section" width="17" height="10.56"><span>Sección Nacional</span></div><div class="fecha2"><img class="upload" src="img/up.svg" alt=""><span>${fechap} Hrs</span></div></span>${post.tipo === 2 && // <img class="miniature" src={post.url_img} alt="" width="1600" height="900" />
  // <Image class="miniature" src={post.url_img} alt="Imagen Realacionada" width="320" height="180"/>
  renderTemplate`<img class="miniature" width="320" height="180" src="img/Aton_324985_rX8dU.webp" alt="">`}<div class="flex pt2 gap hidden-pdf"><div id="url" class="copiar"><img class="chain" src="img/copiar.svg" alt=""><span class="precopy">Copiar Url</span><span class="postcopy hidden">Url Copiado!</span></div><div id="download" class="descargar"><img class="download" src="img/pdf.svg" alt="descargar pdf"><span>Generar Pdf</span><span class="hidden">Generado!</span></div><div id="download" class="descargar"><img class="download" src="img/pdf.svg" alt="descargar pdf"><span>Generar Pdf</span><span class="hidden">Generado!</span></div></div></div><div class="hidden-pdf xs pointer detail-layout2"><div id="SidebarToggleIn" class="cerrar flex">
Cerrar<img width="22" height="21.33" alt="cerrar" src="img/right.svg"></div></div></div></div><!-- <Card
            href="https://docs.astro.build/"
            title="Documentation"
            body="Learn how Astro works and explore the official API docs."
        /> --></main>`;
}, "C:/Users/kyo/Desktop/git/izimedia_visores/visores2/src/components/Noticia.astro", void 0);

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const posts = [
    {
      id: "3366827",
      titulo: `Campa\xF1a nacional: DT anuncia inspecci\xF3n por uso de cargos 'multifunci\xF3n"`,
      cachetxt: "La Direcci\xF3n del Trabajo fiscalizar\xE1 461 tiendas del retail que originaron denuncias. Atendiendo denuncias recibidas por federaciones y organizaciones sindicales, la Direcci\xF3n del Trabajo (DT) inici\xF3 una campa\xF1a nacional de fiscalizaci\xF3n para sancionar el uso de la figura del \u201Coperador de tienda\u201D, categor\xEDa que asigna a los trabajadores el desempe\xF1o de funciones m\xFAltiples de forma alternada, y seg\xFAn el organismo no se ajusta a la normativa laboral. El programa inspectivo estar\xE1 enfocado en grandes tiendas y supermercados, se extender\xE1 durante septiembre y octubre, y abarcar\xE1 un total de 461 establecimientos a nivel nacional, incluyendo locales de las cadenas Jumbo, L\xEDder (Walmart Chile), Santa Isabel, S\xFAper Diez, Unimarc, Falabella, Ripley, Paris y La Polar.<br /><br /><br />   Infracciones  En particular, las conductas que va a fiscalizar la DT para sancionar dicen relaci\xF3n con \u201Cno especificar en el contrato de trabajo la determinaci\xF3n precisa de la naturaleza de los servicios\u201D, \u201Cno llevar registro de asistencia y determinaci\xF3n de las horas de trabajo\u201D, \u201Cno consignar por escrito las modificaciones del contrato de trabajo\u201D y \u201Ccelebrar contratos de trabajo de servicios transitorios con supuestos distintos a los legales\u201D.<br /><br /><br />Quienes incumplan la norma arriesgan sanciones de hasta 60 UTM, equivalentes a cerca de $3.800.000 por cada infracci\xF3n La campa\xF1a se suma a la inspecci\xF3n que levant\xF3 la DT entre abril y mayo, donde fiscaliz\xF3 a 105 locales y aplic\xF3 102 multas por un total de 6.108 UTM, correspondientes a poco m\xE1s de $386.410.000.<br /><br /><br />De acuerdo al director nacional del Trabajo, Pablo Zenteno, \u201CJa DT est\xE1 siendo receptiva alas denuncias hechas por las organizaciones sindicales de los supermercados y el retail y tambi\xE9n est\xE1 siendo Coherente con sus propios pronunciamientos jur\xEDdicos, que desde hace varios a\xF1os han establecido que la figura del operador de tienda no se ajusta a derecho\u201D.<br /><br /><br />En tanto, el presidente de la CPC, Ricardo Mewes, pidi\xF3 que la fiscalizaci\xF3n tambi\xE9n aborde al comercio informal    JOAQU\xCDN AGUILERA ",
      fpublicacion: "2023-09-05T03:00:00.000Z",
      fcarga: "2023-09-05T03:00:00.000Z",
      hcarga: "02:30:22",
      proveedor: 1,
      medio_id: 451,
      seccion: " ",
      urlfuente: "https://muba.izimedia.io/viewNews/4F4E7D734BAD11EE909A0EB07535E017",
      hex_bin: "4F4E7D734BAD11EE909A0EB07535E017",
      url_img: " ",
      tipo: 1,
      path_file: null,
      tono: 0,
      valor: -1,
      extra: {
        area: "267x1444",
        pages: "3",
        duracion: "N/A",
        aparicion: "N/A",
        audience: 143e3,
        numwords: 321,
        __typename: "Additional"
      },
      __typename: "PressNote"
    },
    {
      id: "3366513",
      titulo: "Madre junto a sus dos hijas fueron asaltadas en Providencia: delincuentes las intimidaron con armas de fuego",
      cachetxt: "Una mujer, quien se encontraba junto a sus dos hijas, fue asaltada en la comuna de Providencia, regi\xF3n Metropolitana, por delincuentes que le robaron su veh\xEDculo.\xA0<br/><br/>La situaci\xF3n ocurri\xF3 particularmente en la calle Valenzuela Castillo de la comuna mencionada, a eso de las 14:15 horas, cuando dos individuos se acercaron al lugar donde la madre estaba estacionando su autom\xF3vil, y la intimidaron con armas de fuego.<br /><br /><br />Tras esto, la mujer decidi\xF3 entregar se veh\xEDculo y escapar del lugar junto a sus hijas de 14 y 15 a\xF1os de edad.\xA0<br /><br /><br />De acuerdo a un video difundido sobre el hecho, se puede observar que fueron los propios vecinos del sector quienes asistieron a las v\xEDctimas tras este asalto.\xA0<br /><br />Adem\xE1s, en el registro se aprecia que los delincuentes escaparon del lugar en direcci\xF3n al oriente, por la calle Antonio Varas.\xA0<br /><br />Carabineros est\xE1 indagando el suceso para dar con el paradero de los responsables.<br>La madre se encontraba junto a sus hijas de 14 y 15 a\xF1os de edad.",
      fpublicacion: "2023-09-05T03:00:00.000Z",
      fcarga: "2023-09-05T03:00:00.000Z",
      hcarga: "01:33:10",
      proveedor: 2,
      medio_id: 5,
      seccion: "",
      urlfuente: "https://www.24horas.cl/actualidad/nacional/madre-junto-a-sus-dos-hijas-fueron-asaltadas-en-providencia-",
      hex_bin: "51C338C04BA511EE909A0EB07535E017",
      url_img: "https://www.24horas.cl/24horas/site/artic/20230904/imag/foto_0000000220230904234230/Aton_324985.jpg",
      tipo: 2,
      path_file: null,
      tono: 1,
      valor: -1,
      extra: {
        area: "N/A",
        pages: "N/A",
        duracion: "N/A",
        aparicion: "N/A",
        audience: 7214013,
        numwords: 184,
        __typename: "Additional"
      },
      __typename: "PressNote"
    },
    {
      id: "3359569",
      titulo: "Colisi\xF3n entre veh\xEDculo y patrulla deja tres fallecidos",
      cachetxt: "Dos carabineros y un civil cu\xE1ndo son las 6 con 18 minutos recuerda enviarnos un mensaje a trav\xE9s de ella y te vamos a estar esperando un saludo su buena onda sus deseos para esta semana para septiembre As\xED que escribi\xF3 la ciudad de los Andes de la regi\xF3n de Valpara\xEDso sobre Buenos d\xEDas C\xF3mo est\xE1s Naty bien muy buen d\xEDa lunes declaraci\xF3n no Se confirm\xF3 fueron dos personas fallecidas de personas fallecidas locucionario Derecho civil habr\xEDa realizado est\xE1 este accidente tr\xE1nsito tras resistirse a una fiscalizaci\xF3n para creer nadie Miguel que este hombre 59 a\xF1os qui\xE9n reci\xE9n chist\xEDn andaba el sector de San Sebasti\xE1n sector hay de San Felipe circulando zigzagueando de manera r\xE1pida err\xE1tica Entonces en este caso informado estos funcionarios funciones de carabineros intenta fiscalizar a este hombre Kenia tiene hab\xEDa tenido 66 oraciones por esto mismo por conducir bajo los efectos del alcohol estado de verdad Dile este caso acelera todos los d\xEDas incluso casi atropella a un funcionario policial intenta fiscalizando que se detuviera la marcha y en eso que se inici\xF3 la persecuci\xF3n a la regi\xF3n del fariseo Qu\xE9 significa de San Felipe despu\xE9s el sector de San Esteban rinconada y termin\xF3 el sector de calle larga cuando est\xE9 veh\xEDculo cuya a toda velocidad el conductor tambi\xE9n con dos tripulantes m\xE1s chocaron contra otra patrulla que nada ten\xEDa que ir a dej\xE1rselo a tomarnos una colisi\xF3n frontal investigaci\xF3n y lo cierto Lamentablemente fallecieron dos funciones de carabineros Mientras que el conductor fue r\xE1pidamente en el auto centro asistencial En d\xF3nde permanece con riesgo vital Just accidente abolici\xF3n tambi\xE9n ah\xED est\xE1 colgada esta energ\xEDa tambi\xE9n falleci\xF3 el conductor En d\xF3nde fuera de peligro hasta el momento que m\xE1s se sabe con respecto a esta situaci\xF3n es que en este caso la persona el carabinero que est\xE1 conduciendo est\xE1 con recogida espec\xEDficamente el hospital San Juan de Dios y con \xE9l nos cont\xF3 al conductor fallecido tiene 59 a\xF1os del itil qui\xE9n registra 66 detenciones por conducci\xF3n prestadores resultado resultado lesiones leves solo con eso Miguel lamentar esta situaci\xF3n es que fallecieron estos dos funcionarios policiales policiales el primero Dios que falleci\xF3 Lamentablemente su oficial Alejandro Andr\xE9s Guerrero Guerrero con 24 a\xF1os servicio instituci\xF3n casado y con dos hijos tambi\xE9n luego falleci\xF3 en el lugar est\xE1 argento primero Ra\xFAl Eduardo Villegas Ortiz con 23 a\xF1os de servicio en la instituci\xF3n casado y con dos hijos Mientras que el conductor de la patrulla lo \xFAnico que sobrevivi\xF3 al interior de este icono policial es est\xE1 jalando Sargento segundo Manuel Eric C\xE1ceres Saavedra que permanece con riesgo vital y tener un centro asistencial cercanos o 6 tenemos la declaraciones por parte del general de la zona de Valpara\xEDso para pasar a revisar las pase m\xE1s risa m\xE1s cultural 1 este conductor en arremeti\xF3 contra uno de nuestros carabinero golpe\xE1ndolo por supuesto en su cuerpo ilusionando hay de estos g\xE9nero un seguimiento por entre panqu\xE9 g\xFCey y los Y lamentablemente la ruta en camino internacional este veh\xEDculo colision\xF3 contra uno de nuestros veh\xEDculos policiales se cortaba una patrulla y Tv extra dinero Cu\xE1les fallecieron en Est\xE1 terrible circunstancia gravemente lesionado respecto al otro veh\xEDculo puedo indicar que el conductor tambi\xE9n ha fallecido y ya ten\xEDa varias condena por conducci\xF3n en estado de ebriedad este caso cient\xEDfico y los tres funcionarios que circulan est\xE1 patrulla policial Lamentablemente fallecieron pertenecen a la subcomisar\xEDa los Libertadores mientras siguen los peritajes correspondientes ya est\xE1 completamente habilitada la ruta Libertadores por la noche y est\xE1 Expedito el tr\xE1nsito en direcci\xF3n hacia el norte o hacia el sur en ese punto espec\xEDficamente conocido como calle larga de la regi\xF3n de Valpara\xEDso ",
      fpublicacion: "2023-09-04T03:00:00.000Z",
      fcarga: "2023-09-04T03:00:00.000Z",
      hcarga: "13:30:44",
      proveedor: 1,
      medio_id: 79,
      seccion: "3x3",
      urlfuente: "https://muba.izimedia.io/viewNews/6590EB044B4011EE909A0EB07535E017",
      hex_bin: "6590EB044B4011EE909A0EB07535E017",
      url_img: "https://izimedia.s3.sa-east-1.amazonaws.com/media/2023/09/04/1693844867.361883.mp4",
      tipo: 3,
      path_file: null,
      tono: 0,
      valor: -1,
      extra: {
        area: "N/A",
        pages: "N/A",
        duracion: "00:05:06",
        aparicion: "06:18:15",
        audience: -1,
        numwords: 614,
        __typename: "Additional"
      },
      __typename: "PressNote",
      video_id: null
    },
    {
      id: "3361410",
      titulo: "Accidente En los libertadores, carabineros fallecidos",
      cachetxt: "accidente, impacto a veh\xEDculo policial ayuda cliente tr\xE1nsito donde fallecieron algunos carabineros Ah\xED est\xE1 Gonzalo P\xE9rez C\xF3mo est\xE1s el color de los carabineros aconcagua permanece realizando el peritaje en el sector del bypass de la ruta los Libertadores en calle larga luego del fatal accidente que dej\xF3 a un suboficial y un Sargento primero de la instituci\xF3n uniformada fallecidos en medio de un procedimiento de persecuci\xF3n a una camioneta el tercer funcionario un Sargento segundo fue trasladado en estado grave Hasta el hospital local el general jefe de la quinta zona policial Edgar jofr\xE9 entreg\xF3 mayores detalles de este choque lutan nuevamente a carabinero de chile y Lamentablemente la ruta en camino internacional este veh\xEDculo colision\xF3 contra uno de nuestros veh\xEDculos policiales donde se encontraba una patrulla y Tv extra dinero donde los cuales fallecieron en estas terribles circunstancias y el tercero est\xE1 grave mente lesionado sin trigo vital al momento pero bajo cuidado en el hospital ac\xE1 En Los Andes esta camioneta procedimiento y el conductor de este veh\xEDculo impacta al veh\xEDculo policial en estaba realizando un corte de ruta hay que mencionar que el conductor de la camioneta que \xE9l tambi\xE9n falleci\xF3 ten\xEDa 59 a\xF1os de edad manten\xEDa al menos 6 detenciones 5 por el delito de conducci\xF3n en estado de ebriedad con resultado de lesiones leves y una por el delito de hurto Simple manten\xEDa adem\xE1s domicilio en la comuna de tiltil las dos mujeres que acompa\xF1aban a esta persona en el veh\xEDculo civil se encuentran en estado grave siendo atendidas en el hospital de los Andes en la regi\xF3n de Valpara\xEDso Gonzalo P\xE9rez ADN 11 minutos 7 11 minutos ",
      fpublicacion: "2023-09-04T03:00:00.000Z",
      fcarga: "2023-09-04T03:00:00.000Z",
      hcarga: "15:36:05",
      proveedor: 1,
      medio_id: 559,
      seccion: "ADN Hoy",
      urlfuente: "https://muba.izimedia.io/viewNews/E854CD2F4B5111EE909A0EB07535E017",
      hex_bin: "E854CD2F4B5111EE909A0EB07535E017",
      url_img: "https://izimedia.s3.sa-east-1.amazonaws.com/media/2023/09/04/1693852389.877579.mp3",
      tipo: 4,
      path_file: null,
      tono: 2,
      valor: -1,
      extra: {
        area: "N/A",
        pages: "N/A",
        duracion: "00:01:41",
        aparicion: "07:10:09",
        audience: 0,
        numwords: 279,
        __typename: "Additional"
      },
      __typename: "PressNote",
      video_id: null
    },
    {
      id: "3361410",
      titulo: "post5",
      cachetxt: "accidente, impacto a veh\xEDculo policial ayuda cliente tr\xE1nsito donde fallecieron algunos carabineros Ah\xED est\xE1 Gonzalo P\xE9rez C\xF3mo est\xE1s el color de los carabineros aconcagua permanece realizando el peritaje en el sector del bypass de la ruta los Libertadores en calle larga luego del fatal accidente que dej\xF3 a un suboficial y un Sargento primero de la instituci\xF3n uniformada fallecidos en medio de un procedimiento de persecuci\xF3n a una camioneta el tercer funcionario un Sargento segundo fue trasladado en estado grave Hasta el hospital local el general jefe de la quinta zona policial Edgar jofr\xE9 entreg\xF3 mayores detalles de este choque lutan nuevamente a carabinero de chile y Lamentablemente la ruta en camino internacional este veh\xEDculo colision\xF3 contra uno de nuestros veh\xEDculos policiales donde se encontraba una patrulla y Tv extra dinero donde los cuales fallecieron en estas terribles circunstancias y el tercero est\xE1 grave mente lesionado sin trigo vital al momento pero bajo cuidado en el hospital ac\xE1 En Los Andes esta camioneta procedimiento y el conductor de este veh\xEDculo impacta al veh\xEDculo policial en estaba realizando un corte de ruta hay que mencionar que el conductor de la camioneta que \xE9l tambi\xE9n falleci\xF3 ten\xEDa 59 a\xF1os de edad manten\xEDa al menos 6 detenciones 5 por el delito de conducci\xF3n en estado de ebriedad con resultado de lesiones leves y una por el delito de hurto Simple manten\xEDa adem\xE1s domicilio en la comuna de tiltil las dos mujeres que acompa\xF1aban a esta persona en el veh\xEDculo civil se encuentran en estado grave siendo atendidas en el hospital de los Andes en la regi\xF3n de Valpara\xEDso Gonzalo P\xE9rez ADN 11 minutos 7 11 minutos ",
      fpublicacion: "2023-09-04T03:00:00.000Z",
      fcarga: "2023-09-04T03:00:00.000Z",
      hcarga: "15:36:05",
      proveedor: 1,
      medio_id: 559,
      seccion: "ADN Hoy",
      urlfuente: "https://muba.izimedia.io/viewNews/E854CD2F4B5111EE909A0EB07535E017",
      hex_bin: "E854CD2F4B5111EE909A0EB07535E017",
      url_img: "https://izimedia.s3.sa-east-1.amazonaws.com/media/2023/09/04/1693852389.877579.mp3",
      tipo: 4,
      path_file: null,
      tono: 2,
      valor: -1,
      extra: {
        area: "N/A",
        pages: "N/A",
        duracion: "00:01:41",
        aparicion: "07:10:09",
        audience: 0,
        numwords: 279,
        __typename: "Additional"
      },
      __typename: "PressNote",
      video_id: null
    }
  ];
  const post = await posts[id - 1];
  const fecha = new Date(post.fpublicacion).toLocaleDateString("es-cl", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const fechap = post.hcarga;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro." }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Noticia", $$Noticia, { "post": post, "fecha": fecha, "fechap": fechap })}` })}`;
}, "C:/Users/kyo/Desktop/git/izimedia_visores/visores2/src/pages/[id].astro", void 0);

const $$file = "C:/Users/kyo/Desktop/git/izimedia_visores/visores2/src/pages/[id].astro";
const $$url = "/[id].html";

export { $$id as default, $$file as file, $$url as url };
