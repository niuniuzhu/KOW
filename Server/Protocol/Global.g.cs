// <auto-generated>
//     Generated by the protocol buffer compiler.  DO NOT EDIT!
//     source: Global.proto
// </auto-generated>
#pragma warning disable 1591, 0612, 3021
#region Designer generated code

using pb = global::Google.Protobuf;
using pbc = global::Google.Protobuf.Collections;
using pbr = global::Google.Protobuf.Reflection;
using scg = global::System.Collections.Generic;
namespace Protos {

  /// <summary>Holder for reflection information generated from Global.proto</summary>
  public static partial class GlobalReflection {

    #region Descriptor
    /// <summary>File descriptor for Global.proto</summary>
    public static pbr::FileDescriptor Descriptor {
      get { return descriptor; }
    }
    private static pbr::FileDescriptor descriptor;

    static GlobalReflection() {
      byte[] descriptorData = global::System.Convert.FromBase64String(
          string.Concat(
            "CgxHbG9iYWwucHJvdG8SBlByb3RvcyLAAQoHTXNnT3B0cxIMCgRmbGFnGAEg",
            "ASgNEgsKA3BpZBgCIAEoDRIMCgRycGlkGAMgASgNEg8KB3RyYW5zaWQYBCAB",
            "KAQiLgoERmxhZxIICgROb3JtEAASBwoDUlBDEAESCAoEUkVTUBACEgkKBVRS",
            "QU5TEAMiSwoLVHJhbnNUYXJnZXQSDAoIVW5kZWZpbmUQABIGCgJHQxABEgYK",
            "AkNTEAISBgoCQlMQAxIGCgJMUxAEEgYKAkRCEAUSBgoCR1MQBiI4CglHX0Fz",
            "a1BpbmcSHQoEb3B0cxgBIAEoCzIPLlByb3Rvcy5Nc2dPcHRzEgwKBHRpbWUY",
            "AiABKAMiSgoMR19Bc2tQaW5nUmV0Eh0KBG9wdHMYASABKAsyDy5Qcm90b3Mu",
            "TXNnT3B0cxINCgVzdGltZRgCIAEoAxIMCgR0aW1lGAMgASgDIiwKBkdsb2Jh",
            "bCIiCgdFQ29tbW9uEgsKB1N1Y2Nlc3MQABIKCgZGYWlsZWQQASr3BwoFTXNn",
            "SUQSDAoIVW5kZWZpbmUQABIOCgplR19Bc2tQaW5nEAoSEQoNZUdfQXNrUGlu",
            "Z1JldBALEhcKEmVHQzJMU19Bc2tSZWdpc3RlchDoBxIUCg9lR0MyTFNfQXNr",
            "TG9naW4Q6QcSGQoUZUdDMkxTX0Fza1NtYXJ0TG9naW4Q6gcSFAoPZUdDMkdT",
            "X0Fza0xvZ2luEMwIEhUKEGVHQzJHU19LZWVwQWxpdmUQzQgSFAoPZUdDMkJT",
            "X0Fza0xvZ2luELAJEhUKEGVHQzJCU19LZWVwQWxpdmUQsQkSFgoRZUdDMkNT",
            "X0JlZ2luTWF0Y2gQlAoSHAoXZUdDMkNTX1VwZGF0ZVBsYXllckluZm8QlQoS",
            "EgoNZUxTMkdDX0dTSW5mbxDQDxIVChBlTFMyR0NfQXNrUmVnUmV0ENEPEhcK",
            "EmVMUzJHQ19Bc2tMb2dpblJldBDSDxITCg5lTFMyQ1NfR0NMb2dpbhC0EBIY",
            "ChNlTFMyREJfUXVlcnlBY2NvdW50EJgREhYKEWVMUzJEQl9RdWVyeUxvZ2lu",
            "EJkREhAKC2VMUzJEQl9FeGVjEJoREhcKEmVHUzJDU19SZXBvcnRTdGF0ZRC4",
            "FxIWChFlR1MyQ1NfR0NBc2tMb2dpbhC5FxISCg1lR1MyQ1NfR0NMb3N0ELoX",
            "EhUKEGVHUzJDU19LaWNrR0NSZXQQuxcSFAoPZUdTMkdDX0xvZ2luUmV0EJwY",
            "EhAKC2VHUzJHQ19LaWNrEJ0YEhcKEmVCUzJDU19SZXBvcnRTdGF0ZRCgHxIZ",
            "ChRlQlMyQ1NfQmF0dGxlSW5mb1JldBChHxIUCg9lQlMyR0NfTG9naW5SZXQQ",
            "hCASFwoSZUJTMkdDX0JhdHRsZVN0YXJ0EIYgEhMKDmVDUzJMU19HU0luZm9z",
            "EIgnEhIKDWVDUzJMU19HU0luZm8QiScSEgoNZUNTMkxTX0dTTG9zdBCKJxIW",
            "ChFlQ1MyTFNfR0NMb2dpblJldBCLJxIWChFlQ1MyR1NfR0NMb2dpblJldBDs",
            "JxISCg1lQ1MyR1NfS2lja0dDEO0nEhYKEWVDUzJCU19CYXR0bGVJbmZvENAo",
            "EhkKFGVDUzJHQ19CZWdpbk1hdGNoUmV0ELQpEhYKEWVDUzJHQ19QbGF5ZXJK",
            "b2luELUpEhcKEmVDUzJHQ19QbGF5ZXJMZWF2ZRC2KRIUCg9lQ1MyR0NfUm9v",
            "bUluZm8QtykSFwoSZUNTMkdDX0VudGVyQmF0dGxlELgpEhsKFmVEQjJMU19R",
            "dWVyeUFjY291bnRSZXQQwD4SGQoUZURCMkxTX1F1ZXJ5TG9naW5SZXQQwT4S",
            "EwoOZURCMkxTX0V4ZWNSZXQQwj5iBnByb3RvMw=="));
      descriptor = pbr::FileDescriptor.FromGeneratedCode(descriptorData,
          new pbr::FileDescriptor[] { },
          new pbr::GeneratedClrTypeInfo(new[] {typeof(global::Protos.MsgID), }, new pbr::GeneratedClrTypeInfo[] {
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.MsgOpts), global::Protos.MsgOpts.Parser, new[]{ "Flag", "Pid", "Rpid", "Transid" }, null, new[]{ typeof(global::Protos.MsgOpts.Types.Flag), typeof(global::Protos.MsgOpts.Types.TransTarget) }, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.G_AskPing), global::Protos.G_AskPing.Parser, new[]{ "Opts", "Time" }, null, null, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.G_AskPingRet), global::Protos.G_AskPingRet.Parser, new[]{ "Opts", "Stime", "Time" }, null, null, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.Global), global::Protos.Global.Parser, null, null, new[]{ typeof(global::Protos.Global.Types.ECommon) }, null)
          }));
    }
    #endregion

  }
  #region Enums
  public enum MsgID {
    [pbr::OriginalName("Undefine")] Undefine = 0,
    [pbr::OriginalName("eG_AskPing")] EGAskPing = 10,
    [pbr::OriginalName("eG_AskPingRet")] EGAskPingRet = 11,
    /// <summary>
    ///gc
    /// </summary>
    [pbr::OriginalName("eGC2LS_AskRegister")] EGc2LsAskRegister = 1000,
    [pbr::OriginalName("eGC2LS_AskLogin")] EGc2LsAskLogin = 1001,
    [pbr::OriginalName("eGC2LS_AskSmartLogin")] EGc2LsAskSmartLogin = 1002,
    [pbr::OriginalName("eGC2GS_AskLogin")] EGc2GsAskLogin = 1100,
    [pbr::OriginalName("eGC2GS_KeepAlive")] EGc2GsKeepAlive = 1101,
    [pbr::OriginalName("eGC2BS_AskLogin")] EGc2BsAskLogin = 1200,
    [pbr::OriginalName("eGC2BS_KeepAlive")] EGc2BsKeepAlive = 1201,
    [pbr::OriginalName("eGC2CS_BeginMatch")] EGc2CsBeginMatch = 1300,
    [pbr::OriginalName("eGC2CS_UpdatePlayerInfo")] EGc2CsUpdatePlayerInfo = 1301,
    /// <summary>
    ///ls
    /// </summary>
    [pbr::OriginalName("eLS2GC_GSInfo")] ELs2GcGsinfo = 2000,
    [pbr::OriginalName("eLS2GC_AskRegRet")] ELs2GcAskRegRet = 2001,
    [pbr::OriginalName("eLS2GC_AskLoginRet")] ELs2GcAskLoginRet = 2002,
    [pbr::OriginalName("eLS2CS_GCLogin")] ELs2CsGclogin = 2100,
    [pbr::OriginalName("eLS2DB_QueryAccount")] ELs2DbQueryAccount = 2200,
    [pbr::OriginalName("eLS2DB_QueryLogin")] ELs2DbQueryLogin = 2201,
    [pbr::OriginalName("eLS2DB_Exec")] ELs2DbExec = 2202,
    /// <summary>
    ///gs
    /// </summary>
    [pbr::OriginalName("eGS2CS_ReportState")] EGs2CsReportState = 3000,
    [pbr::OriginalName("eGS2CS_GCAskLogin")] EGs2CsGcaskLogin = 3001,
    [pbr::OriginalName("eGS2CS_GCLost")] EGs2CsGclost = 3002,
    [pbr::OriginalName("eGS2CS_KickGCRet")] EGs2CsKickGcret = 3003,
    [pbr::OriginalName("eGS2GC_LoginRet")] EGs2GcLoginRet = 3100,
    [pbr::OriginalName("eGS2GC_Kick")] EGs2GcKick = 3101,
    /// <summary>
    ///bs
    /// </summary>
    [pbr::OriginalName("eBS2CS_ReportState")] EBs2CsReportState = 4000,
    [pbr::OriginalName("eBS2CS_BattleInfoRet")] EBs2CsBattleInfoRet = 4001,
    [pbr::OriginalName("eBS2GC_LoginRet")] EBs2GcLoginRet = 4100,
    [pbr::OriginalName("eBS2GC_BattleStart")] EBs2GcBattleStart = 4102,
    /// <summary>
    ///cs
    /// </summary>
    [pbr::OriginalName("eCS2LS_GSInfos")] ECs2LsGsinfos = 5000,
    [pbr::OriginalName("eCS2LS_GSInfo")] ECs2LsGsinfo = 5001,
    [pbr::OriginalName("eCS2LS_GSLost")] ECs2LsGslost = 5002,
    [pbr::OriginalName("eCS2LS_GCLoginRet")] ECs2LsGcloginRet = 5003,
    [pbr::OriginalName("eCS2GS_GCLoginRet")] ECs2GsGcloginRet = 5100,
    [pbr::OriginalName("eCS2GS_KickGC")] ECs2GsKickGc = 5101,
    [pbr::OriginalName("eCS2BS_BattleInfo")] ECs2BsBattleInfo = 5200,
    [pbr::OriginalName("eCS2GC_BeginMatchRet")] ECs2GcBeginMatchRet = 5300,
    [pbr::OriginalName("eCS2GC_PlayerJoin")] ECs2GcPlayerJoin = 5301,
    [pbr::OriginalName("eCS2GC_PlayerLeave")] ECs2GcPlayerLeave = 5302,
    [pbr::OriginalName("eCS2GC_RoomInfo")] ECs2GcRoomInfo = 5303,
    [pbr::OriginalName("eCS2GC_EnterBattle")] ECs2GcEnterBattle = 5304,
    /// <summary>
    ///db
    /// </summary>
    [pbr::OriginalName("eDB2LS_QueryAccountRet")] EDb2LsQueryAccountRet = 8000,
    [pbr::OriginalName("eDB2LS_QueryLoginRet")] EDb2LsQueryLoginRet = 8001,
    [pbr::OriginalName("eDB2LS_ExecRet")] EDb2LsExecRet = 8002,
  }

  #endregion

  #region Messages
  public sealed partial class MsgOpts : pb::IMessage<MsgOpts> {
    private static readonly pb::MessageParser<MsgOpts> _parser = new pb::MessageParser<MsgOpts>(() => new MsgOpts());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<MsgOpts> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.GlobalReflection.Descriptor.MessageTypes[0]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public MsgOpts() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public MsgOpts(MsgOpts other) : this() {
      flag_ = other.flag_;
      pid_ = other.pid_;
      rpid_ = other.rpid_;
      transid_ = other.transid_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public MsgOpts Clone() {
      return new MsgOpts(this);
    }

    /// <summary>Field number for the "flag" field.</summary>
    public const int FlagFieldNumber = 1;
    private uint flag_;
    /// <summary>
    ///protobuf是变长编码的,数值在0-127就只会用花费一个byte
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public uint Flag {
      get { return flag_; }
      set {
        flag_ = value;
      }
    }

    /// <summary>Field number for the "pid" field.</summary>
    public const int PidFieldNumber = 2;
    private uint pid_;
    /// <summary>
    ///运行时消息pid
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public uint Pid {
      get { return pid_; }
      set {
        pid_ = value;
      }
    }

    /// <summary>Field number for the "rpid" field.</summary>
    public const int RpidFieldNumber = 3;
    private uint rpid_;
    /// <summary>
    ///回应对应请求的消息的pid
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public uint Rpid {
      get { return rpid_; }
      set {
        rpid_ = value;
      }
    }

    /// <summary>Field number for the "transid" field.</summary>
    public const int TransidFieldNumber = 4;
    private ulong transid_;
    /// <summary>
    ///转发的网络id
    /// </summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public ulong Transid {
      get { return transid_; }
      set {
        transid_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as MsgOpts);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(MsgOpts other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (Flag != other.Flag) return false;
      if (Pid != other.Pid) return false;
      if (Rpid != other.Rpid) return false;
      if (Transid != other.Transid) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (Flag != 0) hash ^= Flag.GetHashCode();
      if (Pid != 0) hash ^= Pid.GetHashCode();
      if (Rpid != 0) hash ^= Rpid.GetHashCode();
      if (Transid != 0UL) hash ^= Transid.GetHashCode();
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
      if (Flag != 0) {
        output.WriteRawTag(8);
        output.WriteUInt32(Flag);
      }
      if (Pid != 0) {
        output.WriteRawTag(16);
        output.WriteUInt32(Pid);
      }
      if (Rpid != 0) {
        output.WriteRawTag(24);
        output.WriteUInt32(Rpid);
      }
      if (Transid != 0UL) {
        output.WriteRawTag(32);
        output.WriteUInt64(Transid);
      }
      if (_unknownFields != null) {
        _unknownFields.WriteTo(output);
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int CalculateSize() {
      int size = 0;
      if (Flag != 0) {
        size += 1 + pb::CodedOutputStream.ComputeUInt32Size(Flag);
      }
      if (Pid != 0) {
        size += 1 + pb::CodedOutputStream.ComputeUInt32Size(Pid);
      }
      if (Rpid != 0) {
        size += 1 + pb::CodedOutputStream.ComputeUInt32Size(Rpid);
      }
      if (Transid != 0UL) {
        size += 1 + pb::CodedOutputStream.ComputeUInt64Size(Transid);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(MsgOpts other) {
      if (other == null) {
        return;
      }
      if (other.Flag != 0) {
        Flag = other.Flag;
      }
      if (other.Pid != 0) {
        Pid = other.Pid;
      }
      if (other.Rpid != 0) {
        Rpid = other.Rpid;
      }
      if (other.Transid != 0UL) {
        Transid = other.Transid;
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
            Flag = input.ReadUInt32();
            break;
          }
          case 16: {
            Pid = input.ReadUInt32();
            break;
          }
          case 24: {
            Rpid = input.ReadUInt32();
            break;
          }
          case 32: {
            Transid = input.ReadUInt64();
            break;
          }
        }
      }
    }

    #region Nested types
    /// <summary>Container for nested types declared in the MsgOpts message type.</summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static partial class Types {
      public enum Flag {
        [pbr::OriginalName("Norm")] Norm = 0,
        [pbr::OriginalName("RPC")] Rpc = 1,
        [pbr::OriginalName("RESP")] Resp = 2,
        [pbr::OriginalName("TRANS")] Trans = 3,
      }

      public enum TransTarget {
        [pbr::OriginalName("Undefine")] Undefine = 0,
        [pbr::OriginalName("GC")] Gc = 1,
        [pbr::OriginalName("CS")] Cs = 2,
        [pbr::OriginalName("BS")] Bs = 3,
        [pbr::OriginalName("LS")] Ls = 4,
        [pbr::OriginalName("DB")] Db = 5,
        [pbr::OriginalName("GS")] Gs = 6,
      }

    }
    #endregion

  }

  public sealed partial class G_AskPing : pb::IMessage<G_AskPing> {
    private static readonly pb::MessageParser<G_AskPing> _parser = new pb::MessageParser<G_AskPing>(() => new G_AskPing());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<G_AskPing> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.GlobalReflection.Descriptor.MessageTypes[1]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public G_AskPing() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public G_AskPing(G_AskPing other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      time_ = other.time_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public G_AskPing Clone() {
      return new G_AskPing(this);
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

    /// <summary>Field number for the "time" field.</summary>
    public const int TimeFieldNumber = 2;
    private long time_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public long Time {
      get { return time_; }
      set {
        time_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as G_AskPing);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(G_AskPing other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (Time != other.Time) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (Time != 0L) hash ^= Time.GetHashCode();
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
      if (Time != 0L) {
        output.WriteRawTag(16);
        output.WriteInt64(Time);
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
      if (Time != 0L) {
        size += 1 + pb::CodedOutputStream.ComputeInt64Size(Time);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(G_AskPing other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
      }
      if (other.Time != 0L) {
        Time = other.Time;
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
            Time = input.ReadInt64();
            break;
          }
        }
      }
    }

  }

  public sealed partial class G_AskPingRet : pb::IMessage<G_AskPingRet> {
    private static readonly pb::MessageParser<G_AskPingRet> _parser = new pb::MessageParser<G_AskPingRet>(() => new G_AskPingRet());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<G_AskPingRet> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.GlobalReflection.Descriptor.MessageTypes[2]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public G_AskPingRet() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public G_AskPingRet(G_AskPingRet other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      stime_ = other.stime_;
      time_ = other.time_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public G_AskPingRet Clone() {
      return new G_AskPingRet(this);
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

    /// <summary>Field number for the "stime" field.</summary>
    public const int StimeFieldNumber = 2;
    private long stime_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public long Stime {
      get { return stime_; }
      set {
        stime_ = value;
      }
    }

    /// <summary>Field number for the "time" field.</summary>
    public const int TimeFieldNumber = 3;
    private long time_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public long Time {
      get { return time_; }
      set {
        time_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as G_AskPingRet);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(G_AskPingRet other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (Stime != other.Stime) return false;
      if (Time != other.Time) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (Stime != 0L) hash ^= Stime.GetHashCode();
      if (Time != 0L) hash ^= Time.GetHashCode();
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
      if (Stime != 0L) {
        output.WriteRawTag(16);
        output.WriteInt64(Stime);
      }
      if (Time != 0L) {
        output.WriteRawTag(24);
        output.WriteInt64(Time);
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
      if (Stime != 0L) {
        size += 1 + pb::CodedOutputStream.ComputeInt64Size(Stime);
      }
      if (Time != 0L) {
        size += 1 + pb::CodedOutputStream.ComputeInt64Size(Time);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(G_AskPingRet other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
      }
      if (other.Stime != 0L) {
        Stime = other.Stime;
      }
      if (other.Time != 0L) {
        Time = other.Time;
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
            Stime = input.ReadInt64();
            break;
          }
          case 24: {
            Time = input.ReadInt64();
            break;
          }
        }
      }
    }

  }

  public sealed partial class Global : pb::IMessage<Global> {
    private static readonly pb::MessageParser<Global> _parser = new pb::MessageParser<Global>(() => new Global());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<Global> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.GlobalReflection.Descriptor.MessageTypes[3]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public Global() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public Global(Global other) : this() {
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public Global Clone() {
      return new Global(this);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as Global);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(Global other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
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
      if (_unknownFields != null) {
        _unknownFields.WriteTo(output);
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int CalculateSize() {
      int size = 0;
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(Global other) {
      if (other == null) {
        return;
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
        }
      }
    }

    #region Nested types
    /// <summary>Container for nested types declared in the Global message type.</summary>
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static partial class Types {
      public enum ECommon {
        [pbr::OriginalName("Success")] Success = 0,
        [pbr::OriginalName("Failed")] Failed = 1,
      }

    }
    #endregion

  }

  #endregion

}

#endregion Designer generated code
