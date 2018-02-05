require( "babel-register" )
require( "babel-core" )
	.transform( "code", {
		presets: [ [ require( 'babel-preset-latest-node' ), {
			target: 'current'
		} ] ]
	} );
require( 'babel-polyfill' )
require( './src' )