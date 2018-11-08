if jit then		
	if jit.opt then
		jit.opt.start(3)			
	end
	print("jit", jit.status())
	print(string.format("os: %s, arch: %s", jit.os, jit.arch))
end

gs = CS.GateServer.GS.instance
u = gs.userMgr

print("init lua")