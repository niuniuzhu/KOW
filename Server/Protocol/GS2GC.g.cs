// <auto-generated>
//     Generated by the protocol buffer compiler.  DO NOT EDIT!
//     source: GS2GC.proto
// </auto-generated>
#pragma warning disable 1591, 0612, 3021
#region Designer generated code

using pb = global::Google.Protobuf;
using pbc = global::Google.Protobuf.Collections;
using pbr = global::Google.Protobuf.Reflection;
using scg = global::System.Collections.Generic;
namespace Protos {

  /// <summary>Holder for reflection information generated from GS2GC.proto</summary>
  public static partial class GS2GCReflection {

    #region Descriptor
    /// <summary>File descriptor for GS2GC.proto</summary>
    public static pbr::FileDescriptor Descriptor {
      get { return descriptor; }
    }
    private static pbr::FileDescriptor descriptor;

    static GS2GCReflection() {
      byte[] descriptorData = global::System.Convert.FromBase64String(
          string.Concat(
            "CgtHUzJHQy5wcm90bxIGUHJvdG9zGgxHbG9iYWwucHJvdG8aC0NTMkdTLnBy",
            "b3RvIo0CCg5HUzJHQ19Mb2dpblJldBIdCgRvcHRzGAEgASgLMg8uUHJvdG9z",
            "Lk1zZ09wdHMSLgoGcmVzdWx0GAIgASgOMh4uUHJvdG9zLkdTMkdDX0xvZ2lu",
            "UmV0LkVSZXN1bHQSMQoHZ2NTdGF0ZRgDIAEoDjIgLlByb3Rvcy5HUzJHQ19M",
            "b2dpblJldC5FR0NDU3RhdGUSDQoFZ2NOSUQYBCABKAQSDAoEYnNJUBgFIAEo",
            "CRIOCgZic1BvcnQYBiABKAUiKQoHRVJlc3VsdBILCgdTdWNjZXNzEAASEQoN",
            "U2Vzc2lvbkV4cGlyZRABIiEKCUVHQ0NTdGF0ZRIICgRJZGxlEAASCgoGQmF0",
            "dGxlEAEiWQoKR1MyR0NfS2ljaxIdCgRvcHRzGAEgASgLMg8uUHJvdG9zLk1z",
            "Z09wdHMSLAoGcmVhc29uGAIgASgOMhwuUHJvdG9zLkNTMkdTX0tpY2tHQy5F",
            "UmVhc29uYgZwcm90bzM="));
      descriptor = pbr::FileDescriptor.FromGeneratedCode(descriptorData,
          new pbr::FileDescriptor[] { global::Protos.GlobalReflection.Descriptor, global::Protos.CS2GSReflection.Descriptor, },
          new pbr::GeneratedClrTypeInfo(null, new pbr::GeneratedClrTypeInfo[] {
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.GS2GC_LoginRet), global::Protos.GS2GC_LoginRet.Parser, new[]{ "Opts", "Result", "GcState", "GcNID", "BsIP", "BsPort" }, null, new[]{ typeof(global::Protos.GS2GC_LoginRet.Types.EResult), typeof(global::Protos.GS2GC_LoginRet.Types.EGCCState) }, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.GS2GC_Kick), global::Protos.GS2GC_Kick.Parser, new[]{ "Opts", "Reason" }, null, null, null)
          }));
    }
    #endregion

  }
  #region Messages
  /// <summary>
  ///回应GC登陆请求
  ///参考CS2GS_GCLoginRet的结构
  /// </summary>
  public sealed partial class GS2GC_LoginRet : pb::IMessage<GS2GC_LoginRet> {
    private static readonly pb::MessageParser<GS2GC_LoginRet> _parser = new pb::MessageParser<GS2GC_LoginRet>(() => new GS2GC_LoginRet());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<GS2GC_LoginRet> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.GS2GCReflection.Descriptor.MessageTypes[0]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GS2GC_LoginRet() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GS2GC_LoginRet(GS2GC_LoginRet other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      result_ = other.result_;
      gcState_ = other.gcState_;
      gcNID_ = other.gcNID_;
      bsIP_ = other.bsIP_;
      bsPort_ = other.bsPort_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GS2GC_LoginRet Clone() {
      return new GS2GC_LoginRet(this);
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
    private global::Protos.GS2GC_LoginRet.Types.EResult result_ = 0;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.GS2GC_LoginRet.Types.EResult Result {
      get { return result_; }
      set {
        result_ = value;
      }
    }

    /// <summary>Field number for the "gcState" field.</summary>
    public const int GcStateFieldNumber = 3;
    private global::Protos.GS2GC_LoginRet.Types.EGCCState gcState_ = 0;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.GS2GC_LoginRet.Types.EGCCState GcState {
      get { return gcState_; }
      set {
        gcState_ = value;
      }
    }

    /// <summary>Field number for the "gcNID" field.</summary>
    public const int GcNIDFieldNumber = 4;
    private ulong gcNID_;
    /// <summary>
    ///登录bs时进行校验的id
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public ulong GcNID {
      get { return gcNID_; }
      set {
        gcNID_ = value;
      }
    }

    /// <summary>Field number for the "bsIP" field.</summary>
    public const int BsIPFieldNumber = 5;
    private string bsIP_ = "";
    /// <summary>
    ///bs ip
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string BsIP {
      get { return bsIP_; }
      set {
        bsIP_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    /// <summary>Field number for the "bsPort" field.</summary>
    public const int BsPortFieldNumber = 6;
    private int bsPort_;
    /// <summary>
    ///bs port
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int BsPort {
      get { return bsPort_; }
      set {
        bsPort_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as GS2GC_LoginRet);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(GS2GC_LoginRet other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (Result != other.Result) return false;
      if (GcState != other.GcState) return false;
      if (GcNID != other.GcNID) return false;
      if (BsIP != other.BsIP) return false;
      if (BsPort != other.BsPort) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (Result != 0) hash ^= Result.GetHashCode();
      if (GcState != 0) hash ^= GcState.GetHashCode();
      if (GcNID != 0UL) hash ^= GcNID.GetHashCode();
      if (BsIP.Length != 0) hash ^= BsIP.GetHashCode();
      if (BsPort != 0) hash ^= BsPort.GetHashCode();
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
      if (GcState != 0) {
        output.WriteRawTag(24);
        output.WriteEnum((int) GcState);
      }
      if (GcNID != 0UL) {
        output.WriteRawTag(32);
        output.WriteUInt64(GcNID);
      }
      if (BsIP.Length != 0) {
        output.WriteRawTag(42);
        output.WriteString(BsIP);
      }
      if (BsPort != 0) {
        output.WriteRawTag(48);
        output.WriteInt32(BsPort);
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
      if (GcState != 0) {
        size += 1 + pb::CodedOutputStream.ComputeEnumSize((int) GcState);
      }
      if (GcNID != 0UL) {
        size += 1 + pb::CodedOutputStream.ComputeUInt64Size(GcNID);
      }
      if (BsIP.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(BsIP);
      }
      if (BsPort != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(BsPort);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(GS2GC_LoginRet other) {
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
      if (other.GcState != 0) {
        GcState = other.GcState;
      }
      if (other.GcNID != 0UL) {
        GcNID = other.GcNID;
      }
      if (other.BsIP.Length != 0) {
        BsIP = other.BsIP;
      }
      if (other.BsPort != 0) {
        BsPort = other.BsPort;
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
            result_ = (global::Protos.GS2GC_LoginRet.Types.EResult) input.ReadEnum();
            break;
          }
          case 24: {
            gcState_ = (global::Protos.GS2GC_LoginRet.Types.EGCCState) input.ReadEnum();
            break;
          }
          case 32: {
            GcNID = input.ReadUInt64();
            break;
          }
          case 42: {
            BsIP = input.ReadString();
            break;
          }
          case 48: {
            BsPort = input.ReadInt32();
            break;
          }
        }
      }
    }

    #region Nested types
    /// <summary>Container for nested types declared in the GS2GC_LoginRet message type.</summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static partial class Types {
      public enum EResult {
        [pbr::OriginalName("Success")] Success = 0,
        /// <summary>
        ///非法登陆
        /// </summary>
        [pbr::OriginalName("SessionExpire")] SessionExpire = 1,
      }

      /// <summary>
      ///GC当前状态
      /// </summary>
      public enum EGCCState {
        [pbr::OriginalName("Idle")] Idle = 0,
        [pbr::OriginalName("Battle")] Battle = 1,
      }

    }
    #endregion

  }

  public sealed partial class GS2GC_Kick : pb::IMessage<GS2GC_Kick> {
    private static readonly pb::MessageParser<GS2GC_Kick> _parser = new pb::MessageParser<GS2GC_Kick>(() => new GS2GC_Kick());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<GS2GC_Kick> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.GS2GCReflection.Descriptor.MessageTypes[1]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GS2GC_Kick() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GS2GC_Kick(GS2GC_Kick other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      reason_ = other.reason_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GS2GC_Kick Clone() {
      return new GS2GC_Kick(this);
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

    /// <summary>Field number for the "reason" field.</summary>
    public const int ReasonFieldNumber = 2;
    private global::Protos.CS2GS_KickGC.Types.EReason reason_ = 0;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.CS2GS_KickGC.Types.EReason Reason {
      get { return reason_; }
      set {
        reason_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as GS2GC_Kick);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(GS2GC_Kick other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (Reason != other.Reason) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (Reason != 0) hash ^= Reason.GetHashCode();
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
      if (Reason != 0) {
        output.WriteRawTag(16);
        output.WriteEnum((int) Reason);
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
      if (Reason != 0) {
        size += 1 + pb::CodedOutputStream.ComputeEnumSize((int) Reason);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(GS2GC_Kick other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
      }
      if (other.Reason != 0) {
        Reason = other.Reason;
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
            reason_ = (global::Protos.CS2GS_KickGC.Types.EReason) input.ReadEnum();
            break;
          }
        }
      }
    }

  }

  #endregion

}

#endregion Designer generated code
