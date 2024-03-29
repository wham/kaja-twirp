// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.26.0
// 	protoc        v3.21.12
// source: quirks.proto

package demo_app

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type RepeatedRequest_Enum int32

const (
	RepeatedRequest_KEY_0 RepeatedRequest_Enum = 0
	RepeatedRequest_KEY_1 RepeatedRequest_Enum = 1
)

// Enum value maps for RepeatedRequest_Enum.
var (
	RepeatedRequest_Enum_name = map[int32]string{
		0: "KEY_0",
		1: "KEY_1",
	}
	RepeatedRequest_Enum_value = map[string]int32{
		"KEY_0": 0,
		"KEY_1": 1,
	}
)

func (x RepeatedRequest_Enum) Enum() *RepeatedRequest_Enum {
	p := new(RepeatedRequest_Enum)
	*p = x
	return p
}

func (x RepeatedRequest_Enum) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (RepeatedRequest_Enum) Descriptor() protoreflect.EnumDescriptor {
	return file_quirks_proto_enumTypes[0].Descriptor()
}

func (RepeatedRequest_Enum) Type() protoreflect.EnumType {
	return &file_quirks_proto_enumTypes[0]
}

func (x RepeatedRequest_Enum) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use RepeatedRequest_Enum.Descriptor instead.
func (RepeatedRequest_Enum) EnumDescriptor() ([]byte, []int) {
	return file_quirks_proto_rawDescGZIP(), []int{2, 0}
}

type MapRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	StringString         map[string]string                     `protobuf:"bytes,1,rep,name=string_string,json=stringString,proto3" json:"string_string,omitempty" protobuf_key:"bytes,1,opt,name=key,proto3" protobuf_val:"bytes,2,opt,name=value,proto3"`
	StringInt32          map[string]int32                      `protobuf:"bytes,2,rep,name=string_int32,json=stringInt32,proto3" json:"string_int32,omitempty" protobuf_key:"bytes,1,opt,name=key,proto3" protobuf_val:"varint,2,opt,name=value,proto3"`
	Sint64String         map[int64]string                      `protobuf:"bytes,3,rep,name=sint64_string,json=sint64String,proto3" json:"sint64_string,omitempty" protobuf_key:"zigzag64,1,opt,name=key,proto3" protobuf_val:"bytes,2,opt,name=value,proto3"`
	StringRepeatedString map[string]*MapRequest_RepeatedString `protobuf:"bytes,4,rep,name=string_repeated_string,json=stringRepeatedString,proto3" json:"string_repeated_string,omitempty" protobuf_key:"bytes,1,opt,name=key,proto3" protobuf_val:"bytes,2,opt,name=value,proto3"`
}

func (x *MapRequest) Reset() {
	*x = MapRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_quirks_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MapRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MapRequest) ProtoMessage() {}

func (x *MapRequest) ProtoReflect() protoreflect.Message {
	mi := &file_quirks_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MapRequest.ProtoReflect.Descriptor instead.
func (*MapRequest) Descriptor() ([]byte, []int) {
	return file_quirks_proto_rawDescGZIP(), []int{0}
}

func (x *MapRequest) GetStringString() map[string]string {
	if x != nil {
		return x.StringString
	}
	return nil
}

func (x *MapRequest) GetStringInt32() map[string]int32 {
	if x != nil {
		return x.StringInt32
	}
	return nil
}

func (x *MapRequest) GetSint64String() map[int64]string {
	if x != nil {
		return x.Sint64String
	}
	return nil
}

func (x *MapRequest) GetStringRepeatedString() map[string]*MapRequest_RepeatedString {
	if x != nil {
		return x.StringRepeatedString
	}
	return nil
}

type Message struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
}

func (x *Message) Reset() {
	*x = Message{}
	if protoimpl.UnsafeEnabled {
		mi := &file_quirks_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Message) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Message) ProtoMessage() {}

func (x *Message) ProtoReflect() protoreflect.Message {
	mi := &file_quirks_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Message.ProtoReflect.Descriptor instead.
func (*Message) Descriptor() ([]byte, []int) {
	return file_quirks_proto_rawDescGZIP(), []int{1}
}

func (x *Message) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

type RepeatedRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	String_ []string               `protobuf:"bytes,1,rep,name=string,proto3" json:"string,omitempty"`
	Int32   []int32                `protobuf:"varint,2,rep,packed,name=int32,proto3" json:"int32,omitempty"`
	Enum    []RepeatedRequest_Enum `protobuf:"varint,3,rep,packed,name=enum,proto3,enum=quirks.v1.RepeatedRequest_Enum" json:"enum,omitempty"`
	Message []*Message             `protobuf:"bytes,4,rep,name=message,proto3" json:"message,omitempty"`
}

func (x *RepeatedRequest) Reset() {
	*x = RepeatedRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_quirks_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RepeatedRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RepeatedRequest) ProtoMessage() {}

func (x *RepeatedRequest) ProtoReflect() protoreflect.Message {
	mi := &file_quirks_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RepeatedRequest.ProtoReflect.Descriptor instead.
func (*RepeatedRequest) Descriptor() ([]byte, []int) {
	return file_quirks_proto_rawDescGZIP(), []int{2}
}

func (x *RepeatedRequest) GetString_() []string {
	if x != nil {
		return x.String_
	}
	return nil
}

func (x *RepeatedRequest) GetInt32() []int32 {
	if x != nil {
		return x.Int32
	}
	return nil
}

func (x *RepeatedRequest) GetEnum() []RepeatedRequest_Enum {
	if x != nil {
		return x.Enum
	}
	return nil
}

func (x *RepeatedRequest) GetMessage() []*Message {
	if x != nil {
		return x.Message
	}
	return nil
}

type TypesRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Timestamp *timestamppb.Timestamp `protobuf:"bytes,1,opt,name=timestamp,proto3" json:"timestamp,omitempty"`
	Bool      bool                   `protobuf:"varint,2,opt,name=bool,proto3" json:"bool,omitempty"`
}

func (x *TypesRequest) Reset() {
	*x = TypesRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_quirks_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *TypesRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TypesRequest) ProtoMessage() {}

func (x *TypesRequest) ProtoReflect() protoreflect.Message {
	mi := &file_quirks_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TypesRequest.ProtoReflect.Descriptor instead.
func (*TypesRequest) Descriptor() ([]byte, []int) {
	return file_quirks_proto_rawDescGZIP(), []int{3}
}

func (x *TypesRequest) GetTimestamp() *timestamppb.Timestamp {
	if x != nil {
		return x.Timestamp
	}
	return nil
}

func (x *TypesRequest) GetBool() bool {
	if x != nil {
		return x.Bool
	}
	return false
}

type Void struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *Void) Reset() {
	*x = Void{}
	if protoimpl.UnsafeEnabled {
		mi := &file_quirks_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Void) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Void) ProtoMessage() {}

func (x *Void) ProtoReflect() protoreflect.Message {
	mi := &file_quirks_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Void.ProtoReflect.Descriptor instead.
func (*Void) Descriptor() ([]byte, []int) {
	return file_quirks_proto_rawDescGZIP(), []int{4}
}

type MapRequest_RepeatedString struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Value []string `protobuf:"bytes,1,rep,name=value,proto3" json:"value,omitempty"`
}

func (x *MapRequest_RepeatedString) Reset() {
	*x = MapRequest_RepeatedString{}
	if protoimpl.UnsafeEnabled {
		mi := &file_quirks_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MapRequest_RepeatedString) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MapRequest_RepeatedString) ProtoMessage() {}

func (x *MapRequest_RepeatedString) ProtoReflect() protoreflect.Message {
	mi := &file_quirks_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MapRequest_RepeatedString.ProtoReflect.Descriptor instead.
func (*MapRequest_RepeatedString) Descriptor() ([]byte, []int) {
	return file_quirks_proto_rawDescGZIP(), []int{0, 0}
}

func (x *MapRequest_RepeatedString) GetValue() []string {
	if x != nil {
		return x.Value
	}
	return nil
}

var File_quirks_proto protoreflect.FileDescriptor

var file_quirks_proto_rawDesc = []byte{
	0x0a, 0x0c, 0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x09,
	0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31, 0x1a, 0x1f, 0x67, 0x6f, 0x6f, 0x67, 0x6c,
	0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74, 0x69, 0x6d, 0x65, 0x73,
	0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0xb3, 0x05, 0x0a, 0x0a, 0x4d,
	0x61, 0x70, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x4c, 0x0a, 0x0d, 0x73, 0x74, 0x72,
	0x69, 0x6e, 0x67, 0x5f, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b,
	0x32, 0x27, 0x2e, 0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e, 0x4d, 0x61, 0x70,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x2e, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x53, 0x74,
	0x72, 0x69, 0x6e, 0x67, 0x45, 0x6e, 0x74, 0x72, 0x79, 0x52, 0x0c, 0x73, 0x74, 0x72, 0x69, 0x6e,
	0x67, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x12, 0x49, 0x0a, 0x0c, 0x73, 0x74, 0x72, 0x69, 0x6e,
	0x67, 0x5f, 0x69, 0x6e, 0x74, 0x33, 0x32, 0x18, 0x02, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x26, 0x2e,
	0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e, 0x4d, 0x61, 0x70, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x2e, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x49, 0x6e, 0x74, 0x33, 0x32,
	0x45, 0x6e, 0x74, 0x72, 0x79, 0x52, 0x0b, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x49, 0x6e, 0x74,
	0x33, 0x32, 0x12, 0x4c, 0x0a, 0x0d, 0x73, 0x69, 0x6e, 0x74, 0x36, 0x34, 0x5f, 0x73, 0x74, 0x72,
	0x69, 0x6e, 0x67, 0x18, 0x03, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x27, 0x2e, 0x71, 0x75, 0x69, 0x72,
	0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e, 0x4d, 0x61, 0x70, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x2e, 0x53, 0x69, 0x6e, 0x74, 0x36, 0x34, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x45, 0x6e, 0x74,
	0x72, 0x79, 0x52, 0x0c, 0x73, 0x69, 0x6e, 0x74, 0x36, 0x34, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67,
	0x12, 0x65, 0x0a, 0x16, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x5f, 0x72, 0x65, 0x70, 0x65, 0x61,
	0x74, 0x65, 0x64, 0x5f, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x18, 0x04, 0x20, 0x03, 0x28, 0x0b,
	0x32, 0x2f, 0x2e, 0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e, 0x4d, 0x61, 0x70,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x2e, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x52, 0x65,
	0x70, 0x65, 0x61, 0x74, 0x65, 0x64, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x45, 0x6e, 0x74, 0x72,
	0x79, 0x52, 0x14, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x52, 0x65, 0x70, 0x65, 0x61, 0x74, 0x65,
	0x64, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x1a, 0x26, 0x0a, 0x0e, 0x52, 0x65, 0x70, 0x65, 0x61,
	0x74, 0x65, 0x64, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x12, 0x14, 0x0a, 0x05, 0x76, 0x61, 0x6c,
	0x75, 0x65, 0x18, 0x01, 0x20, 0x03, 0x28, 0x09, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x1a,
	0x3f, 0x0a, 0x11, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x45,
	0x6e, 0x74, 0x72, 0x79, 0x12, 0x10, 0x0a, 0x03, 0x6b, 0x65, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x12, 0x14, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x3a, 0x02, 0x38, 0x01,
	0x1a, 0x3e, 0x0a, 0x10, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x49, 0x6e, 0x74, 0x33, 0x32, 0x45,
	0x6e, 0x74, 0x72, 0x79, 0x12, 0x10, 0x0a, 0x03, 0x6b, 0x65, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x12, 0x14, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x05, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x3a, 0x02, 0x38, 0x01,
	0x1a, 0x3f, 0x0a, 0x11, 0x53, 0x69, 0x6e, 0x74, 0x36, 0x34, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67,
	0x45, 0x6e, 0x74, 0x72, 0x79, 0x12, 0x10, 0x0a, 0x03, 0x6b, 0x65, 0x79, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x12, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x12, 0x14, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x3a, 0x02, 0x38,
	0x01, 0x1a, 0x6d, 0x0a, 0x19, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x52, 0x65, 0x70, 0x65, 0x61,
	0x74, 0x65, 0x64, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x45, 0x6e, 0x74, 0x72, 0x79, 0x12, 0x10,
	0x0a, 0x03, 0x6b, 0x65, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x6b, 0x65, 0x79,
	0x12, 0x3a, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32,
	0x24, 0x2e, 0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e, 0x4d, 0x61, 0x70, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x2e, 0x52, 0x65, 0x70, 0x65, 0x61, 0x74, 0x65, 0x64, 0x53,
	0x74, 0x72, 0x69, 0x6e, 0x67, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x3a, 0x02, 0x38, 0x01,
	0x22, 0x1d, 0x0a, 0x07, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x6e,
	0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x22,
	0xc0, 0x01, 0x0a, 0x0f, 0x52, 0x65, 0x70, 0x65, 0x61, 0x74, 0x65, 0x64, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x12, 0x16, 0x0a, 0x06, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x18, 0x01, 0x20,
	0x03, 0x28, 0x09, 0x52, 0x06, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x12, 0x14, 0x0a, 0x05, 0x69,
	0x6e, 0x74, 0x33, 0x32, 0x18, 0x02, 0x20, 0x03, 0x28, 0x05, 0x52, 0x05, 0x69, 0x6e, 0x74, 0x33,
	0x32, 0x12, 0x33, 0x0a, 0x04, 0x65, 0x6e, 0x75, 0x6d, 0x18, 0x03, 0x20, 0x03, 0x28, 0x0e, 0x32,
	0x1f, 0x2e, 0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e, 0x52, 0x65, 0x70, 0x65,
	0x61, 0x74, 0x65, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x2e, 0x45, 0x6e, 0x75, 0x6d,
	0x52, 0x04, 0x65, 0x6e, 0x75, 0x6d, 0x12, 0x2c, 0x0a, 0x07, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67,
	0x65, 0x18, 0x04, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x71, 0x75, 0x69, 0x72, 0x6b, 0x73,
	0x2e, 0x76, 0x31, 0x2e, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x52, 0x07, 0x6d, 0x65, 0x73,
	0x73, 0x61, 0x67, 0x65, 0x22, 0x1c, 0x0a, 0x04, 0x45, 0x6e, 0x75, 0x6d, 0x12, 0x09, 0x0a, 0x05,
	0x4b, 0x45, 0x59, 0x5f, 0x30, 0x10, 0x00, 0x12, 0x09, 0x0a, 0x05, 0x4b, 0x45, 0x59, 0x5f, 0x31,
	0x10, 0x01, 0x22, 0x5c, 0x0a, 0x0c, 0x54, 0x79, 0x70, 0x65, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x12, 0x38, 0x0a, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d,
	0x70, 0x52, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x12, 0x12, 0x0a, 0x04,
	0x62, 0x6f, 0x6f, 0x6c, 0x18, 0x02, 0x20, 0x01, 0x28, 0x08, 0x52, 0x04, 0x62, 0x6f, 0x6f, 0x6c,
	0x22, 0x06, 0x0a, 0x04, 0x56, 0x6f, 0x69, 0x64, 0x32, 0xfa, 0x02, 0x0a, 0x06, 0x51, 0x75, 0x69,
	0x72, 0x6b, 0x73, 0x12, 0x38, 0x0a, 0x11, 0x47, 0x65, 0x74, 0x41, 0x75, 0x74, 0x68, 0x65, 0x6e,
	0x74, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x0f, 0x2e, 0x71, 0x75, 0x69, 0x72, 0x6b,
	0x73, 0x2e, 0x76, 0x31, 0x2e, 0x56, 0x6f, 0x69, 0x64, 0x1a, 0x12, 0x2e, 0x71, 0x75, 0x69, 0x72,
	0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12, 0x33, 0x0a,
	0x03, 0x4d, 0x61, 0x70, 0x12, 0x15, 0x2e, 0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31,
	0x2e, 0x4d, 0x61, 0x70, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x15, 0x2e, 0x71, 0x75,
	0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e, 0x4d, 0x61, 0x70, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x12, 0x54, 0x0a, 0x2d, 0x4d, 0x65, 0x74, 0x68, 0x6f, 0x64, 0x57, 0x69, 0x74, 0x68,
	0x41, 0x52, 0x65, 0x61, 0x6c, 0x6c, 0x79, 0x4c, 0x6f, 0x6e, 0x67, 0x4e, 0x61, 0x6d, 0x65, 0x47,
	0x6d, 0x74, 0x68, 0x67, 0x67, 0x75, 0x70, 0x63, 0x62, 0x6d, 0x6e, 0x70, 0x68, 0x66, 0x6c, 0x6e,
	0x6e, 0x76, 0x75, 0x12, 0x0f, 0x2e, 0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e,
	0x56, 0x6f, 0x69, 0x64, 0x1a, 0x12, 0x2e, 0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31,
	0x2e, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12, 0x2c, 0x0a, 0x05, 0x50, 0x61, 0x6e, 0x69,
	0x63, 0x12, 0x0f, 0x2e, 0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e, 0x56, 0x6f,
	0x69, 0x64, 0x1a, 0x12, 0x2e, 0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e, 0x4d,
	0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12, 0x42, 0x0a, 0x08, 0x52, 0x65, 0x70, 0x65, 0x61, 0x74,
	0x65, 0x64, 0x12, 0x1a, 0x2e, 0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e, 0x52,
	0x65, 0x70, 0x65, 0x61, 0x74, 0x65, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1a,
	0x2e, 0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e, 0x52, 0x65, 0x70, 0x65, 0x61,
	0x74, 0x65, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x39, 0x0a, 0x05, 0x54, 0x79,
	0x70, 0x65, 0x73, 0x12, 0x17, 0x2e, 0x71, 0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e,
	0x54, 0x79, 0x70, 0x65, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x17, 0x2e, 0x71,
	0x75, 0x69, 0x72, 0x6b, 0x73, 0x2e, 0x76, 0x31, 0x2e, 0x54, 0x79, 0x70, 0x65, 0x73, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x42, 0x13, 0x5a, 0x11, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x6e, 0x61,
	0x6c, 0x2f, 0x64, 0x65, 0x6d, 0x6f, 0x2d, 0x61, 0x70, 0x70, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x33,
}

var (
	file_quirks_proto_rawDescOnce sync.Once
	file_quirks_proto_rawDescData = file_quirks_proto_rawDesc
)

func file_quirks_proto_rawDescGZIP() []byte {
	file_quirks_proto_rawDescOnce.Do(func() {
		file_quirks_proto_rawDescData = protoimpl.X.CompressGZIP(file_quirks_proto_rawDescData)
	})
	return file_quirks_proto_rawDescData
}

var file_quirks_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_quirks_proto_msgTypes = make([]protoimpl.MessageInfo, 10)
var file_quirks_proto_goTypes = []interface{}{
	(RepeatedRequest_Enum)(0),         // 0: quirks.v1.RepeatedRequest.Enum
	(*MapRequest)(nil),                // 1: quirks.v1.MapRequest
	(*Message)(nil),                   // 2: quirks.v1.Message
	(*RepeatedRequest)(nil),           // 3: quirks.v1.RepeatedRequest
	(*TypesRequest)(nil),              // 4: quirks.v1.TypesRequest
	(*Void)(nil),                      // 5: quirks.v1.Void
	(*MapRequest_RepeatedString)(nil), // 6: quirks.v1.MapRequest.RepeatedString
	nil,                               // 7: quirks.v1.MapRequest.StringStringEntry
	nil,                               // 8: quirks.v1.MapRequest.StringInt32Entry
	nil,                               // 9: quirks.v1.MapRequest.Sint64StringEntry
	nil,                               // 10: quirks.v1.MapRequest.StringRepeatedStringEntry
	(*timestamppb.Timestamp)(nil),     // 11: google.protobuf.Timestamp
}
var file_quirks_proto_depIdxs = []int32{
	7,  // 0: quirks.v1.MapRequest.string_string:type_name -> quirks.v1.MapRequest.StringStringEntry
	8,  // 1: quirks.v1.MapRequest.string_int32:type_name -> quirks.v1.MapRequest.StringInt32Entry
	9,  // 2: quirks.v1.MapRequest.sint64_string:type_name -> quirks.v1.MapRequest.Sint64StringEntry
	10, // 3: quirks.v1.MapRequest.string_repeated_string:type_name -> quirks.v1.MapRequest.StringRepeatedStringEntry
	0,  // 4: quirks.v1.RepeatedRequest.enum:type_name -> quirks.v1.RepeatedRequest.Enum
	2,  // 5: quirks.v1.RepeatedRequest.message:type_name -> quirks.v1.Message
	11, // 6: quirks.v1.TypesRequest.timestamp:type_name -> google.protobuf.Timestamp
	6,  // 7: quirks.v1.MapRequest.StringRepeatedStringEntry.value:type_name -> quirks.v1.MapRequest.RepeatedString
	5,  // 8: quirks.v1.Quirks.GetAuthentication:input_type -> quirks.v1.Void
	1,  // 9: quirks.v1.Quirks.Map:input_type -> quirks.v1.MapRequest
	5,  // 10: quirks.v1.Quirks.MethodWithAReallyLongNameGmthggupcbmnphflnnvu:input_type -> quirks.v1.Void
	5,  // 11: quirks.v1.Quirks.Panic:input_type -> quirks.v1.Void
	3,  // 12: quirks.v1.Quirks.Repeated:input_type -> quirks.v1.RepeatedRequest
	4,  // 13: quirks.v1.Quirks.Types:input_type -> quirks.v1.TypesRequest
	2,  // 14: quirks.v1.Quirks.GetAuthentication:output_type -> quirks.v1.Message
	1,  // 15: quirks.v1.Quirks.Map:output_type -> quirks.v1.MapRequest
	2,  // 16: quirks.v1.Quirks.MethodWithAReallyLongNameGmthggupcbmnphflnnvu:output_type -> quirks.v1.Message
	2,  // 17: quirks.v1.Quirks.Panic:output_type -> quirks.v1.Message
	3,  // 18: quirks.v1.Quirks.Repeated:output_type -> quirks.v1.RepeatedRequest
	4,  // 19: quirks.v1.Quirks.Types:output_type -> quirks.v1.TypesRequest
	14, // [14:20] is the sub-list for method output_type
	8,  // [8:14] is the sub-list for method input_type
	8,  // [8:8] is the sub-list for extension type_name
	8,  // [8:8] is the sub-list for extension extendee
	0,  // [0:8] is the sub-list for field type_name
}

func init() { file_quirks_proto_init() }
func file_quirks_proto_init() {
	if File_quirks_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_quirks_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MapRequest); i {
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
		file_quirks_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Message); i {
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
		file_quirks_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RepeatedRequest); i {
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
		file_quirks_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*TypesRequest); i {
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
		file_quirks_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Void); i {
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
		file_quirks_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MapRequest_RepeatedString); i {
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
			RawDescriptor: file_quirks_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   10,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_quirks_proto_goTypes,
		DependencyIndexes: file_quirks_proto_depIdxs,
		EnumInfos:         file_quirks_proto_enumTypes,
		MessageInfos:      file_quirks_proto_msgTypes,
	}.Build()
	File_quirks_proto = out.File
	file_quirks_proto_rawDesc = nil
	file_quirks_proto_goTypes = nil
	file_quirks_proto_depIdxs = nil
}
