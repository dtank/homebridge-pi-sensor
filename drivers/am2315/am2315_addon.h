#ifndef AM2315_ADDON_H
#define AM2315_ADDON_H

#include <node.h>
#include <node_object_wrap.h>

class AM2315 : public node::ObjectWrap {
public:
    static void Init(v8::Local<v8::Object> exports);

private:
    explicit AM2315();
    ~AM2315();

    static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
    static void Temperature(const v8::FunctionCallbackInfo<v8::Value>& args);
    static v8::Persistent<v8::Function> constructor;

    void *am2315;
    float temperature;

};

#endif
