import { A as AstroError, E as ExpectedImage, L as LocalImageUsedWrongly, M as MissingImageDimension, U as UnsupportedImageFormat, I as InvalidImageService, a as ExpectedImageOptions, c as createAstro, b as createComponent, d as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, f as renderComponent, g as renderHead, h as renderSlot, u as unescapeHTML } from '../astro_2a5abb0d.mjs';
/* empty css                          */
function removeTrailingForwardSlash(path) {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
}
function removeLeadingForwardSlash(path) {
  return path.startsWith("/") ? path.substring(1) : path;
}
function trimSlashes(path) {
  return path.replace(/^\/|\/$/g, "");
}
function isString(path) {
  return typeof path === "string" || path instanceof String;
}
function joinPaths(...paths) {
  return paths.filter(isString).map((path, i) => {
    if (i === 0) {
      return removeTrailingForwardSlash(path);
    } else if (i === paths.length - 1) {
      return removeLeadingForwardSlash(path);
    } else {
      return trimSlashes(path);
    }
  }).join("/");
}
function isRemotePath(src) {
  return /^(http|ftp|https|ws):?\/\//.test(src) || src.startsWith("data:");
}

const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg"
];

function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}
function parseQuality(quality) {
  let result = parseInt(quality);
  if (Number.isNaN(result)) {
    return quality;
  }
  return result;
}
const baseService = {
  validateOptions(options) {
    if (!options.src || typeof options.src !== "string" && typeof options.src !== "object") {
      throw new AstroError({
        ...ExpectedImage,
        message: ExpectedImage.message(JSON.stringify(options.src))
      });
    }
    if (!isESMImportedImage(options.src)) {
      if (options.src.startsWith("/@fs/")) {
        throw new AstroError({
          ...LocalImageUsedWrongly,
          message: LocalImageUsedWrongly.message(options.src)
        });
      }
      let missingDimension;
      if (!options.width && !options.height) {
        missingDimension = "both";
      } else if (!options.width && options.height) {
        missingDimension = "width";
      } else if (options.width && !options.height) {
        missingDimension = "height";
      }
      if (missingDimension) {
        throw new AstroError({
          ...MissingImageDimension,
          message: MissingImageDimension.message(missingDimension, options.src)
        });
      }
    } else {
      if (!VALID_SUPPORTED_FORMATS.includes(options.src.format)) {
        throw new AstroError({
          ...UnsupportedImageFormat,
          message: UnsupportedImageFormat.message(
            options.src.format,
            options.src.src,
            VALID_SUPPORTED_FORMATS
          )
        });
      }
      if (options.src.format === "svg") {
        options.format = "svg";
      }
    }
    if (!options.format) {
      options.format = "webp";
    }
    return options;
  },
  getHTMLAttributes(options) {
    let targetWidth = options.width;
    let targetHeight = options.height;
    if (isESMImportedImage(options.src)) {
      const aspectRatio = options.src.width / options.src.height;
      if (targetHeight && !targetWidth) {
        targetWidth = Math.round(targetHeight * aspectRatio);
      } else if (targetWidth && !targetHeight) {
        targetHeight = Math.round(targetWidth / aspectRatio);
      } else if (!targetWidth && !targetHeight) {
        targetWidth = options.src.width;
        targetHeight = options.src.height;
      }
    }
    const { src, width, height, format, quality, ...attributes } = options;
    return {
      ...attributes,
      width: targetWidth,
      height: targetHeight,
      loading: attributes.loading ?? "lazy",
      decoding: attributes.decoding ?? "async"
    };
  },
  getURL(options, imageConfig) {
    const searchParams = new URLSearchParams();
    if (isESMImportedImage(options.src)) {
      searchParams.append("href", options.src.src);
    } else if (isRemoteAllowed(options.src, imageConfig)) {
      searchParams.append("href", options.src);
    } else {
      return options.src;
    }
    const params = {
      w: "width",
      h: "height",
      q: "quality",
      f: "format"
    };
    Object.entries(params).forEach(([param, key]) => {
      options[key] && searchParams.append(param, options[key].toString());
    });
    const imageEndpoint = joinPaths("/", "/_image");
    return `${imageEndpoint}?${searchParams}`;
  },
  parseURL(url) {
    const params = url.searchParams;
    if (!params.has("href")) {
      return void 0;
    }
    const transform = {
      src: params.get("href"),
      width: params.has("w") ? parseInt(params.get("w")) : void 0,
      height: params.has("h") ? parseInt(params.get("h")) : void 0,
      format: params.get("f"),
      quality: params.get("q")
    };
    return transform;
  }
};

function matchPattern(url, remotePattern) {
  return matchProtocol(url, remotePattern.protocol) && matchHostname(url, remotePattern.hostname, true) && matchPort(url, remotePattern.port) && matchPathname(url, remotePattern.pathname, true);
}
function matchPort(url, port) {
  return !port || port === url.port;
}
function matchProtocol(url, protocol) {
  return !protocol || protocol === url.protocol.slice(0, -1);
}
function matchHostname(url, hostname, allowWildcard) {
  if (!hostname) {
    return true;
  } else if (!allowWildcard || !hostname.startsWith("*")) {
    return hostname === url.hostname;
  } else if (hostname.startsWith("**.")) {
    const slicedHostname = hostname.slice(2);
    return slicedHostname !== url.hostname && url.hostname.endsWith(slicedHostname);
  } else if (hostname.startsWith("*.")) {
    const slicedHostname = hostname.slice(1);
    const additionalSubdomains = url.hostname.replace(slicedHostname, "").split(".").filter(Boolean);
    return additionalSubdomains.length === 1;
  }
  return false;
}
function matchPathname(url, pathname, allowWildcard) {
  if (!pathname) {
    return true;
  } else if (!allowWildcard || !pathname.endsWith("*")) {
    return pathname === url.pathname;
  } else if (pathname.endsWith("/**")) {
    const slicedPathname = pathname.slice(0, -2);
    return slicedPathname !== url.pathname && url.pathname.startsWith(slicedPathname);
  } else if (pathname.endsWith("/*")) {
    const slicedPathname = pathname.slice(0, -1);
    const additionalPathChunks = url.pathname.replace(slicedPathname, "").split("/").filter(Boolean);
    return additionalPathChunks.length === 1;
  }
  return false;
}

function isESMImportedImage(src) {
  return typeof src === "object";
}
function isRemoteImage(src) {
  return typeof src === "string";
}
function isRemoteAllowed(src, {
  domains = [],
  remotePatterns = []
}) {
  if (!isRemotePath(src))
    return false;
  const url = new URL(src);
  return domains.some((domain) => matchHostname(url, domain)) || remotePatterns.some((remotePattern) => matchPattern(url, remotePattern));
}
async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../sharp_de76836d.mjs'
    ).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default : options.src
  };
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && // If `getURL` returned the same URL as the user provided, it means the service doesn't need to do anything
  !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions);
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    attributes: service.getHTMLAttributes !== void 0 ? service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$3 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(image.attributes)}>`;
}, "C:/Users/kyo/Desktop/git/izimedia_visores/visores2/node_modules/.pnpm/astro@3.0.8/node_modules/astro/components/Image.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[{"protocol":"https"}]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Astro$2 = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "C:/Users/kyo/Desktop/git/izimedia_visores/visores2/node_modules/.pnpm/astro@3.0.8/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><!-- <link rel="icon" type="image/svg+xml" href="/favicon.svg" /> --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head><body>${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "C:/Users/kyo/Desktop/git/izimedia_visores/visores2/src/layouts/Layout.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
async function getStaticPaths() {
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
    }
  ];
  return posts.map((post, index) => {
    return {
      params: { id: index + 1 },
      props: { post }
    };
  });
}
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  Astro2.params;
  const { post } = Astro2.props;
  const fecha = new Date(post.fpublicacion).toLocaleDateString("es-cl", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const fechap = post.hcarga;
  return renderTemplate(_a || (_a = __template(["", `<script>
	var sidetoggle = document.querySelector("#SidebarToggle");
	var sidetogglein = document.querySelector("#SidebarToggleIn");
	var sidebar = document.querySelector("#Sidebar");
	var urlButton = document.querySelector("#url");
	var download = document.querySelector("#download");

	sidetoggle.onclick = openDetails;
	sidetogglein.onclick = openDetails;

	let url2 = document.location.href;
	urlButton.onclick = urlCopy;
	download.onclick = downloadPdf;
	function openDetails(evento) {
		// sidetoggle.classList.toggle("hidden");
		// sidetogglein.classList.toggle("hidden");
		sidebar.classList.toggle("active-sidebar");
	}

	function urlCopy(evento) {
		navigator.clipboard.writeText(url2).then(
			function () {
				console.log("Copied!");
			},
			function () {
				console.log("Copy error");
			},
		);
		var chain = document.querySelector(".chain");
		var main = document.querySelector("#main");
		urlButton.classList.remove("active-url");
		setTimeout(() => {
			urlButton.classList.add("active-url");
			urlButton.children[1].classList.add("hidden");
			urlButton.children[2].classList.remove("hidden");
		}, 10);
		
	}
	function downloadPdf(evento) {
		// navigator.clipboard.writeText(url2).then(function () {
		// 	console.log('Copied!');
		// }, function () {
		// 	console.log('Copy error')
		// });
		var bajar = document.querySelector(".download");
		download.classList.remove("active-url");

		
		setTimeout(() => {
			download.classList.add("active-download");
			download.children[1].classList.add("hidden");
			download.children[2].classList.remove("hidden");
		}, 10);
		main.scrollTo(0, 0);
		window.print();
	}
<\/script>`])), renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro.", "data-astro-cid-p5zaeqd4": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main id="main" data-astro-cid-p5zaeqd4><div class="columna" data-astro-cid-p5zaeqd4><div class="start1" data-astro-cid-p5zaeqd4><div class="navbar" data-astro-cid-p5zaeqd4><div class="izibrand flex align-center" data-astro-cid-p5zaeqd4><img class="logo" src="img/izimedia2.svg" data-astro-cid-p5zaeqd4><div class="izipress" data-astro-cid-p5zaeqd4>
IZI PRESS # ${post.extra.numwords}</div><!-- <img src="./img/izimedia2.svg" alt="" class="logo" /> --></div><div class="printdetails" data-astro-cid-p5zaeqd4><div class="medio" data-astro-cid-p5zaeqd4><img class="company" src="img/latercera.png" alt="" data-astro-cid-p5zaeqd4><span data-astro-cid-p5zaeqd4>24horas.cl</span><span class="type" data-astro-cid-p5zaeqd4>-</span><span class="type" data-astro-cid-p5zaeqd4>Internet</span></div><div class="fecha" data-astro-cid-p5zaeqd4><img class="date" src="img/calendar.svg" alt="" data-astro-cid-p5zaeqd4><span data-astro-cid-p5zaeqd4>${fecha}</span></div><div class="fecha2" data-astro-cid-p5zaeqd4><img class="upload" src="img/up.svg" alt="" data-astro-cid-p5zaeqd4><span data-astro-cid-p5zaeqd4>${fechap} Hrs</span></div><div class="seccion" data-astro-cid-p5zaeqd4><img class="section" src="img/section3.svg" alt="" data-astro-cid-p5zaeqd4><span data-astro-cid-p5zaeqd4>Sección Nacional</span></div>${post.tono === 0 && renderTemplate`<div class="denotacion denotation0" data-astro-cid-p5zaeqd4>
Connotación Positiva
</div>`}${post.tono === 1 && renderTemplate`<div class="denotacion denotation1 negativa " data-astro-cid-p5zaeqd4>
Connotación Negativa
</div>`}${post.tono === 2 && renderTemplate`<div class="denotacion denotation2" data-astro-cid-p5zaeqd4>
Connotación Neutral
</div>`}</div></div><div id="pdf" class="papel" data-astro-cid-p5zaeqd4>${post.tipo === 3 && renderTemplate`<div class="container grid" data-astro-cid-p5zaeqd4><video id="2" class="video start1 invisibility print-visibility "${addAttribute(post.url_img, "src")} data-astro-cid-p5zaeqd4></video><video controls autoplay id="2" class="video start1 print-block print-invisibility"${addAttribute(post.url_img, "src")} data-astro-cid-p5zaeqd4></video></div>`}${post.tipo === 1 && renderTemplate`<div class="title-papel" data-astro-cid-p5zaeqd4>${post.titulo}</div>`}${post.tipo === 2 && renderTemplate`<div class="title" data-astro-cid-p5zaeqd4>${post.titulo}</div>`}${post.tipo === 3 && renderTemplate`<div class="title-video" data-astro-cid-p5zaeqd4>${post.titulo}</div>`}${post.tipo === 1 && renderTemplate`<div class="cachetxt-papel" data-astro-cid-p5zaeqd4>${unescapeHTML(post.cachetxt)}</div>`}${post.tipo === 2 && renderTemplate`<div class="cachetxt" data-astro-cid-p5zaeqd4>${unescapeHTML(post.cachetxt)}</div>`}${post.tipo === 3 && renderTemplate`<div class="cachetxt" data-astro-cid-p5zaeqd4>${unescapeHTML(post.cachetxt)}</div>`}</div></div><div class="hidden-pdf xs pointer detail-layout" data-astro-cid-p5zaeqd4><div id="SidebarToggle" class="abrir flex" data-astro-cid-p5zaeqd4>
Ver Detalles<img width="22" height="21.33" alt="options" src="img/right.svg" data-astro-cid-p5zaeqd4></div></div></div><div id="Sidebar" class="columnb" data-astro-cid-p5zaeqd4><div class="detalles" data-astro-cid-p5zaeqd4><div class="items" data-astro-cid-p5zaeqd4><span class="hidden-details block" data-astro-cid-p5zaeqd4><div class="medio" data-astro-cid-p5zaeqd4><img class="company" src="img/latercera.png" alt="" data-astro-cid-p5zaeqd4><span data-astro-cid-p5zaeqd4>24horas.cl</span><span class="type" data-astro-cid-p5zaeqd4>-</span><span class="type" data-astro-cid-p5zaeqd4>Internet</span></div><div class="fecha" data-astro-cid-p5zaeqd4><!-- <Image src={myImage} alt="A description of my image." /> --><img class="date" src="img/calendar.svg" alt="" data-astro-cid-p5zaeqd4><span data-astro-cid-p5zaeqd4>${fecha}</span></div>${post.tono === 0 && renderTemplate`<div class="denotacion denotation0" data-astro-cid-p5zaeqd4>
Connotación Positiva
</div>`}${post.tono === 1 && renderTemplate`<div class="denotacion denotation1 negativa " data-astro-cid-p5zaeqd4>
Connotación Negativa
</div>`}${post.tono === 2 && renderTemplate`<div class="denotacion denotation2" data-astro-cid-p5zaeqd4>
Connotación Neutral
</div>`}<div class="seccion" data-astro-cid-p5zaeqd4><img class="section" src="img/section3.svg" alt="section" width="17" height="10.56" data-astro-cid-p5zaeqd4><span data-astro-cid-p5zaeqd4>Sección Nacional</span></div><div class="fecha2" data-astro-cid-p5zaeqd4><img class="upload" src="img/up.svg" alt="" data-astro-cid-p5zaeqd4><span data-astro-cid-p5zaeqd4>${fechap} Hrs</span></div></span>${post.tipo === 2 && // <img class="miniature" src={post.url_img} alt="" width="1600" height="900" />
  renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "miniature", "src": post.url_img, "alt": "Imagen Realacionada", "width": "320", "height": "180", "data-astro-cid-p5zaeqd4": true })}`}<div class="flex pt2 gap hidden-pdf" data-astro-cid-p5zaeqd4><div id="url" class="copiar" data-astro-cid-p5zaeqd4><img class="chain" src="img/copiar.svg" alt="" data-astro-cid-p5zaeqd4><span class="precopy" data-astro-cid-p5zaeqd4>Copiar Url</span><span class="postcopy hidden" data-astro-cid-p5zaeqd4>Url Copiado!</span></div><div onclick="window.print()" id="download" class="descargar" data-astro-cid-p5zaeqd4><img class="download" src="img/pdf.svg" alt="descargar pdf" data-astro-cid-p5zaeqd4><span data-astro-cid-p5zaeqd4>Generar Pdf</span><span class="hidden" data-astro-cid-p5zaeqd4>Generado!</span></div></div></div><div class="hidden-pdf xs pointer detail-layout2" data-astro-cid-p5zaeqd4><div id="SidebarToggleIn" class="cerrar flex" data-astro-cid-p5zaeqd4>
Cerrar<img width="22" height="21.33" alt="cerrar" src="img/right.svg" data-astro-cid-p5zaeqd4></div></div></div></div><!-- <Card
				href="https://docs.astro.build/"
				title="Documentation"
				body="Learn how Astro works and explore the official API docs."
			/> --></main>` }));
}, "C:/Users/kyo/Desktop/git/izimedia_visores/visores2/src/pages/[id].astro", void 0);

const $$file = "C:/Users/kyo/Desktop/git/izimedia_visores/visores2/src/pages/[id].astro";
const $$url = "/[id].html";

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _id_ as _, isRemotePath as a, isRemoteAllowed as b, baseService as c, getConfiguredImageService as g, imageConfig as i, parseQuality as p };
