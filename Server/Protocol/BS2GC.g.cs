// <auto-generated>
//     Generated by the protocol buffer compiler.  DO NOT EDIT!
//     source: BS2GC.proto
// </auto-generated>
#pragma warning disable 1591, 0612, 3021
#region Designer generated code

using pb = global::Google.Protobuf;
using pbc = global::Google.Protobuf.Collections;
using pbr = global::Google.Protobuf.Reflection;
using scg = global::System.Collections.Generic;
namespace Protos {

  /// <summary>Holder for reflection information generated from BS2GC.proto</summary>
  public static partial class BS2GCReflection {

    #region Descriptor
    /// <summary>File descriptor for BS2GC.proto</summary>
    public static pbr::FileDescriptor Descriptor {
      get { return descriptor; }
    }
    private static pbr::FileDescriptor descriptor;

    static BS2GCReflection() {
      byte[] descriptorData = global::System.Convert.FromBase64String(
          string.Concat(
            "CgtCUzJHQy5wcm90bxIGUHJvdG9zGgxHbG9iYWwucHJvdG8aC0NTMkJTLnBy",
            "b3RvIr8BCg5CUzJHQ19Mb2dpblJldBIdCgRvcHRzGAEgASgLMg8uUHJvdG9z",
            "Lk1zZ09wdHMSLgoGcmVzdWx0GAIgASgOMh4uUHJvdG9zLkJTMkdDX0xvZ2lu",
            "UmV0LkVSZXN1bHQSDQoFbWFwSUQYAyABKAUSKwoJcGxheUluZm9zGAQgAygL",
            "MhguUHJvdG9zLkNTMkJTX1BsYXllckluZm8iIgoHRVJlc3VsdBILCgdTdWNj",
            "ZXNzEAASCgoGRmFpbGVkEAEiggEKEkJTMkdDX1VwZGF0ZVBsYXllchIdCgRv",
            "cHRzGAEgASgLMg8uUHJvdG9zLk1zZ09wdHMSCgoCaWQYAiABKAQSEAoIcHJv",
            "Z3Jlc3MYAyABKAUSLwoGc3RhdHVzGAQgASgOMh8uUHJvdG9zLkNTMkJTX1Bs",
            "YXllckluZm8uU3RhdHVzIjIKEUJTMkdDX0JhdHRsZVN0YXJ0Eh0KBG9wdHMY",
            "ASABKAsyDy5Qcm90b3MuTXNnT3B0c2IGcHJvdG8z"));
      descriptor = pbr::FileDescriptor.FromGeneratedCode(descriptorData,
          new pbr::FileDescriptor[] { global::Protos.GlobalReflection.Descriptor, global::Protos.CS2BSReflection.Descriptor, },
          new pbr::GeneratedClrTypeInfo(null, new pbr::GeneratedClrTypeInfo[] {
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.BS2GC_LoginRet), global::Protos.BS2GC_LoginRet.Parser, new[]{ "Opts", "Result", "MapID", "PlayInfos" }, null, new[]{ typeof(global::Protos.BS2GC_LoginRet.Types.EResult) }, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.BS2GC_UpdatePlayer), global::Protos.BS2GC_UpdatePlayer.Parser, new[]{ "Opts", "Id", "Progress", "Status" }, null, null, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.BS2GC_BattleStart), global::Protos.BS2GC_BattleStart.Parser, new[]{ "Opts" }, null, null, null)
          }));
    }
    #endregion

  }
  #region Messages
  /// <summary>
  ///登录结果
  /// </summary>
  public sealed partial class BS2GC_LoginRet : pb::IMessage<BS2GC_LoginRet> {
    private static readonly pb::MessageParser<BS2GC_LoginRet> _parser = new pb::MessageParser<BS2GC_LoginRet>(() => new BS2GC_LoginRet());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<BS2GC_LoginRet> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.BS2GCReflection.Descriptor.MessageTypes[0]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2GC_LoginRet() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2GC_LoginRet(BS2GC_LoginRet other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      result_ = other.result_;
      mapID_ = other.mapID_;
      playInfos_ = other.playInfos_.Clone();
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2GC_LoginRet Clone() {
      return new BS2GC_LoginRet(this);
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
    private global::Protos.BS2GC_LoginRet.Types.EResult result_ = 0;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.BS2GC_LoginRet.Types.EResult Result {
      get { return result_; }
      set {
        result_ = value;
      }
    }

    /// <summary>Field number for the "mapID" field.</summary>
    public const int MapIDFieldNumber = 3;
    private int mapID_;
    /// <summary>
    ///地图id
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int MapID {
      get { return mapID_; }
      set {
        mapID_ = value;
      }
    }

    /// <summary>Field number for the "playInfos" field.</summary>
    public const int PlayInfosFieldNumber = 4;
    private static readonly pb::FieldCodec<global::Protos.CS2BS_PlayerInfo> _repeated_playInfos_codec
        = pb::FieldCodec.ForMessage(34, global::Protos.CS2BS_PlayerInfo.Parser);
    private readonly pbc::RepeatedField<global::Protos.CS2BS_PlayerInfo> playInfos_ = new pbc::RepeatedField<global::Protos.CS2BS_PlayerInfo>();
    /// <summary>
    ///玩家信息
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public pbc::RepeatedField<global::Protos.CS2BS_PlayerInfo> PlayInfos {
      get { return playInfos_; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as BS2GC_LoginRet);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(BS2GC_LoginRet other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (Result != other.Result) return false;
      if (MapID != other.MapID) return false;
      if(!playInfos_.Equals(other.playInfos_)) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (Result != 0) hash ^= Result.GetHashCode();
      if (MapID != 0) hash ^= MapID.GetHashCode();
      hash ^= playInfos_.GetHashCode();
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
      if (MapID != 0) {
        output.WriteRawTag(24);
        output.WriteInt32(MapID);
      }
      playInfos_.WriteTo(output, _repeated_playInfos_codec);
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
      if (MapID != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(MapID);
      }
      size += playInfos_.CalculateSize(_repeated_playInfos_codec);
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(BS2GC_LoginRet other) {
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
      if (other.MapID != 0) {
        MapID = other.MapID;
      }
      playInfos_.Add(other.playInfos_);
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
            result_ = (global::Protos.BS2GC_LoginRet.Types.EResult) input.ReadEnum();
            break;
          }
          case 24: {
            MapID = input.ReadInt32();
            break;
          }
          case 34: {
            playInfos_.AddEntriesFrom(input, _repeated_playInfos_codec);
            break;
          }
        }
      }
    }

    #region Nested types
    /// <summary>Container for nested types declared in the BS2GC_LoginRet message type.</summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static partial class Types {
      public enum EResult {
        [pbr::OriginalName("Success")] Success = 0,
        [pbr::OriginalName("Failed")] Failed = 1,
      }

    }
    #endregion

  }

  /// <summary>
  ///更新玩家信息
  /// </summary>
  public sealed partial class BS2GC_UpdatePlayer : pb::IMessage<BS2GC_UpdatePlayer> {
    private static readonly pb::MessageParser<BS2GC_UpdatePlayer> _parser = new pb::MessageParser<BS2GC_UpdatePlayer>(() => new BS2GC_UpdatePlayer());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<BS2GC_UpdatePlayer> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.BS2GCReflection.Descriptor.MessageTypes[1]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2GC_UpdatePlayer() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2GC_UpdatePlayer(BS2GC_UpdatePlayer other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      id_ = other.id_;
      progress_ = other.progress_;
      status_ = other.status_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2GC_UpdatePlayer Clone() {
      return new BS2GC_UpdatePlayer(this);
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

    /// <summary>Field number for the "id" field.</summary>
    public const int IdFieldNumber = 2;
    private ulong id_;
    /// <summary>
    ///玩家网络id
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public ulong Id {
      get { return id_; }
      set {
        id_ = value;
      }
    }

    /// <summary>Field number for the "progress" field.</summary>
    public const int ProgressFieldNumber = 3;
    private int progress_;
    /// <summary>
    ///加载进度
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int Progress {
      get { return progress_; }
      set {
        progress_ = value;
      }
    }

    /// <summary>Field number for the "status" field.</summary>
    public const int StatusFieldNumber = 4;
    private global::Protos.CS2BS_PlayerInfo.Types.Status status_ = 0;
    /// <summary>
    ///玩家状态
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.CS2BS_PlayerInfo.Types.Status Status {
      get { return status_; }
      set {
        status_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as BS2GC_UpdatePlayer);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(BS2GC_UpdatePlayer other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (Id != other.Id) return false;
      if (Progress != other.Progress) return false;
      if (Status != other.Status) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (Id != 0UL) hash ^= Id.GetHashCode();
      if (Progress != 0) hash ^= Progress.GetHashCode();
      if (Status != 0) hash ^= Status.GetHashCode();
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
      if (Id != 0UL) {
        output.WriteRawTag(16);
        output.WriteUInt64(Id);
      }
      if (Progress != 0) {
        output.WriteRawTag(24);
        output.WriteInt32(Progress);
      }
      if (Status != 0) {
        output.WriteRawTag(32);
        output.WriteEnum((int) Status);
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
      if (Id != 0UL) {
        size += 1 + pb::CodedOutputStream.ComputeUInt64Size(Id);
      }
      if (Progress != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(Progress);
      }
      if (Status != 0) {
        size += 1 + pb::CodedOutputStream.ComputeEnumSize((int) Status);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(BS2GC_UpdatePlayer other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
      }
      if (other.Id != 0UL) {
        Id = other.Id;
      }
      if (other.Progress != 0) {
        Progress = other.Progress;
      }
      if (other.Status != 0) {
        Status = other.Status;
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
            Id = input.ReadUInt64();
            break;
          }
          case 24: {
            Progress = input.ReadInt32();
            break;
          }
          case 32: {
            status_ = (global::Protos.CS2BS_PlayerInfo.Types.Status) input.ReadEnum();
            break;
          }
        }
      }
    }

  }

  /// <summary>
  ///战场开始
  /// </summary>
  public sealed partial class BS2GC_BattleStart : pb::IMessage<BS2GC_BattleStart> {
    private static readonly pb::MessageParser<BS2GC_BattleStart> _parser = new pb::MessageParser<BS2GC_BattleStart>(() => new BS2GC_BattleStart());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<BS2GC_BattleStart> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.BS2GCReflection.Descriptor.MessageTypes[2]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2GC_BattleStart() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2GC_BattleStart(BS2GC_BattleStart other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2GC_BattleStart Clone() {
      return new BS2GC_BattleStart(this);
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

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as BS2GC_BattleStart);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(BS2GC_BattleStart other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
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
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(BS2GC_BattleStart other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
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
        }
      }
    }

  }

  #endregion

}

#endregion Designer generated code
