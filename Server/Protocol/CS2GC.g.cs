// <auto-generated>
//     Generated by the protocol buffer compiler.  DO NOT EDIT!
//     source: CS2GC.proto
// </auto-generated>
#pragma warning disable 1591, 0612, 3021
#region Designer generated code

using pb = global::Google.Protobuf;
using pbc = global::Google.Protobuf.Collections;
using pbr = global::Google.Protobuf.Reflection;
using scg = global::System.Collections.Generic;
namespace Protos {

  /// <summary>Holder for reflection information generated from CS2GC.proto</summary>
  public static partial class CS2GCReflection {

    #region Descriptor
    /// <summary>File descriptor for CS2GC.proto</summary>
    public static pbr::FileDescriptor Descriptor {
      get { return descriptor; }
    }
    private static pbr::FileDescriptor descriptor;

    static CS2GCReflection() {
      byte[] descriptorData = global::System.Convert.FromBase64String(
          string.Concat(
            "CgtDUzJHQy5wcm90bxIGUHJvdG9zGgxHbG9iYWwucHJvdG8iXAoTQ1MyR0Nf",
            "QmVnaW5NYXRjaFJldBIdCgRvcHRzGAEgASgLMg8uUHJvdG9zLk1zZ09wdHMS",
            "JgoGcmVzdWx0GAIgASgOMhYuUHJvdG9zLkdsb2JhbC5FQ29tbW9uIlsKEUNT",
            "MkdDX0JlZ2luQmF0dGxlEh0KBG9wdHMYASABKAsyDy5Qcm90b3MuTXNnT3B0",
            "cxINCgVnc05JRBgCIAEoBBIKCgJpcBgDIAEoCRIMCgRwb3J0GAQgASgFYgZw",
            "cm90bzM="));
      descriptor = pbr::FileDescriptor.FromGeneratedCode(descriptorData,
          new pbr::FileDescriptor[] { global::Protos.GlobalReflection.Descriptor, },
          new pbr::GeneratedClrTypeInfo(null, new pbr::GeneratedClrTypeInfo[] {
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.CS2GC_BeginMatchRet), global::Protos.CS2GC_BeginMatchRet.Parser, new[]{ "Opts", "Result" }, null, null, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.CS2GC_BeginBattle), global::Protos.CS2GC_BeginBattle.Parser, new[]{ "Opts", "GsNID", "Ip", "Port" }, null, null, null)
          }));
    }
    #endregion

  }
  #region Messages
  /// <summary>
  ///匹配回应
  /// </summary>
  public sealed partial class CS2GC_BeginMatchRet : pb::IMessage<CS2GC_BeginMatchRet> {
    private static readonly pb::MessageParser<CS2GC_BeginMatchRet> _parser = new pb::MessageParser<CS2GC_BeginMatchRet>(() => new CS2GC_BeginMatchRet());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<CS2GC_BeginMatchRet> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.CS2GCReflection.Descriptor.MessageTypes[0]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public CS2GC_BeginMatchRet() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public CS2GC_BeginMatchRet(CS2GC_BeginMatchRet other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      result_ = other.result_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public CS2GC_BeginMatchRet Clone() {
      return new CS2GC_BeginMatchRet(this);
    }

    /// <summary>Field number for the "opts" field.</summary>
    public const int OptsFieldNumber = 1;
    private global::Protos.MsgOpts opts_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.MsgOpts Opts {
      get { return opts_; }
      set {
        opts_ = value;
      }
    }

    /// <summary>Field number for the "result" field.</summary>
    public const int ResultFieldNumber = 2;
    private global::Protos.Global.Types.ECommon result_ = 0;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.Global.Types.ECommon Result {
      get { return result_; }
      set {
        result_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as CS2GC_BeginMatchRet);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(CS2GC_BeginMatchRet other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (Result != other.Result) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (Result != 0) hash ^= Result.GetHashCode();
      if (_unknownFields != null) {
        hash ^= _unknownFields.GetHashCode();
      }
      return hash;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override string ToString() {
      return pb::JsonFormatter.ToDiagnosticString(this);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void WriteTo(pb::CodedOutputStream output) {
      if (opts_ != null) {
        output.WriteRawTag(10);
        output.WriteMessage(Opts);
      }
      if (Result != 0) {
        output.WriteRawTag(16);
        output.WriteEnum((int) Result);
      }
      if (_unknownFields != null) {
        _unknownFields.WriteTo(output);
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int CalculateSize() {
      int size = 0;
      if (opts_ != null) {
        size += 1 + pb::CodedOutputStream.ComputeMessageSize(Opts);
      }
      if (Result != 0) {
        size += 1 + pb::CodedOutputStream.ComputeEnumSize((int) Result);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(CS2GC_BeginMatchRet other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
      }
      if (other.Result != 0) {
        Result = other.Result;
      }
      _unknownFields = pb::UnknownFieldSet.MergeFrom(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(pb::CodedInputStream input) {
      uint tag;
      while ((tag = input.ReadTag()) != 0) {
        switch(tag) {
          default:
            _unknownFields = pb::UnknownFieldSet.MergeFieldFrom(_unknownFields, input);
            break;
          case 10: {
            if (opts_ == null) {
              opts_ = new global::Protos.MsgOpts();
            }
            input.ReadMessage(opts_);
            break;
          }
          case 16: {
            result_ = (global::Protos.Global.Types.ECommon) input.ReadEnum();
            break;
          }
        }
      }
    }

  }

  public sealed partial class CS2GC_BeginBattle : pb::IMessage<CS2GC_BeginBattle> {
    private static readonly pb::MessageParser<CS2GC_BeginBattle> _parser = new pb::MessageParser<CS2GC_BeginBattle>(() => new CS2GC_BeginBattle());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<CS2GC_BeginBattle> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.CS2GCReflection.Descriptor.MessageTypes[1]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public CS2GC_BeginBattle() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public CS2GC_BeginBattle(CS2GC_BeginBattle other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      gsNID_ = other.gsNID_;
      ip_ = other.ip_;
      port_ = other.port_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public CS2GC_BeginBattle Clone() {
      return new CS2GC_BeginBattle(this);
    }

    /// <summary>Field number for the "opts" field.</summary>
    public const int OptsFieldNumber = 1;
    private global::Protos.MsgOpts opts_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.MsgOpts Opts {
      get { return opts_; }
      set {
        opts_ = value;
      }
    }

    /// <summary>Field number for the "gsNID" field.</summary>
    public const int GsNIDFieldNumber = 2;
    private ulong gsNID_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public ulong GsNID {
      get { return gsNID_; }
      set {
        gsNID_ = value;
      }
    }

    /// <summary>Field number for the "ip" field.</summary>
    public const int IpFieldNumber = 3;
    private string ip_ = "";
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string Ip {
      get { return ip_; }
      set {
        ip_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    /// <summary>Field number for the "port" field.</summary>
    public const int PortFieldNumber = 4;
    private int port_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int Port {
      get { return port_; }
      set {
        port_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as CS2GC_BeginBattle);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(CS2GC_BeginBattle other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (GsNID != other.GsNID) return false;
      if (Ip != other.Ip) return false;
      if (Port != other.Port) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (GsNID != 0UL) hash ^= GsNID.GetHashCode();
      if (Ip.Length != 0) hash ^= Ip.GetHashCode();
      if (Port != 0) hash ^= Port.GetHashCode();
      if (_unknownFields != null) {
        hash ^= _unknownFields.GetHashCode();
      }
      return hash;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override string ToString() {
      return pb::JsonFormatter.ToDiagnosticString(this);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void WriteTo(pb::CodedOutputStream output) {
      if (opts_ != null) {
        output.WriteRawTag(10);
        output.WriteMessage(Opts);
      }
      if (GsNID != 0UL) {
        output.WriteRawTag(16);
        output.WriteUInt64(GsNID);
      }
      if (Ip.Length != 0) {
        output.WriteRawTag(26);
        output.WriteString(Ip);
      }
      if (Port != 0) {
        output.WriteRawTag(32);
        output.WriteInt32(Port);
      }
      if (_unknownFields != null) {
        _unknownFields.WriteTo(output);
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int CalculateSize() {
      int size = 0;
      if (opts_ != null) {
        size += 1 + pb::CodedOutputStream.ComputeMessageSize(Opts);
      }
      if (GsNID != 0UL) {
        size += 1 + pb::CodedOutputStream.ComputeUInt64Size(GsNID);
      }
      if (Ip.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(Ip);
      }
      if (Port != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(Port);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(CS2GC_BeginBattle other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
      }
      if (other.GsNID != 0UL) {
        GsNID = other.GsNID;
      }
      if (other.Ip.Length != 0) {
        Ip = other.Ip;
      }
      if (other.Port != 0) {
        Port = other.Port;
      }
      _unknownFields = pb::UnknownFieldSet.MergeFrom(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(pb::CodedInputStream input) {
      uint tag;
      while ((tag = input.ReadTag()) != 0) {
        switch(tag) {
          default:
            _unknownFields = pb::UnknownFieldSet.MergeFieldFrom(_unknownFields, input);
            break;
          case 10: {
            if (opts_ == null) {
              opts_ = new global::Protos.MsgOpts();
            }
            input.ReadMessage(opts_);
            break;
          }
          case 16: {
            GsNID = input.ReadUInt64();
            break;
          }
          case 26: {
            Ip = input.ReadString();
            break;
          }
          case 32: {
            Port = input.ReadInt32();
            break;
          }
        }
      }
    }

  }

  #endregion

}

#endregion Designer generated code
