const os = require( 'os' );
import {
	name,
	version,
	engines
} from '../../package.json';

// 系统user文件夹
const home = process.env[ ( process.platform === 'win32' ) ? 'USERPROFILE' : 'HOME' ];

// user agent
export const ua = `${name}-${version}`;

/**
 * 文件夹定义
 * @type {Object}
 */
export const dirs = {
	home,
	download: `${home}/.webpack-project`,
	rc: `${home}/.webpack-project`,
	tmp: os.tmpdir(),
	metalsmith: 'metalsmith'
};

/**
 * 版本
 * @type {Object}
 */
export const versions = {
	node: process.version.substr( 1 ),
	nodeEngines: engines.node,
  [ name ]: version
};