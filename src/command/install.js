import program from 'commander'
import inquirer from 'inquirer'
import gitCtrl from '../utils/gitCtrl'
import config from '../config'
import OraLoading from '../utils/OraLoading'

// 初始化git操作类
let git = new gitCtrl.gitCtrl( config.repoType, config.registry )

program
	.command( 'install' )
	.description( 'install github project to local' )
	.action( async ( options ) => { //list命令的实现体
		// to do
		console.log( 'install command' );
		let version, choices, repos, loader
		loader = OraLoading( 'fetch repo list' )
		repos = await git.fetchRepoList();
		loader.succeed( 'fetch repo list success' );
		if ( repos.length === 0 ) {
			throw new Error( `There is no any scaffolds in https://github.com/${config.registry}. Please create and try` );
		}

		choices = repos.map( ( {
			name
		} ) => name );

		let questions = [ {
			type: 'list',
			name: 'repo',
			message: 'which repo do you want to install?',
			choices
  } ];
		// 调用问题
		let answers = await inquirer.prompt( questions )

		// 取出选择的git仓库
		const repo = answers.repo;
		// 获取选择仓库所有的版本
		loader = OraLoading( 'fetch repo tag list' )
		const tags = await git.fetchRepoTagList( repo );
		loader.succeed( 'fetch repo tag list success' );
		if ( tags.length === 0 ) {
			version = '';
		} else {
			choices = tags.map( ( {
				name
			} ) => name );

			answers = await inquirer.prompt( [
				{
					type: 'list',
					name: 'version',
					message: 'which version do you want to install?',
					choices
      }
    ] );
			version = answers.version;
		}
		console.log( answers ); // 输出最终的答案
		loader = OraLoading( 'begin download repo' )
		let result = await git.downloadGitRepo( [ repo, version ].join( '@' ) );
		//console.log( result ? 'SUCCESS' : result )
		loader.succeed( 'download repe success' )
	} );
program.parse( process.argv ); //开始解析用户输入的命令