// Type definitions for Mendix client
// Project: https://www.mendix.com/
// Definitions by: Andries Smit <https://github.com/andries-smit>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module mx {
	export interface mx {
		appUrl: string;
		baseUrl: string;
		modulePath: string
		addOnLoad(callback: Function): void;
		login(username: string, password: string, onSuccess: Function, onError: Function): void;
		logout(): void;
		data: mx.data;
		meta: mx.meta;
		parser: mx.parser;
		server: mx.server;
		session: mx.session;
		ui: mx.ui;
		onError(error: Error): void;
	}

	interface data {
		action(action: {
			params: {
				actionname: string,
				applyto?: string,
				guids?: string[],
				xpath?: string,
				constraints?: string,
				sort?: any,
				gridid?: string,
			},
			context?: any,
			store?: any,
			origin?: mxui.lib.form._FormBase,
			async?: boolean,
			callback?: (result: mendix.lib.MxObject | mendix.lib.MxObject[] | boolean | number | string) => void,
			error?: (e: Error) => void,
			onValidation?: (validations: mendix.lib.ObjectValidation[]) => void,
		}, scope?: any): void;
		commit(args: {
			mxobj: mendix.lib.MxObject,
			callback: Function,
			error?: (e: Error) => void,
			onValidation?: Function
		}, scope?: Object): void;
		create(arg: {
			entity: string,
			callback: (obj: mendix.lib.MxObject) => void,
			error: (e: Error) => void,
		}, scope?: Object): void;
		createXPathString(arg: {
			entity: string,
			context: any,
			callback: (xpath: string, allMatched: boolean) => void
		}): void;
		/**
		 * Retrieves MxObjects from the Runtime. Using guid 
		 */
		get(args: {
			guid: string,
			noCache?: boolean,
			count?: boolean,
			path?: string,
			callback: (object: mendix.lib.MxObject) => void,
			error?: (e: Error) => void,
			filter?: {
				id?: string,
				attributes?: any[],
				offset?: number,
				sort?: any[],
				amount?: number,
				distinct?: boolean,
				references?: Object
			}
		}, scope?: Object): void;
		/**
		 * Retrieves MxObjects from the Runtime. Using guids
		 */
		get(args: {
			guids: string[],
			noCache?: boolean,
			count?: boolean,
			path?: string,
			callback: (objects: mendix.lib.MxObject[]) => void,
			error?: (e: Error) => void,
			filter?: {
				id?: string,
				attributes?: any[],
				offset?: number,
				sort?: any[],
				amount?: number,
				distinct?: boolean,
				references?: Object
			}
		}, scope?: Object): void;
		/**
		 * Retrieves MxObjects from the Runtime. Using xpath
		 */
		get(args: {
			xpath: string,
			noCache?: boolean,
			count?: boolean,
			path?: string,
			callback: (objects: mendix.lib.MxObject[]) => void,
			error?: (e: Error) => void,
			filter?: {
				id?: string,
				attributes?: any[],
				offset?: number,
				sort?: any[],
				amount?: number,
				distinct?: boolean,
				references?: Object
			}
		}, scope?: Object): void;
		/**
		 * Retrieves MxObjects from the Runtime. Using microflow 
		 */
		get(args: {
			microflow: string,
			noCache?: boolean,
			count?: boolean,
			path?: string,
			callback: Function,
			error: (e: Error) => void,
			filter?: {
				id: string,
				attributes: any[],
				offset: number,
				sort: any[],
				amount: number,
				distinct: boolean,
				references: Object
			}
		}, scope?: Object): void;
		getBacktrackConstraints(metaObject: any, context: any, callback: (xpath: string, allMatched: boolean) => void): void;
		release(objects: mendix.lib.MxObject | mendix.lib.MxObject[]): void;
		remove(arg: {
			guid?: string,
			guids?: string[],
			callback: Function,
			error: (e: Error) => void
		}, scope?: Object): void;
		rollback(args: {
			mxobj: mendix.lib.MxObject;
			callback: Function,
			error: (e: Error) => void,

		}, scope?: Object): void;
		save(args: {
			mxobj?: mendix.lib.MxObject;
			callback?: Function,
			error?: (e: Error) => void,

		}, scope?: Object): void;
		/**
		 * Registers a callback to be invoked on changes in an MxObject
		 */
		subscribe(args: {
			guid: string,
			callback: (guid: number) => void,
		}): number;
		/**
		 * Registers a callback to be invoked on changes in an attribute of a MxObject
		 */
		subscribe(args: {
			guid: string,
			attr: string,
			callback: (guid: number, attr: string, attrValue: any) => void,
		}): number;
		/**
		 * Registers a callback to be invoked on validations errors in a specific MxObject.
		 */
		subscribe(args: {
			guid: string,
			val: boolean,
			callback: (validations: mendix.lib.ObjectValidation[]) => void,
		}): number;
		/**
		 * Registers a callback to be invoked on changes specific entity 
		 */
		subscribe(args: {
			entity: string,
			callback: (entity: string) => void,
		}): number;
		unsubscribe(handle: number): void;
		update(args: {
			guid?: string,
			entity?: string,
		}): void;
		// update attribute
		update(args: {
			guid: string,
			attr: string,
		}): void;
		saveDocument(guid: string,
			name: string, params: any, blob: Blob, callback: Function, error: (error: Error) => void): void;

	}

	interface meta {

	}
	interface parser {

	}
	interface server {

	}
	interface session {
		getCSRFToken(): string;
	}

	interface ui {
		/**
		 * Executes a Microflow from the UI.
		 * This is basically a wrapper around mx.data.action, giving the option of showing a progress bar while running the Microflow.
		 * @param actionname name of the Microflow to execute
		 * @param action set parameters for call action.
		 * @param action.progress If set, a progress indicator is shown while running the Microflow. When set to modal the indicator is modal, otherwise it is not.
		 * @param scope in which to execute the callback and error callbacks
		 */
		action(actionname: string, action: {
			progress?: string,
			progressMsg?: string
			params?: {
				applyto?: string,
				guids?: string[],
				xpath?: string,
				constraints?: string,
				sort?: any,
				gridid?: string,
			},
			context?: any,
			store?: any,
			async?: boolean,
			callback?: (result: mendix.lib.MxObject | mendix.lib.MxObject[] | boolean | number | string) => void,
			error?: (e: Error) => void,
			onValidation?: Function,
		}, scope?: any): void;

		/**
		 * Goes one step back in history, closing the current in content Form.
		 */
		back(): void;
		/**
		 * Shows a confirmation dialog before calling a given function.
		 */
		confirmation(args: { content: string, proceed: string, cancel: string, handler: Function }): void;
		/**
		 * Shows an error message.
		 */
		error(msg: string, modal?: boolean): void;
		/**
		 * Shows a message for a fatal error in a modal dialog.
		 */
		exception(msg: string): void;
		/**
		 * Gets a template for a specific widget.
		 */
		getTemplate(): HTMLElement;
		/**
		 * 
		 */
		showProgress(): number;
		/**
		 * Hides the loading dialog.
		 */
		hideProgress(pid: number): void;
		/**
		 * Shows an information message.
		 */
		info(msg: string, modal: boolean): void;
		onError(error: Error): void;
		showUnderlay(delay?: number): void;
		hideUnderlay(delay?: number): void;
		resize(): void;
		isRtl(): string;
		/**
		 * Opens a form, either in content, in a DOM node or in a (modal) popup
		 */
		openForm(path: string,
			args?: {
				location?: "content" | "popup" | "modal",
				domNode?: HTMLElement,
				title?: string,
				context?: mendix.lib.MxContext,
				callback?(form: mxui.lib.form._FormBase): void,
				error?(error: Error): void,
			},
			scope?: any
		): void,
		getTemplate(mxid: string, content: string): DocumentFragment,
		showLogin(messageCode: number): void;
	}
}

//export default mx;

// Declaration of mendix global variables
declare var mx: mx.mx;