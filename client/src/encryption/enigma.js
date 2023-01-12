import {Rotor} from "./rotor.js";

export class Enigma {
    constructor(n1, offset1, n2, offset2, n3, offset3) {
        this.fast = new Rotor(n1, offset1);
        this.medium = new Rotor(n2, offset2);
        this.slow = new Rotor(n3, offset3);

        this.reflector = [
            ["a", "z"], ["b", "y"], ["c", "x"], ["d", "w"], ["e", "v"],
            ["f", "u"], ["g", "t"], ["h", "s"], ["i", "r"], ["j", "q"],
            ["k", "p"], ["l", "o"], ["m", "n"], ["n", "m"], ["o", "l"],
            ["p", "k"], ["q", "j"], ["r", "i"], ["s", "h"], ["t", "g"],
            ["u", "f"], ["v", "e"], ["w", "d"], ["x", "c"], ["y", "b"],
            ["z", "a"]
        ];

        this.kickCount = 0;
    }

    mapChar(c) {
        let alphabet = "abcdefghijklmnopqrstuvwxyz";
        let cInAlphabet = false;
        for (let i = 0; i < alphabet.length; i++) {
            if (alphabet[i] === c) {
                cInAlphabet = true;
            }
        }
        if (cInAlphabet === false) {
            return c;
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