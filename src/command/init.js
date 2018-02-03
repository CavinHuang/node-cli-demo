var program = require( 'commander' );
program
	.command( 'init' )
	.description( 'init project for local' )
	.action( function ( options ) { //list命令的实现体
		// to do
		console.log( 'init command' );
	} );
program.parse( process.argv ); //开始解析用户输入的命令