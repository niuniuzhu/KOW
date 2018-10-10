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
            "JgoGcmVzdWx0GAIgASgOMhYuUHJvdG9zLkdsb2JhbC5FQ29tbW9uIkMKDUNT",
            "X1BsYXllckluZm8SCgoCaWQYASABKAQSDAoEbmFtZRgCIAEoCRILCgNqb2IY",
            "AyABKAUSCwoDc2V4GAQgASgFImsKEUNTMkdDX0JlZ2luQmF0dGxlEh0KBG9w",
            "dHMYASABKAsyDy5Qcm90b3MuTXNnT3B0cxINCgVtYXBJRBgCIAEoBRIoCglw",
            "bGF5SW5mb3MYAyADKAsyFS5Qcm90b3MuQ1NfUGxheWVySW5mb2IGcHJvdG8z"));
      descriptor = pbr::FileDescriptor.FromGeneratedCode(descriptorData,
          new pbr::FileDescriptor[] { global::Protos.GlobalReflection.Descriptor, },
          new pbr::GeneratedClrTypeInfo(null, new pbr::GeneratedClrTypeInfo[] {
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.CS2GC_BeginMatchRet), global::Protos.CS2GC_BeginMatchRet.Parser, new[]{ "Opts", "Result" }, null, null, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.CS_PlayerInfo), global::Protos.CS_PlayerInfo.Parser, new[]{ "Id", "Name", "Job", "Sex" }, null, null, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.CS2GC_BeginBattle), global::Protos.CS2GC_BeginBattle.Parser, new[]{ "Opts", "MapID", "PlayInfos" }, null, null, null)
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

  public sealed partial class CS_PlayerInfo : pb::IMessage<CS_PlayerInfo> {
    private static readonly pb::MessageParser<CS_PlayerInfo> _parser = new pb::MessageParser<CS_PlayerInfo>(() => new CS_PlayerInfo());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<CS_PlayerInfo> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.CS2GCReflection.Descriptor.MessageTypes[1]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public CS_PlayerInfo() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public CS_PlayerInfo(CS_PlayerInfo other) : this() {
      id_ = other.id_;
      name_ = other.name_;
      job_ = other.job_;
      sex_ = other.sex_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public CS_PlayerInfo Clone() {
      return new CS_PlayerInfo(this);
    }

    /// <summary>Field number for the "id" field.</summary>
    public const int IdFieldNumber = 1;
    private ulong id_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public ulong Id {
      get { return id_; }
      set {
        id_ = value;
      }
    }

    /// <summary>Field number for the "name" field.</summary>
    public const int NameFieldNumber = 2;
    private string name_ = "";
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string Name {
      get { return name_; }
      set {
        name_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    /// <summary>Field number for the "job" field.</summary>
    public const int JobFieldNumber = 3;
    private int job_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int Job {
      get { return job_; }
      set {
        job_ = value;
      }
    }

    /// <summary>Field number for the "sex" field.</summary>
    public const int SexFieldNumber = 4;
    private int sex_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int Sex {
      get { return sex_; }
      set {
        sex_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as CS_PlayerInfo);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(CS_PlayerInfo other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (Id != other.Id) return false;
      if (Name != other.Name) return false;
      if (Job != other.Job) return false;
      if (Sex != other.Sex) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (Id != 0UL) hash ^= Id.GetHashCode();
      if (Name.Length != 0) hash ^= Name.GetHashCode();
      if (Job != 0) hash ^= Job.GetHashCode();
      if (Sex != 0) hash ^= Sex.GetHashCode();
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
      if (Id != 0UL) {
        output.WriteRawTag(8);
        output.WriteUInt64(Id);
      }
      if (Name.Length != 0) {
        output.WriteRawTag(18);
        output.WriteString(Name);
      }
      if (Job != 0) {
        output.WriteRawTag(24);
        output.WriteInt32(Job);
      }
      if (Sex != 0) {
        output.WriteRawTag(32);
        output.WriteInt32(Sex);
      }
      if (_unknownFields != null) {
        _unknownFields.WriteTo(output);
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int CalculateSize() {
      int size = 0;
      if (Id != 0UL) {
        size += 1 + pb::CodedOutputStream.ComputeUInt64Size(Id);
      }
      if (Name.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(Name);
      }
      if (Job != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(Job);
      }
      if (Sex != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(Sex);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(CS_PlayerInfo other) {
      if (other == null) {
        return;
      }
      if (other.Id != 0UL) {
        Id = other.Id;
      }
      if (other.Name.Length != 0) {
        Name = other.Name;
      }
      if (other.Job != 0) {
        Job = other.Job;
      }
      if (other.Sex != 0) {
        Sex = other.Sex;
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
          case 8: {
            Id = input.ReadUInt64();
            break;
          }
          case 18: {
            Name = input.ReadString();
            break;
          }
          case 24: {
            Job = input.ReadInt32();
            break;
          }
          case 32: {
            Sex = input.ReadInt32();
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
      get { return global::Protos.CS2GCReflection.Descriptor.MessageTypes[2]; }
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
      mapID_ = other.mapID_;
      playInfos_ = other.playInfos_.Clone();
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

    /// <summary>Field number for the "mapID" field.</summary>
    public const int MapIDFieldNumber = 2;
    private int mapID_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int MapID {
      get { return mapID_; }
      set {
        mapID_ = value;
      }
    }

    /// <summary>Field number for the "playInfos" field.</summary>
    public const int PlayInfosFieldNumber = 3;
    private static readonly pb::FieldCodec<global::Protos.CS_PlayerInfo> _repeated_playInfos_codec
        = pb::FieldCodec.ForMessage(26, global::Protos.CS_PlayerInfo.Parser);
    private readonly pbc::RepeatedField<global::Protos.CS_PlayerInfo> playInfos_ = new pbc::RepeatedField<global::Protos.CS_PlayerInfo>();
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public pbc::RepeatedField<global::Protos.CS_PlayerInfo> PlayInfos {
      get { return playInfos_; }
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
      if (MapID != other.MapID) return false;
      if(!playInfos_.Equals(other.playInfos_)) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
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
      if (MapID != 0) {
        output.WriteRawTag(16);
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
            MapID = input.ReadInt32();
            break;
          }
          case 26: {
            playInfos_.AddEntriesFrom(input, _repeated_playInfos_codec);
            break;
          }
        }
      }
    }

  }

  #endregion

}

#endregion Designer generated code
