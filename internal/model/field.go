package model

import (
	"time"

	"google.golang.org/protobuf/reflect/protoreflect"
)

func FormatTime(Time time.Time) string {
	return Time.Format("2006-01-02") + "T00:00:00Z"
}

func GetDefaultValue(in protoreflect.FieldDescriptor) any {
	if in.Cardinality() == protoreflect.Repeated && !in.IsMap() {
		return []any{
			getSingleValue(in),
		}
	}

	return getSingleValue(in)
}

func getSingleValue(in protoreflect.FieldDescriptor) any {
	if in.Kind() == protoreflect.EnumKind || isNumericKind(in.Kind()) {
		return 0
	} else if in.Kind() == protoreflect.MessageKind {
		if in.Message().FullName() == "google.protobuf.Timestamp" {
			return  "google.protobuf.Timestamp"
		} else if in.IsMap() {
			k := in.MapKey()
			v := in.MapValue()

			if isStringKind(k.Kind()) {
				return map[string]any{
					"key": GetDefaultValue(v),
				}
			}

			if isNumericKind(k.Kind()) {
				return map[int]any{
					0: GetDefaultValue(v),
				}
			}
		} else {
			message := in.Message()
			j := map[string]any{}
	
			for i := 0; i < message.Fields().Len(); i++ {
				f := message.Fields().Get(i)
				j[string(f.Name())] = GetDefaultValue(f)
			}
	
			return j
		}
	}

	return ""
}


func isNumericKind(kind protoreflect.Kind) bool {
	return kind == protoreflect.Int32Kind ||
		kind == protoreflect.Sint32Kind ||
		kind == protoreflect.Uint32Kind ||
		kind == protoreflect.Int64Kind ||
		kind == protoreflect.Sint64Kind ||
		kind == protoreflect.Uint64Kind ||
		kind == protoreflect.Sfixed32Kind ||
		kind == protoreflect.Fixed32Kind ||
		kind == protoreflect.FloatKind ||
		kind == protoreflect.Sfixed64Kind ||
		kind == protoreflect.Fixed64Kind ||
		kind == protoreflect.DoubleKind
}

func isStringKind(kind protoreflect.Kind) bool {
	return kind == protoreflect.StringKind
}