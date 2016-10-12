// Type definitions for Mendix client
// Project: https://www.mendix.com/
// Definitions by: Andries Smit <https://github.com/andries-smit>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace mendix {
	module lib {
		class MxError {
			constructor(message: string, original: any);
		}
		class MxObject extends MxMetaObject {
			/**
			 * If attr is a reference attribute, sets it to the given object. If attr is a reference set attribute, adds the given object to it.
			 * @param attr The reference attribute. Can refer to either a reference or reference set attribute.
			 * @param guid GUID of the object to add to the reference
			 */
			addReference(attr: string, guid: string | number): boolean;
			/**
			 * Add an object to a reference set attribute.
			 * @param attr the reference set attribute
			 * @param guids GUIDs of the objects to add to the reference
			 */
			addReferences(attr: string, guids: string[] | number[]): boolean;
			/**
			 * Compare this MxObject to another MxObject and find out if they are the same.
			 * This means they have the same Entity type and their attributes have the same value.
			 */
			compare(mxobj: mendix.lib.MxObject): boolean;
			/**
			 * Gets an object or value of an attribute, through a path from this object.
			 * The result is passed to a callback and depends on the requested path:
			 */
			fetch(path: string, callback: Function): void;
			/**
			 * Returns the value of an attribute.
			 * For reference attributes, use mendix/lib/MxObject#getReference and mendix/lib/MxObject#getReferences instead.
			 */
			get(attr: string): string | number | boolean; //add external big	
			removeReferences(attr: string, guids: string[]): boolean;
			set(attr: string, val: any): boolean;
			FetchCallback(requested: any): void;
		}

		class MxContext {
			constructor();
			getTrackEntity(): string;
			getTrackId(): string;
			getTrackObject(): mendix.lib.MxObject;
			hasTrackEntity(): boolean;
			hasTrackId(): boolean;
			hasTrackObject(): boolean;
			setTrackId(guid: string): void;
			setTrackEntity(entity: string): void;
			setTrackObject(obj: mendix.lib.MxObject): void;
		}

		class MxMetaObject {
			getAttributes(): string[];
			getEntity(): string;
			getEnumCaption(attr: string, value: string): string;
			getEnumMap(): { key: string, caption: string }[]
			getGuid(): string;
			getReference(reference: string): string;
			getReferences(attr: string): number[];
			getSelectorEntity(): string;
			getSubEntities(): string[];
			getSuperEntities(): string[];
			hasChanges(): boolean;
			hasSubEntities(): boolean;
			hasSuperEntities(): boolean;
			inheritsFrom(claz: string): boolean;
			isA(claz: string): boolean
			isBoolean(att: string): boolean;
			isDate(att: string): boolean;
			isEnum(att: string): boolean;
			isLocalizedDate(att: string): boolean;
			isNumber(att: string): boolean;
			isNumeric(att: string): boolean;
			isObjectReference(att: string): boolean;
			isObjectReferenceSet(att: string): boolean;
			isPassword(att: string): boolean;
			isReadonlyAttr(att: string): boolean;
			isReference(att: string): boolean;
		}

		class ObjectValidation {
			addAttribute(attr: string, message: string): boolean;
			clone(): ObjectValidation;
			getAttributes(): { name: string, reason: string }[];
			getErrorReason(attr: string): string;
			getGuid(): string;
			removeAttribute(attr: string): void;
		}

		class ValidationError {

		}
	}
	class lang {
		collect(chain: ChainCallback, callback?: Function, scope?: Object): void;
		delay(func: Function, condition: Function, period?: number): number;
		getUniqueId(): string;
		map(objOrArray: Object | Object[], func: (callback: Function) => void, scope?: Object): any[];
		sequence(chain: ChainCallback, callback?: Function, scope?: Object): void;
		nullExec(callback: Function): void;
	}

	type ChainCallback = ((callback: Function) => void)[];

	class validator {
		validation: {
			OK: number;
			NOT_INTEGER: number;
			RANGE_INTEGER: number;
			RANGE_LONG: number;
			RANGE_DECIMAL: number;
			RANGE_NUMBER: number;
		};
		validate(value: any, type: string): number;
	}

	class logger {
		error(...info: any[]): void;
		debug(...info: any[]): void;
		info(...info: any[]): void;
		warn(...info: any[]): void;
		exception(...info: any[]): void;
		scream(...info: any[]): void;
	}
}

declare module "mendix/lib/MxObject" {
	var obj: mendix.lib.MxObject;
	export = obj;
}

declare module "mendix/lang" {
	var lang: mendix.lang;
	export = lang;
}

declare module "mendix/validator" {
	var validator: mendix.validator;
	export = validator;
}

declare module "mendix/logger" {
	var logger: mendix.logger;
	export = logger;
}

// Declaration of mendix global variables
declare var logger: mendix.logger;
