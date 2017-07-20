#include <node.h>
#include "am2315_addon.h"
extern "C" {
    #include "am2315.h"
}

using namespace v8;

Persistent<Function> AM2315::constructor;
AM2315::AM2315() {
}
AM2315::~AM2315() {
}
void AM2315::Init(Local<Object> exports) {
    Isolate* isolate = exports->GetIsolate();

    // Prepare constructor template
    Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
    tpl->SetClassName(String::NewFromUtf8(isolate, "AM2315"));
    tpl->InstanceTemplate()->SetInternalFieldCount(1);

    // Prototype
    NODE_SET_PROTOTYPE_METHOD(tpl, "temperature", Temperature);
    NODE_SET_PROTOTYPE_METHOD(tpl, "humidity", Humidity);

    constructor.Reset(isolate, tpl->GetFunction());
    exports->Set(String::NewFromUtf8(isolate, "AM2315"), tpl->GetFunction());
}

void AM2315::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    if (args.IsConstructCall()) {
        // Invoked as constructor: `new AM2315(...)`
        AM2315* obj = new AM2315();
        obj->am2315 = am2315_init(0x5c, "/dev/i2c-1");
        obj->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    }
}
void AM2315::Temperature(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  AM2315* obj = ObjectWrap::Unwrap<AM2315>(args.Holder());
  obj->temperature = am2315_temperature(obj->am2315);
  args.GetReturnValue().Set(Number::New(isolate, obj->temperature));
}

void AM2315::Humidity(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  AM2315* obj = ObjectWrap::Unwrap<AM2315>(args.Holder());
  obj->humidity = am2315_humidity(obj->am2315);
  args.GetReturnValue().Set(Number::New(isolate, obj->humidity));
}

void RegisterModule(Local<Object> exports) {
    AM2315::Init(exports);
}

NODE_MODULE(am2315, RegisterModule)
