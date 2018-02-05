import {
	ncp
} from 'ncp';
import mkdirp from 'mkdirp'
import {
	exists
} from 'mz/fs'
export default function copyFile( src, dest ) {
	return new Promise( async ( resolve, reject ) => {
		if ( !( await exists( src ) ) ) {
			mkdirp.sync( src );
		}
		ncp( src, dest, ( err ) => {
			if ( err ) {
				reject( err );
				return;
			}
			resolve();
		} );
	} );
}