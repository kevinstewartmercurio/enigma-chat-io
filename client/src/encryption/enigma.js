import {Rotor} from "./rotor.js";

export class Enigma {
    constructor(n1, offset1, n2, offset2, n3, offset3) {
        this.fast = new Rotor(n1, offset1);
        this.medium = new Rotor(n2, offset2);
        this.slow = new Rotor(n3, offset3);

        let temp = [];
        this.reflector = [];
        let alphabet = "abcdefghijklmnopqrstuvwxyz";
        let alphabetRev = "zyxwvutsrqponmlkjihgfedcba";
        for (let i = 0; i < alphabet.length; i++) {
            temp.push(alphabet[i]);
            temp.push(alphabetRev[i]);

            this.reflector.push(temp);
            temp = [];
        }

        this.kickCount = 0;
    }

    mapChar(c) {
        if (c === " ") {
            return " ";
        }

        let retChar = c;
        retChar = this.fast.mapForwards(retChar);
        retChar = this.medium.mapForwards(retChar);
        retChar = this.slow.mapForwards(retChar);

        for (let i = 0; i < this.reflector.length; i++) {
            if (this.reflector[i][0] === retChar) {
                retChar = this.reflector[i][1];
                break;
            }
        }
        
        retChar = this.slow.mapBackwards(retChar);
        retChar = this.medium.mapBackwards(retChar);
        retChar = this.fast.mapBackwards(retChar);

        this.kickCount++;
        this.fast.kick();
        if ((this.kickCount % 26) === 0) {
            this.medium.kick();

            if ((this.kickCount % 676) === 0) {
                this.slow.kick();
                this.kickCount = 0;
            }
        }

        return retChar
    }

    mapStr(s) {
        let retStr = "";
        for (let i = 0; i < s.length; i++) {
            retStr += this.mapChar(s[i]);
        }

        return retStr;
    }
}