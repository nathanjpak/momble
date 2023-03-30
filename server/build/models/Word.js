"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordModel = exports.Word = void 0;
const typegoose_1 = require("@typegoose/typegoose");
class Word {
    word;
    partOfSpeech;
    phrase;
    length;
    definition1;
    definition2;
    definition3;
    level;
}
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Word.prototype, "word", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Word.prototype, "partOfSpeech", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Boolean, required: true, default: false }),
    __metadata("design:type", Boolean)
], Word.prototype, "phrase", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Word.prototype, "length", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Word.prototype, "definition1", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Word.prototype, "definition2", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Word.prototype, "definition3", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Word.prototype, "level", void 0);
exports.Word = Word;
exports.WordModel = (0, typegoose_1.getModelForClass)(Word);
