// <auto-generated>
//     Generated by the protocol buffer compiler.  DO NOT EDIT!
//     source: BS2CS.proto
// </auto-generated>
#pragma warning disable 1591, 0612, 3021
#region Designer generated code

using pb = global::Google.Protobuf;
using pbc = global::Google.Protobuf.Collections;
using pbr = global::Google.Protobuf.Reflection;
using scg = global::System.Collections.Generic;
namespace Protos {

  /// <summary>Holder for reflection information generated from BS2CS.proto</summary>
  public static partial class BS2CSReflection {

    #region Descriptor
    /// <summary>File descriptor for BS2CS.proto</summary>
    public static pbr::FileDescriptor Descriptor {
      get { return descriptor; }
    }
    private static pbr::FileDescriptor descriptor;

    static BS2CSReflection() {
      byte[] descriptorData = global::System.Convert.FromBase64String(
          string.Concat(
            "CgtCUzJDUy5wcm90bxIGUHJvdG9zGgxHbG9iYWwucHJvdG8ihQEKBkJTSW5m",
            "bxIKCgJpZBgBIAEoDRIKCgJpcBgDIAEoCRIMCgRwb3J0GAQgASgFEiMKBXN0",
            "YXRlGAYgASgOMhQuUHJvdG9zLkJTSW5mby5TdGF0ZSIwCgVTdGF0ZRIICgRG",
            "cmVlEAASCAoEQnVzeRABEggKBEZ1bGwQAhIJCgVDbG9zZRADIlIKEUJTMkNT",
            "X1JlcG9ydFN0YXRlEh0KBG9wdHMYASABKAsyDy5Qcm90b3MuTXNnT3B0cxIe",
            "CgZic0luZm8YAiABKAsyDi5Qcm90b3MuQlNJbmZvImkKE0JTMkNTX0JhdHRs",
            "ZUluZm9SZXQSHQoEb3B0cxgBIAEoCzIPLlByb3Rvcy5Nc2dPcHRzEiYKBnJl",
            "c3VsdBgCIAEoDjIWLlByb3Rvcy5HbG9iYWwuRUNvbW1vbhILCgNiaWQYAyAB",
            "KA0iPQoPQlMyQ1NfQmF0dGxlRW5kEh0KBG9wdHMYASABKAsyDy5Qcm90b3Mu",
            "TXNnT3B0cxILCgNiaWQYAiABKA0ihgEKDkJTMkNTX0tpY2tVc2VyEh0KBG9w",
            "dHMYASABKAsyDy5Qcm90b3MuTXNnT3B0cxINCgVnY05JRBgCIAEoBBItCgZy",
            "ZWFzb24YAyABKA4yHS5Qcm90b3MuQlMyQ1NfS2lja1VzZXIuUmVhc29uIhcK",
            "BlJlYXNvbhINCglPdXRPZlN5bmMQAGIGcHJvdG8z"));
      descriptor = pbr::FileDescriptor.FromGeneratedCode(descriptorData,
          new pbr::FileDescriptor[] { global::Protos.GlobalReflection.Descriptor, },
          new pbr::GeneratedClrTypeInfo(null, new pbr::GeneratedClrTypeInfo[] {
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.BSInfo), global::Protos.BSInfo.Parser, new[]{ "Id", "Ip", "Port", "State" }, null, new[]{ typeof(global::Protos.BSInfo.Types.State) }, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.BS2CS_ReportState), global::Protos.BS2CS_ReportState.Parser, new[]{ "Opts", "BsInfo" }, null, null, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.BS2CS_BattleInfoRet), global::Protos.BS2CS_BattleInfoRet.Parser, new[]{ "Opts", "Result", "Bid" }, null, null, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.BS2CS_BattleEnd), global::Protos.BS2CS_BattleEnd.Parser, new[]{ "Opts", "Bid" }, null, null, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.BS2CS_KickUser), global::Protos.BS2CS_KickUser.Parser, new[]{ "Opts", "GcNID", "Reason" }, null, new[]{ typeof(global::Protos.BS2CS_KickUser.Types.Reason) }, null)
          }));
    }
    #endregion

  }
  #region Messages
  public sealed partial class BSInfo : pb::IMessage<BSInfo> {
    private static readonly pb::MessageParser<BSInfo> _parser = new pb::MessageParser<BSInfo>(() => new BSInfo());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<BSInfo> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.BS2CSReflection.Descriptor.MessageTypes[0]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BSInfo() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BSInfo(BSInfo other) : this() {
      id_ = other.id_;
      ip_ = other.ip_;
      port_ = other.port_;
      state_ = other.state_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BSInfo Clone() {
      return new BSInfo(this);
    }

    /// <summary>Field number for the "id" field.</summary>
    public const int IdFieldNumber = 1;
    private uint id_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public uint Id {
      get { return id_; }
      set {
        id_ = value;
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

    /// <summary>Field number for the "state" field.</summary>
    public const int StateFieldNumber = 6;
    private global::Protos.BSInfo.Types.State state_ = 0;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.BSInfo.Types.State State {
      get { return state_; }
      set {
        state_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as BSInfo);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(BSInfo other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (Id != other.Id) return false;
      if (Ip != other.Ip) return false;
      if (Port != other.Port) return false;
      if (State != other.State) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (Id != 0) hash ^= Id.GetHashCode();
      if (Ip.Length != 0) hash ^= Ip.GetHashCode();
      if (Port != 0) hash ^= Port.GetHashCode();
      if (State != 0) hash ^= State.GetHashCode();
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
      if (Id != 0) {
        output.WriteRawTag(8);
        output.WriteUInt32(Id);
      }
      if (Ip.Length != 0) {
        output.WriteRawTag(26);
        output.WriteString(Ip);
      }
      if (Port != 0) {
        output.WriteRawTag(32);
        output.WriteInt32(Port);
      }
      if (State != 0) {
        output.WriteRawTag(48);
        output.WriteEnum((int) State);
      }
      if (_unknownFields != null) {
        _unknownFields.WriteTo(output);
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int CalculateSize() {
      int size = 0;
      if (Id != 0) {
        size += 1 + pb::CodedOutputStream.ComputeUInt32Size(Id);
      }
      if (Ip.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(Ip);
      }
      if (Port != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(Port);
      }
      if (State != 0) {
        size += 1 + pb::CodedOutputStream.ComputeEnumSize((int) State);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(BSInfo other) {
      if (other == null) {
        return;
      }
      if (other.Id != 0) {
        Id = other.Id;
      }
      if (other.Ip.Length != 0) {
        Ip = other.Ip;
      }
      if (other.Port != 0) {
        Port = other.Port;
      }
      if (other.State != 0) {
        State = other.State;
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
            Id = input.ReadUInt32();
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
          case 48: {
            state_ = (global::Protos.BSInfo.Types.State) input.ReadEnum();
            break;
          }
        }
      }
    }

    #region Nested types
    /// <summary>Container for nested types declared in the BSInfo message type.</summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static partial class Types {
      public enum State {
        [pbr::OriginalName("Free")] Free = 0,
        [pbr::OriginalName("Busy")] Busy = 1,
        [pbr::OriginalName("Full")] Full = 2,
        [pbr::OriginalName("Close")] Close = 3,
      }

    }
    #endregion

  }

  /// <summary>
  ///汇报状态
  /// </summary>
  public sealed partial class BS2CS_ReportState : pb::IMessage<BS2CS_ReportState> {
    private static readonly pb::MessageParser<BS2CS_ReportState> _parser = new pb::MessageParser<BS2CS_ReportState>(() => new BS2CS_ReportState());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<BS2CS_ReportState> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.BS2CSReflection.Descriptor.MessageTypes[1]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2CS_ReportState() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2CS_ReportState(BS2CS_ReportState other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      bsInfo_ = other.bsInfo_ != null ? other.bsInfo_.Clone() : null;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2CS_ReportState Clone() {
      return new BS2CS_ReportState(this);
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

    /// <summary>Field number for the "bsInfo" field.</summary>
    public const int BsInfoFieldNumber = 2;
    private global::Protos.BSInfo bsInfo_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.BSInfo BsInfo {
      get { return bsInfo_; }
      set {
        bsInfo_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as BS2CS_ReportState);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(BS2CS_ReportState other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (!object.Equals(BsInfo, other.BsInfo)) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (bsInfo_ != null) hash ^= BsInfo.GetHashCode();
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
      if (bsInfo_ != null) {
        output.WriteRawTag(18);
        output.WriteMessage(BsInfo);
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
      if (bsInfo_ != null) {
        size += 1 + pb::CodedOutputStream.ComputeMessageSize(BsInfo);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(BS2CS_ReportState other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
      }
      if (other.bsInfo_ != null) {
        if (bsInfo_ == null) {
          bsInfo_ = new global::Protos.BSInfo();
        }
        BsInfo.MergeFrom(other.BsInfo);
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
          case 18: {
            if (bsInfo_ == null) {
              bsInfo_ = new global::Protos.BSInfo();
            }
            input.ReadMessage(bsInfo_);
            break;
          }
        }
      }
    }

  }

  /// <summary>
  ///回应战场信息
  /// </summary>
  public sealed partial class BS2CS_BattleInfoRet : pb::IMessage<BS2CS_BattleInfoRet> {
    private static readonly pb::MessageParser<BS2CS_BattleInfoRet> _parser = new pb::MessageParser<BS2CS_BattleInfoRet>(() => new BS2CS_BattleInfoRet());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<BS2CS_BattleInfoRet> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.BS2CSReflection.Descriptor.MessageTypes[2]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2CS_BattleInfoRet() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2CS_BattleInfoRet(BS2CS_BattleInfoRet other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      result_ = other.result_;
      bid_ = other.bid_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2CS_BattleInfoRet Clone() {
      return new BS2CS_BattleInfoRet(this);
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
    /// <summary>
    ///创建战场结果
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.Global.Types.ECommon Result {
      get { return result_; }
      set {
        result_ = value;
      }
    }

    /// <summary>Field number for the "bid" field.</summary>
    public const int BidFieldNumber = 3;
    private uint bid_;
    /// <summary>
    ///战场id
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public uint Bid {
      get { return bid_; }
      set {
        bid_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as BS2CS_BattleInfoRet);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(BS2CS_BattleInfoRet other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (Result != other.Result) return false;
      if (Bid != other.Bid) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (Result != 0) hash ^= Result.GetHashCode();
      if (Bid != 0) hash ^= Bid.GetHashCode();
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
      if (Bid != 0) {
        output.WriteRawTag(24);
        output.WriteUInt32(Bid);
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
      if (Bid != 0) {
        size += 1 + pb::CodedOutputStream.ComputeUInt32Size(Bid);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(BS2CS_BattleInfoRet other) {
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
      if (other.Bid != 0) {
        Bid = other.Bid;
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
          case 24: {
            Bid = input.ReadUInt32();
            break;
          }
        }
      }
    }

  }

  /// <summary>
  ///战场结束
  /// </summary>
  public sealed partial class BS2CS_BattleEnd : pb::IMessage<BS2CS_BattleEnd> {
    private static readonly pb::MessageParser<BS2CS_BattleEnd> _parser = new pb::MessageParser<BS2CS_BattleEnd>(() => new BS2CS_BattleEnd());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<BS2CS_BattleEnd> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.BS2CSReflection.Descriptor.MessageTypes[3]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2CS_BattleEnd() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2CS_BattleEnd(BS2CS_BattleEnd other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      bid_ = other.bid_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2CS_BattleEnd Clone() {
      return new BS2CS_BattleEnd(this);
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

    /// <summary>Field number for the "bid" field.</summary>
    public const int BidFieldNumber = 2;
    private uint bid_;
    /// <summary>
    ///战场id
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public uint Bid {
      get { return bid_; }
      set {
        bid_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as BS2CS_BattleEnd);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(BS2CS_BattleEnd other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (Bid != other.Bid) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (Bid != 0) hash ^= Bid.GetHashCode();
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
      if (Bid != 0) {
        output.WriteRawTag(16);
        output.WriteUInt32(Bid);
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
      if (Bid != 0) {
        size += 1 + pb::CodedOutputStream.ComputeUInt32Size(Bid);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(BS2CS_BattleEnd other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
      }
      if (other.Bid != 0) {
        Bid = other.Bid;
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
            Bid = input.ReadUInt32();
            break;
          }
        }
      }
    }

  }

  /// <summary>
  ///通知CS玩家离开战场
  /// </summary>
  public sealed partial class BS2CS_KickUser : pb::IMessage<BS2CS_KickUser> {
    private static readonly pb::MessageParser<BS2CS_KickUser> _parser = new pb::MessageParser<BS2CS_KickUser>(() => new BS2CS_KickUser());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<BS2CS_KickUser> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.BS2CSReflection.Descriptor.MessageTypes[4]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2CS_KickUser() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2CS_KickUser(BS2CS_KickUser other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      gcNID_ = other.gcNID_;
      reason_ = other.reason_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public BS2CS_KickUser Clone() {
      return new BS2CS_KickUser(this);
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

    /// <summary>Field number for the "gcNID" field.</summary>
    public const int GcNIDFieldNumber = 2;
    private ulong gcNID_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public ulong GcNID {
      get { return gcNID_; }
      set {
        gcNID_ = value;
      }
    }

    /// <summary>Field number for the "reason" field.</summary>
    public const int ReasonFieldNumber = 3;
    private global::Protos.BS2CS_KickUser.Types.Reason reason_ = 0;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.BS2CS_KickUser.Types.Reason Reason {
      get { return reason_; }
      set {
        reason_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as BS2CS_KickUser);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(BS2CS_KickUser other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (GcNID != other.GcNID) return false;
      if (Reason != other.Reason) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (GcNID != 0UL) hash ^= GcNID.GetHashCode();
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
      if (GcNID != 0UL) {
        output.WriteRawTag(16);
        output.WriteUInt64(GcNID);
      }
      if (Reason != 0) {
        output.WriteRawTag(24);
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
      if (GcNID != 0UL) {
        size += 1 + pb::CodedOutputStream.ComputeUInt64Size(GcNID);
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
    public void MergeFrom(BS2CS_KickUser other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
      }
      if (other.GcNID != 0UL) {
        GcNID = other.GcNID;
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
            GcNID = input.ReadUInt64();
            break;
          }
          case 24: {
            reason_ = (global::Protos.BS2CS_KickUser.Types.Reason) input.ReadEnum();
            break;
          }
        }
      }
    }

    #region Nested types
    /// <summary>Container for nested types declared in the BS2CS_KickUser message type.</summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static partial class Types {
      public enum Reason {
        [pbr::OriginalName("OutOfSync")] OutOfSync = 0,
      }

    }
    #endregion

  }

  #endregion

}

#endregion Designer generated code
