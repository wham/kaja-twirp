// @generated by protobuf-ts 2.8.3 with parameter long_type_string
// @generated from protobuf file "quirks.proto" (package "quirks.v1", syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
/**
 * @generated from protobuf message quirks.v1.MapRequest
 */
export interface MapRequest {
    /**
     * @generated from protobuf field: map<string, string> string_string = 1;
     */
    stringString: {
        [key: string]: string;
    };
    /**
     * @generated from protobuf field: map<string, int32> string_int32 = 2;
     */
    stringInt32: {
        [key: string]: number;
    };
    /**
     * @generated from protobuf field: map<sint64, string> sint64_string = 3;
     */
    sint64String: {
        [key: string]: string;
    };
    /**
     * @generated from protobuf field: map<string, quirks.v1.MapRequest.RepeatedString> string_repeated_string = 4;
     */
    stringRepeatedString: {
        [key: string]: MapRequest_RepeatedString;
    };
}
/**
 * @generated from protobuf message quirks.v1.MapRequest.RepeatedString
 */
export interface MapRequest_RepeatedString {
    /**
     * @generated from protobuf field: repeated string value = 1;
     */
    value: string[];
}
/**
 * @generated from protobuf message quirks.v1.Message
 */
export interface Message {
    /**
     * @generated from protobuf field: string name = 1;
     */
    name: string;
}
/**
 * @generated from protobuf message quirks.v1.RepeatedRequest
 */
export interface RepeatedRequest {
    /**
     * @generated from protobuf field: repeated string string = 1;
     */
    string: string[];
    /**
     * @generated from protobuf field: repeated int32 int32 = 2;
     */
    int32: number[];
    /**
     * @generated from protobuf field: repeated quirks.v1.RepeatedRequest.Enum enum = 3;
     */
    enum: RepeatedRequest_Enum[];
    /**
     * @generated from protobuf field: repeated quirks.v1.Message message = 4;
     */
    message: Message[];
}
/**
 * @generated from protobuf enum quirks.v1.RepeatedRequest.Enum
 */
export enum RepeatedRequest_Enum {
    /**
     * @generated from protobuf enum value: KEY_0 = 0;
     */
    KEY_0 = 0,
    /**
     * @generated from protobuf enum value: KEY_1 = 1;
     */
    KEY_1 = 1
}
/**
 * @generated from protobuf message quirks.v1.TypesRequest
 */
export interface TypesRequest {
    /**
     * @generated from protobuf field: google.protobuf.Timestamp timestamp = 1;
     */
    timestamp?: Timestamp;
    /**
     * @generated from protobuf field: bool bool = 2;
     */
    bool: boolean;
}
/**
 * @generated from protobuf message quirks.v1.Void
 */
export interface Void {
}
// @generated message type with reflection information, may provide speed optimized methods
class MapRequest$Type extends MessageType<MapRequest> {
    constructor() {
        super("quirks.v1.MapRequest", [
            { no: 1, name: "string_string", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "scalar", T: 9 /*ScalarType.STRING*/ } },
            { no: 2, name: "string_int32", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "scalar", T: 5 /*ScalarType.INT32*/ } },
            { no: 3, name: "sint64_string", kind: "map", K: 18 /*ScalarType.SINT64*/, V: { kind: "scalar", T: 9 /*ScalarType.STRING*/ } },
            { no: 4, name: "string_repeated_string", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "message", T: () => MapRequest_RepeatedString } }
        ]);
    }
    create(value?: PartialMessage<MapRequest>): MapRequest {
        const message = { stringString: {}, stringInt32: {}, sint64String: {}, stringRepeatedString: {} };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<MapRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MapRequest): MapRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<string, string> string_string */ 1:
                    this.binaryReadMap1(message.stringString, reader, options);
                    break;
                case /* map<string, int32> string_int32 */ 2:
                    this.binaryReadMap2(message.stringInt32, reader, options);
                    break;
                case /* map<sint64, string> sint64_string */ 3:
                    this.binaryReadMap3(message.sint64String, reader, options);
                    break;
                case /* map<string, quirks.v1.MapRequest.RepeatedString> string_repeated_string */ 4:
                    this.binaryReadMap4(message.stringRepeatedString, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    private binaryReadMap1(map: MapRequest["stringString"], reader: IBinaryReader, options: BinaryReadOptions): void {
        let len = reader.uint32(), end = reader.pos + len, key: keyof MapRequest["stringString"] | undefined, val: MapRequest["stringString"][any] | undefined;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.string();
                    break;
                case 2:
                    val = reader.string();
                    break;
                default: throw new globalThis.Error("unknown map entry field for field quirks.v1.MapRequest.string_string");
            }
        }
        map[key ?? ""] = val ?? "";
    }
    private binaryReadMap2(map: MapRequest["stringInt32"], reader: IBinaryReader, options: BinaryReadOptions): void {
        let len = reader.uint32(), end = reader.pos + len, key: keyof MapRequest["stringInt32"] | undefined, val: MapRequest["stringInt32"][any] | undefined;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.string();
                    break;
                case 2:
                    val = reader.int32();
                    break;
                default: throw new globalThis.Error("unknown map entry field for field quirks.v1.MapRequest.string_int32");
            }
        }
        map[key ?? ""] = val ?? 0;
    }
    private binaryReadMap3(map: MapRequest["sint64String"], reader: IBinaryReader, options: BinaryReadOptions): void {
        let len = reader.uint32(), end = reader.pos + len, key: keyof MapRequest["sint64String"] | undefined, val: MapRequest["sint64String"][any] | undefined;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.sint64().toString();
                    break;
                case 2:
                    val = reader.string();
                    break;
                default: throw new globalThis.Error("unknown map entry field for field quirks.v1.MapRequest.sint64_string");
            }
        }
        map[key ?? "0"] = val ?? "";
    }
    private binaryReadMap4(map: MapRequest["stringRepeatedString"], reader: IBinaryReader, options: BinaryReadOptions): void {
        let len = reader.uint32(), end = reader.pos + len, key: keyof MapRequest["stringRepeatedString"] | undefined, val: MapRequest["stringRepeatedString"][any] | undefined;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.string();
                    break;
                case 2:
                    val = MapRequest_RepeatedString.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field quirks.v1.MapRequest.string_repeated_string");
            }
        }
        map[key ?? ""] = val ?? MapRequest_RepeatedString.create();
    }
    internalBinaryWrite(message: MapRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* map<string, string> string_string = 1; */
        for (let k of Object.keys(message.stringString))
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.LengthDelimited).string(k).tag(2, WireType.LengthDelimited).string(message.stringString[k]).join();
        /* map<string, int32> string_int32 = 2; */
        for (let k of Object.keys(message.stringInt32))
            writer.tag(2, WireType.LengthDelimited).fork().tag(1, WireType.LengthDelimited).string(k).tag(2, WireType.Varint).int32(message.stringInt32[k]).join();
        /* map<sint64, string> sint64_string = 3; */
        for (let k of Object.keys(message.sint64String))
            writer.tag(3, WireType.LengthDelimited).fork().tag(1, WireType.Varint).sint64(k).tag(2, WireType.LengthDelimited).string(message.sint64String[k]).join();
        /* map<string, quirks.v1.MapRequest.RepeatedString> string_repeated_string = 4; */
        for (let k of Object.keys(message.stringRepeatedString)) {
            writer.tag(4, WireType.LengthDelimited).fork().tag(1, WireType.LengthDelimited).string(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            MapRequest_RepeatedString.internalBinaryWrite(message.stringRepeatedString[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message quirks.v1.MapRequest
 */
export const MapRequest = new MapRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MapRequest_RepeatedString$Type extends MessageType<MapRequest_RepeatedString> {
    constructor() {
        super("quirks.v1.MapRequest.RepeatedString", [
            { no: 1, name: "value", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<MapRequest_RepeatedString>): MapRequest_RepeatedString {
        const message = { value: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<MapRequest_RepeatedString>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MapRequest_RepeatedString): MapRequest_RepeatedString {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string value */ 1:
                    message.value.push(reader.string());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: MapRequest_RepeatedString, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated string value = 1; */
        for (let i = 0; i < message.value.length; i++)
            writer.tag(1, WireType.LengthDelimited).string(message.value[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message quirks.v1.MapRequest.RepeatedString
 */
export const MapRequest_RepeatedString = new MapRequest_RepeatedString$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Message$Type extends MessageType<Message> {
    constructor() {
        super("quirks.v1.Message", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Message>): Message {
        const message = { name: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Message>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Message): Message {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string name */ 1:
                    message.name = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Message, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string name = 1; */
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message quirks.v1.Message
 */
export const Message = new Message$Type();
// @generated message type with reflection information, may provide speed optimized methods
class RepeatedRequest$Type extends MessageType<RepeatedRequest> {
    constructor() {
        super("quirks.v1.RepeatedRequest", [
            { no: 1, name: "string", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "int32", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "enum", kind: "enum", repeat: 1 /*RepeatType.PACKED*/, T: () => ["quirks.v1.RepeatedRequest.Enum", RepeatedRequest_Enum] },
            { no: 4, name: "message", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Message }
        ]);
    }
    create(value?: PartialMessage<RepeatedRequest>): RepeatedRequest {
        const message = { string: [], int32: [], enum: [], message: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<RepeatedRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RepeatedRequest): RepeatedRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string string */ 1:
                    message.string.push(reader.string());
                    break;
                case /* repeated int32 int32 */ 2:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.int32.push(reader.int32());
                    else
                        message.int32.push(reader.int32());
                    break;
                case /* repeated quirks.v1.RepeatedRequest.Enum enum */ 3:
                    if (wireType === WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.enum.push(reader.int32());
                    else
                        message.enum.push(reader.int32());
                    break;
                case /* repeated quirks.v1.Message message */ 4:
                    message.message.push(Message.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: RepeatedRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated string string = 1; */
        for (let i = 0; i < message.string.length; i++)
            writer.tag(1, WireType.LengthDelimited).string(message.string[i]);
        /* repeated int32 int32 = 2; */
        if (message.int32.length) {
            writer.tag(2, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.int32.length; i++)
                writer.int32(message.int32[i]);
            writer.join();
        }
        /* repeated quirks.v1.RepeatedRequest.Enum enum = 3; */
        if (message.enum.length) {
            writer.tag(3, WireType.LengthDelimited).fork();
            for (let i = 0; i < message.enum.length; i++)
                writer.int32(message.enum[i]);
            writer.join();
        }
        /* repeated quirks.v1.Message message = 4; */
        for (let i = 0; i < message.message.length; i++)
            Message.internalBinaryWrite(message.message[i], writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message quirks.v1.RepeatedRequest
 */
export const RepeatedRequest = new RepeatedRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TypesRequest$Type extends MessageType<TypesRequest> {
    constructor() {
        super("quirks.v1.TypesRequest", [
            { no: 1, name: "timestamp", kind: "message", T: () => Timestamp },
            { no: 2, name: "bool", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<TypesRequest>): TypesRequest {
        const message = { bool: false };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<TypesRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TypesRequest): TypesRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* google.protobuf.Timestamp timestamp */ 1:
                    message.timestamp = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.timestamp);
                    break;
                case /* bool bool */ 2:
                    message.bool = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: TypesRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* google.protobuf.Timestamp timestamp = 1; */
        if (message.timestamp)
            Timestamp.internalBinaryWrite(message.timestamp, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* bool bool = 2; */
        if (message.bool !== false)
            writer.tag(2, WireType.Varint).bool(message.bool);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message quirks.v1.TypesRequest
 */
export const TypesRequest = new TypesRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Void$Type extends MessageType<Void> {
    constructor() {
        super("quirks.v1.Void", []);
    }
    create(value?: PartialMessage<Void>): Void {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Void>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Void): Void {
        return target ?? this.create();
    }
    internalBinaryWrite(message: Void, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message quirks.v1.Void
 */
export const Void = new Void$Type();
/**
 * @generated ServiceType for protobuf service quirks.v1.Quirks
 */
export const Quirks = new ServiceType("quirks.v1.Quirks", [
    { name: "GetAuthentication", options: {}, I: Void, O: Message },
    { name: "Map", options: {}, I: MapRequest, O: MapRequest },
    { name: "MethodWithAReallyLongNameGmthggupcbmnphflnnvu", options: {}, I: Void, O: Message },
    { name: "Panic", options: {}, I: Void, O: Message },
    { name: "Repeated", options: {}, I: RepeatedRequest, O: RepeatedRequest },
    { name: "Types", options: {}, I: TypesRequest, O: TypesRequest }
]);
