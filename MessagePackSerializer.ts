import { Decoder, Encoder } from "@msgpack/msgpack";

export namespace MessagePackSerializer {
    const encoder = new Encoder();
    const decoder = new Decoder();

    export function Serialize(object: unknown): Uint8Array {
        return encoder.encode(object);
    }

    export function Deserialize<T>(buffer: Uint8Array, c: { new(arg0?: Array<unknown>): T }): T {
        var original = decoder.decode(buffer) as Array<unknown>;
        return new c(original);
    }
}

export function MessagePackObject(): ClassDecorator {
    return function (constructor: Function): any {

        let ConstructorFunc = function (orginData?: Array<unknown>) {
            let __this = orginData ? orginData : new Array<unknown>();
            Object.setPrototypeOf(__this, ConstructorFunc.prototype);
            return __this;
        }

        let proto;
        if (constructor.prototype['MsgPackObj'] === undefined) {
            proto = new Array<any>();

            Object.setPrototypeOf(proto, constructor.prototype);

            let propertyDescriptors = Object.getOwnPropertyDescriptors(Array.prototype);
            for (const key in propertyDescriptors) {
                if (Object.prototype.hasOwnProperty.call(propertyDescriptors, key)) {
                    const propertyDescriptor = propertyDescriptors[key];
                    Object.defineProperty(proto, key, propertyDescriptor);
                }
            }

            proto[Symbol.iterator] = Array.prototype[Symbol.iterator];

            Object.defineProperty(proto, 'MsgPackObj', {
                value: true,
                configurable: false,
                enumerable: false
            });
        } else {
            proto = constructor.prototype;
        }

        proto.constructor = ConstructorFunc;
        ConstructorFunc.prototype = proto;

        return ConstructorFunc;
    }
}

export function Key(key: number) {
    return function (target: any, propertyName: string) {
        Object.defineProperty(target, propertyName, {
            get: function () {
                return this[key];
            },
            set: function (value) {
                this[key] = value;
            },
            enumerable: false,
            configurable: true
        });
    }
}