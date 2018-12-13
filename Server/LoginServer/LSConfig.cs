using Core.Misc;
using System.Collections;
using System.IO;

namespace LoginServer
{
    public class LSConfig
    {
        public int cliPort;
        public string csIP;
        public int csPort;
        public string dbIP;
        public int dbPort;
        public string redisIP;
        public int redisPort;
        public string redisPwd;
        public string certPath;
        public string certPass;
        public long pingInterval;
        public bool pwdVerification;
        public bool autoRegister;

        public void CopyFromCLIOptions(Options opts)
        {
            this.cliPort = opts.cliPort;
            this.csIP = opts.csIP;
            this.csPort = opts.csPort;
            this.dbIP = opts.dbIP;
            this.dbPort = opts.dbPort;
            this.redisIP = opts.redisIP;
            this.redisPort = opts.redisPort;
            this.redisPwd = opts.redisPwd;
            this.pingInterval = opts.pingInterval;
            this.pwdVerification = System.Convert.ToBoolean(opts.pwdVerification);
            this.autoRegister = System.Convert.ToBoolean(opts.autoRegister);
            Hashtable secretDef = (Hashtable)MiniJSON.JsonDecode(File.ReadAllText(opts.secret));
            this.certPath = secretDef.GetString("certPath");
            this.certPass = secretDef.GetString("certPass");
        }

        public void CopyFromJson(Hashtable json)
        {
            this.cliPort = json.GetInt("cliPort");
            this.csIP = json.GetString("csIP");
            this.csPort = json.GetInt("csPort");
            this.dbIP = json.GetString("dbIP");
            this.dbPort = json.GetInt("dbPort");
            this.redisIP = json.GetString("redisIP");
            this.redisPort = json.GetInt("redisPort");
            this.redisPwd = json.GetString("redisPwd");
            this.pingInterval = json.GetLong("pingInterval");
            this.pwdVerification = json.GetBoolean("pwdVerification");
            this.autoRegister = json.GetBoolean("autoRegister");
            Hashtable secretDef = (Hashtable)MiniJSON.JsonDecode(File.ReadAllText(json.GetString("secret")));
            this.certPath = secretDef.GetString("certPath");
            this.certPass = secretDef.GetString("certPass");
        }
    }
}