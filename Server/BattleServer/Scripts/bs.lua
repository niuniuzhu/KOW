if jit then		
	if jit.opt then
		jit.opt.start(3)			
	end
	print("jit", jit.status())
	print(string.format("os: %s, arch: %s", jit.os, jit.arch))
end

bs = CS.BattleServer.BS.instance
u = bs.userMgr
bm = bs.battleManager

print("init lua")