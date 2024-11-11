import { TLangCode } from "./translation.hook";
import en from "./en";
import sw from "./sw";
type TLangTrans = {
  en: Record<string, string>;
  sw: Record<string, string>;
};

const _trans: TLangTrans = {
  en: Object.assign({}, en),
  sw: Object.assign({}, sw),
};
// /**
//  * @deprecated
//  */
// var _lang: TLangCode | null;
export const translate = (
  langCode: TLangCode,
  s: string,
  replacements?: any
) => {
  const defaultTrans = _trans["en"];
  let useTrans = _trans["en"];
  if (_trans.hasOwnProperty(langCode) && typeof _trans[langCode] === "object") {
    useTrans = _trans[langCode];
  }
  s = useTrans[s] || defaultTrans[s] || s;

  for (const key in replacements) {
    const pattern = `%%${key}%%`;
    const value = replacements[key];
    while (s.indexOf(pattern) !== -1) {
      if (typeof value === "string") {
        s = s.replace(pattern, translate(langCode, value));
      } else {
        s = s.replace(pattern, value);
      }
    }
  }
  return s;
};

export * from "./translation.hook";
