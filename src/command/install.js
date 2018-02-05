import program from 'commander'
import inquirer from 'inquirer'
import gitCtrl from '../utils/gitCtrl'
import config from '../config'
// 初始化git操作类
let git = new gitCtrl.gitCtrl( config.repoType, config.registry )

program
	.command( 'install' )
	.description( 'install github project to local' )
	.action( async ( options ) => { //list命令的实现体
		// to do
		console.log( 'install command' );
		let choices = await git.fetchRepoList();
		let questions = [ {
			type: 'list',
			name: 'repo',
			message: 'which repo do you want to install?',
			choices
  } ];
		// 调用问题
		inquirer.prompt( questions )
			.then( async answers => {
				console.log( answers ); // 输出最终的答案
				let result = await git.downloadGitRepo( answers.repo )
				console.log( result ? 'SUCCESS' : result )
			} )
	} );
program.parse( process.argv ); //开始解析用户输入的命令