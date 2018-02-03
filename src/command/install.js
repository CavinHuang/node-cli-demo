var program = require( 'commander' );
program
	.command( 'install' )
	.description( 'install github project to local' )
	.action( function ( options ) { //list命令的实现体
		// to do
		console.log( 'install command' );
	} );
program.parse( process.argv ); //开始解析用户输入的命令