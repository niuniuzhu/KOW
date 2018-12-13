if jit then		
	if jit.opt then
		jit.opt.start(3)			
	end
	print("jit", jit.status())
	print(string.format("os: %s, arch: %s", jit.os, jit.arch))
end

cs = CS.CentralServer.CS.instance
u = cs.userMgr
m = cs.matcher
b = cs.battleStaging
