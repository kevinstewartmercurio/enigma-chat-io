export class Rotor {
    constructor(n, offset) {
        let alphabet = "abcdefghijklmnopqrstuvwxyz";
        let mappingStr;
        switch(n) {
            case 1:
                mappingStr = "ekmflgdqvzntowyhxuspaibrcj";
                break;
            case 2:
                mappingStr = "ajdksiruxblhwtmcqgznpyfvoe";
                break;
            case 3:
                mappingStr = "bdfhjlcprtxvznyeiwgakmusqo";
                break;
            case 4:
                mappingStr = "esovpzjayquirhxlnftgkdcmwb";
                break;
            case 5:
                mappingStr = "vzbrgityupsdnhlxawmjqofeck";
                break;
            case 6:
                mappingStr = "jpgvoumfyqbenhzrdkasxlictw";
                break;
            case 7:
                mappingStr = "nzjhgrcxmyswboufaivlpekqdt";
                break;
            case 8:
                mappingStr = "fkqhtlxocbjspdzramewniuygv";
                break;
            default:
                break;
        }

        this.mapping = [];
        let tempArr = [];
        for (let i = 0; i < mappingStr.length; i++) {
            tempArr.push(alphabet[i]);
            tempArr.push(mappingStr[i]);

            this.mapping.push(tempArr);
            tempArr = [];
        }

        for (let i = 0; i < offset; i++) {
            this.kick();
        }
    }

    mapForwards(c) {
        for (let i = 0; i < this.mapping.length; i++) {
            if (this.mapping[i][0] === c) {
                return this.mapping[i][1];
            }
        }
    }

    mapBackwards(c) {
        for (let i = 0; i < this.mapping.length; i++) {
            if (this.mapping[i][1] === c) {
                return this.mapping[i][0];
            }
        }
    }

    kick() {
        let temp = this.mapping[0][1];

        for (let i = 0; i < (this.mapping.length - 1); i++) {
            this.mapping[i][1] = this.mapping[i + 1][1];
        }

        this.mapping[25][1] = temp;
    }
}