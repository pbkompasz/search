"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn)
          console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter2() {
        EventEmitter2.init.call(this);
      }
      module.exports = EventEmitter2;
      module.exports.once = once;
      EventEmitter2.EventEmitter = EventEmitter2;
      EventEmitter2.prototype._events = void 0;
      EventEmitter2.prototype._eventsCount = 0;
      EventEmitter2.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter2.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter2.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter2.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++)
          args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter2.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
      EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter2.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter2.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter2.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter2.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter2.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/quasar/wrappers/index.js
  var require_wrappers = __commonJS({
    "node_modules/quasar/wrappers/index.js"(exports, module) {
      module.exports.boot = function(callback) {
        return callback;
      };
      module.exports.ssrMiddleware = function(callback) {
        return callback;
      };
      module.exports.configure = function(callback) {
        return callback;
      };
      module.exports.preFetch = function(callback) {
        return callback;
      };
      module.exports.route = function(callback) {
        return callback;
      };
      module.exports.store = function(callback) {
        return callback;
      };
      module.exports.bexBackground = function(callback) {
        return callback;
      };
      module.exports.bexContent = function(callback) {
        return callback;
      };
      module.exports.bexDom = function(callback) {
        return callback;
      };
      module.exports.ssrProductionExport = function(callback) {
        return callback;
      };
      module.exports.ssrCreate = function(callback) {
        return callback;
      };
      module.exports.ssrListen = function(callback) {
        return callback;
      };
      module.exports.ssrClose = function(callback) {
        return callback;
      };
      module.exports.ssrServeStaticContent = function(callback) {
        return callback;
      };
      module.exports.ssrRenderPreloadTag = function(callback) {
        return callback;
      };
    }
  });

  // .quasar/bex/bridge.js
  var import_events = __toESM(require_events());

  // node_modules/quasar/src/utils/uid.js
  var buf;
  var bufIdx = 0;
  var hexBytes = new Array(256);
  for (let i = 0; i < 256; i++) {
    hexBytes[i] = (i + 256).toString(16).substring(1);
  }
  var randomBytes = (() => {
    const lib = typeof crypto !== "undefined" ? crypto : typeof window !== "undefined" ? window.crypto || window.msCrypto : void 0;
    if (lib !== void 0) {
      if (lib.randomBytes !== void 0) {
        return lib.randomBytes;
      }
      if (lib.getRandomValues !== void 0) {
        return (n) => {
          const bytes = new Uint8Array(n);
          lib.getRandomValues(bytes);
          return bytes;
        };
      }
    }
    return (n) => {
      const r = [];
      for (let i = n; i > 0; i--) {
        r.push(Math.floor(Math.random() * 256));
      }
      return r;
    };
  })();
  var BUFFER_SIZE = 4096;
  function uid_default() {
    if (buf === void 0 || bufIdx + 16 > BUFFER_SIZE) {
      bufIdx = 0;
      buf = randomBytes(BUFFER_SIZE);
    }
    const b = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
    b[6] = b[6] & 15 | 64;
    b[8] = b[8] & 63 | 128;
    return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
  }

  // .quasar/bex/bridge.js
  var typeSizes = {
    "undefined": () => 0,
    "boolean": () => 4,
    "number": () => 8,
    "string": (item) => 2 * item.length,
    "object": (item) => !item ? 0 : Object.keys(item).reduce((total, key) => sizeOf(key) + sizeOf(item[key]) + total, 0)
  };
  var sizeOf = (value) => typeSizes[typeof value](value);
  var Bridge = class extends import_events.EventEmitter {
    constructor(wall) {
      super();
      this.setMaxListeners(Infinity);
      this.wall = wall;
      wall.listen((messages) => {
        if (Array.isArray(messages)) {
          messages.forEach((message) => this._emit(message));
        } else {
          this._emit(messages);
        }
      });
      this._sendingQueue = [];
      this._sending = false;
      this._maxMessageSize = 32 * 1024 * 1024;
    }
    send(event, payload) {
      return this._send([{ event, payload }]);
    }
    getEvents() {
      return this._events;
    }
    on(eventName, listener) {
      return super.on(eventName, (originalPayload) => {
        listener({
          ...originalPayload,
          respond: (payload) => this.send(originalPayload.eventResponseKey, payload)
        });
      });
    }
    _emit(message) {
      if (typeof message === "string") {
        this.emit(message);
      } else {
        this.emit(message.event, message.payload);
      }
    }
    _send(messages) {
      this._sendingQueue.push(messages);
      return this._nextSend();
    }
    _nextSend() {
      if (!this._sendingQueue.length || this._sending)
        return Promise.resolve();
      this._sending = true;
      const messages = this._sendingQueue.shift(), currentMessage = messages[0], eventListenerKey = `${currentMessage.event}.${uid_default()}`, eventResponseKey = eventListenerKey + ".result";
      return new Promise((resolve, reject) => {
        let allChunks = [];
        const fn = (r) => {
          if (r !== void 0 && r._chunkSplit) {
            const chunkData = r._chunkSplit;
            allChunks = [...allChunks, ...r.data];
            if (chunkData.lastChunk) {
              this.off(eventResponseKey, fn);
              resolve(allChunks);
            }
          } else {
            this.off(eventResponseKey, fn);
            resolve(r);
          }
        };
        this.on(eventResponseKey, fn);
        try {
          const messagesToSend = messages.map((m) => {
            return {
              ...m,
              ...{
                payload: {
                  data: m.payload,
                  eventResponseKey
                }
              }
            };
          });
          this.wall.send(messagesToSend);
        } catch (err) {
          const errorMessage = "Message length exceeded maximum allowed length.";
          if (err.message === errorMessage) {
            if (!Array.isArray(currentMessage.payload)) {
              if (true) {
                console.error(errorMessage + " Note: The bridge can deal with this is if the payload is an Array.");
              }
            } else {
              const objectSize = sizeOf(currentMessage);
              if (objectSize > this._maxMessageSize) {
                const chunksRequired = Math.ceil(objectSize / this._maxMessageSize), arrayItemCount = Math.ceil(currentMessage.payload.length / chunksRequired);
                let data = currentMessage.payload;
                for (let i = 0; i < chunksRequired; i++) {
                  let take = Math.min(data.length, arrayItemCount);
                  this.wall.send([{
                    event: currentMessage.event,
                    payload: {
                      _chunkSplit: {
                        count: chunksRequired,
                        lastChunk: i === chunksRequired - 1
                      },
                      data: data.splice(0, take)
                    }
                  }]);
                }
              }
            }
          }
        }
        this._sending = false;
        setTimeout(() => {
          return this._nextSend();
        }, 16);
      });
    }
  };

  // .quasar/bex/window-event-listener.js
  var listenForWindowEvents = (bridge2, type) => {
    window.addEventListener("message", (payload) => {
      if (payload.source !== window) {
        return;
      }
      if (payload.data.from !== void 0 && payload.data.from === type) {
        const eventData = payload.data[0], bridgeEvents = bridge2.getEvents();
        for (let event in bridgeEvents) {
          if (event === eventData.event) {
            bridgeEvents[event](eventData.payload);
          }
        }
      }
    }, false);
  };

  // src-bex/my-content-script.ts
  var import_wrappers = __toESM(require_wrappers());
  var my_content_script_default = (0, import_wrappers.bexContent)(() => {
  });

  // .quasar/bex/entry-content-script-my-content-script.js
  var port = chrome.runtime.connect({
    name: "contentScript"
  });
  var disconnected = false;
  port.onDisconnect.addListener(() => {
    disconnected = true;
  });
  var bridge = new Bridge({
    listen(fn) {
      port.onMessage.addListener(fn);
    },
    send(data) {
      if (!disconnected) {
        port.postMessage(data);
        window.postMessage({
          ...data,
          from: "bex-content-script"
        }, "*");
      }
    }
  });
  function injectScript(url) {
    const script = document.createElement("script");
    script.src = url;
    script.onload = function() {
      this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
  }
  if (document instanceof HTMLDocument) {
    injectScript(chrome.runtime.getURL("dom.js"));
  }
  listenForWindowEvents(bridge, "bex-dom");
  my_content_script_default(bridge);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci93cmFwcGVycy9pbmRleC5qcyIsICIuLi8uLi8ucXVhc2FyL2JleC9icmlkZ2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvdWlkLmpzIiwgIi4uLy4uLy5xdWFzYXIvYmV4L3dpbmRvdy1ldmVudC1saXN0ZW5lci5qcyIsICIuLi8uLi9zcmMtYmV4L215LWNvbnRlbnQtc2NyaXB0LnRzIiwgIi4uLy4uLy5xdWFzYXIvYmV4L2VudHJ5LWNvbnRlbnQtc2NyaXB0LW15LWNvbnRlbnQtc2NyaXB0LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCByZXNvbHZlcik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgcmVzb2x2ZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXJyb3JMaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGhhbmRsZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCAnZXJyb3InLCBoYW5kbGVyLCBmbGFncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIGxpc3RlbmVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgZW1pdHRlci5vbmNlKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdHRlci5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBFdmVudFRhcmdldCBkb2VzIG5vdCBoYXZlIGBlcnJvcmAgZXZlbnQgc2VtYW50aWNzIGxpa2UgTm9kZVxuICAgIC8vIEV2ZW50RW1pdHRlcnMsIHdlIGRvIG5vdCBsaXN0ZW4gZm9yIGBlcnJvcmAgZXZlbnRzIGhlcmUuXG4gICAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lcihhcmcpIHtcbiAgICAgIC8vIElFIGRvZXMgbm90IGhhdmUgYnVpbHRpbiBgeyBvbmNlOiB0cnVlIH1gIHN1cHBvcnQgc28gd2VcbiAgICAgIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkuXG4gICAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgd3JhcExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyKGFyZyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBlbWl0dGVyKTtcbiAgfVxufVxuIiwgIi8vIEZ1bmN0aW9ucyBpbiB0aGlzIGZpbGUgYXJlIG5vLW9wLFxuLy8gIHRoZXkganVzdCB0YWtlIGEgY2FsbGJhY2sgZnVuY3Rpb24gYW5kIHJldHVybiBpdFxuLy8gVGhleSdyZSB1c2VkIHRvIGFwcGx5IHR5cGluZ3MgdG8gdGhlIGNhbGxiYWNrXG4vLyAgcGFyYW1ldGVycyBhbmQgcmV0dXJuIHZhbHVlIHdoZW4gdXNpbmcgUXVhc2FyIHdpdGggVHlwZVNjcmlwdFxuLy8gV2UgbmVlZCB0aGVzZSBpbiBgdWlgIGZvbGRlciB0byBtYWtlIGBxdWFzYXIvd3JhcHBlcmAgaW1wb3J0IHdvcmssXG4vLyAgYnV0IHRoZXkgYXJlIHVzZWZ1bCBvbmx5IGZvciBRdWFzYXIgQ0xJIHByb2plY3RzXG4vLyBUaGV5IGFyZSB0eXBlZCB2aWEgbW9kdWxlIGF1Z21lbnRhdGlvbiBieSBgQHF1YXNhci9hcHAtd2VicGFja2AgLyBgQHF1YXNhci9hcHAtdml0ZWBcblxubW9kdWxlLmV4cG9ydHMuYm9vdCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxubW9kdWxlLmV4cG9ydHMuc3NyTWlkZGxld2FyZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxubW9kdWxlLmV4cG9ydHMuY29uZmlndXJlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuXG5tb2R1bGUuZXhwb3J0cy5wcmVGZXRjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxubW9kdWxlLmV4cG9ydHMucm91dGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhbGxiYWNrXG59XG5cbm1vZHVsZS5leHBvcnRzLnN0b3JlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuXG5tb2R1bGUuZXhwb3J0cy5iZXhCYWNrZ3JvdW5kID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuXG5tb2R1bGUuZXhwb3J0cy5iZXhDb250ZW50ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuXG5tb2R1bGUuZXhwb3J0cy5iZXhEb20gPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhbGxiYWNrXG59XG5cbi8qKlxuICogQmVsb3cgb25seSBmb3IgQHF1YXNhci9hcHAtd2VicGFja1xuICovXG5cbm1vZHVsZS5leHBvcnRzLnNzclByb2R1Y3Rpb25FeHBvcnQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhbGxiYWNrXG59XG5cbi8qKlxuICogQmVsb3cgb25seSBmb3IgQHF1YXNhci9hcHAtdml0ZVxuICovXG5cbm1vZHVsZS5leHBvcnRzLnNzckNyZWF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxubW9kdWxlLmV4cG9ydHMuc3NyTGlzdGVuID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuXG5tb2R1bGUuZXhwb3J0cy5zc3JDbG9zZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FsbGJhY2tcbn1cblxubW9kdWxlLmV4cG9ydHMuc3NyU2VydmVTdGF0aWNDb250ZW50ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuXG5tb2R1bGUuZXhwb3J0cy5zc3JSZW5kZXJQcmVsb2FkVGFnID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYWxsYmFja1xufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlICovXG4vKipcbiAqIFRISVMgRklMRSBJUyBHRU5FUkFURUQgQVVUT01BVElDQUxMWS5cbiAqIERPIE5PVCBFRElULlxuICoqL1xuXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnXG5pbXBvcnQgdWlkIGZyb20gJ3F1YXNhci9zcmMvdXRpbHMvdWlkJ1xuXG5jb25zdFxuICB0eXBlU2l6ZXMgPSB7XG4gICAgJ3VuZGVmaW5lZCc6ICgpID0+IDAsXG4gICAgJ2Jvb2xlYW4nOiAoKSA9PiA0LFxuICAgICdudW1iZXInOiAoKSA9PiA4LFxuICAgICdzdHJpbmcnOiBpdGVtID0+IDIgKiBpdGVtLmxlbmd0aCxcbiAgICAnb2JqZWN0JzogaXRlbSA9PiAhaXRlbSA/IDAgOiBPYmplY3RcbiAgICAgIC5rZXlzKGl0ZW0pXG4gICAgICAucmVkdWNlKCh0b3RhbCwga2V5KSA9PiBzaXplT2Yoa2V5KSArIHNpemVPZihpdGVtW2tleV0pICsgdG90YWwsIDApXG4gIH0sXG4gIHNpemVPZiA9IHZhbHVlID0+IHR5cGVTaXplc1t0eXBlb2YgdmFsdWVdKHZhbHVlKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcmlkZ2UgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvciAod2FsbCkge1xuICAgIHN1cGVyKClcblxuICAgIHRoaXMuc2V0TWF4TGlzdGVuZXJzKEluZmluaXR5KVxuICAgIHRoaXMud2FsbCA9IHdhbGxcblxuICAgIHdhbGwubGlzdGVuKG1lc3NhZ2VzID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG1lc3NhZ2VzKSkge1xuICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4gdGhpcy5fZW1pdChtZXNzYWdlKSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9lbWl0KG1lc3NhZ2VzKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLl9zZW5kaW5nUXVldWUgPSBbXVxuICAgIHRoaXMuX3NlbmRpbmcgPSBmYWxzZVxuICAgIHRoaXMuX21heE1lc3NhZ2VTaXplID0gMzIgKiAxMDI0ICogMTAyNCAvLyAzMm1iXG4gIH1cblxuICAvKipcbiAgICogU2VuZCBhbiBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSBwYXlsb2FkXG4gICAqIEByZXR1cm5zIFByb21pc2U8PlxuICAgKi9cbiAgc2VuZCAoZXZlbnQsIHBheWxvYWQpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VuZChbeyBldmVudCwgcGF5bG9hZCB9XSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYWxsIHJlZ2lzdGVyZWQgZXZlbnRzXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0RXZlbnRzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRzXG4gIH1cblxuICBvbihldmVudE5hbWUsIGxpc3RlbmVyKSB7XG4gICAgcmV0dXJuIHN1cGVyLm9uKGV2ZW50TmFtZSwgKG9yaWdpbmFsUGF5bG9hZCkgPT4ge1xuICAgICAgbGlzdGVuZXIoe1xuICAgICAgICAuLi5vcmlnaW5hbFBheWxvYWQsXG4gICAgICAgIC8vIENvbnZlbmllbnQgYWx0ZXJuYXRpdmUgdG8gdGhlIG1hbnVhbCB1c2FnZSBvZiBgZXZlbnRSZXNwb25zZUtleWBcbiAgICAgICAgLy8gV2UgY2FuJ3Qgc2VuZCB0aGlzIGluIGBfbmV4dFNlbmRgIHdoaWNoIHdpbGwgdGhlbiBiZSBzZW50IHVzaW5nIGBwb3J0LnBvc3RNZXNzYWdlKClgLCB3aGljaCBjYW4ndCBzZXJpYWxpemUgZnVuY3Rpb25zLlxuICAgICAgICAvLyBTbywgd2UgaG9vayBpbnRvIHRoZSB1bmRlcmx5aW5nIGxpc3RlbmVyIGFuZCBpbmNsdWRlIHRoZSBmdW5jdGlvbiB0aGVyZSwgd2hpY2ggaGFwcGVucyBhZnRlciB0aGUgc2VuZCBvcGVyYXRpb24uXG4gICAgICAgIHJlc3BvbmQ6IChwYXlsb2FkIC8qIG9wdGlvbmFsICovKSA9PiB0aGlzLnNlbmQob3JpZ2luYWxQYXlsb2FkLmV2ZW50UmVzcG9uc2VLZXksIHBheWxvYWQpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBfZW1pdCAobWVzc2FnZSkge1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuZW1pdChtZXNzYWdlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdChtZXNzYWdlLmV2ZW50LCBtZXNzYWdlLnBheWxvYWQpXG4gICAgfVxuICB9XG5cbiAgX3NlbmQgKG1lc3NhZ2VzKSB7XG4gICAgdGhpcy5fc2VuZGluZ1F1ZXVlLnB1c2gobWVzc2FnZXMpXG4gICAgcmV0dXJuIHRoaXMuX25leHRTZW5kKClcbiAgfVxuXG4gIF9uZXh0U2VuZCAoKSB7XG4gICAgaWYgKCF0aGlzLl9zZW5kaW5nUXVldWUubGVuZ3RoIHx8IHRoaXMuX3NlbmRpbmcpIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgIHRoaXMuX3NlbmRpbmcgPSB0cnVlXG5cbiAgICBjb25zdFxuICAgICAgbWVzc2FnZXMgPSB0aGlzLl9zZW5kaW5nUXVldWUuc2hpZnQoKSxcbiAgICAgIGN1cnJlbnRNZXNzYWdlID0gbWVzc2FnZXNbMF0sXG4gICAgICBldmVudExpc3RlbmVyS2V5ID0gYCR7Y3VycmVudE1lc3NhZ2UuZXZlbnR9LiR7dWlkKCl9YCxcbiAgICAgIGV2ZW50UmVzcG9uc2VLZXkgPSBldmVudExpc3RlbmVyS2V5ICsgJy5yZXN1bHQnXG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IGFsbENodW5rcyA9IFtdXG5cbiAgICAgIGNvbnN0IGZuID0gKHIpID0+IHtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHNwbGl0IG1lc3NhZ2UgdGhlbiBrZWVwIGxpc3RlbmluZyBmb3IgdGhlIGNodW5rcyBhbmQgYnVpbGQgYSBsaXN0IHRvIHJlc29sdmVcbiAgICAgICAgaWYgKHIgIT09IHZvaWQgMCAmJiByLl9jaHVua1NwbGl0KSB7XG4gICAgICAgICAgY29uc3QgY2h1bmtEYXRhID0gci5fY2h1bmtTcGxpdFxuICAgICAgICAgIGFsbENodW5rcyA9IFsuLi5hbGxDaHVua3MsIC4uLnIuZGF0YV1cblxuICAgICAgICAgIC8vIExhc3QgY2h1bmsgcmVjZWl2ZWQgc28gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cbiAgICAgICAgICBpZiAoY2h1bmtEYXRhLmxhc3RDaHVuaykge1xuICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnRSZXNwb25zZUtleSwgZm4pXG4gICAgICAgICAgICByZXNvbHZlKGFsbENodW5rcylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5vZmYoZXZlbnRSZXNwb25zZUtleSwgZm4pXG4gICAgICAgICAgcmVzb2x2ZShyKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMub24oZXZlbnRSZXNwb25zZUtleSwgZm4pXG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIEFkZCBhbiBldmVudCByZXNwb25zZSBrZXkgdG8gdGhlIHBheWxvYWQgd2UncmUgc2VuZGluZyBzbyB0aGUgbWVzc2FnZSBrbm93cyB3aGljaCBjaGFubmVsIHRvIHJlc3BvbmQgb24uXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzVG9TZW5kID0gbWVzc2FnZXMubWFwKG0gPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5tLFxuICAgICAgICAgICAgLi4ue1xuICAgICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgZGF0YTogbS5wYXlsb2FkLFxuICAgICAgICAgICAgICAgIGV2ZW50UmVzcG9uc2VLZXlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLndhbGwuc2VuZChtZXNzYWdlc1RvU2VuZClcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ01lc3NhZ2UgbGVuZ3RoIGV4Y2VlZGVkIG1heGltdW0gYWxsb3dlZCBsZW5ndGguJ1xuXG4gICAgICAgIGlmIChlcnIubWVzc2FnZSA9PT0gZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIHBheWxvYWQgaXMgYW4gYXJyYXkgYW5kIHRvbyBiaWcgdGhlbiBzcGxpdCBpdCBpbnRvIGNodW5rcyBhbmQgc2VuZCB0byB0aGUgY2xpZW50cyBicmlkZ2VcbiAgICAgICAgICAvLyB0aGUgY2xpZW50IGJyaWRnZSB3aWxsIHRoZW4gcmVzb2x2ZSB0aGUgcHJvbWlzZS5cbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY3VycmVudE1lc3NhZ2UucGF5bG9hZCkpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JNZXNzYWdlICsgJyBOb3RlOiBUaGUgYnJpZGdlIGNhbiBkZWFsIHdpdGggdGhpcyBpcyBpZiB0aGUgcGF5bG9hZCBpcyBhbiBBcnJheS4nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG9iamVjdFNpemUgPSBzaXplT2YoY3VycmVudE1lc3NhZ2UpXG5cbiAgICAgICAgICAgIGlmIChvYmplY3RTaXplID4gdGhpcy5fbWF4TWVzc2FnZVNpemUpIHtcbiAgICAgICAgICAgICAgY29uc3RcbiAgICAgICAgICAgICAgICBjaHVua3NSZXF1aXJlZCA9IE1hdGguY2VpbChvYmplY3RTaXplIC8gdGhpcy5fbWF4TWVzc2FnZVNpemUpLFxuICAgICAgICAgICAgICAgIGFycmF5SXRlbUNvdW50ID0gTWF0aC5jZWlsKGN1cnJlbnRNZXNzYWdlLnBheWxvYWQubGVuZ3RoIC8gY2h1bmtzUmVxdWlyZWQpXG5cbiAgICAgICAgICAgICAgbGV0IGRhdGEgPSBjdXJyZW50TWVzc2FnZS5wYXlsb2FkXG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2h1bmtzUmVxdWlyZWQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB0YWtlID0gTWF0aC5taW4oZGF0YS5sZW5ndGgsIGFycmF5SXRlbUNvdW50KVxuXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsLnNlbmQoW3tcbiAgICAgICAgICAgICAgICAgIGV2ZW50OiBjdXJyZW50TWVzc2FnZS5ldmVudCxcbiAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgX2NodW5rU3BsaXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudDogY2h1bmtzUmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgbGFzdENodW5rOiBpID09PSBjaHVua3NSZXF1aXJlZCAtIDFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5zcGxpY2UoMCwgdGFrZSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9zZW5kaW5nID0gZmFsc2VcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyByZXR1cm4gdGhpcy5fbmV4dFNlbmQoKSB9LCAxNilcbiAgICB9KVxuICB9XG59XG4iLCAiLyoqXG4gKiBCYXNlZCBvbiB0aGUgd29yayBvZiBodHRwczovL2dpdGh1Yi5jb20vamNob29rL3V1aWQtcmFuZG9tXG4gKi9cblxubGV0XG4gIGJ1ZixcbiAgYnVmSWR4ID0gMFxuY29uc3QgaGV4Qnl0ZXMgPSBuZXcgQXJyYXkoMjU2KVxuXG4vLyBQcmUtY2FsY3VsYXRlIHRvU3RyaW5nKDE2KSBmb3Igc3BlZWRcbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgaGV4Qnl0ZXNbIGkgXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSlcbn1cblxuLy8gVXNlIGJlc3QgYXZhaWxhYmxlIFBSTkdcbmNvbnN0IHJhbmRvbUJ5dGVzID0gKCgpID0+IHtcbiAgLy8gTm9kZSAmIEJyb3dzZXIgc3VwcG9ydFxuICBjb25zdCBsaWIgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJ1xuICAgID8gY3J5cHRvXG4gICAgOiAoXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgPyB3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0b1xuICAgICAgICAgIDogdm9pZCAwXG4gICAgICApXG5cbiAgaWYgKGxpYiAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKGxpYi5yYW5kb21CeXRlcyAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gbGliLnJhbmRvbUJ5dGVzXG4gICAgfVxuICAgIGlmIChsaWIuZ2V0UmFuZG9tVmFsdWVzICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBuID0+IHtcbiAgICAgICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShuKVxuICAgICAgICBsaWIuZ2V0UmFuZG9tVmFsdWVzKGJ5dGVzKVxuICAgICAgICByZXR1cm4gYnl0ZXNcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbiA9PiB7XG4gICAgY29uc3QgciA9IFtdXG4gICAgZm9yIChsZXQgaSA9IG47IGkgPiAwOyBpLS0pIHtcbiAgICAgIHIucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpKVxuICAgIH1cbiAgICByZXR1cm4gclxuICB9XG59KSgpXG5cbi8vIEJ1ZmZlciByYW5kb20gbnVtYmVycyBmb3Igc3BlZWRcbi8vIFJlZHVjZSBtZW1vcnkgdXNhZ2UgYnkgZGVjcmVhc2luZyB0aGlzIG51bWJlciAobWluIDE2KVxuLy8gb3IgaW1wcm92ZSBzcGVlZCBieSBpbmNyZWFzaW5nIHRoaXMgbnVtYmVyICh0cnkgMTYzODQpXG5jb25zdCBCVUZGRVJfU0laRSA9IDQwOTZcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAvLyBCdWZmZXIgc29tZSByYW5kb20gYnl0ZXMgZm9yIHNwZWVkXG4gIGlmIChidWYgPT09IHZvaWQgMCB8fCAoYnVmSWR4ICsgMTYgPiBCVUZGRVJfU0laRSkpIHtcbiAgICBidWZJZHggPSAwXG4gICAgYnVmID0gcmFuZG9tQnl0ZXMoQlVGRkVSX1NJWkUpXG4gIH1cblxuICBjb25zdCBiID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnVmLCBidWZJZHgsIChidWZJZHggKz0gMTYpKVxuICBiWyA2IF0gPSAoYlsgNiBdICYgMHgwZikgfCAweDQwXG4gIGJbIDggXSA9IChiWyA4IF0gJiAweDNmKSB8IDB4ODBcblxuICByZXR1cm4gaGV4Qnl0ZXNbIGJbIDAgXSBdICsgaGV4Qnl0ZXNbIGJbIDEgXSBdXG4gICAgKyBoZXhCeXRlc1sgYlsgMiBdIF0gKyBoZXhCeXRlc1sgYlsgMyBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyA0IF0gXSArIGhleEJ5dGVzWyBiWyA1IF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDYgXSBdICsgaGV4Qnl0ZXNbIGJbIDcgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgOCBdIF0gKyBoZXhCeXRlc1sgYlsgOSBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyAxMCBdIF0gKyBoZXhCeXRlc1sgYlsgMTEgXSBdXG4gICAgKyBoZXhCeXRlc1sgYlsgMTIgXSBdICsgaGV4Qnl0ZXNbIGJbIDEzIF0gXVxuICAgICsgaGV4Qnl0ZXNbIGJbIDE0IF0gXSArIGhleEJ5dGVzWyBiWyAxNSBdIF1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyoqXG4gKiBUSElTIEZJTEUgSVMgR0VORVJBVEVEIEFVVE9NQVRJQ0FMTFkuXG4gKiBETyBOT1QgRURJVC5cbiAqKi9cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gYWRkIGEgZ2VuZXJpYyB3aW5kb3dzIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBwYWdlXG4gKiB3aGljaCBhY3RzIGFzIGEgYnJpZGdlIGJldHdlZW4gdGhlIHdlYiBwYWdlIGFuZCB0aGUgY29udGVudCBzY3JpcHQgYnJpZGdlLlxuICogQHBhcmFtIGJyaWRnZVxuICogQHBhcmFtIHR5cGVcbiAqL1xuZXhwb3J0IGNvbnN0IGxpc3RlbkZvcldpbmRvd0V2ZW50cyA9IChicmlkZ2UsIHR5cGUpID0+IHtcbiAgLy8gTGlzdGVuIGZvciBhbnkgZXZlbnRzIGZyb20gdGhlIHdlYiBwYWdlIGFuZCB0cmFuc21pdCB0byB0aGUgQkVYIGJyaWRnZS5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBwYXlsb2FkID0+IHtcbiAgICAvLyBXZSBvbmx5IGFjY2VwdCBtZXNzYWdlcyBmcm9tIHRoaXMgd2luZG93IHRvIGl0c2VsZiBbaS5lLiBub3QgZnJvbSBhbnkgaWZyYW1lc11cbiAgICBpZiAocGF5bG9hZC5zb3VyY2UgIT09IHdpbmRvdykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHBheWxvYWQuZGF0YS5mcm9tICE9PSB2b2lkIDAgJiYgcGF5bG9hZC5kYXRhLmZyb20gPT09IHR5cGUpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGV2ZW50RGF0YSA9IHBheWxvYWQuZGF0YVswXSxcbiAgICAgICAgYnJpZGdlRXZlbnRzID0gYnJpZGdlLmdldEV2ZW50cygpXG5cbiAgICAgIGZvciAobGV0IGV2ZW50IGluIGJyaWRnZUV2ZW50cykge1xuICAgICAgICBpZiAoZXZlbnQgPT09IGV2ZW50RGF0YS5ldmVudCkge1xuICAgICAgICAgIGJyaWRnZUV2ZW50c1tldmVudF0oZXZlbnREYXRhLnBheWxvYWQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIGZhbHNlKVxufVxuIiwgIi8vIEhvb2tzIGFkZGVkIGhlcmUgaGF2ZSBhIGJyaWRnZSBhbGxvd2luZyBjb21tdW5pY2F0aW9uIGJldHdlZW4gdGhlIEJFWCBDb250ZW50IFNjcmlwdCBhbmQgdGhlIFF1YXNhciBBcHBsaWNhdGlvbi5cbi8vIE1vcmUgaW5mbzogaHR0cHM6Ly9xdWFzYXIuZGV2L3F1YXNhci1jbGkvZGV2ZWxvcGluZy1icm93c2VyLWV4dGVuc2lvbnMvY29udGVudC1ob29rc1xuXG5pbXBvcnQgeyBiZXhDb250ZW50IH0gZnJvbSAncXVhc2FyL3dyYXBwZXJzJ1xuXG5leHBvcnQgZGVmYXVsdCBiZXhDb250ZW50KCgvKiBicmlkZ2UgKi8pID0+IHtcbiAgLy8gSG9vayBpbnRvIHRoZSBicmlkZ2UgdG8gbGlzdGVuIGZvciBldmVudHMgc2VudCBmcm9tIHRoZSBjbGllbnQgQkVYLlxuICAvKlxuICBicmlkZ2Uub24oJ3NvbWUuZXZlbnQnLCBldmVudCA9PiB7XG4gICAgaWYgKGV2ZW50LmRhdGEueW91clByb3ApIHtcbiAgICAgIC8vIEFjY2VzcyBhIERPTSBlbGVtZW50IGZyb20gaGVyZS5cbiAgICAgIC8vIERvY3VtZW50IGluIHRoaXMgaW5zdGFuY2UgaXMgdGhlIHVuZGVybHlpbmcgd2Vic2l0ZSB0aGUgY29udGVudFNjcmlwdCBydW5zIG9uXG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb21lLWlkJylcbiAgICAgIGlmIChlbCkge1xuICAgICAgICBlbC52YWx1ZSA9ICdRdWFzYXIgUm9ja3MhJ1xuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgKi9cbn0pXG4iLCAiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qKlxuICogVEhJUyBGSUxFIElTIEdFTkVSQVRFRCBBVVRPTUFUSUNBTExZLlxuICogRE8gTk9UIEVESVQuXG4gKlxuICogWW91IGFyZSBwcm9iYWJseSBsb29raW5nIGludG8gYWRkaW5nIGhvb2tzIGluIHlvdXIgY29kZS4gVGhpcyBzaG91bGQgYmUgZG9uZSBieSBtZWFucyBvZlxuICogc3JjLWJleC9qcy9jb250ZW50LWhvb2tzLmpzIHdoaWNoIGhhcyBhY2Nlc3MgdG8gdGhlIGJyb3dzZXIgaW5zdGFuY2UgYW5kIGNvbW11bmljYXRpb24gYnJpZGdlXG4gKiovXG5cbi8qIGdsb2JhbCBjaHJvbWUgKi9cblxuaW1wb3J0IEJyaWRnZSBmcm9tICcuL2JyaWRnZSdcbmltcG9ydCB7IGxpc3RlbkZvcldpbmRvd0V2ZW50cyB9IGZyb20gJy4vd2luZG93LWV2ZW50LWxpc3RlbmVyJ1xuaW1wb3J0IHJ1bkRldmxhbmRDb250ZW50U2NyaXB0IGZyb20gJy4uLy4uL3NyYy1iZXgvbXktY29udGVudC1zY3JpcHQnXG5cbmNvbnN0IHBvcnQgPSBjaHJvbWUucnVudGltZS5jb25uZWN0KHtcbiAgbmFtZTogJ2NvbnRlbnRTY3JpcHQnXG59KVxuXG5sZXQgZGlzY29ubmVjdGVkID0gZmFsc2VcbnBvcnQub25EaXNjb25uZWN0LmFkZExpc3RlbmVyKCgpID0+IHtcbiAgZGlzY29ubmVjdGVkID0gdHJ1ZVxufSlcblxubGV0IGJyaWRnZSA9IG5ldyBCcmlkZ2Uoe1xuICBsaXN0ZW4gKGZuKSB7XG4gICAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZm4pXG4gIH0sXG4gIHNlbmQgKGRhdGEpIHtcbiAgICBpZiAoIWRpc2Nvbm5lY3RlZCkge1xuICAgICAgcG9ydC5wb3N0TWVzc2FnZShkYXRhKVxuICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgZnJvbTogJ2JleC1jb250ZW50LXNjcmlwdCdcbiAgICAgIH0sICcqJylcbiAgICB9XG4gIH1cbn0pXG5cbi8vIEluamVjdCBvdXIgZG9tIHNjcmlwdCBmb3IgY29tbXVuaWNhdGlvbnMuXG5mdW5jdGlvbiBpbmplY3RTY3JpcHQgKHVybCkge1xuICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICBzY3JpcHQuc3JjID0gdXJsXG4gIHNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5yZW1vdmUoKVxuICB9XG4gIDsoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmFwcGVuZENoaWxkKHNjcmlwdClcbn1cblxuaWYgKGRvY3VtZW50IGluc3RhbmNlb2YgSFRNTERvY3VtZW50KSB7XG4gIGluamVjdFNjcmlwdChjaHJvbWUucnVudGltZS5nZXRVUkwoJ2RvbS5qcycpKVxufVxuXG4vLyBMaXN0ZW4gZm9yIGV2ZW50IGZyb20gdGhlIHdlYiBwYWdlXG5saXN0ZW5Gb3JXaW5kb3dFdmVudHMoYnJpZGdlLCAnYmV4LWRvbScpXG5cbnJ1bkRldmxhbmRDb250ZW50U2NyaXB0KGJyaWRnZSlcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUF1QkEsVUFBSSxJQUFJLE9BQU8sWUFBWSxXQUFXLFVBQVU7QUFDaEQsVUFBSSxlQUFlLEtBQUssT0FBTyxFQUFFLFVBQVUsYUFDdkMsRUFBRSxRQUNGLFNBQVNBLGNBQWEsUUFBUSxVQUFVLE1BQU07QUFDOUMsZUFBTyxTQUFTLFVBQVUsTUFBTSxLQUFLLFFBQVEsVUFBVSxJQUFJO0FBQUEsTUFDN0Q7QUFFRixVQUFJO0FBQ0os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RSxHQUFHLEVBQUU7QUFBQSxNQUNsRCxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7OztBRXZLTyxNQUFNLHdCQUF3QixDQUFDRSxTQUFRLFNBQVM7QUFFckQsV0FBTyxpQkFBaUIsV0FBVyxhQUFXO0FBRTVDLFVBQUksUUFBUSxXQUFXLFFBQVE7QUFDN0I7QUFBQSxNQUNGO0FBRUEsVUFBSSxRQUFRLEtBQUssU0FBUyxVQUFVLFFBQVEsS0FBSyxTQUFTLE1BQU07QUFDOUQsY0FDRSxZQUFZLFFBQVEsS0FBSyxJQUN6QixlQUFlQSxRQUFPLFVBQVU7QUFFbEMsaUJBQVMsU0FBUyxjQUFjO0FBQzlCLGNBQUksVUFBVSxVQUFVLE9BQU87QUFDN0IseUJBQWEsT0FBTyxVQUFVLE9BQU87QUFBQSxVQUN2QztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixHQUFHLEtBQUs7QUFBQSxFQUNWOzs7QUM3QkEsd0JBQTJCO0FBRTNCLE1BQU8sZ0NBQVEsNEJBQVcsTUFBa0I7QUFBQSxFQWM1QyxDQUFDOzs7QUNKRCxNQUFNLE9BQU8sT0FBTyxRQUFRLFFBQVE7QUFBQSxJQUNsQyxNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsTUFBSSxlQUFlO0FBQ25CLE9BQUssYUFBYSxZQUFZLE1BQU07QUFDbEMsbUJBQWU7QUFBQSxFQUNqQixDQUFDO0FBRUQsTUFBSSxTQUFTLElBQUksT0FBTztBQUFBLElBQ3RCLE9BQVEsSUFBSTtBQUNWLFdBQUssVUFBVSxZQUFZLEVBQUU7QUFBQSxJQUMvQjtBQUFBLElBQ0EsS0FBTSxNQUFNO0FBQ1YsVUFBSSxDQUFDLGNBQWM7QUFDakIsYUFBSyxZQUFZLElBQUk7QUFDckIsZUFBTyxZQUFZO0FBQUEsVUFDakIsR0FBRztBQUFBLFVBQ0gsTUFBTTtBQUFBLFFBQ1IsR0FBRyxHQUFHO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFHRCxXQUFTLGFBQWMsS0FBSztBQUMxQixVQUFNLFNBQVMsU0FBUyxjQUFjLFFBQVE7QUFDOUMsV0FBTyxNQUFNO0FBQ2IsV0FBTyxTQUFTLFdBQVk7QUFDMUIsV0FBSyxPQUFPO0FBQUEsSUFDZDtBQUNDLEtBQUMsU0FBUyxRQUFRLFNBQVMsaUJBQWlCLFlBQVksTUFBTTtBQUFBLEVBQ2pFO0FBRUEsTUFBSSxvQkFBb0IsY0FBYztBQUNwQyxpQkFBYSxPQUFPLFFBQVEsT0FBTyxRQUFRLENBQUM7QUFBQSxFQUM5QztBQUdBLHdCQUFzQixRQUFRLFNBQVM7QUFFdkMsNEJBQXdCLE1BQU07IiwKICAibmFtZXMiOiBbIlJlZmxlY3RBcHBseSIsICJSZWZsZWN0T3duS2V5cyIsICJOdW1iZXJJc05hTiIsICJFdmVudEVtaXR0ZXIiLCAib25jZSIsICJicmlkZ2UiXQp9Cg==
