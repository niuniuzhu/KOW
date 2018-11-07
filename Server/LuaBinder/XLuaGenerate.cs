using System;
using System.IO;
using System.Reflection;
using LuaBinder.Properties;

namespace LuaBinder
{
	public static class XLuaGenerate
	{
		public static void Main( string[] args )
		{
			if ( args.Length < 2 )
			{
				Console.WriteLine( @"XLuaGenerate assmbly_path output_path" );
				return;
			}

			GeneratorConfig.common_path = args[1];
			Assembly assembly;
			try
			{
				assembly = Assembly.LoadFrom( Path.GetFullPath( args[0] ) );
			}
			catch ( Exception e )
			{
				Console.WriteLine( e );
				return;
			}
			Generator.GenAll( new XLuaTemplates
			{
				LuaClassWrap = new XLuaTemplate
				{
					name = "LuaClassWrap",
					text = Resources.LuaClassWrap_tpl,
				},
				LuaDelegateBridge = new XLuaTemplate
				{
					name = "LuaDelegateBridge",
					text = Resources.LuaDelegateBridge_tpl,
				},
				LuaDelegateWrap = new XLuaTemplate
				{
					name = "LuaDelegateWrap",
					text = Resources.LuaDelegateWrap_tpl,
				},
				LuaEnumWrap = new XLuaTemplate
				{
					name = "LuaEnumWrap",
					text = Resources.LuaEnumWrap_tpl,
				},
				LuaInterfaceBridge = new XLuaTemplate
				{
					name = "LuaInterfaceBridge",
					text = Resources.LuaInterfaceBridge_tpl,
				},
				LuaRegister = new XLuaTemplate
				{
					name = "LuaRegister",
					text = Resources.LuaRegister_tpl,
				},
				LuaWrapPusher = new XLuaTemplate
				{
					name = "LuaWrapPusher",
					text = Resources.LuaWrapPusher_tpl,
				},
				PackUnpack = new XLuaTemplate
				{
					name = "PackUnpack",
					text = Resources.PackUnpack_tpl,
				},
				TemplateCommon = new XLuaTemplate
				{
					name = "TemplateCommon",
					text = Resources.TemplateCommon_lua,
				},
			}, assembly.GetTypes() );
		}
	}
}
