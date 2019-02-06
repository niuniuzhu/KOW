// <auto-generated>
//     Generated by the protocol buffer compiler.  DO NOT EDIT!
//     source: LS2CS.proto
// </auto-generated>
#pragma warning disable 1591, 0612, 3021
#region Designer generated code

using pb = global::Google.Protobuf;
using pbc = global::Google.Protobuf.Collections;
using pbr = global::Google.Protobuf.Reflection;
using scg = global::System.Collections.Generic;
namespace Protos {

  /// <summary>Holder for reflection information generated from LS2CS.proto</summary>
  public static partial class LS2CSReflection {

    #region Descriptor
    /// <summary>File descriptor for LS2CS.proto</summary>
    public static pbr::FileDescriptor Descriptor {
      get { return descriptor; }
    }
    private static pbr::FileDescriptor descriptor;

    static LS2CSReflection() {
      byte[] descriptorData = global::System.Convert.FromBase64String(
          string.Concat(
            "CgtMUzJDUy5wcm90bxIGUHJvdG9zGgxHbG9iYWwucHJvdG8i2gIKDUxTMkNT",
            "X0dDTG9naW4SHQoEb3B0cxgBIAEoCzIPLlByb3Rvcy5Nc2dPcHRzEg0KBWdj",
            "TklEGAIgASgEEgoKAmlkGAMgASgJEgwKBHVrZXkYBCABKA0SJwoHY2hhbm5l",
            "bBgFIAEoDjIWLlByb3Rvcy5HbG9iYWwuQ2hhbm5lbBInCgdicm93c2VyGAYg",
            "ASgOMhYuUHJvdG9zLkdsb2JhbC5Ccm93c2VyEikKCHBsYXRmb3JtGAcgASgO",
            "MhcuUHJvdG9zLkdsb2JhbC5QbGF0Zm9ybRISCgpzZXNzaW9uS2V5GAggASgJ",
            "Eg8KB3VuaW9uSUQYCSABKAkSEAoIbmlja25hbWUYCiABKAkSDgoGYXZhdGFy",
            "GAsgASgJEg4KBmdlbmRlchgMIAEoBRINCgVtb25leRgNIAEoBRIQCghkaWFt",
            "b25lZBgOIAEoBRIMCgRyYW5rGA8gASgFYgZwcm90bzM="));
      descriptor = pbr::FileDescriptor.FromGeneratedCode(descriptorData,
          new pbr::FileDescriptor[] { global::Protos.GlobalReflection.Descriptor, },
          new pbr::GeneratedClrTypeInfo(null, new pbr::GeneratedClrTypeInfo[] {
            new pbr::GeneratedClrTypeInfo(typeof(global::Protos.LS2CS_GCLogin), global::Protos.LS2CS_GCLogin.Parser, new[]{ "Opts", "GcNID", "Id", "Ukey", "Channel", "Browser", "Platform", "SessionKey", "UnionID", "Nickname", "Avatar", "Gender", "Money", "Diamoned", "Rank" }, null, null, null)
          }));
    }
    #endregion

  }
  #region Messages
  /// <summary>
  ///通知cs有客户端登陆
  /// </summary>
  public sealed partial class LS2CS_GCLogin : pb::IMessage<LS2CS_GCLogin> {
    private static readonly pb::MessageParser<LS2CS_GCLogin> _parser = new pb::MessageParser<LS2CS_GCLogin>(() => new LS2CS_GCLogin());
    private pb::UnknownFieldSet _unknownFields;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pb::MessageParser<LS2CS_GCLogin> Parser { get { return _parser; } }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public static pbr::MessageDescriptor Descriptor {
      get { return global::Protos.LS2CSReflection.Descriptor.MessageTypes[0]; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    pbr::MessageDescriptor pb::IMessage.Descriptor {
      get { return Descriptor; }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public LS2CS_GCLogin() {
      OnConstruction();
    }

    partial void OnConstruction();

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public LS2CS_GCLogin(LS2CS_GCLogin other) : this() {
      opts_ = other.opts_ != null ? other.opts_.Clone() : null;
      gcNID_ = other.gcNID_;
      id_ = other.id_;
      ukey_ = other.ukey_;
      channel_ = other.channel_;
      browser_ = other.browser_;
      platform_ = other.platform_;
      sessionKey_ = other.sessionKey_;
      unionID_ = other.unionID_;
      nickname_ = other.nickname_;
      avatar_ = other.avatar_;
      gender_ = other.gender_;
      money_ = other.money_;
      diamoned_ = other.diamoned_;
      rank_ = other.rank_;
      _unknownFields = pb::UnknownFieldSet.Clone(other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public LS2CS_GCLogin Clone() {
      return new LS2CS_GCLogin(this);
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

    /// <summary>Field number for the "id" field.</summary>
    public const int IdFieldNumber = 3;
    private string id_ = "";
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string Id {
      get { return id_; }
      set {
        id_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    /// <summary>Field number for the "ukey" field.</summary>
    public const int UkeyFieldNumber = 4;
    private uint ukey_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public uint Ukey {
      get { return ukey_; }
      set {
        ukey_ = value;
      }
    }

    /// <summary>Field number for the "channel" field.</summary>
    public const int ChannelFieldNumber = 5;
    private global::Protos.Global.Types.Channel channel_ = 0;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.Global.Types.Channel Channel {
      get { return channel_; }
      set {
        channel_ = value;
      }
    }

    /// <summary>Field number for the "browser" field.</summary>
    public const int BrowserFieldNumber = 6;
    private global::Protos.Global.Types.Browser browser_ = 0;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.Global.Types.Browser Browser {
      get { return browser_; }
      set {
        browser_ = value;
      }
    }

    /// <summary>Field number for the "platform" field.</summary>
    public const int PlatformFieldNumber = 7;
    private global::Protos.Global.Types.Platform platform_ = 0;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public global::Protos.Global.Types.Platform Platform {
      get { return platform_; }
      set {
        platform_ = value;
      }
    }

    /// <summary>Field number for the "sessionKey" field.</summary>
    public const int SessionKeyFieldNumber = 8;
    private string sessionKey_ = "";
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string SessionKey {
      get { return sessionKey_; }
      set {
        sessionKey_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    /// <summary>Field number for the "unionID" field.</summary>
    public const int UnionIDFieldNumber = 9;
    private string unionID_ = "";
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string UnionID {
      get { return unionID_; }
      set {
        unionID_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    /// <summary>Field number for the "nickname" field.</summary>
    public const int NicknameFieldNumber = 10;
    private string nickname_ = "";
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string Nickname {
      get { return nickname_; }
      set {
        nickname_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    /// <summary>Field number for the "avatar" field.</summary>
    public const int AvatarFieldNumber = 11;
    private string avatar_ = "";
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public string Avatar {
      get { return avatar_; }
      set {
        avatar_ = pb::ProtoPreconditions.CheckNotNull(value, "value");
      }
    }

    /// <summary>Field number for the "gender" field.</summary>
    public const int GenderFieldNumber = 12;
    private int gender_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int Gender {
      get { return gender_; }
      set {
        gender_ = value;
      }
    }

    /// <summary>Field number for the "money" field.</summary>
    public const int MoneyFieldNumber = 13;
    private int money_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int Money {
      get { return money_; }
      set {
        money_ = value;
      }
    }

    /// <summary>Field number for the "diamoned" field.</summary>
    public const int DiamonedFieldNumber = 14;
    private int diamoned_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int Diamoned {
      get { return diamoned_; }
      set {
        diamoned_ = value;
      }
    }

    /// <summary>Field number for the "rank" field.</summary>
    public const int RankFieldNumber = 15;
    private int rank_;
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public int Rank {
      get { return rank_; }
      set {
        rank_ = value;
      }
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override bool Equals(object other) {
      return Equals(other as LS2CS_GCLogin);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public bool Equals(LS2CS_GCLogin other) {
      if (ReferenceEquals(other, null)) {
        return false;
      }
      if (ReferenceEquals(other, this)) {
        return true;
      }
      if (!object.Equals(Opts, other.Opts)) return false;
      if (GcNID != other.GcNID) return false;
      if (Id != other.Id) return false;
      if (Ukey != other.Ukey) return false;
      if (Channel != other.Channel) return false;
      if (Browser != other.Browser) return false;
      if (Platform != other.Platform) return false;
      if (SessionKey != other.SessionKey) return false;
      if (UnionID != other.UnionID) return false;
      if (Nickname != other.Nickname) return false;
      if (Avatar != other.Avatar) return false;
      if (Gender != other.Gender) return false;
      if (Money != other.Money) return false;
      if (Diamoned != other.Diamoned) return false;
      if (Rank != other.Rank) return false;
      return Equals(_unknownFields, other._unknownFields);
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public override int GetHashCode() {
      int hash = 1;
      if (opts_ != null) hash ^= Opts.GetHashCode();
      if (GcNID != 0UL) hash ^= GcNID.GetHashCode();
      if (Id.Length != 0) hash ^= Id.GetHashCode();
      if (Ukey != 0) hash ^= Ukey.GetHashCode();
      if (Channel != 0) hash ^= Channel.GetHashCode();
      if (Browser != 0) hash ^= Browser.GetHashCode();
      if (Platform != 0) hash ^= Platform.GetHashCode();
      if (SessionKey.Length != 0) hash ^= SessionKey.GetHashCode();
      if (UnionID.Length != 0) hash ^= UnionID.GetHashCode();
      if (Nickname.Length != 0) hash ^= Nickname.GetHashCode();
      if (Avatar.Length != 0) hash ^= Avatar.GetHashCode();
      if (Gender != 0) hash ^= Gender.GetHashCode();
      if (Money != 0) hash ^= Money.GetHashCode();
      if (Diamoned != 0) hash ^= Diamoned.GetHashCode();
      if (Rank != 0) hash ^= Rank.GetHashCode();
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
      if (Id.Length != 0) {
        output.WriteRawTag(26);
        output.WriteString(Id);
      }
      if (Ukey != 0) {
        output.WriteRawTag(32);
        output.WriteUInt32(Ukey);
      }
      if (Channel != 0) {
        output.WriteRawTag(40);
        output.WriteEnum((int) Channel);
      }
      if (Browser != 0) {
        output.WriteRawTag(48);
        output.WriteEnum((int) Browser);
      }
      if (Platform != 0) {
        output.WriteRawTag(56);
        output.WriteEnum((int) Platform);
      }
      if (SessionKey.Length != 0) {
        output.WriteRawTag(66);
        output.WriteString(SessionKey);
      }
      if (UnionID.Length != 0) {
        output.WriteRawTag(74);
        output.WriteString(UnionID);
      }
      if (Nickname.Length != 0) {
        output.WriteRawTag(82);
        output.WriteString(Nickname);
      }
      if (Avatar.Length != 0) {
        output.WriteRawTag(90);
        output.WriteString(Avatar);
      }
      if (Gender != 0) {
        output.WriteRawTag(96);
        output.WriteInt32(Gender);
      }
      if (Money != 0) {
        output.WriteRawTag(104);
        output.WriteInt32(Money);
      }
      if (Diamoned != 0) {
        output.WriteRawTag(112);
        output.WriteInt32(Diamoned);
      }
      if (Rank != 0) {
        output.WriteRawTag(120);
        output.WriteInt32(Rank);
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
      if (Id.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(Id);
      }
      if (Ukey != 0) {
        size += 1 + pb::CodedOutputStream.ComputeUInt32Size(Ukey);
      }
      if (Channel != 0) {
        size += 1 + pb::CodedOutputStream.ComputeEnumSize((int) Channel);
      }
      if (Browser != 0) {
        size += 1 + pb::CodedOutputStream.ComputeEnumSize((int) Browser);
      }
      if (Platform != 0) {
        size += 1 + pb::CodedOutputStream.ComputeEnumSize((int) Platform);
      }
      if (SessionKey.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(SessionKey);
      }
      if (UnionID.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(UnionID);
      }
      if (Nickname.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(Nickname);
      }
      if (Avatar.Length != 0) {
        size += 1 + pb::CodedOutputStream.ComputeStringSize(Avatar);
      }
      if (Gender != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(Gender);
      }
      if (Money != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(Money);
      }
      if (Diamoned != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(Diamoned);
      }
      if (Rank != 0) {
        size += 1 + pb::CodedOutputStream.ComputeInt32Size(Rank);
      }
      if (_unknownFields != null) {
        size += _unknownFields.CalculateSize();
      }
      return size;
    }

    [global::System.Diagnostics.DebuggerNonUserCodeAttribute]
    public void MergeFrom(LS2CS_GCLogin other) {
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
      if (other.Id.Length != 0) {
        Id = other.Id;
      }
      if (other.Ukey != 0) {
        Ukey = other.Ukey;
      }
      if (other.Channel != 0) {
        Channel = other.Channel;
      }
      if (other.Browser != 0) {
        Browser = other.Browser;
      }
      if (other.Platform != 0) {
        Platform = other.Platform;
      }
      if (other.SessionKey.Length != 0) {
        SessionKey = other.SessionKey;
      }
      if (other.UnionID.Length != 0) {
        UnionID = other.UnionID;
      }
      if (other.Nickname.Length != 0) {
        Nickname = other.Nickname;
      }
      if (other.Avatar.Length != 0) {
        Avatar = other.Avatar;
      }
      if (other.Gender != 0) {
        Gender = other.Gender;
      }
      if (other.Money != 0) {
        Money = other.Money;
      }
      if (other.Diamoned != 0) {
        Diamoned = other.Diamoned;
      }
      if (other.Rank != 0) {
        Rank = other.Rank;
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
          case 26: {
            Id = input.ReadString();
            break;
          }
          case 32: {
            Ukey = input.ReadUInt32();
            break;
          }
          case 40: {
            channel_ = (global::Protos.Global.Types.Channel) input.ReadEnum();
            break;
          }
          case 48: {
            browser_ = (global::Protos.Global.Types.Browser) input.ReadEnum();
            break;
          }
          case 56: {
            platform_ = (global::Protos.Global.Types.Platform) input.ReadEnum();
            break;
          }
          case 66: {
            SessionKey = input.ReadString();
            break;
          }
          case 74: {
            UnionID = input.ReadString();
            break;
          }
          case 82: {
            Nickname = input.ReadString();
            break;
          }
          case 90: {
            Avatar = input.ReadString();
            break;
          }
          case 96: {
            Gender = input.ReadInt32();
            break;
          }
          case 104: {
            Money = input.ReadInt32();
            break;
          }
          case 112: {
            Diamoned = input.ReadInt32();
            break;
          }
          case 120: {
            Rank = input.ReadInt32();
            break;
          }
        }
      }
    }

  }

  #endregion

}

#endregion Designer generated code
