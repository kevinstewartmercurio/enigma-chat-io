import {Enigma} from "./enigma.js";

export const encrypt = (inStr, offset1, offset2, offset3) => {
    let e = new Enigma(1, offset1, 2, offset2, 3, offset3);

    return e.mapStr(inStr.toLowerCase());
}