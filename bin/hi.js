#!/usr/bin/env node

// 初试
// console.log( 'Hi Welcome node cli' )



var program = require( 'commander' );

program
	.version( '0.1.0' )
	.option( '-C, --chdir <path>', 'change the working directory' )
	.option( '-c, --config <path>', 'set config path. defaults to ./deploy.conf' )
	.option( '-T, --no-tests', 'ignore test hook' );

program
	.command( 'setup [env]' )
	.description( 'run setup commands for all envs' )
	.option( "-s, --setup_mode [mode]", "Which setup mode to use" )
	.action( function ( env, options ) {
		var mode = options.setup_mode || "normal";
		env = env || 'all';
		console.log( 'setup for %s env(s) with %s mode', env, mode );
	} );

program
	.command( 'exec <cmd>' )
	.alias( 'ex' )
	.description( 'execute the given remote cmd' )
	.option( "-e, --exec_mode <mode>", "Which exec mode to use" )
	.action( function ( cmd, options ) {
		console.log( 'exec "%s" using %s mode', cmd, options.exec_mode );
	} )
	.on( '--help', function () {
		console.log( '  Examples:' );
		console.log();
		console.log( '    $ deploy exec sequential' );
		console.log( '    $ deploy exec async' );
		console.log();
	} );

program
	.command( '*' )
	.action( function ( env ) {
		console.log( 'deploying "%s"', env );
	} );

// list demo 自己实现的列出目录下所有文件的命令
program
	.command( 'list' ) //声明hi下有一个命令叫list
	.description( 'list files in current working directory' ) //给出list这个命令的描述
	.option( '-a, --all', 'Whether to display hidden files' ) //设置list这个命令的参数
	.action( function ( options ) { //list命令的实现体
		var fs = require( 'fs' );
		//获取当前运行目录下的文件信息
		fs.readdir( process.cwd(), function ( err, files ) {
			var list = files;
			if ( !options.all ) { //检查用户是否给了--all或者-a的参数，如果没有，则过滤掉那些以.开头的文件
				list = files.filter( function ( file ) {
					return file.indexOf( '.' ) !== 0;
				} );
			}
			console.log( list.join( '\n\r' ) ); //控制台将所有文件名打印出来
		} );
	} );

program.parse( process.argv );