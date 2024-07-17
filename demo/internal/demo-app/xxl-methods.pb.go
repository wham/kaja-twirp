// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.34.2
// 	protoc        v5.27.2
// source: xxl-methods.proto

package demo_app

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Request struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *Request) Reset() {
	*x = Request{}
	if protoimpl.UnsafeEnabled {
		mi := &file_xxl_methods_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Request) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Request) ProtoMessage() {}

func (x *Request) ProtoReflect() protoreflect.Message {
	mi := &file_xxl_methods_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Request.ProtoReflect.Descriptor instead.
func (*Request) Descriptor() ([]byte, []int) {
	return file_xxl_methods_proto_rawDescGZIP(), []int{0}
}

type Response struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *Response) Reset() {
	*x = Response{}
	if protoimpl.UnsafeEnabled {
		mi := &file_xxl_methods_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Response) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Response) ProtoMessage() {}

func (x *Response) ProtoReflect() protoreflect.Message {
	mi := &file_xxl_methods_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Response.ProtoReflect.Descriptor instead.
func (*Response) Descriptor() ([]byte, []int) {
	return file_xxl_methods_proto_rawDescGZIP(), []int{1}
}

var File_xxl_methods_proto protoreflect.FileDescriptor

var file_xxl_methods_proto_rawDesc = []byte{
	0x0a, 0x11, 0x78, 0x78, 0x6c, 0x2d, 0x6d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x73, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x22, 0x09, 0x0a, 0x07, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x0a,
	0x0a, 0x08, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x32, 0xbf, 0x05, 0x0a, 0x0a, 0x58,
	0x58, 0x4c, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x73, 0x12, 0x20, 0x0a, 0x07, 0x4d, 0x65, 0x74,
	0x68, 0x6f, 0x64, 0x31, 0x12, 0x08, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x09,
	0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x20, 0x0a, 0x07, 0x4d,
	0x65, 0x74, 0x68, 0x6f, 0x64, 0x32, 0x12, 0x08, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x1a, 0x09, 0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x20, 0x0a,
	0x07, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x33, 0x12, 0x08, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x1a, 0x09, 0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12,
	0x20, 0x0a, 0x07, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x34, 0x12, 0x08, 0x2e, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x1a, 0x09, 0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22,
	0x00, 0x12, 0x20, 0x0a, 0x07, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x35, 0x12, 0x08, 0x2e, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x09, 0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x22, 0x00, 0x12, 0x20, 0x0a, 0x07, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x36, 0x12, 0x08,
	0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x09, 0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x20, 0x0a, 0x07, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x37,
	0x12, 0x08, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x09, 0x2e, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x20, 0x0a, 0x07, 0x4d, 0x65, 0x74, 0x68, 0x6f,
	0x64, 0x38, 0x12, 0x08, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x09, 0x2e, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x20, 0x0a, 0x07, 0x4d, 0x65, 0x74,
	0x68, 0x6f, 0x64, 0x39, 0x12, 0x08, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x09,
	0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x21, 0x0a, 0x08, 0x4d,
	0x65, 0x74, 0x68, 0x6f, 0x64, 0x31, 0x30, 0x12, 0x08, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x1a, 0x09, 0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x21,
	0x0a, 0x08, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x31, 0x31, 0x12, 0x08, 0x2e, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x1a, 0x09, 0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22,
	0x00, 0x12, 0x21, 0x0a, 0x08, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x31, 0x32, 0x12, 0x08, 0x2e,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x09, 0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x22, 0x00, 0x12, 0x21, 0x0a, 0x08, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x31, 0x33,
	0x12, 0x08, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x09, 0x2e, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x21, 0x0a, 0x08, 0x4d, 0x65, 0x74, 0x68, 0x6f,
	0x64, 0x31, 0x34, 0x12, 0x08, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x09, 0x2e,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x21, 0x0a, 0x08, 0x4d, 0x65,
	0x74, 0x68, 0x6f, 0x64, 0x31, 0x35, 0x12, 0x08, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x1a, 0x09, 0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x21, 0x0a,
	0x08, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x31, 0x36, 0x12, 0x08, 0x2e, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x1a, 0x09, 0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00,
	0x12, 0x21, 0x0a, 0x08, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x31, 0x37, 0x12, 0x08, 0x2e, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x09, 0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x22, 0x00, 0x12, 0x21, 0x0a, 0x08, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x31, 0x38, 0x12,
	0x08, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x09, 0x2e, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x21, 0x0a, 0x08, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64,
	0x31, 0x39, 0x12, 0x08, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x09, 0x2e, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x21, 0x0a, 0x08, 0x4d, 0x65, 0x74,
	0x68, 0x6f, 0x64, 0x32, 0x30, 0x12, 0x08, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a,
	0x09, 0x2e, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x42, 0x13, 0x5a, 0x11,
	0x69, 0x6e, 0x74, 0x65, 0x72, 0x6e, 0x61, 0x6c, 0x2f, 0x64, 0x65, 0x6d, 0x6f, 0x2d, 0x61, 0x70,
	0x70, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_xxl_methods_proto_rawDescOnce sync.Once
	file_xxl_methods_proto_rawDescData = file_xxl_methods_proto_rawDesc
)

func file_xxl_methods_proto_rawDescGZIP() []byte {
	file_xxl_methods_proto_rawDescOnce.Do(func() {
		file_xxl_methods_proto_rawDescData = protoimpl.X.CompressGZIP(file_xxl_methods_proto_rawDescData)
	})
	return file_xxl_methods_proto_rawDescData
}

var file_xxl_methods_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_xxl_methods_proto_goTypes = []any{
	(*Request)(nil),  // 0: Request
	(*Response)(nil), // 1: Response
}
var file_xxl_methods_proto_depIdxs = []int32{
	0,  // 0: XXLMethods.Method1:input_type -> Request
	0,  // 1: XXLMethods.Method2:input_type -> Request
	0,  // 2: XXLMethods.Method3:input_type -> Request
	0,  // 3: XXLMethods.Method4:input_type -> Request
	0,  // 4: XXLMethods.Method5:input_type -> Request
	0,  // 5: XXLMethods.Method6:input_type -> Request
	0,  // 6: XXLMethods.Method7:input_type -> Request
	0,  // 7: XXLMethods.Method8:input_type -> Request
	0,  // 8: XXLMethods.Method9:input_type -> Request
	0,  // 9: XXLMethods.Method10:input_type -> Request
	0,  // 10: XXLMethods.Method11:input_type -> Request
	0,  // 11: XXLMethods.Method12:input_type -> Request
	0,  // 12: XXLMethods.Method13:input_type -> Request
	0,  // 13: XXLMethods.Method14:input_type -> Request
	0,  // 14: XXLMethods.Method15:input_type -> Request
	0,  // 15: XXLMethods.Method16:input_type -> Request
	0,  // 16: XXLMethods.Method17:input_type -> Request
	0,  // 17: XXLMethods.Method18:input_type -> Request
	0,  // 18: XXLMethods.Method19:input_type -> Request
	0,  // 19: XXLMethods.Method20:input_type -> Request
	1,  // 20: XXLMethods.Method1:output_type -> Response
	1,  // 21: XXLMethods.Method2:output_type -> Response
	1,  // 22: XXLMethods.Method3:output_type -> Response
	1,  // 23: XXLMethods.Method4:output_type -> Response
	1,  // 24: XXLMethods.Method5:output_type -> Response
	1,  // 25: XXLMethods.Method6:output_type -> Response
	1,  // 26: XXLMethods.Method7:output_type -> Response
	1,  // 27: XXLMethods.Method8:output_type -> Response
	1,  // 28: XXLMethods.Method9:output_type -> Response
	1,  // 29: XXLMethods.Method10:output_type -> Response
	1,  // 30: XXLMethods.Method11:output_type -> Response
	1,  // 31: XXLMethods.Method12:output_type -> Response
	1,  // 32: XXLMethods.Method13:output_type -> Response
	1,  // 33: XXLMethods.Method14:output_type -> Response
	1,  // 34: XXLMethods.Method15:output_type -> Response
	1,  // 35: XXLMethods.Method16:output_type -> Response
	1,  // 36: XXLMethods.Method17:output_type -> Response
	1,  // 37: XXLMethods.Method18:output_type -> Response
	1,  // 38: XXLMethods.Method19:output_type -> Response
	1,  // 39: XXLMethods.Method20:output_type -> Response
	20, // [20:40] is the sub-list for method output_type
	0,  // [0:20] is the sub-list for method input_type
	0,  // [0:0] is the sub-list for extension type_name
	0,  // [0:0] is the sub-list for extension extendee
	0,  // [0:0] is the sub-list for field type_name
}

func init() { file_xxl_methods_proto_init() }
func file_xxl_methods_proto_init() {
	if File_xxl_methods_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_xxl_methods_proto_msgTypes[0].Exporter = func(v any, i int) any {
			switch v := v.(*Request); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_xxl_methods_proto_msgTypes[1].Exporter = func(v any, i int) any {
			switch v := v.(*Response); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_xxl_methods_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_xxl_methods_proto_goTypes,
		DependencyIndexes: file_xxl_methods_proto_depIdxs,
		MessageInfos:      file_xxl_methods_proto_msgTypes,
	}.Build()
	File_xxl_methods_proto = out.File
	file_xxl_methods_proto_rawDesc = nil
	file_xxl_methods_proto_goTypes = nil
	file_xxl_methods_proto_depIdxs = nil
}
