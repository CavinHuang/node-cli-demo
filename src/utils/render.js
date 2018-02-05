import consolidate from 'consolidate';

const renderContent = consolidate.swig.render;
/**
 * metalsmith 渲染插件
 * @return {[type]} [description]
 */
export default function render() {
	return function _render( files, metalsmith, next ) {
		const meta = metalsmith.metadata();
		Object.keys( files )
			.forEach( function ( file ) {
				const str = files[ file ].contents.toString();
				renderContent( str, meta, ( err, res ) => {
					if ( err ) {
						return next( err );
					}

					files[ file ].contents = new Buffer( res );
					next();
				} );
			} )
	}
}