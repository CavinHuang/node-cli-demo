import {
	basename
} from 'path';
import request from 'request';
import DownloadGitRepo from 'download-git-repo';
import {
	dirs
} from '../config/constant'
/**
 * git操作类
 */
class gitCtrl {
	constructor( type, registry ) {
		this.type = type
		this.registry = registry
	}

	/**
	 * request Promise封装 方便调用
	 * @param  {[string]} api [地址]
	 * @param  {[string]} ua [User-Agent]
	 * @return {[type]}     [description]
	 */
	fetch( api, ua ) {
		return new Promise( ( resolve, reject ) => {
			request( {
				url: api,
				method: 'GET',
				headers: {
					'User-Agent': `${ua}`
				}
			}, ( err, res, body ) => {
				if ( err ) {
					reject( err );
					return;
				}
				const data = JSON.parse( body );
				if ( data.message === 'Not Found' ) {
					reject( new Error( `${api} is not found` ) );
				} else {
					resolve( data );
				}
			} );
		} );
	}

	/**
	 * 获取git仓库列表
	 */
	async fetchRepoList() {
		const api = `https://api.github.com/${this.type}s/${this.registry}/repos`;
		return await this.fetch( api );
	}

	/**
	 * 获取仓库所有的版本
	 * @param  {[string]} repo [仓库名称]
	 * @return {[type]}      [description]
	 */
	async fetchRepoTagList( repo ) {
		const {
			url,
			scaffold
		} = await this.fetchGitInfo( repo );
		const api = `https://api.github.com/repos/${url}/tags`;

		return this.fetch( api, scaffold, url );
	}

	/**
	 * 获取仓库详细信息
	 * @param  {[string]} repo [仓库名称]
	 * @return {[type]}      [description]
	 */
	async fetchGitInfo( repo ) {
		let template = repo;
		let [ scaffold ] = template.split( '@' );

		scaffold = basename( scaffold );

		template = template.split( '@' )
			.filter( Boolean )
			.join( '#' );
		const url = `${this.registry}/${template}`;
		return {
			url,
			scaffold
		};
	}

	/**
	 * 下载git仓库代码到指定文件夹
	 * @param  {[type]} repo [description]
	 * @return {[type]}      [description]
	 */
	async downloadGitRepo( repo ) {
		const {
			url,
			scaffold
		} = await this.fetchGitInfo( repo );

		return new Promise( ( resolve, reject ) => {
			DownloadGitRepo( url, `${dirs.download}/${scaffold}`, ( err ) => {
				if ( err ) {
					reject( err );
					return;
				}
				resolve( true );
			} );
		} );
	}
}

export default {
	gitCtrl
}