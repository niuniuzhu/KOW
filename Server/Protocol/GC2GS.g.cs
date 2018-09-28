// <auto-generated>
//     Generated by the protocol buffer compiler.  DO NOT EDIT!
//     source: GC2GS.proto
// </auto-generated>
#pragma warning disable 1591, 0612, 3021
#region Designer generated code

using pb = global::Google.Protobuf;
using pbc = global::Google.Protobuf.Collections;
using pbr = global::Google.Protobuf.Reflection;
using scg = global::System.Collections.Generic;
namespace Protos {

  /// <summary>Holder for reflection information generated from GC2GS.proto</summary>
  public static partial class GC2GSReflection {

    #region Descriptor
    /// <summary>File descriptor for GC2GS.proto</summary>
    public static pbr::FileDescriptor Descriptor {
      get { return descriptor; }
    }
    private static pbr::FileDescriptor descriptor;

    static GC2GSReflection() {
      byte[] descriptorData = global::System.Convert.FromBase64String(
          string.Concat(
            "CgtHQzJHUy5wcm90bxIGUHJvdG9zGgxHbG9iYWwucHJvdG8iTwoOR0MyR1Nf",
            "QXNrTG9naW4SHQoEb3B0cxgBIAEoCzIPLlByb3Rvcy5Nc2dPcHRzEgsKA3B3",
            "ZBgCIAEoCRIRCglzZXNzaW9uSUQYAyABKAQiMAoPR0MyR1NfS2VlcEFsaXZl",
            "Eh0KBG9wdHMYASABKAsyDy5Qcm90b3MuTXNnT3B0c2IGcHJvdG8z"));
      descriptor = pbr::FileDescriptor.FromGeneratedCode(descriptorData,
          new pbr::FileDescriptor[] { global::Protos.GlobalReflection.Descriptor, },
          new pbr::GeneratedClrTypeInfo(null, new pbr::GeneratedClrTypeInfo[] {
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.GC2GS_AskLogin), global::Protos.GC2GS_AskLogin.Parser, new[]{ "Opts", "Pwd", "SessionID" }, null, null, null),
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.GC2GS_KeepAlive), global::Protos.GC2GS_KeepAlive.Parser, new[]{ "Opts" }, null, null, null)
          }));
    }
    #endregion

  }
  #region Messages
  public sealed partial class GC2GS_AskLogin : pb::IMessage<GC2GS_AskLogin> {
    private static readonly pb::MessageParser<GC2GS_AskLogin> _parser = new pb::MessageParser<GC2GS_AskLogin>(() => new GC2GS_AskLogin());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<GC2GS_AskLogin> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.GC2GSReflection.Descriptor.MessageTypes[0]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GC2GS_AskLogin() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GC2GS_AskLogin(GC2GS_AskLogin other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      pwd_ = other.pwd_;
      sessionID_ = other.sessionID_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GC2GS_AskLogin Clone() {
      return new GC2GS_AskLogin(this);
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

    /// <summary>Field number for the "pwd" field.</summary>
    public const int PwdFieldNumber = 2;
    private string pwd_ = "";
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string Pwd {
      get { return pwd_; }
      set {
        pwd_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    /// <summary>Field number for the "sessionID" field.</summary>
    public const int SessionIDFieldNumber = 3;
    private ulong sessionID_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public ulong SessionID {
      get { return sessionID_; }
      set {
        sessionID_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as GC2GS_AskLogin);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(GC2GS_AskLogin other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (Pwd != other.Pwd) return false;
      if (SessionID != other.SessionID) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (Pwd.Length != 0) hash ^= Pwd.GetHashCode();
      if (SessionID != 0UL) hash ^= SessionID.GetHashCode();
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
      if (Pwd.Length != 0) {
        output.WriteRawTag(18);
        output.WriteString(Pwd);
      }
      if (SessionID != 0UL) {
        output.WriteRawTag(24);
        output.WriteUInt64(SessionID);
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
      if (Pwd.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(Pwd);
      }
      if (SessionID != 0UL) {
        size += 1 + pb::CodedOutputStream.ComputeUInt64Size(SessionID);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(GC2GS_AskLogin other) {
      if (other == null) {
        return;
      }
      if (other.opts_ != null) {
        if (opts_ == null) {
          opts_ = new global::Protos.MsgOpts();
        }
        Opts.MergeFrom(other.Opts);
      }
      if (other.Pwd.Length != 0) {
        Pwd = other.Pwd;
      }
      if (other.SessionID != 0UL) {
        SessionID = other.SessionID;
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
            Pwd = input.ReadString();
            break;
          }
          case 24: {
            SessionID = input.ReadUInt64();
            break;
          }
        }
      }
    }

  }

  public sealed partial class GC2GS_KeepAlive : pb::IMessage<GC2GS_KeepAlive> {
    private static readonly pb::MessageParser<GC2GS_KeepAlive> _parser = new pb::MessageParser<GC2GS_KeepAlive>(() => new GC2GS_KeepAlive());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<GC2GS_KeepAlive> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.GC2GSReflection.Descriptor.MessageTypes[1]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GC2GS_KeepAlive() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GC2GS_KeepAlive(GC2GS_KeepAlive other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public GC2GS_KeepAlive Clone() {
      return new GC2GS_KeepAlive(this);
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
      return Equals(other as GC2GS_KeepAlive);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(GC2GS_KeepAlive other) {
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
    public void MergeFrom(GC2GS_KeepAlive other) {
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
